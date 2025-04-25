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
        "timezone": "America/New_York",
        "theme": "light",
        "style": "9", // Advanced chart style
        "locale": "en",
        "withdateranges": true,
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        "details": true,
        "hotlist": true,
        "show_popup_button": true,
        "popup_width": "1000",
        "popup_height": "650",
        "support_host": "https://www.tradingview.com"
    });
}
