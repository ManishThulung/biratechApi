import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDto } from './dto/company.dto';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { Role } from 'src/users/utils/role.enum';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get()
  getCompanies() {
    return this.companyService.getCompanies();
  }

  @HasRoles(Role.ADMIN, Role.CREATOR)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('/create')
  addCompany(@Body() value: CompanyDto) {
    return this.companyService.addCompany(value);
  }
}
