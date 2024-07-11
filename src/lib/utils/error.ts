export interface ErrorField {
  name: string;
  message: string;
}

export interface HttpErrorType extends Error {
  status: number;
  errors?: ErrorField[];
}

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public errors?: ErrorField[]
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
