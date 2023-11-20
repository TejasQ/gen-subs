import { readdir } from "fs/promises";
import ora from "ora";
import { formatSize, getModelDir, models } from "../util";

export async function modelsLs() {
    const spinner = ora().start("Getting models...");
    try {
        const modelsOnDisk = await readdir(await getModelDir())
        const filteredModels = modelsOnDisk.filter(model => models.find(m => m.name === model));

        if (!filteredModels.length) {
            spinner.succeed("No models available.");
            process.exit(0);
        }

        spinner.succeed("Models available:");
        console.log(filteredModels.map((model) => {
            const actualModel = models.find(m => m.name === model)!;
            return `- (${formatSize(actualModel.size)}, ${actualModel.language}) ${actualModel.notes}`
        }).join("\n"));
        process.exit(0);
    } catch {
        spinner.succeed("No models available.");
        process.exit(0);
    }
}