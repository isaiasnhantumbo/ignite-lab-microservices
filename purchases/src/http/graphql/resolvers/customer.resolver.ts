import { PurchasesService } from './../../../services/purchases.service';
import { ProductService } from './../../../services/products.service';
import { Purchase } from './../models/purchase';
import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';

import { CustomerService } from './../../../services/customers.service';
import { AuthUser, CurrentUser } from '../../../http/auth/current-user';
import { Customer } from '../models/customer';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customerService: CustomerService,
    private purchasesServices: PurchasesService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  me(@CurrentUser() user: AuthUser) {
    return this.customerService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField()
  purchase(@Parent() customer: Customer) {
    return this.purchasesServices.listAllPurchasesByCustomer(customer.id);
  }
}
