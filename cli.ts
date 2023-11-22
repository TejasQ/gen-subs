#!/usr/bin/env node

import { program } from "commander";
import pkg from "./package.json";
import { forAction } from "./actions/for";
import { modelsAction } from "./actions/models";
import { modelsPurgeAction } from "./actions/modelsPurge";
import { modelsLs } from "./actions/modelsLs";
import { burnInAction } from "./actions/burnIn";
import { embedAction } from "./actions/embed";

program.name(pkg.name).description(pkg.description).version(pkg.version);

program
    .command("for <path>")
    .description("Generate subtitles for a given video or audio file.")
    .option(
        "-m, --model [modelName]",
        "The name of the machine learning model you'd like to use to generate subtitles.",
        "vosk-model-small-en-us-0.15",
    )
    .option(
        "-b, --burn-in",
        "Whether to layer subtitles atop the video (burn them in).",
        false,
    )
    .option(
        "-e, --embed",
        "Whether to embed subtitles in the video's metadata.",
        false,
    )
    .option(
        "-o, --out-dir [path]",
        "Where to output the subtitles file.",
        process.cwd(),
    )
    .option(
        "-f, --format [format]",
        "Choose between `srt` or `ass` formats. (Default `srt`)",
        "srt",
    )
    .option(
        '-h --highlight [color]',
        "(`ass` subtitles only) Highlight the active word with a color. (Default `#048BA8`)",
    )
    .action(forAction);

const models = program
    .command("models")
    .description("Manage models")
    .action(modelsAction);

models.command("purge")
    .action(modelsPurgeAction)
    .description("Delete all downloaded models.")

models.command("ls")
    .description(
        "Show a list of all models downloaded to the system.",
    )
    .action(modelsLs);

program
    .command("burn-in <video> <subtitles>")
    .description("Burn subtitles into a video. Video is output in the same directiory with a suffix added.")
    .action(burnInAction);

program
    .command("embed <video> <subtitles>")
    .description("Embed subtitles to a video. Video is output in the same directiory with a suffix added.")
    .action(embedAction);

program.parse(process.argv);

