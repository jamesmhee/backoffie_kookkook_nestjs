import { BadRequestException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from "@prisma/client";
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";

const Prisma = new PrismaClient()

@Injectable()
export class AuthService {
    constructor(
        private userService:UserService,
        private jwtService:JwtService
    ){}

    async signIn(signInDto: SignInDto): Promise<SignInDto>{
        try{
            const user = await this.userService.getUser(signInDto.username)         
            if(!user.is_active){
                throw new BadRequestException("This user has not active please contact support")
            }

            const matchedPassword = await bcrypt.compare(signInDto.password, user.password);                        
            if(!matchedPassword){
                throw new UnauthorizedException("Password Incorrect")
            }

            const latest_login = new Date().toISOString()
            const payload = { id: user.id, username: user.username, role: user.role_id };
            const token = await this.jwtService.signAsync(payload)
            const updateToken = await Prisma.employee.update({
                where: { 
                    id: user.id
                 },
                data: {
                    latest_login: latest_login,
                    token:token
                },
                select: {                    
                    employee_id: true,
                    email: true,
                    role_id: true,
                    first_name: true,
                    last_name: true,
                    role: true,
                    branch: true    
                }
            })
            return {                                            
                username: user.username,
                latest_login: latest_login,
                token: token,
                result: updateToken
                // token: token,lovelove na ai ouan jubjub        
            };
        }catch(error){ 
            throw error
        }        
    }
}
