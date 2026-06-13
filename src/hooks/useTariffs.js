import { useCallback, useEffect, useState } from "react";
import { getPriceList } from "@/api/zomroApi";
import { normalizeForexTariffsByDatacenter } from "@/utils/normalizeTariffs";
import { ALL_DATACENTER_API_IDS } from "@/types/pricing";
function hasAnyTariffs(data) {
    return Object.values(data).some((tariffs) => tariffs.length > 0);
}
export function useTariffs() {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState("loading");
    const [error, setError] = useState(null);
    const [fetchId, setFetchId] = useState(0);
    const refetch = useCallback(() => {
        setFetchId((id) => id + 1);
    }, []);
    useEffect(() => {
        let isMounted = true;
        async function loadTariffs() {
            try {
                setStatus("loading");
                setError(null);
                const response = await getPriceList(ALL_DATACENTER_API_IDS);
                if (!isMounted) {
                    return;
                }
                const normalized = normalizeForexTariffsByDatacenter(response);
                if (!hasAnyTariffs(normalized)) {
                    throw new Error("No pricing data available");
                }
                setData(normalized);
                setStatus("success");
            }
            catch (err) {
                if (isMounted) {
                    setError(err instanceof Error
                        ? err
                        : new Error("Failed to load tariffs"));
                    setStatus("error");
                }
            }
        }
        loadTariffs();
        return () => {
            isMounted = false;
        };
    }, [fetchId]);
    return {
        data,
        status,
        error,
        refetch,
        loading: status === "loading",
    };
}
