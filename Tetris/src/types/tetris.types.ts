export type TetrominoType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

export type CellType = TetrominoType | null;

export type BoardType = CellType[][];

export type TetrominoPosition = {
  x: number;
  y: number;
};

export type TetrominoRotation = 0 | 90 | 180 | 270;

export type Tetromino = {
  type: TetrominoType;
  position: TetrominoPosition;
  rotation: TetrominoRotation;
  shape: number[][];
};

export type GameState = {
  board: BoardType;
  currentPiece: Tetromino | null;
  nextPiece: Tetromino | null;
  score: number;
  level: number;
  lines: number;
  gameOver: boolean;
  isPaused: boolean;
}; 