import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  Body,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  FileInterceptor,
  FilesInterceptor,
  FileFieldsInterceptor,
  AnyFilesInterceptor,
} from '@nestjs/platform-express';
import { storage } from './custom.storage';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('aaa')
  @UseInterceptors(
    // 指定字段名和目录
    FileInterceptor('file', {
      dest: 'uploads',
    }),
  )
  uploadFile(@UploadedFile() aaa: Express.Multer.File, @Body() body) {
    console.log('file-file', aaa);
    // body接受除文件字段的其他信息
    console.log('body', body);
  }

  @Post('bbb')
  @UseInterceptors(
    // 指定字段名和目录
    FilesInterceptor('files', 3, {
      dest: 'uploads',
    }),
  )
  uploadFiles(@UploadedFiles() aaa: Array<Express.Multer.File>, @Body() body) {
    console.log('file-file', aaa);
    // body接受除文件字段的其他信息
    console.log('body', body);
  }

  // 上传不同key的文件
  @Post('ccc')
  @UseInterceptors(
    // 指定字段名和目录
    FileFieldsInterceptor(
      [
        { name: 'aaa', maxCount: 2 },
        { name: 'bbb', maxCount: 2 },
      ],
      {
        dest: 'uploads',
      },
    ),
  )
  uploadMultiFiles(
    @UploadedFiles()
    aaa: { aaa?: Array<Express.Multer.File>; bbb: Array<Express.Multer.File> },
    @Body() body,
  ) {
    console.log('file-file', aaa);
    // body接受除文件字段的其他信息
    console.log('body', body);
  }

  // 不知道什么key的文件
  @Post('ddd')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads',
    }),
  )
  uploadAnyFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    console.log('body', body);
    console.log('files', files);
  }

  // 自定义storage
  @Post('eee')
  @UseInterceptors(AnyFilesInterceptor({ storage }))
  customStorage(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    console.log('body', body);
    console.log('files', files);
  }

  // 使用validator对上传的文件做限制
  @Post('fff')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads',
    }),
  )
  limitFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    fff: Express.Multer.File,
    @Body() body,
  ) {
    console.log('file-file', fff);
    console.log('body', body);
  }
}
