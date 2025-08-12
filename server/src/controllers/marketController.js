// Get stock data for a symbol
exports.getStockData = async (req, res) => {
	const { symbol } = req.params;
	// TODO: Replace with real stock data fetch logic
	res.json({
		data: {
			symbol,
			name: "Demo Stock",
			price: 400.0,
			change: 2.5,
			changePercent: 0.6,
			open: 398.0,
			high: 405.0,
			low: 397.5,
			avgVol: 1000000,
			sharesOutstanding: 50000000,
			marketCap: 20000000000,
			close: 399.5,
			volume: 800000,
		}
	});
};

// Get recent trades for a symbol
exports.getStockTrades = async (req, res) => {
	const { symbol } = req.params;
	// TODO: Replace with real trades fetch logic
	res.json({
		data: [
			{ time: "10:01", price: 400.1, quantity: 50 },
			{ time: "10:02", price: 400.2, quantity: 100 },
			{ time: "10:03", price: 400.0, quantity: 75 },
		]
	});
};
