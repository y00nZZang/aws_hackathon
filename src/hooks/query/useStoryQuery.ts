import { useState } from 'react';
import { useMutation } from 'react-query';
import { Paragraph } from '../../models/Paragraph';
import { createStory } from '../../prompts/createStory';

export const useStoryQuery = () => {
  const [messages, setMessages] = useState<Paragraph[]>([]);

  const mutation = useMutation({
    mutationKey: ['story'],
    mutationFn: (nextText: string) => {
      console.log('nextText', nextText);
      setMessages([...messages, { role: 'user', content: nextText }]);
      return createStory([
        ...messages,
        {
          role: 'user',
          content: nextText,
        },
      ]);
    },
    onSuccess: (data, variables) => {
      if (data.choices) {
        setMessages([
          ...messages,
          { role: 'user', content: variables },
          {
            role: 'assistant',
            content: data.choices[0].message.content,
          },
        ]);
      }
    },
  });

  return { ...mutation, data: messages };
};
