import { join } from "path";
import { lstat, readdir, writeFile } from "fs/promises";
import { mkdirp } from "mkdirp";
import ora from "ora";
import inquirer from "inquirer";

import { splitFilePath } from "../splitFilePath";
import { formatSize, getModelDir, models, videoExtensions, workingDir } from "../util";
import { extractAudio } from "../extractAudio";
import { processAudio } from "../processAudio";
import { createTextFromAudioFile } from "../createTextFromAudioFile";
import { createSrtFromRecognitionResults } from "../createSrtFromRecognitionResults";
import { burnInSubtitles } from "../burnInSubtitles";
import { embedSubtitles } from "../embedSubtitles";
import { downloadFile, unzipFile } from "../downloadAndUnzip";
import { createAssFromRecognitionResults } from "../createAssfromRecognitionResults";

type Options = {
  outDir?: string;
  burnIn?: boolean;
  embed?: boolean;
  format?: "srt" | "ass"
  highlight?: string
};

export async function forAction(relativeTarget: string, options: Options) {
  const target = relativeTarget.startsWith('/') ? relativeTarget : join(process.cwd(), relativeTarget);
  const { pathWithoutExtension, fileName } = splitFilePath(target);
  const format = (options.format ?? "srt").toLowerCase()

  const getOutputFile = (extension: string) =>
    options.outDir
      ? join(options.outDir, `${fileName}.${extension}`)
      : `${pathWithoutExtension}.${extension}`;
  const spinner = ora();
  spinner.start("Checking file...");

  if (format !== 'ass' && options.highlight) {
    spinner.fail("The `highlight` option can only be used with `ass` format subtitles. Please use `-f ass` to set a highlight color.");
    process.exit(1);
  }

  if (!target) {
    spinner.fail("Please specify a file path.");
    process.exit(1);
  }

  try {
    await lstat(target);
  } catch {
    spinner.fail(`File does not exist at ${target}.`);
    process.exit(1);
  }

  const extension = target.split(".").pop();

  if (!extension) {
    spinner.fail(`File does not have an extension.`);
    process.exit(1);
  }

  const isVideo = videoExtensions.includes(extension)
  spinner.text = `Extension is ${extension}. Processing...`;
  let audioFilePath: string;

  if (!isVideo && options.burnIn) {
    spinner.fail(`You're trying to burn-in subtitles to a non-video file. Please only use -b with videos.`);
    process.exit(1);
  }

  if (isVideo) {
    spinner.text = "Creating workspace...";
    await mkdirp(join(workingDir, "from-video"));
    spinner.text = "Converting to audio...";
    audioFilePath = await extractAudio(target);
  } else {
    audioFilePath = target;
  }

  spinner.text = "Processing audio...";
  const processedAudioFilePath = await processAudio(audioFilePath);
  spinner.text = "Checking available models..."
  const availableModels = (await readdir(await getModelDir())).filter(dir => models.map(m => m.name).includes(dir));
  let model;

  spinner.stop();
  if (availableModels.length > 1) {
    const { selectedModel } = await inquirer.prompt([
      {
        type: "list",
        name: "selectedModel",
        message: "Please choose a model. To download more models, please run `models`.",
        choices: models.filter(m => availableModels.includes(m.name)).map(m => ({ name: `(${formatSize(m.size)}, ${m.language}) ${m.notes}`, value: m.name })),
      },
    ]);
    model = selectedModel;
  }

  if (availableModels.length === 1) {
    model = availableModels[0];
  }

  if (availableModels.length === 0) {
    const { shouldDownloadModel } = await inquirer.prompt([
      {
        type: "confirm",
        name: "shouldDownloadModel",
        message: "You don't seem to have any models downloaded. Would you like to download a basic one? You can run `models` to see all available models and add more.",
      },
    ]);
    if (shouldDownloadModel) {
      const modelPath = join(workingDir, "models", models[0].name);
      const zipFile = await downloadFile(models[0].url, modelPath, models[0].notes);
      spinner.start("Unzipping model...");
      await unzipFile(zipFile, await getModelDir());
      spinner.succeed("Model downloaded.");
      model = models[0].name;
    }
  }

  spinner.start("Loading model...");
  const results = await createTextFromAudioFile(
    spinner,
    processedAudioFilePath,
    model
  );
  spinner.text = "Creating subtitles...";
  let subs;

  try {
    if (format === "srt") {
      subs = await createSrtFromRecognitionResults(results);
    } else {
      subs = createAssFromRecognitionResults(results, options.highlight);
    }
  } catch (e: any) {
    spinner.fail(e.message);
    process.exit(1);
  }

  spinner.succeed("Transcribed audio.");
  await writeFile(getOutputFile(format), subs);
  spinner.succeed(`Subtitles created at ${getOutputFile(format)}`);


  if (options.embed) {
    spinner.start("Embedding subtitles into media...");
    const result = await embedSubtitles(target, getOutputFile(format));
    spinner.succeed("File with embedded subtitles available at " + result)
  }

  if (!isVideo) {
    process.exit(0);
  }

  if (options.burnIn) {
    spinner.start("Burning-in subtitles to video...");
    const result = await burnInSubtitles(target, getOutputFile(format));
    spinner.succeed("File with burn-in subtitles available at " + result)
  }

  spinner.succeed("Done.");
}
