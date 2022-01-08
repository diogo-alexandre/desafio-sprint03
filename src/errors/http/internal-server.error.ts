import { HttpError } from './http.error';

export class InternalServerError extends HttpError {
  constructor (message: string = 'Internal server error.', obj?: Object) {
    super(500, message, obj);
  }
}
