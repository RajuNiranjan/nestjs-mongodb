import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Model } from 'mongoose';
import { Book } from './schema/book.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';
import { User } from 'src/auth/schema/user.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async createNewBook(createBookDto: CreateBookDto, user: User): Promise<Book> {
    const data = Object.assign(createBookDto, { user: user._id });

    const { title, desc, author, price, category } = createBookDto;
    if (!title || !desc || !author || !price || !category) {
      throw new NotFoundException('All fields requred');
    }
    const book = await this.bookModel.create(data);

    return book;
  }

  async findAllBooks(query: Query): Promise<Book[]> {
    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    return await this.bookModel.find(keyword);
  }

  async findOneBook(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async updateBook(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    console.log(id);

    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return await this.bookModel.findByIdAndUpdate(id, updateBookDto, {
      new: true,
    });
  }

  async removeBook(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id);
  }
}
