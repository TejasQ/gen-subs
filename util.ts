import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { tmpdir } from 'os';
import { lstat } from 'fs/promises';
import { mkdirp } from 'mkdirp';

type Model = {
  "language": string
  "url": string
  "name": string
  "label": string
  "size": number
  "notes": string
  "type": string
}

export const videoExtensions = ["mp4", "mov", "mkv", "avi", "webm"];
export const audioExtensions = [
  "wav",
  "mp3",
  "ogg",
  "flac",
  "aac",
  "wma",
  "m4a",
];

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export const workingDir = join(tmpdir(), "gen-subs")
export const getModelDir = async () => {
  try {
    await lstat(join(workingDir, "models"))
    return join(workingDir, "models")
  } catch {
    await mkdirp(join(workingDir, "models"))
    return join(workingDir, "models")
  }
}

export const isModelDownloaded = async (name: string) => {
  return await lstat(join(workingDir, "models", name))
    .then(() => true)
    .catch(() => false);
}

export const formatSize = (size: number) => {
  if (size < 1024) {
    return size + 'MB';
  } else {
    // Divide by 1024 and fix to 2 decimal places
    return (size / 1024).toFixed(2) + 'GB';
  }
}

export const models: Model[] = [
  {
    "language": "English",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip",
    "name": "vosk-model-small-en-us-0.15",
    "label": "small-en-us-0.15",
    "size": 40,
    "notes": "Lightweight wideband model for Android and RPi",
    "type": "local"
  },
  {
    "language": "English",
    "url": "https://alphacephei.com/vosk/models/vosk-model-en-us-0.22.zip",
    "name": "vosk-model-en-us-0.22",
    "label": "en-us-0.22",
    "size": 1800,
    "notes": "Accurate generic US English model",
    "type": "local"
  },
  {
    "language": "English",
    "url": "https://alphacephei.com/vosk/models/vosk-model-en-us-0.22-lgraph.zip",
    "name": "vosk-model-en-us-0.22-lgraph",
    "label": "en-us-0.22-lgraph",
    "size": 128,
    "notes": "Big US English model with dynamic graph",
    "type": "local"
  },
  {
    "language": "English",
    "url": "https://alphacephei.com/vosk/models/vosk-model-en-us-0.42-gigaspeech.zip",
    "name": "vosk-model-en-us-0.42-gigaspeech",
    "label": "en-us-0.42-gigaspeech",
    "size": 2300,
    "notes": "Accurate generic US English model trained by Kaldi on Gigaspeech. Mostly for podcasts, not for telephony",
    "type": "local"
  },
  {
    "language": "English",
    "url": "https://alphacephei.com/vosk/models/vosk-model-en-us-daanzu-20200905.zip",
    "name": "vosk-model-en-us-daanzu-20200905",
    "label": "en-us-daanzu-20200905",
    "size": 1000,
    "notes": "Wideband model for dictation from Kaldi-active-grammar project",
    "type": "local"
  },
  {
    "language": "English",
    "url": "https://alphacephei.com/vosk/models/vosk-model-en-us-daanzu-20200905-lgraph.zip",
    "name": "vosk-model-en-us-daanzu-20200905-lgraph",
    "label": "en-us-daanzu-20200905-lgraph",
    "size": 129,
    "notes": "Wideband model for dictation from Kaldi-active-grammar project with configurable graph",
    "type": "local"
  },
  {
    "language": "English",
    "url": "https://alphacephei.com/vosk/models/vosk-model-en-us-librispeech-0.2.zip",
    "name": "vosk-model-en-us-librispeech-0.2",
    "label": "en-us-librispeech-0.2",
    "size": 845,
    "notes": "Repackaged Librispeech model from Kaldi, not very accurate",
    "type": "local"
  },
  {
    "language": "English",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-en-us-zamia-0.5.zip",
    "name": "vosk-model-small-en-us-zamia-0.5",
    "label": "small-en-us-zamia-0.5",
    "size": 49,
    "notes": "Repackaged Zamia model f_250, mainly for research",
    "type": "local"
  },
  {
    "language": "English",
    "url": "https://alphacephei.com/vosk/models/vosk-model-en-us-aspire-0.2.zip",
    "name": "vosk-model-en-us-aspire-0.2",
    "label": "en-us-aspire-0.2",
    "size": 1400,
    "notes": "Kaldi original ASPIRE model, not very accurate",
    "type": "local"
  },
  {
    "language": "English",
    "url": "https://alphacephei.com/vosk/models/vosk-model-en-us-0.21.zip",
    "name": "vosk-model-en-us-0.21",
    "label": "en-us-0.21",
    "size": 1600,
    "notes": "Wideband model previous generation",
    "type": "local"
  },
  {
    "language": "Indian English",
    "url": "https://alphacephei.com/vosk/models/vosk-model-en-in-0.5.zip",
    "name": "vosk-model-en-in-0.5",
    "label": "en-in-0.5",
    "size": 1000,
    "notes": "Generic Indian English model for telecom and broadcast",
    "type": "local"
  },
  {
    "language": "Indian English",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-en-in-0.4.zip",
    "name": "vosk-model-small-en-in-0.4",
    "label": "small-en-in-0.4",
    "size": 36,
    "notes": "Lightweight Indian English model for mobile applications",
    "type": "local"
  },
  {
    "language": "Chinese",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-cn-0.22.zip",
    "name": "vosk-model-small-cn-0.22",
    "label": "small-cn-0.22",
    "size": 42,
    "notes": "Lightweight model for Android and RPi",
    "type": "local"
  },
  {
    "language": "Chinese",
    "url": "https://alphacephei.com/vosk/models/vosk-model-cn-0.22.zip",
    "name": "vosk-model-cn-0.22",
    "label": "cn-0.22",
    "size": 1300,
    "notes": "Big generic Chinese model for server processing",
    "type": "local"
  },
  {
    "language": "Chinese",
    "url": "https://alphacephei.com/vosk/models/vosk-model-cn-kaldi-multicn-0.15.zip",
    "name": "vosk-model-cn-kaldi-multicn-0.15",
    "label": "cn-kaldi-multicn-0.15",
    "size": 1500,
    "notes": "Original Wideband Kaldi multi-cn model from Kaldi with Vosk LM",
    "type": "local"
  },
  {
    "language": "Russian",
    "url": "https://alphacephei.com/vosk/models/vosk-model-ru-0.42.zip",
    "name": "vosk-model-ru-0.42",
    "label": "ru-0.42",
    "size": 1800,
    "notes": "Big mixed band Russian model for servers",
    "type": "local"
  },
  {
    "language": "Russian",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-ru-0.22.zip",
    "name": "vosk-model-small-ru-0.22",
    "label": "small-ru-0.22",
    "size": 45,
    "notes": "Lightweight wideband model for Android/iOS and RPi",
    "type": "local"
  },
  {
    "language": "Russian",
    "url": "https://alphacephei.com/vosk/models/vosk-model-ru-0.22.zip",
    "name": "vosk-model-ru-0.22",
    "label": "ru-0.22",
    "size": 1500,
    "notes": "Big mixed band Russian model for servers",
    "type": "local"
  },
  {
    "language": "Russian",
    "url": "https://alphacephei.com/vosk/models/vosk-model-ru-0.10.zip",
    "name": "vosk-model-ru-0.10",
    "label": "ru-0.10",
    "size": 2500,
    "notes": "Big narrowband Russian model for servers",
    "type": "local"
  },
  {
    "language": "French",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-fr-0.22.zip",
    "name": "vosk-model-small-fr-0.22",
    "label": "small-fr-0.22",
    "size": 41,
    "notes": "Lightweight wideband model for Android/iOS and RPi",
    "type": "local"
  },
  {
    "language": "French",
    "url": "https://alphacephei.com/vosk/models/vosk-model-fr-0.22.zip",
    "name": "vosk-model-fr-0.22",
    "label": "fr-0.22",
    "size": 1400,
    "notes": "Big accurate model for servers",
    "type": "local"
  },
  {
    "language": "French",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-fr-pguyot-0.3.zip",
    "name": "vosk-model-small-fr-pguyot-0.3",
    "label": "small-fr-pguyot-0.3",
    "size": 39,
    "notes": "Lightweight wideband model for Android and RPi trained by Paul Guyot",
    "type": "local"
  },
  {
    "language": "French",
    "url": "https://alphacephei.com/vosk/models/vosk-model-fr-0.6-linto-2.2.0.zip",
    "name": "vosk-model-fr-0.6-linto-2.2.0",
    "label": "fr-0.6-linto-2.2.0",
    "size": 1500,
    "notes": "Model from LINTO project",
    "type": "local"
  },
  {
    "language": "German",
    "url": "https://alphacephei.com/vosk/models/vosk-model-de-0.21.zip",
    "name": "vosk-model-de-0.21",
    "label": "de-0.21",
    "size": 1900,
    "notes": "Big German model for telephony and server",
    "type": "local"
  },
  {
    "language": "German",
    "url": "https://alphacephei.com/vosk/models/vosk-model-de-tuda-0.6-900k.zip",
    "name": "vosk-model-de-tuda-0.6-900k",
    "label": "de-tuda-0.6-900k",
    "size": 4400,
    "notes": "Latest big wideband model from Tuda-DE project",
    "type": "local"
  },
  {
    "language": "German",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-de-zamia-0.3.zip",
    "name": "vosk-model-small-de-zamia-0.3",
    "label": "small-de-zamia-0.3",
    "size": 49,
    "notes": "Zamia f_250 small model repackaged (not recommended)",
    "type": "local"
  },
  {
    "language": "German",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-de-0.15.zip",
    "name": "vosk-model-small-de-0.15",
    "label": "small-de-0.15",
    "size": 45,
    "notes": "Lightweight wideband model for Android and RPi",
    "type": "local"
  },
  {
    "language": "Spanish",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-es-0.42.zip",
    "name": "vosk-model-small-es-0.42",
    "label": "small-es-0.42",
    "size": 39,
    "notes": "Lightweight wideband model for Android and RPi",
    "type": "local"
  },
  {
    "language": "Spanish",
    "url": "https://alphacephei.com/vosk/models/vosk-model-es-0.42.zip",
    "name": "vosk-model-es-0.42",
    "label": "es-0.42",
    "size": 1400,
    "notes": "Big model for Spanish",
    "type": "local"
  },
  {
    "language": "Portuguese/Brazilian",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-pt-0.3.zip",
    "name": "vosk-model-small-pt-0.3",
    "label": "small-pt-0.3",
    "size": 31,
    "notes": "Lightweight wideband model for Android and RPi",
    "type": "local"
  },
  {
    "language": "Portuguese/Brazilian",
    "url": "https://alphacephei.com/vosk/models/vosk-model-pt-fb-v0.1.1-20220516_2113.zip",
    "name": "vosk-model-pt-fb-v0.1.1-20220516_2113",
    "label": "pt-fb-v0.1.1-20220516_2113",
    "size": 1600,
    "notes": "Big model from FalaBrazil",
    "type": "local"
  },
  {
    "language": "Greek",
    "url": "https://alphacephei.com/vosk/models/vosk-model-el-gr-0.7.zip",
    "name": "vosk-model-el-gr-0.7",
    "label": "el-gr-0.7",
    "size": 1100,
    "notes": "Big narrowband Greek model for server processing, not extremely accurate though",
    "type": "local"
  },
  {
    "language": "Turkish",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-tr-0.3.zip",
    "name": "vosk-model-small-tr-0.3",
    "label": "small-tr-0.3",
    "size": 35,
    "notes": "Lightweight wideband model for Android and RPi",
    "type": "local"
  },
  {
    "language": "Vietnamese",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-vn-0.4.zip",
    "name": "vosk-model-small-vn-0.4",
    "label": "small-vn-0.4",
    "size": 32,
    "notes": "Lightweight Vietnamese model",
    "type": "local"
  },
  {
    "language": "Vietnamese",
    "url": "https://alphacephei.com/vosk/models/vosk-model-vn-0.4.zip",
    "name": "vosk-model-vn-0.4",
    "label": "vn-0.4",
    "size": 78,
    "notes": "Bigger Vietnamese model for server",
    "type": "local"
  },
  {
    "language": "Italian",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-it-0.22.zip",
    "name": "vosk-model-small-it-0.22",
    "label": "small-it-0.22",
    "size": 48,
    "notes": "Lightweight model for Android and RPi",
    "type": "local"
  },
  {
    "language": "Italian",
    "url": "https://alphacephei.com/vosk/models/vosk-model-it-0.22.zip",
    "name": "vosk-model-it-0.22",
    "label": "it-0.22",
    "size": 1200,
    "notes": "Big generic Italian model for servers",
    "type": "local"
  },
  {
    "language": "Dutch",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-nl-0.22.zip",
    "name": "vosk-model-small-nl-0.22",
    "label": "small-nl-0.22",
    "size": 39,
    "notes": "Lightweight model for Dutch",
    "type": "local"
  },
  {
    "language": "Dutch",
    "url": "https://alphacephei.com/vosk/models/vosk-model-nl-spraakherkenning-0.6.zip",
    "name": "vosk-model-nl-spraakherkenning-0.6",
    "label": "nl-spraakherkenning-0.6",
    "size": 860,
    "notes": "Medium Dutch model from Kaldi_NL",
    "type": "local"
  },
  {
    "language": "Dutch",
    "url": "https://alphacephei.com/vosk/models/vosk-model-nl-spraakherkenning-0.6-lgraph.zip",
    "name": "vosk-model-nl-spraakherkenning-0.6-lgraph",
    "label": "nl-spraakherkenning-0.6-lgraph",
    "size": 100,
    "notes": "Smaller model with dynamic graph",
    "type": "local"
  },
  {
    "language": "Catalan",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-ca-0.4.zip",
    "name": "vosk-model-small-ca-0.4",
    "label": "small-ca-0.4",
    "size": 42,
    "notes": "Lightweight wideband model for Android and RPi for Catalan",
    "type": "local"
  },
  {
    "language": "Arabic",
    "url": "https://alphacephei.com/vosk/models/vosk-model-ar-mgb2-0.4.zip",
    "name": "vosk-model-ar-mgb2-0.4",
    "label": "ar-mgb2-0.4",
    "size": 318,
    "notes": "Repackaged Arabic model trained on MGB2 dataset from Kaldi",
    "type": "local"
  },
  {
    "language": "Arabic",
    "url": "https://alphacephei.com/vosk/models/vosk-model-ar-0.22-linto-1.1.0.zip",
    "name": "vosk-model-ar-0.22-linto-1.1.0",
    "label": "ar-0.22-linto-1.1.0",
    "size": 1300,
    "notes": "Big model from LINTO project",
    "type": "local"
  },
  {
    "language": "Farsi",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-fa-0.4.zip",
    "name": "vosk-model-small-fa-0.4",
    "label": "small-fa-0.4",
    "size": 47,
    "notes": "Lightweight wideband model for Android and RPi for Farsi (Persian)",
    "type": "local"
  },
  {
    "language": "Farsi",
    "url": "https://alphacephei.com/vosk/models/vosk-model-fa-0.5.zip",
    "name": "vosk-model-fa-0.5",
    "label": "fa-0.5",
    "size": 1000,
    "notes": "Model with large vocabulary, not yet accurate but better than before (Persian)",
    "type": "local"
  },
  {
    "language": "Farsi",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-fa-0.5.zip",
    "name": "vosk-model-small-fa-0.5",
    "label": "small-fa-0.5",
    "size": 60,
    "notes": "Bigger small model for desktop application (Persian)",
    "type": "local"
  },
  {
    "language": "Filipino",
    "url": "https://alphacephei.com/vosk/models/vosk-model-tl-ph-generic-0.6.zip",
    "name": "vosk-model-tl-ph-generic-0.6",
    "label": "tl-ph-generic-0.6",
    "size": 320,
    "notes": "Medium wideband model for Filipino (Tagalog) by feddybear",
    "type": "local"
  },
  {
    "language": "Ukrainian",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-uk-v3-nano.zip",
    "name": "vosk-model-small-uk-v3-nano",
    "label": "small-uk-v3-nano",
    "size": 73,
    "notes": "Nano model from Speech Recognition for Ukrainian",
    "type": "local"
  },
  {
    "language": "Ukrainian",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-uk-v3-small.zip",
    "name": "vosk-model-small-uk-v3-small",
    "label": "small-uk-v3-small",
    "size": 133,
    "notes": "Small model from Speech Recognition for Ukrainian",
    "type": "local"
  },
  {
    "language": "Ukrainian",
    "url": "https://alphacephei.com/vosk/models/vosk-model-uk-v3.zip",
    "name": "vosk-model-uk-v3",
    "label": "uk-v3",
    "size": 343,
    "notes": "Bigger model from Speech Recognition for Ukrainian",
    "type": "local"
  },
  {
    "language": "Ukrainian",
    "url": "https://alphacephei.com/vosk/models/vosk-model-uk-v3-lgraph.zip",
    "name": "vosk-model-uk-v3-lgraph",
    "label": "uk-v3-lgraph",
    "size": 325,
    "notes": "Big dynamic model from Speech Recognition for Ukrainian",
    "type": "local"
  },
  {
    "language": "Kazakh",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-kz-0.15.zip",
    "name": "vosk-model-small-kz-0.15",
    "label": "small-kz-0.15",
    "size": 42,
    "notes": "Small mobile model from SAIDA_Kazakh",
    "type": "local"
  },
  {
    "language": "Kazakh",
    "url": "https://alphacephei.com/vosk/models/vosk-model-kz-0.15.zip",
    "name": "vosk-model-kz-0.15",
    "label": "kz-0.15",
    "size": 378,
    "notes": "Bigger wideband model SAIDA_Kazakh",
    "type": "local"
  },
  {
    "language": "Swedish",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-sv-rhasspy-0.15.zip",
    "name": "vosk-model-small-sv-rhasspy-0.15",
    "label": "small-sv-rhasspy-0.15",
    "size": 289,
    "notes": "Repackaged model from Rhasspy project",
    "type": "local"
  },
  {
    "language": "Japanese",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-ja-0.22.zip",
    "name": "vosk-model-small-ja-0.22",
    "label": "small-ja-0.22",
    "size": 48,
    "notes": "Lightweight wideband model for Japanese",
    "type": "local"
  },
  {
    "language": "Japanese",
    "url": "https://alphacephei.com/vosk/models/vosk-model-ja-0.22.zip",
    "name": "vosk-model-ja-0.22",
    "label": "ja-0.22",
    "size": 1024,
    "notes": "Big model for Japanese",
    "type": "local"
  },
  {
    "language": "Esperanto",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-eo-0.42.zip",
    "name": "vosk-model-small-eo-0.42",
    "label": "small-eo-0.42",
    "size": 42,
    "notes": "Lightweight model for Esperanto",
    "type": "local"
  },
  {
    "language": "Hindi",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-hi-0.22.zip",
    "name": "vosk-model-small-hi-0.22",
    "label": "small-hi-0.22",
    "size": 42,
    "notes": "Lightweight model for Hindi",
    "type": "local"
  },
  {
    "language": "Hindi",
    "url": "https://alphacephei.com/vosk/models/vosk-model-hi-0.22.zip",
    "name": "vosk-model-hi-0.22",
    "label": "hi-0.22",
    "size": 1536,
    "notes": "Big accurate model for servers",
    "type": "local"
  },
  {
    "language": "Czech",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-cs-0.4-rhasspy.zip",
    "name": "vosk-model-small-cs-0.4-rhasspy",
    "label": "small-cs-0.4-rhasspy",
    "size": 44,
    "notes": "Lightweight model for Czech from Rhasspy project",
    "type": "local"
  },
  {
    "language": "Polish",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-pl-0.22.zip",
    "name": "vosk-model-small-pl-0.22",
    "label": "small-pl-0.22",
    "size": 50,
    "notes": "Lightweight model for Polish",
    "type": "local"
  },
  {
    "language": "Uzbek",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-uz-0.22.zip",
    "name": "vosk-model-small-uz-0.22",
    "label": "small-uz-0.22",
    "size": 49,
    "notes": "Lightweight model for Uzbek",
    "type": "local"
  },
  {
    "language": "Korean",
    "url": "https://alphacephei.com/vosk/models/vosk-model-small-ko-0.22.zip",
    "name": "vosk-model-small-ko-0.22",
    "label": "small-ko-0.22",
    "size": 82,
    "notes": "Lightweight model for Korean",
    "type": "local"
  },
  {
    "language": "Breton",
    "url": "https://alphacephei.com/vosk/models/vosk-model-br-0.8.zip",
    "name": "vosk-model-br-0.8",
    "label": "br-0.8",
    "size": 70,
    "notes": "Breton model from vosk-br project",
    "type": "local"
  },
  {
    "language": "Speaker identification model",
    "url": "https://alphacephei.com/vosk/models/vosk-model-spk-0.4.zip",
    "name": "vosk-model-spk-0.4",
    "label": "spk-0.4",
    "size": 13,
    "notes": "Model for speaker identification, should work for all languages",
    "type": "local"
  }
];