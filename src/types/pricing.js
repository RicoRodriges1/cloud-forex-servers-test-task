export const PRICE_PERIODS = [
    "1 Day",
    "1 Month",
    "3 Month",
    "6 Month",
    "12 Month",
];
export const PERIOD_TO_API_KEY = {
    "1 Day": "-50",
    "1 Month": "1",
    "3 Month": "3",
    "6 Month": "6",
    "12 Month": "12",
};
export const PERIOD_DISPLAY_LABEL = {
    "1 Day": "day",
    "1 Month": "month",
    "3 Month": "3 months",
    "6 Month": "6 months",
    "12 Month": "12 months",
};
export const DATACENTER_API_IDS = {
    poland: "12",
    netherlands: "17",
    germany: "19",
    usa: "21",
};
export const ALL_DATACENTER_API_IDS = Object.values(DATACENTER_API_IDS).join(",");
export const API_ID_TO_DATACENTER = Object.fromEntries(Object.entries(DATACENTER_API_IDS).map(([datacenterId, apiId]) => [
    apiId,
    datacenterId,
]));
