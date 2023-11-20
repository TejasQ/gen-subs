import https from 'https';
import fs from 'fs';
import yauzl from "yauzl";
import { mkdirp } from 'mkdirp';
import { dirname, join } from 'path';
import cliProgress from 'cli-progress';

import { workingDir } from './util';

export async function downloadFile(url: string, dest: string, name: string): Promise<string> {
    await mkdirp(join(workingDir, 'models'))
    await mkdirp(dest)
    const tempModel = join(workingDir, 'models', 'temp.zip');
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(tempModel);
        const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.rect);

        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject('Failed to download file, status code: ' + response.statusCode);
                return;
            }

            const totalSize = parseInt(response.headers['content-length'] ?? "0", 10);
            let receivedBytes = 0;
            console.log(`Downloading ${name}...`);
            progressBar.start(totalSize, 0);

            response.on('data', (chunk) => {
                receivedBytes += chunk.length;
                progressBar.update(receivedBytes);
            });

            response.pipe(file);

            file.on('finish', () => {
                progressBar.stop();
                file.close(() => resolve(tempModel));
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });

        file.on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

export async function unzipFile(zipFilePath: string, outputPath: string) {
    return new Promise(async (resolve, reject) => {
        try {
            yauzl.open(zipFilePath, { lazyEntries: true }, (err, zipfile) => {
                if (err) reject(err);

                zipfile.readEntry();
                zipfile.on("entry", (entry) => {
                    if (/\/$/.test(entry.fileName)) {
                        // Directory file names end with '/'
                        fs.mkdir(join(outputPath, entry.fileName), { recursive: true }, (err) => {
                            if (err) reject(err);
                            zipfile.readEntry();
                        });
                    } else {
                        // File entry
                        zipfile.openReadStream(entry, (err, readStream) => {
                            if (err) reject(err);
                            const filePath = join(outputPath, entry.fileName);
                            fs.mkdir(dirname(filePath), { recursive: true }, (err) => {
                                if (err) reject(err);
                                readStream.pipe(fs.createWriteStream(filePath));
                                readStream.on("end", () => {
                                    zipfile.readEntry();
                                });
                            });
                        });
                    }
                });
                zipfile.on("end", () => {
                    resolve(outputPath)
                });
            });
        } catch (err) {
            reject(err);
        }
    });
}
