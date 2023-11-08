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
  HttpStatus,
  Body,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interface/cat.interface';

// 整体路由的控制
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

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

  @Post('haha')
  create2(@Res() res: Response) {
    res.status(HttpStatus.CREATED).send();
  }

  @Post('haha2')
  create3(@Res() res: Response) {
    res.status(HttpStatus.OK).json([]);
  }

  @Post('new1')
  async createN(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get('new1')
  async findAllN(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    console.log(id);
    return `This action returns a #${id} cat`;
  }
}
