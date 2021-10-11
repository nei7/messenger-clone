import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class MessageDto {
  @ApiProperty()
  @IsString()
  readonly content: string;

  @ApiProperty()
  @IsNumber()
  readonly recieverId: number;
}
