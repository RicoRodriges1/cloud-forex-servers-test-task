import { useMemo, useState } from "react";
import { PricingCard } from "@/components/PricingCard";
import type { PricingCardMenuOption } from "@/components/PricingCard";
import type { TariffsData } from "@/types/tariffs";
import styles from "@/styles/Plans.module.scss";
import type { DatacenterId, PricePeriod } from "@/types/pricing";
import { buildPlans } from "@/utils/buildPlans";
import { PLANS } from "./plans.data";

interface PlansProps {
  datacenter: DatacenterId;
  period: PricePeriod;
  tariffs: TariffsData | null;
  loading: boolean;
  error: Error | null;
}

export default function Plans({
  datacenter,
  period,
  tariffs,
  loading,
  error,
}: PlansProps) {
  const plans = useMemo(
    () =>
      buildPlans({
        staticPlans: PLANS,
        apiTariffs: tariffs?.[datacenter],
        period,
      }),
    [datacenter, period, tariffs],
  );

  const [selectedSpecs, setSelectedSpecs] = useState<
    Record<string, PricingCardMenuOption["specs"]>
  >(() => Object.fromEntries(PLANS.map((plan) => [plan.title, plan.specs])));

  if (error) {
    return (
      <section className={styles.plans} aria-label="Forex VPS pricing plans">
        <p className={styles.plans__message} role="alert">
          Failed to load tariffs. Please try again later.
        </p>
      </section>
    );
  }

  return (
    <section className={styles.plans} aria-label="Forex VPS pricing plans">
      {loading && (
        <p className={styles.plans__message} aria-live="polite">
          Loading tariffs...
        </p>
      )}
      <ul className={styles.plans__list}>
        {plans.map((plan) => (
          <li key={plan.title} className={styles.plans__item}>
            <PricingCard
              {...plan}
              specs={selectedSpecs[plan.title] ?? plan.specs}
              onBuy={() => {
                console.info(`Buy plan: ${plan.title}`);
              }}
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
