# `gen-subs`

This project uses on-device machine learning models to generate subtitles for your videos.

https://github.com/TejasQ/gen-subs/assets/9947422/bc8df523-b62a-4123-a62d-2df17832e2ac

## Features

- 🔒 **Secure and offline** - All machine learning models are downloaded and run locally on your device. No data is sent to any server. There is zero dependency on OpenAI or other cloud services.
- 🌐 **Multilingual** - Supports a wide variety of languages. Namely,
  | Languages | | |
  | --------- | --------- | --------- |
  | 🇺🇸 English | 🇮🇳 Indian English | 🇨🇳 Chinese |
  | 🇷🇺 Russian | 🇫🇷 French | 🇩🇪 German |
  | 🇪🇸 Spanish | 🇵🇹 Portuguese/Brazilian | 🇬🇷 Greek |
  | 🇹🇷 Turkish | 🇻🇳 Vietnamese | 🇮🇹 Italian |
  | 🇳🇱 Dutch | 🇪🇸 Catalan | 🇸🇦 Arabic |
  | 🇮🇷 Farsi | 🇵🇭 Filipino | 🇺🇦 Ukrainian |
  | 🇰🇿 Kazakh | 🇸🇪 Swedish | 🇯🇵 Japanese |
  | 🇪🇸 Esperanto | 🇮🇳 Hindi | 🇨🇿 Czech |
  | 🇵🇱 Polish | 🇺🇿 Uzbek | 🇰🇷 Korean |
  | 🇫🇷 Breton | | |
- 🎨 **Customizable** - Choose from getting just an `srt` file, having the subtitles burned in to your video, and even embedding the subtitles in your video's metadata. You can also have **focus words** where the active word is highlighted in a different color.
- 🎧 **Multi-modal** - Supports both audio and video files and generates subtitles for each.
- 📊 **Multi-model** - Choose from a variety of machine learning models ranging from 40MB to >2GB in size. The larger the model, the more accurate the subtitles, but smaller models are also quite capable.

## Usage

You can generate subtitles for any video using the following command:

```bash
npx gen-subs for ./your/video.mp4
```

If you run this for the first time, you will be required to download a machine learning model to generate your subtitles. This needs to be done at least one time. Then, the program will generate a `.srt` file in your current working directory containing the subtitles for your video.

### Inaccuracies

Please note that you may get inaccurate results with the default, basic English model. This model is 40MB and is meant to be a quick way to get started. It's not very smart, so your mileage may vary. If you'd like more accurate results, you can download a larger model by running the following command:

```bash
npx gen-subs models
```

This will have you choose a language and then show you a collection of models, their sizes, and intended use cases (like podcasting, content, etc.). You can then choose a model and download it. Once downloaded, you can use it to generate subtitles for your video. You only download models once, and can remove them any time by running `npx gen-subs models purge`. You can also list all your downloaded models by running `npx gen-subs models ls`.

## API

This project has a few options that you can use to customize your subtitles. Let's enumerate them here. Each command comes after `npx gen-subs` and is followed by a list of options.

| Command        | Description                                         |
| -------------- | --------------------------------------------------- |
| `for`          | Generate subtitles for a given video or audio file. |
| `models`       | Manage models                                       |
| `models purge` | Delete all downloaded models.                       |
| `models ls`    | Show a list of all models downloaded to the system. |

### `gen-subs for [media]`

| Option                    | Description                                                                                                | Default                       |
| ------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `-m, --model [modelName]` | The name of the machine learning model you'd like to use to generate subtitles.                            | `vosk-model-small-en-us-0.15` |
| `-b, --burn-in`           | Whether to layer subtitles atop the video (burn them in).                                                  | None                          |
| `-e, --embed`             | Whether to embed subtitles in the video's metadata.                                                        | None                          |
| `-o, --out-dir [path]`    | Where to output the subtitle and final video files.                                                        | `process.cwd()`               |
| `-f, --format [format]`   | Choose between `srt` or `ass` formats. `ass` lets you do more cool stuff like focus words. (Default `srt`) | `srt`                         |
| `-h --highlight [color]`  | (`ass` subtitles only) Highlight the active word with a color.                                             | `#048BA8`                     |

## Contributing

Please feel free to open issues and pull requests as needed and I'll try to get to them as soon as possible.

## Sustainability

This is all free and open source software. If it has helped you, please consider [sponsoring me project on GitHub](https://github.com/sponsors/TejasQ) so I can make more stuff like this and teach about it full-time.
