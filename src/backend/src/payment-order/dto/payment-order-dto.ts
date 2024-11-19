import { Field, ObjectType } from "@nestjs/graphql";
import { PaymentOrderType } from "../types/payment-type";
import { PaymentOrderStatus } from "../enums/payment-order-status-enum";

@ObjectType()
export class PaymentOrderDto implements Omit<PaymentOrderType, "_id"> {
  @Field()
  createdAt: Date;

  @Field()
  requestId: string;

  @Field(() => PaymentOrderStatus)
  status: PaymentOrderStatus;
}
