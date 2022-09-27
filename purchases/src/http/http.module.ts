import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';
import { MessagingModule } from 'src/messaging/messaging.module';

import { DatabaseModule } from '../database/database.module';
import { CustomerService } from '../services/customers.service';
import { ProductService } from '../services/products.service';
import { PurchasesService } from '../services/purchases.service';
import { CustomersResolver } from './graphql/resolvers/customer.resolver';
import { ProductResolver } from './graphql/resolvers/products.resolver';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
    MessagingModule,
  ],
  providers: [
    ProductResolver,
    PurchasesResolver,
    ProductService,
    PurchasesService,
    CustomerService,
    CustomersResolver,
  ],
})
export class HttpModule {}
