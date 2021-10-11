import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { MailService } from 'src/modules/mailer/mailer.service';
import { UserService } from 'src/modules/user/user.service';
import { AuthService } from './auth.service';
import * as jwt from 'jsonwebtoken';
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

    const user = await this.userService.findOne({ email });

    if (user) throw new BadRequestException('User already exists');

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
  async confirm(@Query('token') token: string) {
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

      return 'sucess!';
    } catch (err) {
      return err.message;
    }
  }
}
