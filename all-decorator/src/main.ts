import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// session导入
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 设定公开目录？
  /**
   * Sets a base directory for public assets.
   * @example
   * app.useStaticAssets('public')
   *
   * @returns {this}
   */
  console.log(join(__dirname, '..', 'public'));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // 设定模板目录？
  /**
   * Sets one or multiple base directories for templates (views).
   *
   * @example
   * app.setBaseViewsDir('views')
   *
   * @returns {this}
   */
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.use(
    session({
      secret: 'guang',
      cookie: { maxAge: 100000 },
    }),
  );
  await app.listen(3000);
}
bootstrap();
