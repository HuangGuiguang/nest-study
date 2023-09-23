import { IsInt } from 'class-validator';

export class CreateAaaDto {
  name: string;
  // 装饰器不用分号的
  @IsInt()
  age: number;
  hobbies: Array<string>;
}
