import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneEntity } from 'src/entity/phone.entity';
import { UserPreferenceEntity } from 'src/entity/user-preference.entity';
import { Phone, UserInterest } from 'src/utils/phone.type';
import { Repository } from 'typeorm';

@Injectable()
export class RecommendationService {
  constructor(
    @InjectRepository(UserPreferenceEntity)
    private userPreferenceRepository: Repository<UserPreferenceEntity>,
    @InjectRepository(PhoneEntity)
    private phoneRepository: Repository<PhoneEntity>,
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

  async getRecommendedPhones(userId: number): Promise<Phone[]> {
    const userInterests = await this.getUserInterests(userId);
    const phones = await this.phoneRepository.find();
    const recommendedPhones = this.calculatePhoneSimilarities(
      phones,
      userInterests,
    );

    return recommendedPhones;
  }

  private async getUserInterests(userId: number): Promise<any> {
    return this.userPreferenceRepository.findOne({
      where: {
        id: userId,
      },
    });
  }

  private calculatePhoneSimilarities(
    phones: UserInterest[],
    userInterests: Record<string, number>,
  ): any[] {
    const phoneSimilarities: any[] = [];

    for (const phone of phones) {
      const phoneName = phone.name;
      const phonePrice = phone.price.toString();
      const phoneMemory = phone.memory.toString();
      const phoneBattery = phone.battery.toString();
      const phoneCamera = phone.camera.toString();
      const phoneDisplay = phone.display.toString();

      const phoneFeatures = [
        phoneName,
        phonePrice,
        phoneMemory,
        phoneBattery,
        phoneCamera,
        phoneDisplay,
      ];

      // find the common features between a phone's features and the user's interests.
      const intersection = phoneFeatures.filter((feature) =>
        userInterests.hasOwnProperty(feature),
      );

      // unique features
      const union = [
        ...new Set([...phoneFeatures, ...Object.keys(userInterests)]),
      ];
      const jaccardSimilarity = intersection.length / union.length;
      if (jaccardSimilarity > 0.2) {
        phoneSimilarities.push({ phone, similarity: jaccardSimilarity });
      }
    }

    // Sort the phones in descending order based on similarity
    phoneSimilarities.sort((a, b) => b.similarity - a.similarity);
    const recommendedPhones = phoneSimilarities
      .slice(0, 4)
      .map((entry) => entry.phone);

    return recommendedPhones;
  }
}
