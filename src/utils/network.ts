import ky from 'ky';
import OpenAI from 'openai';

export const client = ky.create({
  prefixUrl: 'ec2-43-200-183-63.ap-northeast-2.compute.amazonaws.com:8080',
});

export const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true,
});
