import { InternalServerError } from '../../errors/http/internal-server.error';
import { BadRequestError } from '../../errors/http/bad-request.error';
import { ValidationError } from '../../errors/validation.error';
import { HttpError } from '../../errors/http/http.error';

export function Catch () {
  return function (target: any, properyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await original.apply(this, args);
      } catch (err: unknown) {
        if (err instanceof ValidationError) {
          throw new BadRequestError('Erro no cliente. Servidor não entendeu sua requesição ou está inválida.', err.errors);
        } else if (err instanceof HttpError) {
          throw err;
        }

        throw new InternalServerError('Erro interno desconhecido.');
      }
    };
  };
}
