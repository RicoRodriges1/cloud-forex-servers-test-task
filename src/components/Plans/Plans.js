import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { PricingCard } from "@/components/PricingCard";
import styles from "@/styles/Plans.module.scss";
import { buildPlans } from "@/utils/buildPlans";
import { PLANS } from "./plans.data";
export default function Plans({ datacenter, period, tariffs, status, onRetry, }) {
    const plans = useMemo(() => buildPlans({
        staticPlans: PLANS,
        apiTariffs: tariffs?.[datacenter],
        period,
        status,
    }), [datacenter, period, tariffs, status]);
    const [selectedSpecs, setSelectedSpecs] = useState(() => Object.fromEntries(PLANS.map((plan) => [plan.title, plan.specs])));
    if (status === "error") {
        return (_jsx("section", { className: styles.plans, "aria-label": "Forex VPS pricing plans", children: _jsxs("div", { className: styles.plans__error, role: "alert", children: [_jsx("p", { className: styles.plans__errorTitle, children: "Unable to fetch pricing plans" }), _jsx("p", { className: styles.plans__errorText, children: "Failed to load pricing. Please check your connection and try again." }), _jsx("button", { type: "button", className: styles.plans__errorButton, onClick: onRetry, children: "Try again" })] }) }));
    }
    return (_jsx("section", { className: styles.plans, "aria-label": "Forex VPS pricing plans", children: _jsx("ul", { className: styles.plans__list, "aria-busy": status === "loading", children: plans.map((plan) => (_jsx("li", { className: styles.plans__item, children: _jsx(PricingCard, { ...plan, specs: selectedSpecs[plan.title] ?? plan.specs, onBuy: () => {
                        console.info(`Buy plan: ${plan.title}`);
                    }, onMenuOptionSelect: (option) => {
                        setSelectedSpecs((current) => ({
                            ...current,
                            [plan.title]: option.specs,
                        }));
                    } }) }, plan.title))) }) }));
}
