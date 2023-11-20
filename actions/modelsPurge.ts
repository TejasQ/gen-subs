import ora from "ora";
import inquirer from "inquirer";
import { rimraf } from "rimraf";
import { join } from "path";
import { workingDir } from "../util";
import { mkdirp } from "mkdirp";

export async function modelsPurgeAction() {
    const confirm = await inquirer.prompt([{
        type: "confirm",
        name: "confirm",
        message: "Are you sure you want to purge all models?",
    }]);

    if (!confirm.confirm) {
        process.exit(0);
    }

    const spinner = ora().start("Deleting models...");
    await rimraf(join(workingDir, "models"));
    await mkdirp(join(workingDir, "models"));
    spinner.succeed("Models purged.");
}