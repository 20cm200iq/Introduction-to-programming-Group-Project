// ===== Statsbudsjettet 2025 – Interactive Treemap Visualization =====

(function () {
    "use strict";

    // ===== STATE =====
    let displayMode = "nok"; // "nok" | "percent" | "percapita"

    // ===== FORMAT HELPERS =====
    function formatMrd(value) {
        if (value >= 100) return Math.round(value).toLocaleString("nb-NO") + " mrd";
        if (value >= 10) return value.toFixed(1).replace(".", ",") + " mrd";
        return value.toFixed(1).replace(".", ",") + " mrd";
    }

    function formatPercent(value, total) {
        const pct = (value / total) * 100;
        if (pct >= 10) return pct.toFixed(1).replace(".", ",") + "%";
        return pct.toFixed(1).replace(".", ",") + "%";
    }

    function formatPerCapita(valueMrd) {
        const perPerson = (valueMrd * 1e9) / POPULATION;
        if (perPerson >= 10000) {
            return Math.round(perPerson).toLocaleString("nb-NO") + " kr";
        }
        return Math.round(perPerson).toLocaleString("nb-NO") + " kr";
    }

    function formatValue(value, total) {
        switch (displayMode) {
            case "percent": return formatPercent(value, total);
            case "percapita": return formatPerCapita(value);
            default: return formatMrd(value);
        }
    }

    function formatFullValue(value) {
        return value.toFixed(1).replace(".", ",") + " mrd kr";
    }

    // ===== COLOR HELPERS =====
    function shadeColor(color, index, total) {
        const d3color = d3.color(color);
        if (!d3color) return color;
        const lightness = 0.05 + (index / Math.max(total - 1, 1)) * 0.35;
        return d3.rgb(
            d3color.r + (255 - d3color.r) * lightness,
            d3color.g + (255 - d3color.g) * lightness,
            d3color.b + (255 - d3color.b) * lightness
        ).formatHex();
    }

    function getChildColors(parentColor, count) {
        const colors = [];
        for (let i = 0; i < count; i++) {
            colors.push(shadeColor(parentColor, i, count));
        }
        return colors;
    }

    // Income palette (greens)
    const incomeBaseColors = ["#1b7a3d", "#1a6b35", "#3da362", "#5bb97d", "#7dcf98"];
    // Expense palette (blues/indigos)
    const expenseBaseColors = [
        "#3a4f94", "#4361a5", "#5171b0", "#4a6da8", "#5a7ec2",
        "#6b8fd0", "#7c9fdd", "#8dafea", "#6382be", "#8097c8",
        "#9aadda", "#7089c0", "#8fa5d2", "#a4b8e0", "#b9cbee"
    ];

    // ===== TREEMAP RENDERING =====
    function buildTreemap(container, data, side) {
        const el = document.getElementById(container);
        el.innerHTML = "";

        const width = el.clientWidth;
        const height = el.clientHeight;

        if (width === 0 || height === 0) return;

        const children = data.children;
        const total = data.total;

        // Build hierarchy for D3
        const root = d3.hierarchy({ name: "root", children: children.map(c => ({ ...c })) })
            .sum(d => d.children ? 0 : d.value)
            .each(d => { if (d.data.value && !d.data.children) d.value = d.data.value; })
            .sort((a, b) => b.value - a.value);

        // Recalculate with explicit values for parent nodes
        const rootWithValues = d3.hierarchy({
            name: "root",
            children: children.map(c => ({ name: c.name, value: c.value }))
        })
            .sum(d => d.value || 0)
            .sort((a, b) => b.value - a.value);

        d3.treemap()
            .size([width, height])
            .padding(2)
            .round(true)(rootWithValues);

        const baseColors = side === "income" ? incomeBaseColors : expenseBaseColors;

        rootWithValues.leaves().forEach((leaf, i) => {
            const originalData = children.find(c => c.name === leaf.data.name) || children[i];
            const cellW = leaf.x1 - leaf.x0;
            const cellH = leaf.y1 - leaf.y0;

            const cell = document.createElement("div");
            cell.className = "treemap-cell";
            if (cellW < 60 || cellH < 40) cell.classList.add("cell-tiny");
            else if (cellW < 100 || cellH < 55) cell.classList.add("cell-small");

            const color = originalData.color || baseColors[i % baseColors.length];
            cell.style.left = leaf.x0 + "px";
            cell.style.top = leaf.y0 + "px";
            cell.style.width = cellW + "px";
            cell.style.height = cellH + "px";
            cell.style.backgroundColor = color;

            const hasChildren = originalData.children && originalData.children.length > 0;

            const iconHtml = originalData.icon ? `<div class="cell-icon">${originalData.icon}</div>` : '';
            const hasChanges = !!originalData.endringer;

            cell.innerHTML = `
                <div class="cell-content">
                    <div>
                        ${iconHtml}
                        <div class="cell-name">${originalData.name}</div>
                    </div>
                    <div class="cell-value">${formatValue(originalData.value, total)}</div>
                    ${hasChildren || hasChanges ? '<div class="cell-expand">Utforsk &rarr;</div>' : ''}
                </div>
            `;

            // Tooltip events
            cell.addEventListener("mouseenter", (e) => showTooltip(e, originalData, total, side));
            cell.addEventListener("mousemove", moveTooltip);
            cell.addEventListener("mouseleave", hideTooltip);

            // Click to drill down
            cell.addEventListener("click", () => {
                if (hasChildren || hasChanges) {
                    openDetail(originalData, total, side, color);
                }
            });

            el.appendChild(cell);
        });
    }

    // ===== TOOLTIP =====
    const tooltip = document.getElementById("tooltip");

    function showTooltip(e, data, total, side) {
        const hasChildren = data.children && data.children.length > 0;
        const hasChanges = !!data.endringer;
        const clickable = hasChildren || hasChanges;
        const iconPrefix = data.icon ? data.icon + ' ' : '';
        tooltip.innerHTML = `
            <div class="tooltip-name">${iconPrefix}${data.name}</div>
            <div class="tooltip-value">
                ${formatFullValue(data.value)} · ${formatPercent(data.value, total)} av ${side === "income" ? "inntektene" : "utgiftene"}
                <br>${formatPerCapita(data.value)} per innbygger
            </div>
            ${data.description ? `<div class="tooltip-desc">${data.description}</div>` : ""}
            ${clickable ? '<div class="tooltip-hint">Klikk for \u00e5 utforske' + (hasChanges ? ' endringer og ' : '') + (hasChildren ? 'underkategorier' : '') + '</div>' : ""}
        `;
        tooltip.classList.add("visible");
        moveTooltip(e);
    }

    function moveTooltip(e) {
        const pad = 12;
        let x = e.clientX + pad;
        let y = e.clientY + pad;
        const rect = tooltip.getBoundingClientRect();
        if (x + rect.width > window.innerWidth - pad) x = e.clientX - rect.width - pad;
        if (y + rect.height > window.innerHeight - pad) y = e.clientY - rect.height - pad;
        tooltip.style.left = x + "px";
        tooltip.style.top = y + "px";
    }

    function hideTooltip() {
        tooltip.classList.remove("visible");
    }

    // ===== DETAIL PANEL (Layer 1 drill-down) =====
    const overlay = document.getElementById("detail-overlay");
    const detailPanel = document.getElementById("detail-panel");

    function openDetail(data, parentTotal, side, parentColor) {
        hideTooltip();

        const titleEl = document.getElementById("detail-title");
        titleEl.innerHTML = (data.icon ? `<span class="detail-icon">${data.icon}</span>` : '') + data.name;
        document.getElementById("detail-amount").textContent = formatFullValue(data.value);
        document.getElementById("detail-description").textContent = data.description || "";

        const detailTreemap = document.getElementById("detail-treemap");
        const detailList = document.getElementById("detail-list");
        const detailChanges = document.getElementById("detail-changes");
        detailTreemap.innerHTML = "";
        detailList.innerHTML = "";
        detailChanges.innerHTML = "";
        detailTreemap.style.display = "";
        detailChanges.style.display = "none";

        // Render "De viktigste endringene" if available
        if (data.endringer) {
            detailChanges.style.display = "block";
            const e = data.endringer;
            detailChanges.innerHTML = `
                <div class="changes-header">
                    <span class="changes-title">De viktigste endringene</span>
                    <span class="changes-badge">${e.verdi}</span>
                </div>
                <ul class="changes-list">
                    ${e.punkter.map(p => `<li>${p}</li>`).join('')}
                </ul>
            `;
        }

        if (data.children && data.children.length > 0) {
            const children = [...data.children].sort((a, b) => b.value - a.value);
            const childTotal = data.value;
            const colors = getChildColors(parentColor, children.length);

            // Build mini treemap
            const miniRoot = d3.hierarchy({
                name: "root",
                children: children.map(c => ({ name: c.name, value: c.value }))
            })
                .sum(d => d.value || 0)
                .sort((a, b) => b.value - a.value);

            // Wait for panel to be visible before measuring
            overlay.classList.add("visible");

            requestAnimationFrame(() => {
                const tmWidth = detailTreemap.clientWidth;
                const tmHeight = detailTreemap.clientHeight;

                if (tmWidth > 0 && tmHeight > 0) {
                    d3.treemap()
                        .size([tmWidth, tmHeight])
                        .padding(2)
                        .round(true)(miniRoot);

                    miniRoot.leaves().forEach((leaf, i) => {
                        const childData = children.find(c => c.name === leaf.data.name) || children[i];
                        const cellW = leaf.x1 - leaf.x0;
                        const cellH = leaf.y1 - leaf.y0;

                        const cell = document.createElement("div");
                        cell.className = "treemap-cell";
                        if (cellW < 50 || cellH < 35) cell.classList.add("cell-tiny");
                        else if (cellW < 90 || cellH < 50) cell.classList.add("cell-small");

                        cell.style.left = leaf.x0 + "px";
                        cell.style.top = leaf.y0 + "px";
                        cell.style.width = cellW + "px";
                        cell.style.height = cellH + "px";
                        cell.style.backgroundColor = colors[i];

                        cell.innerHTML = `
                            <div class="cell-content">
                                <div class="cell-name">${childData.name}</div>
                                <div class="cell-value">${formatValue(childData.value, childTotal)}</div>
                            </div>
                        `;

                        cell.addEventListener("mouseenter", (e) => showTooltip(e, childData, childTotal, side));
                        cell.addEventListener("mousemove", moveTooltip);
                        cell.addEventListener("mouseleave", hideTooltip);

                        detailTreemap.appendChild(cell);
                    });
                }

                // Build list view
                const maxValue = Math.max(...children.map(c => c.value));
                children.forEach((child, i) => {
                    const pct = (child.value / childTotal) * 100;
                    const barWidth = (child.value / maxValue) * 100;
                    const item = document.createElement("div");
                    item.className = "detail-item";
                    item.innerHTML = `
                        <div class="detail-item-color" style="background:${colors[i]}"></div>
                        <div class="detail-item-info">
                            <div class="detail-item-name">${child.name}</div>
                            ${child.description ? `<div class="detail-item-desc">${child.description}</div>` : ""}
                        </div>
                        <div>
                            <div class="detail-item-value">${formatValue(child.value, childTotal)}</div>
                            <div class="detail-item-pct">${pct.toFixed(1).replace(".", ",")}%</div>
                        </div>
                        <div class="detail-item-bar-bg">
                            <div class="detail-item-bar" style="width:${barWidth}%;background:${colors[i]}"></div>
                        </div>
                    `;
                    detailList.appendChild(item);
                });
            });
        } else {
            detailTreemap.style.display = "none";
            overlay.classList.add("visible");
        }

        // If no children, still show the panel for endringer
        if (!data.children || data.children.length === 0) {
            detailTreemap.style.display = "none";
        }

        // Update breadcrumbs
        updateBreadcrumbs(side === "income" ? "Inntekter" : "Utgifter", data.name);
    }

    function closeDetail() {
        overlay.classList.remove("visible");
        document.getElementById("detail-treemap").style.display = "";
        updateBreadcrumbs();
    }

    document.getElementById("detail-close").addEventListener("click", closeDetail);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeDetail();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeDetail();
    });

    // ===== BREADCRUMBS =====
    function updateBreadcrumbs(category, subcategory) {
        const bc = document.getElementById("breadcrumbs");
        if (!category) {
            bc.innerHTML = '<span class="crumb active" data-path="root">Hele budsjettet</span>';
            return;
        }
        bc.innerHTML = `
            <span class="crumb" data-path="root">Hele budsjettet</span>
            <span class="separator">›</span>
            <span class="crumb ${subcategory ? "" : "active"}" data-path="category">${category}</span>
            ${subcategory ? `<span class="separator">›</span><span class="crumb active">${subcategory}</span>` : ""}
        `;

        bc.querySelector('[data-path="root"]').addEventListener("click", () => {
            closeDetail();
        });
    }

    // ===== DISPLAY MODE TOGGLE =====
    function setDisplayMode(mode) {
        displayMode = mode;
        document.querySelectorAll(".toggle-btn").forEach(btn => {
            btn.classList.toggle("active", btn.dataset.mode === mode);
        });
        renderAll();
        updateSummaryBar();
    }

    document.querySelectorAll(".toggle-btn").forEach(btn => {
        btn.addEventListener("click", () => setDisplayMode(btn.dataset.mode));
    });

    // ===== SUMMARY BAR UPDATE =====
    function updateSummaryBar() {
        const inc = keyFigures.totalInntekter;
        const exp = keyFigures.totalUtgifter;
        const bal = inc - exp;

        document.getElementById("summary-income").textContent =
            displayMode === "percapita" ? formatPerCapita(inc) : formatMrd(inc) + " kr";
        document.getElementById("summary-expense").textContent =
            displayMode === "percapita" ? formatPerCapita(exp) : formatMrd(exp) + " kr";

        const balEl = document.getElementById("summary-balance");
        const prefix = bal >= 0 ? "+" : "";
        balEl.textContent = displayMode === "percapita"
            ? prefix + formatPerCapita(bal)
            : prefix + formatMrd(bal) + " kr";
        balEl.className = "figure-value " + (bal >= 0 ? "positive" : "negative");

        document.getElementById("income-total").textContent =
            displayMode === "percapita" ? formatPerCapita(inc) : formatMrd(inc) + " kr";
        document.getElementById("expense-total").textContent =
            displayMode === "percapita" ? formatPerCapita(exp) : formatMrd(exp) + " kr";
    }

    // ===== RENDER =====
    function renderAll() {
        buildTreemap("treemap-income", budgetData.inntekter, "income");
        buildTreemap("treemap-expense", budgetData.utgifter, "expense");
    }

    // ===== INIT =====
    function init() {
        renderAll();
        updateSummaryBar();

        // Re-render on window resize (debounced)
        let resizeTimeout;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                renderAll();
                updateSummaryBar();
            }, 200);
        });
    }

    // Wait for DOM + D3
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
