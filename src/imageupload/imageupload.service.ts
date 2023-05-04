import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
// import { config } from 'dotenv';

cloudinary.config({
  cloud_name: 'dvkxbgi8y',
  api_key: '218168889132959',
  api_secret: '2MaOWJVBqdJk-2N3u19EgpIC4ow',
});

@Injectable()
export class ImageuploadService {
  async uploadImage(path: string): Promise<string> {
    try {
      const imageUrl = await cloudinary.uploader.upload(path, {
        folder: 'biratech/phones',
      });
      return imageUrl.secure_url;
    } catch (err) {
      return err;
    }
  }
}
