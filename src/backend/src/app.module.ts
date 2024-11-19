import { Module } from "@nestjs/common";
import { HealthModule } from "./health/health.module";
import { PaymentOrderModule } from "./payment-order/payment-order.module";
import { libraryProvider } from "./library.provider";

@Module({
  imports: [...libraryProvider, HealthModule, PaymentOrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
