import * as Joi from 'joi';
import { Dictionary } from 'ramda';

export const validateForm = <T>(schema: Joi.Schema) => (values: T) => {
  const result = schema.validate(values);

  if (!result.error) {
    return {};
  }

  return result.error
    .details
    .reduce((acc: Dictionary<string>, item) => {
      const x = (item.context || {}).key;
      if (x) {
        acc[x] = item.message;
      }
      return acc;
    }, {});
};
