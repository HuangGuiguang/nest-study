import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { MyLogger3 } from './MyLogger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  //   app.use(app.get(MyLogger3));
  //   app.useLogger(app.get(MyLogger3));
  await app.listen(3000);
}
bootstrap();
