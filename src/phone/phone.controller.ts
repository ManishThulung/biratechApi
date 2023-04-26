import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageuploadService } from 'src/imageupload/imageupload.service';
import { QueryValidate } from 'src/utils/phone.type';

@Controller('phones')
export class PhoneController {
  constructor(
    private readonly phoneService: PhoneService,
    private readonly imageUploadService: ImageuploadService,
  ) {}

  @Get()
  getPhones() {
    return this.phoneService.getPhones();
  }

  @Get('/compare')
  comparePhone(@Query() phones: QueryValidate) {
    const { phoneOne, phoneTwo } = phones;

    return this.phoneService.comparePhone(phoneOne, phoneTwo);
  }

  @Get(':id')
  getPhoneById(@Param('id') id: number) {
    return this.phoneService.getPhoneById(id);
  }
  // @Post('/upload')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   console.log(file);
  // }
  // comment

  @HasRoles(Role.ADMIN, Role.CREATOR)
  @UseGuards(JwtGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  @Post('/create')
  async addPhone(@Body() phone: phoneDto, @Request() req) {
    // const imageuploadUrl = await this.imageUploadService.uploadImage(
    //   file?.path,
    // );
    // console.log(imageuploadUrl, 'imageuploadUrl');

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
