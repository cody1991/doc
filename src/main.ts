import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 也可以在这里加 middleware, 比如 app.use(logger)
  // app.useGlobalFilters(new HttpExceptionFilter()); // 但是好像没生效？

  await app.listen(3000);
}
bootstrap();
