import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { UserDocument } from 'src/entities/user.schema';
import { UploadFileDto } from 'src/models/upload-file.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserDocument.name) private readonly user: Model<UserDocument>,
  ) {}

  async create(createUserDto: AuthDto): Promise<UserDocument> {
    return new this.user(createUserDto).save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.user.find();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.user.findOne({ email });
  }

  async findById(userId: string): Promise<UserDocument | null> {
    return this.user.findById(userId);
  }

  async addFileToUser(uploadFileDto: UploadFileDto) {
    const { imageId, userId } = uploadFileDto;
    await this.user.updateOne(
      { _id: userId },
      { $addToSet: { files: imageId } },
    );
  }

  async getUserFiles(userId: string) {
    return (await this.user.findById(userId)).files;
  }
}
