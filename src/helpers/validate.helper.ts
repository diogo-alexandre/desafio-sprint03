import { validate as v } from 'class-validator';
import { ValidationError } from '../errors/validation.error';

export async function validate (obj: object) {
  const errors = await v(obj);

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
}
