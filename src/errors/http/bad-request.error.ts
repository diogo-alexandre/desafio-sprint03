import { HttpError } from './http.error';

export class BadRequest extends HttpError {
  constructor (message: string = 'Client error.', obj?: Object) {
    super(400, message, obj);
  }
}
