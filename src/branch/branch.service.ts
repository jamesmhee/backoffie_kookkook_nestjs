import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { PrismaClient } from '@prisma/client';
import { BranchDataDto, GetBranchSearchDto } from './dto/get-branch.dto';

const Prisma = new PrismaClient()

@Injectable()
export class BranchService {
  async create(createBranchDto: CreateBranchDto) {
    try{
      const result = await Prisma.branchMasterData.create({
        data: {
          name: createBranchDto.name,
          province: createBranchDto.province,
          district: createBranchDto.district,
          sub_district: createBranchDto.sub_district,
          postal_code: createBranchDto.postal_code
        }
      })
      return {
        statusCode: HttpStatus.OK,
        result: {
          id: result.id,
          name: result.name
        }
      }
    }catch(error){
      throw error
    }
  }
  
  async findAll(getBranchSearchDto: GetBranchSearchDto) {
    const pageNumber = getBranchSearchDto.page_number
    const pageSize = getBranchSearchDto.page_size
    const searchValue = getBranchSearchDto.search_value
    const orderBy = getBranchSearchDto.order_by
    const sortColumn = getBranchSearchDto.sort_column    
    try{
      let result: object
      const totalData = await Prisma.branchMasterData.count()
      const totalPages = Math.ceil(totalData/pageSize)
      const hasPreviousPage = pageNumber > 1
      const hasNextPage = pageNumber < totalPages
      if(searchValue.trim().length > 0){
        result = await Prisma.branchMasterData.findMany({
          skip: (pageNumber - 1) * pageSize,
          take: pageSize,
          orderBy: {
            id: 'asc'
          },
          where: {
            name: searchValue
          }
        })        
      }else{
        result = await Prisma.branchMasterData.findMany({
          skip: (pageNumber - 1) * pageSize,
          take: pageSize,
          orderBy: {
            id: 'asc'
          }
        })        
      }
      return {
        statusCode: HttpStatus.OK,
        result: result,
        page: pageNumber,
        hasNextPage: hasNextPage,
        hasPreviousPage: hasPreviousPage,
        totalData: totalData,
        totalPages: totalPages
      }
    }catch(error){
      throw error
    }
  }

  async findOne(id: number) {
    try{
      const result = await Prisma.branchMasterData.findUnique({
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

  async update(id: number, updateBranchDto: UpdateBranchDto) {
    try{
      const result = await Prisma.branchMasterData.update({
        where: {
          id: id
        },
        data: {
          ...updateBranchDto
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
      const result = await Prisma.branchMasterData.delete({
        where: {
          id: id
        }
      })
      return {
        statusCode: HttpStatus.OK,
        result: result.id
      }
    }catch(error){
      throw error
    }
  }
}
