import {
  Injectable,
  OnApplicationBootstrap,
  OnModuleInit,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';
import { CreateCccDto } from './dto/create-ccc.dto';
import { UpdateCccDto } from './dto/update-ccc.dto';

@Injectable()
export class CccService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleInit() {
    console.log('onCccServiceModuleInit');
  }
  onApplicationBootstrap() {
    console.log('onCccServiceApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('Module ccc Service, ModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('Module ccc Service, ModuleBeforeApplicationShutdown', signal);
  }

  onApplicationShutdown(signal?: string) {
    console.log('Module ccc Service, ModuleApplicationShutdown', signal);
  }
  create(createCccDto: CreateCccDto) {
    return 'This action adds a new ccc';
  }

  findAll() {
    return `This action returns all ccc`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ccc`;
  }

  update(id: number, updateCccDto: UpdateCccDto) {
    return `This action updates a #${id} ccc`;
  }

  remove(id: number) {
    return `This action removes a #${id} ccc`;
  }
}
