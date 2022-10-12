import { UserService } from './user.serivce';
import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/getAllUser')
  getAllUsers() {
    return this.userService.getAllUser();
  }
}
