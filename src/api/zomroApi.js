const API_URL = "https://api.zomrodev.online/v1/api/proxy/";
/** @param datacenter Single id or comma-separated ids, e.g. "12" or "12,17,19,21" */
export async function getPriceList(datacenter) {
    const params = new URLSearchParams({
        func: "v2.instances.order.pricelist",
        out: "json",
        lang: "en",
        page: "1",
        page_size: "999",
        datacenter,
    });
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch price list (${response.status})`);
    }
    try {
        return (await response.json());
    }
    catch {
        throw new Error("Invalid price list response");
    }
}
