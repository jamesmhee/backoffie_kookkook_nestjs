import { HttpCode, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaClient } from '@prisma/client';

const Prisma = new PrismaClient()

@Injectable()
export class CategoryService {
  async create(createCategoryDto: CreateCategoryDto) {
    try{
      const result = await Prisma.categoryMasterData.create({
        data: {
          name: createCategoryDto.name
        }
      })
      return {
        statusCode: HttpStatus.OK,
        result: result
      }
    }catch(error){
      throw error
    }
  }

  async findAll() {
    try{
      const result = await Prisma.categoryMasterData.findMany()
      return {
        statusCode: HttpStatus.OK,
        result: result
      }
    }catch(error){
      throw error
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try{
      const result = await Prisma.categoryMasterData.findUnique({
        where: {
          id: id
        }
      })
      if(!result){
        throw new NotFoundException()
      }
      const update = await Prisma.categoryMasterData.update({
        where: {
          id: id,
        },
        data:{
          ...updateCategoryDto
        }
      })
      return {
        statusCode: HttpStatus.OK,
        result: update
      }
    }catch(error){
      throw error
    }
  }

  async remove(id: number) {
    try{
      const result = await Prisma.categoryMasterData.delete({
        where: {
          id: id
        }
      })
      return {
        statusCode: HttpStatus.OK,
        result: result
      }
    }catch(error){
      throw error
    }
  }
}
