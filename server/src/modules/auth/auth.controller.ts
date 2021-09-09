import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guar';
import { UserService } from 'src/modules/user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  async register(
    @Body('username') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const hashedPassword = await this.userService.hashPassword(password);
    return this.userService.createUser({
      name,
      email,
      password: hashedPassword,
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Request() req,
  ) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  get(@Request() req) {
    return req.user;
  }
}
