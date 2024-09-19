import { userSearchDto } from "src/user/dto/search-user.dto";
import { BranchData } from "./interface";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class BranchDataDto implements BranchData {    
    id: number
    name: string
    province: string
    district: string
    sub_district: string
    postal_code: string
}

export class GetBranchSearchDto implements userSearchDto {
    @ApiProperty({example: 'if search all leave empty'})
    @IsString()    
    search_value?: string

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    page_number: number

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    page_size: number

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    order_by?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    sort_column?: string
}