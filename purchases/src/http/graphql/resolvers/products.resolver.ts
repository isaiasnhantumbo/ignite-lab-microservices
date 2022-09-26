import { Controller, Get, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ProductService } from '../../../services/products.service';
import { AuthorizationGuard } from '../../../http/auth/authorization.guard';
import { CreateProductInput } from './../inputs/create-product-input';
import { Product } from './../models/product';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => [Product])
  products() {
    return this.productService.listAllProducts();
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Product)
  createProduct(@Args('data') data: CreateProductInput) {
    return this.productService.createProduct(data);
  }
}
