import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import { join } from "path";
import { workingDir } from "./util";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export function processAudio(inputPath: string): Promise<string> {
  const fileName = inputPath.split("/").pop() ?? "";
  const fileNameWithoutExtension = fileName.split(".")[0];
  const outputPath = join(
    workingDir, "from-video", `${Date.now()}-${fileNameWithoutExtension}.wav`,
  );
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .audioChannels(1) // Set to mono
      .format("s16le") // Set format to s16le (16-bit signed little-endian)
      .audioFrequency(16000) // Set audio frequency to 16kHz
      .format("wav")
      .on("end", () => {
        resolve(outputPath);
      })
      .on("error", (err) => {
        reject("Error: " + err);
      })
      .save(outputPath);
  });
}
