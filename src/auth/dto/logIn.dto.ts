import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LogInDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
