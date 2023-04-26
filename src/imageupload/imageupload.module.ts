import { Module } from '@nestjs/common';
import { ImageuploadController } from './imageupload.controller';
import { ImageuploadService } from './imageupload.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    }),
  ],
  controllers: [ImageuploadController],
  providers: [ImageuploadService],
})
export class ImageuploadModule {}
