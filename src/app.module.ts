import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CatsModule } from './cats/cats.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { logger as LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('cats');
    // consumer.apply(LoggerMiddleware).forRoutes({
    //   path: 'cats',
    //   method: RequestMethod.GET,
    // });

    // consumer.apply(LoggerMiddleware).forRoutes(CatsController);

    consumer
      .apply(LoggerMiddleware)
      .exclude(
        {
          path: 'cats',
          method: RequestMethod.GET,
        },
        {
          path: 'cats',
          method: RequestMethod.POST,
        },
      )
      .forRoutes(CatsController);

    // 串联的方式
    // consumer.apply(cors(), helmet(), logger).forRoutes('cats');
  }
}
