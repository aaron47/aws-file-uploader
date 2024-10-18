import { Injectable } from '@nestjs/common';
import {
  GetSecretValueCommand,
  GetSecretValueCommandOutput,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';
import { ConfigService } from '@nestjs/config';
import { JwtSecret, MongoDbUri } from 'src/shared/types/ParsedSecrets.type';
import {
  AWS_S3_REGION,
  JWT_SECRET_AWS_SECRET_KEY,
  JWT_SECRET_AWS_SECRET_NAME,
  MONGODBURI_AWS_SECRET_KEY,
  MONGODBURI_AWS_SECRET_NAME,
} from 'src/shared/constants';

@Injectable()
export class SecretsManagerService {
  private readonly secretsManagerClient: SecretsManagerClient;

  constructor(protected readonly configService: ConfigService) {
    this.secretsManagerClient = new SecretsManagerClient({
      region: this.configService.getOrThrow(AWS_S3_REGION),
    });
  }

  async getMongoDbUri() {
    const mongodbUriSecretName = this.configService.getOrThrow(
      MONGODBURI_AWS_SECRET_NAME,
    );
    const mongodbUriSecretKey = this.configService.getOrThrow(
      MONGODBURI_AWS_SECRET_KEY,
    );

    return this.getSecretValue<MongoDbUri>(
      mongodbUriSecretName,
      mongodbUriSecretKey,
    );
  }

  async getJwtSecret() {
    const jwtSecretSecretName = this.configService.getOrThrow(
      JWT_SECRET_AWS_SECRET_NAME,
    );
    const jwtSecretSecretKey = this.configService.getOrThrow(
      JWT_SECRET_AWS_SECRET_KEY,
    );

    return this.getSecretValue<JwtSecret>(
      jwtSecretSecretName,
      jwtSecretSecretKey,
    );
  }

  private async getSecretValue<T>(secretName: string, secretKey: keyof T) {
    let response: GetSecretValueCommandOutput;

    try {
      response = await this.secretsManagerClient.send(
        new GetSecretValueCommand({
          SecretId: secretName,
          VersionStage: 'AWSCURRENT', // VersionStage defaults to AWSCURRENT if unspecified
        }),
      );
    } catch (error) {
      // For a list of exceptions thrown, see
      // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
      throw error;
    }

    const secret = response.SecretString;
    const parsedSecret = JSON.parse(secret) as T;
    return parsedSecret[secretKey];
  }
}
