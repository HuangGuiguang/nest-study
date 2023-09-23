import { Injectable } from '@nestjs/common';
import { CreatePppDto } from './dto/create-ppp.dto';
import { UpdatePppDto } from './dto/update-ppp.dto';

@Injectable()
export class PppService {
  create(createPppDto: CreatePppDto) {
    return 'This action adds a new ppp';
  }

  findAll() {
    return `This action returns all ppp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ppp`;
  }

  update(id: number, updatePppDto: UpdatePppDto) {
    return `This action updates a #${id} ppp`;
  }

  remove(id: number) {
    return `This action removes a #${id} ppp`;
  }
}
