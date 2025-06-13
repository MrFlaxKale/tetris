import { TetrominoType, Tetromino, BoardType, TetrominoPosition } from '../types/tetris.types';
import { BOARD_WIDTH, BOARD_HEIGHT, TETROMINOS } from '../constants/tetrominos';

export const createEmptyBoard = (): BoardType => {
  return Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null));
};

export const createTetromino = (type: TetrominoType): Tetromino => {
  return {
    type,
    position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
    rotation: 0,
    shape: TETROMINOS[type],
  };
};

export const getRandomTetromino = (): TetrominoType => {
  const pieces: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
  return pieces[Math.floor(Math.random() * pieces.length)];
};

export const rotateTetromino = (tetromino: Tetromino): number[][] => {
  const matrix = tetromino.shape;
  const N = matrix.length;
  const rotated = Array(N).fill(0).map(() => Array(N).fill(0));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      rotated[j][N - 1 - i] = matrix[i][j];
    }
  }

  return rotated;
};

export const isValidMove = (
  board: BoardType,
  tetromino: Tetromino,
  position: TetrominoPosition
): boolean => {
  const matrix = tetromino.shape;
  
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x]) {
        const newX = position.x + x;
        const newY = position.y + y;

        if (
          newX < 0 ||
          newX >= BOARD_WIDTH ||
          newY >= BOARD_HEIGHT ||
          (newY >= 0 && board[newY][newX])
        ) {
          return false;
        }
      }
    }
  }
  
  return true;
};

export const mergeTetromino = (board: BoardType, tetromino: Tetromino): BoardType => {
  const newBoard = board.map(row => [...row]);
  const matrix = tetromino.shape;

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x]) {
        const boardY = tetromino.position.y + y;
        if (boardY >= 0) {
          newBoard[boardY][tetromino.position.x + x] = tetromino.type;
        }
      }
    }
  }

  return newBoard;
};

export const clearLines = (board: BoardType): { newBoard: BoardType; linesCleared: number } => {
  let linesCleared = 0;
  const newBoard = board.filter(row => {
    const isLineFull = row.every(cell => cell !== null);
    if (isLineFull) linesCleared++;
    return !isLineFull;
  });

  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(null));
  }

  return { newBoard, linesCleared };
};

export const calculateScore = (linesCleared: number, level: number): number => {
  const basePoints = {
    1: 100,
    2: 300,
    3: 500,
    4: 800,
  }[linesCleared] || 0;
  
  return basePoints * level;
};

export const calculateLevel = (lines: number): number => {
  return Math.floor(lines / 10) + 1;
}; 