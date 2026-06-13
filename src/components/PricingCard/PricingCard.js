import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import CartIcon from "@/assets/cart.svg?react";
import YellowTick from "@/assets/yellow-tick.svg?react";
import HelpIcon from "@/assets/help.svg?react";
import MenuIcon from "@/assets/menu.svg?react";
import TerminalIcon from "@/assets/terminal-icon.svg?react";
import TwoTerminals from "@/assets/two-terminals.svg?react";
import ThreeTerminals from "@/assets/three-terminals.svg?react";
import FourTerminals from "@/assets/four-terminals.svg?react";
import SixTerminals from "@/assets/six-terminals.svg?react";
import styles from "@/styles/PricingCard.module.scss";
import { buildSpecDetails } from "@/utils/buildSpecDetails";
import { formatSpecs } from "@/utils/formatSpecs";
import slugify from "@/utils/slugify";
export default function PricingCard({ id, title, price, priceState = "ready", currency = "€", period = "month", specs, terminalsCount, features, tags, featuresLabel = "ВОЗМОЖНОСТИ", tagsLabel = "ПОДХОДИТ ДЛЯ", buyLabel = "КУПИТЬ", terminalsLabel = "Terminals", specDetails, onTerminalsHelpClick, isBestChoice = false, bestChoiceLabel = "Best choice", className, }) {
    const rootClassName = [styles.pricingCard, className].filter(Boolean).join(" ");
    const featuresId = `${slugify(title)}-features`;
    const tagsId = `${slugify(title)}-tags`;
    const actionButtonClassName = styles.pricingCard__actionButton;
    const detailRows = specDetails ?? buildSpecDetails(specs, terminalsCount);
    const isPriceLoading = priceState === "loading";
    const isPriceReady = priceState === "ready" && price != null && price !== "";
    return (_jsxs("div", { className: rootClassName, children: [isBestChoice && (_jsx("span", { className: styles.pricingCard__badge, children: bestChoiceLabel })), !isBestChoice && _jsx("span", { className: styles.pricingCard__shadowLight }), _jsxs("div", { className: styles.pricingCard__header, children: [_jsxs("div", { className: styles.pricingCard__heading, children: [_jsxs("div", { className: styles.pricingCard__titleGroup, children: [_jsx("h2", { className: styles.pricingCard__title, children: title }), _jsxs("p", { className: styles.pricingCard__price, "aria-busy": isPriceLoading, "aria-live": "polite", children: [isPriceLoading ? (_jsx("span", { className: styles.pricingCard__priceSkeleton, "aria-hidden": "true" })) : isPriceReady ? (_jsxs("span", { className: [
                                                    styles.pricingCard__priceValue,
                                                    styles.pricingCard__priceValue_visible,
                                                ].join(" "), children: [currency, " ", price] })) : (_jsx("span", { className: styles.pricingCard__priceUnavailable, children: "\u2014" })), _jsx("span", { className: styles.pricingCard__pricePeriod, children: period })] })] }), _jsx("div", { className: styles.pricingCard__terminalStack, children: terminalsCount == 2 && _jsx(TwoTerminals, {})
                                    || terminalsCount == 3 && _jsx(ThreeTerminals, {})
                                    || terminalsCount == 4 && _jsx(FourTerminals, {})
                                    || terminalsCount == 6 && _jsx(SixTerminals, {}) })] }), _jsxs("div", { className: styles.pricingCard__specBar, children: [_jsx("span", { className: styles.pricingCard__specText, children: formatSpecs(specs) }), _jsxs("div", { className: styles.pricingCard__menu, children: [_jsx("button", { type: "button", className: styles.pricingCard__menuButton, children: _jsx(MenuIcon, {}) }), _jsx("div", { className: styles.pricingCard__menuDropdown, id: `${slugify(title)}-spec-details`, role: "tooltip", children: _jsx("dl", { className: styles.pricingCard__menuDetails, children: detailRows.map((detail) => (_jsxs("div", { className: styles.pricingCard__menuDetailRow, children: [_jsx("dt", { className: styles.pricingCard__menuDetailLabel, children: detail.label }), _jsx("dd", { className: styles.pricingCard__menuDetailValue, children: detail.value })] }, detail.label))) }) })] })] })] }), _jsx("dl", { className: styles.pricingCard__meta, children: _jsxs("div", { className: styles.pricingCard__metaRow, children: [_jsxs("dt", { className: styles.pricingCard__metaLabel, children: [_jsx(TerminalIcon, { className: styles.pricingCard__metaIcon }), terminalsLabel] }), _jsxs("dd", { className: styles.pricingCard__metaValue, children: [_jsx("span", { children: terminalsCount }), _jsx("button", { type: "button", className: styles.pricingCard__helpButton, onClick: onTerminalsHelpClick, children: _jsx(HelpIcon, {}) })] })] }) }), _jsxs("section", { className: styles.pricingCard__section, children: [_jsx("h3", { className: styles.pricingCard__sectionTitle, id: featuresId, children: featuresLabel }), _jsx("ul", { className: styles.pricingCard__featureList, children: features.map((feature) => (_jsxs("li", { className: styles.pricingCard__featureItem, children: [_jsx(YellowTick, { className: styles.pricingCard__featureIcon }), _jsx("span", { children: feature })] }, feature))) })] }), _jsxs("section", { className: styles.pricingCard__section, children: [_jsx("h3", { className: styles.pricingCard__sectionTitle, id: tagsId, children: tagsLabel }), _jsx("ul", { className: styles.pricingCard__tagList, children: tags.map((tag) => (_jsx("li", { className: styles.pricingCard__tag, children: tag }, tag))) })] }), _jsxs("a", { href: id ? `/buy${id}` : "#", className: styles.pricingCard__actions, children: [_jsx("button", { type: "button", className: [actionButtonClassName, styles.pricingCard__buyButton].join(" "), disabled: isPriceLoading, children: buyLabel }), _jsx("button", { type: "button", className: [actionButtonClassName, styles.pricingCard__cartButton].join(" "), disabled: isPriceLoading, children: _jsx(CartIcon, {}) })] })] }));
}
