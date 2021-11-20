// hide the loader and show the information
function showInfo() {
	setTimeout(() => {
		document.getElementById("Loader").style.display = "none";
		document.getElementById("Info").style.display = "block";
	}, 200);
}
(function () {
	// MDN will fill in the locale
	const mdnDocsBase = "https://developer.mozilla.org/docs/Web";
	const mdnSearchBase = "https://developer.mozilla.org/search?q=";
	const currentSearch = window.location.search
		.replace("?", "")
		.toLocaleLowerCase();

	if (currentSearch === "") {
		console.debug("path is empty");

		showInfo();

		return;
	}

	// https://developer.mozilla.org/en-US/docs/Web/API
	// MDN has a bigger list of browser APIs, but not all of them map nicely to a standard url
	const browserApis = [
		"window",
		"fetch",
		"geolocation",
		"history",
		"pushmanager",
		"websocket",
		"worker",
	];

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
	const jsObjects = [
		// Value properties
		"infinity",
		"nan",
		"undefined",
		"globalthis",
		"this",
		// Function properties
		"eval",
		"isfinite",
		"isnan",
		"parsefloat",
		"parseint",
		"encodeuri",
		"encodeuricomponent",
		"decodeuri",
		"decodeuricomponent",
		// Fundamental objects
		"object",
		"function",
		"boolean",
		"symbol",
		// Numbers and dates
		"number",
		"bigint",
		"math",
		"date",
		// Text processing
		"string",
		"regexp",
		"regex",
		// Indexed collections
		"array",
		"int8array",
		"uint8array",
		"uint8clampedarray",
		"int16array",
		"uint16array",
		"int32array",
		"uint32array",
		"float32array",
		"float64array",
		"bigint64array",
		"biguint64array",
		// Keyed collections
		"map",
		"set",
		"weakmap",
		"weakset",
		// Structured data
		"arraybuffer",
		"sharedarraybuffer",
		"atomics",
		"dataview",
		"json",
		// Control abstraction objects
		"promise",
		"generator",
		"generatorfunction",
		"asyncfunction",
		// Internationalization
		"intl",
	];

	const parts = currentSearch.split(".");
	if (parts[0] === "") {
		console.debug("parts[0] is empty");
		showInfo();
		return;
	}

	let url;

	if (parts[0] === "css") {
		url = `${mdnDocsBase}/CSS`;
	} else if (browserApis.indexOf(parts[0]) > -1) {
		// e.g., /window.location => /API/Window/location
		url = `${mdnDocsBase}/API/${parts[0]}`;
	} else if (jsObjects.indexOf(parts[0]) > -1) {
		// e.g., object.entries => /Javascript/Reference/Global_Objects/object/entries
		// regex is an alias for regexp
		parts[0] = parts[0] === "regex" ? "regexp" : parts[0];
		parts[0] = parts[0] === "this" ? "globalthis" : parts[0];
		url = `${mdnDocsBase}/Javascript/Reference/Global_Objects/${parts[0]}`;
	} else if (parts[0] === "htmlel") {
		// e.g., htmlel.input => /HTML/Element/input
		url = `${mdnDocsBase}/HTML/Element`;
	} else if (parts[0] === "htmlattr") {
		// e.g., htmlattr.autofocus => /HTML/Global_attributes/autofocus
		url = `${mdnDocsBase}/HTML/Global_attributes`;
	} else {
		// if none of the parts[0] matched yet, part[0] is not something explicitly handled. Run a search on MDN.
		// e.g., svg => https://developer.mozilla.org/search?q=svg
		const searchTerm = encodeURI(parts[0]);
		window.location.href = `${mdnSearchBase}${searchTerm}`;
	}

	if (url && parts[1]) {
		url += `/${parts[1]}`;
	}

	if (url) {
		window.location.href = url;
	} else {
		showInfo();
	}
})();
