import { IsString, MaxLength, MinLength } from 'class-validator';

export class RoomDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly name: string;
}
