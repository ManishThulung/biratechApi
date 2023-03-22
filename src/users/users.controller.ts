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
import { UsersService } from './users.service';
import { RegisterDto } from './dto/user.dto';
import { UpdateUser } from './utils/type';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createUser(@Body() user: RegisterDto) {
    return this.usersService.registerUser(user);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() userDetails: UpdateUser) {
    return this.usersService.updateUser(id, userDetails);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
