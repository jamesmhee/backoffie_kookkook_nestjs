import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetBranchSearchDto } from './dto/get-branch.dto';

@ApiBearerAuth()
@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post()
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchService.create(createBranchDto);
  }

  @Post('/searchbranch')
  findAll(@Body() getBranchSearchDto: GetBranchSearchDto) {
    return this.branchService.findAll(getBranchSearchDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if(Number.isNaN(parseInt(id))){
      throw new BadRequestException('No ID')
    }
    return this.branchService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto) {        
    if(Number.isNaN(parseInt(id))){
      throw new BadRequestException('No ID')
    }
    return this.branchService.update(+id, updateBranchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if(Number.isNaN(parseInt(id))){
      throw new BadRequestException('No ID')
    }
    return this.branchService.remove(+id);
  }
}
