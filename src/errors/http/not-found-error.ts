import { HttpError } from './http.error';

export class NotFoundError extends HttpError {
  constructor (message: string = 'Not found.', obj?: Object) {
    super(404, message, obj);
  }
}
