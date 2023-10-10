import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class AaaDto {
  @IsNotEmpty({ message: 'aaa不能为空' })
  @IsEmail({}, { message: 'aaa不是邮箱格式' })
  aaa: string;

  @IsNotEmpty({ message: 'bbb不能为空' })
  @IsNumber({}, { message: 'bbb不是数字' })
  bbb: number;
}
