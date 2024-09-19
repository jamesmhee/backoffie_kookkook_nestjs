import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ProductData } from "./interface";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ProductDataDto implements ProductData {
    id: number
    name: string
    detail: string
    sale: number
    cost_price: number
    quantity: number
    category_id: number
    type_id: number
    branch_id: number
}

export class ProductSearchDto {
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