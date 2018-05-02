import React from 'react';
import { Layer, Stage, Rect } from 'react-konva';

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


const Board = ({ snake, apple, onGetKeyCodeInput, touchCoordinates, onChangeTouchCoordinates, dimensions }) => {
  const { width, height, cellSize } = dimensions;
  return (
    <div
      ref={(div) => div && div.focus()}
      tabIndex="1" onKeyDown={(e) => {
        onGetKeyCodeInput(e.keyCode);
      }}
      onTouchMove={(event) => {
        console.log('event.touches[0].clientX', event.touches[0].clientX);
        console.log('event.touches[0].clientY', event.touches[0].clientY);
        const newTouchCoordinates = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        };
        if (touchCoordinates) {
          console.log('getNewDirection', getNewDirection(touchCoordinates, newTouchCoordinates));
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

export default (Board);
