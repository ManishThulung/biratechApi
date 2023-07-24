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
import { Role } from './utils/role.enum';
import { HasRoles } from 'src/auth/has-roles.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  //admin routes
  @HasRoles(Role.ADMIN)
  @Post('/changeRole/:id/:role')
  updateUserRole(@Param('id') id: number, @Param('role') role: number) {
    const numberRole = Number(role);
    let newRole;
    if (numberRole === 0) {
      newRole = Role.USER;
    } else if (numberRole === 1) {
      newRole = Role.CREATOR;
    } else {
      newRole = Role.ADMIN;
    }
    return this.usersService.changeRole(id, newRole);
  }

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
    return this.usersService.registerUser(user);
  }

  @Get('/verify/:token')
  verifyUser(@Param('token') token: string) {
    return this.usersService.verifyUser(token);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    const result = await this.authService.login(req.user);
    // const token = {
    //   // access_token: result.access_token,
    //   access_token: result,
    // };
    return result;
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
