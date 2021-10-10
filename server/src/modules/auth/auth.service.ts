import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getCols } from 'src/common/utils';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async login(email: string, password: string) {
    const user = await this.userRepository.findOne(
      { email },
      {
        select: [...getCols(this.userRepository)],
      },
    );

    if (!user) throw new BadRequestException('Invalid email');
    if (!(await bcrypt.compare(password, user.password)))
      throw new BadRequestException('Invalid password');

    return {
      ...user,
      token: this.jwtService.sign({ email: user.email, id: user.id }),
    };
  }
}
