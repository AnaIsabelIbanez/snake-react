import React from 'react';
import { FormattedMessage } from 'react-intl';

export const getLiteral = (id, values = {}) => <FormattedMessage id={id} values={values} />;

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}