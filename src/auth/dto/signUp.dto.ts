import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly userName: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
