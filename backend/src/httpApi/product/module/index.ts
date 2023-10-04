import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from '@src/httpApi/services';
import { ProductController } from '@src/httpApi/controllers';
import { ProductEntity } from '@src/httpApi/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
