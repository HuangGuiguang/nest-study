import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PppService } from './ppp.service';
import { CreatePppDto } from './dto/create-ppp.dto';
import { UpdatePppDto } from './dto/update-ppp.dto';

@Controller('ppp')
export class PppController {
  constructor(private readonly pppService: PppService) {}

  @Post()
  create(@Body() createPppDto: CreatePppDto) {
    return this.pppService.create(createPppDto);
  }

  @Get()
  findAll() {
    return this.pppService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pppService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePppDto: UpdatePppDto) {
    return this.pppService.update(+id, updatePppDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pppService.remove(+id);
  }
}
