import { HttpException, HttpStatus } from '@nestjs/common';

export class FileDoesNotExistException extends HttpException {
  constructor() {
    super('File does not exist', HttpStatus.NOT_FOUND);
  }
}
