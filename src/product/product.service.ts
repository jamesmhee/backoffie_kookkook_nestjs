import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { ProductSearchDto } from './dto/get-product.dto';

const Prisma = new PrismaClient()

@Injectable()
export class ProductService {
  async create(createProductDto: CreateProductDto) {
    try{
      const result = await Prisma.productMasterData.create({
        data: {
          ...createProductDto
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

  async findAll(productsearchDto: ProductSearchDto) {
    const searchValue = productsearchDto.search_value
    const pageNumber = productsearchDto.page_number
    const pageSize = productsearchDto.page_size
    const order_by = productsearchDto.order_by
    const sortColumn = productsearchDto.sort_column    
    try{      
      let result: object
      const totalData = await Prisma.productMasterData.count()
      const totalPages = Math.ceil(totalData / pageSize)
      const hasNextPage = pageNumber > 1
      const hasPreviousPage = pageNumber < totalPages      
      
      if(searchValue.trim().length > 0){
        result = await Prisma.productMasterData.findMany({
          orderBy: {
            id: 'asc'            
          },
          where: {
            name: searchValue.trim()
          }
        })
      }else{
        result = await Prisma.productMasterData.findMany({
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
      const result = await Prisma.productMasterData.findUnique({
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

  async update(id: number, updateProductDto: UpdateProductDto) {
    try{
      const result = Prisma.productMasterData.update({
        where: {
          id: id
        },
        data: {
          ...updateProductDto
        }
      })
    }catch(error){
      throw error
    }
  }

  async remove(id: number) {
    try{
      const result = await Prisma.productMasterData.delete({
        where: {
          id: id
        }
      })
    }catch(error){
      throw error
    }
  }
}
