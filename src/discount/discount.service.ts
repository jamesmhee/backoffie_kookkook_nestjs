import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { PrismaClient } from '@prisma/client';
import { UseDiscountDto } from './dto/use-discount.dto';

const Prisma = new PrismaClient()

@Injectable()
export class DiscountService {
  async create(createDiscountDto: CreateDiscountDto) {
    try{
      const result = await Prisma.discountMasterData.create({
        data: {
          ...createDiscountDto
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
      const result = await Prisma.discountMasterData.findMany()
      return {
        statusCode: HttpStatus.OK,
        result: result
      }
    }catch(error){
      throw error
    }
  }

  async findOne(id: number) {
    try{
      const result = await Prisma.discountMasterData.findUnique({
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

  async update(id: number, updateDiscountDto: UpdateDiscountDto) {
    try{
      const result = await Prisma.discountMasterData.update({
        where: {
          id: id
        },
        data: {
          ...updateDiscountDto
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

  async remove(id: number, is_active: boolean) {
    try{
      const result = await Prisma.discountMasterData.update({
        where: {
          id: id
        },
        data: {
          is_active: is_active
        }
      })
      return {
        statusCode: HttpStatus.OK,
        message: "Disabled Discount Success",
        result: {
          id: result.id
        }
      }
    }catch(error){
      throw error
    }
  }

  async useDiscount(useDiscountDto: UseDiscountDto){
    try{
      const coupon = await Prisma.discountMasterData.findUnique({
        where: {
          id: useDiscountDto.id
        }
      })
      if(!coupon.id){
        throw new NotFoundException("Not have this discount in system")
      }            
      const today = new Date().getTime()
      const discount_start = new Date(coupon.start_date).getTime()
      const discount_end = new Date(coupon.end_date).getTime()
      if(today > discount_end || today < discount_start || !coupon.is_active || coupon.total <= 0){
        return {
          statusCode: 200,
          message: "This discount coupon can't use in this time or is unavailable"
        }
      }

      // for check has transaction id
      const checkTransaction = await Prisma.orderTransaction.findUnique({
        where: {
          id: useDiscountDto.order_transaction_id
        }
      })      
      if(!checkTransaction.id){
        throw new BadRequestException("Not have this transaction id")
      }
      // if have
      const findDiscountPrice = checkTransaction.total_price_sold - coupon.price
      const editTransaction = await Prisma.orderTransaction.update({
        where: {
          id: useDiscountDto.order_transaction_id
        }
        ,data:{
          discount: coupon.price,
          total_price_sold: findDiscountPrice
        }
      })
      const useCoupon = await Prisma.discountMasterData.update({
        where: {
          id: useDiscountDto.id
        },
        data: {
          total: {decrement: 1}
        }
      })
      if(!editTransaction || !useCoupon){
        throw new BadRequestException("Somthing error")
      }
      return {
        statusCode: 200,
        result: {
          orderTransactionId: editTransaction.id,
          orderTotalSold: findDiscountPrice,
          orderDiscountPrice: coupon.price,
          couponId: useCoupon.id,
          totalCouponAvailable: useCoupon.total
        }
      }
    }catch(error){
      throw error
    }
  }
}
