import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './schema/book.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('/createbook')
  createNewBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.bookService.createNewBook(createBookDto);
  }

  @Get()
  findAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.bookService.findAllBooks(query);
  }

  @Get(':id')
  findOneBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.findOneBook(id);
  }

  @Patch('/updatebook/:id')
  updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateBook(id, updateBookDto);
  }

  @Delete('/deletebook/:id')
  removeBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.removeBook(id);
  }
}
