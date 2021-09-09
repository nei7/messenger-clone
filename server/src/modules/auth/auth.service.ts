import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(email: string, password: string) {
    const user = await this.userService.findOne({
      email,
    });

    if (!user) throw new BadRequestException('Invalid email');
    if (!(await bcrypt.compare(password, user.password)))
      throw new BadRequestException('Invalid password');

    return {
      ...user,
      token: this.jwtService.sign({ email: user.email, id: user.id }),
    };
  }
}
