import {
  Attribute,
  AUTO_GENERATE_ATTRIBUTE_STRATEGY,
  AutoGenerateAttribute,
  Entity,
} from "@typedorm/common";
import { PaymentOrderStatus } from "../enums/payment-order-status-enum";

@Entity({
  name: "PaymentOrder",
  primaryKey: {
    partitionKey: "PAYMENT_ORDER#{{id}}",
  },
})
export class PaymentOrderEntity {
  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
  })
  id: string;

  @Attribute()
  requestId: string;

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.ISO_DATE,
  })
  createdAt: Date;

  @Attribute()
  status: PaymentOrderStatus;
}
