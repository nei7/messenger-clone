import {
  Controller,
  Get,
  Header,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  @Header('Accept', 'application/json')
  async getUsers(@Request() req) {
    return this.userService.getUsersWithLastMessage(req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/:id/messages')
  async getUserMessages(@Request() req, @Param('id') id: string) {
    return this.userService.getMessages(req.user.id, parseInt(id));
  }
}
