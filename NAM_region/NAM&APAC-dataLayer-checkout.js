 /**
 * Google Tag Manager Data Layer ( Scripts for the cart actions ).
 * 
 * Locales: NAM & APAC
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
 * Checkout click (Checkout view 1)
 * Payment details (Checkout view 2)
 * Order Summary (Checkout view 3)
 * Order Confirmation (Checkout view 4)
 * Order Refund TODO : Need to refund a dummy order to build and test properly.
 *
 * Loaded after functionality scripts in order to read correct variable values and use. EG price calculation, currency selection.
 * The functions necessary for successful push to the dataLayer read the value at the time of calling, of element id's and class names. This means that although written to be used on other locales, the id's and class names must also match.
 */

document.addEventListener( "DOMContentLoaded", function ( event ) {

	// Initialize and Notify script has been loaded successfully.
	window.dataLayer = window.dataLayer || [];
	console.log( 'NAM/APAC Data layer script loaded successfully' );

	// ** Call functions to generate our dynamic variables are calculated depending on user selection, eg price.
	// [1] Generate variable for currency.

	/**
	 * [1] Functionality to detect currency and define variable for use in dataLayer.
	 * 
	 * @returns {string} Return currency value as a string.
	 */
	function checkCurrency() {
		let gtm_currencyCode_el = document.getElementById( 'currencySelector' );
		if ( gtm_currencyCode_el ) {
			var gtm_currencyCode = gtm_currencyCode_el.value;
		}
		return gtm_currencyCode;
	}
	checkCurrency();


	// ** Action list - Now define our action list, then call the relevant functions in order to pass our data to the dataLayer for viewing in GTM and GA. **
	// [1] gtmCartView function triggers.
	// [2] gtmCartInterestedIn function triggers.
	// [3] gtmCheckoutClick function triggers.
	// [4] gtmPaymentDetails function triggers.
	// [5] gtmOrderSummary function triggers.

	// [1]
	const CART_PAGE = document.getElementById( 'dr_ShoppingCart' );

	if ( CART_PAGE ) {
		gtmCartView();
	}

	// [2]
	const MAY_BE_INTERESTED_IN_BTN = document.querySelectorAll( '.dr_button' );

	if ( MAY_BE_INTERESTED_IN_BTN ) {
		MAY_BE_INTERESTED_IN_BTN .forEach( item => {
			item.addEventListener( 'click', event => {
				gtmCartInterestedIn();
			} )
		} );
	}

	// [3]
	const CHECKOUT_BUTTON = document.getElementById( 'dr_checkoutButton' );

	if ( CHECKOUT_BUTTON ) {
		CHECKOUT_BUTTON.addEventListener( 'click', event => {
			gtmCheckoutClick();
		} )
	}

	// [4]
	const CHECKOUT_PAYMENT = document.getElementById( 'ThreePgCheckoutAddressPaymentInfoPage' ); // Payment Details Page

	if ( CHECKOUT_PAYMENT ) {
		gtmPaymentDetails();
	}

	// [5]
	const CHECKOUT_ORDER_SUMMARY = document.getElementById( 'ThreePgCheckoutConfirmOrderPage' ); // Order Summary Page

	if ( CHECKOUT_ORDER_SUMMARY ) {
		gtmOrderSummary();
	}

	// [6]
	const CHECKOUT_THANKYOU = document.getElementById( 'ThankYouPage' ); // Order Confirmation Page

	if ( CHECKOUT_THANKYOU ) {
		gtmOrderConfirmation();
	}

	// •• Function list. ••
	// [1] gtmCartView() - This function handles the retrieval and dataLayer push of the combination of user product selection, at the time the cart page loads.
	// [2] gtmCartInterestedIn() - This function handles the retrieval and dataLayer push of the 'You may be interested in' product that the user clicks on, on the car page..
	// [3] gtmCheckoutClick() - This function pushes action data to the dataLayer in order to track which stage of the checkout process the user is at.
	// [4] gtmPaymentDetails() - This function pushes action data to the dataLayer in order to track which stage of the checkout process the user is at.
	// [5] gtmOrderSummary() - This function pushes action data to the dataLayer in order to track which stage of the checkout process the user is at.
	// [6] gtmOrderConfirmation() - This function pushes action data to the dataLayer in order to track which stage of the checkout process the user is at.

	/**
	 * [1]
	 */
	function gtmCartView() {
		// *** Retrieve our dynamic variables from functions outside of block scope. ***
		let gtm_currencyCode = checkCurrency(); // Retrieve currency code.

		// *** Set our static variables *** //
		let eventName = 'cart';

		// *** We first retrieve the Digital River generated variables and store as new variables for our usage. ***
		let listids        = utag_data["product_id"]; // eslint-disable-line no-undef
		let listnames      = utag_data["product_name"]; // eslint-disable-line no-undef
		let listprices     = utag_data["local_product_unit_price"];// eslint-disable-line no-undef
		let listquantities = utag_data["product_quantity"]; // eslint-disable-line no-undef

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
			//	category: "Headset", // TODO Cannot retrieve category as a dynamic var at it is not defined in the utag_data.
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

	/**
	 * [2]
	 */
	function gtmCartInterestedIn() {
		// *** Retrieve our dynamic variables from functions outside of block scope. ***
		let gtm_currencyCode = checkCurrency(); // Retrieve currency code.

		var parent_el         = window.event.target.parentNode;
		var grandparent_el    = parent_el.parentNode;
		var childNodes        = grandparent_el.childNodes; // eslint-disable-line no-unused-vars
		var product_title_str = grandparent_el.childNodes[ 1 ].innerText;
		var product_title     = product_title_str.replace( /(\r\n|\n|\r)/gm, " " ); // Strip unwanted line breaks.
		var product_price     = grandparent_el.childNodes[ 5 ].innerText.replace(/[^\d.-]/g, ''); // Strip unwanted characters, APART FROM THE DECIMAL POINT!, in order to only return the number value. Note that \W is the equivalent of [^0-9a-zA-Z_]. Then strip non-numeric characters to remove currency abbreviations EG 'CAN'.

		// *** Set our static variables *** //
		let eventName = 'productClick';

		// *** Retrieve our site locale code *** //
		let site_locale = utag_data["site_locale"]; // eslint-disable-line no-undef
		
		if ( product_title.includes( '3 Foot cord' ) ) {

			if ( site_locale == 'en_US' ) { 
				var dataID = '5056167100';
			}
			else { // else give the APAC price.
				var dataID = '5397842200';
			}
			var product_category = 'Hardware';
			var product_variant  = '0';

		} 
		
		else if ( product_title.includes( '9 Foot cord' ) ) {

			if ( site_locale == 'en_US' ) {
				var dataID = '5056167200';
			}
			else { // else give the APAC price.
				var dataID = '5397842300';
			}
			var product_category = 'Hardware';
			var product_variant  = '0';
		}

		else if ( product_title.includes( 'Bluetooth Wireless Headset' ) ) {

			if ( site_locale == 'en_US' ) {
				var dataID = '307076500';
			}
			else { // else give the APAC price.
				var dataID = '5144651400';
			}
			var product_category = 'Hardware';
			var product_variant  = '0';
		}

		dataLayer.push( { // eslint-disable-line no-undef
			'event': eventName,
			'ecommerce': {
				'currencyCode': gtm_currencyCode,
				'click': {
					'actionField': {
						'list': 'You may be interested in'
					},
					'products': [ {
						'name': product_title,
						'id': dataID,
						'price': product_price,
						'brand': 'Dragon',
						'category': product_category,
						'variant': product_variant,
						'position': 1
					} ]
				}
			}	
		} );
		console.log( 'dataLayer successfully pushed' );
	}

	/**
	 * [3]
	 */
	function gtmCheckoutClick() {
		// *** Retrieve our dynamic variables from functions outside of block scope. ***
		let gtm_currencyCode = checkCurrency(); // Retrieve currency code.

		// *** Set our static variables *** //
		let eventName = 'checkout';

		dataLayer.push( { // eslint-disable-line no-undef
			'event': eventName,
			'ecommerce': {
				'currencyCode': gtm_currencyCode,
				'checkout': {
					'actionField': {'step': 2}
				}
			}
		} );
		console.log( 'dataLayer successfully pushed' );
	}

	/**
	 * [4]
	 */
	function gtmPaymentDetails() {

		// *** Retrieve our dynamic variables from functions outside of block scope. ***
		let gtm_currencyCode = utag_data["order_currency"];  // eslint-disable-line no-undef

		// *** Set our static variables *** //
		let eventName = 'checkout';

		dataLayer.push( { // eslint-disable-line no-undef
			'event': eventName,
			'ecommerce': {
				'checkout': {
					'currencyCode': gtm_currencyCode,
					'actionField': {'step': 2, 'option': 'paymentDetail'}
				}
			}
		} );
		console.log( 'dataLayer successfully pushed' );
	}

	/**
	 * [5]
	 */
	function gtmOrderSummary() {

		// *** Retrieve our dynamic variables from functions outside of block scope. ***
		let gtm_currencyCode = utag_data["order_currency"];  // eslint-disable-line no-undef

		// *** Set our static variables *** //
		let eventName = 'checkout';

		dataLayer.push( { // eslint-disable-line no-undef
			'event': eventName,
			'ecommerce': {
				'checkout': {
					'currencyCode': gtm_currencyCode,
					'actionField': {'step': 3, 'option': 'orderSummary'}
				}
			}
		} );
		console.log( 'dataLayer successfully pushed' );
	}

	/**
	 * [6]
	 */
	function gtmOrderConfirmation() {
		// *** Retrieve our dynamic variables from functions outside of block scope. ***
		let gtm_currencyCode = utag_data["order_currency"];  // eslint-disable-line no-undef

		// *** Set our static variables *** //
		let eventName = 'transaction';

		// *** We first retrieve the Digital River generated variables and store as new variables for our usage. ***
		let listids        = utag_data["product_id"]; // eslint-disable-line no-undef
		let listnames      = utag_data["product_name"]; // eslint-disable-line no-undef
		let listprices     = utag_data["local_product_unit_price"];// eslint-disable-line no-undef
		let listquantities = utag_data["product_quantity"]; // eslint-disable-line no-undef

		let orderid        = utag_data["order_id"]; // eslint-disable-line no-undef
		let orderrevenue   = utag_data["order_total"]; // eslint-disable-line no-undef
		let ordertax       = utag_data["order_tax_amount"]; // eslint-disable-line no-undef
		let ordershipping  = utag_data["order_shipping_amount"]; // eslint-disable-line no-undef

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
			 // category: "Headset", // TODO Cannot retrieve category as a dynamic var at it is not defined in the utag_data.
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
		// console.log( 'order id is: ' + orderid + ' order revenue is: ' + orderrevenue + ' order tax is: ' + ordertax + ' order shipping is: ' + ordershipping );

		// Measure a view of Order Confirmation checkout step.
		dataLayer.push( { // eslint-disable-line no-undef
			'event': eventName,
			'ecommerce': {
				'currencyCode': gtm_currencyCode,
				'purchase': {
					'actionField': {
						'id': orderid,
						'revenue': orderrevenue,
						'tax': ordertax,
						'shipping': ordershipping
					},
					'products': allProductObject // Push our object to 'products'.
				}
			}
		} );
		console.log( 'dataLayer successfully pushed' );
	}

} );

