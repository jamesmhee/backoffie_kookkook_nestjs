import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class UseDiscountDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    readonly id: number        

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    readonly order_transaction_id: number
}