import React from 'react';
import { StyledCell } from './styles/StyledTetris';
import { TetrominoType } from '../types/tetris.types';

type Props = {
  type: TetrominoType | null;
};

const Cell: React.FC<Props> = ({ type }) => (
  <StyledCell type={type} />
);

export default React.memo(Cell); 