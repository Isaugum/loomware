import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from './common/modules/logger/logger.module';
import { RequestLoggerMiddleware } from './common/middleware/request-logger/request-logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { SessionAuthGuard } from './common/guards/session.guard';
import { ApiModule } from './api/api.module';
import { FrontendModule } from './frontend/frontend.module';
import { SessionModule } from './common/modules/session/session.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT ?? '3306'),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule,
    ApiModule,
    SessionModule,
    FrontendModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: SessionAuthGuard,
    },
  ],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
