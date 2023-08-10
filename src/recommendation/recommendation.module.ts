import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPreferenceEntity } from 'src/entity/user-preference.entity';
import { RecommendationController } from './recommendation.controller';
import { PhoneEntity } from 'src/entity/phone.entity';
import { RecommendationService } from './recommendation.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserPreferenceEntity, PhoneEntity])],
  providers: [RecommendationService],
  controllers: [RecommendationController],
})
export class RecommendationModule {}
