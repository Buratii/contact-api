import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class UserDto {
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

export class ContactsPagination {
  @IsOptional()
  page?: number = 1;

  @IsOptional()
  limit?: number = 10;
}
