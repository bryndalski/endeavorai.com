import { PaymentOrderStatus } from "../enums/payment-order-status-enum";

export type PaymentOrderType = {
  _id: string;

  status: PaymentOrderStatus;

  requestId: string;

  createdAt: Date;
};
