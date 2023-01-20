import { Controller, Get, Param } from '@nestjs/common';
import { ValidationPipe } from './validation.pipe';

@Controller()
export class AppController {

  @Get('/:id')
  getId(@Param('id', ValidationPipe) id: number) {
    return id;
  }
}
