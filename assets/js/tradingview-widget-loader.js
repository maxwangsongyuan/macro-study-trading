/**
 * Loads an advanced TradingView widget into the specified container.
 * @param {string} containerId - The ID of the HTML element to load the widget into.
 * @param {string} symbol - The TradingView symbol string (e.g., 'FX:EURUSD', 'INDEX:DXY').
 */
function loadAdvancedTradingViewWidget(containerId, symbol) {
    if (typeof TradingView === 'undefined') {
        console.error('TradingView library not loaded. Make sure tv.js is included before this script.');
        return;
    }
    if (!document.getElementById(containerId)) {
        console.error(`Container element with ID "${containerId}" not found.`);
        return;
    }
    if (!symbol) {
        console.error('Symbol parameter is required.');
        return;
    }

    new TradingView.widget({
        "container_id": containerId, // Use the passed container ID
        "autosize": true,
        "symbol": symbol, // Use the passed symbol
        "interval": "D",
        "range": "YTD",
        "timezone": "America/New_York",
        "theme": "light",
        "style": "9", // Advanced chart style
        "locale": "en",
        "withdateranges": true,
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        "details": false,
        "hotlist": false,
        "show_popup_button": true,
        "popup_width": "1000",
        "popup_height": "650",
        "support_host": "https://www.tradingview.com"
    });
}

/**
 * Loads a TradingView Market Overview widget into the specified container.
 * @param {string} containerId - The ID of the HTML element to load the widget into.
 * @param {string} categoryTitle - The title for the widget tab.
 * @param {Array<Object>} symbols - An array of symbol objects (e.g., [{s: 'FX:EURUSD', d: 'Euro/Dollar'}]).
 * @param {string} height - The height for the widget container (e.g., '700px'). Defaults to '700px'.
 * @param {string} width - The width for the widget container (e.g., '100%'). Defaults to '100%'.
 */
function loadMarketOverviewWidget(containerId, categoryTitle, symbols, height = '700px', width = '100%') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container element with ID "${containerId}" not found.`);
        return;
    }
    if (!categoryTitle || !symbols || symbols.length === 0) {
        console.error('Category title and symbols array are required for Market Overview widget.');
        return;
    }

    // Set container height and width - important for the widget to render correctly
    container.style.height = height;
    container.style.width = width;
    container.innerHTML = ''; // Clear previous content

    // Create the inner div TradingView widget script expects
    const widgetInnerDiv = document.createElement('div');
    widgetInnerDiv.className = 'tradingview-widget-container__widget';
    widgetInnerDiv.style.height = 'calc(100% - 32px)'; // Adjust height if copyright is inside
    widgetInnerDiv.style.width = '100%';
    container.appendChild(widgetInnerDiv);

    // Construct the configuration object
    const widgetConfig = {
        "colorTheme": "light",
        "dateRange": "12M",
        "showChart": true,
        "locale": "en",
        "largeChartUrl": "",
        "isTransparent": false,
        "showSymbolLogo": true,
        "showFloatingTooltip": false,
        "width": "100%", // Use 100% here, container style handles actual size
        "height": parseInt(height.replace('px', '')), // Pass height as number
        "details": false,
        "hotlist": false,
        "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
        "plotLineColorFalling": "rgba(41, 98, 255, 1)",
        "gridLineColor": "rgba(240, 243, 250, 0)",
        "scaleFontColor": "rgba(15, 15, 15, 1)",
        "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
        "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
        "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
        "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
        "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
        "tabs": [
            {
                "title": categoryTitle,
                "symbols": symbols,
                "originalTitle": categoryTitle
            }
        ]
    };

    // Create the script tag dynamically
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify(widgetConfig, null, 2); // Convert config object to JSON string

    // Append the script to the inner div
    widgetInnerDiv.appendChild(script);

    // Copyright notice removed as per request.
}
