import { S3Client } from '@aws-sdk/client-s3';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const S3_CLIENT = 'S3_CLIENT';

@Global()
@Module({
  providers: [
    {
      provide: S3_CLIENT,
      useFactory: (configService: ConfigService) => {
        const region = configService.getOrThrow('AWS_S3_REGION');
        return new S3Client({ region });
      },
      inject: [ConfigService],
    },
  ],
  exports: [S3_CLIENT],
})
export class S3Module {}
