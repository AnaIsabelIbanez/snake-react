import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from '../../utils/injects/injectReducer';
import injectSaga from '../../utils/injects/injectSaga';
import reducer from './reducers/rootReducer';
import saga from './saga/rootSagas';
import Board from './Board';
import { getApple, getSnake, getGame } from './selectors';
import { startGame, getKeyCodeInput } from './actions';
import { GAME_OVER, STARTED_GAME } from './constants';


export class SnakeGame extends Component {
  render() {
    const {
      game = {},
      onStartGame,
      onGetKeyCodeInput,
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
});

export function mapDispatchToProps(dispatch) {
  return {
    onStartGame: () => dispatch(startGame()),
    onGetKeyCodeInput: (keyCode) => dispatch(getKeyCodeInput(keyCode)),
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
