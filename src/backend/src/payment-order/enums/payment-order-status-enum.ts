import { registerEnumType } from "@nestjs/graphql";

export enum PaymentOrderStatus {
  PROCESSED = "PROCESSED",
  REVIEW = "REVIEW",
  FINALIZED = "FINALIZED",
  FAILED = "FAILED",
}

registerEnumType(PaymentOrderStatus, {
  name: "PaymentOrderStatus",
  description: "Status of payment order",
});
