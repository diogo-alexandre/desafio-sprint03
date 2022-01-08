import { registerDecorator, ValidationOptions } from 'class-validator';

export function PastYears (property: number, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'pastYears',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `Didn't past ${property} years`,
        ...validationOptions
      },
      validator: {
        validate (birthdate: Date) {
          const today = new Date();
          const months = today.getMonth() - birthdate?.getMonth();
          let age = today.getFullYear() - birthdate?.getFullYear();

          if (months < 0 || (months === 0 && today.getDate() < birthdate?.getDate())) age--;

          return age >= property;
        }
      }
    });
  };
}
