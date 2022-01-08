import { HttpError } from './http.error';

export class NotFound extends HttpError {
  constructor (message: string = 'Not found.', obj?: Object) {
    super(404, message, obj);
  }
}
