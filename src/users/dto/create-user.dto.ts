import { IsNotEmpty, IsString, MaxLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(14)
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
