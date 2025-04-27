document.addEventListener('DOMContentLoaded', () => {
    const dashboardContent = document.getElementById('dashboard-content');
    const symbolsPath = '../tradingview_symbols.json'; // Relative path from js/ to root

    if (!dashboardContent) {
        console.error('Dashboard content container #dashboard-content not found.');
        return;
    }

    fetch(symbolsPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} fetching ${symbolsPath}`);
            }
            return response.json();
        })
        .then(categories => {
            // Clear any placeholder content
            dashboardContent.innerHTML = '';

            // Define specific heights or use a default
            const categoryHeights = {
                "Forex": "700px",
                "Rates": "700px",
                "Equity Indices": "400px",
                "Commodities": "400px",
                "Sentiment/Volatility": "400px"
            };
            const defaultHeight = "400px"; // Fallback height

            for (const categoryName in categories) {
                if (categories.hasOwnProperty(categoryName)) {
                    const symbols = categories[categoryName];
                    const categoryId = categoryName.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-'); // Create a safe ID
                    const widgetContainerId = `widget-container-${categoryId}`;
                    const widgetHeight = categoryHeights[categoryName] || defaultHeight;

                    // 1. Create main section container
                    const widgetSection = document.createElement('div');
                    widgetSection.className = 'widget-section';

                    // 2. Create heading
                    const heading = document.createElement('h2');
                    // Handle potential mixed language category names if needed, or just use the key
                    heading.textContent = categoryName === 'Rates' ? '利率 (Rates)' : categoryName;
                    widgetSection.appendChild(heading);

                    // 3. Create flex container for widget and buttons
                    const sectionContainer = document.createElement('div');
                    sectionContainer.className = 'commodity-section-container';

                    // 4. Create widget container
                    const widgetContainer = document.createElement('div');
                    widgetContainer.className = 'commodity-widget-container tradingview-widget-container'; // Add both classes
                    widgetContainer.id = widgetContainerId; // Assign unique ID
                    // Height/width will be set by the loader function
                    sectionContainer.appendChild(widgetContainer);

                    // 5. Create buttons container
                    const buttonsContainer = document.createElement('div');
                    buttonsContainer.className = 'commodity-buttons-container';

                    // 6. Create "View All" button
                    const viewAllButton = document.createElement('button');
                    viewAllButton.className = 'view-all-button';
                    viewAllButton.setAttribute('data-category', categoryName);
                    viewAllButton.style.margin = '0 0 10px 0'; // Keep specific style from original HTML
                    viewAllButton.style.width = '100%';
                    viewAllButton.textContent = `View All ${categoryName} Charts`;
                    buttonsContainer.appendChild(viewAllButton);

                    // 7. Create individual symbol buttons
                    symbols.forEach(symbolData => {
                        const symbolButton = document.createElement('button');
                        symbolButton.className = 'commodity-button';
                        symbolButton.setAttribute('data-symbol', symbolData.s);
                        symbolButton.textContent = symbolData.d; // Use description for button text
                        buttonsContainer.appendChild(symbolButton);
                    });

                    // 8. Append buttons container to section container
                    sectionContainer.appendChild(buttonsContainer);

                    // 9. Append section container to main section
                    widgetSection.appendChild(sectionContainer);

                    // 10. Append the whole section to the main dashboard content area
                    dashboardContent.appendChild(widgetSection);

                    // 11. Load the Market Overview widget into its container
                    // Note: The loader function now handles adding the copyright notice
                    loadMarketOverviewWidget(widgetContainerId, categoryName, symbols, widgetHeight);
                }
            }

            // Add event listeners after all elements are created
            addDashboardButtonListeners();

        })
        .catch(error => {
            console.error('Error fetching or processing symbols for dashboard:', error);
            dashboardContent.innerHTML = `<p>Error loading dashboard data. Please check console. Details: ${error.message}</p>`;
        });

    // Function to add event listeners (using event delegation)
    function addDashboardButtonListeners() {
        dashboardContent.addEventListener('click', function(event) {
            const target = event.target;

            // Handle individual symbol buttons
            if (target.classList.contains('commodity-button')) {
                const symbol = target.getAttribute('data-symbol');
                if (symbol) {
                    const chartUrl = `advanced-chart.html?symbol=${encodeURIComponent(symbol)}`;
                    window.open(chartUrl, '_blank');
                } else {
                    console.error('Commodity button missing data-symbol attribute.');
                }
            }

            // Handle "View All" buttons
            if (target.classList.contains('view-all-button')) {
                const category = target.getAttribute('data-category');
                if (category) {
                    const multiChartUrl = `multi-chart-view.html?category=${encodeURIComponent(category)}`;
                    window.open(multiChartUrl, '_blank');
                } else {
                    console.error('View All button missing data-category attribute.');
                }
            }
        });
    }
});
