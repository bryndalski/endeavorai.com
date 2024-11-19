import { Injectable } from "@nestjs/common";
import { PaymentOrderType } from "../types/payment-type";
import { PaymentOrderStatus } from "../enums/payment-order-status-enum";
import { v4 } from "uuid";

@Injectable()
export class FindPaymentOrdersService {
  findPaymentOrders(): PaymentOrderType[] {
    return [
      {
        _id: "1",
        requestId: v4(),
        createdAt: new Date(),
        status: PaymentOrderStatus.FINALIZED,
      },
      {
        _id: "2",
        requestId: v4(),
        createdAt: new Date(),
        status: PaymentOrderStatus.FAILED,
      },
      {
        _id: "3",
        requestId: v4(),
        createdAt: new Date(),
        status: PaymentOrderStatus.PROCESSED,
      },
      {
        _id: "4",
        requestId: v4(),
        createdAt: new Date(),
        status: PaymentOrderStatus.REVIEW,
      },
    ];
  }
}
