import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/signUp.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LogInDto } from './dto/logIn.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async singUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    try {
      const { userName, email, password } = signUpDto;
      const user = await this.userModel.findOne({ email });
      if (user) {
        throw new UnauthorizedException('email already existed');
      }
      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await this.userModel.create({
        userName,
        email,
        password: hashPassword,
      });

      const token = this.jwtService.sign({ id: newUser._id });
      return { token };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async logIn(logInDto: LogInDto): Promise<{ token: string }> {
    try {
      const { email, password } = logInDto;
      if (!email || !password) {
        throw new UnauthorizedException('all fields are required');
      }
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const token = this.jwtService.sign({ id: user._id });
      return { token };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
