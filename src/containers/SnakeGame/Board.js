import React from 'react';
import { Layer, Stage, Rect } from 'react-konva';

import { CELL_SIZE, GAME_HEIGHT, GAME_WIDTH } from './gameConstants';

export default ({snake, apple}) => (
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
);
