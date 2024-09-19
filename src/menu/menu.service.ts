import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaClient } from '@prisma/client';

const Prisma = new PrismaClient()

@Injectable()
export class MenuService {
  async create(createMenuDto: CreateMenuDto) {
    try{
      const result = await Prisma.menuMasterData.create({
        data: {
          name: createMenuDto.name,
          created_date: new Date().toISOString()
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
      const result = await Prisma.menuMasterData.findMany()
      return {
        statusCode: HttpStatus.OK,
        result: result
      }
    }catch(error){
      throw error
    }
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    try{
      const result = await Prisma.menuMasterData.update({
        where: {
          id: id
        },
        data: {
          name: updateMenuDto.name,
          latest_update: new Date().toISOString()
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
      const result = await Prisma.menuMasterData.delete({
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
