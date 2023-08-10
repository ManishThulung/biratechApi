import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DeleteUserDto, RegisterDto } from './dto/user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('calling getUsers method', () => {
    expect(controller.getUsers()).not.toEqual(null);
  });

  it('calling getUserById method', () => {
    expect(service.getUserById).toHaveBeenCalled();
    expect(service.getUserById).toHaveBeenCalledWith();
  });

  it('registers user', () => {
    const body = new RegisterDto();
    body.name = 'Ram';
    body.email = 'ram@gmail.com';
    body.password = 'helshdfo';
    controller.registerUser(body);
    expect(service.registerUser).toHaveBeenCalled();
  });

  it('calling deleteUser method', () => {
    const dto = new DeleteUserDto();
    dto.id = 1;
    controller.deleteUser(dto.id);
    expect(service.deleteUser).toHaveBeenCalled();
  });

  it('calling update user method', () => {
    const dto = new DeleteUserDto();
    dto.id = 1;
    const body = new RegisterDto();
    body.name = 'Ram';
    controller.updateUser(dto.id, body);
    expect(service.updateUser).toHaveBeenCalled();
  });

  it('should return false if user is not authenticated', () => {
    const dto = new DeleteUserDto();
    dto.id = 1;
    controller.deleteUser(dto.id);
    expect(service.deleteUser).toHaveBeenCalled();
  });
});
