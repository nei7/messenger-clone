import { Controller, Get, Header } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Header('Accept', 'application/json')
  async getUsers() {
    return this.userService.getUsersLastMessage();
  }
}
