import {
  Controller,
  Get,
  Header,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
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

  @ApiQuery({
    name: 'limit',
    required: false,
  })
  @ApiQuery({
    name: 'skip',
    required: false,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/:id/messages')
  async getUserMessages(
    @Request() req,
    @Param('id') id: string,
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {
    return this.userService.getMessages(
      req.user.id,
      parseInt(id),
      parseInt(offset) || 0,
      parseInt(limit) || 50,
    );
  }
}
