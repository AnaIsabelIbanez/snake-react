import React from 'react';
import { Layer, Stage, Rect } from 'react-konva';

import { CELL_SIZE, GAME_HEIGHT, GAME_WIDTH } from './gameConstants';

const scale = Math.min(
  window.innerWidth / GAME_WIDTH,
  window.innerHeight / GAME_HEIGHT
);

const getWidth = (screenWidth) => screenWidth * 0.7;
const getHeight = (realWidth) => (GAME_HEIGHT * realWidth) / GAME_WIDTH;
const getCellSize = (realWidth) => (CELL_SIZE * realWidth) / GAME_WIDTH;

export default ({ snake, apple }) => {
  const width = getWidth(window.innerWidth);
  const height = getHeight(width);
  const cellSize = getCellSize(width);
  return (
    <Stage
      style={{ backgroundColor: '#c3cb20', width: width, height: height, margin: 'auto' }}
      width={width}
      height={height}
    >
      {snake.coordinates && <Layer>{
        snake.coordinates.map((coords, index) => (<Rect
          key={index}
          width={cellSize}
          height={cellSize}
          x={coords.x * cellSize}
          y={coords.y * cellSize}
          fill={snake.color}
        />))}
      </Layer>}
      {apple.coordinates && <Layer><Rect
        key={-1}
        width={cellSize}
        height={cellSize}
        x={apple.coordinates.x * cellSize}
        y={apple.coordinates.y * cellSize}
        fill={apple.color}
      /></Layer>}
    </Stage>
  );
};
