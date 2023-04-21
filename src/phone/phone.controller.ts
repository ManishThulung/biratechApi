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

@Controller('phones')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @Get()
  getPhones() {
    return this.phoneService.getPhones();
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtGuard)
  @Post('/create')
  addPhone(@Body() phone: phoneDto, @Request() req) {
    return this.phoneService.newPhone(phone, req.user);
  }

  @Put(':id')
  updatePhone(@Param('id') id: number, @Body() updatePhone: phoneDto) {
    return this.phoneService.updatePhone(id, updatePhone);
  }

  @Delete(':id')
  deletePhone(@Param('id') id: number) {
    return this.phoneService.deletePhone(id);
  }
}
