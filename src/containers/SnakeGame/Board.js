import React from 'react';
import { Layer, Stage, Rect } from 'react-konva';
import sizeMe from 'react-sizeme';

import { CELL_SIZE, GAME_HEIGHT, GAME_WIDTH } from './gameConstants';

const scale = Math.min(
  window.innerWidth / GAME_WIDTH,
  window.innerHeight / GAME_HEIGHT
);

const directions = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

const getNewDirection = (touchCoordinates, newTouchCoordinates) => {
  const difX = touchCoordinates.x - newTouchCoordinates.x;
  const difY = touchCoordinates.y - newTouchCoordinates.y;
  let newDirection = null;

  if (Math.abs(difX) > Math.abs(difY)) {
    if (difX > 0) {
      newDirection = directions.LEFT;
    } else {
      newDirection = directions.RIGHT;
    }
  } else if (difY > 0) {
    newDirection = directions.UP;
  } else {
    newDirection = directions.DOWN;
  }
  return newDirection;
};


const getWidth = (screenWidth) => screenWidth;
const getHeight = (realWidth) => (GAME_HEIGHT * realWidth) / GAME_WIDTH;
const getCellSize = (realWidth) => (CELL_SIZE * realWidth) / GAME_WIDTH;

const Board = ({ wrapperHeight, wrapperWidth, snake, apple, onGetKeyCodeInput, touchCoordinates, onChangeTouchCoordinates, dimensions }) => {
  // console.log('wrapperWidth', wrapperWidth);
  // const width = size.width;
  // const height = getHeight(width);
  // const cellSize = 21;
  const { width, height, cellSize } = dimensions;
  return (
    <div
      ref={(div) => div && div.focus()}
      tabIndex="1" onKeyDown={(e) => {
        onGetKeyCodeInput(e.keyCode);
      }}
      onTouchMove={(event) => {
        const newTouchCoordinates = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        };
        if (touchCoordinates) {
          onGetKeyCodeInput(getNewDirection(touchCoordinates, newTouchCoordinates));
        }

        onChangeTouchCoordinates(newTouchCoordinates);
      }}
    >
      <Stage
        style={{ backgroundColor: '#c3cb20', width, height, margin: 'auto' }}
        width={width}
        height={height}
      >
        <Layer>
          {snake.coordinates &&
          snake.coordinates.map((coords, index) => (<Rect
            key={index}
            width={cellSize}
            height={cellSize}
            x={coords.x * cellSize}
            y={coords.y * cellSize}
            fill={snake.color}
          />))}
          {apple.coordinates && <Rect
            key={-1}
            width={cellSize}
            height={cellSize}
            x={apple.coordinates.x * cellSize}
            y={apple.coordinates.y * cellSize}
            fill={apple.color}
          />}
        </Layer>
      </Stage>
    </div>
  );
};

export default sizeMe()(Board);
