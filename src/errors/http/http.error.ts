export abstract class HttpError extends Error {
  public readonly statusCode: number
  public readonly moment: Date = new Date()
  public readonly value: Object | undefined

  constructor (statusCode: number, message: string, obj: Object | undefined) {
    super(message);

    this.statusCode = statusCode;
    this.value = obj;
  }
}
