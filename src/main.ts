import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 也可以在这里加 middleware, 比如 app.use(logger)

  await app.listen(3000);
}
bootstrap();
