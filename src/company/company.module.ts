import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from 'src/entity/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  providers: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
