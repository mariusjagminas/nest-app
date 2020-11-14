import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { TestService } from './test.service';

@Controller('test-route')
export class TestController {
  constructor(private testService: TestService) { }

  @Get()
  getSomething(): string {
    return 'Response from test-route'
  }

  @Get('get')
  getAnything(): string {
    return this.testService.getList()
  }

  @Get('add')
  getRequestObject(@Req() request: Request) {
    this.testService.addQuery(request.query.name as string)
  }
}
