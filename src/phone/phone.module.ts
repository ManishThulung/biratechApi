import { Module } from '@nestjs/common';
import { PhoneController } from './phone.controller';
import { PhoneService } from './phone.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneEntity } from 'src/entity/phone.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { IsCreatorGuard } from 'src/auth/is-creator.guard';
import { UsersService } from 'src/users/users.service';
import { HashService } from 'src/helper/hash.service';
@Module({
  imports: [TypeOrmModule.forFeature([PhoneEntity, UserEntity])],
  controllers: [PhoneController],
  providers: [PhoneService, IsCreatorGuard, UsersService, HashService],
})
export class PhoneModule {}
