import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Model } from 'mongoose';
import { Book } from './schema/book.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async createNewBook(createBookDto: CreateBookDto): Promise<Book> {
    const { title, desc, author, price, category } = createBookDto;
    if (!title || !desc || !author || !price || !category) {
      throw new NotFoundException('All fields requred');
    }
    const book = await this.bookModel.create({
      title,
      desc,
      author,
      price,
      category,
    });

    return book;
  }

  async findAllBooks(): Promise<Book[]> {
    return await this.bookModel.find();
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
