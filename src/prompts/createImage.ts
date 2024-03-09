import { ChatCompletionMessageParam } from 'openai/resources';
import { openai } from '../utils/network';

const default_prompt =
  '동화책을 만들고 있는데 제시하는 문장을 가지고 이미지를 생성해줘';

export const createImage = async (prompt: string) => {
  return openai.images.generate({
    model: 'dall-e-3',
    prompt,
    n: 1,
    size: '1024x1024',
  });
};
