import { Module } from '@nestjs/common';

import { ProductsModule } from './products/products.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [ProductsModule, TransactionsModule, ClientsModule],
})
export class ApplicationModule {}
