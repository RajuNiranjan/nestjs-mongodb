import { Injectable, NotFoundException } from '@nestjs/common';
import { Products } from './schema/products.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name)
    private productServide: Model<Products>,
  ) {}

  async create(createProductDto: Products): Promise<Products> {
    const newUser = await this.productServide.create(createProductDto);
    return newUser;
  }

  async findAll(): Promise<Products[]> {
    return await this.productServide.find();
  }

  async findOne(id: number): Promise<Products> {
    const product = await this.productServide.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Item not found');
    }
    return product;
  }

  async update(id: number, updateProductDto: Products): Promise<Products> {
    const updateUser = await this.productServide.findByIdAndUpdate(
      id,
      updateProductDto,
      {
        new: true,
        runValidators: true,
      },
    );
    return updateUser;
  }

  async remove(id: number): Promise<Products> {
    return this.productServide.findByIdAndDelete(id);
  }
}
