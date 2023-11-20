import { CategoryEntity } from 'src/models/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { UpdateResult } from 'typeorm';

export abstract class ICategory {
  abstract addCategory(params: CreateCategoryDto): Promise<CategoryEntity>;

  abstract updateCategory(
    id: string,
    params: UpdateCategoryDto,
  ): Promise<CategoryEntity>;

  abstract getCategory(id: string): Promise<CategoryEntity>;

  abstract deleteCategory(id: string): Promise<UpdateResult>;

  abstract listCategories(params?: any): Promise<CategoryEntity[] | []>;
}
