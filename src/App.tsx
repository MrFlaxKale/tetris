import React from 'react';
import Tetris from './components/Tetris';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --I: #00f0f0;
    --O: #f0f000;
    --T: #a000f0;
    --S: #00f000;
    --Z: #f00000;
    --J: #0000f0;
    --L: #f0a000;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #000;
    color: #fff;
  }


`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Tetris />
    </>
  );
};

export default App; 
