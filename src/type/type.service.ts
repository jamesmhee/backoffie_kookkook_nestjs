import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { PrismaClient } from '@prisma/client';

const Prisma = new PrismaClient()

@Injectable()
export class TypeService {
  async create(createTypeDto: CreateTypeDto) {
    try{
      const result = await Prisma.typeMasterData.create({
        data: {
          name: createTypeDto.name
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
      const result = await Prisma.typeMasterData.findMany()
      return {
        statusCode: HttpStatus.OK,
        result: result
      }
    }catch(error){
      throw error
    }
  }
  
  async update(id: number, updateTypeDto: UpdateTypeDto) {
    try{
      const find = await Prisma.typeMasterData.findUnique({
        where: {
          id: id
        }
      })

      if(!find[0]){
        throw new NotFoundException()
      }

      const result = await Prisma.typeMasterData.update({
        where: {
          id: id
        },
        data: {
          ...updateTypeDto
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

  async remove(id: number) {
    try{
      const result = await Prisma.typeMasterData.delete({
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
