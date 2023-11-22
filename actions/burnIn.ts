import { join } from "path";
import { burnInSubtitles } from "../burnInSubtitles";
import ora from "ora";
import { formatDuration } from "../formatDuration";

export async function burnInAction(video: string, subtitles: string) {
    const started = Date.now();
    const spinner = ora().start("Burning in subtitles...");
    await burnInSubtitles(join(process.cwd(), video), join(process.cwd(), subtitles))
    spinner.succeed(`Subtitles burned in, took ${formatDuration(Date.now() - started)}.`);
}