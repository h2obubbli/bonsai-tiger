/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./bower_components/ftdomdelegate/lib/delegate.js":
/***/ (function(module, exports, __webpack_require__) {

var require;/*** IMPORTS FROM imports-loader ***/
var define = false;
var requireText = require;

/*jshint browser:true, node:true*/

'use strict';

module.exports = Delegate;

/**
 * DOM event delegator
 *
 * The delegator will listen
 * for events that bubble up
 * to the root node.
 *
 * @constructor
 * @param {Node|string} [root] The root node or a selector string matching the root node
 */
function Delegate(root) {

  /**
   * Maintain a map of listener
   * lists, keyed by event name.
   *
   * @type Object
   */
  this.listenerMap = [{}, {}];
  if (root) {
    this.root(root);
  }

  /** @type function() */
  this.handle = Delegate.prototype.handle.bind(this);
}

/**
 * Start listening for events
 * on the provided DOM element
 *
 * @param  {Node|string} [root] The root node or a selector string matching the root node
 * @returns {Delegate} This method is chainable
 */
Delegate.prototype.root = function (root) {
  var listenerMap = this.listenerMap;
  var eventType;

  // Remove master event listeners
  if (this.rootElement) {
    for (eventType in listenerMap[1]) {
      if (listenerMap[1].hasOwnProperty(eventType)) {
        this.rootElement.removeEventListener(eventType, this.handle, true);
      }
    }
    for (eventType in listenerMap[0]) {
      if (listenerMap[0].hasOwnProperty(eventType)) {
        this.rootElement.removeEventListener(eventType, this.handle, false);
      }
    }
  }

  // If no root or root is not
  // a dom node, then remove internal
  // root reference and exit here
  if (!root || !root.addEventListener) {
    if (this.rootElement) {
      delete this.rootElement;
    }
    return this;
  }

  /**
   * The root node at which
   * listeners are attached.
   *
   * @type Node
   */
  this.rootElement = root;

  // Set up master event listeners
  for (eventType in listenerMap[1]) {
    if (listenerMap[1].hasOwnProperty(eventType)) {
      this.rootElement.addEventListener(eventType, this.handle, true);
    }
  }
  for (eventType in listenerMap[0]) {
    if (listenerMap[0].hasOwnProperty(eventType)) {
      this.rootElement.addEventListener(eventType, this.handle, false);
    }
  }

  return this;
};

/**
 * @param {string} eventType
 * @returns boolean
 */
Delegate.prototype.captureForType = function (eventType) {
  return ['blur', 'error', 'focus', 'load', 'resize', 'scroll'].indexOf(eventType) !== -1;
};

/**
 * Attach a handler to one
 * event for all elements
 * that match the selector,
 * now or in the future
 *
 * The handler function receives
 * three arguments: the DOM event
 * object, the node that matched
 * the selector while the event
 * was bubbling and a reference
 * to itself. Within the handler,
 * 'this' is equal to the second
 * argument.
 *
 * The node that actually received
 * the event can be accessed via
 * 'event.target'.
 *
 * @param {string} eventType Listen for these events
 * @param {string|undefined} selector Only handle events on elements matching this selector, if undefined match root element
 * @param {function()} handler Handler function - event data passed here will be in event.data
 * @param {boolean} [useCapture] see 'useCapture' in <https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener>
 * @returns {Delegate} This method is chainable
 */
Delegate.prototype.on = function (eventType, selector, handler, useCapture) {
  var root, listenerMap, matcher, matcherParam;

  if (!eventType) {
    throw new TypeError('Invalid event type: ' + eventType);
  }

  // handler can be passed as
  // the second or third argument
  if (typeof selector === 'function') {
    useCapture = handler;
    handler = selector;
    selector = null;
  }

  // Fallback to sensible defaults
  // if useCapture not set
  if (useCapture === undefined) {
    useCapture = this.captureForType(eventType);
  }

  if (typeof handler !== 'function') {
    throw new TypeError('Handler must be a type of Function');
  }

  root = this.rootElement;
  listenerMap = this.listenerMap[useCapture ? 1 : 0];

  // Add master handler for type if not created yet
  if (!listenerMap[eventType]) {
    if (root) {
      root.addEventListener(eventType, this.handle, useCapture);
    }
    listenerMap[eventType] = [];
  }

  if (!selector) {
    matcherParam = null;

    // COMPLEX - matchesRoot needs to have access to
    // this.rootElement, so bind the function to this.
    matcher = matchesRoot.bind(this);

    // Compile a matcher for the given selector
  } else if (/^[a-z]+$/i.test(selector)) {
    matcherParam = selector;
    matcher = matchesTag;
  } else if (/^#[a-z0-9\-_]+$/i.test(selector)) {
    matcherParam = selector.slice(1);
    matcher = matchesId;
  } else {
    matcherParam = selector;
    matcher = matches;
  }

  // Add to the list of listeners
  listenerMap[eventType].push({
    selector: selector,
    handler: handler,
    matcher: matcher,
    matcherParam: matcherParam
  });

  return this;
};

/**
 * Remove an event handler
 * for elements that match
 * the selector, forever
 *
 * @param {string} [eventType] Remove handlers for events matching this type, considering the other parameters
 * @param {string} [selector] If this parameter is omitted, only handlers which match the other two will be removed
 * @param {function()} [handler] If this parameter is omitted, only handlers which match the previous two will be removed
 * @returns {Delegate} This method is chainable
 */
Delegate.prototype.off = function (eventType, selector, handler, useCapture) {
  var i, listener, listenerMap, listenerList, singleEventType;

  // Handler can be passed as
  // the second or third argument
  if (typeof selector === 'function') {
    useCapture = handler;
    handler = selector;
    selector = null;
  }

  // If useCapture not set, remove
  // all event listeners
  if (useCapture === undefined) {
    this.off(eventType, selector, handler, true);
    this.off(eventType, selector, handler, false);
    return this;
  }

  listenerMap = this.listenerMap[useCapture ? 1 : 0];
  if (!eventType) {
    for (singleEventType in listenerMap) {
      if (listenerMap.hasOwnProperty(singleEventType)) {
        this.off(singleEventType, selector, handler);
      }
    }

    return this;
  }

  listenerList = listenerMap[eventType];
  if (!listenerList || !listenerList.length) {
    return this;
  }

  // Remove only parameter matches
  // if specified
  for (i = listenerList.length - 1; i >= 0; i--) {
    listener = listenerList[i];

    if ((!selector || selector === listener.selector) && (!handler || handler === listener.handler)) {
      listenerList.splice(i, 1);
    }
  }

  // All listeners removed
  if (!listenerList.length) {
    delete listenerMap[eventType];

    // Remove the main handler
    if (this.rootElement) {
      this.rootElement.removeEventListener(eventType, this.handle, useCapture);
    }
  }

  return this;
};

/**
 * Handle an arbitrary event.
 *
 * @param {Event} event
 */
Delegate.prototype.handle = function (event) {
  var i,
      l,
      type = event.type,
      root,
      phase,
      listener,
      returned,
      listenerList = [],
      target,
      /** @const */EVENTIGNORE = 'ftLabsDelegateIgnore';

  if (event[EVENTIGNORE] === true) {
    return;
  }

  target = event.target;

  // Hardcode value of Node.TEXT_NODE
  // as not defined in IE8
  if (target.nodeType === 3) {
    target = target.parentNode;
  }

  root = this.rootElement;

  phase = event.eventPhase || (event.target !== event.currentTarget ? 3 : 2);

  switch (phase) {
    case 1:
      //Event.CAPTURING_PHASE:
      listenerList = this.listenerMap[1][type];
      break;
    case 2:
      //Event.AT_TARGET:
      if (this.listenerMap[0] && this.listenerMap[0][type]) listenerList = listenerList.concat(this.listenerMap[0][type]);
      if (this.listenerMap[1] && this.listenerMap[1][type]) listenerList = listenerList.concat(this.listenerMap[1][type]);
      break;
    case 3:
      //Event.BUBBLING_PHASE:
      listenerList = this.listenerMap[0][type];
      break;
  }

  // Need to continuously check
  // that the specific list is
  // still populated in case one
  // of the callbacks actually
  // causes the list to be destroyed.
  l = listenerList.length;
  while (target && l) {
    for (i = 0; i < l; i++) {
      listener = listenerList[i];

      // Bail from this loop if
      // the length changed and
      // no more listeners are
      // defined between i and l.
      if (!listener) {
        break;
      }

      // Check for match and fire
      // the event if there's one
      //
      // TODO:MCG:20120117: Need a way
      // to check if event#stopImmediatePropagation
      // was called. If so, break both loops.
      if (listener.matcher.call(target, listener.matcherParam, target)) {
        returned = this.fire(event, target, listener);
      }

      // Stop propagation to subsequent
      // callbacks if the callback returned
      // false
      if (returned === false) {
        event[EVENTIGNORE] = true;
        event.preventDefault();
        return;
      }
    }

    // TODO:MCG:20120117: Need a way to
    // check if event#stopPropagation
    // was called. If so, break looping
    // through the DOM. Stop if the
    // delegation root has been reached
    if (target === root) {
      break;
    }

    l = listenerList.length;
    target = target.parentElement;
  }
};

/**
 * Fire a listener on a target.
 *
 * @param {Event} event
 * @param {Node} target
 * @param {Object} listener
 * @returns {boolean}
 */
Delegate.prototype.fire = function (event, target, listener) {
  return listener.handler.call(target, event, target);
};

/**
 * Check whether an element
 * matches a generic selector.
 *
 * @type function()
 * @param {string} selector A CSS selector
 */
var matches = function (el) {
  if (!el) return;
  var p = el.prototype;
  return p.matches || p.matchesSelector || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector;
}(Element);

/**
 * Check whether an element
 * matches a tag selector.
 *
 * Tags are NOT case-sensitive,
 * except in XML (and XML-based
 * languages such as XHTML).
 *
 * @param {string} tagName The tag name to test against
 * @param {Element} element The element to test with
 * @returns boolean
 */
function matchesTag(tagName, element) {
  return tagName.toLowerCase() === element.tagName.toLowerCase();
}

/**
 * Check whether an element
 * matches the root.
 *
 * @param {?String} selector In this case this is always passed through as null and not used
 * @param {Element} element The element to test with
 * @returns boolean
 */
function matchesRoot(selector, element) {
  /*jshint validthis:true*/
  if (this.rootElement === window) return element === document;
  return this.rootElement === element;
}

/**
 * Check whether the ID of
 * the element in 'this'
 * matches the given ID.
 *
 * IDs are case-sensitive.
 *
 * @param {string} id The ID to test against
 * @param {Element} element The element to test with
 * @returns boolean
 */
function matchesId(id, element) {
  return id === element.id;
}

/**
 * Short hand for off()
 * and root(), ie both
 * with no parameters
 *
 * @return void
 */
Delegate.prototype.destroy = function () {
  this.off();
  this.root();
};


/***/ }),

/***/ "./bower_components/o-dom/main.js":
/***/ (function(module, exports, __webpack_require__) {

var require;/*** IMPORTS FROM imports-loader ***/
var define = false;
var requireText = require;

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*global exports*/

function getClosestMatch(el, selector) {
	while (el) {
		if (el.matches(selector)) {
			return el;
		} else {
			el = el.parentElement;
		}
	}
	return false;
}

function getIndex(el) {
	var i = 0;
	if (el && (typeof el === 'undefined' ? 'undefined' : _typeof(el)) === 'object' && el.nodeType === 1) {
		while (el.previousSibling) {
			el = el.previousSibling;
			if (el.nodeType === 1) {
				++i;
			}
		}
		return i;
	}
}

exports.getClosestMatch = getClosestMatch;
exports.getIndex = getIndex;


/***/ }),

/***/ "./bower_components/o-grid/main.js":
/***/ (function(module, exports, __webpack_require__) {

var require;/*** IMPORTS FROM imports-loader ***/
var define = false;
var requireText = require;

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/*global module*/

/**
 * Detect IE 8 through injected conditional comments:
 * no UA detection, no need for conditional compilation or JS check
 * @return {Bool} true if the browser is IE 8
 */
var isIE8 = function () {
	var b = document.createElement('B');
	var docElem = document.documentElement;
	var isIE = void 0;

	b.innerHTML = '<!--[if IE 8]><b id="ie8test"></b><![endif]-->';
	docElem.appendChild(b);
	isIE = !!document.getElementById('ie8test');
	docElem.removeChild(b);
	return isIE;
}();

/**
 * Grab grid properties
 * @return {Object} layout names and gutter widths
 */
function getGridProperties() {
	return getGridFromDoc('after');
}

/**
 * Get all layout sizes
 * @return {Object} layout names and sizes
 */
function getGridBreakpoints() {
	return getGridFromDoc('before');
}

/**
 * Grab grid properties surfaced in html:after and html:before's content
 * @param {String} position Whether to get all properties in :before, or current properties in :after
 * @return {Object} layout names and gutter widths
 */
function getGridFromDoc(position) {
	// Contained in a try/catch as it should not error if o-grid styles are not (deliberately or accidentally) loaded
	// e.g. o-tracking will always try to read this property, but the page is not obliged to use o-grid for layout
	try {
		var gridProperties = window.getComputedStyle(document.documentElement, ':' + position).getPropertyValue('content');
		// Firefox computes: "{\"foo\": \"bar\"}"
		// We want readable JSON: {"foo": "bar"}
		gridProperties = gridProperties.replace(/'/g, '').replace(/\\/g, '').replace(/^"/, '').replace(/"$/, '');
		return JSON.parse(gridProperties);
	} catch (e) {
		return {};
	}
}

/**
 * Grab the current layout
 * @return {String} Layout name
 */
function getCurrentLayout() {
	if (isIE8) {
		return 'L';
	}

	return getGridProperties().layout;
}

/**
 * Grab the current space between columns
 * @return {String} Gutter width in pixels
 */
function getCurrentGutter() {
	if (isIE8) {
		return '20px';
	}

	return getGridProperties().gutter;
}

/**
 * This sets MediaQueryListeners on all the o-grid breakpoints
 * and fires a `o-grid.layoutChange` event on layout change.
 */
function enableLayoutChangeEvents() {
	// Create a map containing all breakpoints exposed via html:before
	var gridLayouts = getGridBreakpoints();
	if (gridLayouts.hasOwnProperty('layouts')) {
		var layouts = gridLayouts.layouts;
		var breakpoints = new Map(Object.keys(layouts).map(function (key) {
			return [key, layouts[key]];
		}));
		var decr1 = function decr1(val) {
			return Number(val.replace('px', '') - 1) + 'px';
		};

		// Generate media queries for each
		breakpoints.forEach(function (width, size) {
			var queries = [];
			if (size === 'S') {
				queries.push('(max-width: ' + width + ')');
				queries.push('(min-width: ' + width + ') and (max-width: ' + decr1(breakpoints.get('M')) + ')');
			} else if (size === 'M') {
				queries.push('(min-width: ' + width + ') and (max-width: ' + decr1(breakpoints.get('L')) + ')');
			} else if (size === 'L') {
				queries.push('(min-width: ' + width + ') and (max-width: ' + decr1(breakpoints.get('XL')) + ')');
			} else if (size === 'XL') {
				queries.push('(min-width: ' + width + ')');
			}

			// matchMedia listener handler: Dispatch `o-grid.layoutChange` event if a match
			var handleMQChange = function handleMQChange(mql) {
				if (mql.matches) {
					window.dispatchEvent(new CustomEvent('o-grid.layoutChange', {
						detail: {
							layout: size
						}
					}));
				}
			};

			// Create a new listener for each layout
			queries.forEach(function (mq) {
				var mql = window.matchMedia(mq);
				mql.addListener(handleMQChange);
				handleMQChange(mql);
			});
		});
	} else {
		console.error('To enable grid layout change events, include oGridSurfaceLayoutSizes in your Sass');
	}
}

exports['default'] = {
	getCurrentLayout: getCurrentLayout,
	getCurrentGutter: getCurrentGutter,
	getGridBreakpoints: getGridBreakpoints,
	enableLayoutChangeEvents: enableLayoutChangeEvents
};
module.exports = exports['default'];


/***/ }),

/***/ "./bower_components/o-hierarchical-nav/main.js":
/***/ (function(module, exports, __webpack_require__) {

var require;/*** IMPORTS FROM imports-loader ***/
var define = false;
var requireText = require;

'use strict';

/*global require,module*/

var oHierarchicalNav = __webpack_require__("./bower_components/o-hierarchical-nav/src/js/ResponsiveNav.js");
var constructAll = function constructAll() {
	oHierarchicalNav.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};
document.addEventListener('o.DOMContentLoaded', constructAll);

module.exports = oHierarchicalNav;


/***/ }),

/***/ "./bower_components/o-hierarchical-nav/src/js/Nav.js":
/***/ (function(module, exports, __webpack_require__) {

var require;/*** IMPORTS FROM imports-loader ***/
var define = false;
var requireText = require;

'use strict';

/*global require, module*/

var DomDelegate = __webpack_require__("./bower_components/ftdomdelegate/lib/delegate.js");
var oDom = __webpack_require__("./bower_components/o-dom/main.js");
var utils = __webpack_require__("./bower_components/o-hierarchical-nav/src/js/utils.js");

function Nav(rootEl) {

	var bodyDelegate = new DomDelegate(document.body);
	var rootDelegate = new DomDelegate(rootEl);

	// Get sub-level element
	function getChildListEl(el) {
		return el.querySelector('ul');
	}

	// Check if element has sub-level nav
	function hasChildList(el) {
		return !!getChildListEl(el);
	}

	// Get controlled element
	function getMegaDropdownEl(itemEl) {
		if (itemEl.hasAttribute('aria-controls')) {
			return document.getElementById(itemEl.getAttribute('aria-controls'));
		}
	}

	// Check if element is a controller of another DOM element
	function isControlEl(el) {
		return !!(getChildListEl(el) || getMegaDropdownEl(el));
	}

	// Check if element has been expanded
	function isExpanded(el) {
		return el.getAttribute('aria-expanded') === 'true';
	}

	// Check if a certain element is inside the root nav
	function isElementInsideNav(el) {
		var expandedLevel1El = rootEl.querySelector('[data-o-hierarchical-nav-level="1"] > [aria-expanded="true"]');
		var expandedMegaDropdownEl = void 0;
		var allLevel1Els = void 0;

		if (expandedLevel1El) {
			expandedMegaDropdownEl = getMegaDropdownEl(expandedLevel1El);
			if (expandedMegaDropdownEl && expandedMegaDropdownEl.contains(el)) {
				return true;
			}
		}

		allLevel1Els = rootEl.querySelectorAll('[data-o-hierarchical-nav-level="1"] > li');

		for (var c = 0, l = allLevel1Els.length; c < l; c++) {
			if (allLevel1Els[c].contains(el)) {
				return true;
			}
		}
		return false;
	}

	// Get the level a nav is in
	function getLevel(el) {
		return parseInt(el.parentNode.getAttribute('data-o-hierarchical-nav-level'), 10);
	}

	// Check if a level 2 nav will fit in the window
	function level2ListFitsInWindow(l2El) {
		return l2El.getBoundingClientRect().right < window.innerWidth;
	}

	// Check if an element will have enough space to its right
	function elementFitsToRight(el1, el2) {
		return el1.getBoundingClientRect().right + el2.offsetWidth < window.innerWidth;
	}

	// Depending on if an element fits to its right or not, change its class to apply correct css
	function positionChildListEl(parentEl, childEl) {
		parentEl.classList.remove('o-hierarchical-nav--align-right');
		parentEl.classList.remove('o-hierarchical-nav__outside-right');
		parentEl.classList.remove('o-hierarchical-nav--left');

		if (!childEl) {
			return;
		}

		if (getLevel(parentEl) === 1) {
			if (!level2ListFitsInWindow(childEl)) {
				parentEl.classList.add('o-hierarchical-nav--align-right');
			}
		} else {
			if (elementFitsToRight(parentEl, childEl)) {
				parentEl.classList.add('o-hierarchical-nav__outside-right');
			}
		}
	}

	// Hide an element
	function hideEl(el) {
		if (el) {
			el.setAttribute('aria-hidden', 'true');
		}
	}

	// Display an element
	function showEl(el) {
		if (el) {
			el.removeAttribute('aria-hidden');
		}
	}

	// Collapse all items from a certain node list
	function collapseAll(nodeList) {
		if (!nodeList) {
			nodeList = rootEl.querySelectorAll('[data-o-hierarchical-nav-level="1"] > li[aria-expanded=true]');
		}

		utils.nodeListToArray(nodeList).forEach(function (childListItemEl) {
			if (isExpanded(childListItemEl)) {
				collapseItem(childListItemEl);
			}
		});
	}

	// Set an element as not expanded, and if it has children, do the same to them
	function collapseItem(itemEl) {
		itemEl.setAttribute('aria-expanded', 'false');

		if (utils.isIE8) {
			itemEl.classList.add('forceIErepaint');
			itemEl.classList.remove('forceIErepaint');
		}

		if (hasChildList(itemEl)) {
			collapseAll(getChildListEl(itemEl).children);
		}

		hideEl(getMegaDropdownEl(itemEl));
		dispatchCloseEvent(itemEl);
	}

	// Get same level items and collapse them
	function collapseSiblingItems(itemEl) {
		var listLevel = oDom.getClosestMatch(itemEl, 'ul').getAttribute('data-o-hierarchical-nav-level');
		var listItemEls = rootEl.querySelectorAll('[data-o-hierarchical-nav-level="' + listLevel + '"] > li[aria-expanded="true"]');

		for (var c = 0, l = listItemEls.length; c < l; c++) {
			collapseItem(listItemEls[c]);
		}
	}

	// Expand a nav item
	function expandItem(itemEl) {
		collapseSiblingItems(itemEl);
		itemEl.setAttribute('aria-expanded', 'true');
		positionChildListEl(itemEl, getChildListEl(itemEl));
		showEl(getMegaDropdownEl(itemEl));
		dispatchExpandEvent(itemEl);
	}

	// Helper method to dispatch o-layers new event
	function dispatchExpandEvent(itemEl) {
		utils.dispatchCustomEvent(itemEl, 'oLayers.new', { 'zIndex': 10, 'el': itemEl });
	}

	// Helper method to dispatch o-layers close event
	function dispatchCloseEvent(itemEl) {
		utils.dispatchCustomEvent(itemEl, 'oLayers.close', { 'zIndex': 10, 'el': itemEl });
	}

	// Handle clicks ourselved by expanding or collapsing selected element
	function handleClick(ev) {
		var itemEl = oDom.getClosestMatch(ev.target, 'li');

		if (itemEl && isControlEl(itemEl)) {
			ev.preventDefault();

			if (!isExpanded(itemEl)) {
				expandItem(itemEl);
			} else {
				collapseItem(itemEl);
			}
		}
	}

	// Position a level 3 nav and deeper
	function positionExpandedLevels() {
		// find deepest expanded menu element
		var openMenus = rootEl.querySelectorAll('li[aria-expanded="true"] > ul[data-o-hierarchical-nav-level]');

		// find the deepest level currently open
		var deepestLevel = -1;
		for (var c = 0, l = openMenus.length; c < l; c++) {
			deepestLevel = Math.max(deepestLevel, openMenus[c].getAttribute("data-o-hierarchical-nav-level"));
		}

		// start checking space / collapsing where needed
		for (var _l = 2; _l <= deepestLevel; _l++) {
			var openLevelParentEl = rootEl.querySelector('[data-o-hierarchical-nav-level="' + _l + '"] > [aria-expanded="true"]');
			var openLevelChildEl = rootEl.querySelector('[data-o-hierarchical-nav-level="' + _l + '"] > [aria-expanded="true"] > ul');

			if (openLevelParentEl && openLevelChildEl) {
				positionChildListEl(openLevelParentEl, openLevelChildEl);
			}
		}
	}

	// Position level 3 and below on resize
	function resize() {
		positionExpandedLevels();
	}

	// Set all tabIndexes of a tags to 0
	function setTabIndexes() {
		var aEls = rootEl.querySelectorAll('li > a');

		for (var c = 0, l = aEls.length; c < l; c++) {
			if (!aEls[c].hasAttribute('href')) {
				if (aEls[c].tabIndex === 0) {
					// Don't override tabIndex if something else has set it, but otherwise set it to zero to make it focusable.
					aEls[c].tabIndex = 0;
				}
			}
		}
	}

	function setLayersContext() {
		// We'll use the body as the default context
		bodyDelegate.on('oLayers.new', function (e) {
			if (!isElementInsideNav(e.detail.el)) {
				collapseAll();
			}
		});
	}

	function init() {
		if (!rootEl) {
			rootEl = document.body;
		} else if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}

		rootEl.setAttribute('data-o-hierarchical-nav--js', '');
		setTabIndexes();
		setLayersContext();
		rootDelegate.on('click', handleClick);
		rootDelegate.on('keyup', function (ev) {
			// Pressing enter key on anchors without @href won't trigger a click event
			if (!ev.target.hasAttribute('href') && ev.keyCode === 13 && isElementInsideNav(ev.target)) {
				handleClick(ev);
			}
		});

		// Collapse all elements if the user clicks outside the nav
		bodyDelegate.on('click', function (ev) {
			if (!isElementInsideNav(ev.target)) {
				collapseAll();
			}
		});
	}

	function destroy() {
		rootDelegate.destroy();
		bodyDelegate.destroy();
		rootEl.removeAttribute('data-o-hierarchical-nav--js');
	}

	init();

	this.resize = resize;
	this.collapseAll = collapseAll;
	this.destroy = destroy;
}

module.exports = Nav;


/***/ }),

