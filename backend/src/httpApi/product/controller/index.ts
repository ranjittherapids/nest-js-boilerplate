import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '@src/middleware';
import { ProductService } from '@src/httpApi/services';
import {
  CreateProductDto,
  PaginationProductDto,
  UpdateProductDto,
} from '@src/httpApi/dtos';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Returns the Created Product',
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns all the products',
  })
  findAll(@Query() paginationProductDto: PaginationProductDto) {
    return this.productService.findAll(paginationProductDto);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns product by id' })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns updated product by id',
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns deleted product id only',
  })
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
