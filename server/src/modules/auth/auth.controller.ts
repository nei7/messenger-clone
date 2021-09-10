import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guar';
import { MailService } from 'src/mailer/mailer.service';
import { UserService } from 'src/modules/user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import * as jwt from 'jsonwebtoken';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}

  @Post('/register')
  async register(
    @Body('username') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const token = jwt.sign({ name, email, password }, process.env.JWT_SECRET, {
      expiresIn: '20m',
    });

    await this.mailService.sendMail({
      to: email,
      subject: 'Verify your account',
      html: `Verification link: ${
        process.env.NODE_ENV === 'dev'
          ? 'http://localhost:3000/auth/confirm-email?token=' + token
          : ''
      }`,
    });

    return { message: 'Verification message has been sent to ' + email };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Request() req,
  ) {
    delete req.user.password;
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  get(@Request() req) {
    return req.user;
  }

  @Get('confirm-email')
  async confirm(
    @Query('token') token: string,
    @Res() res: Response,
    @Request() req,
  ) {
    const { name, email, password } = (await jwt.verify(
      token,
      process.env.JWT_SECRET,
    )) as { name: string; email: string; password: string };

    const hashedPassword = await this.userService.hashPassword(password);
    await this.userService.createUser({
      name,
      email,
      password: hashedPassword,
    });

    return res.redirect(
      `http://${req.headers.host.split(':')[0]}:8080/login?ok=true`,
    );
  }
}
