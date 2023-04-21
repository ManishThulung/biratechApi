import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PhoneService } from './phone.service';
import { phoneDto } from './dto/phone.dto';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { Role } from 'src/users/utils/role.enum';
import { IsCreatorGuard } from 'src/auth/is-creator.guard';

@Controller('phones')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @Get()
  getPhones() {
    return this.phoneService.getPhones();
  }

  @Get(':id')
  getPhoneById(@Param('id') id: number) {
    return this.phoneService.getPhoneById(id);
  }

  @HasRoles(Role.ADMIN, Role.CREATOR)
  @UseGuards(JwtGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  @Post('/create')
  addPhone(@Body() phone: phoneDto, @Request() req) {
    return this.phoneService.newPhone(phone, req.user);
  }

  @UseGuards(JwtGuard, IsCreatorGuard)
  @Put(':id')
  updatePhone(@Param('id') id: number, @Body() updatePhone: phoneDto) {
    return this.phoneService.updatePhone(id, updatePhone);
  }

  @UseGuards(JwtGuard, IsCreatorGuard)
  @Delete(':id')
  deletePhone(@Param('id') id: number) {
    return this.phoneService.deletePhone(id);
  }
}