/***/ "./bower_components/o-hierarchical-nav/src/js/ResponsiveNav.js":
/***/ (function(module, exports, __webpack_require__) {

var require;/*** IMPORTS FROM imports-loader ***/
var define = false;
var requireText = require;

'use strict';

/*global require,module,document,HTMLElement*/

var SquishyList = __webpack_require__("./bower_components/o-squishy-list/main.js");
var DomDelegate = __webpack_require__("./bower_components/ftdomdelegate/lib/delegate.js");
var oViewport = __webpack_require__("./bower_components/o-viewport/main.js");
var Nav = __webpack_require__("./bower_components/o-hierarchical-nav/src/js/Nav.js");

function ResponsiveNav(rootEl) {

	var rootDelegate = void 0;
	var nav = void 0;
	var contentFilterEl = void 0;
	var contentFilter = void 0;
	var moreEl = void 0;
	var moreListEl = void 0;
	var clonedIdPrefix = 'o-hierarchical-nav__cloned-id-';
	var prefixedNodes = [];

	// Check if element is a controller of another DOM element
	function isMegaDropdownControl(el) {
		return el && el.hasAttribute('aria-controls');
	}

	// On resize, apply o-squishy-list, and, if it has a sub-level dom, populate more list
	function resize() {
		nav.resize();

		if (contentFilter) {
			contentFilter.squish();
			if (!isMegaDropdownControl(moreEl)) {
				populateMoreList(contentFilter.getHiddenItems());
			}
		}
	}

	// Empty the more list
	function emptyMoreList() {
		if (moreListEl) {
			moreListEl.innerHTML = '';
		}
	}

	// Get the information from the element and create a new li tag with the element's text to append more list
	function addItemToMoreList(text, href) {
		var itemEl = document.createElement('li');
		var aEl = document.createElement('a');

		if (typeof aEl.textContent !== 'undefined') {
			aEl.textContent = text;
		} else {
			aEl.innerText = text;
		}

		aEl.href = href;
		itemEl.appendChild(aEl);
		moreListEl.appendChild(itemEl);
	}

	function cloneItemToMoreList(el) {
		var cloneEl = el.cloneNode(true);
		// remove the attributes that are only applicable to higher level
		cloneEl.removeAttribute('data-priority');
		cloneEl.removeAttribute('aria-hidden');
		cloneEl.removeAttribute('data-o-hierarchical-nav-is-cloneable');
		// recurse through children and amend any id values to maintain uniqueness
		prefixIds(el);

		// increase level of nested menus
		incrementMenuDepths(cloneEl);

		moreListEl.appendChild(cloneEl);
	}

	function resetIds() {
		var nextNode = void 0;
		while (prefixedNodes.length > 0) {
			nextNode = prefixedNodes.pop();
			nextNode.setAttribute('id', nextNode.getAttribute('id').replace(clonedIdPrefix, ''));
		}
	}

	function incrementMenuDepths(el) {
		// data-o-hierarchical-nav-level attribute is incremented by one for each
		// of the children recursively. Modifies elements in place, assumes
		// cloned element to be passed in.
		var child = void 0;
		if (el.hasChildNodes()) {
			var children = el.childNodes;
			for (var i = 0, l = children.length; i < l; i++) {
				child = children[i];
				if (child instanceof HTMLElement) {
					if (child.hasAttribute('data-o-hierarchical-nav-level')) {
						// increment nav-level when attribute present
						var origNavLevel = parseInt(child.getAttribute('data-o-hierarchical-nav-level'), 10);
						var updatedNavLevel = (isNaN(origNavLevel) ? 0 : origNavLevel) + 1;
						child.setAttribute('data-o-hierarchical-nav-level', updatedNavLevel);
					}
					incrementMenuDepths(child);
				}
			}
		}
	}

	function prefixIds(el) {
		// id's are prefixed to ensure that any id based functionality uses the visible element
		// for example a 'label' tag with a 'for' attribute will not find the correct input it
		// relates to as it uses the first matching id in the document
		var child = void 0;
		if (el.hasChildNodes()) {
			var children = el.childNodes;
			for (var i = 0, l = children.length; i < l; i++) {
				child = children[i];
				if (child instanceof HTMLElement) {
					if (child.hasAttribute('id')) {
						prefixedNodes.push(child); // store to make the cleanup more performant
						child.setAttribute('id', clonedIdPrefix + child.getAttribute('id'));
					}
					prefixIds(child);
				}
			}
		}
	}

	// For every hidden item, add it to the more list
	function populateMoreList(hiddenEls) {
		emptyMoreList();
		resetIds();

		for (var c = 0, l = hiddenEls.length; c < l; c++) {
			var aEl = hiddenEls[c].querySelector('a');
			var ulEl = hiddenEls[c].querySelector('ul');

			if (hiddenEls[c].hasAttribute('data-o-hierarchical-nav-is-cloneable')) {
				cloneItemToMoreList(hiddenEls[c]);
			} else {
				var aText = typeof aEl.textContent !== 'undefined' ? aEl.textContent : aEl.innerText;
				addItemToMoreList(aText, aEl.href, ulEl);
			}
		}
	}

	// If all elements are hidden, add the all modifier, if not, the some modifier
	function setMoreElClass(remainingItems) {
		if (!moreEl) {
			return;
		}

		if (remainingItems === 0) {
			moreEl.classList.add('o-hierarchical-nav__more--all');
			moreEl.classList.remove('o-hierarchical-nav__more--some');
		} else {
			moreEl.classList.add('o-hierarchical-nav__more--some');
			moreEl.classList.remove('o-hierarchical-nav__more--all');
		}
	}

	// When there's an o-squishy-list change, collapse all elements and run the setMoreElClass method with number of non-hidden elements
	function contentFilterChangeHandler(ev) {
		if (ev.target === contentFilterEl && ev.detail.hiddenItems.length > 0) {
			nav.collapseAll();
			setMoreElClass(ev.detail.remainingItems.length);
		}
	}

	// If more button is clicked, populate it
	function navExpandHandler(ev) {
		if (ev.target === moreEl) {
			populateMoreList(contentFilter.getHiddenItems());
		}
	}

	function init() {
		if (!rootEl) {
			rootEl = document.body;
		} else if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}

		nav = new Nav(rootEl);
		rootDelegate = new DomDelegate(rootEl);
		contentFilterEl = rootEl.querySelector('ul');
		moreEl = rootEl.querySelector('[data-more]');

		if (contentFilterEl) {
			contentFilter = new SquishyList(contentFilterEl, { filterOnResize: false });
		}

		// If there's a more element, add a ul tag where hidden elements will be appended
		if (moreEl) {
			moreEl.setAttribute('aria-hidden', 'true');

			if (!isMegaDropdownControl(moreEl)) {
				moreListEl = document.createElement('ul');
				moreListEl.setAttribute('data-o-hierarchical-nav-level', '2');
				moreEl.appendChild(moreListEl);
				rootDelegate.on('oLayers.new', navExpandHandler);
			}
		}

		rootDelegate.on('oSquishyList.change', contentFilterChangeHandler);

		var bodyDelegate = new DomDelegate(document.body);

		// Force a resize when it loads, in case it loads on a smaller screen
		resize();

		oViewport.listenTo('resize');
		bodyDelegate.on('oViewport.resize', resize);
	}

	function destroy() {
		prefixedNodes = [];
		rootDelegate.destroy();
		rootEl.removeAttribute('data-o-hierarchical-nav--js');
	}

	init();

	this.resize = resize;
	this.destroy = destroy;
}

// Initializes all nav elements in the page or whatever element is passed to it
ResponsiveNav.init = function (el) {
	if (!el) {
		el = document.body;
	} else if (!(el instanceof HTMLElement)) {
		el = document.querySelector(el);
	}

	var navEls = el.querySelectorAll('[data-o-component="o-hierarchical-nav"]');
	var responsiveNavs = [];

	for (var c = 0, l = navEls.length; c < l; c++) {
		if (!navEls[c].hasAttribute('data-o-hierarchical-nav--js')) {
			// If it's a vertical nav, we don't need all the responsive methods
			if (navEls[c].getAttribute('data-o-hierarchical-nav-orientiation') === 'vertical') {
				responsiveNavs.push(new Nav(navEls[c]));
			} else {
				responsiveNavs.push(new ResponsiveNav(navEls[c]));
			}
		}
	}

	return responsiveNavs;
};

module.exports = ResponsiveNav;


/***/ }),

/***/ "./bower_components/o-hierarchical-nav/src/js/utils.js":
/***/ (function(module, exports, __webpack_require__) {

var require;/*** IMPORTS FROM imports-loader ***/
var define = false;
var requireText = require;

'use strict';

/*global exports*/

// Helper function that converts a list of elements into an array
function nodeListToArray(nl) {
	return [].map.call(nl, function (element) {
		return element;
	});
}

// Helper function to dispatch events
function dispatchCustomEvent(el, name, data) {
	if (document.createEvent && el.dispatchEvent) {
		var event = document.createEvent('Event');
		event.initEvent(name, true, true);

		if (data) {
			event.detail = data;
		}

		el.dispatchEvent(event);
	}
}

function isIE8() {
	var b = document.createElement('B');
	var docElem = document.documentElement;
	var isIE = void 0;

	b.innerHTML = '<!--[if IE 8]><b id="ie8test"></b><![endif]-->';
	docElem.appendChild(b);
	isIE = !!document.getElementById('ie8test');
	docElem.removeChild(b);
	return isIE;
}

exports.isIE8 = isIE8();
exports.nodeListToArray = nodeListToArray;
exports.dispatchCustomEvent = dispatchCustomEvent;


/***/ }),

