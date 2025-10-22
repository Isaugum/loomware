import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { RedisService } from './common/providers/redis.provider';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // use WINSTON logger
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // use exceptions logger
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useGlobalFilters(new HttpExceptionFilter(logger));

  const redisService = app.get(RedisService);
  await redisService.client.connect();

  app.setBaseViewsDir(join('src', 'frontend', 'views'));
  app.setViewEngine('hbs');

  await app.listen(process.env.PORT ?? 8000, '0.0.0.0');
}
bootstrap();