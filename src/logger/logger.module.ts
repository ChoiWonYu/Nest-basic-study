import { Module } from '@nestjs/common';
import { MyLogger } from './logger.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logger.interceptor';

@Module({
  providers: [MyLogger],
  exports: [
    MyLogger,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class LoggerModule {}
