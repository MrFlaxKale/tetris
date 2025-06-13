import React, { useState, useCallback, useEffect } from 'react';
import { 
  StyledTetrisWrapper, 
  StyledTetris, 
  StyledGameBoard, 
  StyledSidePanel, 
  StyledDisplay, 
  StyledStartButton,
  StyledNextPiece
} from './styles/StyledTetris';
import Cell from './Cell';
import { useInterval } from '../hooks/useInterval';
import { 
  createEmptyBoard, 
  createTetromino, 
  getRandomTetromino, 
  isValidMove, 
  mergeTetromino, 
  rotateTetromino, 
  clearLines,
  calculateScore,
  calculateLevel
} from '../utils/gameUtils';
import { BOARD_WIDTH, BOARD_HEIGHT, BASE_SPEED, LEVEL_SPEED_MULTIPLIER } from '../constants/tetrominos';
import { GameState, Tetromino, TetrominoPosition } from '../types/tetris.types';

const Tetris: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPiece: null,
    nextPiece: null,
    score: 0,
    level: 1,
    lines: 0,
    gameOver: false,
    isPaused: false
  });

  const startGame = () => {
    setGameState({
      board: createEmptyBoard(),
      currentPiece: createTetromino(getRandomTetromino()),
      nextPiece: createTetromino(getRandomTetromino()),
      score: 0,
      level: 1,
      lines: 0,
      gameOver: false,
      isPaused: false
    });
  };

  const movePlayer = (x: number, y: number) => {
    if (!gameState.currentPiece || gameState.gameOver || gameState.isPaused) return;

    const newPosition: TetrominoPosition = {
      x: gameState.currentPiece.position.x + x,
      y: gameState.currentPiece.position.y + y
    };

    if (isValidMove(gameState.board, gameState.currentPiece, newPosition)) {
      setGameState(prev => ({
        ...prev,
        currentPiece: {
          ...prev.currentPiece!,
          position: newPosition
        }
      }));
    }
  };

  const rotate = () => {
    if (!gameState.currentPiece || gameState.gameOver || gameState.isPaused) return;

    const rotatedShape = rotateTetromino(gameState.currentPiece);
    const rotatedPiece: Tetromino = {
      ...gameState.currentPiece,
      shape: rotatedShape
    };

    if (isValidMove(gameState.board, rotatedPiece, rotatedPiece.position)) {
      setGameState(prev => ({
        ...prev,
        currentPiece: rotatedPiece
      }));
    }
  };

  const drop = () => {
    if (!gameState.currentPiece || gameState.gameOver || gameState.isPaused) return;

    const newPosition: TetrominoPosition = {
      x: gameState.currentPiece.position.x,
      y: gameState.currentPiece.position.y + 1
    };

    if (isValidMove(gameState.board, gameState.currentPiece, newPosition)) {
      setGameState(prev => ({
        ...prev,
        currentPiece: {
          ...prev.currentPiece!,
          position: newPosition
        }
      }));
    } else {
      // Piece has landed
      const newBoard = mergeTetromino(gameState.board, gameState.currentPiece);
      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
      
      if (gameState.currentPiece.position.y <= 0) {
        setGameState(prev => ({
          ...prev,
          gameOver: true
        }));
        return;
      }

      const newLines = gameState.lines + linesCleared;
      const newLevel = calculateLevel(newLines);
      const additionalScore = calculateScore(linesCleared, newLevel);

      setGameState(prev => ({
        ...prev,
        board: clearedBoard,
        currentPiece: prev.nextPiece,
        nextPiece: createTetromino(getRandomTetromino()),
        score: prev.score + additionalScore,
        level: newLevel,
        lines: newLines
      }));
    }
  };

  const dropInterval = useCallback(() => {
    if (!gameState.gameOver && !gameState.isPaused) {
      drop();
    }
  }, [gameState.gameOver, gameState.isPaused]);

  useInterval(
    dropInterval,
    BASE_SPEED * Math.pow(LEVEL_SPEED_MULTIPLIER, gameState.level - 1)
  );

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gameState.gameOver) return;

    switch (event.code) {
      case 'ArrowLeft':
        movePlayer(-1, 0);
        break;
      case 'ArrowRight':
        movePlayer(1, 0);
        break;
      case 'ArrowDown':
        movePlayer(0, 1);
        break;
      case 'ArrowUp':
        rotate();
        break;
      case 'Space':
        event.preventDefault();
        setGameState(prev => ({
          ...prev,
          isPaused: !prev.isPaused
        }));
        break;
      default:
        break;
    }
  }, [gameState.gameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <StyledTetrisWrapper>
      <StyledTetris>
        <StyledGameBoard>
          {gameState.board.map((row, y) =>
            row.map((cell, x) => (
              <Cell
                key={`${y}-${x}`}
                type={cell}
              />
            ))
          )}
        </StyledGameBoard>
        <StyledSidePanel>
          <StyledDisplay>
            <h3>Next Piece</h3>
            <StyledNextPiece>
{gameState.nextPiece?.shape.map((row, y) =>
  row.map((cell, x) => (
    <Cell
      key={`next-${y}-${x}`}
      type={cell && gameState.nextPiece ? gameState.nextPiece.type : null}
    />
  ))
)}
            </StyledNextPiece>
          </StyledDisplay>
          <StyledDisplay>
            <h3>Score</h3>
            <p>{gameState.score}</p>
          </StyledDisplay>
          <StyledDisplay>
            <h3>Level</h3>
            <p>{gameState.level}</p>
          </StyledDisplay>
          <StyledDisplay>
            <h3>Lines</h3>
            <p>{gameState.lines}</p>
          </StyledDisplay>
          <StyledStartButton onClick={startGame}>
            {gameState.gameOver ? 'Game Over' : 'Start Game'}
          </StyledStartButton>
        </StyledSidePanel>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris; 
