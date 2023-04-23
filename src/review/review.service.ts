import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from 'src/entity/review.entity';
import { Repository } from 'typeorm';
import { ReviewDto } from './dto/review.dto';
import { Request, Response } from 'express';
import { PhoneEntity } from 'src/entity/phone.entity';
import { UpdateReview } from 'src/utils/review.type';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
    @InjectRepository(PhoneEntity)
    private phoneRepository: Repository<PhoneEntity>,
  ) {}

  getReviews() {
    return this.reviewRepository.find();
  }

  getReviewById(id: number) {
    return this.reviewRepository.findOne({
      where: {
        id,
      },
    });
  }

  async createReview(
    id: number,
    review: ReviewDto,
    // req: Request,
    res: Response,
  ) {
    try {
      const phone = await this.phoneRepository.findOne({
        where: { id },
      });
      if (!phone) {
        throw new HttpException('Phone not found!', HttpStatus.BAD_REQUEST);
      }
      console.log(phone, 'phone');

      const newReview = await this.reviewRepository.save(review);

      phone.review = newReview;
      console.log(phone, 'phone 2222');

      await this.phoneRepository.save(phone);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Review added seccessfully' });
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async updateReview(id: number, updateReview: UpdateReview) {
    const phone = await this.phoneRepository.findOne({
      where: {
        id,
      },
    });
    if (!phone)
      throw new HttpException('Phone not found', HttpStatus.BAD_REQUEST);

    const reviewId = phone.id;
    await this.reviewRepository.update(reviewId, updateReview);
    return 'Review updated successfully';
  }
}
