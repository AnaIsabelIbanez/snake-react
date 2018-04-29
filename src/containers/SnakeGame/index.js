import React, { Component } from 'react';
import { Layer, Stage, Rect, Group } from 'react-konva';
// import Banner from './Banner.js';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from '../../utils/injects/injectReducer';
import injectSaga from '../../utils/injects/injectSaga';
import reducer from './reducers/rootReducer';
import saga from './saga/rootSagas';
import { getApple, getSnake, getGame } from './selectors';
import { startGame, getKeyCodeInput } from './actions';
import { GAME_WIDTH, GAME_HEIGHT, CELL_SIZE } from './gameConstants';
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
          <Stage
            style={{ backgroundColor: '#1d0a40', width: GAME_WIDTH, height: GAME_HEIGHT }}
            width={GAME_WIDTH}
            height={GAME_HEIGHT}
          >
            {snake.coordinates && <Layer>{
              snake.coordinates.map((coords, index) => (<Rect
                key={index}
                width={CELL_SIZE}
                height={CELL_SIZE}
                x={coords.x * CELL_SIZE}
                y={coords.y * CELL_SIZE}
                fill={snake.color}
              />))}
            </Layer>}
            {apple.coordinates && <Layer><Rect
              key={-1}
              width={CELL_SIZE}
              height={CELL_SIZE}
              x={apple.coordinates.x * CELL_SIZE}
              y={apple.coordinates.y * CELL_SIZE}
              fill={apple.color}
            /></Layer>}
          </Stage>
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
