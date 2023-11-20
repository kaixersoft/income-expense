import {
  Body,
  Controller,
  Post,
  Query,
  Get,
  Param,
  ValidationPipe,
  UsePipes,
  Put,
  Delete,
} from '@nestjs/common';
import { ICategory } from './domain/interface/icategory.interface';
import { CreateCategoryDto } from './domain/dto/create-category.dto';
import { CategoryEntity } from 'src/models/category.entity';
import { GetCategoryDto } from './domain/dto/get-category.dto';
import { UpdateCategoryDto } from './domain/dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: ICategory) {}

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  async deleteCategory(@Param() param: GetCategoryDto) {
    return this.categoryService.deleteCategory(param.id);
  }

  @Post()
  async create(@Body() params: CreateCategoryDto): Promise<CategoryEntity> {
    return await this.categoryService.addCategory(params);
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  async getCategory(@Param() param: GetCategoryDto): Promise<CategoryEntity> {
    const { id } = param;
    return await this.categoryService.getCategory(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateCategory(
    @Param() param: GetCategoryDto,
    @Body() body: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    const { id } = param;
    return await this.categoryService.updateCategory(id, body);
  }

  @Get()
  listCategories(@Query() data?: any): Promise<CategoryEntity[] | []> {
    return this.categoryService.listCategories(data);
  }
}
