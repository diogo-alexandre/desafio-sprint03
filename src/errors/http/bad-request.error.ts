import { HttpError } from './http.error';

export class BadRequest extends HttpError {
  constructor (obj?: Object, message: string = 'Client error.') {
    super(400, message, obj);
  }
}
