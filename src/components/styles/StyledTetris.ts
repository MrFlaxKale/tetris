import styled from 'styled-components';

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to bottom right, #000000, #1a1a1a);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledTetris = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 40px;
  margin: 0 auto;
  max-width: 900px;
`;

export const StyledGameBoard = styled.div`
  display: grid;
  grid-template-rows: repeat(20, 30px);
  grid-template-columns: repeat(10, 30px);
  grid-gap: 1px;
  border: 2px solid #333;
  background: #111;
  padding: 10px;
  border-radius: 5px;
`;

export const StyledCell = styled.div<{ type: string | null }>`
  width: 30px;
  height: 30px;
  border-radius: 3px;
  background: ${props => props.type ? `var(--${props.type})` : '#000'};
  border: ${props => props.type ? '3px solid rgba(255, 255, 255, 0.1)' : '1px solid #111'};
`;

export const StyledSidePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 200px;
  color: #fff;
`;

export const StyledDisplay = styled.div`
  padding: 20px;
  border: 2px solid #333;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.5);
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;

  h3 {
    margin: 0 0 10px 0;
    font-size: 1rem;
    color: #999;
  }

  p {
    margin: 0;
    color: #fff;
  }
`;

export const StyledStartButton = styled.button`
  padding: 20px;
  border: none;
  border-radius: 5px;
  background: #00b894;
  color: white;
  font-family: 'Press Start 2P', monospace;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #00a187;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const StyledNextPiece = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 20px);
  grid-template-columns: repeat(4, 20px);
  grid-gap: 1px;
  background: #111;
  padding: 10px;
  border: 2px solid #333;
  border-radius: 5px;
`; 