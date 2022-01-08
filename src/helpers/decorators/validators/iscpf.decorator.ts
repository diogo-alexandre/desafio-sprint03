import { registerDecorator, ValidationOptions } from 'class-validator';
import { cpf } from 'cpf-cnpj-validator';

export function IsCPF (validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCPF',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: 'is not a valid CPF',
        ...validationOptions
      },
      validator: {
        validate (value: string) {
          return cpf.isValid(value);
        }
      }
    });
  };
}
