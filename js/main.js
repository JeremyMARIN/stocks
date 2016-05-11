var ref;
var max;
// var min;

$(document).ready(function() {
	ref = 0.8 * $(".bar-container").eq(0).width(); // get the reference width
	console.log("Reference width: " + ref + "px");

	$("#stocks-container").hide();

	$("#submit").on("click", displayStocks);
});

function createURL() {
	var url = "http://feeds.financialcontent.com/JSQuote?Ticker=";

	for (var i = 1; i < 4; i++) {
		var stock = $("#stock-" + i).val();
		// console.log(stock);
		if (stock) {
			url = url + stock + "+";
		}
	}
	if (url[url.length - 1] == "+") {
		url = url.substring(0, url.length - 1);
	}

	return url;
}

function displayStocks() {
	var url = createURL();

	$.getScript(url); // excecute the script at url
}

function getMaxQuotes(quote) {
	var values = [];

	for (ticker in quote) {
		var symbol = quote[ticker];
		values.push(symbol["Last"]);
	}

	return Math.max.apply(Math, values); // return the maximum of the values
}

// function getMinQuotes(quote) {
// 	var values = [];

// 	for (ticker in quote) {
// 		var symbol = quote[ticker];
// 		values.push(symbol["Last"]);
// 	}

// 	return Math.min.apply(Math, values); // return the minimum of the values
// }

function updateQuotes() {
	if (!max) {
		max = getMaxQuotes(quote);
		// min = getMinQuotes(quote);
		console.log("Max Quotes is : " + max);
		// console.log("Min Quotes is : " + min);

		$("#stocks-container").fadeIn();
	}

	var i = 0;
	for (ticker in quote) {
		var symbol = quote[ticker];
		// console.log(symbol);

		var container = $(".bar-container").eq(i);
		var updatedWidth = (symbol["Last"]) * (ref/(max));

		container.find(".ticker").text(ticker + ": " + symbol["Last"].toFixed(3));
		container.find(".bar").animate({
			width: updatedWidth
		}, 1000);

		i++;
	}

	setTimeout(displayStocks, 10000);
}