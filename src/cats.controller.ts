import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

// 整体路由的控制
@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    console.log('request', request.body);
    return 'This action returns all cats';
  }

  // /cats/more 路由
  @Get('more')
  // Note that the method name we choose here is completely arbitrary. We obviously must declare a method to bind the route to, but Nest doesn't attach any significance to the method name chosen.
  findMore(): string {
    return 'This action returns more cats';
  }
}
