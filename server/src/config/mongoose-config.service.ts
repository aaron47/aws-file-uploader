import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { SecretsManagerService } from 'src/s3/secrets-manager.service';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private readonly secretsManagerService: SecretsManagerService) {}

  async createMongooseOptions(): Promise<MongooseModuleOptions> {
    return {
      uri: await this.secretsManagerService.getMongoDbUri(),
    };
  }
}
