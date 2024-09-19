import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

interface ResultProps {
    employee_id: string
    email: string
    role_id: number,
    first_name: string,
    last_name: string
}

export class SignInDto{
    @ApiProperty({example: 'jemmy'})
    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    readonly username?: string

    @ApiProperty({example: '1234'})
    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    readonly password?: string
        
    @IsOptional()
    @IsString()
    readonly latest_login?: string

    @IsOptional()
    @IsString()
    readonly token?: string

    readonly result: ResultProps
}
