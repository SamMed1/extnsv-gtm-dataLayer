// GTM Data Layer
// Author: Extnsv
// Loaded after functionality scripts in order to read correct variable values and use. EG price calculation, currency selection.

document.addEventListener("DOMContentLoaded", function (event) {

	// Initialize and Notify script has been loaded successfully.
	window.dataLayer = window.dataLayer || [];
	console.log('Data layer script loaded successfully');

	// **  Define static variables to be used by specific pages.
	// [1] Dragon Professional Individual page
	const dragonProfessional = document.getElementById("dragon-professional");
	// [2] Dragon Home page
	const dragonHome = document.getElementById("dragon-home");
	// [3] Another page
	const pageName2 = document.getElementById("############");

	// [1]
	if (dragonProfessional) {
		// Define static variables.
		var gtm_pageName = 'Dragon Professional Individual 15';
		var gtm_brand    = 'Dragon';
		var gtm_category = 'Speech Recognition';
		var gtm_variant  = 'Download';

		// Define variation pid's.
		var pid_standard = '5065051500';
		var pid_wireless = '5383602700';
		var pid_upgrade  = '5062971500';
		var pid_spanish  = '5228063700';
		var pid_french   = '5228064000';
	}

	// [2]
	if (dragonHome) {
		// Define static variables.
		var gtm_pageName = 'Dragon Home';
		var gtm_brand    = 'Dragon';
		var gtm_category = 'Speech Recognition';
		var gtm_variant  = 'Download';

		// Define variation pid's.
		var pid_standard = '5217991100';
		var pid_wireless = '5383602000';
		var pid_french   = '5240834400';
	}

	// ** Call functions to generate our dynamic variables are calculated depending on user selection, eg price.
	// [1] Generate variable for currency.
	// [2] Generate variable for variation.
	// [3] Generate variable for quantity.
	// [4] Generate variable for price.
	// [5] Generate variables for accessories.

	document.addEventListener("mouseup", function () {
		checkCurrency();
		checkVariation();
		checkQuantity();
		checkPrice();
		checkAccessories();
	});

	// [1]
	// Functionality to detect calculated priceand define variable for use in dataLayer.
	function checkCurrency() {
		var gtm_currencyCode = document.getElementById('currency').value;
		return gtm_currencyCode;
	}

	// [2]
	// Functionality to detect variation selection and define variable for use in dataLayer.
	function checkVariation() {
		// Get the selected product lowercase value for use.
		var variationRendered = document.getElementById("select2-variation-container").textContent;
		var variationRenderedLower = variationRendered.toLowerCase();

		if (variationRenderedLower == 'standard') {
			var gtm_id = pid_standard;
		} else if (variationRenderedLower == 'wireless') {
			var gtm_id = pid_wireless;
		} else if (variationRenderedLower == 'upgrade') {
			var gtm_id = pid_upgrade;
		} else if (variationRenderedLower == 'spanish') {
			var gtm_id = pid_spanish;
		} else if (variationRenderedLower == 'french') {
			var gtm_id = pid_french;
		}
		return gtm_id;
	}
	checkVariation();

	// [3]
	// Functionality to detect quantity selection and define variable for use in dataLayer.
	function checkQuantity() {
		let gtm_quantity_str = document.getElementById('quantity').value;
		var gtm_quantity = parseInt(gtm_quantity_str);
		return gtm_quantity;
	}
	checkQuantity();

	// [4]
	// Functionality to detect calculated priceand define variable for use in dataLayer.
	function checkPrice() {
		var gtm_price = document.getElementsByClassName("value")[0].innerText;
		return gtm_price;
	}
	checkPrice();

	// [5]
	// Functionality to detect if checkboxes are checked.
	function checkAccessories() {

		var gtm_currencyCode = checkCurrency(); // Pull in currency code.

		// Checkbox 1
		const checkBox1 = document.getElementById("check1");
		if (checkBox1.checked) {
			var addBluetoothHeadset = true;
		} else {
			var addBluetoothHeadset = false;
		}

		// Checkbox 2
		const checkBox2 = document.getElementById("check2");
		if (checkBox2.checked) {
			var addPowermic = true;
		} else {
			var addPowermic = false;
		}

		// Prices
		if (gtm_currencyCode == 'CAD') {
			var bluetoothHeadsetCost = checkBox1.getAttribute("data-cad");
			var powermicCost = checkBox2.getAttribute("data-cad");
		} else {
			var bluetoothHeadsetCost = checkBox1.getAttribute("data-us");
			var powermicCost = checkBox2.getAttribute("data-us");
		}

		return [addBluetoothHeadset, addPowermic, bluetoothHeadsetCost, powermicCost];
	}

	// ** Store the data structure in a function, written with the help of the page specific variables as defined above. **
	// [1] Bluetooth headset
	// [2] PowerMic 3
	// [3] The primary product

	function dataStructure() {
		var gtm_id = checkVariation();
		var gtm_quantity = checkQuantity();
		var gtm_price = checkPrice();

		var accessoriesAll = checkAccessories(); // Retrieve all of our accessory truthy / falsey variables, then ..
		var bluetoothHeadsetCost = accessoriesAll[2]; // .. segment bluetooth headset cost variable ..
		var powermicCost = accessoriesAll[3]; // .. segment powermic cost variable.

		// [1]
		var bluetoothHeadset = {
			id: '5089594000',
			name: 'Dragon USB Headset',
			price: bluetoothHeadsetCost,
			brand: 'Dragon',
			category: 'Headset',
			quantity: 1 // The quantity will always be 1 when added to the basket.
		};

		// [2]
		var powermic = {
			id: '#########',
			name: 'PowerMic',
			price: powermicCost,
			brand: 'Dragon',
			category: 'Headset',
			quantity: 1 // The quantity will always be 1 when added to the basket.
		};

		// [3]
		var product = {
			'name': gtm_pageName,
			'id': gtm_id,
			'price': gtm_price,
			'brand': gtm_brand,
			'category': gtm_category,
			'variant': gtm_variant,
			'quantity': gtm_quantity
		};

		return [product, bluetoothHeadset, powermic];
	}
	dataStructure();

	// ** Now define our action list, then call the relevant functions in order to pass our data to the dataLayer for viewing in GTM and GA. **

	// Action list.
	document.querySelector('.bt-buynow').addEventListener("click", gtmAddToCart); // Trigger AddToCart script.

	function gtmAddToCart() {

		// *** Retrieve our dynamic variables from functions outside of block scope. ***
		var gtm_currencyCode = checkCurrency(); // Retrieve currency code.

		var accessoriesAll = checkAccessories(); // Retrieve all of our accessory truthy / falsey variables, then ..
		var accessoriesBluetoothHeadset = accessoriesAll[0]; // .. segment bluetooth headset variable ..
		var accessoriesPowermic = accessoriesAll[1]; // .. segment powermic variable.

		var productsAll = dataStructure(); // Retrieve our data structure, then ..
		var productsPrimary = productsAll[0]; // .. segment primary product structure ..
		var productsBluetoothHeadset = productsAll[1]; // .. segment bluetooth headset structure ..
		var productsPowermic = productsAll[2]; // .. segment powermic structure.

		// *** Action taken if both accessories added.
		if (accessoriesPowermic && accessoriesBluetoothHeadset) {
			dataLayer.push({
				'event': 'addToCart',
				'ecommerce': {
					'currencyCode': gtm_currencyCode,
					'add': {
						'products': [
							productsPrimary,
							productsBluetoothHeadset,
							productsPowermic
						]
					}
				}
			});
		}
		// *** Action taken if bluetooth headset added.
		else if (accessoriesBluetoothHeadset) {
			dataLayer.push({
				'event': 'addToCart',
				'ecommerce': {
					'currencyCode': gtm_currencyCode,
					'add': {
						'products': [
							productsPrimary,
							productsBluetoothHeadset
						]
					}
				}
			});
		}
		// *** Action taken if powermic added.
		else if (accessoriesPowermic) {
			dataLayer.push({
				'event': 'addToCart',
				'ecommerce': {
					'currencyCode': gtm_currencyCode,
					'add': {
						'products': [
							productsPrimary,
							productsPowermic
						]
					}
				}
			});
		}
		// *** Action taken if no accessories added.
		else {
			dataLayer.push({
				'event': 'addToCart',
				'ecommerce': {
					'currencyCode': gtm_currencyCode,
					'add': {
						'products': [
							productsPrimary
						]
					}
				}
			});
		}
		console.log('dataLayer successfully pushed');
	}
});