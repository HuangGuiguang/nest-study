import {
  Injectable,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';
import { CreateDddDto } from './dto/create-ddd.dto';
import { UpdateDddDto } from './dto/update-ddd.dto';

@Injectable()
export class DddService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleInit() {
    console.log('onDddServiceModuleInit');
  }

  onApplicationBootstrap() {
    console.log('onDddServiceApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('Module ddd Service, ModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('Module ddd Service, ModuleBeforeApplicationShutdown', signal);
  }

  onApplicationShutdown(signal?: string) {
    console.log('Module ddd Service, ModuleApplicationShutdown', signal);
  }
  create(createDddDto: CreateDddDto) {
    return 'This action adds a new ddd';
  }

  findAll() {
    return `This action returns all ddd`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ddd`;
  }

  update(id: number, updateDddDto: UpdateDddDto) {
    return `This action updates a #${id} ddd`;
  }

  remove(id: number) {
    return `This action removes a #${id} ddd`;
  }
}
