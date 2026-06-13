import type { DatacenterId } from "@/types/pricing";
import { API_ID_TO_DATACENTER } from "@/types/pricing";
import type { Tariff, TariffsData } from "@/types/tariffs";
import {
  getPriceListItems,
  isForexTariffItem,
  toArray,
  type ZomroPriceListItem,
  type ZomroPriceListResponse,
  type ZomroPriceItem,
} from "@/types/zomroPriceList";

function getForexPlanNumber(title: string): number {
  const match = title.match(/Cloud Forex (\d+)/i);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function mapPrices(priceItems: ZomroPriceItem[]): Record<string, number> {
  return priceItems.reduce<Record<string, number>>((acc, price) => {
    acc[price.period.$] = Number(price.cost.$);
    return acc;
  }, {});
}

function mapItemToTariff(item: ZomroPriceListItem): Tariff {
  return {
    id: item.id.$,
    title: item.title.$,
    prices: mapPrices(toArray(item.prices.price)),
  };
}

function createEmptyTariffsData(): TariffsData {
  return {
    poland: [],
    netherlands: [],
    germany: [],
    usa: [],
  };
}

export function normalizeForexTariffsByDatacenter(
  response: ZomroPriceListResponse,
): TariffsData {
  const tariffsByDatacenter = createEmptyTariffsData();

  getPriceListItems(response)
    .filter(isForexTariffItem)
    .forEach((item) => {
      const apiDatacenterId = item.datacenter.id.$;
      const datacenterId: DatacenterId | undefined =
        API_ID_TO_DATACENTER[apiDatacenterId];

      if (!datacenterId) {
        return;
      }

      tariffsByDatacenter[datacenterId].push(mapItemToTariff(item));
    });

  (Object.keys(tariffsByDatacenter) as DatacenterId[]).forEach((datacenterId) => {
    tariffsByDatacenter[datacenterId].sort(
      (a, b) => getForexPlanNumber(a.title) - getForexPlanNumber(b.title),
    );
  });

  return tariffsByDatacenter;
}
