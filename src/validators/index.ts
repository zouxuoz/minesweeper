import * as R from 'ramda';

type Validator = (value: any) => false | string;

export const composeValidators = (validators: Validator[]): Validator => value => {
  for (let index = 0; index < validators.length; index++) {
    const validator = validators[index];

    const check = validator(value);

    if (check) {
      return check;
    }
  }

  return false;
};

export const required: Validator = value => (R.isNil(value) ? 'Required' : false);

export const min = (minValue: number): Validator => value =>
  value >= minValue ? false : `Should be greater than ${minValue}`;

export const max = (maxValue: number): Validator => value =>
  value <= maxValue ? false : `Should be lower than ${maxValue}`;
