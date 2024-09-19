import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UseDiscountDto } from './dto/use-discount.dto';

@ApiBearerAuth()
@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountService.create(createDiscountDto);
  }

  @Post('usediscount')
  useDiscount(@Body() useDiscountDto: UseDiscountDto){
    return this.discountService.useDiscount(useDiscountDto)
  }

  @Get()
  findAll() {
    return this.discountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if(Number.isNaN(parseInt(id))){
      throw new BadRequestException()
    }
    return this.discountService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiscountDto: UpdateDiscountDto) {
    if(Number.isNaN(parseInt(id))){
      throw new BadRequestException()
    }
    return this.discountService.update(+id, updateDiscountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() is_active: boolean) {
    if(Number.isNaN(parseInt(id))){
      throw new BadRequestException()
    }
    return this.discountService.remove(+id, is_active);
  }
}
