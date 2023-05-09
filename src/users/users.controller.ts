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
import { UsersService } from './users.service';
import { RegisterDto } from './dto/user.dto';
import { UpdateUser } from './utils/type';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @UsePipes(new ValidationPipe())
  @Post('/register')
  registerUser(@Body() user: RegisterDto) {
    console.log(user, 'userController');

    return this.usersService.registerUser(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    const result = await this.authService.login(req.user);
    const token = {
      access_token: result.access_token,
    };
    return token;
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
