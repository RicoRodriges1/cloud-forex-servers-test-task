import { useEffect, useState } from "react";

import { getPriceList } from "@/api/zomroApi";
import { normalizeForexTariffsByDatacenter } from "@/utils/normalizeTariffs";
import { ALL_DATACENTER_API_IDS } from "@/types/pricing";
import type { TariffsData } from "@/types/tariffs";

export type { TariffsData };

export function useTariffs() {
  const [data, setData] = useState<TariffsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadTariffs() {
      try {
        setLoading(true);

        const response = await getPriceList(ALL_DATACENTER_API_IDS);

        if (!isMounted) {
          return;
        }

        setData(normalizeForexTariffsByDatacenter(response));
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err
              : new Error("Failed to load tariffs"),
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadTariffs();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    data,
    loading,
    error,
  };
}
