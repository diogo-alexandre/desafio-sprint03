import { InternalServerError } from '../../errors/http/internal-server.error';
import { BadRequest } from '../../errors/http/bad-request.error';
import { ValidationError } from '../../errors/validation.error';
import { NotFound } from '../../errors/http/not-found-error';

export function Catch () {
  return function (target: any, properyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await original.apply(this, args);
      } catch (err: unknown) {
        if (err instanceof ValidationError) {
          throw new BadRequest(err.errors, 'Erro no cliente. Servidor não entendeu sua requesição ou está inválida.');
        } else if (err instanceof NotFound) {
          throw err;
        }

        throw new InternalServerError('Erro interno desconhecido.');
      }
    };
  };
}
