import { Module } from "@nestjs/common";
import { GetPaymentOrdersResolver } from "./resolvers/get-payment-orders.resolver";
import { FindPaymentOrdersService } from "./services/find-payment-orders.service";

@Module({
  providers: [GetPaymentOrdersResolver, FindPaymentOrdersService],
  imports: [],
})
export class PaymentOrderModule {}
