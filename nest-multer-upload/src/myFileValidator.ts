import { FileValidator } from '@nestjs/common';

export type MyMaxFileSizeValidatorOptions = {
  maxSize: number;
  message?: string | ((maxSize: number) => string);
};
export class MyFileValidator extends FileValidator<MyMaxFileSizeValidatorOptions> {
  constructor(options: MyMaxFileSizeValidatorOptions) {
    super(options);
  }

  isValid(file: Express.Multer.File): boolean | Promise<boolean> {
    if (file.size > this.validationOptions.maxSize) {
      return false;
    }
    return true;
  }
  buildErrorMessage(file: Express.Multer.File): string {
    return `文件 ${file.originalname} 大小超出 10k`;
  }
}
