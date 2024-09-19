import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateProductDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly detail: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    readonly sale: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    readonly cost_price: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    readonly quantity: number

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    readonly category_id: number
    
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    readonly type_id: number

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    readonly branch_id: number
}
