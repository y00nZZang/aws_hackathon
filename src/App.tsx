import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StoryBoardPage from './pages/StoryBoardPage';

function App() {
  return (
    <Routes>
      <Route path="/new_story" element={<StoryBoardPage />} />
    </Routes>
  );
}

export default App;
