import {
  Controller,
  Get,
  Req,
  Res,
  Post,
  HttpCode,
  Header,
  Redirect,
  Param,
  Body,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCatDto } from './create-cat.dto';

// 整体路由的控制
@Controller('cats')
export class CatsController {
  @Get()
  @Header('Cache-Control', 'none')
  @HttpCode(204)
  findAll(@Req() request: Request): string {
    console.log('request', request.body);

    return 'This action returns all cats';
  }

  // /cats/more 路由
  @Get('more')
  @Redirect('https://nestjs.com', 301)
  // Note that the method name we choose here is completely arbitrary. We obviously must declare a method to bind the route to, but Nest doesn't attach any significance to the method name chosen.
  // The 'ab*cd' route path will match abcd, ab_cd, abecd, and so on. The characters ?, +, *, and () may be used in a route path, and are subsets of their regular expression counterparts. The hyphen ( -) and the dot (.) are interpreted literally by string-based paths.
  findMore(): string {
    return 'This action returns more cats';
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    console.log('createCatDto', createCatDto, createCatDto.age);
    return 'This action adds a new cat';
  }

  @Get('async')
  async findAll2(): Promise<any[]> {
    return [];
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    console.log(id);
    return `This action returns a #${id} cat`;
  }
}
