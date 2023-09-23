import {
  Contains,
  IsDate,
  IsEmail,
  IsFQDN,
  IsInt,
  Length,
  Max,
  Min,
  IsOptional,
} from 'class-validator';
export class CreatePppDto {
  @Length(10, 20, {
    message(args) {
      console.log(args);
      return 'xxx';
    },
  })
  title: string;

  @Contains('hello')
  text: string;

  @IsInt()
  @Min(0)
  @Max(10)
  rating: number;

  @IsEmail()
  email: string;

  @IsFQDN()
  @IsOptional()
  site: string;
}
