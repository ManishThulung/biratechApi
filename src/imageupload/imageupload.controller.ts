import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageuploadService } from './imageupload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('imageupload')
export class ImageuploadController {
  constructor(private readonly imageUploadService: ImageuploadService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  imageUpload(@UploadedFile() file: Express.Multer.File) {
    return this.imageUploadService.uploadImage(file?.path);
  }
}
