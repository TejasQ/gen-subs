import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import { join } from "path";
import path from "path";
import { workingDir } from "./util";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export function extractAudio(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(filePath);
	const fileNameWithoutExtension = path.basename(filePath , path.extname(fileName));
    const extractedAudioTarget = join(
      workingDir,
      "from-video",
      `${Date.now()}-${fileNameWithoutExtension}.wav`,
    );
    ffmpeg(filePath)
      .noVideo()
      .audioCodec("pcm_s16le")
      .format("wav")
      .on("end", () => {
        resolve(extractedAudioTarget);
      })
      .on("error", (err) => {
        reject("Error: " + err);
      })
      .save(extractedAudioTarget);
  });
}
