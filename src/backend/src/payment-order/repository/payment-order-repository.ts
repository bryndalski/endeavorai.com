import { Injectable } from "@nestjs/common";
import { PaymentOrderType } from "../types/payment-type";
import { InjectTypeDorm, TypeDormConnection } from "@nest-dynamodb/typedorm";
import { PaymentOrderEntity } from "../entity/payment-order.entity";

@Injectable()
export class PaymentOrderRepository {
  constructor(
    @InjectTypeDorm() private readonly dynamoConnection: TypeDormConnection
  ) {}

  async addPaymentOrder(
    paymentOrder: PaymentOrderEntity
  ): Promise<PaymentOrderEntity> {
    return await this.dynamoConnection.entityManager.create<PaymentOrderEntity>(
      paymentOrder
    );
  }

  async filterPaymentOrders(
    filter: Partial<PaymentOrderType>
  ): Promise<PaymentOrderEntity[]> {
    const result =
      await this.dynamoConnection.entityManager.find<PaymentOrderEntity>(
        PaymentOrderEntity,
        filter
      );
    return result.items as PaymentOrderEntity[];
  }
}
