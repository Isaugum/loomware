import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RedisService } from '../../providers/redis.provider';
import { createSessionMiddleware } from '../../config/session.config';

@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class SessionModule implements NestModule {
  constructor(private readonly redisService: RedisService) {}

  configure(consumer: MiddlewareConsumer) {
    const sessionMiddleware = createSessionMiddleware(this.redisService.client);
    consumer.apply(sessionMiddleware).forRoutes('*');
  }
}