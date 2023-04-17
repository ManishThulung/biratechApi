import { IsNotEmpty, MinLength } from 'class-validator';

export class phoneDto {
  @IsNotEmpty()
  @MinLength(3)
  company: string;

  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(3)
  camera: string;

  @IsNotEmpty()
  @MinLength(3)
  battery: string;

  @IsNotEmpty()
  @MinLength(3)
  memory: string;
}
