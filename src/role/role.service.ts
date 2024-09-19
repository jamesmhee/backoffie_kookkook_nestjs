import { ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaClient } from '@prisma/client';

const Prisma = new PrismaClient()

@Injectable()
export class RoleService {
  async create(createRoleDto: CreateRoleDto) {
    try{          
      const result = await Prisma.roleMasterData.create({
        data: {
          name: createRoleDto.name,
          list: createRoleDto.list
        }
      })
      return {
        statusCode: HttpStatus.OK,
        name: result.name,
        role_id: result.id
      }
    }catch(error){
      throw error
    }
  }

  async findAll() {
    try{
      const result = await Prisma.roleMasterData.findMany()      
      return {
        statusCode: HttpStatus.OK,
        result: result
      }
    }catch(error){
      throw error
    }
  }

  async findOne(name: string){
    try{
      const result = await Prisma.roleMasterData.findUnique({
        where: {
          name: name
        }
      })
      if(!result){
        throw new NotFoundException("Not have this role in system")
      }
      return {
        statusCode: HttpStatus.OK,
        result: result
      }
    }catch(error){
      throw error
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto){
    try{      
      const result = await Prisma.roleMasterData.update({
        where: {
          id: id
        },
        data: {
          ...updateRoleDto
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
      const result = await Prisma.roleMasterData.delete({
        where :{
          id: id
        }
      })
      return {
        statusCode: HttpStatus.OK,   
        message: "Delete role success",
        result: result
      }
    }catch(error){
      throw error
    }
  }
}
