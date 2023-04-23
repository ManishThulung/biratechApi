import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDto } from './dto/review.dto';
import { Request, Response } from 'express';
import { JwtGuard } from 'src/auth/jwt.guard';
import { IsCreatorGuard } from 'src/auth/is-creator.guard';
import { UpdateReview } from 'src/utils/review.type';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  getReviews() {
    return this.reviewService.getReviews();
  }

  @Get(':id')
  getReviewById(@Param('id') id: number) {
    return this.reviewService.getReviewById(id);
  }

  @UseGuards(JwtGuard, IsCreatorGuard)
  @UsePipes(new ValidationPipe())
  @Post('/create/:id')
  createReview(
    @Param('id') id: number,
    @Body() review: ReviewDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.reviewService.createReview(id, review, res);
  }

  @UseGuards(JwtGuard, IsCreatorGuard)
  @Put('/update/:id')
  updateReview(@Param('id') id: number, @Body() updateReview: UpdateReview) {
    return this.reviewService.updateReview(id, updateReview);
  }
}
