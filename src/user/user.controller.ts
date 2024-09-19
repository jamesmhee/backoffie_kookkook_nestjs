import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { userSearchDto } from './dto/search-user.dto';

@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get(':id')
    findOne(@Param('id') id:string){
        return this.userService.getUser(id)
    }

    @Post('/searchuser')
    findAll(@Body() userSearchDto: userSearchDto){
        return this.userService.findAll(userSearchDto)
    }

    @Post('/adduser')
    create(@Body() createUserDto: CreateUserDto){                
        return this.userService.addUser(createUserDto)
    }

    @Patch('/edituser')
    edit(@Body() updateUserDto: UpdateUserDto){                
        return this.userService.editUser(updateUserDto)
    }

    @Delete(':id')
    deleteOne(@Param('id') id:string){
        if(Number.isNaN(parseInt(id))){
            throw new BadRequestException()
        }
        return this.userService.deleteUser(id)
    }
}
