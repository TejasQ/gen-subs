import ora from "ora";
import inquirer from "inquirer";
import { rimraf } from "rimraf";
import { getModelDir } from "../util";

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
    await rimraf(await getModelDir());
    spinner.succeed("Models purged.");
}