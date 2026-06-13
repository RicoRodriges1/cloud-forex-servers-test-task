import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Poland from "@/assets/poland.svg?react";
import Netherlands from "@/assets/netherlands.svg?react";
import Germany from "@/assets/germany.svg?react";
import Usa from "@/assets/usa.svg?react";
const items = [
    { id: "poland", label: "Poland", Icon: Poland },
    { id: "netherlands", label: "Netherlands", Icon: Netherlands },
    { id: "germany", label: "Germany", Icon: Germany },
    { id: "usa", label: "USA", Icon: Usa },
];
export default function DataCenterSelector({ value, onChange, }) {
    return (_jsxs("div", { className: "selector-container", children: [_jsx("p", { children: "DATA CENTER" }), _jsx("div", { className: "data-center-selector", children: items.map(({ id, label, Icon }) => (_jsxs("button", { type: "button", onClick: () => onChange(id), className: `data-center-selector__item ${value === id ? "data-center-selector__item--active" : ""}`, children: [_jsx(Icon, { width: 16, height: 16 }), label] }, id))) })] }));
}
