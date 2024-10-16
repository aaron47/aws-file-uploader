import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';
import { UserDocument } from 'src/entities/user.schema';
import { UserAlreadyExistsException } from 'src/shared/exceptions/UserAlreadyExistsException';
import { UserNotFoundException } from 'src/shared/exceptions/UserNotFoundException';
import { WrongPasswordException } from 'src/shared/exceptions/WrongPasswordException';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { JwtPayload } from 'src/shared/types/JwtPayload.type';
import parseDuration from 'parse-duration';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(createUserDto: AuthDto): Promise<UserDocument> {
    const dbUser = await this.usersService.findByEmail(createUserDto.email);
    if (dbUser) {
      throw new UserAlreadyExistsException('User already exists');
    }

    const hashedPassword = await this.hashPassword(createUserDto.password);

    return this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async login(user: UserDocument, response: Response) {
    const expires = new Date();
    expires.setMilliseconds(
      expires.getMilliseconds() +
        parseDuration(this.configService.getOrThrow<string>('JWT_EXPIRATION')),
    );

    const jwtPayload: JwtPayload = {
      sub: user._id.toString(),
      email: user.email,
    };

    const token = await this.jwtService.signAsync(jwtPayload);

    response.cookie('Authentication', token, {
      secure: true,
      httpOnly: true,
      expires,
    });

    return {
      jwtPayload,
    };
  }

  async verifyUser(email: string, password: string) {
    const dbUser = await this.usersService.findByEmail(email);

    if (!dbUser) {
      throw new UserNotFoundException('User not found');
    }

    const passwordsMatch = await this.verifyPassword(dbUser.password, password);

    if (!passwordsMatch) {
      throw new WrongPasswordException();
    }

    return dbUser;
  }

  private async hashPassword(password: string) {
    return await argon2.hash(password);
  }

  private async verifyPassword(hashedPassword: string, plainPassword: string) {
    return await argon2.verify(hashedPassword, plainPassword);
  }
}
