import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingDto } from './dto/rating.dto';

@Controller('rating')
export class RatingController {
  constructor(private ratingService: RatingService) {}

  @Get(':id')
  getRating(@Param('id') id: number) {
    return this.ratingService.getRating(id);
  }

  @UsePipes(new ValidationPipe())
  @Post('/create/:id')
  createRating(@Param('id') phoneId: number, @Body() value: RatingDto) {
    console.log(value, 'controller value');
    console.log(phoneId, 'controller value');

    return this.ratingService.createRating(phoneId, value);
  }
}
