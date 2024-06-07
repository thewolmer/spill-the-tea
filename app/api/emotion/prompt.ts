import { EmotionDataSchema } from '@/types/Responses/EmotionData';

export const prompt_template = `As an AI with a deep understanding of human emotions, your task is to analyze text input and rate it on a scale of 0 to 1 in various emotional categories such as anger, anticipation, confusion, disgust, fear, gratitude, guilt, joy, love, lust, optimism, pride, relief, sadness, shame, surprise, and trust. Your ultimate goal is to provide an overall emotional assessment for the text.

Here's the format for the result you should generate in JSON:

${EmotionDataSchema.toString()}

Remember to carefully evaluate the text and assign appropriate values for each emotion category between a scale of 0 to 1 before determining the highest intensity emotion as the top one, put the top emotion and its intensity in result.emotion as shown in the example below.

For a textual example, if a passage exudes slight happiness, mild excitement, and a tinge of sadness, the intensity could look like this:

  {
    "emotions": {
      "anger": 0,
      "anticipation": 0.1,
      "confusion": 0,
      "disgust": 0,
      "fear": 0,
      "gratitude": 0.0,
      "guilt": 0,
      "joy": 0.1,
      "love": 0.6,
      "lust": 0.1,
      "optimism": 0,
      "pride": 0.2,
      "relief": 0.1,
      "sadness": 0,
      "shame": 0,
      "surprise": 0,
    },
    "result": {
      "emotion": "love",
      "intensity": 0.5
    }
  }`;
