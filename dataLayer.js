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
	const dragonHome         = document.getElementById("dragon-home");
	// [3] Dragon Legal page
	const dragonLegal        = document.getElementById("dragon-legal");
	// [4] Dragon Bluetooth Headset
	const bluetoothHeadset   = document.getElementById("bluetooth-headset");
	// [5] Dragon Powermic 2
	const powermic2          = document.getElementById("powermic2");
	// [6] Dragon Powermic 3
	const powermic3          = document.getElementById("powermic3");

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

	// [3]
	if (dragonLegal) {
		// Define static variables.
		var gtm_pageName = 'Dragon Legal';
		var gtm_brand    = 'Dragon';
		var gtm_category = 'Speech Recognition';
		var gtm_variant  = 'Download';

		// Define variation pid's.
		var pid_standard      = '5062973600';
		var pid_wireless      = '5383602400';
		var pid_upgrade       = '5063131500';
		var pid_upgrade_legal = '5063131700';
	}

	// [4]
	if (bluetoothHeadset) {
		// Define static variables.
		var gtm_pageName = 'Dragon Bluetooth Headset For Healthcare';
		var gtm_brand    = 'Dragon';
		var gtm_category = 'Speech Recognition';
		var gtm_variant  = 'Download';

		// Define variation pid's.
		var pid_standard = '307076500';
	}

	// [5]
	if (powermic2) {
		// Define static variables.
		var gtm_pageName = 'Dragon Powermic 2';
		var gtm_brand    = 'Dragon';
		var gtm_category = 'Speech Recognition';
		var gtm_variant  = 'Download';

		// Define variation pid's.
		var pid_standard         = '5412502300'; // Variation: without scanner.
		var pid_standard_scanner = '5412503000'; // Variation: with scanner.
	}

	// [6]
	if (powermic3) {
		// Define static variables.
		var gtm_pageName = 'Dragon Powermic 3';
		var gtm_brand    = 'Dragon';
		var gtm_category = 'Speech Recognition';
		var gtm_variant  = 'Download';

		// Define variation pid's.
		var pid_standard     = '5411962900'; // Variation: 9ft.
		var pid_standard_3ft = '5411962700'; // Variation: 3ft.
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
		// Check the variation containers being used before reading internal value as they slightly differ on each page in older site versions.
		var variation = document.getElementById("select2-variation-container"); // Class used for the standard products and accessories with a variation selector.
		var variationDragonHome = document.getElementById("select2-variation-dh-container"); // Dragon Home ID Variation
		var variationDragonLegal = document.getElementById("select2-variation-dl-container"); // Dragon Legal ID Variation
		var variationAccessory = document.getElementsByClassName("variation-grey");

		// Check if elements exist, then get the selected product lowercase value for use.
		if ( variation ) {
			var variationRendered = document.getElementById("select2-variation-container").textContent;
		}
		else if ( variationDragonHome ) {
			var variationRendered = document.getElementById("select2-variation-dh-container").textContent;
		}
		else if ( variationDragonLegal ) {
			var variationRendered = document.getElementById("select2-variation-dl-container").textContent;
		}
		else if ( variationAccessory ) {
			var variationRendered = document.getElementsByClassName("variation-grey")[0].textContent;
		}

		var variationRenderedLower = variationRendered.toLowerCase().replace(/\s+/g, ''); // Convert to lowercase string and strip out any empty spaces before using.

		if (variationRenderedLower == 'standard'){
			var gtm_id = pid_standard;
		} else if (variationRenderedLower == 'wireless') {
			var gtm_id = pid_wireless;
		} else if (variationRenderedLower == 'upgrade') {
			var gtm_id = pid_upgrade;
		} else if (variationRenderedLower == 'upgradefromlegal12') {
			var gtm_id = pid_upgrade_legal;
		} else if (variationRenderedLower == 'spanish') {
			var gtm_id = pid_spanish;
		} else if (variationRenderedLower == 'french') {
			var gtm_id = pid_french;
		} else if (variationRenderedLower == 'bluetoothheadset') { // Accessory: Bluetooth headset single pid.
			var gtm_id = pid_standard;
		} else if (variationRenderedLower == 'withoutscanner') { // Accessory: Powermic 2 with scanner pid.
			var gtm_id = pid_standard;
		} else if (variationRenderedLower == 'withscanner') { // Accessory: Powermic 2 without scanner pid.
			var gtm_id = pid_standard_scanner;
		} else if (variationRenderedLower == 'powermic9ftcord') { // Accessory: Powermic 3 9ft.
			var gtm_id = pid_standard;
		} else if (variationRenderedLower == 'powermic3ftcord') { // Accessory: Powermic 3 3ft.
			var gtm_id = pid_standard_3ft;
		} else {
			var gtm_id = 'outofstock';
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

		// Bluetooth Headset
		const bhs = document.querySelector('.b-head-cb');
		if ( bhs ) {
			if (bhs.checked) {
				var addBluetoothHeadset = true;
			} else {
				var addBluetoothHeadset = false;
			}
		}

		// USB Headset
		const usb = document.querySelector('.usb-head-cb');
		if ( usb ) {
			if (usb.checked) {
				var addUSBHeadset = true;
			} else {
				var addUSBHeadset = false;
			}
		}

		// Powermic
		const pm = document.querySelector('.p-mic-cb');
		if ( pm ) {
			if (pm.checked) {
				var addPowermic = true;
			} else {
				var addPowermic = false;
			}
		}

		// Prices
		if (gtm_currencyCode == 'CAD') {
			if ( bhs ) {
				var bluetoothHeadsetCost = bhs.getAttribute("data-cad");
			}
			if ( usb ) {
				var usbHeadsetCost       = usb.getAttribute("data-cad");
			}
			if ( pm ) {
				var powermicCost         = pm.getAttribute("data-cad");
			}
		} else {
			if ( bhs ) {
				var bluetoothHeadsetCost = bhs.getAttribute("data-us");
			}
			if ( usb ) {
				var usbHeadsetCost       = usb.getAttribute("data-us");
			}
			if ( pm ) {
				var powermicCost         = pm.getAttribute("data-us");
			}
		}

		return [addBluetoothHeadset, addUSBHeadset, addPowermic, bluetoothHeadsetCost, usbHeadsetCost, powermicCost];
	}

	// ** Store the data structure in a function, written with the help of the page specific variables as defined above. **
	// [1] Bluetooth headset
	// [2] USB headset
	// [3] PowerMic 3
	// [4] The primary product

	function dataStructure() {
		var gtm_id       = checkVariation();
		var gtm_quantity = checkQuantity();
		var gtm_price    = checkPrice();

		var accessoriesAll       = checkAccessories(); // Retrieve all of our accessory truthy / falsey variables, then ..
		var bluetoothHeadsetCost = accessoriesAll[3]; // .. segment bluetooth headset cost variable ..
		var usbHeadsetCost       = accessoriesAll[4]; // .. segment bluetooth headset cost variable ..
		var powermicCost         = accessoriesAll[5]; // .. segment powermic cost variable.

		// [1]
		var bluetoothHeadset = {
			id:       '307076500',
			name:     'Dragon Bluetooth Wireless Headset',
			price:    bluetoothHeadsetCost,
			brand:    'Dragon',
			category: 'Headset',
			quantity: 1 // The quantity will always be 1 when added to the basket.
		};

		// [2]
		var usbHeadset = {
			id:       '5089594000',
			name:     'Dragon USB Headset',
			price:    usbHeadsetCost,
			brand:    'Dragon',
			category: 'Headset',
			quantity: 1 // The quantity will always be 1 when added to the basket.
		};

		// [3]
		var powermic = {
			id:       '5056167100',
			name:     'PowerMic',
			price:    powermicCost,
			brand:    'Dragon',
			category: 'Headset',
			quantity: 1 // The quantity will always be 1 when added to the basket.
		};

		// [4]
		var product = {
			'name':     gtm_pageName,
			'id':       gtm_id,
			'price':    gtm_price,
			'brand':    gtm_brand,
			'category': gtm_category,
			'variant':  gtm_variant,
			'quantity': gtm_quantity
		};

		return [product, bluetoothHeadset, usbHeadset, powermic];
	}
	dataStructure();

	// ** Now define our action list, then call the relevant functions in order to pass our data to the dataLayer for viewing in GTM and GA. **

	// ** Action list.
	// [1] AddToCart script triggers.
	// [2] Accessories Checkbox script triggers.

	// [1]
	document.querySelector('.bt-buynow').addEventListener("click", gtmAddToCart);
	document.querySelector('.windows-text').addEventListener("click", gtmAddToCart); // TODO: Delete dummy actions.
	document.querySelector('.fixed-size').addEventListener("click", gtmAddToCart); // TODO: Delete dummy actions.
	
	// [2]
	const USBHeadsetCheckbox       = document.querySelector('.usb-head-cb');
	const bluetoothHeadsetCheckbox = document.querySelector('.b-head-cb');
	const powermicCheckbox         = document.querySelector('.p-mic-cb');

	if ( USBHeadsetCheckbox ) {
		USBHeadsetCheckbox.addEventListener("click", gtmUSBHeadsetCheck); // Trigger USBHeadsetCheck script.
	}
	if ( bluetoothHeadsetCheckbox ) {
		bluetoothHeadsetCheckbox.addEventListener("click", gtmBluetoothHeadsetCheck); // Trigger BluetoothHeadsetCheck script.
	}
	if ( powermicCheckbox ) {
		powermicCheckbox.addEventListener("click", gtmPowermicCheck); // Trigger PowermicCheck script.
	}

	// Function list.
	// [1] gtmAddToCart() - This function handles the retrieval and dataLayer push of the combination of user product selection, at the time of calling.
	// [2] checkboxPush(), gtmBluetoothHeadsetCheck(), gtmUSBHeadsetCheck(), gtmPowermicCheck() - These functions push an accessory object to the dataLayer depending on the checkbox selected.

	// [1]
	function gtmAddToCart() {

		// *** Retrieve our dynamic variables from functions outside of block scope. ***
		var gtm_currencyCode = checkCurrency(); // Retrieve currency code.

		var accessoriesAll              = checkAccessories(); // Retrieve all of our accessory truthy / falsey variables, then ..
		var accessoriesBluetoothHeadset = accessoriesAll[0]; // .. segment bluetooth headset variable ..
		var accessoriesUSBHeadset       = accessoriesAll[1]; // .. segment USB headset variable ..
		var accessoriesPowermic         = accessoriesAll[2]; // .. segment powermic variable.

		var productsAll              = dataStructure(); // Retrieve our data structure, then ..
		var productsPrimary          = productsAll[0]; // .. segment primary product structure ..
		var productsBluetoothHeadset = productsAll[1]; // .. segment bluetooth headset structure ..
		var productsUSBHeadset       = productsAll[2]; // .. segment USB headset structure ..
		var productsPowermic         = productsAll[3]; // .. segment powermic structure.

		// *** Combination: Powermic & Bluetooth Headset.
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

		// *** Combination: USB & Bluetooth Headset.
		else if (accessoriesUSBHeadset && accessoriesBluetoothHeadset) {
			dataLayer.push({
				'event': 'addToCart',
				'ecommerce': {
					'currencyCode': gtm_currencyCode,
					'add': {
						'products': [
							productsPrimary,
							productsBluetoothHeadset,
							productsUSBHeadset
						]
					}
				}
			});
		}

		// *** Combination: USB & Powermic.
		else if (accessoriesUSBHeadset && accessoriesPowermic) {
			dataLayer.push({
				'event': 'addToCart',
				'ecommerce': {
					'currencyCode': gtm_currencyCode,
					'add': {
						'products': [
							productsPrimary,
							productsPowermic,
							productsUSBHeadset
						]
					}
				}
			});
		}

		// *** Combination: Bluetooth Headset only.
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
		// *** Combination: USB Headset only.
		else if (accessoriesUSBHeadset) {
			dataLayer.push({
				'event': 'addToCart',
				'ecommerce': {
					'currencyCode': gtm_currencyCode,
					'add': {
						'products': [
							productsPrimary,
							productsUSBHeadset
						]
					}
				}
			});
		}
		// *** Combination: Powermic only.
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
		// *** Combination: NO ACCESSORIES ADDED.
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

	// [2]
	/**
		* @param {string} currency  The user selected currency at the time of calling the function.
		* @param {Object} accessory The relevant accessory object as defined in the dataStructure function.
	*/
	function checkboxPush(currency, accessory) {
		dataLayer.push({
			'event': 'productClick',
			'ecommerce': {
				'currencyCode': currency,
				'click': {
					'actionField': {
						'list': 'Accessories check box'
					},
					'products': [
						accessory
					]
				}
			}
		});
		console.log('dataLayer successfully pushed');
	}
	
	// Function to pass the Bluetooth Headset data structure into the checkboxPush function.
	function gtmBluetoothHeadsetCheck() {
		// *** Retrieve our dynamic variables from functions outside of block scope. ***
		var gtm_currencyCode         = checkCurrency(); // Retrieve currency code.
		var productsAll              = dataStructure(); // Retrieve our data structure, then ..
		var productsBluetoothHeadset = productsAll[1]; // .. segment bluetooth headset structure ..

		// Only push to the data layer if the checkbox is checked.
		const bluetoothHeadsetCheckbox = document.querySelector('.b-head-cb');
		if (bluetoothHeadsetCheckbox.checked) {
			checkboxPush(gtm_currencyCode, productsBluetoothHeadset);
		}
	}

	// Function to pass the USB Headset data structure into the checkboxPush function.
	function gtmUSBHeadsetCheck() {
		// *** Retrieve our dynamic variables from functions outside of block scope. ***
		var gtm_currencyCode   = checkCurrency(); // Retrieve currency code.
		var productsAll        = dataStructure(); // Retrieve our data structure, then ..
		var productsUSBHeadset = productsAll[2]; // .. segment USB headset structure ..

		// Only push to the data layer if the checkbox is checked.
		const USBHeadsetCheckbox  = document.querySelector('.usb-head-cb');
		if (USBHeadsetCheckbox.checked) {
			checkboxPush(gtm_currencyCode, productsUSBHeadset);
		}
	}

	// Function to pass the Powermic data structure into the checkboxPush function.
	function gtmPowermicCheck() {
		// *** Retrieve our dynamic variables from functions outside of block scope. ***
		var gtm_currencyCode   = checkCurrency(); // Retrieve currency code.
		var productsAll        = dataStructure(); // Retrieve our data structure, then ..
		var productsPowermic   = productsAll[3]; // .. segment bluetooth headset structure ..

		// Only push to the data layer if the checkbox is checked.
		const powermicCheckbox = document.querySelector('.p-mic-cb');
		if (powermicCheckbox.checked) {
			checkboxPush(gtm_currencyCode, productsPowermic);
		}
	}
});