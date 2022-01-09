import { ValidationError as VError } from 'class-validator';

export class ValidationError extends Error {
  constructor (
    public readonly errors: VError[]
  ) { super('Entity validation error.'); }
}
