import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schema/users.schema';
import * as mongoose from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: mongoose.Model<Users>,
  ) {}
  async create(createUserDto: User): Promise<Users> {
    const newUser = await this.userModel.create(createUserDto);
    return newUser;
  }

  async findAll(): Promise<Users[]> {
    return await this.userModel.find();
  }

  async findOne(id: number): Promise<Users> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: Users): Promise<Users> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
      runValidators: true,
    });
  }

  async remove(id: number): Promise<Users> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
