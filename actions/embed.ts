import { join } from "path";
import ora from "ora";
import { embedSubtitles } from "../embedSubtitles";
import { formatDuration } from "../formatDuration";

export async function embedAction(video: string, subtitles: string) {
    const started = Date.now();
    const spinner = ora().start("Embedding subtitles...");
    await embedSubtitles(join(process.cwd(), video), join(process.cwd(), subtitles))
    spinner.succeed(`Subtitles embedded, took ${formatDuration(Date.now() - started)}.`);
}