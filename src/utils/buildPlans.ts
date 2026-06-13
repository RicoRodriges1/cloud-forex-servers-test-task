import type { PricingCardProps } from "@/components/PricingCard";
import type { Tariff } from "@/types/tariffs";
import type { TariffsFetchStatus } from "@/hooks/useTariffs";
import {
  PERIOD_DISPLAY_LABEL,
  PERIOD_TO_API_KEY,
  type PricePeriod,
} from "@/types/pricing";

type StaticPlan = Omit<
  PricingCardProps,
  "onBuy" | "onAddToCart" | "onMenuOptionSelect" | "onTerminalsHelpClick" | "className" | "priceState"
>;

export interface BuiltPlan extends StaticPlan {
  price: string | null | undefined;
  priceState: "loading" | "ready" | "unavailable";
}

interface BuildPlansParams {
  staticPlans: StaticPlan[];
  apiTariffs: Tariff[] | undefined;
  period: PricePeriod;
  status: TariffsFetchStatus;
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
  status,
}: BuildPlansParams): BuiltPlan[] {
  const apiKey = PERIOD_TO_API_KEY[period];
  const periodLabel = PERIOD_DISPLAY_LABEL[period];

  return staticPlans.map((plan, index) => {
    const apiTariff = findApiTariff(plan, apiTariffs);

    if (status === "loading") {
      return {
        ...plan,
        id: apiTariff?.id,
        isBestChoice: index === 2,
        price: undefined,
        priceState: "loading" as const,
        period: periodLabel,
      };
    }

    const apiPrice = apiTariff?.prices[apiKey];

    return {
      ...plan,
      id: apiTariff?.id,
      isBestChoice: index === 2,
      price: apiPrice !== undefined ? apiPrice.toFixed(2) : null,
      priceState: apiPrice !== undefined ? ("ready" as const) : ("unavailable" as const),
      period: periodLabel,
    };
  });
}
