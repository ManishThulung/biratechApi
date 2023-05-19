import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from 'src/entity/company.entity';
import { Repository } from 'typeorm';
import { CompanyDto } from './dto/company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
  ) {}

  async getCompanies() {
    return this.companyRepository.find({ relations: ['phone'] });
  }

  async addCompany(value: CompanyDto) {
    const company = new CompanyEntity();
    company.company = value.value;
    await this.companyRepository.save(company);
    return { message: 'Company saved successfully' };
  }
}
