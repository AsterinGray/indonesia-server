import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RegencyService } from './regency.service';
import { CreateRegencyDto } from './dto/create-regency.dto';
import { UpdateRegencyDto } from './dto/update-regency.dto';

@Controller('regency')
export class RegencyController {
  constructor(private readonly regencyService: RegencyService) {}

  @Post()
  create(@Body() createRegencyDto: CreateRegencyDto) {
    return this.regencyService.create(createRegencyDto);
  }

  @Get()
  findAll() {
    return this.regencyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regencyService.findOne(+id);
  }

  @Get('province/:id')
  findByProvince(@Param('id') id: string) {
    return this.regencyService.findByProvince(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegencyDto: UpdateRegencyDto) {
    return this.regencyService.update(+id, updateRegencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regencyService.remove(+id);
  }
}
