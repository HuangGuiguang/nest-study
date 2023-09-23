import { PartialType } from '@nestjs/mapped-types';
import { CreatePppDto } from './create-ppp.dto';

export class UpdatePppDto extends PartialType(CreatePppDto) {}
