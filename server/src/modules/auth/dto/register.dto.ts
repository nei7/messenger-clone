import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly name: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(5)
  @MaxLength(100)
  readonly password: string;
}
