import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

import { UserService } from '../user/user.service';
import { RoomDto } from './dto/room.dto';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(
    private readonly roomService: RoomsService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createRoom(@Body() { name }: RoomDto, @Request() req) {
    try {
      const user = await this.userService.findOne({ id: req.user.id });
      const room = await this.roomService.createRoom(name, user);
      delete room.creator.password;
      return room;
    } catch (err) {
      return err;
    }
  }

  @Get('/:id')
  async getRoom(@Param('id') id: string) {
    return await this.roomService.getRoom('nanoid', id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteRoom(@Param('id') id: string, @Request() req) {
    const room = await this.roomService.getRoom('nanoid', id);

    if (req.user && req.user.id === room.creator.id) {
      return await this.roomService.deleteRoom(room.nanoid);
    } else throw new ForbiddenException('Forbidden');
  }
}
