import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AaaModule } from './aaa/aaa.module';

@Module({
  imports: [AaaModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: AppService,
      useClass: AppService,
    },
    {
      provide: 'app_Service',
      useValue: {
        name: 'huang',
        age: 17,
      },
    },
    {
      provide: 'person',
      useFactory() {
        return {
          name: 'huang',
          age: 17,
        };
      },
    },
  ],
  exports: [],
})
export class AppModule {}
