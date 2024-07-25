import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schema/book.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async create(createBookDto: Book): Promise<Book> {
    const res = await this.bookModel.create(createBookDto);
    return res;
  }

  async findAll(): Promise<Book[]> {
    const book = await this.bookModel.find();
    return book;
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async update(id: number, updateBookDto: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, updateBookDto, {
      new: true,
      runValidators: true,
    });
  }

  async remove(id: number) {
    return await this.bookModel.findByIdAndDelete(id);
  }
}
