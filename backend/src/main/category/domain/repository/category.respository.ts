import { CategoryEntity } from 'src/models/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { BadRequestException } from '@nestjs/common';
import { IRepository } from 'src/common/interface/repository/irespository.interface';

export class CategoryRepository
  implements IRepository<CategoryEntity, CreateCategoryDto, UpdateCategoryDto>
{
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
  ) {}

  async delete(id: string): Promise<UpdateResult> {
    try {
      return await this.categoryRepo.softDelete(id);
    } catch (e) {
      throw e;
    }
  }

  async findAll(params?: any): Promise<CategoryEntity[] | []> {
    try {
      return await this.categoryRepo.find();
    } catch (e) {
      throw [];
    }
  }

  async update(id: string, params: UpdateCategoryDto): Promise<CategoryEntity> {
    try {
      await this.categoryRepo.update({ categoryId: id }, { ...params });
      return await this.findById(id);
    } catch (e) {
      throw e;
    }
  }

  async findById(id: string): Promise<CategoryEntity> {
    try {
      return await this.categoryRepo.findOneBy({ categoryId: id });
    } catch (e) {
      throw e;
    }
  }

  async create(params: CreateCategoryDto): Promise<CategoryEntity> {
    try {
      const newCategory = this.categoryRepo.create(params);
      return await this.categoryRepo.save(newCategory);
    } catch (e) {
      throw new BadRequestException('Duplicate category name');
    }
  }
}
