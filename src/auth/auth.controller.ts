import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { SignUpDto } from './dto/signup.schema';
import { LoginDto } from './dto/login.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  logIn(@Body() logInDto: LoginDto): Promise<{ token: string }> {
    return this.authService.logIn(logInDto);
  }
}
