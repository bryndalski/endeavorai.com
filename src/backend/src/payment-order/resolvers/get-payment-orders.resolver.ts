import { Query, Resolver } from "@nestjs/graphql";
import { PaymentOrderType } from "../types/payment-type";
import { PaymentOrderDto } from "../dto/payment-order-dto";
import { FindPaymentOrdersService } from "../services/find-payment-orders.service";

@Resolver(() => PaymentOrderDto)
export class GetPaymentOrdersResolver {
  constructor(private readonly paymentOrderService: FindPaymentOrdersService) {}

  @Query(() => [PaymentOrderDto])
  async getPaymentOrders(): Promise<PaymentOrderType[]> {
    return this.paymentOrderService.findPaymentOrders();
  }
}
