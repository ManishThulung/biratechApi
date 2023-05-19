import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { RatingEntity } from 'src/entity/rating.entity';
import { PhoneEntity } from 'src/entity/phone.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneEntity, RatingEntity])],
  providers: [RatingService],
  controllers: [RatingController],
})
export class RatingModule {}
