import { lstat } from "fs/promises";
import vosk, { Model } from "vosk";

export const loadModel = (path: string): Promise<Model> =>
  new Promise(async (resolve, reject) => {
    if (!path) {
      throw new Error("Model path is not provided.");
    }

    try {
      await lstat(path);
    } catch (e) {
      reject(`You don't seem to have this model downloaded. Please run the \`models\` command to download it.`);
    }

    process.nextTick(() => {
      vosk.setLogLevel(-1);
      const model = new vosk.Model(path);
      resolve(model);
    });
  });
