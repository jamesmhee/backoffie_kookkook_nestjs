import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty ,IsEmail, IsInt, IsString, IsAlpha, MinLength, Matches, minLength } from "class-validator"

export class UpdateUserDto {
    @ApiProperty({example: 'userId ex: 1​'})
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    readonly userId: string        
    
    @ApiPropertyOptional()
    readonly role_id?: number

    @ApiPropertyOptional()
    readonly branch_id?: number

    @ApiPropertyOptional()
    readonly first_name?: string

    @ApiPropertyOptional()
    readonly last_name?: string

    @ApiPropertyOptional()
    readonly nick_name?: string

    @ApiPropertyOptional({example:'ใช้ new Date().toISOString()'})
    readonly date_of_birth?: Date

    @ApiPropertyOptional()
    readonly age?: number

    @ApiPropertyOptional()
    readonly sex?: string

    @ApiPropertyOptional()
    readonly phone_no?: string

    @ApiPropertyOptional()
    readonly identity_id?: string
    
    @ApiPropertyOptional()
    readonly email?: string

    @ApiPropertyOptional()
    readonly salary_base?: number

    @ApiPropertyOptional()
    readonly lastest_login?: string

    @ApiPropertyOptional()
    readonly token?:string
}