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
import { ImageuploadService } from 'src/imageupload/imageupload.service';
import { Phone, QueryValidate } from 'src/utils/phone.type';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Observable } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Get('/search')
  paginateFilter(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('name') name?: string | '',
    // @Query('company') company?: string | '',
    @Query('memory') memory?: string | '',
    // @Query('battery') battery: string | '',
    // @Query('camera') camera: string | '',
    @Query('price') price?: number | 20000,
  ): Observable<Pagination<Phone>> {
    limit = limit > 50 ? 50 : limit;

    if (name === null || name === undefined) {
      return this.phoneService.paginate({
        page: Number(page),
        limit: Number(limit),
        route: 'http://localhost:3000/api/phones/search',
      });
    } else {
      return this.phoneService.paginateFilterMultipleQueries(
        {
          page: Number(page),
          limit: Number(limit),
          route: 'http://localhost:4000/api/phones/search',
        },
        { name, memory, price },
        // { name, memory, company, price },
      );
    }
  }

  @Get('/upcomming')
  upcommingPhones() {
    return this.phoneService.upcommingPhones();
  }

  @Get('/gaming')
  gamingPhones() {
    return this.phoneService.gamingPhones();
  }
  @Get('/trending')
  trendingPhones() {
    return this.phoneService.trendingPhones();
  }
  @Get('/latest')
  latestPhones() {
    return this.phoneService.latestPhones();
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
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe())
  @Post('create')
  async addPhone(
    @UploadedFile() file: Express.Multer.File,
    @Body() phone: phoneDto,
    @Request() req,
  ) {
    const imageuploadUrl = await this.imageUploadService.uploadImage(
      file?.path,
    );
    return this.phoneService.newPhone(phone, req.user, imageuploadUrl);
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
