/**
 * Google Tag Manager Data Layer.
 * 
 * This file handles the capture and push of product data to the Google dataLayer for use in Google Tag Manager and Google Analytics.
 * 
 * @link https://shop.nuance.com/
 * @author Extnsv <dev@extnsv.com>
 * @version 1.0.0
 *
 * The events we capture are as below:
 * Product Click
 * Product View
 * Add to shopping cart
 * Accessories checkbox selection.
 *
 * Loaded after functionality scripts in order to read correct variable values and use. EG price calculation, currency selection.
 * The functions necessary for successful push to the dataLayer read the value at the time of calling, of element id's and class names. This means that although written to be used on other locales, the id's and class names must also match.
*/

document.addEventListener( "DOMContentLoaded", function ( event ) {

	// Initialize and Notify script has been loaded successfully.
	window.dataLayer = window.dataLayer || [];
	console.log( 'UK Data layer script loaded successfully' );

	// **  Define static variables to be used by specific pages.
	// [1] Dragon Professional Individual page
	const DRAGON_PROFESSIONAL = document.getElementById( "dragon-professional" );
	// [2] Dragon Home page
	const DRAGON_HOME         = document.getElementById( "dragon-home" );
	// [3] Dragon Legal page
	const DRAGON_LEGAL        = document.getElementById( "dragon-legal" );
	// [4] Dragon Anywhere page
	const DRAGON_ANYWHERE     = document.getElementById( "dragon-anywhere" );
	// [5] Dragon Bluetooth Headset
	const BLUETOOTH_HEADSET   = document.getElementById( "bluetooth-headset" );
	// [6] Dragon USB Headset
	const USB_HEADSET         = document.getElementById( "usb-headset" );
	// [7] Dragon Powermic 2
	const POWERMIC_2          = document.getElementById( "powermic2" );
	// [8] Dragon Powermic 3
	const POWERMIC_3          = document.getElementById( "powermic3" );
	// [9] Office Runner
	const OFFICE_RUNNER       = document.getElementById( "office-runner" );
	// [10] Pocket Memo
	const POCKET_MEMO         = document.getElementById( "pocket-memo" );
	// [11] Speech Mike
	const SPEECH_MIKE         = document.getElementById( "speech-mike" );
	// [12] Home
	const HOME                = document.getElementById( "home" );
	// [13] Dragon Executive USB Headset
	const EXEC_USB_HEADSET    = document.getElementById( "exec-usb-headset" );

	// Secondary static variable to check if page is healthcare page or not. Because healthcare and non-healthcare pages share the same body id, we must do a second check to determine page type.
	const HEALTHCARE = document.querySelector( ".healthcare" );

	// [1]
	if ( DRAGON_PROFESSIONAL ) {
		// Define static variables.
		var gtm_pageNameVariationStandard = 'Dragon Professional Individual 15 GB EN Digital';
		var gtm_pageNameVariationWireless = 'Dragon Professional Individual 15 GB EN Wireless Physical';
		var gtm_pageNameVariationUpgrade  = 'Dragon Professional Individual 15 GB EN Upgrade Digital';

		var gtm_brand    = 'Dragon';
		var gtm_category = 'Software';
		var gtm_variant  = 'Perpetual';

		// Define variation pid's.
		var pid_standard = '5060841900';
		var pid_wireless = '5063426500';
		var pid_upgrade  = '5063426300';
	}

	// [2]
	if ( DRAGON_HOME ) {
		// Define static variables.
		gtm_pageNameVariationStandard = 'Dragon Home 15 GB EN Digital';
		gtm_pageNameVariationWireless = 'Dragon Home 15 GB EN Wireless Digital';

		gtm_brand    = 'Dragon';
		gtm_category = 'Software';
		gtm_variant  = 'Perpetual';

		// Define variation pid's.
		pid_standard = '5216761800';
		pid_wireless = '5363858300';
	}

	// [4]
	if ( DRAGON_ANYWHERE ) {
		// Define static variables.
		gtm_pageNameVariationStandard  = 'Dragon Anywhere GB - New - 12 month';
		gtm_pageNameVariation1Month    = 'Dragon Anywhere GB - New - 1 month';
		gtm_pageNameVariationFreeTrial = 'Dragon Anywhere GB - New - 7 day trial';

		gtm_brand    = 'Dragon';
		gtm_category = 'Software';
		gtm_variant  = 'Subscription';

		// Define variation pid's.
		pid_standard       = '5290763100';
		var pid_monthly    = '5290762900';
		var pid_free_trial = '5290762800';	
	}

	// [5]
	if ( BLUETOOTH_HEADSET ) {
		// Define static variables.
		gtm_pageName = 'Dragon Bluetooth Headset GB';
		gtm_brand    = 'Dragon';
		gtm_category = 'Hardware';
		gtm_variant  = '0';

		// Define variation pid's.
		pid_standard = '307600100';

		if ( HEALTHCARE ) {
			// Redefine healthcare variation variables.
			gtm_pageName = 'NA';
			pid_standard = 'NA';
		}
	}

	// [6]
	if ( USB_HEADSET ) {
		// Define static variables.
		gtm_pageName = 'Dragon USB Headset GB';
		gtm_brand    = 'Dragon';
		gtm_category = 'Hardware';
		gtm_variant  = '0';

		// Define variation pid's.
		pid_standard = '254178900';

		if ( HEALTHCARE ) {
			// Redefine healthcare variation variables.
			gtm_pageName = 'NA';
			pid_standard = 'NA';
		}
	}

	// [8]
	if ( POWERMIC_3 ) {
		// Define static variables.
		gtm_pageNameVariationStandard = 'Nuance PowerMic III GB 3ft cord';
		gtm_pageNameVariationLongCord = 'Nuance PowerMic III GB 9ft cord';

		gtm_brand    = 'Dragon';
		gtm_category = 'Hardware';
		gtm_variant  = '0';

		// Define variation pid's
		gtm_pageName           = 'Dragon Powermic 3';
		var pid_3ft_nondiag_10 = '5075815400'; // 3ft, non diag.
		var pid_9ft_nondiag_10 = '5075815500'; // 9ft, non diag.

		// Redefine healthcare variation variables.
		// We have 12 product ID's (PIDS) for the Powermic 3 accessory to account for the different price bands that are determined by user selection of the length of the accessory, the variation, and the quantity.
		if ( HEALTHCARE ) {
			gtm_pageName = 'Dragon Powermic 3 For Healthcare';

			pid_9ft_nondiag_10     = 'NA'; // 9ft, non diag, 10 or less.
			var pid_9ft_nondiag_25 = 'NA'; // 9ft, non diag, 11-25.
			var pid_9ft_nondiag_50 = 'NA'; // 9ft, non diag, 26-50.

			var pid_9ft_diag_10 = 'NA'; // 9ft, diag, 10 or less.
			var pid_9ft_diag_25 = 'NA'; // 9ft, diag, 11-25.
			var pid_9ft_diag_50 = 'NA'; // 9ft, diag, 26-50.

			pid_3ft_nondiag_10     = 'NA'; // 3ft, non diag, 10 or less.
			var pid_3ft_nondiag_25 = 'NA'; // 3ft, non diag, 11-25.
			var pid_3ft_nondiag_50 = 'NA'; // 3ft, non diag, 26-50.

			var pid_3ft_diag_10 = 'NA'; // 3ft, diag, 10 or less.
			var pid_3ft_diag_25 = 'NA'; // 3ft, diag, 11-25.
			var pid_3ft_diag_50 = 'NA'; // 3ft, diag, 26-50.
		}
	}

	// ** Call functions to generate our static page name variables.
	// [1] Check version parameter and assign correct value to gtm_pageName.
	// [2] Call function when user changes variation selection and assign correct value to gtm_pageName.

	// [1]
	const VARIATION_SELECT = document.getElementById( "variation-dh" );
	if ( VARIATION_SELECT ) {
		paramCheck();
	}

	// [2]
	if ( VARIATION_SELECT ) {
		VARIATION_SELECT.onchange = function (event) {
			if ( this.value == "standard" || this.value == "full" ) {
				gtm_pageName = gtm_pageNameVariationStandard;
			}
			if ( this.value == "wireless" ) {
				gtm_pageName = gtm_pageNameVariationWireless;
			}
			if ( this.value == "upgrade" ) {
				gtm_pageName = gtm_pageNameVariationUpgrade;
			}

			/* 
			 * Some pages use numbers as the variation value so we must
			   account for this, on a page by page basis.
			 */
			if ( DRAGON_ANYWHERE ) {
				if ( this.value == "1" ) {
					gtm_pageName = gtm_pageNameVariation1Month;
				}
				if ( this.value == "3" ) {
					gtm_pageName = gtm_pageNameVariationStandard;
				}
				if ( this.value == "free-trial" ) {
					gtm_pageName = gtm_pageNameVariationFreeTrial;
				}
			}
			
			if ( POWERMIC_3 ) {
				if ( this.value == "1" ) {
					gtm_pageName = gtm_pageNameVariationStandard;
				}
				if ( this.value == "2" ) {
					gtm_pageName = gtm_pageNameVariationLongCord;
				}
			}
		}
	};

	/**
	 * Actions taken when version? parameter is equal to different strings.
	 */
	function paramCheck() {
		var e = getParameterByName( "version" );
		if ( "" == e || "standard" == e ) {
			gtm_pageName = gtm_pageNameVariationStandard;
		}
		if ( "wireless" == e ) {
			gtm_pageName = gtm_pageNameVariationWireless;
		}
		if ( "upgrade" == e ) {
			gtm_pageName = gtm_pageNameVariationUpgrade;
		}
	}


	// ** Call functions to generate our dynamic variables are calculated depending on user selection, eg price.
	// [1] Generate variable for currency.
	// [2] Generate variable for variation.
	// [3] Generate variable for quantity.
	// [4] Generate variable for price.
	// [5] Generate variables for accessories.
	// [6] Target Parameter by name

	/**
	 * [1] Functionality to detect currency and define variable for use in dataLayer.
	 * 
	 * @returns {string} Return currency value as a string.
	 */
	function checkCurrency() {
		let gtm_currencyCode = document.getElementById( 'currency' ).value;
		return gtm_currencyCode;
	}

	/**
	 * [2] Functionality to detect variation selection and define variable for use in dataLayer.
	 * 
	 * @returns {string} Return Product ID (pid) depending on conditions met.
	 */
	function checkVariation() {
		// Check the variation containers being used before reading internal value as they slightly differ on each page in older site versions.
		let pageIsHome              = document.getElementById( "home" );
		let pageIsHealthcare        = document.getElementById( "healthcare" );
		let variation               = document.getElementById( "select2-variation-container" ); // Class used for the standard products and accessories with a variation selector.
		let variationDragonHome     = document.getElementById( "select2-variation-dh-container" ); // Dragon Home ID Variation
		let variationDragonLegal    = document.getElementById( "select2-variation-dl-container" ); // Dragon Legal ID Variation
		let variationDragonAnywhere = document.getElementById( "select2-variation-da-container" ); // Dragon Anywhere ID Variation
		let outOfStock              = document.getElementById( "oos-email" );
		let variationAccessory      = document.getElementsByClassName( "variation-grey" );
		

		// Get variation selectors for usage when there are multiple product id's (PIDS) for different variations. EG healthcare powermic 3 the pid changes depending on variation and quantity selected.
		let solutionSelect = document.getElementById( 'diagnostic' );
		let quantitySelect = document.getElementById( 'quantity' );

		// Check if elements exist, then get the selected product lowercase value for use.
		if ( pageIsHome || pageIsHealthcare ) {
			var variationRendered = ''; // Save empty variable if page is home page or healthcare home page because there is no buy box selection functionality, and would throw an error if the var is not defined.
		} else if ( variation ) {
			variationRendered = variation.textContent;
		} else if ( variationDragonHome ) {
			variationRendered = variationDragonHome.textContent;
		} else if ( variationDragonLegal ) {
			variationRendered = variationDragonLegal.textContent;
		} else if ( variationDragonAnywhere ) {
			variationRendered = variationDragonAnywhere.textContent;
		} else if ( variationAccessory.length > 0 ) {
			variationRendered = variationAccessory[ 0 ].textContent;
		} else {
			variationRendered = 'novariation'
		}

		var variationRenderedLower = variationRendered.toLowerCase().replace( /\s+/g, '' ); // Convert to lowercase string and strip out any empty spaces before using.

		if ( variationRenderedLower == 'standard' ) {
			var gtm_id = pid_standard;
		} else if ( variationRenderedLower == 'wireless' ) {
			gtm_id = pid_wireless;
		} else if ( variationRenderedLower == 'upgrade' ) {
			gtm_id = pid_upgrade;
		} else if ( variationRenderedLower == 'upgradefromlegal12' ) {
			gtm_id = pid_upgrade_legal;
		} else if ( variationRenderedLower == 'spanish' ) {
			gtm_id = pid_spanish;
		} else if ( variationRenderedLower == 'french' ) {
			gtm_id = pid_french;
		} else if ( variationRenderedLower == 'yearlysubscription' ) {
			gtm_id = pid_standard;
		} else if ( variationRenderedLower == 'monthlysubscription' ) {
			gtm_id = pid_monthly;
		} else if ( variationRenderedLower == '1weekfreetrial' ) {
			gtm_id = pid_free_trial;
		} else if ( variationRenderedLower == 'bluetoothheadset' || variationRenderedLower == 'bluetooth' ) { // Accessory: Bluetooth headset single pid.
			gtm_id = pid_standard;
		} else if ( variationRenderedLower == 'usbheadset' || variationRenderedLower == 'usb' ) { // Accessory: USB headset single pid.
			gtm_id = pid_standard;
		} else if ( variationRenderedLower == 'withoutscanner' ) { // Accessory: Powermic 2 with scanner pid.
			gtm_id = pid_standard;
		} else if ( variationRenderedLower == 'withscanner' ) { // Accessory: Powermic 2 without scanner pid.
			gtm_id = pid_standard_scanner;
		} else if ( variationRenderedLower == 'powermic9ftcord' || variationRenderedLower == '9ftcord' ) { // Accessory: Powermic 3 9ft.
			if ( HEALTHCARE ) {
				// If solution selection value is non-diagnostic..
				if ( solutionSelect.value == 'non-diagnostic' ) {
					if ( quantitySelect.value < 11 ) { // 9ft, non diag, 10 or less.
						gtm_id = pid_9ft_nondiag_10;
					} else if ( quantitySelect.value > 10 && quantitySelect.value < 26 ) { // 9ft, non diag, 11 - 25.
						gtm_id = pid_9ft_nondiag_25;
					} else if ( quantitySelect.value > 25 && quantitySelect.value < 51 ) { // 9ft, non diag, 26 - 50.
						gtm_id = pid_9ft_nondiag_50;
					}
				} else { // If solution selection value is diagnostic..
					if ( quantitySelect.value < 11 ) { // 9ft, diag, 10 or less.
						gtm_id = pid_9ft_diag_10;
					} else if ( quantitySelect.value > 10 && quantitySelect.value < 26 ) { // 9ft, diag, 11 - 25.
						gtm_id = pid_9ft_diag_25;
					} else if ( quantitySelect.value > 25 && quantitySelect.value < 51 ) { // 9ft, diag, 26 - 50.
						gtm_id = pid_9ft_diag_50;
					}
				}
			} else {
				gtm_id = pid_9ft_nondiag_10;
			}
		} else if ( variationRenderedLower == 'powermic3ftcord' || variationRenderedLower == '3ftcord' ) { // Accessory: Powermic 3 3ft.
			if ( HEALTHCARE ) {
				// If solution selection value is non-diagnostic..
				if ( solutionSelect.value == 'non-diagnostic' ) {
					if ( quantitySelect.value < 11 ) { // 3ft, non diag, 10 or less.
						gtm_id = pid_3ft_nondiag_10;
					} else if ( quantitySelect.value > 10 && quantitySelect.value < 26 ) { // 3ft, non diag, 11 - 25.
						gtm_id = pid_3ft_nondiag_25;
					} else if ( quantitySelect.value > 25 && quantitySelect.value < 51 ) { // 3ft, non diag, 26 - 50.
						gtm_id = pid_3ft_nondiag_50;
					}
				} else { // If solution selection value is non-diagnostic..
					if ( quantitySelect.value < 11 ) { // 3ft, diag, 10 or less.
						gtm_id = pid_3ft_diag_10;
					} else if ( quantitySelect.value > 10 && quantitySelect.value < 26 ) { // 3ft, diag, 11 - 25.
						gtm_id = pid_3ft_diag_25;
					} else if ( quantitySelect.value > 25 && quantitySelect.value < 51 ) { // 3ft, diag, 26 - 50.
						gtm_id = pid_3ft_diag_50;
					}
				}
			} else {
				gtm_id = pid_3ft_nondiag_10;
			}
		} else if ( variationRenderedLower == 'officerunner' ) { // Accessory: Office Runner.
			gtm_id = pid_standard;
		} else if ( variationRenderedLower == 'pocketmemo' ) { // Accessory: Pocket Memo.
			gtm_id = pid_standard;
		} else if ( variationRenderedLower == 'speechmike' ) { // Accessory: Speech Mike.
			gtm_id = pid_standard;
		}  else {
			gtm_id = pid_standard;
		}
		return gtm_id;
	}
	checkVariation();

	/**
	 * [3] Functionality to detect quantity selection and define variable for use in dataLayer.
	 * 
	 * @returns {number} Return Product ID (pid) depending on conditions met.
	 */
	function checkQuantity() {
		let gtm_quantity_str = document.getElementById( 'quantity' );
		if ( gtm_quantity_str ) {
			var gtm_quantity_value = gtm_quantity_str.value;
		}
		var gtm_quantity = parseInt( gtm_quantity_value );
		return gtm_quantity;
	}
	checkQuantity();

	/**
	 * [4] Functionality to detect calculated priceand define variable for use in dataLayer.
	 * 
	 * @returns {string} Return price of selection.
	 */
	function checkPrice() {
		let gtm_price_element = document.getElementsByClassName( "value" )[ 0 ];
		if ( gtm_price_element ) {
			var gtm_price = gtm_price_element.innerText;
		}
		return gtm_price;
	}
	checkPrice();

	/**
	 * [5] Functionality to detect if checkboxes are checked.
	 * 
	 * @returns {(boolean|boolean|boolean|string|string|string)} Returns true or false depending on if checkboxes checked or not. Returns cost of accessory add ons as string.
	 */
	function checkAccessories() {

		let gtm_currencyCode = checkCurrency(); // Pull in currency code.

		// Bluetooth Headset
		let bhs = document.querySelector( '.b-head-cb' );
		if ( bhs ) {
			if ( bhs.checked ) {
				var addBluetoothHeadset = true;
			} else {
				addBluetoothHeadset = false;
			}
		}

		// USB Headset
		let usb = document.querySelector( '.usb-head-cb' );
		if ( usb ) {
			if ( usb.checked ) {
				var addUSBHeadset = true;
			} else {
				addUSBHeadset = false;
			}
		}

		// Powermic
		let pm = document.querySelector( '.p-mic-cb' );
		if ( pm ) {
			if ( pm.checked ) {
				var addPowermic = true;
			} else {
				addPowermic = false;
			}
		}

		// Prices
		if ( gtm_currencyCode == 'GBP' ) {
			if ( bhs ) {
				var bluetoothHeadsetCost = bhs.getAttribute( "data-gbp" );
			}
			if ( usb ) {
				var usbHeadsetCost = usb.getAttribute( "data-gbp" );
			}
			if ( pm ) {
				var powermicCost = pm.getAttribute( "data-gbp" );
			}
		} else if ( gtm_currencyCode == 'EUR' ) {
			if ( bhs ) {
				bluetoothHeadsetCost = bhs.getAttribute( "data-euro" );
			}
			if ( usb ) {
				usbHeadsetCost = usb.getAttribute( "data-euro" );
			}
			if ( pm ) {
				powermicCost = pm.getAttribute( "data-euro" );
			}
		} else if ( gtm_currencyCode == 'DKK' ) {
			if ( bhs ) {
				bluetoothHeadsetCost = bhs.getAttribute( "data-dkk" );
			}
			if ( usb ) {
				usbHeadsetCost = usb.getAttribute( "data-dkk" );
			}
			if ( pm ) {
				powermicCost = pm.getAttribute( "data-dkk" );
			}
		} else if ( gtm_currencyCode == 'NOK' ) {
			if ( bhs ) {
				bluetoothHeadsetCost = bhs.getAttribute( "data-nok" );
			}
			if ( usb ) {
				usbHeadsetCost = usb.getAttribute( "data-nok" );
			}
			if ( pm ) {
				powermicCost = pm.getAttribute( "data-nok" );
			}
		} else if ( gtm_currencyCode == 'SEK' ) {
			if ( bhs ) {
				bluetoothHeadsetCost = bhs.getAttribute( "data-sek" );
			}
			if ( usb ) {
				usbHeadsetCost = usb.getAttribute( "data-sek" );
			}
			if ( pm ) {
				powermicCost = pm.getAttribute( "data-sek" );
			}
		} else {
			if ( bhs ) {
				bluetoothHeadsetCost = bhs.getAttribute( "data-us" );
			}
			if ( usb ) {
				usbHeadsetCost = usb.getAttribute( "data-us" );
			}
			if ( pm ) {
				powermicCost = pm.getAttribute( "data-us" );
			}
		}
		return [ addBluetoothHeadset, addUSBHeadset, addPowermic, bluetoothHeadsetCost, usbHeadsetCost, powermicCost ];
	}

	/**
	 * [6] Target parameter by its name.
	 * 
	 * @param {string} e A parameter name, passed in as a string.
	 */
	function getParameterByName( e ) {
		e = e.replace( /[\[]/, "\\[" ).replace( /[\]]/, "\\]" );
		var r = new RegExp( "[\\?&]" + e + "=([^&#]*)" ).exec( location.search );
		return null == r ? "" : decodeURIComponent( r[ 1 ].replace( /\+/g, " " ) );
	}


	/**
	 * Store the data structure in a function, written with the help of the page specific variables as defined above.
	 * 
	 * [1] Bluetooth headset
	 * [2] USB headset
	 * [3] PowerMic 3
	 * [4] The primary product
	 * 
	 * @returns {Object} Returns product object to be used in dataLayer push.
	 */
	function dataStructure() {
		let gtm_id       = checkVariation();
		let gtm_quantity = checkQuantity();
		let gtm_price    = checkPrice();

		let accessoriesAll       = checkAccessories(); // Retrieve all of our accessory truthy / falsey variables, then ..
		let bluetoothHeadsetCost = accessoriesAll[ 3 ]; // .. segment bluetooth headset cost variable ..
		let usbHeadsetCost       = accessoriesAll[ 4 ]; // .. segment bluetooth headset cost variable ..
		let powermicCost         = accessoriesAll[ 5 ]; // .. segment powermic cost variable.

		// [1]
		var bluetoothHeadset = {
			id:       '307076500',
			name:     'Dragon Bluetooth Headset GB',
			price:    bluetoothHeadsetCost,
			brand:    'Dragon',
			category: 'Hardware',
			quantity: 1 // The quantity will always be 1 when added to the basket.
		};

		// [2]
		var usbHeadset = {
			id:       '254178900',
			name:     'Dragon USB Headset GB',
			price:    usbHeadsetCost,
			brand:    'Dragon',
			category: 'Hardware',
			quantity: 1 // The quantity will always be 1 when added to the basket.
		};

		// [3]
		var powermic = {
			id:       '5075815400',
			name:     'Nuance PowerMic III GB 3ft cord',
			price:    powermicCost,
			brand:    'Dragon',
			category: 'Hardware',
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

		return [ product, bluetoothHeadset, usbHeadset, powermic ];
	}

	if ( ! HOME ) {
		dataStructure();
	}

	// ** Action list - Now define our action list, then call the relevant functions in order to pass our data to the dataLayer for viewing in GTM and GA. **
	// [1] AddToCart script triggers.
	// [2] Accessories Checkbox script triggers.
	// [3] Product view script - triggered on page load on all pages apart from home.
	// [4] Product click script - triggered on click of product 'find out more' button on home page.

	// [1]
	const BUY_NOW_BUTTON = document.querySelector( '.bt-buynow' );
	// const WINDOWS_TEXT   = document.querySelector( '.windows-text' ); // CONST Declaration for testing purposes, see below.
	// const PRODUCT_IMAGE  = document.querySelector( '.fixed-size' ); // CONST Declaration for testing purposes, see below.

	if ( BUY_NOW_BUTTON ) {
		BUY_NOW_BUTTON.addEventListener( "click", gtmAddToCart );
	}
	// if ( WINDOWS_TEXT ) {
	// 	WINDOWS_TEXT.addEventListener( "click", gtmAddToCart ); // Dummy actions for testing purposes.
	// }
	// if ( PRODUCT_IMAGE ) {
	// 	PRODUCT_IMAGE.addEventListener( "click", gtmAddToCart ); // Dummy actions for testing purposes.
	// }

	// [2]
	const USB_HEADSET_CHECKBOX       = document.querySelector( '.usb-head-cb' );
	const BLUETOOTH_HEADSET_CHECKBOX = document.querySelector( '.b-head-cb' );
	const POWERMIC_CHECKBOX          = document.querySelector( '.p-mic-cb' );

	if ( USB_HEADSET_CHECKBOX ) {
		USB_HEADSET_CHECKBOX.addEventListener( "click", gtmUSBHeadsetCheck ); // Trigger USBHeadsetCheck script.
	}
	if ( BLUETOOTH_HEADSET_CHECKBOX ) {
		BLUETOOTH_HEADSET_CHECKBOX.addEventListener( "click", gtmBluetoothHeadsetCheck ); // Trigger BluetoothHeadsetCheck script.
	}
	if ( POWERMIC_CHECKBOX ) {
		POWERMIC_CHECKBOX.addEventListener( "click", gtmPowermicCheck ); // Trigger PowermicCheck script.
	}

	// [3]
	if ( HOME == null ) {
		gtmProductView();
	}

	// [4]
	const BUTTON_DRAGON_HOME           = document.querySelectorAll( '.gtm-button-dragon-home' );
	const BUTTON_DRAGON_PRO            = document.querySelectorAll( '.gtm-button-dragon-pro' );
	const BUTTON_DRAGON_ANYWHERE       = document.querySelectorAll( '.gtm-button-dragon-anywhere' );

	if ( BUTTON_DRAGON_HOME ) {
		BUTTON_DRAGON_HOME.forEach( item => {	
			item.addEventListener( 'click', event => {
				// event.stopPropagation(); // Dummy function for testing purposes in order to view dataLayer push without being redirected.
				// event.preventDefault(); // Dummy function for testing purposes in order to view dataLayer push without being redirected.
				// helper        ' title '      ' id '        'usd', 'cad', 'gbp', 'eur', 'chf', 'dkk', 'nok', 'sek', 'aus', 'nz'
				gtmProductClick( 'Dragon Home 15 GB EN Digital', '5217991100', '179.99', '', '139.99', '159', '', '1160', '1500', '1650', '', '' );
			} )
		} );
	}
	if ( BUTTON_DRAGON_PRO ) {
		BUTTON_DRAGON_PRO.forEach( item => {	
			item.addEventListener( 'click', event => {
				// event.stopPropagation(); // Dummy function for testing purposes in order to view dataLayer push without being redirected.
				// event.preventDefault(); // Dummy function for testing purposes in order to view dataLayer push without being redirected.
				// helper        ' title '                         ' id '        'usd', 'cad', 'gbp', 'eur', 'chf', 'dkk', 'nok', 'sek', 'aus', 'nz'
				gtmProductClick( 'Dragon Professional Individual 15 GB EN Digital', '5065051500', '449.99', '', '349.99', '399', '', '2960', '3680', '3770', '', '' );
			} )
		} );
	}
	if ( BUTTON_DRAGON_ANYWHERE ) {
		BUTTON_DRAGON_ANYWHERE.forEach( item => {	
			item.addEventListener( 'click', event => {
				// event.stopPropagation(); // Dummy function for testing purposes in order to view dataLayer push without being redirected.
				// event.preventDefault(); // Dummy function for testing purposes in order to view dataLayer push without being redirected.
				// helper        ' title '          ' id '        'usd', 'cad', 'gbp', 'eur', 'chf', 'dkk', 'nok', 'sek', 'aus', 'nz'
				gtmProductClick( 'Dragon Anywhere GB - New - 12 month', '330332800', '150', '', '109.99', '150', '', '999', '1299', '1399', '', '' );
			} )
		} );
	}

	// •• Function list. ••
	// [1] gtmAddToCart() - This function handles the retrieval and dataLayer push of the combination of user product selection, at the time the the user is directed to the shopping cart page.
	// [2] checkboxPush(), gtmBluetoothHeadsetCheck(), gtmUSBHeadsetCheck(), gtmPowermicCheck() - These functions push an accessory object to the dataLayer depending on the checkbox selected.
	// [3] gtmProductView() - This function handles the retrieval and dataLayer push of the product seen at first page view.
	// [4] gtmProductClick()

	/**
	 * [1]
	 */
	function gtmAddToCart() {
		// *** Retrieve our dynamic variables from functions outside of block scope. ***
		let gtm_currencyCode = checkCurrency(); // Retrieve currency code.

		let accessoriesAll              = checkAccessories(); // Retrieve all of our accessory truthy / falsey variables, then ..
		let accessoriesBluetoothHeadset = accessoriesAll[ 0 ]; // .. segment bluetooth headset variable ..
		let accessoriesUSBHeadset       = accessoriesAll[ 1 ]; // .. segment USB headset variable ..
		let accessoriesPowermic         = accessoriesAll[ 2 ]; // .. segment powermic variable.

		let productsAll              = dataStructure(); // Retrieve our data structure, then ..
		let productsPrimary          = productsAll[ 0 ]; // .. segment primary product structure ..
		let productsBluetoothHeadset = productsAll[ 1 ]; // .. segment bluetooth headset structure ..
		let productsUSBHeadset       = productsAll[ 2 ]; // .. segment USB headset structure ..
		let productsPowermic         = productsAll[ 3 ]; // .. segment powermic structure.

		// *** Set our static variables *** //
		let eventName = 'addToCart';

		// *** Combination: Powermic & Bluetooth Headset.
		if ( accessoriesPowermic && accessoriesBluetoothHeadset ) {
			dataLayer.push( { // eslint-disable-line no-undef
				'event': eventName,
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
			} );
		}
		// *** Combination: USB & Bluetooth Headset.
		else if ( accessoriesUSBHeadset && accessoriesBluetoothHeadset ) {
			dataLayer.push( { // eslint-disable-line no-undef
				'event': eventName,
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
			} );
		}
		// *** Combination: USB & Powermic.
		else if ( accessoriesUSBHeadset && accessoriesPowermic ) {
			dataLayer.push( { // eslint-disable-line no-undef
				'event': eventName,
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
			} );
		}
		// *** Combination: Bluetooth Headset only.
		else if ( accessoriesBluetoothHeadset ) {
			dataLayer.push( { // eslint-disable-line no-undef
				'event': eventName,
				'ecommerce': {
					'currencyCode': gtm_currencyCode,
					'add': {
						'products': [
							productsPrimary,
							productsBluetoothHeadset
						]
					}
				}
			} );
		}
		// *** Combination: USB Headset only.
		else if ( accessoriesUSBHeadset ) {
			dataLayer.push( { // eslint-disable-line no-undef
				'event': eventName,
				'ecommerce': {
					'currencyCode': gtm_currencyCode,
					'add': {
						'products': [
							productsPrimary,
							productsUSBHeadset
						]
					}
				}
			} );
		}
		// *** Combination: Powermic only.
		else if ( accessoriesPowermic ) {
			dataLayer.push( { // eslint-disable-line no-undef
				'event': eventName,
				'ecommerce': {
					'currencyCode': gtm_currencyCode,
					'add': {
						'products': [
							productsPrimary,
							productsPowermic
						]
					}
				}
			} );
		}
		// *** Combination: NO ACCESSORIES ADDED.
		else {
			dataLayer.push( { // eslint-disable-line no-undef
				'event': eventName,
				'ecommerce': {
					'currencyCode': gtm_currencyCode,
					'add': {
						'products': [
							productsPrimary
						]
					}
				}
			} );
		}
		console.log( 'dataLayer successfully pushed' );
	}

	/**
	 * [2]
	 * 
	 * @param {string} currency  The user selected currency at the time of calling the function.
	 * @param {Object} accessory The relevant accessory object as defined in the dataStructure function.
	*/
	function checkboxPush( currency, accessory ) {
		dataLayer.push( { // eslint-disable-line no-undef
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
		} );
		console.log( 'dataLayer successfully pushed' );
	}

	/**
	 * [2] [ii] 
	*/
	function gtmBluetoothHeadsetCheck() {
		// *** Retrieve our dynamic variables from functions outside of block scope. ***
		let gtm_currencyCode         = checkCurrency(); // Retrieve currency code.
		let productsAll              = dataStructure(); // Retrieve our data structure, then ..
		let productsBluetoothHeadset = productsAll[ 1 ]; // .. segment bluetooth headset structure ..

		// Only push to the data layer if the checkbox is checked.
		let bluetoothHeadsetCheckbox = document.querySelector( '.b-head-cb' );
		if ( bluetoothHeadsetCheckbox.checked ) {
			checkboxPush( gtm_currencyCode, productsBluetoothHeadset );
		}
	}

	/**
	 * [2] [iii] 
	*/
	function gtmUSBHeadsetCheck() {
		// *** Retrieve our dynamic variables from functions outside of block scope. ***
		let gtm_currencyCode   = checkCurrency(); // Retrieve currency code.
		let productsAll        = dataStructure(); // Retrieve our data structure, then ..
		let productsUSBHeadset = productsAll[ 2 ]; // .. segment USB headset structure ..

		// Only push to the data layer if the checkbox is checked.
		let USBHeadsetCheckbox = document.querySelector( '.usb-head-cb' );
		if ( USBHeadsetCheckbox.checked ) {
			checkboxPush( gtm_currencyCode, productsUSBHeadset );
		}
	}

	/**
	 * [2] [iv] 
	*/
	function gtmPowermicCheck() {
		// *** Retrieve our dynamic variables from functions outside of block scope. ***
		let gtm_currencyCode = checkCurrency(); // Retrieve currency code.
		let productsAll      = dataStructure(); // Retrieve our data structure, then ..
		let productsPowermic = productsAll[ 3 ]; // .. segment bluetooth headset structure ..

		// Only push to the data layer if the checkbox is checked.
		let powermicCheckbox = document.querySelector( '.p-mic-cb' );
		if ( powermicCheckbox.checked ) {
			checkboxPush( gtm_currencyCode, productsPowermic );
		}
	}

	/**
	 * [3]
	*/
	function gtmProductView() {
		// *** Retrieve our dynamic variables from functions outside of block scope. ***
		let gtm_currencyCode = checkCurrency(); // Retrieve currency code.
		let productsAll      = dataStructure(); // Retrieve our data structure, then ..
		let productsPrimary  = productsAll[ 0 ]; // .. segment primary product structure ..

		dataLayer.push( { // eslint-disable-line no-undef
			'ecommerce': {
				'currencyCode': gtm_currencyCode,
				'detail': {
					'products': [
						productsPrimary
					]
				}
			}
		} );
		console.log( 'dataLayer successfully pushed' );
	}

	/**
	 * [4]
	 * 
	 * @param {string} product_title The title of the clicked product, as it should appear in GTM.
	 * @param {string} product_id The id of the clicked product, as it should appear in GTM.
	 * @param {string} price_usd The price of the clicked product in the specified currency.
	 * @param {string} price_cad The price of the clicked product in the specified currency.
	 * @param {string} price_gbp The price of the clicked product in the specified currency.
	 * @param {string} price_eur The price of the clicked product in the specified currency.
	 * @param {string} price_chf The price of the clicked product in the specified currency.
	 * @param {string} price_dkk The price of the clicked product in the specified currency.
	 * @param {string} price_nok The price of the clicked product in the specified currency.
	 * @param {string} price_sek The price of the clicked product in the specified currency.
	 * @param {string} price_aus The price of the clicked product in the specified currency.
	 * @param {string} price_nz The price of the clicked product in the specified currency.
	*/
	function gtmProductClick( product_title, product_id, price_usd, price_cad, price_gbp, price_eur, price_chf, price_dkk, price_nok, price_sek, price_aus, price_nz ) {
		// *** Retrieve our dynamic variables from functions outside of block scope. ***
		let gtm_currencyCode = checkCurrency(); // Retrieve currency code.

		// *** Set our static variables *** //
		let eventName = 'productClick';
		
		if ( gtm_currencyCode == 'USD') {
			product_price = price_usd;
		}
		if ( gtm_currencyCode == 'CAD') {
			product_price = price_cad;
		}
		if ( gtm_currencyCode == 'GBP') {
			product_price = price_gbp;
		}
		if ( gtm_currencyCode == 'EUR') {
			product_price = price_eur;
		}
		if ( gtm_currencyCode == 'CHF') {
			product_price = price_chf;
		}
		if ( gtm_currencyCode == 'DKK') {
			product_price = price_dkk;
		}
		if ( gtm_currencyCode == 'NOK') {
			product_price = price_nok;
		}
		if ( gtm_currencyCode == 'SEK') {
			product_price = price_sek;
		}
		if ( gtm_currencyCode == 'AUD') {
			product_price = price_aus;
		}
		if ( gtm_currencyCode == 'NZD') {
			product_price = price_nz;
		}

		dataLayer.push( { // eslint-disable-line no-undef
			'event': eventName,
			'ecommerce': {
				'currencyCode': gtm_currencyCode,
				'click': {
					'actionField': {
						'list': 'Search Results'
					},
					'products': [ {
						'name': product_title,
						'id': product_id,
						'price': product_price,
						'brand': 'Dragon',
						'category': 'Speech Recognition',
						'variant': 'Download'
					} ]
				}
			}
		} );
		console.log( 'dataLayer successfully pushed' );
	}

} );