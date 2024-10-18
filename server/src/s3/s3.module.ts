import { S3Client } from '@aws-sdk/client-s3';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SecretsManagerService } from './secrets-manager.service';
import { AWS_S3_REGION } from 'src/shared/constants';

export const S3_CLIENT = 'S3_CLIENT';
export const AWS_SECRETS_MANAGER = 'AWS_SECRETS_MANAGER';

@Global()
@Module({
  providers: [
    SecretsManagerService,
    {
      provide: S3_CLIENT,
      useFactory: (configService: ConfigService) => {
        const region = configService.getOrThrow(AWS_S3_REGION);
        return new S3Client({ region });
      },
      inject: [ConfigService],
    },
  ],
  exports: [S3_CLIENT, SecretsManagerService],
})
export class S3Module {}
