import React from 'react';
import { FormattedMessage } from 'react-intl';

export const getLiteral = (id, values = {}) => <FormattedMessage id={id} values={values} />;

export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export const checkCollision = (coordsA, coordsB) => coordsA.x === coordsB.x && coordsA.y === coordsB.y;

export const getNextCoords = (coordinates, direction) => {
  const newHeadX = coordinates.x + direction.x;
  const newHeadY = coordinates.y + direction.y;
  return { x: newHeadX, y: newHeadY };
};

export const checkCollisionSetCoords = (setOfCoords, pointCoords) => {
  const collisionCoords = setOfCoords.filter((coord) => checkCollision(coord, pointCoords));
  return collisionCoords.length > 0;
};
