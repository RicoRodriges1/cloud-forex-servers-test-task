export function toArray(value) {
    if (value === undefined) {
        return [];
    }
    return Array.isArray(value) ? value : [value];
}
export function getPriceListItems(response) {
    const list = response.doc.list;
    const listGroup = toArray(list)[0];
    return toArray(listGroup?.elem);
}
export function isForexTariffItem(item) {
    return (item.title_tag?.$ === "forex_server" ||
        item.title.$.toLowerCase().includes("forex"));
}
