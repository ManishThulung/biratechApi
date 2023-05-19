import { IsNotEmpty } from 'class-validator';

export class CommentDto {
  @IsNotEmpty()
  value: string;
}
