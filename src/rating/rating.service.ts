import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneEntity } from 'src/entity/phone.entity';
import { RatingEntity } from 'src/entity/rating.entity';
import { Rating } from 'src/utils/rating.type';
import { Repository } from 'typeorm';
import { RatingDto } from './dto/rating.dto';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private ratingRepository: Repository<RatingEntity>,
    @InjectRepository(PhoneEntity)
    private phoneRepository: Repository<PhoneEntity>,
  ) {}

  async createRating(phoneId: number, value: RatingDto) {
    if (value.value > 5) {
      return 'Rating value cannot exceed 5';
    }
    const phone = await this.phoneRepository.findOne({
      where: {
        id: phoneId,
      },
    });
    const rating = new RatingEntity();
    rating.value = value.value;
    rating.phone = phone;
    await this.ratingRepository.save(rating);
    return { message: 'Rating submitted successfully' };
  }

  async getRating(id: number) {
    const data = {
      rating: 0,
    };
    const phone = await this.phoneRepository.findOne({
      where: {
        id,
      },
      relations: ['ratings'],
    });
    if (!phone || !phone.ratings || phone.ratings.length === 0) {
      return data; // Return 0 if no ratings or phone found
    }

    const totalRatings = phone.ratings.length;
    const sumOfRatings = phone.ratings.reduce(
      (accumulator, rating) => accumulator + rating.value,
      0,
    );

    const overallRating = sumOfRatings / totalRatings;
    data.rating = overallRating;
    return data;
  }
}
