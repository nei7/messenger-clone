import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { MailService } from 'src/modules/mailer/mailer.service';
import { UserService } from 'src/modules/user/user.service';
import { AuthService } from './auth.service';
import * as jwt from 'jsonwebtoken';
import { Response } from 'express';
import { RegisterDto } from './dto/register.dto';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}

  @Post('/register')
  async register(@Body() { name, email, password }: RegisterDto) {
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

  @Post('/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Request() req,
  ) {
    const user = await this.authService.login(email, password);
    delete user.password;

    return user;
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
    try {
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
    } catch (err) {
      return res.redirect(
        `http://${req.headers.host.split(':')[0]}:8080/login?ok=false`,
      );
    }
  }
}
