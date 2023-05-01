import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPreferenceEntity } from 'src/entity/user-preference.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecommendationService {
  constructor(
    @InjectRepository(UserPreferenceEntity)
    private userPreferenceRepository: Repository<UserPreferenceEntity>,
  ) {}

  async saveUserQuery(user: any, query: any) {
    const existUser = await this.userPreferenceRepository.findOne({
      where: {
        user: user.id,
      },
    });

    query.user = user;

    if (!existUser) {
      await this.userPreferenceRepository.save(query);
      return;
    } else {
      await this.userPreferenceRepository.update(existUser.id, { ...query });
    }
  }
}
