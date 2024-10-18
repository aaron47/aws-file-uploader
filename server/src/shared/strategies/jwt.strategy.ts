import { SecretsManagerService } from 'src/s3/secrets-manager.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/JwtPayload.type';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected readonly configService: ConfigService,
    protected readonly secretsManagerService: SecretsManagerService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies.Authentication,
      ]),
      ignoreExpiration: false,
      secretOrKeyProvider: async (
        request: Request,
        token: string,
        done: (error: any, secret: string | null) => void,
      ): Promise<void> => {
        try {
          const secret = await secretsManagerService.getJwtSecret();
          done(null, secret);
        } catch (error) {
          done(error, null);
        }
      },
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
