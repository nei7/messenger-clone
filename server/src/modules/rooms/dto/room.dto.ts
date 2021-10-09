import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class RoomDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly name: string;
}
