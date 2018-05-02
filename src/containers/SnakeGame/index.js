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
import { startGame, getKeyCodeInput, changeTouchCoordinates, calculateBoard } from './actions';
import { GAME_OVER, STARTED_GAME } from './constants';

export class SnakeGame extends Component {
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
    const { status, score } = game;
    return (
      <div>
        {status !== STARTED_GAME &&
        <button
          onClick={() => {
            const { width, height } = this.wrapperDiv.getBoundingClientRect();
            this.props.onCalculateBoard({ width, height });
            onStartGame();
          }}
        >Play
        </button>
        }
        {status === STARTED_GAME &&
          <div style={{ height: '10%', backgroundColor: 'green' }}>Score: {score}</div>
        }
        <div style={{ height: '90%' }} ref={(wrapperDiv) => this.wrapperDiv = wrapperDiv}>
          {status === STARTED_GAME && <Board dimensions={board.dimensions} snake={snake} apple={apple} onGetKeyCodeInput={onGetKeyCodeInput} touchCoordinates={touchCoordinates} onChangeTouchCoordinates={onChangeTouchCoordinates} />}
        </div>
        {status === GAME_OVER && <div>GAME OVER!</div>}
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
