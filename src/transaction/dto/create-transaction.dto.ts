import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTransactionDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    readonly product_id: number
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly total_price_sold: number
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    readonly description: string

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum({
        1: 'transaction',
        2: 'received',
        3: 'expense'
    })
    readonly type: 1 | 2 | 3

}
