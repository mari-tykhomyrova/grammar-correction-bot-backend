import { Configuration, OpenAIApi } from "openai";

const configuration: Configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openaiService: OpenAIApi = new OpenAIApi(configuration);

export const checkGrammarResponse = async (text: string) => await openaiService.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [
    {
      "role": "system",
      "content": "You will be provided with statements, and your task is to convert them to standard English.",
    },
    {
      "role": "user",
      "content": text,
    },
  ],
  temperature: 0,
  max_tokens: 256,
});
