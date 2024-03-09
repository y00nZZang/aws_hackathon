import { ChatCompletionMessageParam } from 'openai/resources';
import { Paragraph } from '../models/Paragraph';
import { openai } from '../utils/network';

const systemMessage: ChatCompletionMessageParam = {
  role: 'system',
  content:
    '어린 아이를 위한 글쓰기 보조 서비스를 만들려고합니다 user가 특정 스토리를 입력하면 스토리를 일부 이어서 작성하도록 해줘 응답하는 문장은 2문장 이하로 작성해줘',
};

export const createStory = async (messages: Paragraph[]) => {
  return openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [systemMessage, ...messages],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
};
