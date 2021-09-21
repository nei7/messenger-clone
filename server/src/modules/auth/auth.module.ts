import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.stategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from 'src/modules/mailer/mailer.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => {
        return {
          secret: process.env.JWT_SECRET,
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, UserService, MailService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
