import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { SecretsManagerService } from 'src/s3/secrets-manager.service';
import { JWT_EXPIRATION } from 'src/shared/constants';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(
    private readonly secretsManagerService: SecretsManagerService,
    private readonly configService: ConfigService,
  ) {}

  async createJwtOptions(): Promise<JwtModuleOptions> {
    return {
      secret: await this.secretsManagerService.getJwtSecret(),
      signOptions: {
        expiresIn: this.configService.getOrThrow<string>(JWT_EXPIRATION),
      },
    };
  }
}
