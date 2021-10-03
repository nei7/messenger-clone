import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/entities/room.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  public async createRoom(name: string, owner: User) {
    return await this.roomRepository.save({
      name,
      nanoid: nanoid(),
      creator: owner,
    });
  }

  public async getRoom(key: keyof Room, id: string) {
    const room = await this.roomRepository.findOne(
      { [key]: id },
      {
        relations: ['creator'],
      },
    );
    if (!room) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
    }

    delete room.creator.password;
    return room;
  }

  public async deleteRoom(id: string) {
    return this.roomRepository.delete({ nanoid: id });
  }
}
