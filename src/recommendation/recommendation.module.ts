import { Module } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPreferenceEntity } from 'src/entity/user-preference.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserPreferenceEntity])],
  providers: [RecommendationService],
})
export class RecommendationModule {}
