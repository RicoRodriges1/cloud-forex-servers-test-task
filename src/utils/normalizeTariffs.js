import { API_ID_TO_DATACENTER } from "@/types/pricing";
import { getPriceListItems, isForexTariffItem, toArray, } from "@/types/zomroPriceList";
function getForexPlanNumber(title) {
    const match = title.match(/Cloud Forex (\d+)/i);
    return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}
function mapPrices(priceItems) {
    return priceItems.reduce((acc, price) => {
        acc[price.period.$] = Number(price.cost.$);
        return acc;
    }, {});
}
function mapItemToTariff(item) {
    return {
        id: item.id.$,
        title: item.title.$,
        prices: mapPrices(toArray(item.prices.price)),
    };
}
function createEmptyTariffsData() {
    return {
        poland: [],
        netherlands: [],
        germany: [],
        usa: [],
    };
}
export function normalizeForexTariffsByDatacenter(response) {
    const tariffsByDatacenter = createEmptyTariffsData();
    getPriceListItems(response)
        .filter(isForexTariffItem)
        .forEach((item) => {
        const apiDatacenterId = item.datacenter.id.$;
        const datacenterId = API_ID_TO_DATACENTER[apiDatacenterId];
        if (!datacenterId) {
            return;
        }
        tariffsByDatacenter[datacenterId].push(mapItemToTariff(item));
    });
    Object.keys(tariffsByDatacenter).forEach((datacenterId) => {
        tariffsByDatacenter[datacenterId].sort((a, b) => getForexPlanNumber(a.title) - getForexPlanNumber(b.title));
    });
    return tariffsByDatacenter;
}
