import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MessageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty()
  @IsNumber()
  readonly recieverId: number;
}
