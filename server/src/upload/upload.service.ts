import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { UploadFileDto } from 'src/models/upload-file.dto';
import { S3_CLIENT } from 'src/s3/s3.module';
import { UserNotFoundException } from 'src/shared/exceptions/UserNotFoundException';
import { FilePayload } from 'src/shared/types/FilePayload.type';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UploadService {
  private readonly Bucket = 'nestjs-demo-bucket';

  constructor(
    @Inject(S3_CLIENT) private readonly s3Client: S3Client,
    private readonly usersService: UsersService,
  ) {}

  async uploadFile(filePayload: FilePayload, userId: string) {
    await this.verifyUserExists(userId);

    const { file } = filePayload;

    const fileName = file.originalname;

    const folder = 'files';

    const key = `${folder}/${userId}/${fileName}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.Bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    const uploadFileDto = new UploadFileDto(fileName, userId);

    await this.usersService.addFileToUser(uploadFileDto);
  }

  private async verifyUserExists(userId: string): Promise<void> {
    const dbUser = await this.usersService.findById(userId);

    if (!dbUser) {
      throw new UserNotFoundException('User does not exist');
    }
  }
}
