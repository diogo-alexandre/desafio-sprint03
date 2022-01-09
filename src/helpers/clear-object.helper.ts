export function clearObject <T> (arg: any): Partial<T> {
  const obj: any = {};

  Object.keys(arg).forEach(key => {
    if (arg[key] !== undefined) {
      obj[key] = arg[key];
    }
  });

  return obj;
}
