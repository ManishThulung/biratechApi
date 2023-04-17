import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PhoneService } from './phone.service';
import { phoneDto } from './dto/phone.dto';

@Controller('phones')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @Get()
  getPhones() {
    return this.phoneService.getPhones();
  }

  @UsePipes(new ValidationPipe())
  @Post()
  addPhone(@Body() phone: phoneDto) {
    return this.phoneService.newPhone(phone);
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
