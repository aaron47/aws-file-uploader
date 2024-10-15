import { UserRepository } from './users.repository';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserDocument } from 'src/entities/user.schema';
import { UploadFileDto } from 'src/models/upload-file.dto';
import { Readable } from 'stream';
import { UserNotFoundException } from 'src/shared/exceptions/UserNotFoundException';
import { GetObjectCommand, NoSuchKey, S3Client } from '@aws-sdk/client-s3';
import { S3_CLIENT } from 'src/s3/s3.module';
import { FileDoesNotExistException } from 'src/shared/exceptions/FileDoesNotExistException';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { S3File } from 'src/shared/types/S3File.type';

@Injectable()
export class UsersService {
  private readonly _logger = new Logger(UsersService.name);
  private readonly Bucket = 'nestjs-demo-bucket';
  constructor(
    @Inject(S3_CLIENT) private readonly s3Client: S3Client,
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserDto: AuthDto) {
    return this.userRepository.create(createUserDto);
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userRepository.findByEmail(email);
  }

  async findById(userId: string): Promise<UserDocument | null> {
    return this.userRepository.findById(userId);
  }

  async addFileToUser(uploadFileDto: UploadFileDto) {
    await this.userRepository.addFileToUser(uploadFileDto);
  }

  async retreiveFiles(userId: string) {
    const user = await this.verifyUserExists(userId);

    const files: S3File[] = [];

    for (const fileId of user.files) {
      const fileName = fileId;

      const folder = 'files';

      const key = `${folder}/${userId}/${fileName}`;

      const getCommand = new GetObjectCommand({
        Bucket: this.Bucket,
        Key: key,
      });

      try {
        const response = await this.s3Client.send(getCommand);

        const data = await this.toBuffer(response.Body as Readable);
        const contentType = response.ContentType;

        const s3File: S3File = {
          base64: data.toString('base64'),
          contentType,
          fileName,
        };

        files.push(s3File);
      } catch (exception) {
        // Handle specific S3 errors
        if (exception instanceof NoSuchKey) {
          throw new FileDoesNotExistException(); // Handle the case where the key does not exist
        }

        // Optionally log the error or handle other error types
        throw new Error('An error occurred while retrieving the file.'); // Generic error message for other cases
      }
    }

    return files;
  }

  private async verifyUserExists(userId: string): Promise<UserDocument> {
    const dbUser = await this.userRepository.findById(userId);

    if (!dbUser) {
      throw new UserNotFoundException('User does not exist');
    }

    return dbUser;
  }

  private async toBuffer(stream: Readable): Promise<Buffer> {
    const chunks: Uint8Array[] = [];

    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    return Buffer.concat(chunks);
  }
}
