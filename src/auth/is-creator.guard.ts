import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PhoneService } from 'src/phone/phone.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class IsCreatorGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    private phoneService: PhoneService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { user, params } = request;
    // console.log(user, 'user creator guard');
    // console.log(params, 'param creator guard');

    if (!user || !params) return false;

    if (user.role === 'admin') return true;

    const userId = user.userId;
    const phoneId = params.id;

    const existUser = await this.usersService.getUserById(userId);
    const existPhone = await this.phoneService.getPhoneById(phoneId);

    if (existUser.id !== existPhone.author.id)
      throw new UnauthorizedException(
        'You are not authorized to access this resource',
      );

    return true;
  }
}
