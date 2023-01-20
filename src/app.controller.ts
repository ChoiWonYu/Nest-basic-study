import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ValidationPipe } from './validation.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/:id')
  getId(@Param('id', ValidationPipe) id: number) {
    return id;
  }
}
