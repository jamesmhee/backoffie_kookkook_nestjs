import {  
  HttpStatus,
  Injectable,
  BadRequestException,
  HttpException,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaClient } from "@prisma/client";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from 'bcrypt';
import { userSearchDto } from "./dto/search-user.dto";
import { GetUser } from "./dto/get-user.dto";

const Prisma = new PrismaClient();

@Injectable()
export class UserService {
    async getUser(username: string): Promise<GetUser> {
        try{
            const findUserData = await Prisma.employee.findUnique({
                select:{
                    id: true,
                    username: true,
                    password: true,
                    employee_id: true,
                    role_id: true,
                    branch_id: true,
                    first_name: true,
                    last_name: true,
                    nick_name: true,
                    date_of_birth: true,
                    age: true,
                    sex: true,
                    phone_no: true,
                    identity_id: true,
                    email: true,
                    salary_base: true,
                    latest_login: false,
                    is_active: true,
                    token: false,
                    role: true,
                    branch: true
                },                        
                where: {
                    username
                },
            });            
            if(!findUserData){
                throw new NotFoundException()
            }
                  
            return findUserData;
        }catch(error){
            throw error
        }
    }

    async findAll(userSearchDto: userSearchDto){
        const pageNumber = userSearchDto.page_number
        const pageSize = userSearchDto.page_size
        const searchValue = userSearchDto.search_value
        const orderBy = userSearchDto.order_by
        const sortColumn = userSearchDto.sort_column
        try{
            let result: object
            const totalData = await Prisma.employee.count({
                where: {
                    is_active: true
                }
            })
            const totalPages = Math.ceil(totalData/pageSize)
            const hasPreviousPage = pageNumber > 1
            const hasNextPage = pageNumber < totalPages
            if(searchValue.trim().length > 0){
                result = await Prisma.employee.findMany({
                    skip: (pageNumber - 1) * pageSize,
                    take: pageSize,
                    select:{
                        id: true,
                        username: true,
                        password: false,
                        employee_id: true,
                        role_id: true,
                        branch_id: true,
                        first_name: true,
                        last_name: true,
                        nick_name: true,
                        date_of_birth: true,
                        age: true,
                        sex: true,
                        phone_no: true,
                        identity_id: true,
                        email: true,
                        salary_base: true,
                        latest_login: false,
                        token: false,     
                        branch: true,
                        role: true                                          
                    },
                    orderBy: {
                        id: 'asc'
                    },
                    where:{
                        OR: [                                                    
                            {
                                username: searchValue
                            },
                            {
                                first_name: searchValue
                            },
                            {
                                last_name: searchValue
                            }
                        ],
                        AND: {
                            is_active: true
                        }                    
                    }                
                })
            }else{
                result = await Prisma.employee.findMany({
                    skip: (pageNumber - 1) * pageSize,
                    take: pageSize,
                    select:{
                        id: true,
                        username: true,
                        password: false,
                        employee_id: true,
                        role_id: true,
                        branch_id: true,
                        first_name: true,
                        last_name: true,
                        nick_name: true,
                        date_of_birth: true,
                        age: true,
                        sex: true,
                        phone_no: true,
                        identity_id: true,
                        email: true,
                        salary_base: true,
                        latest_login: false,
                        token: false,       
                        branch: true,
                        role: true                                        
                    },
                    orderBy: {
                        id: 'asc'
                    },
                    where: {
                        is_active: true
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

    async addUser(createUserDto: CreateUserDto) {
        const username = createUserDto.username;
        const password = createUserDto.password;
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password, salt);              
        try {
            const insertUser = await Prisma.employee.create({
                data: {
                    username: username,
                    password: hash,                    
                    role_id: createUserDto.role_id,
                    branch_id: createUserDto.branch_id,
                    first_name: createUserDto.first_name,
                    last_name: createUserDto.last_name,
                    nick_name: createUserDto.nick_name,
                    date_of_birth: createUserDto.date_of_birth,
                    age: createUserDto.age,
                    sex: createUserDto.sex,
                    phone_no: createUserDto.phone_no,
                    identity_id: createUserDto.identity_id,
                    email: createUserDto.email,
                    salary_base: createUserDto.salary_base,
                },
            });               
            
            return {
                statusCode: HttpStatus.CREATED,
                username: username
            }
        } catch (error) {                     
            throw error
        }
    }

    async editUser(updateUserDto: UpdateUserDto) {
        try {
            const updateUser = await Prisma.employee.update({
                where: {
                    id: +updateUserDto.userId
                },
                data: {
                    role_id: updateUserDto.role_id,
                    branch_id: updateUserDto.branch_id,
                    first_name: updateUserDto.first_name,
                    last_name: updateUserDto.last_name,
                    nick_name: updateUserDto.nick_name,
                    date_of_birth: updateUserDto.date_of_birth,
                    age: updateUserDto.age,
                    sex: updateUserDto.sex,
                    phone_no: updateUserDto.phone_no,
                    identity_id: updateUserDto.identity_id,
                    email: updateUserDto.email,
                    salary_base: updateUserDto.salary_base,
                },
            });
            
            return {
                statusCode: HttpStatus.OK,
                message: updateUser
            }
        } catch (error) {
            throw error
        }
    }

    async deleteUser(userId: string) {        
        try {
            const deleteUser = await Prisma.employee.update({
                where: {
                    id: +userId,
                },
                data: {
                    is_active: false
                }
            });

            if(deleteUser){
                return {
                    statusCode: HttpStatus.OK,
                    message: 'Delete Success'
                }
            }   
        } catch (error) {        
            throw error
        }
    }
}