/***/ "./bower_components/o-squishy-list/main.js":
/***/ (function(module, exports, __webpack_require__) {

var require;/*** IMPORTS FROM imports-loader ***/
var define = false;
var requireText = require;

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SquishyList = function () {
	function SquishyList(rootEl, opts) {
		_classCallCheck(this, SquishyList);

		this.element = rootEl;
		this.moreWidth = 0;
		this.options = opts || { filterOnResize: true };

		this.getPrioritySortedChildNodeEls();
		this.moreEl = this.element.querySelector('[data-more]');
		if (this.moreEl) {
			this.showEl(this.moreEl);
			this.moreWidth = this.moreEl.offsetWidth;
			this.hideEl(this.moreEl);
		}
		this.squish();
		if (this.options.filterOnResize) {
			window.addEventListener('resize', this.resizeHandler.bind(this), false);
		}

		this.dispatchCustomEvent('oSquishyList.ready');
	}

	_createClass(SquishyList, [{
		key: 'dispatchCustomEvent',
		value: function dispatchCustomEvent(name, data) {
			if (document.createEvent && this.element.dispatchEvent) {
				var event = document.createEvent('Event');
				event.initEvent(name, true, true);
				if (data) {
					event.detail = data;
				}
				this.element.dispatchEvent(event);
			}
		}
	}, {
		key: 'getItemEls',
		value: function getItemEls() {
			var itemEls = [];
			var childNodeEl = void 0;

			for (var c = 0, l = this.element.childNodes.length; c < l; c++) {
				childNodeEl = this.element.childNodes[c];

				// Make it flexible so that other product and modules can manually hide elements and o-squishy-list won't add it to it's list
				if (childNodeEl.nodeType === 1 && !childNodeEl.hasAttribute('data-more') && !childNodeEl.hasAttribute('data-o-squishy-list--ignore')) {
					itemEls.push(childNodeEl);
				}
			}
			return itemEls;
		}
	}, {
		key: 'showEl',
		value: function showEl(el) {
			// eslint-disable-line class-methods-use-this
			if (el) {
				el.removeAttribute('aria-hidden');
			}
		}
	}, {
		key: 'hideEl',
		value: function hideEl(el) {
			// eslint-disable-line class-methods-use-this
			if (el) {
				el.setAttribute('aria-hidden', 'true');
			}
		}
	}, {
		key: 'getElPriority',
		value: function getElPriority(el) {
			// eslint-disable-line class-methods-use-this
			return parseInt(el.getAttribute('data-priority'), 10);
		}
	}, {
		key: 'getPrioritySortedChildNodeEls',
		value: function getPrioritySortedChildNodeEls() {
			this.allItemEls = this.getItemEls();
			this.prioritySortedItemEls = [];
			var unprioritisedItemEls = [];
			for (var c = 0, l = this.allItemEls.length; c < l; c++) {
				var thisItemEl = this.allItemEls[c];
				var thisItemPriority = this.getElPriority(thisItemEl);
				if (isNaN(thisItemPriority)) {
					unprioritisedItemEls.push(thisItemEl);
				} else if (thisItemPriority >= 0) {
					if (!Array.isArray(this.prioritySortedItemEls[thisItemPriority])) {
						this.prioritySortedItemEls[thisItemPriority] = [];
					}
					this.prioritySortedItemEls[thisItemPriority].push(thisItemEl);
				}
			}
			if (unprioritisedItemEls.length > 0) {
				this.prioritySortedItemEls.push(unprioritisedItemEls);
			}
			this.prioritySortedItemEls = this.prioritySortedItemEls.filter(function (v) {
				return v !== undefined;
			});
		}
	}, {
		key: 'showAllItems',
		value: function showAllItems() {
			this.hiddenItemEls = [];
			for (var c = 0, l = this.allItemEls.length; c < l; c++) {
				this.showEl(this.allItemEls[c]);
			}
		}
	}, {
		key: 'hideItems',
		value: function hideItems(els) {
			// We want highest priority items to be at the beginning of the array
			for (var i = els.length - 1; i > -1; i--) {
				this.hiddenItemEls.unshift(els[i]);
				this.hideEl(els[i]);
			}
		}
	}, {
		key: 'getVisibleContentWidth',
		value: function getVisibleContentWidth() {
			var visibleItemsWidth = 0;
			for (var c = 0, l = this.allItemEls.length; c < l; c++) {
				if (!this.allItemEls[c].hasAttribute('aria-hidden')) {
					visibleItemsWidth += this.allItemEls[c].offsetWidth; // Needs to take into account margins too
				}
			}
			return visibleItemsWidth;
		}
	}, {
		key: 'doesContentFit',
		value: function doesContentFit() {
			return this.getVisibleContentWidth() <= this.element.clientWidth;
		}
	}, {
		key: 'getHiddenItems',
		value: function getHiddenItems() {
			return this.hiddenItemEls;
		}
	}, {
		key: 'getRemainingItems',
		value: function getRemainingItems() {
			var _this = this;

			return this.allItemEls.filter(function (el) {
				return _this.hiddenItemEls.indexOf(el) === -1;
			});
		}
	}, {
		key: 'squish',
		value: function squish() {
			this.showAllItems();
			if (this.doesContentFit()) {
				this.hideEl(this.moreEl);
			} else {
				for (var p = this.prioritySortedItemEls.length - 1; p >= 0; p--) {
					this.hideItems(this.prioritySortedItemEls[p]);
					if (this.getVisibleContentWidth() + this.moreWidth <= this.element.clientWidth) {
						this.showEl(this.moreEl);
						break;
					}
				}
			}
			this.dispatchCustomEvent('oSquishyList.change', {
				hiddenItems: this.getHiddenItems(),
				remainingItems: this.getRemainingItems()
			});
		}
	}, {
		key: 'resizeHandler',
		value: function resizeHandler() {
			clearTimeout(this.debounceTimeout);
			this.debounceTimeout = setTimeout(this.squish.bind(this), 50);
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			for (var c = 0, l = this.allItemEls.length; c < l; c++) {
				this.allItemEls[c].removeAttribute('aria-hidden');
			}
			window.removeEventListener('resize', this.resizeHandler, false);
			this.element.removeAttribute('data-o-squishy-list-js');
		}
	}], [{
		key: 'init',
		value: function init(el, opts) {
			if (!el) {
				el = document.body;
			}
			if (!(el instanceof HTMLElement)) {
				el = document.querySelector(el);
			}
			if (/\bo-squishy-list\b/.test(el.getAttribute('data-o-component'))) {
				return new SquishyList(el, opts);
			}
			return [].map.call(el.querySelectorAll('[data-o-component="o-squishy-list"]'), function (el) {
				return new SquishyList(el, opts);
			});
		}
	}]);

	return SquishyList;
}();

exports['default'] = SquishyList;


var constructAll = function constructAll() {
	SquishyList.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

if (typeof window !== 'undefined') {
	document.addEventListener('o.DOMContentLoaded', constructAll);
}
module.exports = exports['default'];


/***/ }),

/***/ "./bower_components/o-tabs/main.js":
/***/ (function(module, exports, __webpack_require__) {

var require;/*** IMPORTS FROM imports-loader ***/
var define = false;
var requireText = require;

'use strict';

/*global require, module*/

var Tabs = __webpack_require__("./bower_components/o-tabs/src/js/Tabs.js");

var constructAll = function constructAll() {
	Tabs.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

module.exports = Tabs;


/***/ }),

/***/ "./bower_components/o-tabs/src/js/Tabs.js":
/***/ (function(module, exports, __webpack_require__) {

var require;/*** IMPORTS FROM imports-loader ***/
var define = false;
var requireText = require;

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*global module, require*/
var oDom = __webpack_require__("./bower_components/o-dom/main.js");

var Tabs = function () {
	function Tabs(rootEl, config) {
		_classCallCheck(this, Tabs);

		this.rootEl = rootEl;
		this.rootEl.setAttribute('data-o-tabs--js', '');

		this.updateUrl = rootEl.getAttribute('data-o-tabs-update-url') !== null;
		this.selectedTabIndex = -1;

		this.tabEls = this.rootEl.querySelectorAll('[role=tab]');
		this.tabEls = [].slice.call(this.tabEls).filter(this.tabHasValidUrl);
		this.tabpanelEls = this.getTabPanelEls(this.tabEls);

		this.boundClickHandler = this.clickHandler.bind(this);
		this.rootEl.addEventListener('click', this.boundClickHandler, false);
		this.boundKeyPressHandler = this.keyPressHandler.bind(this);
		this.rootEl.addEventListener('keypress', this.boundKeyPressHandler, false);
		this.boundHashChangeHandler = this.hashChangeHandler.bind(this);
		window.addEventListener('hashchange', this.boundHashChangeHandler, false);

		if (!config) {
			config = {};
			Array.prototype.forEach.call(this.rootEl.attributes, function (attr) {
				if (attr.name.includes('data-o-tabs')) {
					// Remove the unnecessary part of the string the first
					// time this is run for each attribute
					var key = attr.name.replace('data-o-tabs-', '');

					try {
						// If it's a JSON, a boolean or a number, we want it stored like that,
						// and not as a string. We also replace all ' with " so JSON strings
						// are parsed correctly
						config[key] = JSON.parse(attr.value.replace(/\'/g, '"'));
					} catch (e) {
						config[key] = attr.value;
					}
				}
			});
		}

		this.config = config;
		this.dispatchCustomEvent('ready', {
			tabs: this
		});
		this.selectTab(this.getSelectedTabIndex());
	}

	_createClass(Tabs, [{
		key: 'getTabTargetId',
		value: function getTabTargetId(tabEl) {
			// eslint-disable-line class-methods-use-this
			var linkEls = tabEl.getElementsByTagName('a');
			return linkEls && linkEls[0] ? linkEls[0].getAttribute('href').replace('#', '') : '';
		}
	}, {
		key: 'getTabPanelEls',
		value: function getTabPanelEls(tabEls) {
			var panelEls = [];

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = tabEls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var tab = _step.value;

					var tabTargetId = this.getTabTargetId(tab);
					var targetEl = document.getElementById(tabTargetId);

					if (targetEl) {
						tab.setAttribute('aria-controls', tabTargetId);
						tab.setAttribute('tabindex', '0');

						var label = tab.getElementsByTagName('a')[0];
						var labelId = tabTargetId + '-label';
						label.setAttribute('tabindex', '-1');
						label.id = labelId;
						targetEl.setAttribute('aria-labelledby', labelId);
						targetEl.setAttribute('role', 'tabpanel');
						targetEl.setAttribute('tabindex', '0');
						panelEls.push(targetEl);
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return panelEls;
		}
	}, {
		key: 'getTabElementFromHash',
		value: function getTabElementFromHash() {
			var tabLink = this.rootEl.querySelector('[href="' + location.hash + '"]');
			return tabLink && tabLink.parentNode ? tabLink.parentNode : null;
		}
	}, {
		key: 'getTabIndexFromElement',
		value: function getTabIndexFromElement(el) {
			// eslint-disable-line class-methods-use-this
			return oDom.getIndex(el);
		}
	}, {
		key: 'getSelectedTabElement',
		value: function getSelectedTabElement() {
			return this.rootEl.querySelector('[aria-selected=true]');
		}
	}, {
		key: 'getSelectedTabIndex',
		value: function getSelectedTabIndex() {
			var selectedTabElement = this.updateUrl && location.hash ? this.getTabElementFromHash() : this.getSelectedTabElement();
			return selectedTabElement ? this.getTabIndexFromElement(selectedTabElement) : 0;
		}
	}, {
		key: 'isValidTab',
		value: function isValidTab(index) {
			return !isNaN(index) && index >= 0 && index < this.tabEls.length;
		}
	}, {
		key: 'hidePanel',
		value: function hidePanel(panelEl) {
			// eslint-disable-line class-methods-use-this
			panelEl.setAttribute('aria-expanded', 'false');
			panelEl.setAttribute('aria-hidden', 'true');
		}
	}, {
		key: 'showPanel',
		value: function showPanel(panelEl, disableFocus) {
			panelEl.setAttribute('aria-expanded', 'true');
			panelEl.setAttribute('aria-hidden', 'false');

			// Remove the focus ring for sighted users
			panelEl.style.outline = 0;

			if (disableFocus) {
				return;
			}

			// update the url to match the selected tab
			if (panelEl.id && this.updateUrl) {
				location.href = '#' + panelEl.id;
			}

			// Get current scroll position
			var x = window.scrollX || window.pageXOffset;
			var y = window.scrollY || window.pageYOffset;

			// Give focus to the panel for screen readers
			// This might cause the browser to scroll up or down
			panelEl.focus();

			// Scroll back to the original position
			window.scrollTo(x, y);
		}
	}, {
		key: 'dispatchCustomEvent',
		value: function dispatchCustomEvent(event) {
			var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var namespace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'oTabs';

			this.rootEl.dispatchEvent(new CustomEvent(namespace + '.' + event, {
				detail: data,
				bubbles: true
			}));
		}
	}, {
		key: 'selectTab',
		value: function selectTab(newIndex) {
			if (this.isValidTab(newIndex) && newIndex !== this.selectedTabIndex) {
				for (var i = 0; i < this.tabEls.length; i++) {
					if (newIndex === i) {
						this.tabEls[i].setAttribute('aria-selected', 'true');
						this.showPanel(this.tabpanelEls[i], this.config.disablefocus);
					} else {
						this.tabEls[i].setAttribute('aria-selected', 'false');
						this.hidePanel(this.tabpanelEls[i]);
					}
				}

				this.dispatchCustomEvent('tabSelect', {
					tabs: this,
					selected: newIndex,
					lastSelected: this.selectedTabIndex
				});

				this.selectedTabIndex = newIndex;
			}
		}
	}, {
		key: 'clickHandler',
		value: function clickHandler(ev) {
			var tabEl = oDom.getClosestMatch(ev.target, '[role=tab]');

			if (tabEl && this.tabHasValidUrl(tabEl)) {
				ev.preventDefault();
				this.updateCurrentTab(tabEl);
			}
		}
	}, {
		key: 'keyPressHandler',
		value: function keyPressHandler(ev) {
			var tabEl = oDom.getClosestMatch(ev.target, '[role=tab]');
			// Only update if key pressed is enter key
			if (tabEl && ev.keyCode === 13 && this.tabHasValidUrl(tabEl)) {
				ev.preventDefault();
				this.updateCurrentTab(tabEl);
			}
		}
	}, {
		key: 'hashChangeHandler',
		value: function hashChangeHandler() {
			if (!this.updateUrl) {
				return;
			}

			var tabEl = this.getTabElementFromHash();

			if (tabEl) {
				this.updateCurrentTab(tabEl);
			}
		}
	}, {
		key: 'updateCurrentTab',
		value: function updateCurrentTab(tabEl) {
			var index = this.getTabIndexFromElement(tabEl);
			this.selectTab(index);
			this.dispatchCustomEvent('event', {
				category: 'tabs',
				action: 'click',
				tab: tabEl.textContent.trim()
			}, 'oTracking');
		}
	}, {
		key: 'tabHasValidUrl',
		value: function tabHasValidUrl(tabEl) {
			// eslint-disable-line class-methods-use-this
			var linkEls = tabEl.getElementsByTagName('a');
			if (!linkEls || !linkEls[0].hash) {
				return false;
			}
			return linkEls[0].pathname === location.pathname;
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			this.rootEl.removeEventListener('click', this.boundClickHandler, false);
			this.rootEl.removeEventListener('keypress', this.boundKeyPressHandler, false);
			window.removeEventListener('hashchange', this.boundHashChangeHandler, false);
			this.rootEl.removeAttribute('data-o-tabs--js');

			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this.tabpanelEls[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var tabPanelEl = _step2.value;

					this.showPanel(tabPanelEl);
				}

				// unset the bound event handlers
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2['return']) {
						_iterator2['return']();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			this.boundClickHandler = undefined;
			this.boundKeyPressHandler = undefined;
			this.boundHashChangeHandler = undefined;
			// Destroy ALL the things!
			this.tabEls = undefined;
			this.tabpanelEls = undefined;
			this.updateUrl = undefined;
			this.selectedTabIndex = undefined;
			this.rootEl = undefined;
			this.config = undefined;
		}
	}], [{
		key: 'init',
		value: function init(rootEl, config) {
			if (!rootEl) {
				rootEl = document.body;
			}
			if (!(rootEl instanceof HTMLElement)) {
				rootEl = document.querySelector(rootEl);
			}

			if (rootEl instanceof HTMLElement && /\bo-tabs\b/.test(rootEl.getAttribute('data-o-component'))) {
				if (!rootEl.matches('[data-o-tabs-autoconstruct=false]') && !rootEl.hasAttribute('data-o-tabs--js')) {
					return new Tabs(rootEl, config);
				}
			}

			if (rootEl.querySelectorAll) {
				var tabElements = rootEl.querySelectorAll('[data-o-component=o-tabs]:not([data-o-tabs-autoconstruct=false]):not([data-o-tabs--js])');

				return Array.from(tabElements, function (tabEl) {
					return new Tabs(tabEl, config);
				});
			}
		}
	}]);

	return Tabs;
}();

exports['default'] = Tabs;
module.exports = exports['default'];


/***/ }),

/***/ "./bower_components/o-utils/main.js":
/***/ (function(module, exports, __webpack_require__) {

var require;/*** IMPORTS FROM imports-loader ***/
var define = false;
var requireText = require;

"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
*
* Debounces function so it is only called after n milliseconds
* without it not being called
*
* @example
* Utils.debounce(myFunction() {}, 100);
*
* @param {Function} func - Function to be debounced
* @param {number} wait - Time in miliseconds
*
* @returns {Function} - Debounced function
*/
function debounce(func, wait) {
	var timeout = void 0;
	return function () {
		var _this = this;

		var args = arguments;
		var later = function later() {
			timeout = null;
			func.apply(_this, args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

/**
*
* Throttle function so it is only called once every n milliseconds
*
* @example
* Utils.throttle(myFunction() {}, 100);
*
* @param {Function} func - Function to be throttled
* @param {number} wait - Time in miliseconds
*
* @returns {Function} - Throttled function
*/
function throttle(func, wait) {
	var timeout = void 0;
	return function () {
		var _this2 = this;

		if (timeout) {
			return;
		}
		var args = arguments;
		var later = function later() {
			timeout = null;
			func.apply(_this2, args);
		};

		timeout = setTimeout(later, wait);
	};
}

exports.debounce = debounce;
exports.throttle = throttle;


/***/ }),

/***/ "./bower_components/o-viewport/main.js":
/***/ (function(module, exports, __webpack_require__) {

var require;/*** IMPORTS FROM imports-loader ***/
var define = false;
var requireText = require;

'use strict';

// let debug;
var utils = __webpack_require__("./bower_components/o-viewport/src/utils.js");
var throttle = utils.throttle;
var debounce = utils.debounce;

var listeners = {};
var intervals = {
	resize: 100,
	orientation: 100,
	visibility: 100,
	scroll: 100
};

function setThrottleInterval(eventType, interval) {
	if (typeof arguments[0] === 'number') {
		setThrottleInterval('scroll', arguments[0]);
		setThrottleInterval('resize', arguments[1]);
		setThrottleInterval('orientation', arguments[2]);
		setThrottleInterval('visibility', arguments[3]);
	} else if (interval) {
		intervals[eventType] = interval;
	}
}

function listenToResize() {
	if (listeners.resize) {
		return;
	}
	var eventType = 'resize';
	var handler = debounce(function (ev) {
		utils.broadcast('resize', {
			viewport: utils.getSize(),
			originalEvent: ev
		});
	}, intervals.resize);

	window.addEventListener(eventType, handler);
	listeners.resize = {
		eventType: eventType,
		handler: handler
	};
}

function listenToOrientation() {

	if (listeners.orientation) {
		return;
	}

	var eventType = 'orientationchange';
	var handler = debounce(function (ev) {
		utils.broadcast('orientation', {
			viewport: utils.getSize(),
			orientation: utils.getOrientation(),
			originalEvent: ev
		});
	}, intervals.orientation);

	window.addEventListener(eventType, handler);
	listeners.orientation = {
		eventType: eventType,
		handler: handler
	};
}

function listenToVisibility() {

	if (listeners.visibility) {
		return;
	}

	var eventType = utils.detectVisiblityAPI().eventType;
	var handler = debounce(function (ev) {
		utils.broadcast('visibility', {
			hidden: utils.getVisibility(),
			originalEvent: ev
		});
	}, intervals.visibility);

	window.addEventListener(eventType, handler);

	listeners.visibility = {
		eventType: eventType,
		handler: handler
	};
}

function listenToScroll() {

	if (listeners.scroll) {
		return;
	}

	var eventType = 'scroll';
	var handler = throttle(function (ev) {
		var scrollPos = utils.getScrollPosition();
		utils.broadcast('scroll', {
			viewport: utils.getSize(),
			scrollHeight: scrollPos.height,
			scrollLeft: scrollPos.left,
			scrollTop: scrollPos.top,
			scrollWidth: scrollPos.width,
			originalEvent: ev
		});
	}, intervals.scroll);

	window.addEventListener(eventType, handler);
	listeners.scroll = {
		eventType: eventType,
		handler: handler
	};
}

function listenTo(eventType) {
	if (eventType === 'resize' || eventType === 'all') {
		listenToResize();
	}

	if (eventType === 'scroll' || eventType === 'all') {
		listenToScroll();
	}

	if (eventType === 'orientation' || eventType === 'all') {
		listenToOrientation();
	}

	if (eventType === 'visibility' || eventType === 'all') {
		listenToVisibility();
	}
}

function stopListeningTo(eventType) {
	if (eventType === 'all') {
		Object.keys(listeners).forEach(stopListeningTo);
	} else if (listeners[eventType]) {
		window.removeEventListener(listeners[eventType].eventType, listeners[eventType].handler);
		delete listeners[eventType];
	}
}

module.exports = {
	debug: function debug() {
		// debug = true;
		utils.debug();
	},
	listenTo: listenTo,
	stopListeningTo: stopListeningTo,
	setThrottleInterval: setThrottleInterval,
	getOrientation: utils.getOrientation,
	getSize: utils.getSize,
	getScrollPosition: utils.getScrollPosition,
	getVisibility: utils.getVisibility
};


/***/ }),

/***/ "./bower_components/o-viewport/src/utils.js":
/***/ (function(module, exports, __webpack_require__) {

var require;/*** IMPORTS FROM imports-loader ***/
var define = false;
var requireText = require;

'use strict';

/* jshint devel: true */
var oUtils = __webpack_require__("./bower_components/o-utils/main.js");

var _debug = void 0;

function broadcast(eventType, data, target) {
	target = target || document.body;

	if (_debug) {
		console.log('o-viewport', eventType, data);
	}

	target.dispatchEvent(new CustomEvent('oViewport.' + eventType, {
		detail: data,
		bubbles: true
	}));
}

function getHeight(ignoreScrollbars) {
	return ignoreScrollbars ? document.documentElement.clientHeight : Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}

function getWidth(ignoreScrollbars) {
	return ignoreScrollbars ? document.documentElement.clientWidth : Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}

function getSize(ignoreScrollbars) {
	return {
		height: module.exports.getHeight(ignoreScrollbars),
		width: module.exports.getWidth(ignoreScrollbars)
	};
}

function getScrollPosition() {
	var de = document.documentElement;
	var db = document.body;

	// adapted from https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
	var isCSS1Compat = (document.compatMode || '') === 'CSS1Compat';

	var ieX = isCSS1Compat ? de.scrollLeft : db.scrollLeft;
	var ieY = isCSS1Compat ? de.scrollTop : db.scrollTop;
	return {
		height: db.scrollHeight,
		width: db.scrollWidth,
		left: window.pageXOffset || window.scrollX || ieX,
		top: window.pageYOffset || window.scrollY || ieY
	};
}

function getOrientation() {
	var orientation = window.screen.orientation || window.screen.mozOrientation || window.screen.msOrientation || undefined;
	if (orientation) {
		return typeof orientation === 'string' ? orientation.split('-')[0] : orientation.type.split('-')[0];
	} else if (window.matchMedia) {
		return window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape';
	} else {
		return getHeight() >= getWidth() ? 'portrait' : 'landscape';
	}
}

function detectVisiblityAPI() {
	var hiddenName = void 0;
	var eventType = void 0;
	if (typeof document.hidden !== 'undefined') {
		hiddenName = 'hidden';
		eventType = 'visibilitychange';
	} else if (typeof document.mozHidden !== 'undefined') {
		hiddenName = 'mozHidden';
		eventType = 'mozvisibilitychange';
	} else if (typeof document.msHidden !== 'undefined') {
		hiddenName = 'msHidden';
		eventType = 'msvisibilitychange';
	} else if (typeof document.webkitHidden !== 'undefined') {
		hiddenName = 'webkitHidden';
		eventType = 'webkitvisibilitychange';
	}

	return {
		hiddenName: hiddenName,
		eventType: eventType
	};
}

function getVisibility() {
	var hiddenName = detectVisiblityAPI().hiddenName;
	return document[hiddenName];
}

module.exports = {
	debug: function debug() {
		_debug = true;
	},
	broadcast: broadcast,
	getWidth: getWidth,
	getHeight: getHeight,
	getSize: getSize,
	getScrollPosition: getScrollPosition,
	getVisibility: getVisibility,
	getOrientation: getOrientation,
	detectVisiblityAPI: detectVisiblityAPI,
	debounce: oUtils.debounce,
	throttle: oUtils.throttle
};


/***/ }),

/***/ "./client/js/main.js":
/***/ (function(module, exports, __webpack_require__) {

var require;/*** IMPORTS FROM imports-loader ***/
var define = false;
var requireText = require;

'use strict';

// Require module
__webpack_require__("./bower_components/o-grid/main.js");
__webpack_require__("./bower_components/o-hierarchical-nav/main.js");

var oTabs = window.oTabs = __webpack_require__("./bower_components/o-tabs/main.js");

//const oExpanderObjects = window.oExpanderObjects = oExpander.init(document.body, {})

var tabsObjects = window.tabsObjects = oTabs.init(document.body, {
	disablefocus: false
});

// Wait until the page has loaded
if (document.readyState === 'interactive' || document.readyState === 'complete') {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
}
document.addEventListener('DOMContentLoaded', function () {
	// Dispatch a custom event that will tell all required modules to initialise
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2svYm9vdHN0cmFwIDRhNjRiMGQ0MmM0ODFhZmM1ZGI2IiwiLi9ib3dlcl9jb21wb25lbnRzL2Z0ZG9tZGVsZWdhdGUvbGliL2RlbGVnYXRlLmpzIiwiLi9ib3dlcl9jb21wb25lbnRzL28tZG9tL21haW4uanMiLCIuL2Jvd2VyX2NvbXBvbmVudHMvby1ncmlkL21haW4uanMiLCIuL2Jvd2VyX2NvbXBvbmVudHMvby1oaWVyYXJjaGljYWwtbmF2L21haW4uanMiLCIuL2Jvd2VyX2NvbXBvbmVudHMvby1oaWVyYXJjaGljYWwtbmF2L3NyYy9qcy9OYXYuanMiLCIuL2Jvd2VyX2NvbXBvbmVudHMvby1oaWVyYXJjaGljYWwtbmF2L3NyYy9qcy9SZXNwb25zaXZlTmF2LmpzIiwiLi9ib3dlcl9jb21wb25lbnRzL28taGllcmFyY2hpY2FsLW5hdi9zcmMvanMvdXRpbHMuanMiLCIuL2Jvd2VyX2NvbXBvbmVudHMvby1zcXVpc2h5LWxpc3QvbWFpbi5qcyIsIi4vYm93ZXJfY29tcG9uZW50cy9vLXRhYnMvbWFpbi5qcyIsIi4vYm93ZXJfY29tcG9uZW50cy9vLXRhYnMvc3JjL2pzL1RhYnMuanMiLCIuL2Jvd2VyX2NvbXBvbmVudHMvby11dGlscy9tYWluLmpzIiwiLi9ib3dlcl9jb21wb25lbnRzL28tdmlld3BvcnQvbWFpbi5qcyIsIi4vYm93ZXJfY29tcG9uZW50cy9vLXZpZXdwb3J0L3NyYy91dGlscy5qcyIsIi4vY2xpZW50L2pzL21haW4uanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIkRlbGVnYXRlIiwicm9vdCIsImxpc3RlbmVyTWFwIiwiaGFuZGxlIiwicHJvdG90eXBlIiwiYmluZCIsImV2ZW50VHlwZSIsInJvb3RFbGVtZW50IiwiaGFzT3duUHJvcGVydHkiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNhcHR1cmVGb3JUeXBlIiwiaW5kZXhPZiIsIm9uIiwic2VsZWN0b3IiLCJoYW5kbGVyIiwidXNlQ2FwdHVyZSIsIm1hdGNoZXIiLCJtYXRjaGVyUGFyYW0iLCJUeXBlRXJyb3IiLCJ1bmRlZmluZWQiLCJtYXRjaGVzUm9vdCIsInRlc3QiLCJtYXRjaGVzVGFnIiwic2xpY2UiLCJtYXRjaGVzSWQiLCJtYXRjaGVzIiwicHVzaCIsIm9mZiIsImkiLCJsaXN0ZW5lciIsImxpc3RlbmVyTGlzdCIsInNpbmdsZUV2ZW50VHlwZSIsImxlbmd0aCIsInNwbGljZSIsImV2ZW50IiwibCIsInR5cGUiLCJwaGFzZSIsInJldHVybmVkIiwidGFyZ2V0IiwiRVZFTlRJR05PUkUiLCJub2RlVHlwZSIsInBhcmVudE5vZGUiLCJldmVudFBoYXNlIiwiY3VycmVudFRhcmdldCIsImNvbmNhdCIsImNhbGwiLCJmaXJlIiwicHJldmVudERlZmF1bHQiLCJwYXJlbnRFbGVtZW50IiwiZWwiLCJwIiwibWF0Y2hlc1NlbGVjdG9yIiwid2Via2l0TWF0Y2hlc1NlbGVjdG9yIiwibW96TWF0Y2hlc1NlbGVjdG9yIiwibXNNYXRjaGVzU2VsZWN0b3IiLCJvTWF0Y2hlc1NlbGVjdG9yIiwiRWxlbWVudCIsInRhZ05hbWUiLCJlbGVtZW50IiwidG9Mb3dlckNhc2UiLCJ3aW5kb3ciLCJkb2N1bWVudCIsImlkIiwiZGVzdHJveSIsImdldENsb3Nlc3RNYXRjaCIsImdldEluZGV4IiwicHJldmlvdXNTaWJsaW5nIiwiaXNJRTgiLCJiIiwiY3JlYXRlRWxlbWVudCIsImRvY0VsZW0iLCJkb2N1bWVudEVsZW1lbnQiLCJpc0lFIiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCJnZXRFbGVtZW50QnlJZCIsInJlbW92ZUNoaWxkIiwiZ2V0R3JpZFByb3BlcnRpZXMiLCJnZXRHcmlkRnJvbURvYyIsImdldEdyaWRCcmVha3BvaW50cyIsInBvc2l0aW9uIiwiZ3JpZFByb3BlcnRpZXMiLCJnZXRDb21wdXRlZFN0eWxlIiwiZ2V0UHJvcGVydHlWYWx1ZSIsInJlcGxhY2UiLCJKU09OIiwicGFyc2UiLCJlIiwiZ2V0Q3VycmVudExheW91dCIsImxheW91dCIsImdldEN1cnJlbnRHdXR0ZXIiLCJndXR0ZXIiLCJlbmFibGVMYXlvdXRDaGFuZ2VFdmVudHMiLCJncmlkTGF5b3V0cyIsImxheW91dHMiLCJicmVha3BvaW50cyIsIk1hcCIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJrZXkiLCJkZWNyMSIsIk51bWJlciIsInZhbCIsImZvckVhY2giLCJ3aWR0aCIsInNpemUiLCJxdWVyaWVzIiwiZ2V0IiwiaGFuZGxlTVFDaGFuZ2UiLCJtcWwiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJtYXRjaE1lZGlhIiwibXEiLCJhZGRMaXN0ZW5lciIsImNvbnNvbGUiLCJlcnJvciIsIm9IaWVyYXJjaGljYWxOYXYiLCJyZXF1aXJlIiwiY29uc3RydWN0QWxsIiwiaW5pdCIsIkRvbURlbGVnYXRlIiwib0RvbSIsInV0aWxzIiwiTmF2Iiwicm9vdEVsIiwiYm9keURlbGVnYXRlIiwiYm9keSIsInJvb3REZWxlZ2F0ZSIsImdldENoaWxkTGlzdEVsIiwicXVlcnlTZWxlY3RvciIsImhhc0NoaWxkTGlzdCIsImdldE1lZ2FEcm9wZG93bkVsIiwiaXRlbUVsIiwiaGFzQXR0cmlidXRlIiwiZ2V0QXR0cmlidXRlIiwiaXNDb250cm9sRWwiLCJpc0V4cGFuZGVkIiwiaXNFbGVtZW50SW5zaWRlTmF2IiwiZXhwYW5kZWRMZXZlbDFFbCIsImV4cGFuZGVkTWVnYURyb3Bkb3duRWwiLCJhbGxMZXZlbDFFbHMiLCJjb250YWlucyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjIiwiZ2V0TGV2ZWwiLCJwYXJzZUludCIsImxldmVsMkxpc3RGaXRzSW5XaW5kb3ciLCJsMkVsIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicmlnaHQiLCJpbm5lcldpZHRoIiwiZWxlbWVudEZpdHNUb1JpZ2h0IiwiZWwxIiwiZWwyIiwib2Zmc2V0V2lkdGgiLCJwb3NpdGlvbkNoaWxkTGlzdEVsIiwicGFyZW50RWwiLCJjaGlsZEVsIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwiaGlkZUVsIiwic2V0QXR0cmlidXRlIiwic2hvd0VsIiwicmVtb3ZlQXR0cmlidXRlIiwiY29sbGFwc2VBbGwiLCJub2RlTGlzdCIsIm5vZGVMaXN0VG9BcnJheSIsImNoaWxkTGlzdEl0ZW1FbCIsImNvbGxhcHNlSXRlbSIsImNoaWxkcmVuIiwiZGlzcGF0Y2hDbG9zZUV2ZW50IiwiY29sbGFwc2VTaWJsaW5nSXRlbXMiLCJsaXN0TGV2ZWwiLCJsaXN0SXRlbUVscyIsImV4cGFuZEl0ZW0iLCJkaXNwYXRjaEV4cGFuZEV2ZW50IiwiZGlzcGF0Y2hDdXN0b21FdmVudCIsImhhbmRsZUNsaWNrIiwiZXYiLCJwb3NpdGlvbkV4cGFuZGVkTGV2ZWxzIiwib3Blbk1lbnVzIiwiZGVlcGVzdExldmVsIiwiTWF0aCIsIm1heCIsIm9wZW5MZXZlbFBhcmVudEVsIiwib3BlbkxldmVsQ2hpbGRFbCIsInJlc2l6ZSIsInNldFRhYkluZGV4ZXMiLCJhRWxzIiwidGFiSW5kZXgiLCJzZXRMYXllcnNDb250ZXh0IiwiSFRNTEVsZW1lbnQiLCJrZXlDb2RlIiwiU3F1aXNoeUxpc3QiLCJvVmlld3BvcnQiLCJSZXNwb25zaXZlTmF2IiwibmF2IiwiY29udGVudEZpbHRlckVsIiwiY29udGVudEZpbHRlciIsIm1vcmVFbCIsIm1vcmVMaXN0RWwiLCJjbG9uZWRJZFByZWZpeCIsInByZWZpeGVkTm9kZXMiLCJpc01lZ2FEcm9wZG93bkNvbnRyb2wiLCJzcXVpc2giLCJwb3B1bGF0ZU1vcmVMaXN0IiwiZ2V0SGlkZGVuSXRlbXMiLCJlbXB0eU1vcmVMaXN0IiwiYWRkSXRlbVRvTW9yZUxpc3QiLCJ0ZXh0IiwiaHJlZiIsImFFbCIsInRleHRDb250ZW50IiwiaW5uZXJUZXh0IiwiY2xvbmVJdGVtVG9Nb3JlTGlzdCIsImNsb25lRWwiLCJjbG9uZU5vZGUiLCJwcmVmaXhJZHMiLCJpbmNyZW1lbnRNZW51RGVwdGhzIiwicmVzZXRJZHMiLCJuZXh0Tm9kZSIsInBvcCIsImNoaWxkIiwiaGFzQ2hpbGROb2RlcyIsImNoaWxkTm9kZXMiLCJvcmlnTmF2TGV2ZWwiLCJ1cGRhdGVkTmF2TGV2ZWwiLCJpc05hTiIsImhpZGRlbkVscyIsInVsRWwiLCJhVGV4dCIsInNldE1vcmVFbENsYXNzIiwicmVtYWluaW5nSXRlbXMiLCJjb250ZW50RmlsdGVyQ2hhbmdlSGFuZGxlciIsImhpZGRlbkl0ZW1zIiwibmF2RXhwYW5kSGFuZGxlciIsImZpbHRlck9uUmVzaXplIiwibGlzdGVuVG8iLCJuYXZFbHMiLCJyZXNwb25zaXZlTmF2cyIsIm5sIiwibmFtZSIsImRhdGEiLCJjcmVhdGVFdmVudCIsImluaXRFdmVudCIsIm9wdHMiLCJtb3JlV2lkdGgiLCJvcHRpb25zIiwiZ2V0UHJpb3JpdHlTb3J0ZWRDaGlsZE5vZGVFbHMiLCJyZXNpemVIYW5kbGVyIiwiaXRlbUVscyIsImNoaWxkTm9kZUVsIiwiYWxsSXRlbUVscyIsImdldEl0ZW1FbHMiLCJwcmlvcml0eVNvcnRlZEl0ZW1FbHMiLCJ1bnByaW9yaXRpc2VkSXRlbUVscyIsInRoaXNJdGVtRWwiLCJ0aGlzSXRlbVByaW9yaXR5IiwiZ2V0RWxQcmlvcml0eSIsIkFycmF5IiwiaXNBcnJheSIsImZpbHRlciIsInYiLCJoaWRkZW5JdGVtRWxzIiwiZWxzIiwidW5zaGlmdCIsInZpc2libGVJdGVtc1dpZHRoIiwiZ2V0VmlzaWJsZUNvbnRlbnRXaWR0aCIsImNsaWVudFdpZHRoIiwic2hvd0FsbEl0ZW1zIiwiZG9lc0NvbnRlbnRGaXQiLCJoaWRlSXRlbXMiLCJnZXRSZW1haW5pbmdJdGVtcyIsImNsZWFyVGltZW91dCIsImRlYm91bmNlVGltZW91dCIsInNldFRpbWVvdXQiLCJUYWJzIiwiY29uZmlnIiwidXBkYXRlVXJsIiwic2VsZWN0ZWRUYWJJbmRleCIsInRhYkVscyIsInRhYkhhc1ZhbGlkVXJsIiwidGFicGFuZWxFbHMiLCJnZXRUYWJQYW5lbEVscyIsImJvdW5kQ2xpY2tIYW5kbGVyIiwiY2xpY2tIYW5kbGVyIiwiYm91bmRLZXlQcmVzc0hhbmRsZXIiLCJrZXlQcmVzc0hhbmRsZXIiLCJib3VuZEhhc2hDaGFuZ2VIYW5kbGVyIiwiaGFzaENoYW5nZUhhbmRsZXIiLCJhdHRyaWJ1dGVzIiwiYXR0ciIsImluY2x1ZGVzIiwidmFsdWUiLCJ0YWJzIiwic2VsZWN0VGFiIiwiZ2V0U2VsZWN0ZWRUYWJJbmRleCIsInRhYkVsIiwibGlua0VscyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwicGFuZWxFbHMiLCJ0YWIiLCJ0YWJUYXJnZXRJZCIsImdldFRhYlRhcmdldElkIiwidGFyZ2V0RWwiLCJsYWJlbCIsImxhYmVsSWQiLCJ0YWJMaW5rIiwibG9jYXRpb24iLCJoYXNoIiwic2VsZWN0ZWRUYWJFbGVtZW50IiwiZ2V0VGFiRWxlbWVudEZyb21IYXNoIiwiZ2V0U2VsZWN0ZWRUYWJFbGVtZW50IiwiZ2V0VGFiSW5kZXhGcm9tRWxlbWVudCIsImluZGV4IiwicGFuZWxFbCIsImRpc2FibGVGb2N1cyIsInN0eWxlIiwib3V0bGluZSIsIngiLCJzY3JvbGxYIiwicGFnZVhPZmZzZXQiLCJ5Iiwic2Nyb2xsWSIsInBhZ2VZT2Zmc2V0IiwiZm9jdXMiLCJzY3JvbGxUbyIsIm5hbWVzcGFjZSIsImJ1YmJsZXMiLCJuZXdJbmRleCIsImlzVmFsaWRUYWIiLCJzaG93UGFuZWwiLCJkaXNhYmxlZm9jdXMiLCJoaWRlUGFuZWwiLCJzZWxlY3RlZCIsImxhc3RTZWxlY3RlZCIsInVwZGF0ZUN1cnJlbnRUYWIiLCJjYXRlZ29yeSIsImFjdGlvbiIsInRyaW0iLCJwYXRobmFtZSIsInRhYlBhbmVsRWwiLCJ0YWJFbGVtZW50cyIsImZyb20iLCJkZWJvdW5jZSIsImZ1bmMiLCJ3YWl0IiwidGltZW91dCIsImFyZ3MiLCJhcmd1bWVudHMiLCJsYXRlciIsImFwcGx5IiwidGhyb3R0bGUiLCJsaXN0ZW5lcnMiLCJpbnRlcnZhbHMiLCJvcmllbnRhdGlvbiIsInZpc2liaWxpdHkiLCJzY3JvbGwiLCJzZXRUaHJvdHRsZUludGVydmFsIiwiaW50ZXJ2YWwiLCJsaXN0ZW5Ub1Jlc2l6ZSIsImJyb2FkY2FzdCIsInZpZXdwb3J0IiwiZ2V0U2l6ZSIsIm9yaWdpbmFsRXZlbnQiLCJsaXN0ZW5Ub09yaWVudGF0aW9uIiwiZ2V0T3JpZW50YXRpb24iLCJsaXN0ZW5Ub1Zpc2liaWxpdHkiLCJkZXRlY3RWaXNpYmxpdHlBUEkiLCJoaWRkZW4iLCJnZXRWaXNpYmlsaXR5IiwibGlzdGVuVG9TY3JvbGwiLCJzY3JvbGxQb3MiLCJnZXRTY3JvbGxQb3NpdGlvbiIsInNjcm9sbEhlaWdodCIsImhlaWdodCIsInNjcm9sbExlZnQiLCJsZWZ0Iiwic2Nyb2xsVG9wIiwidG9wIiwic2Nyb2xsV2lkdGgiLCJzdG9wTGlzdGVuaW5nVG8iLCJkZWJ1ZyIsIm9VdGlscyIsImxvZyIsImdldEhlaWdodCIsImlnbm9yZVNjcm9sbGJhcnMiLCJjbGllbnRIZWlnaHQiLCJpbm5lckhlaWdodCIsImdldFdpZHRoIiwiZGUiLCJkYiIsImlzQ1NTMUNvbXBhdCIsImNvbXBhdE1vZGUiLCJpZVgiLCJpZVkiLCJzY3JlZW4iLCJtb3pPcmllbnRhdGlvbiIsIm1zT3JpZW50YXRpb24iLCJzcGxpdCIsImhpZGRlbk5hbWUiLCJtb3pIaWRkZW4iLCJtc0hpZGRlbiIsIndlYmtpdEhpZGRlbiIsIm9UYWJzIiwidGFic09iamVjdHMiLCJyZWFkeVN0YXRlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FB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QWdCLG9CQUFoQixDQUF2QjtBQUNBO0FBQ0RuRCxTQUFTckQsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVc7QUFDeEQ7QUFDQXFELFVBQVNrRCxhQUFULENBQXVCLElBQUlDLFdBQUosQ0FBZ0Isb0JBQWhCLENBQXZCO0FBQ0EsQ0FIRCxFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9jbGllbnQvanMvbWFpbi5qc1wiKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0YTY0YjBkNDJjNDgxYWZjNWRiNiIsIi8qanNoaW50IGJyb3dzZXI6dHJ1ZSwgbm9kZTp0cnVlKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERlbGVnYXRlO1xuXG4vKipcbiAqIERPTSBldmVudCBkZWxlZ2F0b3JcbiAqXG4gKiBUaGUgZGVsZWdhdG9yIHdpbGwgbGlzdGVuXG4gKiBmb3IgZXZlbnRzIHRoYXQgYnViYmxlIHVwXG4gKiB0byB0aGUgcm9vdCBub2RlLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtOb2RlfHN0cmluZ30gW3Jvb3RdIFRoZSByb290IG5vZGUgb3IgYSBzZWxlY3RvciBzdHJpbmcgbWF0Y2hpbmcgdGhlIHJvb3Qgbm9kZVxuICovXG5mdW5jdGlvbiBEZWxlZ2F0ZShyb290KSB7XG5cbiAgLyoqXG4gICAqIE1haW50YWluIGEgbWFwIG9mIGxpc3RlbmVyXG4gICAqIGxpc3RzLCBrZXllZCBieSBldmVudCBuYW1lLlxuICAgKlxuICAgKiBAdHlwZSBPYmplY3RcbiAgICovXG4gIHRoaXMubGlzdGVuZXJNYXAgPSBbe30sIHt9XTtcbiAgaWYgKHJvb3QpIHtcbiAgICB0aGlzLnJvb3Qocm9vdCk7XG4gIH1cblxuICAvKiogQHR5cGUgZnVuY3Rpb24oKSAqL1xuICB0aGlzLmhhbmRsZSA9IERlbGVnYXRlLnByb3RvdHlwZS5oYW5kbGUuYmluZCh0aGlzKTtcbn1cblxuLyoqXG4gKiBTdGFydCBsaXN0ZW5pbmcgZm9yIGV2ZW50c1xuICogb24gdGhlIHByb3ZpZGVkIERPTSBlbGVtZW50XG4gKlxuICogQHBhcmFtICB7Tm9kZXxzdHJpbmd9IFtyb290XSBUaGUgcm9vdCBub2RlIG9yIGEgc2VsZWN0b3Igc3RyaW5nIG1hdGNoaW5nIHRoZSByb290IG5vZGVcbiAqIEByZXR1cm5zIHtEZWxlZ2F0ZX0gVGhpcyBtZXRob2QgaXMgY2hhaW5hYmxlXG4gKi9cbkRlbGVnYXRlLnByb3RvdHlwZS5yb290ID0gZnVuY3Rpb24ocm9vdCkge1xuICB2YXIgbGlzdGVuZXJNYXAgPSB0aGlzLmxpc3RlbmVyTWFwO1xuICB2YXIgZXZlbnRUeXBlO1xuXG4gIC8vIFJlbW92ZSBtYXN0ZXIgZXZlbnQgbGlzdGVuZXJzXG4gIGlmICh0aGlzLnJvb3RFbGVtZW50KSB7XG4gICAgZm9yIChldmVudFR5cGUgaW4gbGlzdGVuZXJNYXBbMV0pIHtcbiAgICAgIGlmIChsaXN0ZW5lck1hcFsxXS5oYXNPd25Qcm9wZXJ0eShldmVudFR5cGUpKSB7XG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHRoaXMuaGFuZGxlLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChldmVudFR5cGUgaW4gbGlzdGVuZXJNYXBbMF0pIHtcbiAgICAgIGlmIChsaXN0ZW5lck1hcFswXS5oYXNPd25Qcm9wZXJ0eShldmVudFR5cGUpKSB7XG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHRoaXMuaGFuZGxlLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gSWYgbm8gcm9vdCBvciByb290IGlzIG5vdFxuICAvLyBhIGRvbSBub2RlLCB0aGVuIHJlbW92ZSBpbnRlcm5hbFxuICAvLyByb290IHJlZmVyZW5jZSBhbmQgZXhpdCBoZXJlXG4gIGlmICghcm9vdCB8fCAhcm9vdC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgaWYgKHRoaXMucm9vdEVsZW1lbnQpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLnJvb3RFbGVtZW50O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcm9vdCBub2RlIGF0IHdoaWNoXG4gICAqIGxpc3RlbmVycyBhcmUgYXR0YWNoZWQuXG4gICAqXG4gICAqIEB0eXBlIE5vZGVcbiAgICovXG4gIHRoaXMucm9vdEVsZW1lbnQgPSByb290O1xuXG4gIC8vIFNldCB1cCBtYXN0ZXIgZXZlbnQgbGlzdGVuZXJzXG4gIGZvciAoZXZlbnRUeXBlIGluIGxpc3RlbmVyTWFwWzFdKSB7XG4gICAgaWYgKGxpc3RlbmVyTWFwWzFdLmhhc093blByb3BlcnR5KGV2ZW50VHlwZSkpIHtcbiAgICAgIHRoaXMucm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHRoaXMuaGFuZGxlLCB0cnVlKTtcbiAgICB9XG4gIH1cbiAgZm9yIChldmVudFR5cGUgaW4gbGlzdGVuZXJNYXBbMF0pIHtcbiAgICBpZiAobGlzdGVuZXJNYXBbMF0uaGFzT3duUHJvcGVydHkoZXZlbnRUeXBlKSkge1xuICAgICAgdGhpcy5yb290RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgdGhpcy5oYW5kbGUsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5EZWxlZ2F0ZS5wcm90b3R5cGUuY2FwdHVyZUZvclR5cGUgPSBmdW5jdGlvbihldmVudFR5cGUpIHtcbiAgcmV0dXJuIFsnYmx1cicsICdlcnJvcicsICdmb2N1cycsICdsb2FkJywgJ3Jlc2l6ZScsICdzY3JvbGwnXS5pbmRleE9mKGV2ZW50VHlwZSkgIT09IC0xO1xufTtcblxuLyoqXG4gKiBBdHRhY2ggYSBoYW5kbGVyIHRvIG9uZVxuICogZXZlbnQgZm9yIGFsbCBlbGVtZW50c1xuICogdGhhdCBtYXRjaCB0aGUgc2VsZWN0b3IsXG4gKiBub3cgb3IgaW4gdGhlIGZ1dHVyZVxuICpcbiAqIFRoZSBoYW5kbGVyIGZ1bmN0aW9uIHJlY2VpdmVzXG4gKiB0aHJlZSBhcmd1bWVudHM6IHRoZSBET00gZXZlbnRcbiAqIG9iamVjdCwgdGhlIG5vZGUgdGhhdCBtYXRjaGVkXG4gKiB0aGUgc2VsZWN0b3Igd2hpbGUgdGhlIGV2ZW50XG4gKiB3YXMgYnViYmxpbmcgYW5kIGEgcmVmZXJlbmNlXG4gKiB0byBpdHNlbGYuIFdpdGhpbiB0aGUgaGFuZGxlcixcbiAqICd0aGlzJyBpcyBlcXVhbCB0byB0aGUgc2Vjb25kXG4gKiBhcmd1bWVudC5cbiAqXG4gKiBUaGUgbm9kZSB0aGF0IGFjdHVhbGx5IHJlY2VpdmVkXG4gKiB0aGUgZXZlbnQgY2FuIGJlIGFjY2Vzc2VkIHZpYVxuICogJ2V2ZW50LnRhcmdldCcuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZSBMaXN0ZW4gZm9yIHRoZXNlIGV2ZW50c1xuICogQHBhcmFtIHtzdHJpbmd8dW5kZWZpbmVkfSBzZWxlY3RvciBPbmx5IGhhbmRsZSBldmVudHMgb24gZWxlbWVudHMgbWF0Y2hpbmcgdGhpcyBzZWxlY3RvciwgaWYgdW5kZWZpbmVkIG1hdGNoIHJvb3QgZWxlbWVudFxuICogQHBhcmFtIHtmdW5jdGlvbigpfSBoYW5kbGVyIEhhbmRsZXIgZnVuY3Rpb24gLSBldmVudCBkYXRhIHBhc3NlZCBoZXJlIHdpbGwgYmUgaW4gZXZlbnQuZGF0YVxuICogQHBhcmFtIHtib29sZWFufSBbdXNlQ2FwdHVyZV0gc2VlICd1c2VDYXB0dXJlJyBpbiA8aHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0V2ZW50VGFyZ2V0L2FkZEV2ZW50TGlzdGVuZXI+XG4gKiBAcmV0dXJucyB7RGVsZWdhdGV9IFRoaXMgbWV0aG9kIGlzIGNoYWluYWJsZVxuICovXG5EZWxlZ2F0ZS5wcm90b3R5cGUub24gPSBmdW5jdGlvbihldmVudFR5cGUsIHNlbGVjdG9yLCBoYW5kbGVyLCB1c2VDYXB0dXJlKSB7XG4gIHZhciByb290LCBsaXN0ZW5lck1hcCwgbWF0Y2hlciwgbWF0Y2hlclBhcmFtO1xuXG4gIGlmICghZXZlbnRUeXBlKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBldmVudCB0eXBlOiAnICsgZXZlbnRUeXBlKTtcbiAgfVxuXG4gIC8vIGhhbmRsZXIgY2FuIGJlIHBhc3NlZCBhc1xuICAvLyB0aGUgc2Vjb25kIG9yIHRoaXJkIGFyZ3VtZW50XG4gIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICB1c2VDYXB0dXJlID0gaGFuZGxlcjtcbiAgICBoYW5kbGVyID0gc2VsZWN0b3I7XG4gICAgc2VsZWN0b3IgPSBudWxsO1xuICB9XG5cbiAgLy8gRmFsbGJhY2sgdG8gc2Vuc2libGUgZGVmYXVsdHNcbiAgLy8gaWYgdXNlQ2FwdHVyZSBub3Qgc2V0XG4gIGlmICh1c2VDYXB0dXJlID09PSB1bmRlZmluZWQpIHtcbiAgICB1c2VDYXB0dXJlID0gdGhpcy5jYXB0dXJlRm9yVHlwZShldmVudFR5cGUpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSGFuZGxlciBtdXN0IGJlIGEgdHlwZSBvZiBGdW5jdGlvbicpO1xuICB9XG5cbiAgcm9vdCA9IHRoaXMucm9vdEVsZW1lbnQ7XG4gIGxpc3RlbmVyTWFwID0gdGhpcy5saXN0ZW5lck1hcFt1c2VDYXB0dXJlID8gMSA6IDBdO1xuXG4gIC8vIEFkZCBtYXN0ZXIgaGFuZGxlciBmb3IgdHlwZSBpZiBub3QgY3JlYXRlZCB5ZXRcbiAgaWYgKCFsaXN0ZW5lck1hcFtldmVudFR5cGVdKSB7XG4gICAgaWYgKHJvb3QpIHtcbiAgICAgIHJvb3QuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHRoaXMuaGFuZGxlLCB1c2VDYXB0dXJlKTtcbiAgICB9XG4gICAgbGlzdGVuZXJNYXBbZXZlbnRUeXBlXSA9IFtdO1xuICB9XG5cbiAgaWYgKCFzZWxlY3Rvcikge1xuICAgIG1hdGNoZXJQYXJhbSA9IG51bGw7XG5cbiAgICAvLyBDT01QTEVYIC0gbWF0Y2hlc1Jvb3QgbmVlZHMgdG8gaGF2ZSBhY2Nlc3MgdG9cbiAgICAvLyB0aGlzLnJvb3RFbGVtZW50LCBzbyBiaW5kIHRoZSBmdW5jdGlvbiB0byB0aGlzLlxuICAgIG1hdGNoZXIgPSBtYXRjaGVzUm9vdC5iaW5kKHRoaXMpO1xuXG4gIC8vIENvbXBpbGUgYSBtYXRjaGVyIGZvciB0aGUgZ2l2ZW4gc2VsZWN0b3JcbiAgfSBlbHNlIGlmICgvXlthLXpdKyQvaS50ZXN0KHNlbGVjdG9yKSkge1xuICAgIG1hdGNoZXJQYXJhbSA9IHNlbGVjdG9yO1xuICAgIG1hdGNoZXIgPSBtYXRjaGVzVGFnO1xuICB9IGVsc2UgaWYgKC9eI1thLXowLTlcXC1fXSskL2kudGVzdChzZWxlY3RvcikpIHtcbiAgICBtYXRjaGVyUGFyYW0gPSBzZWxlY3Rvci5zbGljZSgxKTtcbiAgICBtYXRjaGVyID0gbWF0Y2hlc0lkO1xuICB9IGVsc2Uge1xuICAgIG1hdGNoZXJQYXJhbSA9IHNlbGVjdG9yO1xuICAgIG1hdGNoZXIgPSBtYXRjaGVzO1xuICB9XG5cbiAgLy8gQWRkIHRvIHRoZSBsaXN0IG9mIGxpc3RlbmVyc1xuICBsaXN0ZW5lck1hcFtldmVudFR5cGVdLnB1c2goe1xuICAgIHNlbGVjdG9yOiBzZWxlY3RvcixcbiAgICBoYW5kbGVyOiBoYW5kbGVyLFxuICAgIG1hdGNoZXI6IG1hdGNoZXIsXG4gICAgbWF0Y2hlclBhcmFtOiBtYXRjaGVyUGFyYW1cbiAgfSk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBldmVudCBoYW5kbGVyXG4gKiBmb3IgZWxlbWVudHMgdGhhdCBtYXRjaFxuICogdGhlIHNlbGVjdG9yLCBmb3JldmVyXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IFtldmVudFR5cGVdIFJlbW92ZSBoYW5kbGVycyBmb3IgZXZlbnRzIG1hdGNoaW5nIHRoaXMgdHlwZSwgY29uc2lkZXJpbmcgdGhlIG90aGVyIHBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc2VsZWN0b3JdIElmIHRoaXMgcGFyYW1ldGVyIGlzIG9taXR0ZWQsIG9ubHkgaGFuZGxlcnMgd2hpY2ggbWF0Y2ggdGhlIG90aGVyIHR3byB3aWxsIGJlIHJlbW92ZWRcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKX0gW2hhbmRsZXJdIElmIHRoaXMgcGFyYW1ldGVyIGlzIG9taXR0ZWQsIG9ubHkgaGFuZGxlcnMgd2hpY2ggbWF0Y2ggdGhlIHByZXZpb3VzIHR3byB3aWxsIGJlIHJlbW92ZWRcbiAqIEByZXR1cm5zIHtEZWxlZ2F0ZX0gVGhpcyBtZXRob2QgaXMgY2hhaW5hYmxlXG4gKi9cbkRlbGVnYXRlLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbihldmVudFR5cGUsIHNlbGVjdG9yLCBoYW5kbGVyLCB1c2VDYXB0dXJlKSB7XG4gIHZhciBpLCBsaXN0ZW5lciwgbGlzdGVuZXJNYXAsIGxpc3RlbmVyTGlzdCwgc2luZ2xlRXZlbnRUeXBlO1xuXG4gIC8vIEhhbmRsZXIgY2FuIGJlIHBhc3NlZCBhc1xuICAvLyB0aGUgc2Vjb25kIG9yIHRoaXJkIGFyZ3VtZW50XG4gIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICB1c2VDYXB0dXJlID0gaGFuZGxlcjtcbiAgICBoYW5kbGVyID0gc2VsZWN0b3I7XG4gICAgc2VsZWN0b3IgPSBudWxsO1xuICB9XG5cbiAgLy8gSWYgdXNlQ2FwdHVyZSBub3Qgc2V0LCByZW1vdmVcbiAgLy8gYWxsIGV2ZW50IGxpc3RlbmVyc1xuICBpZiAodXNlQ2FwdHVyZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5vZmYoZXZlbnRUeXBlLCBzZWxlY3RvciwgaGFuZGxlciwgdHJ1ZSk7XG4gICAgdGhpcy5vZmYoZXZlbnRUeXBlLCBzZWxlY3RvciwgaGFuZGxlciwgZmFsc2UpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJNYXAgPSB0aGlzLmxpc3RlbmVyTWFwW3VzZUNhcHR1cmUgPyAxIDogMF07XG4gIGlmICghZXZlbnRUeXBlKSB7XG4gICAgZm9yIChzaW5nbGVFdmVudFR5cGUgaW4gbGlzdGVuZXJNYXApIHtcbiAgICAgIGlmIChsaXN0ZW5lck1hcC5oYXNPd25Qcm9wZXJ0eShzaW5nbGVFdmVudFR5cGUpKSB7XG4gICAgICAgIHRoaXMub2ZmKHNpbmdsZUV2ZW50VHlwZSwgc2VsZWN0b3IsIGhhbmRsZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJMaXN0ID0gbGlzdGVuZXJNYXBbZXZlbnRUeXBlXTtcbiAgaWYgKCFsaXN0ZW5lckxpc3QgfHwgIWxpc3RlbmVyTGlzdC5sZW5ndGgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIFJlbW92ZSBvbmx5IHBhcmFtZXRlciBtYXRjaGVzXG4gIC8vIGlmIHNwZWNpZmllZFxuICBmb3IgKGkgPSBsaXN0ZW5lckxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBsaXN0ZW5lciA9IGxpc3RlbmVyTGlzdFtpXTtcblxuICAgIGlmICgoIXNlbGVjdG9yIHx8IHNlbGVjdG9yID09PSBsaXN0ZW5lci5zZWxlY3RvcikgJiYgKCFoYW5kbGVyIHx8IGhhbmRsZXIgPT09IGxpc3RlbmVyLmhhbmRsZXIpKSB7XG4gICAgICBsaXN0ZW5lckxpc3Quc3BsaWNlKGksIDEpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEFsbCBsaXN0ZW5lcnMgcmVtb3ZlZFxuICBpZiAoIWxpc3RlbmVyTGlzdC5sZW5ndGgpIHtcbiAgICBkZWxldGUgbGlzdGVuZXJNYXBbZXZlbnRUeXBlXTtcblxuICAgIC8vIFJlbW92ZSB0aGUgbWFpbiBoYW5kbGVyXG4gICAgaWYgKHRoaXMucm9vdEVsZW1lbnQpIHtcbiAgICAgIHRoaXMucm9vdEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHRoaXMuaGFuZGxlLCB1c2VDYXB0dXJlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cblxuLyoqXG4gKiBIYW5kbGUgYW4gYXJiaXRyYXJ5IGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKi9cbkRlbGVnYXRlLnByb3RvdHlwZS5oYW5kbGUgPSBmdW5jdGlvbihldmVudCkge1xuICB2YXIgaSwgbCwgdHlwZSA9IGV2ZW50LnR5cGUsIHJvb3QsIHBoYXNlLCBsaXN0ZW5lciwgcmV0dXJuZWQsIGxpc3RlbmVyTGlzdCA9IFtdLCB0YXJnZXQsIC8qKiBAY29uc3QgKi8gRVZFTlRJR05PUkUgPSAnZnRMYWJzRGVsZWdhdGVJZ25vcmUnO1xuXG4gIGlmIChldmVudFtFVkVOVElHTk9SRV0gPT09IHRydWUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG5cbiAgLy8gSGFyZGNvZGUgdmFsdWUgb2YgTm9kZS5URVhUX05PREVcbiAgLy8gYXMgbm90IGRlZmluZWQgaW4gSUU4XG4gIGlmICh0YXJnZXQubm9kZVR5cGUgPT09IDMpIHtcbiAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgfVxuXG4gIHJvb3QgPSB0aGlzLnJvb3RFbGVtZW50O1xuXG4gIHBoYXNlID0gZXZlbnQuZXZlbnRQaGFzZSB8fCAoIGV2ZW50LnRhcmdldCAhPT0gZXZlbnQuY3VycmVudFRhcmdldCA/IDMgOiAyICk7XG4gIFxuICBzd2l0Y2ggKHBoYXNlKSB7XG4gICAgY2FzZSAxOiAvL0V2ZW50LkNBUFRVUklOR19QSEFTRTpcbiAgICAgIGxpc3RlbmVyTGlzdCA9IHRoaXMubGlzdGVuZXJNYXBbMV1bdHlwZV07XG4gICAgYnJlYWs7XG4gICAgY2FzZSAyOiAvL0V2ZW50LkFUX1RBUkdFVDpcbiAgICAgIGlmICh0aGlzLmxpc3RlbmVyTWFwWzBdICYmIHRoaXMubGlzdGVuZXJNYXBbMF1bdHlwZV0pIGxpc3RlbmVyTGlzdCA9IGxpc3RlbmVyTGlzdC5jb25jYXQodGhpcy5saXN0ZW5lck1hcFswXVt0eXBlXSk7XG4gICAgICBpZiAodGhpcy5saXN0ZW5lck1hcFsxXSAmJiB0aGlzLmxpc3RlbmVyTWFwWzFdW3R5cGVdKSBsaXN0ZW5lckxpc3QgPSBsaXN0ZW5lckxpc3QuY29uY2F0KHRoaXMubGlzdGVuZXJNYXBbMV1bdHlwZV0pO1xuICAgIGJyZWFrO1xuICAgIGNhc2UgMzogLy9FdmVudC5CVUJCTElOR19QSEFTRTpcbiAgICAgIGxpc3RlbmVyTGlzdCA9IHRoaXMubGlzdGVuZXJNYXBbMF1bdHlwZV07XG4gICAgYnJlYWs7XG4gIH1cblxuICAvLyBOZWVkIHRvIGNvbnRpbnVvdXNseSBjaGVja1xuICAvLyB0aGF0IHRoZSBzcGVjaWZpYyBsaXN0IGlzXG4gIC8vIHN0aWxsIHBvcHVsYXRlZCBpbiBjYXNlIG9uZVxuICAvLyBvZiB0aGUgY2FsbGJhY2tzIGFjdHVhbGx5XG4gIC8vIGNhdXNlcyB0aGUgbGlzdCB0byBiZSBkZXN0cm95ZWQuXG4gIGwgPSBsaXN0ZW5lckxpc3QubGVuZ3RoO1xuICB3aGlsZSAodGFyZ2V0ICYmIGwpIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICBsaXN0ZW5lciA9IGxpc3RlbmVyTGlzdFtpXTtcblxuICAgICAgLy8gQmFpbCBmcm9tIHRoaXMgbG9vcCBpZlxuICAgICAgLy8gdGhlIGxlbmd0aCBjaGFuZ2VkIGFuZFxuICAgICAgLy8gbm8gbW9yZSBsaXN0ZW5lcnMgYXJlXG4gICAgICAvLyBkZWZpbmVkIGJldHdlZW4gaSBhbmQgbC5cbiAgICAgIGlmICghbGlzdGVuZXIpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIC8vIENoZWNrIGZvciBtYXRjaCBhbmQgZmlyZVxuICAgICAgLy8gdGhlIGV2ZW50IGlmIHRoZXJlJ3Mgb25lXG4gICAgICAvL1xuICAgICAgLy8gVE9ETzpNQ0c6MjAxMjAxMTc6IE5lZWQgYSB3YXlcbiAgICAgIC8vIHRvIGNoZWNrIGlmIGV2ZW50I3N0b3BJbW1lZGlhdGVQcm9wYWdhdGlvblxuICAgICAgLy8gd2FzIGNhbGxlZC4gSWYgc28sIGJyZWFrIGJvdGggbG9vcHMuXG4gICAgICBpZiAobGlzdGVuZXIubWF0Y2hlci5jYWxsKHRhcmdldCwgbGlzdGVuZXIubWF0Y2hlclBhcmFtLCB0YXJnZXQpKSB7XG4gICAgICAgIHJldHVybmVkID0gdGhpcy5maXJlKGV2ZW50LCB0YXJnZXQsIGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgLy8gU3RvcCBwcm9wYWdhdGlvbiB0byBzdWJzZXF1ZW50XG4gICAgICAvLyBjYWxsYmFja3MgaWYgdGhlIGNhbGxiYWNrIHJldHVybmVkXG4gICAgICAvLyBmYWxzZVxuICAgICAgaWYgKHJldHVybmVkID09PSBmYWxzZSkge1xuICAgICAgICBldmVudFtFVkVOVElHTk9SRV0gPSB0cnVlO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVE9ETzpNQ0c6MjAxMjAxMTc6IE5lZWQgYSB3YXkgdG9cbiAgICAvLyBjaGVjayBpZiBldmVudCNzdG9wUHJvcGFnYXRpb25cbiAgICAvLyB3YXMgY2FsbGVkLiBJZiBzbywgYnJlYWsgbG9vcGluZ1xuICAgIC8vIHRocm91Z2ggdGhlIERPTS4gU3RvcCBpZiB0aGVcbiAgICAvLyBkZWxlZ2F0aW9uIHJvb3QgaGFzIGJlZW4gcmVhY2hlZFxuICAgIGlmICh0YXJnZXQgPT09IHJvb3QpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGwgPSBsaXN0ZW5lckxpc3QubGVuZ3RoO1xuICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnRFbGVtZW50O1xuICB9XG59O1xuXG4vKipcbiAqIEZpcmUgYSBsaXN0ZW5lciBvbiBhIHRhcmdldC5cbiAqXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHBhcmFtIHtOb2RlfSB0YXJnZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBsaXN0ZW5lclxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbkRlbGVnYXRlLnByb3RvdHlwZS5maXJlID0gZnVuY3Rpb24oZXZlbnQsIHRhcmdldCwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIGxpc3RlbmVyLmhhbmRsZXIuY2FsbCh0YXJnZXQsIGV2ZW50LCB0YXJnZXQpO1xufTtcblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGFuIGVsZW1lbnRcbiAqIG1hdGNoZXMgYSBnZW5lcmljIHNlbGVjdG9yLlxuICpcbiAqIEB0eXBlIGZ1bmN0aW9uKClcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciBBIENTUyBzZWxlY3RvclxuICovXG52YXIgbWF0Y2hlcyA9IChmdW5jdGlvbihlbCkge1xuICBpZiAoIWVsKSByZXR1cm47XG4gIHZhciBwID0gZWwucHJvdG90eXBlO1xuICByZXR1cm4gKHAubWF0Y2hlcyB8fCBwLm1hdGNoZXNTZWxlY3RvciB8fCBwLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fCBwLm1vek1hdGNoZXNTZWxlY3RvciB8fCBwLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IHAub01hdGNoZXNTZWxlY3Rvcik7XG59KEVsZW1lbnQpKTtcblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGFuIGVsZW1lbnRcbiAqIG1hdGNoZXMgYSB0YWcgc2VsZWN0b3IuXG4gKlxuICogVGFncyBhcmUgTk9UIGNhc2Utc2Vuc2l0aXZlLFxuICogZXhjZXB0IGluIFhNTCAoYW5kIFhNTC1iYXNlZFxuICogbGFuZ3VhZ2VzIHN1Y2ggYXMgWEhUTUwpLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWdOYW1lIFRoZSB0YWcgbmFtZSB0byB0ZXN0IGFnYWluc3RcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0byB0ZXN0IHdpdGhcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuZnVuY3Rpb24gbWF0Y2hlc1RhZyh0YWdOYW1lLCBlbGVtZW50KSB7XG4gIHJldHVybiB0YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xufVxuXG4vKipcbiAqIENoZWNrIHdoZXRoZXIgYW4gZWxlbWVudFxuICogbWF0Y2hlcyB0aGUgcm9vdC5cbiAqXG4gKiBAcGFyYW0gez9TdHJpbmd9IHNlbGVjdG9yIEluIHRoaXMgY2FzZSB0aGlzIGlzIGFsd2F5cyBwYXNzZWQgdGhyb3VnaCBhcyBudWxsIGFuZCBub3QgdXNlZFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRvIHRlc3Qgd2l0aFxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5mdW5jdGlvbiBtYXRjaGVzUm9vdChzZWxlY3RvciwgZWxlbWVudCkge1xuICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSovXG4gIGlmICh0aGlzLnJvb3RFbGVtZW50ID09PSB3aW5kb3cpIHJldHVybiBlbGVtZW50ID09PSBkb2N1bWVudDtcbiAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQgPT09IGVsZW1lbnQ7XG59XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciB0aGUgSUQgb2ZcbiAqIHRoZSBlbGVtZW50IGluICd0aGlzJ1xuICogbWF0Y2hlcyB0aGUgZ2l2ZW4gSUQuXG4gKlxuICogSURzIGFyZSBjYXNlLXNlbnNpdGl2ZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gaWQgVGhlIElEIHRvIHRlc3QgYWdhaW5zdFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRvIHRlc3Qgd2l0aFxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5mdW5jdGlvbiBtYXRjaGVzSWQoaWQsIGVsZW1lbnQpIHtcbiAgcmV0dXJuIGlkID09PSBlbGVtZW50LmlkO1xufVxuXG4vKipcbiAqIFNob3J0IGhhbmQgZm9yIG9mZigpXG4gKiBhbmQgcm9vdCgpLCBpZSBib3RoXG4gKiB3aXRoIG5vIHBhcmFtZXRlcnNcbiAqXG4gKiBAcmV0dXJuIHZvaWRcbiAqL1xuRGVsZWdhdGUucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5vZmYoKTtcbiAgdGhpcy5yb290KCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYm93ZXJfY29tcG9uZW50cy9mdGRvbWRlbGVnYXRlL2xpYi9kZWxlZ2F0ZS5qcyIsIi8qZ2xvYmFsIGV4cG9ydHMqL1xuXG5mdW5jdGlvbiBnZXRDbG9zZXN0TWF0Y2goZWwsIHNlbGVjdG9yKSB7XG5cdHdoaWxlIChlbCkge1xuXHRcdGlmIChlbC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuXHRcdFx0cmV0dXJuIGVsO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbCA9IGVsLnBhcmVudEVsZW1lbnQ7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZ2V0SW5kZXgoZWwpIHtcblx0bGV0IGkgPSAwO1xuXHRpZiAoZWwgJiYgdHlwZW9mIGVsID09PSAnb2JqZWN0JyAmJiBlbC5ub2RlVHlwZSA9PT0gMSkge1xuXHRcdHdoaWxlIChlbC5wcmV2aW91c1NpYmxpbmcpIHtcblx0XHRcdGVsID0gZWwucHJldmlvdXNTaWJsaW5nO1xuXHRcdFx0aWYgKGVsLm5vZGVUeXBlID09PSAxKSB7XG5cdFx0XHRcdCsraTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGk7XG5cdH1cbn1cblxuZXhwb3J0cy5nZXRDbG9zZXN0TWF0Y2ggPSBnZXRDbG9zZXN0TWF0Y2g7XG5leHBvcnRzLmdldEluZGV4ID0gZ2V0SW5kZXg7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ib3dlcl9jb21wb25lbnRzL28tZG9tL21haW4uanMiLCIvKmdsb2JhbCBtb2R1bGUqL1xuXG4vKipcbiAqIERldGVjdCBJRSA4IHRocm91Z2ggaW5qZWN0ZWQgY29uZGl0aW9uYWwgY29tbWVudHM6XG4gKiBubyBVQSBkZXRlY3Rpb24sIG5vIG5lZWQgZm9yIGNvbmRpdGlvbmFsIGNvbXBpbGF0aW9uIG9yIEpTIGNoZWNrXG4gKiBAcmV0dXJuIHtCb29sfSB0cnVlIGlmIHRoZSBicm93c2VyIGlzIElFIDhcbiAqL1xuY29uc3QgaXNJRTggPSAoZnVuY3Rpb24oKSB7XG5cdGNvbnN0IGIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdCJyk7XG5cdGNvbnN0IGRvY0VsZW0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cdGxldCBpc0lFO1xuXG5cdGIuaW5uZXJIVE1MID0gJzwhLS1baWYgSUUgOF0+PGIgaWQ9XCJpZTh0ZXN0XCI+PC9iPjwhW2VuZGlmXS0tPic7XG5cdGRvY0VsZW0uYXBwZW5kQ2hpbGQoYik7XG5cdGlzSUUgPSAhIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpZTh0ZXN0Jyk7XG5cdGRvY0VsZW0ucmVtb3ZlQ2hpbGQoYik7XG5cdHJldHVybiBpc0lFO1xufSgpKTtcblxuLyoqXG4gKiBHcmFiIGdyaWQgcHJvcGVydGllc1xuICogQHJldHVybiB7T2JqZWN0fSBsYXlvdXQgbmFtZXMgYW5kIGd1dHRlciB3aWR0aHNcbiAqL1xuZnVuY3Rpb24gZ2V0R3JpZFByb3BlcnRpZXMoKSB7XG5cdHJldHVybiBnZXRHcmlkRnJvbURvYygnYWZ0ZXInKTtcbn1cblxuLyoqXG4gKiBHZXQgYWxsIGxheW91dCBzaXplc1xuICogQHJldHVybiB7T2JqZWN0fSBsYXlvdXQgbmFtZXMgYW5kIHNpemVzXG4gKi9cbmZ1bmN0aW9uIGdldEdyaWRCcmVha3BvaW50cygpIHtcblx0cmV0dXJuIGdldEdyaWRGcm9tRG9jKCdiZWZvcmUnKTtcbn1cblxuLyoqXG4gKiBHcmFiIGdyaWQgcHJvcGVydGllcyBzdXJmYWNlZCBpbiBodG1sOmFmdGVyIGFuZCBodG1sOmJlZm9yZSdzIGNvbnRlbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBwb3NpdGlvbiBXaGV0aGVyIHRvIGdldCBhbGwgcHJvcGVydGllcyBpbiA6YmVmb3JlLCBvciBjdXJyZW50IHByb3BlcnRpZXMgaW4gOmFmdGVyXG4gKiBAcmV0dXJuIHtPYmplY3R9IGxheW91dCBuYW1lcyBhbmQgZ3V0dGVyIHdpZHRoc1xuICovXG5mdW5jdGlvbiBnZXRHcmlkRnJvbURvYyhwb3NpdGlvbikge1xuXHQvLyBDb250YWluZWQgaW4gYSB0cnkvY2F0Y2ggYXMgaXQgc2hvdWxkIG5vdCBlcnJvciBpZiBvLWdyaWQgc3R5bGVzIGFyZSBub3QgKGRlbGliZXJhdGVseSBvciBhY2NpZGVudGFsbHkpIGxvYWRlZFxuXHQvLyBlLmcuIG8tdHJhY2tpbmcgd2lsbCBhbHdheXMgdHJ5IHRvIHJlYWQgdGhpcyBwcm9wZXJ0eSwgYnV0IHRoZSBwYWdlIGlzIG5vdCBvYmxpZ2VkIHRvIHVzZSBvLWdyaWQgZm9yIGxheW91dFxuXHR0cnkge1xuXHRcdGxldCBncmlkUHJvcGVydGllcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJzonICsgcG9zaXRpb24pLmdldFByb3BlcnR5VmFsdWUoJ2NvbnRlbnQnKTtcblx0XHQvLyBGaXJlZm94IGNvbXB1dGVzOiBcIntcXFwiZm9vXFxcIjogXFxcImJhclxcXCJ9XCJcblx0XHQvLyBXZSB3YW50IHJlYWRhYmxlIEpTT046IHtcImZvb1wiOiBcImJhclwifVxuXHRcdGdyaWRQcm9wZXJ0aWVzID0gZ3JpZFByb3BlcnRpZXMucmVwbGFjZSgvJy9nLCAnJykucmVwbGFjZSgvXFxcXC9nLCAnJykucmVwbGFjZSgvXlwiLywgJycpLnJlcGxhY2UoL1wiJC8sICcnKTtcblx0XHRyZXR1cm4gSlNPTi5wYXJzZShncmlkUHJvcGVydGllcyk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4ge307XG5cdH1cbn1cblxuLyoqXG4gKiBHcmFiIHRoZSBjdXJyZW50IGxheW91dFxuICogQHJldHVybiB7U3RyaW5nfSBMYXlvdXQgbmFtZVxuICovXG5mdW5jdGlvbiBnZXRDdXJyZW50TGF5b3V0KCkge1xuXHRpZiAoaXNJRTgpIHtcblx0XHRyZXR1cm4gJ0wnO1xuXHR9XG5cblx0cmV0dXJuIGdldEdyaWRQcm9wZXJ0aWVzKCkubGF5b3V0O1xufVxuXG4vKipcbiAqIEdyYWIgdGhlIGN1cnJlbnQgc3BhY2UgYmV0d2VlbiBjb2x1bW5zXG4gKiBAcmV0dXJuIHtTdHJpbmd9IEd1dHRlciB3aWR0aCBpbiBwaXhlbHNcbiAqL1xuZnVuY3Rpb24gZ2V0Q3VycmVudEd1dHRlcigpIHtcblx0aWYgKGlzSUU4KSB7XG5cdFx0cmV0dXJuICcyMHB4Jztcblx0fVxuXG5cdHJldHVybiBnZXRHcmlkUHJvcGVydGllcygpLmd1dHRlcjtcbn1cblxuLyoqXG4gKiBUaGlzIHNldHMgTWVkaWFRdWVyeUxpc3RlbmVycyBvbiBhbGwgdGhlIG8tZ3JpZCBicmVha3BvaW50c1xuICogYW5kIGZpcmVzIGEgYG8tZ3JpZC5sYXlvdXRDaGFuZ2VgIGV2ZW50IG9uIGxheW91dCBjaGFuZ2UuXG4gKi9cbmZ1bmN0aW9uIGVuYWJsZUxheW91dENoYW5nZUV2ZW50cygpIHtcblx0Ly8gQ3JlYXRlIGEgbWFwIGNvbnRhaW5pbmcgYWxsIGJyZWFrcG9pbnRzIGV4cG9zZWQgdmlhIGh0bWw6YmVmb3JlXG5cdGNvbnN0IGdyaWRMYXlvdXRzID0gZ2V0R3JpZEJyZWFrcG9pbnRzKCk7XG5cdGlmIChncmlkTGF5b3V0cy5oYXNPd25Qcm9wZXJ0eSgnbGF5b3V0cycpKSB7XG5cdFx0Y29uc3QgbGF5b3V0cyA9IGdyaWRMYXlvdXRzLmxheW91dHM7XG5cdFx0Y29uc3QgYnJlYWtwb2ludHMgPSBuZXcgTWFwKE9iamVjdC5rZXlzKGxheW91dHMpLm1hcChrZXkgPT4gW2tleSwgbGF5b3V0c1trZXldXSkpO1xuXHRcdGNvbnN0IGRlY3IxID0gdmFsID0+IGAke051bWJlcih2YWwucmVwbGFjZSgncHgnLCAnJykgLSAxKX1weGA7XG5cblx0XHQvLyBHZW5lcmF0ZSBtZWRpYSBxdWVyaWVzIGZvciBlYWNoXG5cdFx0YnJlYWtwb2ludHMuZm9yRWFjaCgod2lkdGgsIHNpemUpID0+IHtcblx0XHRcdGNvbnN0IHF1ZXJpZXMgPSBbXTtcblx0XHRcdGlmIChzaXplID09PSAnUycpIHtcblx0XHRcdFx0cXVlcmllcy5wdXNoKGAobWF4LXdpZHRoOiAkeyB3aWR0aCB9KWApO1xuXHRcdFx0XHRxdWVyaWVzLnB1c2goYChtaW4td2lkdGg6ICR7IHdpZHRoIH0pIGFuZCAobWF4LXdpZHRoOiAkeyBkZWNyMShicmVha3BvaW50cy5nZXQoJ00nKSkgfSlgKTtcblx0XHRcdH0gZWxzZSBpZiAoc2l6ZSA9PT0gJ00nKSB7XG5cdFx0XHRcdHF1ZXJpZXMucHVzaChgKG1pbi13aWR0aDogJHsgd2lkdGggfSkgYW5kIChtYXgtd2lkdGg6ICR7IGRlY3IxKGJyZWFrcG9pbnRzLmdldCgnTCcpKSB9KWApO1xuXHRcdFx0fSBlbHNlIGlmIChzaXplID09PSAnTCcpIHtcblx0XHRcdFx0cXVlcmllcy5wdXNoKGAobWluLXdpZHRoOiAkeyB3aWR0aCB9KSBhbmQgKG1heC13aWR0aDogJHsgZGVjcjEoYnJlYWtwb2ludHMuZ2V0KCdYTCcpKSB9KWApO1xuXHRcdFx0fSBlbHNlIGlmIChzaXplID09PSAnWEwnKSB7XG5cdFx0XHRcdHF1ZXJpZXMucHVzaChgKG1pbi13aWR0aDogJHsgd2lkdGggfSlgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gbWF0Y2hNZWRpYSBsaXN0ZW5lciBoYW5kbGVyOiBEaXNwYXRjaCBgby1ncmlkLmxheW91dENoYW5nZWAgZXZlbnQgaWYgYSBtYXRjaFxuXHRcdFx0Y29uc3QgaGFuZGxlTVFDaGFuZ2UgPSBtcWwgPT4ge1xuXHRcdFx0XHRpZiAobXFsLm1hdGNoZXMpIHtcblx0XHRcdFx0XHR3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ28tZ3JpZC5sYXlvdXRDaGFuZ2UnLCB7XG5cdFx0XHRcdFx0XHRkZXRhaWw6IHtcblx0XHRcdFx0XHRcdFx0bGF5b3V0OiBzaXplLFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0Ly8gQ3JlYXRlIGEgbmV3IGxpc3RlbmVyIGZvciBlYWNoIGxheW91dFxuXHRcdFx0cXVlcmllcy5mb3JFYWNoKG1xID0+IHtcblx0XHRcdFx0Y29uc3QgbXFsID0gd2luZG93Lm1hdGNoTWVkaWEobXEpO1xuXHRcdFx0XHRtcWwuYWRkTGlzdGVuZXIoaGFuZGxlTVFDaGFuZ2UpO1xuXHRcdFx0XHRoYW5kbGVNUUNoYW5nZShtcWwpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc29sZS5lcnJvcignVG8gZW5hYmxlIGdyaWQgbGF5b3V0IGNoYW5nZSBldmVudHMsIGluY2x1ZGUgb0dyaWRTdXJmYWNlTGF5b3V0U2l6ZXMgaW4geW91ciBTYXNzJyk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuXHRnZXRDdXJyZW50TGF5b3V0OiBnZXRDdXJyZW50TGF5b3V0LFxuXHRnZXRDdXJyZW50R3V0dGVyOiBnZXRDdXJyZW50R3V0dGVyLFxuXHRnZXRHcmlkQnJlYWtwb2ludHM6IGdldEdyaWRCcmVha3BvaW50cyxcblx0ZW5hYmxlTGF5b3V0Q2hhbmdlRXZlbnRzOiBlbmFibGVMYXlvdXRDaGFuZ2VFdmVudHMsXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYm93ZXJfY29tcG9uZW50cy9vLWdyaWQvbWFpbi5qcyIsIi8qZ2xvYmFsIHJlcXVpcmUsbW9kdWxlKi9cblxuY29uc3Qgb0hpZXJhcmNoaWNhbE5hdiA9IHJlcXVpcmUoJy4vc3JjL2pzL1Jlc3BvbnNpdmVOYXYnKTtcbmNvbnN0IGNvbnN0cnVjdEFsbCA9IGZ1bmN0aW9uKCkge1xuXHRvSGllcmFyY2hpY2FsTmF2LmluaXQoKTtcblx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcbn07XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG9IaWVyYXJjaGljYWxOYXY7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ib3dlcl9jb21wb25lbnRzL28taGllcmFyY2hpY2FsLW5hdi9tYWluLmpzIiwiLypnbG9iYWwgcmVxdWlyZSwgbW9kdWxlKi9cblxuY29uc3QgRG9tRGVsZWdhdGUgPSByZXF1aXJlKCdmdGRvbWRlbGVnYXRlJyk7XG5jb25zdCBvRG9tID0gcmVxdWlyZSgnby1kb20nKTtcbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5mdW5jdGlvbiBOYXYocm9vdEVsKSB7XG5cblx0Y29uc3QgYm9keURlbGVnYXRlID0gbmV3IERvbURlbGVnYXRlKGRvY3VtZW50LmJvZHkpO1xuXHRjb25zdCByb290RGVsZWdhdGUgPSBuZXcgRG9tRGVsZWdhdGUocm9vdEVsKTtcblxuXHQvLyBHZXQgc3ViLWxldmVsIGVsZW1lbnRcblx0ZnVuY3Rpb24gZ2V0Q2hpbGRMaXN0RWwoZWwpIHtcblx0XHRyZXR1cm4gZWwucXVlcnlTZWxlY3RvcigndWwnKTtcblx0fVxuXG5cdC8vIENoZWNrIGlmIGVsZW1lbnQgaGFzIHN1Yi1sZXZlbCBuYXZcblx0ZnVuY3Rpb24gaGFzQ2hpbGRMaXN0KGVsKSB7XG5cdFx0cmV0dXJuICEhZ2V0Q2hpbGRMaXN0RWwoZWwpO1xuXHR9XG5cblx0Ly8gR2V0IGNvbnRyb2xsZWQgZWxlbWVudFxuXHRmdW5jdGlvbiBnZXRNZWdhRHJvcGRvd25FbChpdGVtRWwpIHtcblx0XHRpZiAoaXRlbUVsLmhhc0F0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpKSB7XG5cdFx0XHRyZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXRlbUVsLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpKTtcblx0XHR9XG5cdH1cblxuXHQvLyBDaGVjayBpZiBlbGVtZW50IGlzIGEgY29udHJvbGxlciBvZiBhbm90aGVyIERPTSBlbGVtZW50XG5cdGZ1bmN0aW9uIGlzQ29udHJvbEVsKGVsKSB7XG5cdFx0cmV0dXJuICEhKGdldENoaWxkTGlzdEVsKGVsKSB8fCBnZXRNZWdhRHJvcGRvd25FbChlbCkpO1xuXHR9XG5cblx0Ly8gQ2hlY2sgaWYgZWxlbWVudCBoYXMgYmVlbiBleHBhbmRlZFxuXHRmdW5jdGlvbiBpc0V4cGFuZGVkKGVsKSB7XG5cdFx0cmV0dXJuIGVsLmdldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcpID09PSAndHJ1ZSc7XG5cdH1cblxuXHQvLyBDaGVjayBpZiBhIGNlcnRhaW4gZWxlbWVudCBpcyBpbnNpZGUgdGhlIHJvb3QgbmF2XG5cdGZ1bmN0aW9uIGlzRWxlbWVudEluc2lkZU5hdihlbCkge1xuXHRcdGNvbnN0IGV4cGFuZGVkTGV2ZWwxRWwgPSByb290RWwucXVlcnlTZWxlY3RvcignW2RhdGEtby1oaWVyYXJjaGljYWwtbmF2LWxldmVsPVwiMVwiXSA+IFthcmlhLWV4cGFuZGVkPVwidHJ1ZVwiXScpO1xuXHRcdGxldCBleHBhbmRlZE1lZ2FEcm9wZG93bkVsO1xuXHRcdGxldCBhbGxMZXZlbDFFbHM7XG5cblx0XHRpZiAoZXhwYW5kZWRMZXZlbDFFbCkge1xuXHRcdFx0ZXhwYW5kZWRNZWdhRHJvcGRvd25FbCA9IGdldE1lZ2FEcm9wZG93bkVsKGV4cGFuZGVkTGV2ZWwxRWwpO1xuXHRcdFx0aWYgKGV4cGFuZGVkTWVnYURyb3Bkb3duRWwgJiYgZXhwYW5kZWRNZWdhRHJvcGRvd25FbC5jb250YWlucyhlbCkpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0YWxsTGV2ZWwxRWxzID0gcm9vdEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW8taGllcmFyY2hpY2FsLW5hdi1sZXZlbD1cIjFcIl0gPiBsaScpO1xuXG5cdFx0Zm9yIChsZXQgYyA9IDAsIGwgPSBhbGxMZXZlbDFFbHMubGVuZ3RoOyBjIDwgbDsgYysrKSB7XG5cdFx0XHRpZiAoYWxsTGV2ZWwxRWxzW2NdLmNvbnRhaW5zKGVsKSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Ly8gR2V0IHRoZSBsZXZlbCBhIG5hdiBpcyBpblxuXHRmdW5jdGlvbiBnZXRMZXZlbChlbCkge1xuXHRcdHJldHVybiBwYXJzZUludChlbC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1vLWhpZXJhcmNoaWNhbC1uYXYtbGV2ZWwnKSwgMTApO1xuXHR9XG5cblx0Ly8gQ2hlY2sgaWYgYSBsZXZlbCAyIG5hdiB3aWxsIGZpdCBpbiB0aGUgd2luZG93XG5cdGZ1bmN0aW9uIGxldmVsMkxpc3RGaXRzSW5XaW5kb3cobDJFbCkge1xuXHRcdHJldHVybiBsMkVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnJpZ2h0IDwgd2luZG93LmlubmVyV2lkdGg7XG5cdH1cblxuXHQvLyBDaGVjayBpZiBhbiBlbGVtZW50IHdpbGwgaGF2ZSBlbm91Z2ggc3BhY2UgdG8gaXRzIHJpZ2h0XG5cdGZ1bmN0aW9uIGVsZW1lbnRGaXRzVG9SaWdodChlbDEsIGVsMikge1xuXHRcdHJldHVybiBlbDEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkucmlnaHQgKyBlbDIub2Zmc2V0V2lkdGggPCB3aW5kb3cuaW5uZXJXaWR0aDtcblx0fVxuXG5cdC8vIERlcGVuZGluZyBvbiBpZiBhbiBlbGVtZW50IGZpdHMgdG8gaXRzIHJpZ2h0IG9yIG5vdCwgY2hhbmdlIGl0cyBjbGFzcyB0byBhcHBseSBjb3JyZWN0IGNzc1xuXHRmdW5jdGlvbiBwb3NpdGlvbkNoaWxkTGlzdEVsKHBhcmVudEVsLCBjaGlsZEVsKSB7XG5cdFx0cGFyZW50RWwuY2xhc3NMaXN0LnJlbW92ZSgnby1oaWVyYXJjaGljYWwtbmF2LS1hbGlnbi1yaWdodCcpO1xuXHRcdHBhcmVudEVsLmNsYXNzTGlzdC5yZW1vdmUoJ28taGllcmFyY2hpY2FsLW5hdl9fb3V0c2lkZS1yaWdodCcpO1xuXHRcdHBhcmVudEVsLmNsYXNzTGlzdC5yZW1vdmUoJ28taGllcmFyY2hpY2FsLW5hdi0tbGVmdCcpO1xuXG5cdFx0aWYgKCFjaGlsZEVsKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKGdldExldmVsKHBhcmVudEVsKSA9PT0gMSkge1xuXHRcdFx0aWYgKCFsZXZlbDJMaXN0Rml0c0luV2luZG93KGNoaWxkRWwpKSB7XG5cdFx0XHRcdHBhcmVudEVsLmNsYXNzTGlzdC5hZGQoJ28taGllcmFyY2hpY2FsLW5hdi0tYWxpZ24tcmlnaHQnKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKGVsZW1lbnRGaXRzVG9SaWdodChwYXJlbnRFbCwgY2hpbGRFbCkpIHtcblx0XHRcdFx0cGFyZW50RWwuY2xhc3NMaXN0LmFkZCgnby1oaWVyYXJjaGljYWwtbmF2X19vdXRzaWRlLXJpZ2h0Jyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gSGlkZSBhbiBlbGVtZW50XG5cdGZ1bmN0aW9uIGhpZGVFbChlbCkge1xuXHRcdGlmIChlbCkge1xuXHRcdFx0ZWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gRGlzcGxheSBhbiBlbGVtZW50XG5cdGZ1bmN0aW9uIHNob3dFbChlbCkge1xuXHRcdGlmIChlbCkge1xuXHRcdFx0ZWwucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpO1xuXHRcdH1cblx0fVxuXG5cdC8vIENvbGxhcHNlIGFsbCBpdGVtcyBmcm9tIGEgY2VydGFpbiBub2RlIGxpc3Rcblx0ZnVuY3Rpb24gY29sbGFwc2VBbGwobm9kZUxpc3QpIHtcblx0XHRpZiAoIW5vZGVMaXN0KSB7XG5cdFx0XHRub2RlTGlzdCA9IHJvb3RFbC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1vLWhpZXJhcmNoaWNhbC1uYXYtbGV2ZWw9XCIxXCJdID4gbGlbYXJpYS1leHBhbmRlZD10cnVlXScpO1xuXHRcdH1cblxuXHRcdHV0aWxzLm5vZGVMaXN0VG9BcnJheShub2RlTGlzdCkuZm9yRWFjaChmdW5jdGlvbihjaGlsZExpc3RJdGVtRWwpIHtcblx0XHRcdGlmIChpc0V4cGFuZGVkKGNoaWxkTGlzdEl0ZW1FbCkpIHtcblx0XHRcdFx0Y29sbGFwc2VJdGVtKGNoaWxkTGlzdEl0ZW1FbCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvLyBTZXQgYW4gZWxlbWVudCBhcyBub3QgZXhwYW5kZWQsIGFuZCBpZiBpdCBoYXMgY2hpbGRyZW4sIGRvIHRoZSBzYW1lIHRvIHRoZW1cblx0ZnVuY3Rpb24gY29sbGFwc2VJdGVtKGl0ZW1FbCkge1xuXHRcdGl0ZW1FbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcblxuXHRcdGlmICh1dGlscy5pc0lFOCkge1xuXHRcdFx0aXRlbUVsLmNsYXNzTGlzdC5hZGQoJ2ZvcmNlSUVyZXBhaW50Jyk7XG5cdFx0XHRpdGVtRWwuY2xhc3NMaXN0LnJlbW92ZSgnZm9yY2VJRXJlcGFpbnQnKTtcblx0XHR9XG5cblx0XHRpZiAoaGFzQ2hpbGRMaXN0KGl0ZW1FbCkpIHtcblx0XHRcdGNvbGxhcHNlQWxsKGdldENoaWxkTGlzdEVsKGl0ZW1FbCkuY2hpbGRyZW4pO1xuXHRcdH1cblxuXHRcdGhpZGVFbChnZXRNZWdhRHJvcGRvd25FbChpdGVtRWwpKTtcblx0XHRkaXNwYXRjaENsb3NlRXZlbnQoaXRlbUVsKTtcblx0fVxuXG5cdC8vIEdldCBzYW1lIGxldmVsIGl0ZW1zIGFuZCBjb2xsYXBzZSB0aGVtXG5cdGZ1bmN0aW9uIGNvbGxhcHNlU2libGluZ0l0ZW1zKGl0ZW1FbCkge1xuXHRcdGNvbnN0IGxpc3RMZXZlbCA9IG9Eb20uZ2V0Q2xvc2VzdE1hdGNoKGl0ZW1FbCwgJ3VsJykuZ2V0QXR0cmlidXRlKCdkYXRhLW8taGllcmFyY2hpY2FsLW5hdi1sZXZlbCcpO1xuXHRcdGNvbnN0IGxpc3RJdGVtRWxzID0gcm9vdEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW8taGllcmFyY2hpY2FsLW5hdi1sZXZlbD1cIicgKyBsaXN0TGV2ZWwgKyAnXCJdID4gbGlbYXJpYS1leHBhbmRlZD1cInRydWVcIl0nKTtcblxuXHRcdGZvciAobGV0IGMgPSAwLCBsID0gbGlzdEl0ZW1FbHMubGVuZ3RoOyBjIDwgbDsgYysrKSB7XG5cdFx0XHRjb2xsYXBzZUl0ZW0obGlzdEl0ZW1FbHNbY10pO1xuXHRcdH1cblx0fVxuXG5cdC8vIEV4cGFuZCBhIG5hdiBpdGVtXG5cdGZ1bmN0aW9uIGV4cGFuZEl0ZW0oaXRlbUVsKSB7XG5cdFx0Y29sbGFwc2VTaWJsaW5nSXRlbXMoaXRlbUVsKTtcblx0XHRpdGVtRWwuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcblx0XHRwb3NpdGlvbkNoaWxkTGlzdEVsKGl0ZW1FbCwgZ2V0Q2hpbGRMaXN0RWwoaXRlbUVsKSk7XG5cdFx0c2hvd0VsKGdldE1lZ2FEcm9wZG93bkVsKGl0ZW1FbCkpO1xuXHRcdGRpc3BhdGNoRXhwYW5kRXZlbnQoaXRlbUVsKTtcblx0fVxuXG5cdC8vIEhlbHBlciBtZXRob2QgdG8gZGlzcGF0Y2ggby1sYXllcnMgbmV3IGV2ZW50XG5cdGZ1bmN0aW9uIGRpc3BhdGNoRXhwYW5kRXZlbnQoaXRlbUVsKSB7XG5cdFx0dXRpbHMuZGlzcGF0Y2hDdXN0b21FdmVudChpdGVtRWwsICdvTGF5ZXJzLm5ldycsIHsnekluZGV4JzogMTAsICdlbCc6IGl0ZW1FbH0pO1xuXHR9XG5cblx0Ly8gSGVscGVyIG1ldGhvZCB0byBkaXNwYXRjaCBvLWxheWVycyBjbG9zZSBldmVudFxuXHRmdW5jdGlvbiBkaXNwYXRjaENsb3NlRXZlbnQoaXRlbUVsKSB7XG5cdFx0dXRpbHMuZGlzcGF0Y2hDdXN0b21FdmVudChpdGVtRWwsICdvTGF5ZXJzLmNsb3NlJywgeyd6SW5kZXgnOiAxMCwgJ2VsJzogaXRlbUVsfSk7XG5cdH1cblxuXHQvLyBIYW5kbGUgY2xpY2tzIG91cnNlbHZlZCBieSBleHBhbmRpbmcgb3IgY29sbGFwc2luZyBzZWxlY3RlZCBlbGVtZW50XG5cdGZ1bmN0aW9uIGhhbmRsZUNsaWNrKGV2KSB7XG5cdFx0Y29uc3QgaXRlbUVsID0gb0RvbS5nZXRDbG9zZXN0TWF0Y2goZXYudGFyZ2V0LCAnbGknKTtcblxuXHRcdGlmIChpdGVtRWwgJiYgaXNDb250cm9sRWwoaXRlbUVsKSkge1xuXHRcdFx0ZXYucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0aWYgKCFpc0V4cGFuZGVkKGl0ZW1FbCkpIHtcblx0XHRcdFx0ZXhwYW5kSXRlbShpdGVtRWwpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29sbGFwc2VJdGVtKGl0ZW1FbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gUG9zaXRpb24gYSBsZXZlbCAzIG5hdiBhbmQgZGVlcGVyXG5cdGZ1bmN0aW9uIHBvc2l0aW9uRXhwYW5kZWRMZXZlbHMoKSB7XG5cdFx0Ly8gZmluZCBkZWVwZXN0IGV4cGFuZGVkIG1lbnUgZWxlbWVudFxuXHRcdGNvbnN0IG9wZW5NZW51cyA9IHJvb3RFbC5xdWVyeVNlbGVjdG9yQWxsKCdsaVthcmlhLWV4cGFuZGVkPVwidHJ1ZVwiXSA+IHVsW2RhdGEtby1oaWVyYXJjaGljYWwtbmF2LWxldmVsXScpO1xuXG5cdFx0Ly8gZmluZCB0aGUgZGVlcGVzdCBsZXZlbCBjdXJyZW50bHkgb3BlblxuXHRcdGxldCBkZWVwZXN0TGV2ZWwgPSAtMTtcblx0XHRmb3IgKGxldCBjID0gMCwgbCA9IG9wZW5NZW51cy5sZW5ndGg7IGMgPCBsOyBjKyspIHtcblx0XHRcdGRlZXBlc3RMZXZlbCA9IE1hdGgubWF4KGRlZXBlc3RMZXZlbCwgb3Blbk1lbnVzW2NdLmdldEF0dHJpYnV0ZShcImRhdGEtby1oaWVyYXJjaGljYWwtbmF2LWxldmVsXCIpKTtcblx0XHR9XG5cblx0XHQvLyBzdGFydCBjaGVja2luZyBzcGFjZSAvIGNvbGxhcHNpbmcgd2hlcmUgbmVlZGVkXG5cdFx0Zm9yIChsZXQgbCA9IDI7IGwgPD0gZGVlcGVzdExldmVsOyBsKyspIHtcblx0XHRcdGNvbnN0IG9wZW5MZXZlbFBhcmVudEVsID0gcm9vdEVsLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW8taGllcmFyY2hpY2FsLW5hdi1sZXZlbD1cIicrbCsnXCJdID4gW2FyaWEtZXhwYW5kZWQ9XCJ0cnVlXCJdJyk7XG5cdFx0XHRjb25zdCBvcGVuTGV2ZWxDaGlsZEVsID0gcm9vdEVsLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW8taGllcmFyY2hpY2FsLW5hdi1sZXZlbD1cIicrbCsnXCJdID4gW2FyaWEtZXhwYW5kZWQ9XCJ0cnVlXCJdID4gdWwnKTtcblxuXHRcdFx0aWYgKG9wZW5MZXZlbFBhcmVudEVsICYmIG9wZW5MZXZlbENoaWxkRWwpIHtcblx0XHRcdFx0cG9zaXRpb25DaGlsZExpc3RFbChvcGVuTGV2ZWxQYXJlbnRFbCwgb3BlbkxldmVsQ2hpbGRFbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gUG9zaXRpb24gbGV2ZWwgMyBhbmQgYmVsb3cgb24gcmVzaXplXG5cdGZ1bmN0aW9uIHJlc2l6ZSgpIHtcblx0XHRwb3NpdGlvbkV4cGFuZGVkTGV2ZWxzKCk7XG5cdH1cblxuXHQvLyBTZXQgYWxsIHRhYkluZGV4ZXMgb2YgYSB0YWdzIHRvIDBcblx0ZnVuY3Rpb24gc2V0VGFiSW5kZXhlcygpIHtcblx0XHRjb25zdCBhRWxzID0gcm9vdEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpID4gYScpO1xuXG5cdFx0Zm9yIChsZXQgYyA9IDAsIGwgPSBhRWxzLmxlbmd0aDsgYyA8IGw7IGMrKykge1xuXHRcdFx0aWYgKCFhRWxzW2NdLmhhc0F0dHJpYnV0ZSgnaHJlZicpKSB7XG5cdFx0XHRcdGlmIChhRWxzW2NdLnRhYkluZGV4ID09PSAwKSB7IC8vIERvbid0IG92ZXJyaWRlIHRhYkluZGV4IGlmIHNvbWV0aGluZyBlbHNlIGhhcyBzZXQgaXQsIGJ1dCBvdGhlcndpc2Ugc2V0IGl0IHRvIHplcm8gdG8gbWFrZSBpdCBmb2N1c2FibGUuXG5cdFx0XHRcdFx0YUVsc1tjXS50YWJJbmRleCA9IDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBzZXRMYXllcnNDb250ZXh0KCkge1xuXHRcdC8vIFdlJ2xsIHVzZSB0aGUgYm9keSBhcyB0aGUgZGVmYXVsdCBjb250ZXh0XG5cdFx0Ym9keURlbGVnYXRlLm9uKCdvTGF5ZXJzLm5ldycsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdGlmICghaXNFbGVtZW50SW5zaWRlTmF2KGUuZGV0YWlsLmVsKSkge1xuXHRcdFx0XHRjb2xsYXBzZUFsbCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRpZiAoIXJvb3RFbCkge1xuXHRcdFx0cm9vdEVsID0gZG9jdW1lbnQuYm9keTtcblx0XHR9IGVsc2UgaWYgKCEocm9vdEVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHRyb290RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHJvb3RFbCk7XG5cdFx0fVxuXG5cdFx0cm9vdEVsLnNldEF0dHJpYnV0ZSgnZGF0YS1vLWhpZXJhcmNoaWNhbC1uYXYtLWpzJywgJycpO1xuXHRcdHNldFRhYkluZGV4ZXMoKTtcblx0XHRzZXRMYXllcnNDb250ZXh0KCk7XG5cdFx0cm9vdERlbGVnYXRlLm9uKCdjbGljaycsIGhhbmRsZUNsaWNrKTtcblx0XHRyb290RGVsZWdhdGUub24oJ2tleXVwJywgZnVuY3Rpb24oZXYpIHsgLy8gUHJlc3NpbmcgZW50ZXIga2V5IG9uIGFuY2hvcnMgd2l0aG91dCBAaHJlZiB3b24ndCB0cmlnZ2VyIGEgY2xpY2sgZXZlbnRcblx0XHRcdGlmICghZXYudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnaHJlZicpICYmIGV2LmtleUNvZGUgPT09IDEzICYmIGlzRWxlbWVudEluc2lkZU5hdihldi50YXJnZXQpKSB7XG5cdFx0XHRcdGhhbmRsZUNsaWNrKGV2KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIENvbGxhcHNlIGFsbCBlbGVtZW50cyBpZiB0aGUgdXNlciBjbGlja3Mgb3V0c2lkZSB0aGUgbmF2XG5cdFx0Ym9keURlbGVnYXRlLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KSB7XG5cdFx0XHRpZiAoIWlzRWxlbWVudEluc2lkZU5hdihldi50YXJnZXQpKSB7XG5cdFx0XHRcdGNvbGxhcHNlQWxsKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBkZXN0cm95KCkge1xuXHRcdHJvb3REZWxlZ2F0ZS5kZXN0cm95KCk7XG5cdFx0Ym9keURlbGVnYXRlLmRlc3Ryb3koKTtcblx0XHRyb290RWwucmVtb3ZlQXR0cmlidXRlKCdkYXRhLW8taGllcmFyY2hpY2FsLW5hdi0tanMnKTtcblx0fVxuXG5cdGluaXQoKTtcblxuXHR0aGlzLnJlc2l6ZSA9IHJlc2l6ZTtcblx0dGhpcy5jb2xsYXBzZUFsbCA9IGNvbGxhcHNlQWxsO1xuXHR0aGlzLmRlc3Ryb3kgPSBkZXN0cm95O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE5hdjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Jvd2VyX2NvbXBvbmVudHMvby1oaWVyYXJjaGljYWwtbmF2L3NyYy9qcy9OYXYuanMiLCIvKmdsb2JhbCByZXF1aXJlLG1vZHVsZSxkb2N1bWVudCxIVE1MRWxlbWVudCovXG5cbmNvbnN0IFNxdWlzaHlMaXN0ID0gcmVxdWlyZSgnby1zcXVpc2h5LWxpc3QnKTtcbmNvbnN0IERvbURlbGVnYXRlID0gcmVxdWlyZSgnZnRkb21kZWxlZ2F0ZScpO1xuY29uc3Qgb1ZpZXdwb3J0ID0gcmVxdWlyZSgnby12aWV3cG9ydCcpO1xuY29uc3QgTmF2ID0gcmVxdWlyZSgnLi9OYXYnKTtcblxuZnVuY3Rpb24gUmVzcG9uc2l2ZU5hdihyb290RWwpIHtcblxuXHRsZXQgcm9vdERlbGVnYXRlO1xuXHRsZXQgbmF2O1xuXHRsZXQgY29udGVudEZpbHRlckVsO1xuXHRsZXQgY29udGVudEZpbHRlcjtcblx0bGV0IG1vcmVFbDtcblx0bGV0IG1vcmVMaXN0RWw7XG5cdGNvbnN0IGNsb25lZElkUHJlZml4ID0gJ28taGllcmFyY2hpY2FsLW5hdl9fY2xvbmVkLWlkLSc7XG5cdGxldCBwcmVmaXhlZE5vZGVzID0gW107XG5cblx0Ly8gQ2hlY2sgaWYgZWxlbWVudCBpcyBhIGNvbnRyb2xsZXIgb2YgYW5vdGhlciBET00gZWxlbWVudFxuXHRmdW5jdGlvbiBpc01lZ2FEcm9wZG93bkNvbnRyb2woZWwpIHtcblx0XHRyZXR1cm4gKGVsICYmIGVsLmhhc0F0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpKTtcblx0fVxuXG5cdC8vIE9uIHJlc2l6ZSwgYXBwbHkgby1zcXVpc2h5LWxpc3QsIGFuZCwgaWYgaXQgaGFzIGEgc3ViLWxldmVsIGRvbSwgcG9wdWxhdGUgbW9yZSBsaXN0XG5cdGZ1bmN0aW9uIHJlc2l6ZSgpIHtcblx0XHRuYXYucmVzaXplKCk7XG5cblx0XHRpZiAoY29udGVudEZpbHRlcikge1xuXHRcdFx0Y29udGVudEZpbHRlci5zcXVpc2goKTtcblx0XHRcdGlmICghaXNNZWdhRHJvcGRvd25Db250cm9sKG1vcmVFbCkpIHtcblx0XHRcdFx0cG9wdWxhdGVNb3JlTGlzdChjb250ZW50RmlsdGVyLmdldEhpZGRlbkl0ZW1zKCkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIEVtcHR5IHRoZSBtb3JlIGxpc3Rcblx0ZnVuY3Rpb24gZW1wdHlNb3JlTGlzdCgpIHtcblx0XHRpZiAobW9yZUxpc3RFbCkge1xuXHRcdFx0bW9yZUxpc3RFbC5pbm5lckhUTUwgPSAnJztcblx0XHR9XG5cdH1cblxuXHQvLyBHZXQgdGhlIGluZm9ybWF0aW9uIGZyb20gdGhlIGVsZW1lbnQgYW5kIGNyZWF0ZSBhIG5ldyBsaSB0YWcgd2l0aCB0aGUgZWxlbWVudCdzIHRleHQgdG8gYXBwZW5kIG1vcmUgbGlzdFxuXHRmdW5jdGlvbiBhZGRJdGVtVG9Nb3JlTGlzdCh0ZXh0LCBocmVmKSB7XG5cdFx0Y29uc3QgaXRlbUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblx0XHRjb25zdCBhRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cblx0XHRpZiAodHlwZW9mIGFFbC50ZXh0Q29udGVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdGFFbC50ZXh0Q29udGVudCA9IHRleHQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGFFbC5pbm5lclRleHQgPSB0ZXh0O1xuXHRcdH1cblxuXHRcdGFFbC5ocmVmID0gaHJlZjtcblx0XHRpdGVtRWwuYXBwZW5kQ2hpbGQoYUVsKTtcblx0XHRtb3JlTGlzdEVsLmFwcGVuZENoaWxkKGl0ZW1FbCk7XG5cdH1cblxuXHRmdW5jdGlvbiBjbG9uZUl0ZW1Ub01vcmVMaXN0KGVsKSB7XG5cdFx0Y29uc3QgY2xvbmVFbCA9IGVsLmNsb25lTm9kZSh0cnVlKTtcblx0XHQvLyByZW1vdmUgdGhlIGF0dHJpYnV0ZXMgdGhhdCBhcmUgb25seSBhcHBsaWNhYmxlIHRvIGhpZ2hlciBsZXZlbFxuXHRcdGNsb25lRWwucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXByaW9yaXR5Jyk7XG5cdFx0Y2xvbmVFbC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XG5cdFx0Y2xvbmVFbC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtby1oaWVyYXJjaGljYWwtbmF2LWlzLWNsb25lYWJsZScpO1xuXHRcdC8vIHJlY3Vyc2UgdGhyb3VnaCBjaGlsZHJlbiBhbmQgYW1lbmQgYW55IGlkIHZhbHVlcyB0byBtYWludGFpbiB1bmlxdWVuZXNzXG5cdFx0cHJlZml4SWRzKGVsKTtcblxuXHRcdC8vIGluY3JlYXNlIGxldmVsIG9mIG5lc3RlZCBtZW51c1xuXHRcdGluY3JlbWVudE1lbnVEZXB0aHMoY2xvbmVFbCk7XG5cblx0XHRtb3JlTGlzdEVsLmFwcGVuZENoaWxkKGNsb25lRWwpO1xuXHR9XG5cblx0ZnVuY3Rpb24gcmVzZXRJZHMoKSB7XG5cdFx0bGV0IG5leHROb2RlO1xuXHRcdHdoaWxlIChwcmVmaXhlZE5vZGVzLmxlbmd0aCA+IDApIHtcblx0XHRcdG5leHROb2RlID0gcHJlZml4ZWROb2Rlcy5wb3AoKTtcblx0XHRcdG5leHROb2RlLnNldEF0dHJpYnV0ZSgnaWQnLCBuZXh0Tm9kZS5nZXRBdHRyaWJ1dGUoJ2lkJykucmVwbGFjZShjbG9uZWRJZFByZWZpeCwgJycpKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBpbmNyZW1lbnRNZW51RGVwdGhzKGVsKSB7XG5cdFx0Ly8gZGF0YS1vLWhpZXJhcmNoaWNhbC1uYXYtbGV2ZWwgYXR0cmlidXRlIGlzIGluY3JlbWVudGVkIGJ5IG9uZSBmb3IgZWFjaFxuXHRcdC8vIG9mIHRoZSBjaGlsZHJlbiByZWN1cnNpdmVseS4gTW9kaWZpZXMgZWxlbWVudHMgaW4gcGxhY2UsIGFzc3VtZXNcblx0XHQvLyBjbG9uZWQgZWxlbWVudCB0byBiZSBwYXNzZWQgaW4uXG5cdFx0bGV0IGNoaWxkO1xuXHRcdGlmIChlbC5oYXNDaGlsZE5vZGVzKCkpIHtcblx0XHRcdGNvbnN0IGNoaWxkcmVuID0gZWwuY2hpbGROb2Rlcztcblx0XHRcdGZvciAobGV0IGkgPSAwLCBsID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHRcdGNoaWxkID0gY2hpbGRyZW5baV07XG5cdFx0XHRcdGlmIChjaGlsZCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG5cdFx0XHRcdFx0aWYgKGNoaWxkLmhhc0F0dHJpYnV0ZSgnZGF0YS1vLWhpZXJhcmNoaWNhbC1uYXYtbGV2ZWwnKSkge1xuXHRcdFx0XHRcdFx0Ly8gaW5jcmVtZW50IG5hdi1sZXZlbCB3aGVuIGF0dHJpYnV0ZSBwcmVzZW50XG5cdFx0XHRcdFx0XHRsZXQgb3JpZ05hdkxldmVsID0gcGFyc2VJbnQoY2hpbGQuZ2V0QXR0cmlidXRlKCdkYXRhLW8taGllcmFyY2hpY2FsLW5hdi1sZXZlbCcpLCAxMCk7XG5cdFx0XHRcdFx0XHRsZXQgdXBkYXRlZE5hdkxldmVsID0gKGlzTmFOKG9yaWdOYXZMZXZlbCkgPyAwIDogb3JpZ05hdkxldmVsKSArIDE7XG5cdFx0XHRcdFx0XHRjaGlsZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtby1oaWVyYXJjaGljYWwtbmF2LWxldmVsJywgdXBkYXRlZE5hdkxldmVsKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aW5jcmVtZW50TWVudURlcHRocyhjaGlsZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBwcmVmaXhJZHMoZWwpIHtcblx0XHQvLyBpZCdzIGFyZSBwcmVmaXhlZCB0byBlbnN1cmUgdGhhdCBhbnkgaWQgYmFzZWQgZnVuY3Rpb25hbGl0eSB1c2VzIHRoZSB2aXNpYmxlIGVsZW1lbnRcblx0XHQvLyBmb3IgZXhhbXBsZSBhICdsYWJlbCcgdGFnIHdpdGggYSAnZm9yJyBhdHRyaWJ1dGUgd2lsbCBub3QgZmluZCB0aGUgY29ycmVjdCBpbnB1dCBpdFxuXHRcdC8vIHJlbGF0ZXMgdG8gYXMgaXQgdXNlcyB0aGUgZmlyc3QgbWF0Y2hpbmcgaWQgaW4gdGhlIGRvY3VtZW50XG5cdFx0bGV0IGNoaWxkO1xuXHRcdGlmIChlbC5oYXNDaGlsZE5vZGVzKCkpIHtcblx0XHRcdGNvbnN0IGNoaWxkcmVuID0gZWwuY2hpbGROb2Rlcztcblx0XHRcdGZvciAobGV0IGkgPSAwLCBsID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHRcdGNoaWxkID0gY2hpbGRyZW5baV07XG5cdFx0XHRcdGlmIChjaGlsZCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG5cdFx0XHRcdFx0aWYgKGNoaWxkLmhhc0F0dHJpYnV0ZSgnaWQnKSkge1xuXHRcdFx0XHRcdFx0cHJlZml4ZWROb2Rlcy5wdXNoKGNoaWxkKTsgLy8gc3RvcmUgdG8gbWFrZSB0aGUgY2xlYW51cCBtb3JlIHBlcmZvcm1hbnRcblx0XHRcdFx0XHRcdGNoaWxkLnNldEF0dHJpYnV0ZSgnaWQnLCBjbG9uZWRJZFByZWZpeCArIGNoaWxkLmdldEF0dHJpYnV0ZSgnaWQnKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHByZWZpeElkcyhjaGlsZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBGb3IgZXZlcnkgaGlkZGVuIGl0ZW0sIGFkZCBpdCB0byB0aGUgbW9yZSBsaXN0XG5cdGZ1bmN0aW9uIHBvcHVsYXRlTW9yZUxpc3QoaGlkZGVuRWxzKSB7XG5cdFx0ZW1wdHlNb3JlTGlzdCgpO1xuXHRcdHJlc2V0SWRzKCk7XG5cblx0XHRmb3IgKGxldCBjID0gMCwgbCA9IGhpZGRlbkVscy5sZW5ndGg7IGMgPCBsOyBjKyspIHtcblx0XHRcdGNvbnN0IGFFbCA9IGhpZGRlbkVsc1tjXS5xdWVyeVNlbGVjdG9yKCdhJyk7XG5cdFx0XHRjb25zdCB1bEVsID0gaGlkZGVuRWxzW2NdLnF1ZXJ5U2VsZWN0b3IoJ3VsJyk7XG5cblx0XHRcdGlmIChoaWRkZW5FbHNbY10uaGFzQXR0cmlidXRlKCdkYXRhLW8taGllcmFyY2hpY2FsLW5hdi1pcy1jbG9uZWFibGUnKSkge1xuXHRcdFx0XHRjbG9uZUl0ZW1Ub01vcmVMaXN0KGhpZGRlbkVsc1tjXSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zdCBhVGV4dCA9ICh0eXBlb2YgYUVsLnRleHRDb250ZW50ICE9PSAndW5kZWZpbmVkJykgPyBhRWwudGV4dENvbnRlbnQgOiBhRWwuaW5uZXJUZXh0O1xuXHRcdFx0XHRhZGRJdGVtVG9Nb3JlTGlzdChhVGV4dCwgYUVsLmhyZWYsIHVsRWwpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIElmIGFsbCBlbGVtZW50cyBhcmUgaGlkZGVuLCBhZGQgdGhlIGFsbCBtb2RpZmllciwgaWYgbm90LCB0aGUgc29tZSBtb2RpZmllclxuXHRmdW5jdGlvbiBzZXRNb3JlRWxDbGFzcyhyZW1haW5pbmdJdGVtcykge1xuXHRcdGlmICghbW9yZUVsKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKHJlbWFpbmluZ0l0ZW1zID09PSAwKSB7XG5cdFx0XHRtb3JlRWwuY2xhc3NMaXN0LmFkZCgnby1oaWVyYXJjaGljYWwtbmF2X19tb3JlLS1hbGwnKTtcblx0XHRcdG1vcmVFbC5jbGFzc0xpc3QucmVtb3ZlKCdvLWhpZXJhcmNoaWNhbC1uYXZfX21vcmUtLXNvbWUnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bW9yZUVsLmNsYXNzTGlzdC5hZGQoJ28taGllcmFyY2hpY2FsLW5hdl9fbW9yZS0tc29tZScpO1xuXHRcdFx0bW9yZUVsLmNsYXNzTGlzdC5yZW1vdmUoJ28taGllcmFyY2hpY2FsLW5hdl9fbW9yZS0tYWxsJyk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gV2hlbiB0aGVyZSdzIGFuIG8tc3F1aXNoeS1saXN0IGNoYW5nZSwgY29sbGFwc2UgYWxsIGVsZW1lbnRzIGFuZCBydW4gdGhlIHNldE1vcmVFbENsYXNzIG1ldGhvZCB3aXRoIG51bWJlciBvZiBub24taGlkZGVuIGVsZW1lbnRzXG5cdGZ1bmN0aW9uIGNvbnRlbnRGaWx0ZXJDaGFuZ2VIYW5kbGVyKGV2KSB7XG5cdFx0aWYgKGV2LnRhcmdldCA9PT0gY29udGVudEZpbHRlckVsICYmIGV2LmRldGFpbC5oaWRkZW5JdGVtcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRuYXYuY29sbGFwc2VBbGwoKTtcblx0XHRcdHNldE1vcmVFbENsYXNzKGV2LmRldGFpbC5yZW1haW5pbmdJdGVtcy5sZW5ndGgpO1xuXHRcdH1cblx0fVxuXG5cdC8vIElmIG1vcmUgYnV0dG9uIGlzIGNsaWNrZWQsIHBvcHVsYXRlIGl0XG5cdGZ1bmN0aW9uIG5hdkV4cGFuZEhhbmRsZXIoZXYpIHtcblx0XHRpZiAoZXYudGFyZ2V0ID09PSBtb3JlRWwpIHtcblx0XHRcdHBvcHVsYXRlTW9yZUxpc3QoY29udGVudEZpbHRlci5nZXRIaWRkZW5JdGVtcygpKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGlmICghcm9vdEVsKSB7XG5cdFx0XHRyb290RWwgPSBkb2N1bWVudC5ib2R5O1xuXHRcdH0gZWxzZSBpZiAoIShyb290RWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcblx0XHRcdHJvb3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iocm9vdEVsKTtcblx0XHR9XG5cblx0XHRuYXYgPSBuZXcgTmF2KHJvb3RFbCk7XG5cdFx0cm9vdERlbGVnYXRlID0gbmV3IERvbURlbGVnYXRlKHJvb3RFbCk7XG5cdFx0Y29udGVudEZpbHRlckVsID0gcm9vdEVsLnF1ZXJ5U2VsZWN0b3IoJ3VsJyk7XG5cdFx0bW9yZUVsID0gcm9vdEVsLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW1vcmVdJyk7XG5cblx0XHRpZiAoY29udGVudEZpbHRlckVsKSB7XG5cdFx0XHRjb250ZW50RmlsdGVyID0gbmV3IFNxdWlzaHlMaXN0KGNvbnRlbnRGaWx0ZXJFbCwgeyBmaWx0ZXJPblJlc2l6ZTogZmFsc2UgfSk7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgdGhlcmUncyBhIG1vcmUgZWxlbWVudCwgYWRkIGEgdWwgdGFnIHdoZXJlIGhpZGRlbiBlbGVtZW50cyB3aWxsIGJlIGFwcGVuZGVkXG5cdFx0aWYgKG1vcmVFbCkge1xuXHRcdFx0bW9yZUVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG5cdFx0XHRpZiAoIWlzTWVnYURyb3Bkb3duQ29udHJvbChtb3JlRWwpKSB7XG5cdFx0XHRcdG1vcmVMaXN0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuXHRcdFx0XHRtb3JlTGlzdEVsLnNldEF0dHJpYnV0ZSgnZGF0YS1vLWhpZXJhcmNoaWNhbC1uYXYtbGV2ZWwnLCAnMicpO1xuXHRcdFx0XHRtb3JlRWwuYXBwZW5kQ2hpbGQobW9yZUxpc3RFbCk7XG5cdFx0XHRcdHJvb3REZWxlZ2F0ZS5vbignb0xheWVycy5uZXcnLCBuYXZFeHBhbmRIYW5kbGVyKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyb290RGVsZWdhdGUub24oJ29TcXVpc2h5TGlzdC5jaGFuZ2UnLCBjb250ZW50RmlsdGVyQ2hhbmdlSGFuZGxlcik7XG5cblx0XHRjb25zdCBib2R5RGVsZWdhdGUgPSBuZXcgRG9tRGVsZWdhdGUoZG9jdW1lbnQuYm9keSk7XG5cblx0XHQvLyBGb3JjZSBhIHJlc2l6ZSB3aGVuIGl0IGxvYWRzLCBpbiBjYXNlIGl0IGxvYWRzIG9uIGEgc21hbGxlciBzY3JlZW5cblx0XHRyZXNpemUoKTtcblxuXHRcdG9WaWV3cG9ydC5saXN0ZW5UbygncmVzaXplJyk7XG5cdFx0Ym9keURlbGVnYXRlLm9uKCdvVmlld3BvcnQucmVzaXplJywgcmVzaXplKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG5cdFx0cHJlZml4ZWROb2RlcyA9IFtdO1xuXHRcdHJvb3REZWxlZ2F0ZS5kZXN0cm95KCk7XG5cdFx0cm9vdEVsLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1vLWhpZXJhcmNoaWNhbC1uYXYtLWpzJyk7XG5cdH1cblxuXHRpbml0KCk7XG5cblx0dGhpcy5yZXNpemUgPSByZXNpemU7XG5cdHRoaXMuZGVzdHJveSA9IGRlc3Ryb3k7XG59XG5cbi8vIEluaXRpYWxpemVzIGFsbCBuYXYgZWxlbWVudHMgaW4gdGhlIHBhZ2Ugb3Igd2hhdGV2ZXIgZWxlbWVudCBpcyBwYXNzZWQgdG8gaXRcblJlc3BvbnNpdmVOYXYuaW5pdCA9IGZ1bmN0aW9uKGVsKSB7XG5cdGlmICghZWwpIHtcblx0XHRlbCA9IGRvY3VtZW50LmJvZHk7XG5cdH0gZWxzZSBpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuXHRcdGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCk7XG5cdH1cblxuXHRjb25zdCBuYXZFbHMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1vLWNvbXBvbmVudD1cIm8taGllcmFyY2hpY2FsLW5hdlwiXScpO1xuXHRjb25zdCByZXNwb25zaXZlTmF2cyA9IFtdO1xuXG5cdGZvciAobGV0IGMgPSAwLCBsID0gbmF2RWxzLmxlbmd0aDsgYyA8IGw7IGMrKykge1xuXHRcdGlmICghbmF2RWxzW2NdLmhhc0F0dHJpYnV0ZSgnZGF0YS1vLWhpZXJhcmNoaWNhbC1uYXYtLWpzJykpIHtcblx0XHRcdC8vIElmIGl0J3MgYSB2ZXJ0aWNhbCBuYXYsIHdlIGRvbid0IG5lZWQgYWxsIHRoZSByZXNwb25zaXZlIG1ldGhvZHNcblx0XHRcdGlmIChuYXZFbHNbY10uZ2V0QXR0cmlidXRlKCdkYXRhLW8taGllcmFyY2hpY2FsLW5hdi1vcmllbnRpYXRpb24nKSA9PT0gJ3ZlcnRpY2FsJykge1xuXHRcdFx0XHRyZXNwb25zaXZlTmF2cy5wdXNoKG5ldyBOYXYobmF2RWxzW2NdKSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXNwb25zaXZlTmF2cy5wdXNoKG5ldyBSZXNwb25zaXZlTmF2KG5hdkVsc1tjXSkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiByZXNwb25zaXZlTmF2cztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVzcG9uc2l2ZU5hdjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Jvd2VyX2NvbXBvbmVudHMvby1oaWVyYXJjaGljYWwtbmF2L3NyYy9qcy9SZXNwb25zaXZlTmF2LmpzIiwiLypnbG9iYWwgZXhwb3J0cyovXG5cbi8vIEhlbHBlciBmdW5jdGlvbiB0aGF0IGNvbnZlcnRzIGEgbGlzdCBvZiBlbGVtZW50cyBpbnRvIGFuIGFycmF5XG5mdW5jdGlvbiBub2RlTGlzdFRvQXJyYXkobmwpIHtcblx0cmV0dXJuIFtdLm1hcC5jYWxsKG5sLCBmdW5jdGlvbihlbGVtZW50KSB7XG5cdFx0cmV0dXJuIGVsZW1lbnQ7XG5cdH0pO1xufVxuXG4vLyBIZWxwZXIgZnVuY3Rpb24gdG8gZGlzcGF0Y2ggZXZlbnRzXG5mdW5jdGlvbiBkaXNwYXRjaEN1c3RvbUV2ZW50KGVsLCBuYW1lLCBkYXRhKSB7XG5cdGlmIChkb2N1bWVudC5jcmVhdGVFdmVudCAmJiBlbC5kaXNwYXRjaEV2ZW50KSB7XG5cdFx0Y29uc3QgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcblx0XHRldmVudC5pbml0RXZlbnQobmFtZSwgdHJ1ZSwgdHJ1ZSk7XG5cblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0ZXZlbnQuZGV0YWlsID0gZGF0YTtcblx0XHR9XG5cblx0XHRlbC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblx0fVxufVxuXG5mdW5jdGlvbiBpc0lFOCgpIHtcblx0Y29uc3QgYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0InKTtcblx0Y29uc3QgZG9jRWxlbSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblx0bGV0IGlzSUU7XG5cblx0Yi5pbm5lckhUTUwgPSAnPCEtLVtpZiBJRSA4XT48YiBpZD1cImllOHRlc3RcIj48L2I+PCFbZW5kaWZdLS0+Jztcblx0ZG9jRWxlbS5hcHBlbmRDaGlsZChiKTtcblx0aXNJRSA9ICEhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2llOHRlc3QnKTtcblx0ZG9jRWxlbS5yZW1vdmVDaGlsZChiKTtcblx0cmV0dXJuIGlzSUU7XG59XG5cbmV4cG9ydHMuaXNJRTggPSBpc0lFOCgpO1xuZXhwb3J0cy5ub2RlTGlzdFRvQXJyYXkgPSBub2RlTGlzdFRvQXJyYXk7XG5leHBvcnRzLmRpc3BhdGNoQ3VzdG9tRXZlbnQgPSBkaXNwYXRjaEN1c3RvbUV2ZW50O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYm93ZXJfY29tcG9uZW50cy9vLWhpZXJhcmNoaWNhbC1uYXYvc3JjL2pzL3V0aWxzLmpzIiwiZXhwb3J0IGRlZmF1bHRcbmNsYXNzIFNxdWlzaHlMaXN0IHtcblx0Y29uc3RydWN0b3Iocm9vdEVsLCBvcHRzKXtcblx0XHR0aGlzLmVsZW1lbnQgPSByb290RWw7XG5cdFx0dGhpcy5tb3JlV2lkdGggPSAwO1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdHMgfHwgeyBmaWx0ZXJPblJlc2l6ZTogdHJ1ZSB9O1xuXG5cdFx0dGhpcy5nZXRQcmlvcml0eVNvcnRlZENoaWxkTm9kZUVscygpO1xuXHRcdHRoaXMubW9yZUVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW1vcmVdJyk7XG5cdFx0aWYgKHRoaXMubW9yZUVsKSB7XG5cdFx0XHR0aGlzLnNob3dFbCh0aGlzLm1vcmVFbCk7XG5cdFx0XHR0aGlzLm1vcmVXaWR0aCA9IHRoaXMubW9yZUVsLm9mZnNldFdpZHRoO1xuXHRcdFx0dGhpcy5oaWRlRWwodGhpcy5tb3JlRWwpO1xuXHRcdH1cblx0XHR0aGlzLnNxdWlzaCgpO1xuXHRcdGlmICh0aGlzLm9wdGlvbnMuZmlsdGVyT25SZXNpemUpIHtcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZUhhbmRsZXIuYmluZCh0aGlzKSwgZmFsc2UpO1xuXHRcdH1cblxuXHRcdHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudCgnb1NxdWlzaHlMaXN0LnJlYWR5Jyk7XG5cdH1cblxuXHRzdGF0aWMgaW5pdChlbCwgb3B0cykge1xuXHRcdGlmICghZWwpIHtcblx0XHRcdGVsID0gZG9jdW1lbnQuYm9keTtcblx0XHR9XG5cdFx0aWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcblx0XHRcdGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCk7XG5cdFx0fVxuXHRcdGlmICgvXFxiby1zcXVpc2h5LWxpc3RcXGIvLnRlc3QoZWwuZ2V0QXR0cmlidXRlKCdkYXRhLW8tY29tcG9uZW50JykpKSB7XG5cdFx0XHRyZXR1cm4gbmV3IFNxdWlzaHlMaXN0KGVsLCBvcHRzKTtcblx0XHR9XG5cdFx0cmV0dXJuIFtdLm1hcC5jYWxsKGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW8tY29tcG9uZW50PVwiby1zcXVpc2h5LWxpc3RcIl0nKSwgZWwgPT4gbmV3IFNxdWlzaHlMaXN0KGVsLCBvcHRzKSk7XG5cdH1cblxuXHRkaXNwYXRjaEN1c3RvbUV2ZW50KG5hbWUsIGRhdGEpIHtcblx0XHRpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnQgJiYgdGhpcy5lbGVtZW50LmRpc3BhdGNoRXZlbnQpIHtcblx0XHRcdGNvbnN0IGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG5cdFx0XHRldmVudC5pbml0RXZlbnQobmFtZSwgdHJ1ZSwgdHJ1ZSk7XG5cdFx0XHRpZiAoZGF0YSkge1xuXHRcdFx0XHRldmVudC5kZXRhaWwgPSBkYXRhO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5lbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXHRcdH1cblx0fVxuXG5cdGdldEl0ZW1FbHMoKSB7XG5cdFx0Y29uc3QgaXRlbUVscyA9IFtdO1xuXHRcdGxldCBjaGlsZE5vZGVFbDtcblxuXHRcdGZvciAobGV0IGMgPSAwLCBsID0gdGhpcy5lbGVtZW50LmNoaWxkTm9kZXMubGVuZ3RoOyBjIDwgbDsgYysrKSB7XG5cdFx0XHRjaGlsZE5vZGVFbCA9IHRoaXMuZWxlbWVudC5jaGlsZE5vZGVzW2NdO1xuXG5cdFx0XHQvLyBNYWtlIGl0IGZsZXhpYmxlIHNvIHRoYXQgb3RoZXIgcHJvZHVjdCBhbmQgbW9kdWxlcyBjYW4gbWFudWFsbHkgaGlkZSBlbGVtZW50cyBhbmQgby1zcXVpc2h5LWxpc3Qgd29uJ3QgYWRkIGl0IHRvIGl0J3MgbGlzdFxuXHRcdFx0aWYgKGNoaWxkTm9kZUVsLm5vZGVUeXBlID09PSAxICYmICFjaGlsZE5vZGVFbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbW9yZScpICYmICFjaGlsZE5vZGVFbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtby1zcXVpc2h5LWxpc3QtLWlnbm9yZScpKSB7XG5cdFx0XHRcdGl0ZW1FbHMucHVzaChjaGlsZE5vZGVFbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBpdGVtRWxzO1xuXHR9XG5cblx0c2hvd0VsKGVsKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2xhc3MtbWV0aG9kcy11c2UtdGhpc1xuXHRcdGlmIChlbCkge1xuXHRcdFx0ZWwucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpO1xuXHRcdH1cblx0fVxuXG5cdGhpZGVFbChlbCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcblx0XHRpZiAoZWwpIHtcblx0XHRcdGVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXHRcdH1cblx0fVxuXG5cdGdldEVsUHJpb3JpdHkoZWwpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG5cdFx0cmV0dXJuIHBhcnNlSW50KGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1wcmlvcml0eScpLCAxMCk7XG5cdH1cblxuXHRnZXRQcmlvcml0eVNvcnRlZENoaWxkTm9kZUVscygpIHtcblx0XHR0aGlzLmFsbEl0ZW1FbHMgPSB0aGlzLmdldEl0ZW1FbHMoKTtcblx0XHR0aGlzLnByaW9yaXR5U29ydGVkSXRlbUVscyA9IFtdO1xuXHRcdGNvbnN0IHVucHJpb3JpdGlzZWRJdGVtRWxzID0gW107XG5cdFx0Zm9yIChsZXQgYyA9IDAsIGwgPSB0aGlzLmFsbEl0ZW1FbHMubGVuZ3RoOyBjIDwgbDsgYysrKSB7XG5cdFx0XHRjb25zdCB0aGlzSXRlbUVsID0gdGhpcy5hbGxJdGVtRWxzW2NdO1xuXHRcdFx0Y29uc3QgdGhpc0l0ZW1Qcmlvcml0eSA9IHRoaXMuZ2V0RWxQcmlvcml0eSh0aGlzSXRlbUVsKTtcblx0XHRcdGlmIChpc05hTih0aGlzSXRlbVByaW9yaXR5KSkge1xuXHRcdFx0XHR1bnByaW9yaXRpc2VkSXRlbUVscy5wdXNoKHRoaXNJdGVtRWwpO1xuXHRcdFx0fSBlbHNlIGlmICh0aGlzSXRlbVByaW9yaXR5ID49IDApIHtcblx0XHRcdFx0aWYgKCFBcnJheS5pc0FycmF5KHRoaXMucHJpb3JpdHlTb3J0ZWRJdGVtRWxzW3RoaXNJdGVtUHJpb3JpdHldKSkge1xuXHRcdFx0XHRcdHRoaXMucHJpb3JpdHlTb3J0ZWRJdGVtRWxzW3RoaXNJdGVtUHJpb3JpdHldID0gW107XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5wcmlvcml0eVNvcnRlZEl0ZW1FbHNbdGhpc0l0ZW1Qcmlvcml0eV0ucHVzaCh0aGlzSXRlbUVsKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHVucHJpb3JpdGlzZWRJdGVtRWxzLmxlbmd0aCA+IDApIHtcblx0XHRcdHRoaXMucHJpb3JpdHlTb3J0ZWRJdGVtRWxzLnB1c2godW5wcmlvcml0aXNlZEl0ZW1FbHMpO1xuXHRcdH1cblx0XHR0aGlzLnByaW9yaXR5U29ydGVkSXRlbUVscyA9IHRoaXMucHJpb3JpdHlTb3J0ZWRJdGVtRWxzLmZpbHRlcihmdW5jdGlvbih2KSB7XG5cdFx0XHRyZXR1cm4gdiAhPT0gdW5kZWZpbmVkO1xuXHRcdH0pO1xuXHR9XG5cblx0c2hvd0FsbEl0ZW1zKCkge1xuXHRcdHRoaXMuaGlkZGVuSXRlbUVscyA9IFtdO1xuXHRcdGZvciAobGV0IGMgPSAwLCBsID0gdGhpcy5hbGxJdGVtRWxzLmxlbmd0aDsgYyA8IGw7IGMrKykge1xuXHRcdFx0dGhpcy5zaG93RWwodGhpcy5hbGxJdGVtRWxzW2NdKTtcblx0XHR9XG5cdH1cblxuXHRoaWRlSXRlbXMoZWxzKSB7XG5cdFx0Ly8gV2Ugd2FudCBoaWdoZXN0IHByaW9yaXR5IGl0ZW1zIHRvIGJlIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGFycmF5XG5cdFx0Zm9yIChsZXQgaSA9IGVscy5sZW5ndGggLSAxOyBpID4gLTE7IGktLSkge1xuXHRcdFx0dGhpcy5oaWRkZW5JdGVtRWxzLnVuc2hpZnQoZWxzW2ldKTtcblx0XHRcdHRoaXMuaGlkZUVsKGVsc1tpXSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0VmlzaWJsZUNvbnRlbnRXaWR0aCgpIHtcblx0XHRsZXQgdmlzaWJsZUl0ZW1zV2lkdGggPSAwO1xuXHRcdGZvciAobGV0IGMgPSAwLCBsID0gdGhpcy5hbGxJdGVtRWxzLmxlbmd0aDsgYyA8IGw7IGMrKykge1xuXHRcdFx0aWYgKCF0aGlzLmFsbEl0ZW1FbHNbY10uaGFzQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpKSB7XG5cdFx0XHRcdHZpc2libGVJdGVtc1dpZHRoICs9IHRoaXMuYWxsSXRlbUVsc1tjXS5vZmZzZXRXaWR0aDsgLy8gTmVlZHMgdG8gdGFrZSBpbnRvIGFjY291bnQgbWFyZ2lucyB0b29cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHZpc2libGVJdGVtc1dpZHRoO1xuXHR9XG5cblx0ZG9lc0NvbnRlbnRGaXQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0VmlzaWJsZUNvbnRlbnRXaWR0aCgpIDw9IHRoaXMuZWxlbWVudC5jbGllbnRXaWR0aDtcblx0fVxuXG5cdGdldEhpZGRlbkl0ZW1zKCkge1xuXHRcdHJldHVybiB0aGlzLmhpZGRlbkl0ZW1FbHM7XG5cdH1cblxuXHRnZXRSZW1haW5pbmdJdGVtcygpIHtcblx0XHRyZXR1cm4gdGhpcy5hbGxJdGVtRWxzLmZpbHRlcigoZWwpID0+IHtcblx0XHRcdHJldHVybiB0aGlzLmhpZGRlbkl0ZW1FbHMuaW5kZXhPZihlbCkgPT09IC0xO1xuXHRcdH0pO1xuXHR9XG5cblx0c3F1aXNoKCkge1xuXHRcdHRoaXMuc2hvd0FsbEl0ZW1zKCk7XG5cdFx0aWYgKHRoaXMuZG9lc0NvbnRlbnRGaXQoKSkge1xuXHRcdFx0dGhpcy5oaWRlRWwodGhpcy5tb3JlRWwpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3IgKGxldCBwID0gdGhpcy5wcmlvcml0eVNvcnRlZEl0ZW1FbHMubGVuZ3RoIC0gMTsgcCA+PSAwOyBwLS0pIHtcblx0XHRcdFx0dGhpcy5oaWRlSXRlbXModGhpcy5wcmlvcml0eVNvcnRlZEl0ZW1FbHNbcF0pO1xuXHRcdFx0XHRpZiAoKHRoaXMuZ2V0VmlzaWJsZUNvbnRlbnRXaWR0aCgpICsgdGhpcy5tb3JlV2lkdGgpIDw9IHRoaXMuZWxlbWVudC5jbGllbnRXaWR0aCkge1xuXHRcdFx0XHRcdHRoaXMuc2hvd0VsKHRoaXMubW9yZUVsKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoJ29TcXVpc2h5TGlzdC5jaGFuZ2UnLCB7XG5cdFx0XHRoaWRkZW5JdGVtczogdGhpcy5nZXRIaWRkZW5JdGVtcygpLFxuXHRcdFx0cmVtYWluaW5nSXRlbXM6IHRoaXMuZ2V0UmVtYWluaW5nSXRlbXMoKVxuXHRcdH0pO1xuXHR9XG5cblx0cmVzaXplSGFuZGxlcigpIHtcblx0XHRjbGVhclRpbWVvdXQodGhpcy5kZWJvdW5jZVRpbWVvdXQpO1xuXHRcdHRoaXMuZGVib3VuY2VUaW1lb3V0ID0gc2V0VGltZW91dCh0aGlzLnNxdWlzaC5iaW5kKHRoaXMpLCA1MCk7XG5cdH1cblxuXHRkZXN0cm95KCkge1xuXHRcdGZvciAobGV0IGMgPSAwLCBsID0gdGhpcy5hbGxJdGVtRWxzLmxlbmd0aDsgYyA8IGw7IGMrKykge1xuXHRcdFx0dGhpcy5hbGxJdGVtRWxzW2NdLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcblx0XHR9XG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzaXplSGFuZGxlciwgZmFsc2UpO1xuXHRcdHRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtby1zcXVpc2h5LWxpc3QtanMnKTtcblx0fVxuXG59XG5cbmNvbnN0IGNvbnN0cnVjdEFsbCA9IGZ1bmN0aW9uKCkge1xuXHRTcXVpc2h5TGlzdC5pbml0KCk7XG5cdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG59O1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Jvd2VyX2NvbXBvbmVudHMvby1zcXVpc2h5LWxpc3QvbWFpbi5qcyIsIi8qZ2xvYmFsIHJlcXVpcmUsIG1vZHVsZSovXG5cbmNvbnN0IFRhYnMgPSByZXF1aXJlKCcuL3NyYy9qcy9UYWJzJyk7XG5cbmNvbnN0IGNvbnN0cnVjdEFsbCA9IGZ1bmN0aW9uKCkge1xuXHRUYWJzLmluaXQoKTtcblx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcbn07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGFicztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Jvd2VyX2NvbXBvbmVudHMvby10YWJzL21haW4uanMiLCIvKmdsb2JhbCBtb2R1bGUsIHJlcXVpcmUqL1xuY29uc3Qgb0RvbSA9IHJlcXVpcmUoJ28tZG9tJyk7XG5cbmNsYXNzIFRhYnMge1xuXG5cdGNvbnN0cnVjdG9yKHJvb3RFbCwgY29uZmlnKSB7XG5cdFx0dGhpcy5yb290RWwgPSByb290RWw7XG5cdFx0dGhpcy5yb290RWwuc2V0QXR0cmlidXRlKCdkYXRhLW8tdGFicy0tanMnLCAnJyk7XG5cblx0XHR0aGlzLnVwZGF0ZVVybCA9IHJvb3RFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtby10YWJzLXVwZGF0ZS11cmwnKSAhPT0gbnVsbDtcblx0XHR0aGlzLnNlbGVjdGVkVGFiSW5kZXggPSAtMTtcblxuXG5cdFx0dGhpcy50YWJFbHMgPSB0aGlzLnJvb3RFbC5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT10YWJdJyk7XG5cdFx0dGhpcy50YWJFbHMgPSBbXS5zbGljZS5jYWxsKHRoaXMudGFiRWxzKS5maWx0ZXIodGhpcy50YWJIYXNWYWxpZFVybCk7XG5cdFx0dGhpcy50YWJwYW5lbEVscyA9IHRoaXMuZ2V0VGFiUGFuZWxFbHModGhpcy50YWJFbHMpO1xuXG5cdFx0dGhpcy5ib3VuZENsaWNrSGFuZGxlciA9IHRoaXMuY2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5yb290RWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kQ2xpY2tIYW5kbGVyLCBmYWxzZSk7XG5cdFx0dGhpcy5ib3VuZEtleVByZXNzSGFuZGxlciA9IHRoaXMua2V5UHJlc3NIYW5kbGVyLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5yb290RWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCB0aGlzLmJvdW5kS2V5UHJlc3NIYW5kbGVyLCBmYWxzZSk7XG5cdFx0dGhpcy5ib3VuZEhhc2hDaGFuZ2VIYW5kbGVyID0gdGhpcy5oYXNoQ2hhbmdlSGFuZGxlci5iaW5kKHRoaXMpO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgdGhpcy5ib3VuZEhhc2hDaGFuZ2VIYW5kbGVyLCBmYWxzZSk7XG5cblx0XHRpZiAoIWNvbmZpZykge1xuXHRcdFx0Y29uZmlnID0ge307XG5cdFx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHRoaXMucm9vdEVsLmF0dHJpYnV0ZXMsIGZ1bmN0aW9uKGF0dHIpIHtcblx0XHRcdFx0aWYgKGF0dHIubmFtZS5pbmNsdWRlcygnZGF0YS1vLXRhYnMnKSkge1xuXHRcdFx0XHRcdC8vIFJlbW92ZSB0aGUgdW5uZWNlc3NhcnkgcGFydCBvZiB0aGUgc3RyaW5nIHRoZSBmaXJzdFxuXHRcdFx0XHRcdC8vIHRpbWUgdGhpcyBpcyBydW4gZm9yIGVhY2ggYXR0cmlidXRlXG5cdFx0XHRcdFx0Y29uc3Qga2V5ID0gYXR0ci5uYW1lLnJlcGxhY2UoJ2RhdGEtby10YWJzLScsICcnKTtcblxuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHQvLyBJZiBpdCdzIGEgSlNPTiwgYSBib29sZWFuIG9yIGEgbnVtYmVyLCB3ZSB3YW50IGl0IHN0b3JlZCBsaWtlIHRoYXQsXG5cdFx0XHRcdFx0XHQvLyBhbmQgbm90IGFzIGEgc3RyaW5nLiBXZSBhbHNvIHJlcGxhY2UgYWxsICcgd2l0aCBcIiBzbyBKU09OIHN0cmluZ3Ncblx0XHRcdFx0XHRcdC8vIGFyZSBwYXJzZWQgY29ycmVjdGx5XG5cdFx0XHRcdFx0XHRjb25maWdba2V5XSA9IEpTT04ucGFyc2UoYXR0ci52YWx1ZS5yZXBsYWNlKC9cXCcvZywgJ1wiJykpO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdGNvbmZpZ1trZXldID0gYXR0ci52YWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHRoaXMuY29uZmlnID0gY29uZmlnO1xuXHRcdHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudCgncmVhZHknLCB7XG5cdFx0XHR0YWJzOiB0aGlzXG5cdFx0fSk7XG5cdFx0dGhpcy5zZWxlY3RUYWIodGhpcy5nZXRTZWxlY3RlZFRhYkluZGV4KCkpO1xuXHR9XG5cblx0Z2V0VGFiVGFyZ2V0SWQodGFiRWwpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG5cdFx0Y29uc3QgbGlua0VscyA9IHRhYkVsLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJyk7XG5cdFx0cmV0dXJuIChsaW5rRWxzICYmIGxpbmtFbHNbMF0pID8gbGlua0Vsc1swXS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKS5yZXBsYWNlKCcjJywnJykgOiAnJztcblx0fVxuXG5cdGdldFRhYlBhbmVsRWxzKHRhYkVscykge1xuXHRcdGNvbnN0IHBhbmVsRWxzID0gW107XG5cblx0XHRmb3IgKGNvbnN0IHRhYiBvZiB0YWJFbHMpIHtcblx0XHRcdGNvbnN0IHRhYlRhcmdldElkID0gdGhpcy5nZXRUYWJUYXJnZXRJZCh0YWIpO1xuXHRcdFx0Y29uc3QgdGFyZ2V0RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YWJUYXJnZXRJZCk7XG5cblx0XHRcdGlmICh0YXJnZXRFbCkge1xuXHRcdFx0XHR0YWIuc2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJywgdGFiVGFyZ2V0SWQpO1xuXHRcdFx0XHR0YWIuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG5cblx0XHRcdFx0Y29uc3QgbGFiZWwgPSB0YWIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2EnKVswXTtcblx0XHRcdFx0Y29uc3QgbGFiZWxJZCA9IHRhYlRhcmdldElkICsgJy1sYWJlbCc7XG5cdFx0XHRcdGxhYmVsLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnLTEnKTtcblx0XHRcdFx0bGFiZWwuaWQgPSBsYWJlbElkO1xuXHRcdFx0XHR0YXJnZXRFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWxsZWRieScsIGxhYmVsSWQpO1xuXHRcdFx0XHR0YXJnZXRFbC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFicGFuZWwnKTtcblx0XHRcdFx0dGFyZ2V0RWwuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG5cdFx0XHRcdHBhbmVsRWxzLnB1c2godGFyZ2V0RWwpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBwYW5lbEVscztcblx0fVxuXG5cdGdldFRhYkVsZW1lbnRGcm9tSGFzaCgpIHtcblx0XHRjb25zdCB0YWJMaW5rID0gdGhpcy5yb290RWwucXVlcnlTZWxlY3RvcihgW2hyZWY9XCIke2xvY2F0aW9uLmhhc2h9XCJdYCk7XG5cdFx0cmV0dXJuIHRhYkxpbmsgJiYgdGFiTGluay5wYXJlbnROb2RlID8gdGFiTGluay5wYXJlbnROb2RlIDogbnVsbDtcblx0fVxuXG5cdGdldFRhYkluZGV4RnJvbUVsZW1lbnQoZWwpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG5cdFx0cmV0dXJuIG9Eb20uZ2V0SW5kZXgoZWwpO1xuXHR9XG5cblx0Z2V0U2VsZWN0ZWRUYWJFbGVtZW50KCkge1xuXHRcdHJldHVybiB0aGlzLnJvb3RFbC5xdWVyeVNlbGVjdG9yKCdbYXJpYS1zZWxlY3RlZD10cnVlXScpO1xuXHR9XG5cblx0Z2V0U2VsZWN0ZWRUYWJJbmRleCgpIHtcblx0XHRjb25zdCBzZWxlY3RlZFRhYkVsZW1lbnQgPSB0aGlzLnVwZGF0ZVVybCAmJiBsb2NhdGlvbi5oYXNoID8gdGhpcy5nZXRUYWJFbGVtZW50RnJvbUhhc2goKSA6IHRoaXMuZ2V0U2VsZWN0ZWRUYWJFbGVtZW50KCk7XG5cdFx0cmV0dXJuIHNlbGVjdGVkVGFiRWxlbWVudCA/IHRoaXMuZ2V0VGFiSW5kZXhGcm9tRWxlbWVudChzZWxlY3RlZFRhYkVsZW1lbnQpIDogMDtcblx0fVxuXG5cdGlzVmFsaWRUYWIoaW5kZXgpIHtcblx0XHRyZXR1cm4gKCFpc05hTihpbmRleCkgJiYgaW5kZXggPj0gMCAmJiBpbmRleCA8IHRoaXMudGFiRWxzLmxlbmd0aCk7XG5cdH1cblxuXHRoaWRlUGFuZWwocGFuZWxFbCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcblx0XHRwYW5lbEVsLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuXHRcdHBhbmVsRWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cdH1cblxuXHRzaG93UGFuZWwocGFuZWxFbCwgZGlzYWJsZUZvY3VzKSB7XG5cdFx0cGFuZWxFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuXHRcdHBhbmVsRWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG5cdFx0Ly8gUmVtb3ZlIHRoZSBmb2N1cyByaW5nIGZvciBzaWdodGVkIHVzZXJzXG5cdFx0cGFuZWxFbC5zdHlsZS5vdXRsaW5lID0gMDtcblxuXHRcdGlmIChkaXNhYmxlRm9jdXMpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyB1cGRhdGUgdGhlIHVybCB0byBtYXRjaCB0aGUgc2VsZWN0ZWQgdGFiXG5cdFx0aWYgKHBhbmVsRWwuaWQgJiYgdGhpcy51cGRhdGVVcmwpIHtcblx0XHRcdGxvY2F0aW9uLmhyZWYgPSAnIycgKyBwYW5lbEVsLmlkO1xuXHRcdH1cblxuXHRcdC8vIEdldCBjdXJyZW50IHNjcm9sbCBwb3NpdGlvblxuXHRcdGNvbnN0IHggPSB3aW5kb3cuc2Nyb2xsWCB8fCB3aW5kb3cucGFnZVhPZmZzZXQ7XG5cdFx0Y29uc3QgeSA9IHdpbmRvdy5zY3JvbGxZIHx8IHdpbmRvdy5wYWdlWU9mZnNldDtcblxuXHRcdC8vIEdpdmUgZm9jdXMgdG8gdGhlIHBhbmVsIGZvciBzY3JlZW4gcmVhZGVyc1xuXHRcdC8vIFRoaXMgbWlnaHQgY2F1c2UgdGhlIGJyb3dzZXIgdG8gc2Nyb2xsIHVwIG9yIGRvd25cblx0XHRwYW5lbEVsLmZvY3VzKCk7XG5cblx0XHQvLyBTY3JvbGwgYmFjayB0byB0aGUgb3JpZ2luYWwgcG9zaXRpb25cblx0XHR3aW5kb3cuc2Nyb2xsVG8oeCwgeSk7XG5cdH1cblxuXHRkaXNwYXRjaEN1c3RvbUV2ZW50KGV2ZW50LCBkYXRhID0ge30sIG5hbWVzcGFjZSA9ICdvVGFicycpIHtcblx0XHR0aGlzLnJvb3RFbC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChuYW1lc3BhY2UgKyAnLicgKyBldmVudCwge1xuXHRcdFx0ZGV0YWlsOiBkYXRhLFxuXHRcdFx0YnViYmxlczogdHJ1ZVxuXHRcdH0pKTtcblx0fVxuXG5cdHNlbGVjdFRhYihuZXdJbmRleCkge1xuXHRcdGlmICh0aGlzLmlzVmFsaWRUYWIobmV3SW5kZXgpICYmIG5ld0luZGV4ICE9PSB0aGlzLnNlbGVjdGVkVGFiSW5kZXgpIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50YWJFbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKG5ld0luZGV4ID09PSBpKSB7XG5cdFx0XHRcdFx0dGhpcy50YWJFbHNbaV0uc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcblx0XHRcdFx0XHR0aGlzLnNob3dQYW5lbCh0aGlzLnRhYnBhbmVsRWxzW2ldLCB0aGlzLmNvbmZpZy5kaXNhYmxlZm9jdXMpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMudGFiRWxzW2ldLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICdmYWxzZScpO1xuXHRcdFx0XHRcdHRoaXMuaGlkZVBhbmVsKHRoaXMudGFicGFuZWxFbHNbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudCgndGFiU2VsZWN0Jywge1xuXHRcdFx0XHR0YWJzOiB0aGlzLFxuXHRcdFx0XHRzZWxlY3RlZDogbmV3SW5kZXgsXG5cdFx0XHRcdGxhc3RTZWxlY3RlZDogdGhpcy5zZWxlY3RlZFRhYkluZGV4XG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5zZWxlY3RlZFRhYkluZGV4ID0gbmV3SW5kZXg7XG5cdFx0fVxuXHR9XG5cblx0Y2xpY2tIYW5kbGVyKGV2KSB7XG5cdFx0Y29uc3QgdGFiRWwgPSBvRG9tLmdldENsb3Nlc3RNYXRjaChldi50YXJnZXQsICdbcm9sZT10YWJdJyk7XG5cblx0XHRpZiAodGFiRWwgJiYgdGhpcy50YWJIYXNWYWxpZFVybCh0YWJFbCkpIHtcblx0XHRcdGV2LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0aGlzLnVwZGF0ZUN1cnJlbnRUYWIodGFiRWwpO1xuXHRcdH1cblx0fVxuXG5cdGtleVByZXNzSGFuZGxlcihldikge1xuXHRcdGNvbnN0IHRhYkVsID0gb0RvbS5nZXRDbG9zZXN0TWF0Y2goZXYudGFyZ2V0LCAnW3JvbGU9dGFiXScpO1xuXHRcdC8vIE9ubHkgdXBkYXRlIGlmIGtleSBwcmVzc2VkIGlzIGVudGVyIGtleVxuXHRcdGlmICh0YWJFbCAmJiBldi5rZXlDb2RlID09PSAxMyAmJiB0aGlzLnRhYkhhc1ZhbGlkVXJsKHRhYkVsKSkge1xuXHRcdFx0ZXYucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMudXBkYXRlQ3VycmVudFRhYih0YWJFbCk7XG5cdFx0fVxuXHR9XG5cblx0aGFzaENoYW5nZUhhbmRsZXIoKSB7XG5cdFx0aWYgKCF0aGlzLnVwZGF0ZVVybCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IHRhYkVsID0gdGhpcy5nZXRUYWJFbGVtZW50RnJvbUhhc2goKTtcblxuXHRcdGlmICh0YWJFbCkge1xuXHRcdFx0dGhpcy51cGRhdGVDdXJyZW50VGFiKHRhYkVsKTtcblx0XHR9XG5cdH1cblxuXHR1cGRhdGVDdXJyZW50VGFiKHRhYkVsKSB7XG5cdFx0Y29uc3QgaW5kZXggPSB0aGlzLmdldFRhYkluZGV4RnJvbUVsZW1lbnQodGFiRWwpO1xuXHRcdHRoaXMuc2VsZWN0VGFiKGluZGV4KTtcblx0XHR0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoJ2V2ZW50Jywge1xuXHRcdFx0Y2F0ZWdvcnk6ICd0YWJzJyxcblx0XHRcdGFjdGlvbjogJ2NsaWNrJyxcblx0XHRcdHRhYjogdGFiRWwudGV4dENvbnRlbnQudHJpbSgpXG5cdFx0fSwgJ29UcmFja2luZycpO1xuXHR9XG5cblx0dGFiSGFzVmFsaWRVcmwodGFiRWwpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG5cdFx0Y29uc3QgbGlua0VscyA9IHRhYkVsLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJyk7XG5cdFx0aWYgKCEgbGlua0VscyB8fCAhIGxpbmtFbHNbMF0uaGFzaCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gbGlua0Vsc1swXS5wYXRobmFtZSA9PT0gbG9jYXRpb24ucGF0aG5hbWU7XG5cdH1cblxuXHRkZXN0cm95KCkge1xuXHRcdHRoaXMucm9vdEVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ib3VuZENsaWNrSGFuZGxlciwgZmFsc2UpO1xuXHRcdHRoaXMucm9vdEVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgdGhpcy5ib3VuZEtleVByZXNzSGFuZGxlciwgZmFsc2UpO1xuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgdGhpcy5ib3VuZEhhc2hDaGFuZ2VIYW5kbGVyLCBmYWxzZSk7XG5cdFx0dGhpcy5yb290RWwucmVtb3ZlQXR0cmlidXRlKCdkYXRhLW8tdGFicy0tanMnKTtcblxuXHRcdGZvciAoY29uc3QgdGFiUGFuZWxFbCBvZiB0aGlzLnRhYnBhbmVsRWxzKSB7XG5cdFx0XHR0aGlzLnNob3dQYW5lbCh0YWJQYW5lbEVsKTtcblx0XHR9XG5cblx0XHQvLyB1bnNldCB0aGUgYm91bmQgZXZlbnQgaGFuZGxlcnNcblx0XHR0aGlzLmJvdW5kQ2xpY2tIYW5kbGVyID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuYm91bmRLZXlQcmVzc0hhbmRsZXIgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5ib3VuZEhhc2hDaGFuZ2VIYW5kbGVyID0gdW5kZWZpbmVkO1xuXHRcdC8vIERlc3Ryb3kgQUxMIHRoZSB0aGluZ3MhXG5cdFx0dGhpcy50YWJFbHMgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy50YWJwYW5lbEVscyA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLnVwZGF0ZVVybCA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLnNlbGVjdGVkVGFiSW5kZXggPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5yb290RWwgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5jb25maWcgPSB1bmRlZmluZWQ7XG5cdH1cblxuXHRzdGF0aWMgaW5pdChyb290RWwsIGNvbmZpZykge1xuXHRcdGlmICghcm9vdEVsKSB7XG5cdFx0XHRyb290RWwgPSBkb2N1bWVudC5ib2R5O1xuXHRcdH1cblx0XHRpZiAoIShyb290RWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcblx0XHRcdHJvb3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iocm9vdEVsKTtcblx0XHR9XG5cblx0XHRpZiAocm9vdEVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgL1xcYm8tdGFic1xcYi8udGVzdChyb290RWwuZ2V0QXR0cmlidXRlKCdkYXRhLW8tY29tcG9uZW50JykpKSB7XG5cdFx0XHRpZiAoIXJvb3RFbC5tYXRjaGVzKCdbZGF0YS1vLXRhYnMtYXV0b2NvbnN0cnVjdD1mYWxzZV0nKSAmJiAhcm9vdEVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1vLXRhYnMtLWpzJykpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBUYWJzKHJvb3RFbCwgY29uZmlnKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAocm9vdEVsLnF1ZXJ5U2VsZWN0b3JBbGwpIHtcblx0XHRcdGNvbnN0IHRhYkVsZW1lbnRzID0gcm9vdEVsLnF1ZXJ5U2VsZWN0b3JBbGwoXG5cdFx0XHRcdCdbZGF0YS1vLWNvbXBvbmVudD1vLXRhYnNdOm5vdChbZGF0YS1vLXRhYnMtYXV0b2NvbnN0cnVjdD1mYWxzZV0pOm5vdChbZGF0YS1vLXRhYnMtLWpzXSknXG5cdFx0XHQpO1xuXG5cdFx0XHRyZXR1cm4gQXJyYXkuZnJvbSh0YWJFbGVtZW50cywgKHRhYkVsKSA9PiB7XG5cdFx0XHRcdHJldHVybiBuZXcgVGFicyh0YWJFbCwgY29uZmlnKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBUYWJzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYm93ZXJfY29tcG9uZW50cy9vLXRhYnMvc3JjL2pzL1RhYnMuanMiLCIvKipcbipcbiogRGVib3VuY2VzIGZ1bmN0aW9uIHNvIGl0IGlzIG9ubHkgY2FsbGVkIGFmdGVyIG4gbWlsbGlzZWNvbmRzXG4qIHdpdGhvdXQgaXQgbm90IGJlaW5nIGNhbGxlZFxuKlxuKiBAZXhhbXBsZVxuKiBVdGlscy5kZWJvdW5jZShteUZ1bmN0aW9uKCkge30sIDEwMCk7XG4qXG4qIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBGdW5jdGlvbiB0byBiZSBkZWJvdW5jZWRcbiogQHBhcmFtIHtudW1iZXJ9IHdhaXQgLSBUaW1lIGluIG1pbGlzZWNvbmRzXG4qXG4qIEByZXR1cm5zIHtGdW5jdGlvbn0gLSBEZWJvdW5jZWQgZnVuY3Rpb25cbiovXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0KSB7XG5cdGxldCB0aW1lb3V0O1xuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0Y29uc3QgYXJncyA9IGFyZ3VtZW50cztcblx0XHRjb25zdCBsYXRlciA9ICgpID0+IHtcblx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0ZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHR9O1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG5cdH07XG59XG5cbi8qKlxuKlxuKiBUaHJvdHRsZSBmdW5jdGlvbiBzbyBpdCBpcyBvbmx5IGNhbGxlZCBvbmNlIGV2ZXJ5IG4gbWlsbGlzZWNvbmRzXG4qXG4qIEBleGFtcGxlXG4qIFV0aWxzLnRocm90dGxlKG15RnVuY3Rpb24oKSB7fSwgMTAwKTtcbipcbiogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIEZ1bmN0aW9uIHRvIGJlIHRocm90dGxlZFxuKiBAcGFyYW0ge251bWJlcn0gd2FpdCAtIFRpbWUgaW4gbWlsaXNlY29uZHNcbipcbiogQHJldHVybnMge0Z1bmN0aW9ufSAtIFRocm90dGxlZCBmdW5jdGlvblxuKi9cbmZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIHdhaXQpIHtcblx0bGV0IHRpbWVvdXQ7XG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRpZiAodGltZW91dCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRjb25zdCBhcmdzID0gYXJndW1lbnRzO1xuXHRcdGNvbnN0IGxhdGVyID0gKCkgPT4ge1xuXHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdH07XG5cblx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG5cdH07XG59XG5cbmV4cG9ydCB7XG5cdGRlYm91bmNlLFxuXHR0aHJvdHRsZVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Jvd2VyX2NvbXBvbmVudHMvby11dGlscy9tYWluLmpzIiwiLy8gbGV0IGRlYnVnO1xuY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuL3NyYy91dGlscycpO1xuY29uc3QgdGhyb3R0bGUgPSB1dGlscy50aHJvdHRsZTtcbmNvbnN0IGRlYm91bmNlID0gdXRpbHMuZGVib3VuY2U7XG5cbmNvbnN0IGxpc3RlbmVycyA9IHt9O1xuY29uc3QgaW50ZXJ2YWxzID0ge1xuXHRyZXNpemU6IDEwMCxcblx0b3JpZW50YXRpb246IDEwMCxcblx0dmlzaWJpbGl0eTogMTAwLFxuXHRzY3JvbGw6IDEwMFxufTtcblxuZnVuY3Rpb24gc2V0VGhyb3R0bGVJbnRlcnZhbChldmVudFR5cGUsIGludGVydmFsKSB7XG5cdGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnbnVtYmVyJykge1xuXHRcdHNldFRocm90dGxlSW50ZXJ2YWwoJ3Njcm9sbCcsIGFyZ3VtZW50c1swXSk7XG5cdFx0c2V0VGhyb3R0bGVJbnRlcnZhbCgncmVzaXplJywgYXJndW1lbnRzWzFdKTtcblx0XHRzZXRUaHJvdHRsZUludGVydmFsKCdvcmllbnRhdGlvbicsIGFyZ3VtZW50c1syXSk7XG5cdFx0c2V0VGhyb3R0bGVJbnRlcnZhbCgndmlzaWJpbGl0eScsIGFyZ3VtZW50c1szXSk7XG5cdH0gZWxzZSBpZiAoaW50ZXJ2YWwpIHtcblx0XHRpbnRlcnZhbHNbZXZlbnRUeXBlXSA9IGludGVydmFsO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RlblRvUmVzaXplKCkge1xuXHRpZiAobGlzdGVuZXJzLnJlc2l6ZSkge1xuXHRcdHJldHVybjtcblx0fVxuXHRjb25zdCBldmVudFR5cGUgPSAncmVzaXplJztcblx0Y29uc3QgaGFuZGxlciA9IGRlYm91bmNlKGZ1bmN0aW9uKGV2KSB7XG5cdFx0dXRpbHMuYnJvYWRjYXN0KCdyZXNpemUnLCB7XG5cdFx0XHR2aWV3cG9ydDogdXRpbHMuZ2V0U2l6ZSgpLFxuXHRcdFx0b3JpZ2luYWxFdmVudDogZXZcblx0XHR9KTtcblx0fSwgaW50ZXJ2YWxzLnJlc2l6ZSk7XG5cblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIpO1xuXHRsaXN0ZW5lcnMucmVzaXplID0ge1xuXHRcdGV2ZW50VHlwZTogZXZlbnRUeXBlLFxuXHRcdGhhbmRsZXI6IGhhbmRsZXJcblx0fTtcbn1cblxuZnVuY3Rpb24gbGlzdGVuVG9PcmllbnRhdGlvbigpIHtcblxuXHRpZiAobGlzdGVuZXJzLm9yaWVudGF0aW9uKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgZXZlbnRUeXBlID0gJ29yaWVudGF0aW9uY2hhbmdlJztcblx0Y29uc3QgaGFuZGxlciA9IGRlYm91bmNlKGZ1bmN0aW9uKGV2KSB7XG5cdFx0dXRpbHMuYnJvYWRjYXN0KCdvcmllbnRhdGlvbicsIHtcblx0XHRcdHZpZXdwb3J0OiB1dGlscy5nZXRTaXplKCksXG5cdFx0XHRvcmllbnRhdGlvbjogdXRpbHMuZ2V0T3JpZW50YXRpb24oKSxcblx0XHRcdG9yaWdpbmFsRXZlbnQ6IGV2XG5cdFx0fSk7XG5cdH0sIGludGVydmFscy5vcmllbnRhdGlvbik7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyKTtcblx0bGlzdGVuZXJzLm9yaWVudGF0aW9uID0ge1xuXHRcdGV2ZW50VHlwZTogZXZlbnRUeXBlLFxuXHRcdGhhbmRsZXI6IGhhbmRsZXJcblx0fTtcbn1cblxuZnVuY3Rpb24gbGlzdGVuVG9WaXNpYmlsaXR5KCkge1xuXG5cdGlmIChsaXN0ZW5lcnMudmlzaWJpbGl0eSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IGV2ZW50VHlwZSA9IHV0aWxzLmRldGVjdFZpc2libGl0eUFQSSgpLmV2ZW50VHlwZTtcblx0Y29uc3QgaGFuZGxlciA9IGRlYm91bmNlKGZ1bmN0aW9uKGV2KSB7XG5cdFx0dXRpbHMuYnJvYWRjYXN0KCd2aXNpYmlsaXR5Jywge1xuXHRcdFx0aGlkZGVuOiB1dGlscy5nZXRWaXNpYmlsaXR5KCksXG5cdFx0XHRvcmlnaW5hbEV2ZW50OiBldlxuXHRcdH0pO1xuXHR9LCBpbnRlcnZhbHMudmlzaWJpbGl0eSk7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyKTtcblxuXHRsaXN0ZW5lcnMudmlzaWJpbGl0eSA9IHtcblx0XHRldmVudFR5cGU6IGV2ZW50VHlwZSxcblx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdH07XG59XG5cbmZ1bmN0aW9uIGxpc3RlblRvU2Nyb2xsKCkge1xuXG5cdGlmIChsaXN0ZW5lcnMuc2Nyb2xsKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgZXZlbnRUeXBlID0gJ3Njcm9sbCc7XG5cdGNvbnN0IGhhbmRsZXIgPSB0aHJvdHRsZShmdW5jdGlvbihldikge1xuXHRcdGNvbnN0IHNjcm9sbFBvcyA9IHV0aWxzLmdldFNjcm9sbFBvc2l0aW9uKCk7XG5cdFx0dXRpbHMuYnJvYWRjYXN0KCdzY3JvbGwnLCB7XG5cdFx0XHR2aWV3cG9ydDogdXRpbHMuZ2V0U2l6ZSgpLFxuXHRcdFx0c2Nyb2xsSGVpZ2h0OiBzY3JvbGxQb3MuaGVpZ2h0LFxuXHRcdFx0c2Nyb2xsTGVmdDogc2Nyb2xsUG9zLmxlZnQsXG5cdFx0XHRzY3JvbGxUb3A6IHNjcm9sbFBvcy50b3AsXG5cdFx0XHRzY3JvbGxXaWR0aDogc2Nyb2xsUG9zLndpZHRoLFxuXHRcdFx0b3JpZ2luYWxFdmVudDogZXZcblx0XHR9KTtcblx0fSwgaW50ZXJ2YWxzLnNjcm9sbCk7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyKTtcblx0bGlzdGVuZXJzLnNjcm9sbCA9IHtcblx0XHRldmVudFR5cGU6IGV2ZW50VHlwZSxcblx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdH07XG59XG5cbmZ1bmN0aW9uIGxpc3RlblRvKGV2ZW50VHlwZSkge1xuXHRpZiAoZXZlbnRUeXBlID09PSAncmVzaXplJyB8fCBldmVudFR5cGUgPT09ICdhbGwnKSB7XG5cdFx0bGlzdGVuVG9SZXNpemUoKTtcblx0fVxuXG5cdGlmIChldmVudFR5cGUgPT09ICdzY3JvbGwnIHx8IGV2ZW50VHlwZSA9PT0gJ2FsbCcpIHtcblx0XHRsaXN0ZW5Ub1Njcm9sbCgpO1xuXHR9XG5cblx0aWYgKGV2ZW50VHlwZSA9PT0gJ29yaWVudGF0aW9uJyB8fCBldmVudFR5cGUgPT09ICdhbGwnKSB7XG5cdFx0bGlzdGVuVG9PcmllbnRhdGlvbigpO1xuXHR9XG5cblx0aWYgKGV2ZW50VHlwZSA9PT0gJ3Zpc2liaWxpdHknIHx8IGV2ZW50VHlwZSA9PT0gJ2FsbCcpIHtcblx0XHRsaXN0ZW5Ub1Zpc2liaWxpdHkoKTtcblx0fVxufVxuXG5mdW5jdGlvbiBzdG9wTGlzdGVuaW5nVG8oZXZlbnRUeXBlKSB7XG5cdGlmIChldmVudFR5cGUgPT09ICdhbGwnKSB7XG5cdFx0T2JqZWN0LmtleXMobGlzdGVuZXJzKS5mb3JFYWNoKHN0b3BMaXN0ZW5pbmdUbyk7XG5cdH0gZWxzZSBpZiAobGlzdGVuZXJzW2V2ZW50VHlwZV0pIHtcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcnNbZXZlbnRUeXBlXS5ldmVudFR5cGUsIGxpc3RlbmVyc1tldmVudFR5cGVdLmhhbmRsZXIpO1xuXHRcdGRlbGV0ZSBsaXN0ZW5lcnNbZXZlbnRUeXBlXTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0ZGVidWc6IGZ1bmN0aW9uKCkge1xuXHRcdC8vIGRlYnVnID0gdHJ1ZTtcblx0XHR1dGlscy5kZWJ1ZygpO1xuXHR9LFxuXHRsaXN0ZW5UbzogbGlzdGVuVG8sXG5cdHN0b3BMaXN0ZW5pbmdUbzogc3RvcExpc3RlbmluZ1RvLFxuXHRzZXRUaHJvdHRsZUludGVydmFsOiBzZXRUaHJvdHRsZUludGVydmFsLFxuXHRnZXRPcmllbnRhdGlvbjogdXRpbHMuZ2V0T3JpZW50YXRpb24sXG5cdGdldFNpemU6IHV0aWxzLmdldFNpemUsXG5cdGdldFNjcm9sbFBvc2l0aW9uOiB1dGlscy5nZXRTY3JvbGxQb3NpdGlvbixcblx0Z2V0VmlzaWJpbGl0eTogdXRpbHMuZ2V0VmlzaWJpbGl0eVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Jvd2VyX2NvbXBvbmVudHMvby12aWV3cG9ydC9tYWluLmpzIiwiLyoganNoaW50IGRldmVsOiB0cnVlICovXG5jb25zdCBvVXRpbHMgPSByZXF1aXJlKCdvLXV0aWxzJyk7XG5cbmxldCBkZWJ1ZztcblxuZnVuY3Rpb24gYnJvYWRjYXN0KGV2ZW50VHlwZSwgZGF0YSwgdGFyZ2V0KSB7XG5cdHRhcmdldCA9IHRhcmdldCB8fCBkb2N1bWVudC5ib2R5O1xuXG5cdGlmIChkZWJ1Zykge1xuXHRcdGNvbnNvbGUubG9nKCdvLXZpZXdwb3J0JywgZXZlbnRUeXBlLCBkYXRhKTtcblx0fVxuXG5cdHRhcmdldC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnb1ZpZXdwb3J0LicgKyBldmVudFR5cGUsIHtcblx0XHRkZXRhaWw6IGRhdGEsXG5cdFx0YnViYmxlczogdHJ1ZVxuXHR9KSk7XG59XG5cbmZ1bmN0aW9uIGdldEhlaWdodChpZ25vcmVTY3JvbGxiYXJzKSB7XG5cdHJldHVybiBpZ25vcmVTY3JvbGxiYXJzID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCA6IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCB8fCAwKTtcbn1cblxuZnVuY3Rpb24gZ2V0V2lkdGgoaWdub3JlU2Nyb2xsYmFycykge1xuXHRyZXR1cm4gaWdub3JlU2Nyb2xsYmFycyA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA6IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMCk7XG59XG5cbmZ1bmN0aW9uIGdldFNpemUoaWdub3JlU2Nyb2xsYmFycykge1xuXHRyZXR1cm4ge1xuXHRcdGhlaWdodDogbW9kdWxlLmV4cG9ydHMuZ2V0SGVpZ2h0KGlnbm9yZVNjcm9sbGJhcnMpLFxuXHRcdHdpZHRoOiBtb2R1bGUuZXhwb3J0cy5nZXRXaWR0aChpZ25vcmVTY3JvbGxiYXJzKVxuXHR9O1xufVxuXG5mdW5jdGlvbiBnZXRTY3JvbGxQb3NpdGlvbigpIHtcblx0Y29uc3QgZGUgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cdGNvbnN0IGRiID0gZG9jdW1lbnQuYm9keTtcblxuXHQvLyBhZGFwdGVkIGZyb20gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dpbmRvdy9zY3JvbGxZXG5cdGNvbnN0IGlzQ1NTMUNvbXBhdCA9ICgoZG9jdW1lbnQuY29tcGF0TW9kZSB8fCAnJykgPT09ICdDU1MxQ29tcGF0Jyk7XG5cblx0Y29uc3QgaWVYID0gaXNDU1MxQ29tcGF0ID8gZGUuc2Nyb2xsTGVmdCA6IGRiLnNjcm9sbExlZnQ7XG5cdGNvbnN0IGllWSA9IGlzQ1NTMUNvbXBhdCA/IGRlLnNjcm9sbFRvcCA6IGRiLnNjcm9sbFRvcDtcblx0cmV0dXJuIHtcblx0XHRoZWlnaHQ6IGRiLnNjcm9sbEhlaWdodCxcblx0XHR3aWR0aDogZGIuc2Nyb2xsV2lkdGgsXG5cdFx0bGVmdDogd2luZG93LnBhZ2VYT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxYIHx8IGllWCxcblx0XHR0b3A6IHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWSB8fCBpZVlcblx0fTtcbn1cblxuZnVuY3Rpb24gZ2V0T3JpZW50YXRpb24oKSB7XG5cdGNvbnN0IG9yaWVudGF0aW9uID0gd2luZG93LnNjcmVlbi5vcmllbnRhdGlvbiB8fCB3aW5kb3cuc2NyZWVuLm1vek9yaWVudGF0aW9uIHx8IHdpbmRvdy5zY3JlZW4ubXNPcmllbnRhdGlvbiB8fCB1bmRlZmluZWQ7XG5cdGlmIChvcmllbnRhdGlvbikge1xuXHRcdHJldHVybiB0eXBlb2Ygb3JpZW50YXRpb24gPT09ICdzdHJpbmcnID9cblx0XHRcdG9yaWVudGF0aW9uLnNwbGl0KCctJylbMF0gOlxuXHRcdFx0b3JpZW50YXRpb24udHlwZS5zcGxpdCgnLScpWzBdO1xuXHR9IGVsc2UgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKSB7XG5cdFx0cmV0dXJuIHdpbmRvdy5tYXRjaE1lZGlhKCcob3JpZW50YXRpb246IHBvcnRyYWl0KScpLm1hdGNoZXMgPyAncG9ydHJhaXQnIDogJ2xhbmRzY2FwZSc7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIGdldEhlaWdodCgpID49IGdldFdpZHRoKCkgPyAncG9ydHJhaXQnIDogJ2xhbmRzY2FwZSc7XG5cdH1cbn1cblxuZnVuY3Rpb24gZGV0ZWN0VmlzaWJsaXR5QVBJKCkge1xuXHRsZXQgaGlkZGVuTmFtZTtcblx0bGV0IGV2ZW50VHlwZTtcblx0aWYgKHR5cGVvZiBkb2N1bWVudC5oaWRkZW4gIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0aGlkZGVuTmFtZSA9ICdoaWRkZW4nO1xuXHRcdGV2ZW50VHlwZSA9ICd2aXNpYmlsaXR5Y2hhbmdlJztcblx0fSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQubW96SGlkZGVuICE9PSAndW5kZWZpbmVkJykge1xuXHRcdGhpZGRlbk5hbWUgPSAnbW96SGlkZGVuJztcblx0XHRldmVudFR5cGUgPSAnbW96dmlzaWJpbGl0eWNoYW5nZSc7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50Lm1zSGlkZGVuICE9PSAndW5kZWZpbmVkJykge1xuXHRcdGhpZGRlbk5hbWUgPSAnbXNIaWRkZW4nO1xuXHRcdGV2ZW50VHlwZSA9ICdtc3Zpc2liaWxpdHljaGFuZ2UnO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC53ZWJraXRIaWRkZW4gIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0aGlkZGVuTmFtZSA9ICd3ZWJraXRIaWRkZW4nO1xuXHRcdGV2ZW50VHlwZSA9ICd3ZWJraXR2aXNpYmlsaXR5Y2hhbmdlJztcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aGlkZGVuTmFtZTogaGlkZGVuTmFtZSxcblx0XHRldmVudFR5cGU6IGV2ZW50VHlwZVxuXHR9O1xufVxuXG5mdW5jdGlvbiBnZXRWaXNpYmlsaXR5KCkge1xuXHRjb25zdCBoaWRkZW5OYW1lID0gZGV0ZWN0VmlzaWJsaXR5QVBJKCkuaGlkZGVuTmFtZTtcblx0cmV0dXJuIGRvY3VtZW50W2hpZGRlbk5hbWVdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0ZGVidWc6IGZ1bmN0aW9uKCkge1xuXHRcdGRlYnVnID0gdHJ1ZTtcblx0fSxcblx0YnJvYWRjYXN0OiBicm9hZGNhc3QsXG5cdGdldFdpZHRoOiBnZXRXaWR0aCxcblx0Z2V0SGVpZ2h0OiBnZXRIZWlnaHQsXG5cdGdldFNpemU6IGdldFNpemUsXG5cdGdldFNjcm9sbFBvc2l0aW9uOiBnZXRTY3JvbGxQb3NpdGlvbixcblx0Z2V0VmlzaWJpbGl0eTogZ2V0VmlzaWJpbGl0eSxcblx0Z2V0T3JpZW50YXRpb246IGdldE9yaWVudGF0aW9uLFxuXHRkZXRlY3RWaXNpYmxpdHlBUEk6IGRldGVjdFZpc2libGl0eUFQSSxcblx0ZGVib3VuY2U6IG9VdGlscy5kZWJvdW5jZSxcblx0dGhyb3R0bGU6IG9VdGlscy50aHJvdHRsZVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Jvd2VyX2NvbXBvbmVudHMvby12aWV3cG9ydC9zcmMvdXRpbHMuanMiLCIvLyBSZXF1aXJlIG1vZHVsZVxucmVxdWlyZSgnby1ncmlkJyk7XG5yZXF1aXJlKCdvLWhpZXJhcmNoaWNhbC1uYXYnKTtcblxuY29uc3Qgb1RhYnMgPSB3aW5kb3cub1RhYnMgPSByZXF1aXJlKCdvLXRhYnMnKTtcblxuLy9jb25zdCBvRXhwYW5kZXJPYmplY3RzID0gd2luZG93Lm9FeHBhbmRlck9iamVjdHMgPSBvRXhwYW5kZXIuaW5pdChkb2N1bWVudC5ib2R5LCB7fSlcblxuY29uc3QgdGFic09iamVjdHMgPSB3aW5kb3cudGFic09iamVjdHMgPSBvVGFicy5pbml0KGRvY3VtZW50LmJvZHksIHtcblx0ZGlzYWJsZWZvY3VzOiBmYWxzZVxufSk7XG5cbi8vIFdhaXQgdW50aWwgdGhlIHBhZ2UgaGFzIGxvYWRlZFxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdpbnRlcmFjdGl2ZScgfHwgZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuXHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnby5ET01Db250ZW50TG9hZGVkJykpO1xufVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuXHQvLyBEaXNwYXRjaCBhIGN1c3RvbSBldmVudCB0aGF0IHdpbGwgdGVsbCBhbGwgcmVxdWlyZWQgbW9kdWxlcyB0byBpbml0aWFsaXNlXG5cdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvLkRPTUNvbnRlbnRMb2FkZWQnKSk7XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9qcy9tYWluLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==