import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
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
    const user = await this.userService.findOne({ id: req.user.id });
    const room = await this.roomService.createRoom(name, user);
    delete room.creator.password;
    return room;
  }
  @Get('/:id')
  async getRoom(@Param('id') id: string) {
    return await this.roomService.getRoom('nanoid', id);
  }
}
