import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateRoleDto {
    @ApiProperty()
    @IsOptional()
    @IsInt()
    readonly id?: number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name?: string

    @ApiProperty()
    @IsOptional()
    @IsArray()
    readonly list?: string[]
}
