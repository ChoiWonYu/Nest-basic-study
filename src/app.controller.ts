import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import emailConfig from './config/emailConfig';

@Controller()
export class AppController {
  constructor(
    @Inject(emailConfig.KEY) private config: ConfigType<typeof emailConfig>,
  ) {}

  @Get()
  getENV(): string {
    return this.config.service;
  }
}
