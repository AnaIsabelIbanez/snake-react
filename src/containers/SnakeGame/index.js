import React, { Component } from 'react';
import { Layer, Stage } from 'react-konva';
// import Banner from './Banner.js';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Rect, Group } from 'react-konva';

import injectReducer from '../../utils/injects/injectReducer';
import injectSaga from '../../utils/injects/injectSaga';
import reducer from './reducers/rootReducer';
import saga from './saga/rootSagas';
import { getSnakeColor, getSnakeCoords } from './selectors';
import { startGame, getKeyCodeInput } from './actions';
import { GAME_WIDTH, GAME_HEIGHT } from './gameConstants';


export class SnakeGame extends Component {
  render() {
    const {
      isPlaying,
      onStartGame,
      onGetKeyCodeInput,
      snakeColor,
      snakeCoords,
    } = this.props;

    return (
      // if (isPlaying) {
      //   return (
      <div
        style={{ display: 'inline' }} tabIndex="1" onKeyDown={(e) => {
          onGetKeyCodeInput(e.keyCode);
        }}
      >
        <div>
          <Stage style={{ backgroundColor: '#1d0a40', width: GAME_WIDTH, height: GAME_HEIGHT }} width={GAME_WIDTH} height={GAME_HEIGHT}>
            {snakeCoords && <Layer>{
              snakeCoords.map((coords, index) => <Rect key={index} width={10} height={10} x={coords.x * 10} y={coords.y * 10} fill={snakeColor} />)
            }
            </Layer>}
          </Stage>
        </div>
        <button
          onClick={() => onStartGame()}
        >Play</button>
      </div>
    );
    // }
    // return null;
    // );
  }
}

export const mapStateToProps = createStructuredSelector({
  snakeColor: getSnakeColor(),
  snakeCoords: getSnakeCoords(),
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
