import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { MessageDto } from './dto/message.dto';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private chatGateway: ChatGateway,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('send')
  async getMessages(@Request() req, @Body() message: MessageDto) {
    const msg = await this.chatService.addMessage(
      message.content,
      req.user,
      message.recieverId,
    );
    this.chatGateway.server
      .to(message.recieverId.toString())
      .emit('message', msg);
    return msg;
  }
}
