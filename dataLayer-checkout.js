/**
 * Google Tag Manager Data Layer ( Scripts for the cart actions ).
 * 
 * This file handles the capture and push of product data to the Google dataLayer for use in Google Tag Manager and Google Analytics.
 * 
 * @link https://shop.nuance.com/
 * @author Extnsv <dev@extnsv.com>
 * @version 1.0.0
 *
 * The events we capture are as below:
 * Cart View
 * You may be interested in click

 * Loaded after functionality scripts in order to read correct variable values and use. EG price calculation, currency selection.
 * The functions necessary for successful push to the dataLayer read the value at the time of calling, of element id's and class names. This means that although written to be used on other locales, the id's and class names must also match.
*/

document.addEventListener( "DOMContentLoaded", function ( event ) {

	// Initialize and Notify script has been loaded successfully.
	window.dataLayer = window.dataLayer || [];
	console.log( 'Data layer script loaded successfully' );

	// ** Call functions to generate our dynamic variables are calculated depending on user selection, eg price.
	// [1] Generate variable for currency.

	/**
	 * [1] Functionality to detect currency and define variable for use in dataLayer.
	 * 
	 * @returns {string} Return currency value as a string.
	 */
	function checkCurrency() {
		let gtm_currencyCode = document.getElementById( 'currencySelector' ).value;
		return gtm_currencyCode;
	}
	checkCurrency();

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

		// [1]
		var bluetoothHeadset = {
			id: '307076500',
			name: 'Dragon Bluetooth Wireless Headset',
			price: 'tbc',
			brand: 'Dragon',
			category: 'Headset',
			quantity: 1 // The quantity will always be 1 when added to the basket.
		};

		// [2]
		var usbHeadset = {
			id: '5089594000',
			name: 'Dragon USB Headset',
			price: 'tbc',
			brand: 'Dragon',
			category: 'Headset',
			quantity: 1 // The quantity will always be 1 when added to the basket.
		};

		// [3]
		var powermic = {
			id: '5056167100',
			name: 'PowerMic',
			price: 'tbc',
			brand: 'Dragon',
			category: 'Headset',
			quantity: 1 // The quantity will always be 1 when added to the basket.
		};

		// [4]
		var product = {
			'name': 'gtm_pageName',
			'id': 'gtm_id',
			'price': 'gtm_price',
			'brand': 'gtm_brand',
			'category': 'gtm_category',
			'variant': 'gtm_variant',
			'quantity': 'gtm_quantity'
		};

		return [ product, bluetoothHeadset, usbHeadset, powermic ];
	}
	dataStructure();


	// ** Action list - Now define our action list, then call the relevant functions in order to pass our data to the dataLayer for viewing in GTM and GA. **
	// [1] AddToCart script triggers.

	// [1]
	const CART_PAGE = document.getElementById( 'dr_ShoppingCart' );

	if ( CART_PAGE ) {
		gtmCartView();
	}

	// •• Function list. ••
	// [1] gtmCartView() - This function handles the retrieval and dataLayer push of the combination of user product selection, at the time the cart page loads.

	/**
	 * [1]
	 */
	function gtmCartView() {
		// *** Retrieve our dynamic variables from functions outside of block scope. ***
		let gtm_currencyCode = checkCurrency(); // Retrieve currency code.

		// *** Set our static variables *** //
		let eventName = 'cart';

		// *** We first retrieve the Digital River generated variables and store as new variables for our usage. ***
		let listids        = product_ids; // eslint-disable-line no-undef
		let listnames      = product_names; // eslint-disable-line no-undef
		let listprices     = product_list_prices; // eslint-disable-line no-undef
		let listquantities = product_quantities; // eslint-disable-line no-undef

		// *** Then we get the number of products there are by hooking into the Digital River generated variable; product_ids ***
		let productCount = listids.length;

		/**
		 * Functionality to segment raw product data output as a single array, into parts to be used as single product arrays, divided by the amount of products there are.
		 * 
		 * @returns {Object} Returns our original array by segment.
		 */
		function splitToChunks( array, parts ) {
			let result = [];
			for ( let i = parts; i > 0; i-- ) {
				result.push( array.splice( 0, Math.ceil( array.length / i ) ) );
			}
			return result;
		}

		// *** Pass the array of ID's into our function to be split up into equal chunks. ***
		let ids     = splitToChunks( listids, productCount );
		let idIndex = ids;

		// *** Pass the array of names into our function to be split up into equal chunks. ***
		let names     = splitToChunks( listnames, productCount );
		let nameIndex = names;

		// *** Pass the array of prices into our function to be split up into equal chunks. ***
		let prices     = splitToChunks( listprices, productCount );
		let priceIndex = prices;

		// *** Pass the array of quantities into our function to be split up into equal chunks. ***
		let quantities    = splitToChunks( listquantities, productCount );
		let quantityIndex = quantities;

		// *** For the amount of products there are, create the variables that we will hook into to create our final products object to be pushed to the dataLayer. ***
		for ( var i = 0; i < productCount; ++i ) {

			// *** Create our ID variables. ***
			this[ "marker" + i ] = idIndex[ i ];
			this[ "id_string_" + i ] = this[ "marker" + i ].toString();
			this[ "id_Array_" + i ] = {
				name: this[ "id_string_" + i ],
			};

			// *** Create our Name variables. ***
			this[ "marker" + i ] = nameIndex[ i ];
			this[ "name_string_" + i ] = this[ "marker" + i ].toString();
			this[ "name_Array_" + i ] = {
				id: this[ "name_string_" + i ],
			};

			// *** Create our Price variables. ***
			this[ "marker" + i ] = priceIndex[ i ];
			this[ "price_string_" + i ] = this[ "marker" + i ].toString();
			this[ "price_Array_" + i ] = {
				id: this[ "price_string_" + i ],
			};

			// *** Create our Quantity variables. ***
			this[ "marker" + i ] = quantityIndex[ i ];
			this[ "quantity_string_" + i ] = this[ "marker" + i ].toString();
			this[ "quantity_Array_" + i ] = {
				id: this[ "quantity_string_" + i ],
			};

			// *** Create our Single Product variable, populated by our dynamically generated variables, seen above. ***
			this[ "product" + i ] = {
				name: this[ "name_string_" + i ],
				id: this[ "id_string_" + i ],
				price: this[ "price_string_" + i ],
				brand: "Dragon",
				category: "Headset",
				quantity: this[ "quantity_string_" + i ],
			}
		}

		/**
		 * Initialise our variable storing all products. 
		 * Keep in mind the 'product0' variable will not be recognised by a linter because it is dynamically created so does not technically 'exist' anywhere.
		 */
		var allProductObject = [
			product0,// eslint-disable-line no-undef
		];

		//  *** For a loop of 'productCount' times, push all products to our allProductsObject using our product[i] dynamically generated variable. ***
		for ( var i = 1; i < productCount; ++i ) {
			var prod = this[ "product" + i ];
			allProductObject.push( prod );
		}

		// console.log(allProductObject); // For debug purposes.

		// Measure a view of Cart page.
		dataLayer.push( { // eslint-disable-line no-undef
			'event': eventName,
			'ecommerce': {
				'currencyCode': gtm_currencyCode,
				'checkout': {
					'actionField': {
						'step': 1
					},
					'products': allProductObject // Push our object to 'products'.
				}
			}
		} );
		console.log( 'dataLayer successfully pushed' );
	}

} );