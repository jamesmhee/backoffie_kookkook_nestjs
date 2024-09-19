import { Controller, Post, HttpCode, Body, HttpStatus, Get, Headers, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SetMetadata } from '@nestjs/common';
import { User } from './auth.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signIn(@Body() signInDto: SignInDto) {
        const result = await this.authService.signIn(signInDto)
        return {
            statusCode: HttpStatus.OK,
            message: result
        }            
    }
    
    @Get('user')
    getUserFromToken(@User() user:object){                
        return user
    }
}
