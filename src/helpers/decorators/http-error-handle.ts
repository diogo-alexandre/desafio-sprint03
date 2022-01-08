import { NextFunction, Request, Response } from 'express';

export function HttpErrorHandler () {
  return function (target: any, properyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      try {
        return await original.apply(this, [req, res]);
      } catch (err: unknown) {
        next(err);
      }
    };
  };
}
