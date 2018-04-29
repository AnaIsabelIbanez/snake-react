import React from 'react';
import { FormattedMessage } from 'react-intl';

export const getLiteral = (id, values = {}) => <FormattedMessage id={id} values={values} />;

export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export const checkColision = (coordsA, coordsB) => coordsA.x === coordsB.x && coordsA.y === coordsB.y;

export const getNextCoords = (coordenates, direction) => {
  const newHeadX = coordenates.x + direction.x;
  const newHeadY = coordenates.y + direction.y;
  return { x: newHeadX, y: newHeadY };
};

export const checkColisionSetCoords = (setOfCoords, pointCoords) => {
  const colisionCoords = setOfCoords.filter((coord) => checkColision(coord, pointCoords));
  return colisionCoords.length > 0;
};
