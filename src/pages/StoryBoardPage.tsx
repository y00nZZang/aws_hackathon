import React, { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  Card,
  CircularProgress,
  IconButton,
  TextField,
} from '@mui/material';
import { ChatCompletionMessageParam } from 'openai/resources';
import { Paragraph } from '../models/Paragraph';
import { createImage } from '../prompts/createImage';
import { createParagraph } from '../prompts/createParagraph';

const StoryBoardPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [paragraphs, setParagraphs] = useState<Paragraph[]>([]);

  const [sentence, setSentence] = useState<string>('');

  const [imageIndex, setImageIndex] = useState<number>(0);

  const onClickHandler = async () => {
    setParagraphs([...paragraphs, { role: 'user', content: sentence }]);
  };

  useEffect(() => {
    if (paragraphs.length > 0 && paragraphs.length % 2 === 1) {
      (async () => {
        setIsLoading(true);
        const res = await createParagraph(paragraphs);
        setIsLoading(false);
        if (res.choices.length > 0) {
          setParagraphs([...paragraphs, res.choices[0].message]);
        }
      })();
    }
  }, [paragraphs.length]);

  useEffect(() => {
    if (paragraphs.length > 0) {
      (async () => {
        const res = await createImage(
          paragraphs[paragraphs.length - 1].content as string,
        );
        if (res.data) {
          paragraphs[paragraphs.length - 1].image_url = res.data[0].url;
        }
      })();
    }
  }, [paragraphs.length]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'lightgray',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Card
        sx={{
          width: '40%',
          height: '100%',
          borderRadius: 10,
          position: 'relative',
        }}
      >
        {paragraphs.map((paragraph: Paragraph, index: number) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent:
                paragraph.role === 'user' ? 'flex-end' : 'flex-start',
              p: 2,
            }}
            onClick={() => {
              setImageIndex(index);
            }}
          >
            <Box
              sx={{
                maxWidth: '80%',
                backgroundColor:
                  paragraph.role === 'user' ? 'lightgreen' : 'lightblue',
                borderRadius: 2,
                p: 2,
              }}
            >
              {paragraph.content as string}
            </Box>
          </Box>
        ))}
        <Box sx={{ position: 'absolute', bottom: 0, p: 2, width: '100%' }}>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />{' '}
            </Box>
          ) : (
            <TextField
              fullWidth
              variant="outlined"
              value={sentence}
              onChange={(e) => setSentence(e.target.value)}
              InputProps={{
                sx: { borderRadius: 10 },
                endAdornment: (
                  <IconButton
                    type="submit"
                    onClick={() => {
                      onClickHandler();
                    }}
                  >
                    <SendIcon color="primary" />
                  </IconButton>
                ),
              }}
            />
          )}
        </Box>
      </Card>
      {imageIndex !== undefined && paragraphs[imageIndex]?.image_url && (
        <Card
          square
          sx={{
            width: '55%',
            borderRadius: 10,
            position: 'relative',
          }}
          elevation={0}
        >
          <img
            src={paragraphs[imageIndex].image_url}
            alt="Generated"
            style={{ width: '100%', height: '100%' }}
          />
        </Card>
      )}
    </div>
  );
};

export default StoryBoardPage;
