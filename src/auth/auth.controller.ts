import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { LogInDto } from './dto/logIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private userServie: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.userServie.singUp(signUpDto);
  }

  @Post('/login')
  logIn(@Body() logInDto: LogInDto): Promise<{ token: string }> {
    return this.userServie.logIn(logInDto);
  }
}
