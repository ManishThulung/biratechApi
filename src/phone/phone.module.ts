import { Module } from '@nestjs/common';
import { PhoneController } from './phone.controller';
import { PhoneService } from './phone.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneEntity } from 'src/entity/phone.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneEntity, UserEntity])],
  controllers: [PhoneController],
  providers: [PhoneService],
})
export class PhoneModule {}
