import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class userSearchDto{
    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly search_value?: string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    readonly page_number: number
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    readonly page_size: number

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly order_by?: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly sort_column?: string
}