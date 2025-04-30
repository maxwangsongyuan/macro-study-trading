document.addEventListener('DOMContentLoaded', () => {
    const langToggleButton = document.getElementById('lang-toggle');
    const topicCardsContainer = document.getElementById('topic-cards');
    const contentDisplay = document.getElementById('content-display');
    let currentLang = 'zh'; // Default language
    let currentTopic = null; // Track the currently displayed topic

    // --- Content Data (Simplified Chinese & English) ---
    // (Keep the existing contentData object with all translations)
    const contentData = {
        zh: {
            title: "交易智慧",
            mainHeading: "交易智慧",
            toggleButton: "Switch to English",
            rulesHeading: "交易守则",
            mindsetHeading: "交易思维",
            routineHeading: "每日流程",
            guidelinesHeading: "交易指南",
            resourcesHeading: "资源",
            resource1: "Train the Trader 21天训练计划",
            resource2: "Master Your Trade 会员",
            footerCredit: "内容来源：超绩投资客 J Law",
            selectTopicPrompt: "请点击上方一个主题查看详细内容。",

            // Rules Content (Consolidated & Simplified)
            rulesContent: `
                <ol>
                    <li>每一笔交易必须设置止损点。</li>
                    <li>单笔交易承受的最大亏损率不应高于平均获利率。</li>
                    <li>永远不要向下摊平亏损的头寸（Averaging Down）。</li>
                    <li>不要过度分析以致不敢行动；实际操作时切忌优柔寡断。</li>
                    <li>永远不要让丰厚的利润变成亏损；在拥利润时要懂得锁定。</li>
                    <li>错失机会不影响长期回报，但重大错误会重创本金。</li>
                    <li>每日检视持仓，时刻从风险与回报角度思考。</li>
                    <li>不要在高于突破点5%以上的价位追涨。</li>
                    <li>不追求在最高点卖出；距离突破点15-20%涨幅时至少卖出部分。</li>
                    <li>尽量在强势板块中筛选强势股买入。</li>
                    <li>拒绝低质量选股依据（如：消息、个人期望、媒体推荐、低价股/庄家股）。</li>
                    <li>小心使用杠杆，它可能导致毁灭性失败。</li>
                    <li>做多创新高的股票，做空创新低的股票。</li>
                    <li>市场永远不会错，个人看法常错；不要与市场作对。</li>
                    <li>接受自己会犯错和亏损，焦点放在长期稳定获利。</li>
                    <li>即使胜率低于50%，做好风险管理仍可长期盈利。</li>
                    <li>风险回报比尽量维持在2:1以上。</li>
                    <li>遵守交易纪律，保持原则和风格始终如一。</li>
                </ol>
            `,

            // Mindset Content (Consolidated & Simplified)
            mindsetContent: `
                <ul>
                    <li>交易顺手时才扩大规模，不顺手时要尽快缩减。</li>
                    <li>只在非常顺势时才将个股仓位加至超配（Over-weight），趋势反转立刻减仓。</li>
                    <li>永远不要持大仓位赌财报。</li>
                    <li>尽快将止损点上移至平均买入成本点。</li>
                    <li>股价行为异常，或有怀疑时，马上卖出。</li>
                    <li>突破买入后，密切留意下一个跟进买入点，适时加仓。</li>
                    <li>按突破先后次序买入，排除主观喜好。</li>
                    <li>买入前确保股票形态完美，不接受有缺陷的买点。</li>
                    <li>成交量是推升股价的燃料，突破时最好见到放量。</li>
                    <li>持有最强股票，但走势怪异时尽快卖出。</li>
                    <li>大盘连涨时保持高度戒备，风险会增加。</li>
                    <li>触及买点不代表必须买入，需结合突破情况和当时大盘表现。</li>
                    <li>人性与情绪是最大敌人，用计划和系统克服。</li>
                    <li>重大趋势需要时间发展，给好股票上涨的时间。</li>
                    <li>追踪少数股票比追踪大量股票更容易管理。</li>
                    <li>躺赚时期积极操作，血汗钱时期耐心等待。</li>
                    <li>了解自己的交易盲点和常犯错误规律，坚持复盘。</li>
                    <li>不要过度交易，目的是赚钱，不是为交易而交易。</li>
                    <li>切忌急功近利，尤其在市场极端时。</li>
                    <li>交易规模适中，既不过大（影响心态），也不过度分散（影响收益）。</li>
                </ul>
            `,

            // Routine Content (Simplified)
            routineContent: `
                <h3>开市前准备</h3>
                <ul>
                    <li>检查持仓，调整止损订单。</li>
                    <li>查阅隔夜及当前市场（如：港股看夜期/恒指期货，美股看期货）。</li>
                    <li>若外围无重大不利，按计划设置心仪股票的Buy Stop及止损单。</li>
                    <li>检查已设订单，根据走势决定是否撤销或修改。</li>
                    <li>心理预演：思考最好/最坏情况及应对。</li>
                </ul>
                <h3>交易时段</h3>
                <ul>
                    <li>避免“即兴”买入；除非是预先追踪的股票出现理想信号。</li>
                    <li>主要依靠开市前计划和Stop Order自动执行。</li>
                    <li>检查持股有无异常，决定是否操作（获利/加仓/止损）。</li>
                    <li>查阅52周新高名单，将符合条件的股票加入观察名单。</li>
                    <li>观察追踪的强势股表现，培养盘感。</li>
                    <li>避免长时间盯盘或频繁查价。</li>
                    <li>不看财经新闻，按计划行事。</li>
                </ul>
                <h3>收市后工作</h3>
                <ul>
                    <li>按模板筛选股票，寻找机会。</li>
                    <li>将形态理想的股票加入观察清单。</li>
                    <li>记录待突破可买入的股票，可预设订单或次日操作。</li>
                    <li>查阅大盘表现，判断市场状态，调整策略。</li>
                    <li>检查持仓，调整止损/加仓/获利位及订单。</li>
                    <li>观察追踪的强势股表现。</li>
                    <li>更新交易计划、交易记录及MRA。</li>
                </ul>
            `,

            // Guidelines Content (Simplified)
            guidelinesContent: `
                <h3>买入股票前检查项目</h3>
                <ul>
                    <li>是否完成Train the Trader买入系统课程？</li>
                    <li>是否突破枢纽点/又袋枢纽点？</li>
                    <li>枢纽点/又袋枢纽点运行日数是否足够（如3天+）？</li>
                    <li>枢纽点/又袋枢纽点发展时成交量是否萎缩？</li>
                    <li>枢纽点/又袋枢纽点波幅是否小于10%？</li>
                    <li>相对强度(RS)是否合规？RS线是否接近或创新高？</li>
                    <li>50天线及200天线是否同时向上？</li>
                    <li>股价是否在50天线上？（或离50天线不远，如8%内）</li>
                    <li>股价是否在200天线上？</li>
                    <li>是否为低价股？（警惕）</li>
                    <li>股价形态如何？构建了多久？形态是松散还是紧密？</li>
                    <li>现价是否距离突破点足够近（如5%/3%/2%内）？</li>
                    <li>能否设置技术性止损？止损点是否在8%以内？</li>
                    <li>所属板块是否强势？是否为板块龙头？</li>
                    <li>是否为低成交量股票？（警惕）</li>
                    <li>有无基本面支持？</li>
                    <li>下单同时或之后是否已设止损单？</li>
                    <li>当前大盘是躺赚期还是血汗钱期？</li>
                    <li>若是血汗钱期，是否清楚自己在做什么？</li>
                    <li>若是躺赚期，是否已上涨较长时间？</li>
                    <li>若一年只能买10只，这只会是其一吗？</li>
                    <li>回报风险比是否达2:1以上？</li>
                    <li>有无清晰的仓位管理计划？</li>
                </ul>
                <h3>卖出股票前检查项目</h3>
                <ul>
                    <li>是否完成Train the Trader卖出系统课程？</li>
                    <li><strong>锁定获利式卖出：</strong>
                        <ul>
                            <li>上涨幅度是否达初始止损幅度1倍或以上？</li>
                            <li>是否达到平均获利率？或其1倍以上？</li>
                            <li>是否出现转弱信号？</li>
                            <li>是否在高位出现消耗性跳空上涨或急涨？</li>
                        </ul>
                    </li>
                    <li><strong>控制风险式卖出：</strong>
                        <ul>
                            <li>是否触及止损点？</li>
                            <li>是否下跌超过8%？</li>
                            <li>是否出现卖出警号？</li>
                            <li>是否出现“鸡蛋反应”？</li>
                            <li>大盘是否出现转势警号？</li>
                            <li>股价或大盘看起来不利，且正在用杠杆？</li>
                            <li>大盘是否进入或处于血汗钱时期？</li>
                            <li>买入后股价是否很快以大成交量跌穿20/50天线？</li>
                            <li>是否出现数月来最大单日跌幅且伴随大成交量？</li>
                        </ul>
                    </li>
                </ul>
            `
        },
        en: {
            title: "Trading Wisdom",
            mainHeading: "Trading Wisdom",
            toggleButton: "切换中文",
            rulesHeading: "Trading Rules",
            mindsetHeading: "Trading Mindset",
            routineHeading: "Daily Routine",
            guidelinesHeading: "Trading Guidelines",
            resourcesHeading: "Resources",
            resource1: "Train the Trader 21-Day Training Program",
            resource2: "Master Your Trade Membership",
            footerCredit: "Content Source: Super Trader J Law",
            selectTopicPrompt: "Please click a topic above to view details.",

            // Rules Content (English)
            rulesContent: `
                <ol>
                    <li>Every trade must have a stop-loss point.</li>
                    <li>The maximum loss percentage tolerated per trade should not exceed your average profit percentage.</li>
                    <li>Never average down on a losing position.</li>
                    <li>Don't over-analyze to the point of inaction; avoid indecisiveness during execution.</li>
                    <li>Never let a substantial profit turn into a loss; know when to lock in gains.</li>
                    <li>Missing 10 opportunities won't affect long-term returns, but one major mistake can severely impact your capital.</li>
                    <li>Review your positions daily, always thinking in terms of risk vs. reward.</li>
                    <li>Don't chase stocks more than 5% above their breakout point.</li>
                    <li>Don't aim to sell at the absolute top; sell at least a portion when up 15-20% from the breakout.</li>
                    <li>Try to buy strong stocks within strong sectors.</li>
                    <li>Reject low-quality stock selection criteria (e.g., tips, personal hopes, media hype, low-priced/penny stocks).</li>
                    <li>Use leverage cautiously; it can lead to catastrophic failure.</li>
                    <li>Go long on stocks making new highs, go short on stocks making new lows.</li>
                    <li>The market is never wrong, opinions often are; don't fight the market.</li>
                    <li>Accept that you will be wrong and incur losses; focus on long-term consistent profitability.</li>
                    <li>Even with a win rate below 50%, proper risk management allows for long-term profit.</li>
                    <li>Maintain a reward-to-risk ratio of at least 2:1.</li>
                    <li>Adhere to trading discipline; maintain consistent principles and style.</li>
                </ol>
            `,

            // Mindset Content (English)
            mindsetContent: `
                <ul>
                    <li>Increase position size only when trading well; decrease quickly when trading poorly.</li>
                    <li>Only overweight a stock position when the trend is strongly in your favor; reduce immediately if the trend reverses.</li>
                    <li>Never hold a large position through a major earnings announcement.</li>
                    <li>Quickly move your stop-loss to your average entry price point.</li>
                    <li>If a stock's behavior seems abnormal or questionable, sell immediately.</li>
                    <li>After a breakout buy, watch closely for follow-up buy points to add to the position appropriately.</li>
                    <li>Buy stocks in order of their breakout timing, removing personal bias.</li>
                    <li>Ensure a stock has a perfect setup before buying; accept no flaws in the buy point.</li>
                    <li>Volume is the fuel for price increases; look for increasing volume on or after a breakout.</li>
                    <li>Hold your strongest stocks, but sell quickly if their behavior turns strange.</li>
                    <li>Be highly alert when the market has been rising continuously; risks increase.</li>
                    <li>Just because a buy point is triggered doesn't mean you must buy; consider the breakout quality and overall market condition.</li>
                    <li>Human nature and emotions are the biggest enemies; use plans and systems to overcome them.</li>
                    <li>Significant trends take time to develop; give good stocks time to rise.</li>
                    <li>Tracking fewer stocks is easier than tracking many; keep watchlists manageable.</li>
                    <li>Trade actively in "easy money" markets; be patient or stay out in "hard-earned money" markets.</li>
                    <li>Know your trading blind spots and common mistakes; conduct post-trade analysis.</li>
                    <li>Don't overtrade; the goal is to make money, not just to trade.</li>
                    <li>Avoid being greedy or impatient, especially in extreme market conditions.</li>
                    <li>Position size should be comfortable (allowing sleep) but not overly diversified (hindering super-performance).</li>
                </ul>
            `,

            // Routine Content (English)
            routineContent: `
                <h3>Pre-Market Preparation</h3>
                <ul>
                    <li>Check positions, adjust stop-loss orders if needed.</li>
                    <li>Review overnight and current market conditions (e.g., futures).</li>
                    <li>If no major adverse conditions, set Buy Stop and stop-loss orders for desired stocks according to plan.</li>
                    <li>Review existing orders, cancel or modify based on current price action.</li>
                    <li>Mental rehearsal: Consider best/worst-case scenarios and your reactions.</li>
                </ul>
                <h3>During Trading Hours</h3>
                <ul>
                    <li>Avoid impulsive buys; only act on pre-tracked stocks showing ideal signals.</li>
                    <li>Rely primarily on pre-market plans and automated Stop Orders.</li>
                    <li>Check holdings for abnormalities; decide if action is needed (profit-taking/adding/stopping out).</li>
                    <li>Scan the 52-week high list; add qualifying stocks to the watchlist.</li>
                    <li>Monitor strong stocks on your watchlist to absorb market feel.</li>
                    <li>Avoid watching the screen or checking quotes too frequently.</li>
                    <li>Ignore financial news; stick to the plan.</li>
                </ul>
                <h3>Post-Market Work</h3>
                <ul>
                    <li>Screen stocks using different templates to find opportunities.</li>
                    <li>Add stocks with ideal patterns to watchlists.</li>
                    <li>Note stocks ready for breakout; pre-set orders or prepare for next day.</li>
                    <li>Review market indexes; assess market condition, adjust strategy.</li>
                    <li>Check positions; adjust stop-loss/add-on/profit-taking levels and orders.</li>
                    <li>Monitor strong stocks on your watchlist.</li>
                    <li>Update trading plan, journal, and MRA (Market Risk Analysis).</li>
                </ul>
            `,

            // Guidelines Content (English)
            guidelinesContent: `
                <h3>Pre-Buy Checklist</h3>
                <ul>
                    <li>Completed Train the Trader buy system lessons?</li>
                    <li>Breaking out from a pivot / cheat pivot?</li>
                    <li>Pivot / cheat pivot duration sufficient (e.g., 3+ days)?</li>
                    <li>Volume dried up during pivot / cheat pivot formation?</li>
                    <li>Pivot / cheat pivot volatility less than 10%?</li>
                    <li>Relative Strength (RS) meets criteria? RS Line near/at new high?</li>
                    <li>50-day and 200-day moving averages trending up?</li>
                    <li>Price above 50-day MA? (Or not far below, e.g., within 8%)</li>
                    <li>Price above 200-day MA?</li>
                    <li>Is it a low-priced stock? (Caution)</li>
                    <li>What is the chart pattern? How long did it build? Is it tight or loose?</li>
                    <li>Is the current price close enough to the breakout (e.g., within 5%/3%/2%)?</li>
                    <li>Can a technical stop-loss be set? Is it within 8%?</li>
                    <li>Is the stock's sector strong? Is it a leader within the sector?</li>
                    <li>Is it a low-volume stock? (Caution)</li>
                    <li>Does it have fundamental support?</li>
                    <li>Stop-loss order placed concurrently or immediately after buy order?</li>
                    <li>Is the current market in an "easy money" or "hard-earned money" phase?</li>
                    <li>If "hard-earned," are you clear on your actions?</li>
                    <li>If "easy money," has the rally been long?</li>
                    <li>If you could only buy 10 stocks a year, would this be one?</li>
                    <li>Is the reward/risk ratio at least 2:1?</li>
                    <li>Is there a clear position sizing plan?</li>
                </ul>
                <h3>Pre-Sell Checklist</h3>
                <ul>
                    <li>Completed Train the Trader sell system lessons?</li>
                    <li><strong>Profit-Taking Sells:</strong>
                        <ul>
                            <li>Has the gain reached 1x or more of the initial stop-loss risk?</li>
                            <li>Has it reached the average profit target? Or 1x+ the average target?</li>
                            <li>Are there signs of weakening?</li>
                            <li>Is there an exhaustion gap up or climactic run at highs?</li>
                        </ul>
                    </li>
                    <li><strong>Risk-Control Sells:</strong>
                        <ul>
                            <li>Has the stop-loss price been hit?</li>
                            <li>Is the stock down more than 8%?</li>
                            <li>Are there sell signals present?</li>
                            <li>Did it show an "egg reaction" (failed breakout)?</li>
                            <li>Are there market reversal signals?</li>
                            <li>Does price action or market look unfavorable while using leverage?</li>
                            <li>Is the market entering/in a "hard-earned money" phase?</li>
                            <li>Did the stock quickly break below the 20/50-day MA on high volume after purchase?</li>
                            <li>Did it have the largest single-day drop in months on high volume?</li>
                        </ul>
                    </li>
                </ul>
            `
        }
    };

    // --- Function to Display Topic Content ---
    function displayTopicContent(topic) {
        currentTopic = topic; // Update the currently displayed topic
        let headingKey, contentKey;

        switch (topic) {
            case 'rules':
                headingKey = 'rulesHeading';
                contentKey = 'rulesContent';
                break;
            case 'mindset':
                headingKey = 'mindsetHeading';
                contentKey = 'mindsetContent';
                break;
            case 'routine':
                headingKey = 'routineHeading';
                contentKey = 'routineContent';
                break;
            case 'guidelines':
                headingKey = 'guidelinesHeading';
                contentKey = 'guidelinesContent';
                break;
            default:
                contentDisplay.innerHTML = `<p class="placeholder" data-lang-key="selectTopicPrompt">${contentData[currentLang].selectTopicPrompt}</p>`;
                return;
        }

        // Construct the HTML for the content display area
        contentDisplay.innerHTML = `
            <h2 data-lang-key="${headingKey}">${contentData[currentLang][headingKey]}</h2>
            ${contentData[currentLang][contentKey]}
        `;
        // Add the class to apply box styling
        contentDisplay.classList.add('has-content');
    }

    // --- Function to Update All Text Content ---
    function updateContentLanguage(lang) {
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
        currentLang = lang;

        // Update text for all elements with data-lang-key attribute
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (contentData[lang][key]) {
                 // Check if the key refers to main content sections (handled by displayTopicContent)
                 // We only update static text elements here directly
                 if (!key.endsWith('Content') && key !== 'rulesHeading' && key !== 'mindsetHeading' && key !== 'routineHeading' && key !== 'guidelinesHeading') {
                     element.textContent = contentData[lang][key];
                 }
            }
        });

        // Update topic card headings specifically
        document.querySelectorAll('.topic-card h3[data-lang-key]').forEach(h3 => {
             const key = h3.getAttribute('data-lang-key');
             if (contentData[lang][key]) {
                 h3.textContent = contentData[lang][key];
             }
        });

        // Update the currently displayed topic content, if any
        if (currentTopic) {
            displayTopicContent(currentTopic);
        } else {
             // Update placeholder text if no topic is selected
             const placeholder = contentDisplay.querySelector('.placeholder[data-lang-key]');
             if (placeholder) {
                 const key = placeholder.getAttribute('data-lang-key');
                 if (contentData[lang][key]) {
                     placeholder.textContent = contentData[lang][key];
                 }
             }
        }

        // Update button text
        langToggleButton.textContent = contentData[lang].toggleButton === "Switch to English" ? "Switch to English" : "切换中文";
    }

    // --- Event Listener for Topic Card Clicks ---
    if (topicCardsContainer) {
        topicCardsContainer.addEventListener('click', (event) => {
            const card = event.target.closest('.topic-card');
            if (card) {
                const topic = card.getAttribute('data-topic');
                // Remove placeholder if it exists
                const placeholder = contentDisplay.querySelector('.placeholder');
                if (placeholder) {
                    placeholder.remove();
                }
                displayTopicContent(topic);
                 // Optional: Add class to highlight active card (requires CSS)
                 document.querySelectorAll('.topic-card').forEach(c => c.classList.remove('active'));
                 card.classList.add('active');
                 // Scroll the content area into view smoothly
                 contentDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // --- Event Listener for Language Toggle Button ---
    if (langToggleButton) {
        langToggleButton.addEventListener('click', () => {
            const newLang = currentLang === 'zh' ? 'en' : 'zh';
            updateContentLanguage(newLang);
        });
    }

    // --- Initial Content Language Load ---
    updateContentLanguage(currentLang); // Load default language (Simplified Chinese)

});
