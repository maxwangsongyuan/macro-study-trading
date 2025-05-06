// Centralized data for all indicators
const allIndicators = [
    // Section B: 市场即时反应 (1-3天)
    { sectionTitle: "市场即时反应 (1-3天)", nameZh: "美股波动率指数（VIX）", code: "CAPITALCOM:VIX", meaning: "衡量市场恐慌情绪，越高越恐慌", idBase: "vix" },
    { sectionTitle: "市场即时反应 (1-3天)", nameZh: "债券市场波动率指数（MOVE）", code: "TVC:MOVE", meaning: "衡量债券市场的不确定性，越高越不稳定", idBase: "move" },
    { sectionTitle: "市场即时反应 (1-3天)", nameZh: "Baa 企业债与 10 年期国债利差", code: "FRED:BAA10Y", meaning: "反映中等风险企业借钱的风险溢价，越高说明风险越大", idBase: "baa10y" },
    { sectionTitle: "市场即时反应 (1-3天)", nameZh: "ICE BofA 高收益公司债指数", code: "FRED:BAMLH0A0HYM2", meaning: "追踪垃圾债券表现，反映高风险公司的健康状况", idBase: "hyoas" },
    { sectionTitle: "市场即时反应 (1-3天)", nameZh: "10 年与 2 年美债收益率利差（倒挂）", code: "FRED:T10Y2Y", meaning: "预测经济衰退的信号，负数（倒挂）通常预示衰退风险", idBase: "t10y2y" },
    { sectionTitle: "市场即时反应 (1-3天)", nameZh: "标普 500 指数（美元）", code: "FOREXCOM:SPXUSD", meaning: "代表美国大盘股整体表现，看股市好不好", idBase: "spxusd" },
    { sectionTitle: "市场即时反应 (1-3天)", nameZh: "标普等权 ETF / SPY（市场广度）", code: "RSP/SPY", meaning: "看上涨的股票是少数大公司还是多数公司，衡量市场健康度", idBase: "rspspy" },
    { sectionTitle: "市场即时反应 (1-3天)", nameZh: "美股涨跌家数差（Advance-Decline Line）", code: "USI:ADD", meaning: "看上涨的股票多还是下跌的股票多，衡量市场内部力量", idBase: "add" },
    { sectionTitle: "市场即时反应 (1-3天)", nameZh: "美元指数（DXY）", code: "INDEX:DXY", meaning: "衡量美元相对于其他主要货币的强弱", idBase: "dxy" },
    { sectionTitle: "市场即时反应 (1-3天)", nameZh: "美国新屋销售", code: "ECONOMICS:USEHS", meaning: "反映房地产市场的活跃程度和买家信心", idBase: "usehs" },
    { sectionTitle: "市场即时反应 (1-3天)", nameZh: "房价中位数", code: "FRED:MSPUS", meaning: "看房子价格的总体水平和变化趋势", idBase: "mspus" },
    { sectionTitle: "市场即时反应 (1-3天)", nameZh: "房屋建筑商 ETF（XHB）", code: "AMEX:XHB", meaning: "追踪盖房子公司的股票表现，预示未来房市走向", idBase: "xhb" },
    { sectionTitle: "市场即时反应 (1-3天)", nameZh: "行业生产者价格指数：建筑材料和供应经销商", code: "FRED:PCU44414441", meaning: "衡量盖房子所需材料的价格变化，影响建筑成本", idBase: "pcu4441" },
    { sectionTitle: "市场即时反应 (1-3天)", nameZh: "富国银行", code: "NYSE:WFC", meaning: "代表大型银行（尤其房贷相关）的状况", idBase: "wfc" },
    { sectionTitle: "市场即时反应 (1-3天)", nameZh: "PennyMac 金融服务公司", code: "NYSE:PFSI", meaning: "代表金融服务公司（尤其房贷相关）的状况", idBase: "pfsi" },
    { sectionTitle: "市场即时反应 (1-3天)", nameZh: "美国航空公司 ETF（JETS）", code: "AMEX:JETS", meaning: "反映航空旅游业的景气度", idBase: "jets" },
    { sectionTitle: "市场即时反应 (1-3天)", nameZh: "希尔顿酒店", code: "NYSE:HLT", meaning: "反映酒店住宿业的景气度", idBase: "hlt" },
    { sectionTitle: "市场即时反应 (1-3天)", nameZh: "麦当劳公司", code: "NYSE:MCD", meaning: "反映快餐和大众消费的状况", idBase: "mcd" },
    { sectionTitle: "市场即时反应 (1-3天)", nameZh: "铜金比（增长 vs 避险）", code: "CAPITALCOM:COPPER/CAPITALCOM:GOLD", meaning: "铜代表工业增长，黄金代表避险。比率上升通常预示经济看好", idBase: "coppergold" },
    { sectionTitle: "市场即时反应 (1-3天)", nameZh: "布伦特原油", code: "TVC:UKOIL", meaning: "全球重要的原油价格，影响通胀和能源行业", idBase: "ukoil" },
    { sectionTitle: "市场即时反应 (1-3天)", nameZh: "芝加哥小麦期货", code: "CBOT:ZW1!", meaning: "重要的粮食价格，影响食品成本和通胀", idBase: "zw1" },
    { sectionTitle: "市场即时反应 (1-3天)", nameZh: "布伦特 - WTI 原油价差", code: "TVC:UKOIL-TVC:USOIL", meaning: "两种主要原油的价格差异，反映地区供需和运输成本", idBase: "ukoilusoil" },
    { sectionTitle: "市场即时反应 (1-3天)", nameZh: "PPI 总指数（全部商品）", code: "FRED:PPIACO", meaning: "衡量生产者（工厂）购买商品/服务的价格变化，预示未来消费物价", idBase: "ppiaco" },

    // Section D: 初期实质影响 & 政策落地 (数周-数月)
    { sectionTitle: "初期实质影响 & 政策落地 (数周-数月)", nameZh: "美元兑日元汇率", code: "FX:USDJPY", meaning: "衡量美元和日元的兑换比率，受利率和风险偏好影响", idBase: "usdjpy" },
    { sectionTitle: "初期实质影响 & 政策落地 (数周-数月)", nameZh: "有效联邦基金利率", code: "FRED:EFFR", meaning: "银行间互相借钱的实际利率，反映美联储的基准利率水平", idBase: "effr" },
    { sectionTitle: "初期实质影响 & 政策落地 (数周-数月)", nameZh: "美联储总资产负债表", code: "FRED:WALCL", meaning: "美联储持有多少资产（国债等），反映其放水/收水力度", idBase: "walcl" },
    { sectionTitle: "初期实质影响 & 政策落地 (数周-数月)", nameZh: "逆回购协议未清余额", code: "FRED:RRPONTSYD", meaning: "金融机构存在美联储的短期闲钱，反映市场流动性充裕程度", idBase: "rrpontsyd" },
    { sectionTitle: "初期实质影响 & 政策落地 (数周-数月)", nameZh: "新屋建筑许可", code: "FRED:PERMIT", meaning: "未来准备盖多少新房子，预示房市建设活动", idBase: "permit" },
    { sectionTitle: "初期实质影响 & 政策落地 (数周-数月)", nameZh: "初请失业金人数（四周平均）", code: "FRED:IC4WSA", meaning: "平滑后的每周新增失业人数，看劳动力市场好坏", idBase: "ic4wsa" },
    { sectionTitle: "初期实质影响 & 政策落地 (数周-数月)", nameZh: "密歇根消费者信心指数", code: "FRED:UMCSENT", meaning: "衡量消费者对经济和个人财务状况的信心", idBase: "umcsent" },
    { sectionTitle: "初期实质影响 & 政策落地 (数周-数月)", nameZh: "非农就业总人数", code: "FRED:PAYEMS", meaning: "美国新增了多少工作岗位（不含农业），最重要的经济数据之一", idBase: "payems-d" }, // Unique ID for D
    { sectionTitle: "初期实质影响 & 政策落地 (数周-数月)", nameZh: "美国商业乐观指数", code: "ECONOMICS:USBOI", meaning: "衡量小企业主对未来经营状况的信心", idBase: "usboi" },
    { sectionTitle: "初期实质影响 & 政策落地 (数周-数月)", nameZh: "商业和工业贷款余额", code: "FRED:BUSLOANS", meaning: "看企业向银行借了多少钱搞经营，反映企业扩张意愿", idBase: "busloans-d" }, // Unique ID for D
    { sectionTitle: "初期实质影响 & 政策落地 (数周-数月)", nameZh: "银行总贷款和租赁", code: "FRED:TOTALSL", meaning: "银行总共放出去了多少贷款，反映整体信贷松紧", idBase: "totalsl" },
    { sectionTitle: "初期实质影响 & 政策落地 (数周-数月)", nameZh: "工业生产指数", code: "FRED:INDPRO", meaning: "衡量工厂、矿山等工业部门的产出情况", idBase: "indpro" },
    { sectionTitle: "初期实质影响 & 政策落地 (数周-数月)", nameZh: "制造业新订单", code: "ECONOMICS:USMNO", meaning: "工厂收到了多少新订单，预示未来生产情况", idBase: "usmno" },
    { sectionTitle: "初期实质影响 & 政策落地 (数周-数月)", nameZh: "库存销售比", code: "FRED:ISRATIO", meaning: "库存相对于销售额的比例，太高可能说明卖不动了", idBase: "isratio-d" }, // Unique ID for D

    // Section E: 常见后续连锁 (数月-数季)
    { sectionTitle: "常见后续连锁 (数月-数季)", nameZh: "广义货币供应量 M2", code: "FRED:M2SL", meaning: "衡量市场上有多少钱（现金、存款等），影响通胀和经济活动", idBase: "m2sl" },
    { sectionTitle: "常见后续连锁 (数月-数季)", nameZh: "实际国内生产总值（GDP）", code: "FRED:GDPC1", meaning: "国家整体经济产出的总价值（去除通胀影响），衡量经济增长", idBase: "gdpc1" },
    { sectionTitle: "常见后续连锁 (数月-数季)", nameZh: "消费者物价指数（CPI）", code: "FRED:CPIAUCSL", meaning: "衡量普通消费者购买一篮子商品/服务的价格变化，即通货膨胀率", idBase: "cpiaucsl" },
    { sectionTitle: "常见后续连锁 (数月-数季)", nameZh: "单位劳动成本（非农）", code: "FRED:ULCNFB", meaning: "生产一个单位产品需要多少人工成本，影响企业定价和通胀", idBase: "ulcnfb" },
    { sectionTitle: "常见后续连锁 (数月-数季)", nameZh: "失业率", code: "FRED:UNRATE", meaning: "想工作但找不到工作的人占总劳动力的比例", idBase: "unrate" },
    { sectionTitle: "常见后续连锁 (数月-数季)", nameZh: "平均失业时间", code: "FRED:UEMPMEAN", meaning: "失业的人平均找了多久工作，时间越长说明就业越难", idBase: "uempmean" },
    { sectionTitle: "常见后续连锁 (数月-数季)", nameZh: "家庭债务偿还比率", code: "FRED:TDSP", meaning: "家庭收入中用于还债（房贷、车贷等）的比例，越高负担越重", idBase: "tdsp" },
    { sectionTitle: "常见后续连锁 (数月-数季)", nameZh: "商业银行资产总额", code: "FRED:W875RX1", meaning: "所有商业银行的总资产规模，反映银行体系的大小和健康", idBase: "w875rx1" },
    { sectionTitle: "常见后续连锁 (数月-数季)", nameZh: "非农就业总人数", code: "FRED:PAYEMS", meaning: "美国新增了多少工作岗位（不含农业），最重要的经济数据之一", idBase: "payems-e" }, // Unique ID for E
    { sectionTitle: "常见后续连锁 (数月-数季)", nameZh: "商业和工业贷款余额", code: "FRED:BUSLOANS", meaning: "看企业向银行借了多少钱搞经营，反映企业扩张意愿", idBase: "busloans-e" }, // Unique ID for E
    { sectionTitle: "常见后续连锁 (数月-数季)", nameZh: "库存销售比", code: "FRED:ISRATIO", meaning: "库存相对于销售额的比例，太高可能说明卖不动了", idBase: "isratio-e" }  // Unique ID for E
];

