import React, { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  Card,
  CircularProgress,
  IconButton,
  TextField,
} from '@mui/material';
import { create } from 'domain';
import { ChatCompletionMessageParam } from 'openai/resources';
import { useStoryQuery } from '../hooks/query/useStoryQuery';
import { createImage } from '../prompts/createImage';

const StoryBoardPage = () => {
  const [sentence, setSentence] = useState<string>('');

  const [imageIndex, setImageIndex] = useState<number>();

  const { mutate: sendMessage, isLoading, data } = useStoryQuery();

  const onClickHandler = () => {
    sendMessage(sentence);
  };

  const onClickCreateImage = async (index: number) => {
    setImageIndex(index);
  };

  useEffect(() => {
    if (imageIndex) {
      createImage(data[imageIndex].content as string).then((res) => {
        data[imageIndex].image_url = res.data[0].url;
      });
    }
  }, [imageIndex]);

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
        {data.map((message: ChatCompletionMessageParam, index: number) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent:
                message.role === 'user' ? 'flex-end' : 'flex-start',
              p: 2,
            }}
            onClick={() => {
              onClickCreateImage(index);
            }}
          >
            <Box
              sx={{
                maxWidth: '80%',
                backgroundColor:
                  message.role === 'user' ? 'lightgreen' : 'lightblue',
                borderRadius: 2,
                p: 2,
              }}
            >
              {message.content as string}
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
      {imageIndex !== undefined && data[imageIndex]?.image_url && (
        <Card
          sx={{
            width: '40%',
            height: '100%',
            borderRadius: 10,
            position: 'relative',
            marginLeft: '20px',
          }}
        >
          <img
            src={data[imageIndex].image_url}
            alt="Generated"
            style={{ width: '100%', height: '100%' }}
          />
        </Card>
      )}
    </div>
  );
};

export default StoryBoardPage;
