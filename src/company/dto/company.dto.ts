import { IsNotEmpty } from 'class-validator';

export class CompanyDto {
  @IsNotEmpty()
  value: string;
}
