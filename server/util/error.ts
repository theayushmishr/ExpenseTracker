import type { SelectionRange } from "typescript";

export interface ErrorMetaData {
  timeStamp?: string;
  requestId?: string;
  [key: string]: unknown;
}

class CustomError extends Error {
  public readonly statusCode: number;
  public readonly metadata: ErrorMetaData;
  constructor({
    name,
    statusCode,
    message,
    metadata = {},
    cause,
  }: {
    name: string;
    statusCode: number;
    message: string;
    metadata?: ErrorMetaData;
    cause?: Error;
  }) {
    super(message, { cause });
    this.name = name;
    this.statusCode = statusCode;
    this.metadata = {
      timeStamp: new Date().toISOString(),
      ...metadata,
    };
    this.cause = cause;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  serialize(): Readonly<{
    name: string;
    statusCode: number;
    message: string;
    metadata: ErrorMetaData;
  }> {
    return {
      name: this.name,
      statusCode: this.statusCode,
      message: this.message,
      metadata: this.metadata,
    };
  }
}

interface fields {
  feild: string;
  message: string;
}

class ValidationError extends CustomError {
  constructor(statusCode: number, message: string, metadata?: ErrorMetaData) {
    super({ name: "ValidationError", message, statusCode, metadata });
  }
  static fromInvalidFields(
    fields: fields[],
    message = "Validation failed",
  ): ValidationError {
    return new ValidationError(400, message, { invalidFields: fields });
  }
}

class NotFoundError extends CustomError {
  constructor(message: string, statusCode: number, metadata?: ErrorMetaData) {
    super({ name: `NotFoundError`, statusCode, message, metadata });
  }
}

class InternalError extends CustomError {
  constructor(message: string, statusCode: number, metadata?: ErrorMetaData) {
    super({ name: `InternalError`, statusCode, message, metadata });
  }
}

export { ValidationError, NotFoundError, InternalError };
