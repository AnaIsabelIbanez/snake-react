import { CHANGE_DIRECTION, INCREMENT_POSITION, RIGHT, LEFT, UP, DOWN } from '../constants';

const directions = {
  [RIGHT]: { x: 1, y: 0 },
  [LEFT]: { x: -1, y: 0 },
  [UP]: { x: 0, y: -1 },
  [DOWN]: { x: 0, y: 1 },
};

// tablero[x1 + INC_X][y1 + INC_Y] = 1;

const getInitialBoard = () => {
  const board = [];
  for (let i = 0; i < 60; i++) {
    for (let j = 0; j < 80; j++) {
      board[j][i] = 0;
    }
  }
  board[0][0] = 1;
  board[0][1] = 1;
};

const getBoard = (state) => {
  const copyState = { ...state };
  console.log('board', copyState.board);
  const newPositionX = copyState.currentPosition.xIni + copyState.direction.x;
  const newPositionY = copyState.currentPosition.yIni + copyState.direction.y;
  const newPositionXend = copyState.currentPosition.xEnd;
  const newPositionYend = copyState.currentPosition.yEnd;
  if (newPositionX < width && newPositionX > 0 && newPositionY > 0 && newPositionY < heigth) {
    copyState.board[newPositionY][newPositionX] = 1;
    copyState.board[newPositionYend][newPositionXend] = 0;
  }
  return copyState.board;
};

const width = 80;
const heigth = 60;

const initialState = {
  speed: 50,
  currentPosition: {
    xIni: 0,
    yIni: 4,
    xEnd: 0,
    yEnd: 0,
  },
  direction: {
    x: 1,
    y: 0,
  },
  board: getInitialBoard(),
};

function snakeDirectionReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_DIRECTION:
      return {
        ...state,
        direction: directions[payload],
      };
    case INCREMENT_POSITION:
      return {
        ...state,
        board: getBoard(state),
        currentPosition: {
          xIni: state.currentPosition.xIni + state.direction.x,
          yIni: state.currentPosition.yIni + state.direction.y,
          xEnd: state.currentPosition.xEnd + state.direction.x,
          yEnd: state.currentPosition.yEnd + state.direction.y,
        },
      };
    default:
      return state;
  }
}

export default snakeDirectionReducer;
