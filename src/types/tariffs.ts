import type { DatacenterId } from "@/types/pricing";

export interface Tariff {
  id: string;
  title: string;
  prices: Record<string, number>;
}

export type TariffsData = Record<DatacenterId, Tariff[]>;
