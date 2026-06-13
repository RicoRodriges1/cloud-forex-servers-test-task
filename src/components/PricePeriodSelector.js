import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Calendar from "@/assets/calendar.svg?react";
import Arrow from "@/assets/arrow.svg?react";
import { PRICE_PERIODS } from "@/types/pricing";
export default function PricePeriodSelector({ value, onChange, }) {
    const [open, setOpen] = useState(false);
    const handleSelect = (period) => {
        onChange(period);
        setOpen(false);
    };
    return (_jsxs("div", { className: "selector-container", children: [_jsx("p", { children: "BILLING PERIOD" }), _jsxs("div", { className: "price-period-selector", onClick: () => setOpen((current) => !current), children: [_jsxs("div", { className: "price-period-selector__item", children: [_jsx(Calendar, {}), value] }), _jsx(Arrow, { className: `price-period-selector__arrow ${open ? "is-open" : ""}` })] }), open && (_jsx("div", { className: "price-period-selector__dropdown", children: PRICE_PERIODS.map((item) => (_jsx("div", { className: "price-period-selector__option", onClick: () => handleSelect(item), children: item }, item))) }))] }));
}
