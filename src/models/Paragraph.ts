import { ChatCompletionMessageParam } from 'openai/resources';

export type Paragraph = ChatCompletionMessageParam & {
  original_message?: string;
  image_url?: string;
};
