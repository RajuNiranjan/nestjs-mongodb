import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Category } from '../schema/book.schema';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly desc: string;

  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsNotEmpty()
  @IsString()
  readonly price: number;

  @IsNotEmpty()
  @IsEnum(['ADVENTURE', 'LOVE', 'ACTION', 'DRAMA'])
  readonly category: Category;
}
