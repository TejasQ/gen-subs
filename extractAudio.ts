import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import { join } from "path";
import { workingDir } from "./util";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export function extractAudio(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileName = filePath.split("/").pop() ?? "";
    const fileNameWithoutExtension = fileName.split(".")[0];
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
