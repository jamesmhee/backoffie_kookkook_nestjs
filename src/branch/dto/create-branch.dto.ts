import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, MaxLength } from "class-validator";

export class CreateBranchDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name?: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly province?: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly district?: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly sub_district?: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(6)
    readonly postal_code?: string
}
