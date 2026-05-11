import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class LoginDto {
    @IsString()
    @IsOptional()
    username: string;
    @IsString()
    @IsOptional()
    @IsEmail()
    email: string;
    @IsString()
    @IsNotEmpty()
    password: string;
}