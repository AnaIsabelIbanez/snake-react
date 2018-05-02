import { CALCUALTE_BOARD } from '../constants';
import { CELL_SCALE } from '../gameConstants';

// const getHeight = (realWidth) => (GAME_HEIGHT * realWidth) / GAME_WIDTH;
// const getCellSize = (dimension) => (10 * dimension) / 500;

const calculateDimension = (firstDim, secondDim) => {
  console.log('firstDim', firstDim);
  //const firstDimension = Math.floor(firstDim); //- (Math.floor(firstDim) % 5);
  console.log('firstDimension', firstDimension);
  const cellSize = Math.floor(firstDim / 50);
  const firstDimension = cellSize * 50;
  const cellsHeight = Math.floor(secondDim / cellSize);
  const secondDimension = cellsHeight * cellSize;
  return { secondDimension, firstDimension, cellSize };
};

const getDimensions = (wrapperDimensions) => {
  const { width, height } = wrapperDimensions;
  let dimensions = calculateDimension(width, height);
  let boardWidth;
  let boardHeight;
  if (dimensions.secondDimension > height) {
    dimensions = calculateDimension(height, width);
    boardWidth = dimensions.secondDimension;
    boardHeight = dimensions.firstDimension;
  } else {
    boardHeight = dimensions.secondDimension;
    boardWidth = dimensions.firstDimension;
  }
  const cellsInWidth = Math.floor(boardWidth / dimensions.cellSize);
  const cellsInHeight = Math.floor(boardHeight / dimensions.cellSize);
  return { cellsInHeight, cellsInWidth, cellSize: dimensions.cellSize, width: boardWidth, height: boardHeight };
};

const initialState = {
  dimensions: {},
};

function boardReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CALCUALTE_BOARD:
      return {
        ...state,
        dimensions: getDimensions(payload),
      };
    default:
      return state;
  }
}

export default boardReducer;
