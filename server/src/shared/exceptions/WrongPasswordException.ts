import { HttpException, HttpStatus } from '@nestjs/common';

export class WrongPasswordException extends HttpException {
  constructor() {
    super('Passwords do not match, please try again', HttpStatus.BAD_REQUEST);
  }
}
