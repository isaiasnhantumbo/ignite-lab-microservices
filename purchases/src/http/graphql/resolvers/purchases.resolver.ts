import { CustomerService } from './../../../services/customers.service';
import { CreatePurchaseInput } from './../inputs/create-purchase-input';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { ProductService } from './../../../services/products.service';
import { PurchasesService } from './../../../services/purchases.service';
import { AuthUser, CurrentUser } from '../../../http/auth/current-user';

import { Purchase } from '../models/purchase';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductService,
    private customerService: CustomerService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => [Purchase])
  purchases() {
    return this.purchasesService.listAllPurchases();
  }

  @ResolveField()
  product(@Parent() purchase: Purchase) {
    return this.productsService.getProductById(purchase.productId);
  }
  @UseGuards(AuthorizationGuard)
  @Mutation(() => Purchase)
  async createPurchase(
    @Args('data')
    data: CreatePurchaseInput,
    @CurrentUser() user: AuthUser,
  ) {
    let customer = await this.customerService.getCustomerByAuthUserId(user.sub);

    if (!customer) {
      customer = await this.customerService.createProduct({
        authUserId: user.sub,
      });
    }

    return this.purchasesService.createPurchase({
      customerId: customer.id,
      productId: data.productId,
    });
  }
}
