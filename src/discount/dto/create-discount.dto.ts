import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDiscountDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    readonly price: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    readonly percent: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    readonly total: number

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    readonly start_date: Date

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    readonly end_date: Date

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    readonly isActive?: boolean

}
