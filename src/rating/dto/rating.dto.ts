import { IsNotEmpty } from 'class-validator';

export class RatingDto {
  @IsNotEmpty()
  value: number;
}
