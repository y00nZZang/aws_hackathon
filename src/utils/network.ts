import ky from 'ky';
import OpenAI from 'openai';

export const client = ky.create({
  prefixUrl: 'ec2-43-200-183-63.ap-northeast-2.compute.amazonaws.com:8080',
});

export const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true,
});
