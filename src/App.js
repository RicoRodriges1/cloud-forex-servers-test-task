import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import DataCenterSelector from "@/components/DataCenterSelector";
import Plans from "@/components/Plans/Plans";
import PricePeriodSelector from "@/components/PricePeriodSelector";
import { useTariffs } from "@/hooks/useTariffs";
export default function App() {
    const [datacenter, setDatacenter] = useState("poland");
    const [period, setPeriod] = useState("1 Month");
    const { data, status, refetch } = useTariffs();
    return (_jsx("main", { className: "app", children: _jsxs("div", { className: "container", children: [_jsxs("div", { className: "header", children: [_jsx("h1", { children: "Buy Forex VPS plans" }), _jsxs("div", { className: "selectors", children: [_jsx(DataCenterSelector, { value: datacenter, onChange: setDatacenter }), _jsx(PricePeriodSelector, { value: period, onChange: setPeriod })] })] }), _jsx(Plans, { datacenter: datacenter, period: period, tariffs: data, status: status, onRetry: refetch })] }) }));
}
