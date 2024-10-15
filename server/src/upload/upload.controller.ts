import {
  Controller,
  HttpCode,
  HttpStatus,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilePayload } from 'src/shared/types/FilePayload.type';
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';
import { GetCurrentUser } from 'src/shared/decorators/get-current-user.decorator';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          // new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @GetCurrentUser('sub') userId: string,
  ) {
    const filePayload: FilePayload = {
      file,
    };
    await this.uploadService.uploadFile(filePayload, userId);
  }
}
