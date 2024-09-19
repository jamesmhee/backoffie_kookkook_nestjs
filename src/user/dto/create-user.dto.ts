import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty ,IsEmail, IsInt, IsString, IsAlpha, MinLength, Matches } from "class-validator"

export class CreateUserDto {        
    readonly id?: number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()    
    @MinLength(1)
    readonly username: string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()    
    @MinLength(1)
    readonly password: string

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()    
    readonly role_id: number

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()        
    readonly branch_id: number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()    
    @MinLength(1)
    readonly first_name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()    
    @MinLength(1)
    readonly last_name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()    
    @MinLength(1)
    readonly nick_name: string

    @ApiProperty({example: 'new Date().toISOString()'})
    @IsNotEmpty()
    @IsString()    
    @MinLength(1)
    readonly date_of_birth: Date

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()        
    readonly age: number

    @ApiProperty({example: 'Male || Female'})
    @IsNotEmpty()
    @IsString()    
    @MinLength(1)
    readonly sex: string

    @ApiProperty({example: '084xxx9514'})
    @IsNotEmpty()
    @IsString()    
    @MinLength(1)
    readonly phone_no: string

    @ApiProperty({example: '11015xxxxx319'})
    @IsNotEmpty()
    @IsString()    
    @MinLength(1)
    readonly identity_id: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()    
    @IsEmail()
    @MinLength(1)
    readonly email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()        
    readonly salary_base: number        
    readonly lastest_login?: Date    
    readonly token?:string
    readonly is_active:boolean
}