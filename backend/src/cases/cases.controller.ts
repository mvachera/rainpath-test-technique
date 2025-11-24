import { Controller, Get, Post, Body, Param, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { CasesService } from './cases.service';
import { CreateCaseDto } from '../types/case.types';

@Controller('cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(@Body() createCaseDto: CreateCaseDto) {
    return this.casesService.createCase(createCaseDto);
  }

  @Get()
  findAll() {
    return this.casesService.getAllCases();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.casesService.getCaseById(id);
  }
}