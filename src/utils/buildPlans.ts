import type { PricingCardProps } from "@/components/PricingCard";
import type { Tariff } from "@/types/tariffs";
import {
  PERIOD_DISPLAY_LABEL,
  PERIOD_TO_API_KEY,
  type PricePeriod,
} from "@/types/pricing";

type StaticPlan = Omit<
  PricingCardProps,
  "onBuy" | "onAddToCart" | "onMenuOptionSelect" | "onTerminalsHelpClick" | "className"
>;

interface BuildPlansParams {
  staticPlans: StaticPlan[];
  apiTariffs: Tariff[] | undefined;
  period: PricePeriod;
}

function findApiTariff(
  staticPlan: StaticPlan,
  apiTariffs: Tariff[] | undefined,
): Tariff | undefined {
  if (!apiTariffs) {
    return undefined;
  }

  return apiTariffs.find((tariff) =>
    tariff.title.startsWith(staticPlan.title),
  );
}

export function buildPlans({
  staticPlans,
  apiTariffs,
  period,
}: BuildPlansParams): StaticPlan[] {
  const apiKey = PERIOD_TO_API_KEY[period];
  const periodLabel = PERIOD_DISPLAY_LABEL[period];

  return staticPlans.map((plan, index) => {
    const apiTariff = findApiTariff(plan, apiTariffs);
    const apiPrice = apiTariff?.prices[apiKey];

    return {
      ...plan,
      isBestChoice: index === 2,
      price:
        apiPrice !== undefined ? apiPrice.toFixed(2) : plan.price,
      period: periodLabel,
    };
  });
}
