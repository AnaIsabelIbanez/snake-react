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
import { getPosition, getBoard } from './selectors';
import { startGame, getKeyCodeInput } from './actions';


export class SnakeGame extends Component {
  constructor(props) {
    super(props);
    // window.addEventListener('keyup', () => console.log('eyyyy'));
  }

  displayBoard() {
    let index = 0;
    return this.props.board.map((row, y) => {
      return row.map((cell, x) => {
        index++;
        return this.getRect(cell, x, y, index);
      });
    });
  }

  getRect(code, x, y, index) {
    if (code === 1) {
      return (<Rect key={index} width={20} height={20} x={x * 30} y={y * 30} fill="red" />);
    }
    return (<Rect key={index} width={20} height={20} x={x * 30} y={y * 30} fill="black" />);
  }

  render() {
    const {
      isPlaying,
      board,
      position = {},
      onStartGame,
      onGetKeyCodeInput,
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
          <Stage width={800} height={600}>
            <Layer>
              {board.map((row, y) => row.map((cell, x) => this.getRect(cell, x, y)))}
            </Layer>
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
  position: getPosition(),
  board: getBoard(),
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
