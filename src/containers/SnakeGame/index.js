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
import { getDirection, getPosition  } from './selectors';
import { startGame, getKeyCodeInput } from './actions';


export class SnakeGame extends Component {
  constructor(props) {
    super(props);
    // window.addEventListener('keyup', () => console.log('eyyyy'));
  }
  
  render() {
    const {
      isPlaying,
      client,
      position = {},
      onStartGame,
      onGetKeyCodeInput
    } = this.props;
    console.log('position', position);
    return (
      // if (isPlaying) {
      //   return (
      <div style={{ display: 'inline' }} tabIndex="1" onKeyDown={(e) => {
        console.log('keyDown', e.keyCode);
        onGetKeyCodeInput(e.keyCode);
      }}>
        <div>
          <Stage width={300} height={660}>
            <Layer>
              <Rect key={1} width={50} height={50} x={<position className="x"></position>} y={position.y} fill="red"  />
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
});

export function mapDispatchToProps(dispatch) {
  return {
    onStartGame: () => dispatch(startGame()),
    onGetKeyCodeInput: (keyCode) => dispatch(getKeyCodeInput(keyCode))
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