/**
 * Renders the indicators for a specific section into the target container.
 * @param {string} sectionTitle - The full Chinese title of the section to render.
 * @param {string} targetContainerId - The ID of the HTML element to render into.
 */
function renderIndicatorSection(sectionTitle, targetContainerId) {
    const container = document.getElementById(targetContainerId);
    if (!container) {
        console.error(`Target container with ID "${targetContainerId}" not found.`);
        return;
    }

    // Filter indicators for the specified section
    const sectionIndicators = allIndicators.filter(indicator => indicator.sectionTitle === sectionTitle);

    if (sectionIndicators.length === 0) {
        container.innerHTML = `<p>No indicators found for section: ${sectionTitle}</p>`;
        return;
    }

    let htmlContent = '';
    const indicatorsToLoad = []; // Store widget info to load after HTML injection

    // Group indicators into rows of 4
    for (let i = 0; i < sectionIndicators.length; i += 4) {
        const rowIndicators = sectionIndicators.slice(i, i + 4);

        // --- Create Chart Row ---
        htmlContent += '<div class="chart-row">\n';
        rowIndicators.forEach(indicator => {
            const widgetId = `tv-widget-${indicator.idBase}`;
            htmlContent += `    <div id="${widgetId}" class="tv-widget"></div>\n`;
            indicatorsToLoad.push({ id: widgetId, code: indicator.code });
        });
        // Add placeholders if the row is not full
        for (let j = rowIndicators.length; j < 4; j++) {
            htmlContent += '    <div></div>'; // Empty div as placeholder
        }
        htmlContent += '</div>\n';

        // --- Create Details Row ---
        htmlContent += '<div class="indicator-details-row">\n';
        rowIndicators.forEach(indicator => {
            htmlContent += `    <div class="indicator-detail-item">\n`;
            htmlContent += `        <h4>${indicator.nameZh}</h4>\n`;
            htmlContent += `        <p><strong>Code:</strong> <code>${indicator.code}</code></p>\n`;
            htmlContent += `        <p><strong>含义:</strong> ${indicator.meaning}</p>\n`;
            htmlContent += `    </div>\n`;
        });
        // Add placeholders if the row is not full
        for (let j = rowIndicators.length; j < 4; j++) {
            htmlContent += '    <div></div>'; // Empty div as placeholder
        }
        htmlContent += '</div>\n';
    }

    // Inject the generated HTML
    container.innerHTML = htmlContent;

    // Load the TradingView widgets after HTML is in the DOM
    // Use a slight delay to ensure the DOM is fully updated
    setTimeout(() => {
        indicatorsToLoad.forEach(widgetInfo => {
            if (typeof loadAdvancedTradingViewWidget === 'function') {
                loadAdvancedTradingViewWidget(widgetInfo.id, widgetInfo.code);
            } else {
                console.error('loadAdvancedTradingViewWidget function is not defined. Make sure tradingview-widget-loader.js is loaded.');
            }
        });
    }, 100); // 100ms delay, adjust if needed
}
