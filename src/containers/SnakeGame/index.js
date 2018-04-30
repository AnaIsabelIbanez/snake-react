import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from '../../utils/injects/injectReducer';
import injectSaga from '../../utils/injects/injectSaga';
import reducer from './reducers/rootReducer';
import saga from './saga/rootSagas';
import Board from './Board';
import { getApple, getSnake, getGame, getTouchCoordinates } from './selectors';
import { startGame, getKeyCodeInput, changeTouchCoordinates } from './actions';
import { GAME_OVER, STARTED_GAME } from './constants';

const directions = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

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
    } = this.props;
    const { status, score } = game;
    return (<div
      style={{ display: 'inline' }} tabIndex="1" onKeyDown={(e) => {
        if (status === STARTED_GAME) {
          onGetKeyCodeInput(e.keyCode);
        }
      }}
      // onTouchStart={(event) => {
      //   if (status === STARTED_GAME) {
      //     const newTouchCoordinates = {
      //       x: event.touches[0].clientX,
      //       y: event.touches[0].clientY,
      //     };
      //     onChangeTouchCoordinates(newTouchCoordinates);
      //   }
      // }}
      // onTouchEnd={(event) => {
      //   if (status === STARTED_GAME) {
      //     const newTouchCoordinates = {
      //       x: event.changedTouches[0].clientX,
      //       y: event.changedTouches[0].clientY,
      //     };
      //     if (touchCoordinates) {
      //       if (touchCoordinates.y < newTouchCoordinates.y) {
      //         onGetKeyCodeInput(directions.DOWN);
      //       }
      //       if (touchCoordinates.y > newTouchCoordinates.y) {
      //         onGetKeyCodeInput(directions.UP);
      //       }
      //       if (touchCoordinates.x < newTouchCoordinates.x) {
      //         onGetKeyCodeInput(directions.RIGHT);
      //       }
      //       if (touchCoordinates.x > newTouchCoordinates.x) {
      //         onGetKeyCodeInput(directions.LEFT);
      //       }
      //     }
      //   }
      // }}
      onTouchMove={(event) => {
        if (status === STARTED_GAME) {
          const newTouchCoordinates = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY,
          };
          if (touchCoordinates) {
            if (touchCoordinates.y < newTouchCoordinates.y) {
              onGetKeyCodeInput(directions.DOWN);
            }
            if (touchCoordinates.y > newTouchCoordinates.y) {
              onGetKeyCodeInput(directions.UP);
            }
            if (touchCoordinates.x < newTouchCoordinates.x) {
              onGetKeyCodeInput(directions.RIGHT);
            }
            if (touchCoordinates.x > newTouchCoordinates.x) {
              onGetKeyCodeInput(directions.LEFT);
            }
          }
          onChangeTouchCoordinates(newTouchCoordinates);
        }
      }}
    >
      {status === STARTED_GAME
        && <div>
          Score: {score}
          <Board snake={snake} apple={apple} />
        </div>}
      {status === GAME_OVER && <div>GAME OVER!</div>}
      <button
        onClick={() => onStartGame()}
      >Play
      </button>
    </div>

    );
  }
}

export const mapStateToProps = createStructuredSelector({
  snake: getSnake(),
  apple: getApple(),
  game: getGame(),
  touchCoordinates: getTouchCoordinates(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onStartGame: () => dispatch(startGame()),
    onGetKeyCodeInput: (keyCode) => dispatch(getKeyCodeInput(keyCode)),
    onChangeTouchCoordinates: (touchCoords) => dispatch(changeTouchCoordinates(touchCoords)),
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
