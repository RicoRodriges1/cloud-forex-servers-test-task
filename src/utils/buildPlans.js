import { PERIOD_DISPLAY_LABEL, PERIOD_TO_API_KEY, } from "@/types/pricing";
function findApiTariff(staticPlan, apiTariffs) {
    if (!apiTariffs) {
        return undefined;
    }
    return apiTariffs.find((tariff) => tariff.title.startsWith(staticPlan.title));
}
export function buildPlans({ staticPlans, apiTariffs, period, status, }) {
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
                priceState: "loading",
                period: periodLabel,
            };
        }
        const apiPrice = apiTariff?.prices[apiKey];
        return {
            ...plan,
            id: apiTariff?.id,
            isBestChoice: index === 2,
            price: apiPrice !== undefined ? apiPrice.toFixed(2) : null,
            priceState: apiPrice !== undefined ? "ready" : "unavailable",
            period: periodLabel,
        };
    });
}
