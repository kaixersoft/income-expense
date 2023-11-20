import { Inject, Injectable, Logger } from '@nestjs/common';
import { ICategory } from './domain/interface/icategory.interface';
import { CreateCategoryDto } from './domain/dto/create-category.dto';
import { CategoryEntity } from 'src/models/category.entity';
import { UpdateCategoryDto } from './domain/dto/update-category.dto';
import { UpdateResult } from 'typeorm';
import { IRepository } from 'src/common/interface/repository/irespository.interface';

@Injectable()
export class CategoryService implements ICategory {
  private readonly logger = new Logger(CategoryService.name);

  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepo: IRepository<
      CategoryEntity,
      CreateCategoryDto,
      UpdateCategoryDto
    >,
  ) {}

  async deleteCategory(id: string): Promise<UpdateResult> {
    try {
      return await this.categoryRepo.delete(id);
    } catch (e) {
      this.logger.error('Failed to delete category', e);
      throw e;
    }
  }

  async getCategory(id: string): Promise<CategoryEntity> {
    try {
      return await this.categoryRepo.findById(id);
    } catch (e) {
      this.logger.error('Failed to retrieve category', e);
      throw e;
    }
  }

  async listCategories(params?: any): Promise<CategoryEntity[] | []> {
    try {
      return await this.categoryRepo.findAll(params);
    } catch (e) {
      this.logger.error('Failed to get the list of categories');
      throw e;
    }
  }

  async updateCategory(
    id: string,
    params: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    try {
      const category = await this.categoryRepo.findById(id);
      if (category) {
        return await this.categoryRepo.update(id, params);
      }
    } catch (e) {
      this.logger.error('Failed to update category', e);
      throw e;
    }
  }

  async addCategory(params: CreateCategoryDto): Promise<CategoryEntity> {
    try {
      return this.categoryRepo.create(params);
    } catch (e) {
      this.logger.error('Failed to add new category', e);
      throw e;
    }
  }
}
