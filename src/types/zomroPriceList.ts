export interface ZomroValue {
  $: string;
}

export interface ZomroPriceItem {
  $special_price?: string;
  cost: ZomroValue;
  currency: ZomroValue;
  period: ZomroValue;
}

export interface ZomroPrices {
  $key?: string;
  price: ZomroPriceItem | ZomroPriceItem[];
}

export interface ZomroDatacenterRef {
  id: ZomroValue;
  title?: ZomroValue;
  value?: ZomroValue;
}

export interface ZomroPriceListItem {
  id: ZomroValue;
  title: ZomroValue;
  title_tag?: ZomroValue;
  datacenter: ZomroDatacenterRef;
  prices: ZomroPrices;
}

export interface ZomroPriceListGroup {
  $name: string;
  $total_count?: string;
  elem: ZomroPriceListItem | ZomroPriceListItem[];
}

export interface ZomroPriceListResponse {
  doc: {
    list?: ZomroPriceListGroup | ZomroPriceListGroup[];
  };
}

export function toArray<T>(value: T | T[] | undefined): T[] {
  if (value === undefined) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

export function getPriceListItems(
  response: ZomroPriceListResponse,
): ZomroPriceListItem[] {
  const list = response.doc.list;
  const listGroup = toArray(list)[0];

  return toArray(listGroup?.elem);
}

export function isForexTariffItem(item: ZomroPriceListItem): boolean {
  return (
    item.title_tag?.$ === "forex_server" ||
    item.title.$.toLowerCase().includes("forex")
  );
}
