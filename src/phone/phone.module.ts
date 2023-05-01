import { Module } from '@nestjs/common';
import { PhoneController } from './phone.controller';
import { PhoneService } from './phone.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneEntity } from 'src/entity/phone.entity';
import { UserEntity } from 'src/entity/user.entity';
import { IsCreatorGuard } from 'src/auth/is-creator.guard';
import { UsersService } from 'src/users/users.service';
import { HashService } from 'src/helper/hash.service';
import { MulterModule } from '@nestjs/platform-express';
import { ImageuploadService } from 'src/imageupload/imageupload.service';
@Module({
  imports: [TypeOrmModule.forFeature([PhoneEntity, UserEntity])],
  controllers: [PhoneController],
  providers: [
    PhoneService,
    IsCreatorGuard,
    UsersService,
    HashService,
    ImageuploadService,
  ],
})
export class PhoneModule {}
