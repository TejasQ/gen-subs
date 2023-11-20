import inquirer from "inquirer";
import ora from "ora";
import { rimraf } from "rimraf"
import { lstat } from "fs/promises";
import { join } from "path";

import { formatSize, getModelDir, isModelDownloaded, models, workingDir } from "../util";
import { downloadFile, unzipFile } from "../downloadAndUnzip";

export async function modelsAction() {
    const languages = new Set(models.map((model) => model.language));

    const choices = await Promise.all(models.map(async (model) => ({
        name: `(${formatSize(model.size)}) ${model.notes}`,
        value: model.name,
        checked: await isModelDownloaded(model.name),
        language: model.language,
        notes: model.notes,
        url: model.url,
    })));

    const { language } = await inquirer.prompt([
        {
            type: "list",
            name: "language",
            message: "Please choose a language",
            choices: Array.from(languages),
        }
    ]);

    const scopedChoices = choices.filter(c => c.language === language);
    const { desiredModels } = await inquirer.prompt([{
        type: "checkbox",
        name: "desiredModels",
        message: "Here are your models",
        choices: scopedChoices,
    }]);

    const spinner = ora().start("Processing models...");
    for (const choice of scopedChoices) {
        if (!desiredModels.includes(choice.value)) {
            try {
                await rimraf(join(workingDir, "models", choice.value));
            } catch (e) {
            }
            continue;
        }
        const doesModelExist = await lstat(join(workingDir, "models", choice.value)).then(() => true).catch(() => false);
        if (!doesModelExist) {
            spinner.stop();
            const zipFilePath = await downloadFile(choice.url, join(workingDir, "models", choice.value), choice.notes);
            spinner.start(`Unzipping model ${choice.value}...`);
            await unzipFile(zipFilePath, await getModelDir());
        }
    }

    spinner.succeed("Models updated.");
}
