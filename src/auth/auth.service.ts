import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './schema/auth.schema';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/signup.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private AuthModel: Model<Auth>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    try {
      const { userName, email, password } = signUpDto;
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await this.AuthModel.create({
        userName,
        email,
        password: hashPassword,
      });

      const token = this.jwtService.sign({ id: user._id });
      return { token };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async logIn(logInDto: LoginDto): Promise<{ token: string }> {
    try {
      const { email, password } = logInDto;
      const user = await this.AuthModel.findOne({ email });

      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const token = this.jwtService.sign({ id: user._id });
      return { token };
    } catch (error) {
      throw error;
      console.log(error);
    }
  }
}
