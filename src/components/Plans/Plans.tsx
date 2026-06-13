import { useMemo, useState } from "react";
import { PricingCard } from "@/components/PricingCard";
import type { PricingCardMenuOption } from "@/components/PricingCard";
import type { TariffsData } from "@/types/tariffs";
import type { TariffsFetchStatus } from "@/hooks/useTariffs";
import styles from "@/styles/Plans.module.scss";
import type { DatacenterId, PricePeriod } from "@/types/pricing";
import { buildPlans } from "@/utils/buildPlans";
import { PLANS } from "./plans.data";

interface PlansProps {
  datacenter: DatacenterId;
  period: PricePeriod;
  tariffs: TariffsData | null;
  status: TariffsFetchStatus;
  onRetry: () => void;
}

export default function Plans({
  datacenter,
  period,
  tariffs,
  status,
  onRetry,
}: PlansProps) {
  const plans = useMemo(
    () =>
      buildPlans({
        staticPlans: PLANS,
        apiTariffs: tariffs?.[datacenter],
        period,
        status,
      }),
    [datacenter, period, tariffs, status],
  );

  const [selectedSpecs, setSelectedSpecs] = useState<
    Record<string, PricingCardMenuOption["specs"]>
  >(() => Object.fromEntries(PLANS.map((plan) => [plan.title, plan.specs])));

  if (status === "error") {
    return (
      <section className={styles.plans} aria-label="Forex VPS pricing plans">
        <div className={styles.plans__error} role="alert">
          <p className={styles.plans__errorTitle}>Unable to fetch pricing plans</p>
          <p className={styles.plans__errorText}>
            Failed to load pricing. Please check your connection and try again.
          </p>
          <button
            type="button"
            className={styles.plans__errorButton}
            onClick={onRetry}
          >
            Try again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.plans} aria-label="Forex VPS pricing plans">
      <ul
        className={styles.plans__list}
        aria-busy={status === "loading"}
      >
        {plans.map((plan) => (
          <li key={plan.title} className={styles.plans__item}>
            <PricingCard
              {...plan}
              specs={selectedSpecs[plan.title] ?? plan.specs}
              onMenuOptionSelect={(option) => {
                setSelectedSpecs((current) => ({
                  ...current,
                  [plan.title]: option.specs,
                }));
              }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
