import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from '../../utils/injects/injectReducer';
import injectSaga from '../../utils/injects/injectSaga';
import reducer from './reducers/rootReducer';
import saga from './saga/rootSagas';
import Board from './Board';
import { getApple, getSnake, getGame, getTouchCoordinates, getBoard } from './selectors';
import { startGame, getKeyCodeInput, changeTouchCoordinates, createSnake, initializeApple, calculateBoard } from './actions';
import { GAME_OVER, STARTED_GAME } from './constants';
import { CELL_SIZE, GAME_HEIGHT, GAME_WIDTH } from './gameConstants';

const directions = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

const getHeight = (realWidth) => (GAME_HEIGHT * realWidth) / GAME_WIDTH;
const getCellSize = (realWidth) => (CELL_SIZE * realWidth) / GAME_WIDTH;

export class SnakeGame extends Component {
  componentDidMount() {
    console.log('width.....', this.wrapperDiv.getBoundingClientRect().height);
    const { width, height } = this.wrapperDiv.getBoundingClientRect();
    this.props.onCalculateBoard({ width, height: height - 30 });
    // let width = this.props.size.width;
    // let height = getHeight(width);
    // let cellSize = getCellSize(width);

    // let width = 20 * 21;
    // let height = 17 * 21;
    // let cellSize = 21;

    // if (height > this.props.size.height) {
    //
    // } else {
    //   cellSize = getCellSize(width);
    // }

    // const initialY = Math.floor(17 / 2);
    // this.props.onCreateSnake([
    //   { x: 9, y: initialY },
    //   { x: 8, y: initialY },
    //   { x: 7, y: initialY },
    //   { x: 6, y: initialY },
    // ]);
    // this.props.onInitializeApple({ x: 9, y: initialY + 2 });
  }

  render() {
    const {
      game = {},
      onStartGame,
      onGetKeyCodeInput,
      onChangeTouchCoordinates,
      touchCoordinates,
      snake = {},
      apple = {},
      board = {},
    } = this.props;
    // console.log('snake', snake);
    // console.log('apple', apple);
    const { status, score } = game;
    return (
      <div>
        {status !== STARTED_GAME && status !== GAME_OVER &&
        <button
          onClick={() => onStartGame()}
        >Play
        </button>
        }
        {status === STARTED_GAME &&
          <div style={{ height: '10%' }}>Score: {score}</div>
        }
        <div style={{ height: '90%' }} ref={(wrapperDiv) => this.wrapperDiv = wrapperDiv}>
          {status === STARTED_GAME && <Board dimensions={board.dimensions} snake={snake} apple={apple} onGetKeyCodeInput={onGetKeyCodeInput} touchCoordinates={touchCoordinates} onChangeTouchCoordinates={onChangeTouchCoordinates} />}
        </div>
        {status === GAME_OVER && <div style={{ height: '10%' }}>GAME OVER!</div>}
      </div>

    );
  }
}

export const mapStateToProps = createStructuredSelector({
  snake: getSnake(),
  apple: getApple(),
  game: getGame(),
  touchCoordinates: getTouchCoordinates(),
  board: getBoard(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onStartGame: () => dispatch(startGame()),
    onGetKeyCodeInput: (keyCode) => dispatch(getKeyCodeInput(keyCode)),
    onChangeTouchCoordinates: (touchCoords) => dispatch(changeTouchCoordinates(touchCoords)),
    // onCreateSnake: (coordinates) => dispatch(createSnake(coordinates)),
    // onInitializeApple: (coordinates) => dispatch(initializeApple(coordinates)),
    onCalculateBoard: (width, heigth) => dispatch(calculateBoard(width, heigth)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'snakeGame', reducer });
const withSaga = injectSaga({ key: 'snakeGame', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SnakeGame);
