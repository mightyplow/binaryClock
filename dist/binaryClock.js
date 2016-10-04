(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.createBinaryClock = undefined;

	var _digit = __webpack_require__(1);

	var _time = __webpack_require__(3);

	var _convert = __webpack_require__(4);

	var createBinaryClock = exports.createBinaryClock = function createBinaryClock(targetElement, startImmediately) {
	    if (!targetElement) {
	        throw Error('target element must be pased');
	    }

	    startImmediately = startImmediately !== false;

	    var binaryDigitCounts = [2, 4, 3, 4, 3, 4];
	    var updateIntervalInMs = 200;
	    var binaryClockClassname = 'binary-clock';

	    var updateClock = function () {
	        var digits = binaryDigitCounts.map(function (count) {
	            return (0, _digit.createDigit)(count);
	        });
	        digits.forEach(function (digit) {
	            return targetElement.appendChild(digit.element);
	        });

	        return function (timeString) {
	            var timeDigits = timeString.replace(/:/g, '');
	            var binaryDigitValues = timeDigits.split('').map(_convert.toBinaryString);
	            binaryDigitValues.forEach(function (binaryValue, index) {
	                return digits[index].setValue(binaryValue);
	            });
	        };
	    }();

	    var clock = function () {
	        var lastTime = void 0,
	            interval = void 0;

	        var updateTimeHandlers = new Set();

	        var updateTime = function updateTime() {
	            var time = (0, _time.getTime)();

	            if (time !== lastTime) {
	                updateClock(time);
	                updateTimeHandlers.forEach(function (handler) {
	                    return handler(time);
	                });
	            }

	            lastTime = time;
	        };

	        return {
	            start: function start() {
	                updateTime();
	                interval = setInterval(updateTime, updateIntervalInMs);
	            },

	            stop: function stop() {
	                clearInterval(interval);
	                lastTime = undefined;
	            },

	            addTimeUpdateHandler: function addTimeUpdateHandler(handler) {
	                updateTimeHandlers.add(handler);
	                interval && lastTime && handler(lastTime);
	            },

	            removeTimeUpdateHandler: updateTimeHandlers.delete.bind(updateTimeHandlers)
	        };
	    }();

	    targetElement.classList.add(binaryClockClassname);
	    startImmediately && clock.start();

	    return clock;
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.createDigit = exports.createBinaryDigit = undefined;

	var _array = __webpack_require__(2);

	var div = document.createElement('div'),
	    createDiv = div.cloneNode.bind(div, true),
	    activeClass = 'active';

	var binaryDigitPrototype = {
	    activate: function activate() {
	        this.element.classList.add(activeClass);
	    },

	    deactivate: function deactivate() {
	        this.element.classList.remove(activeClass);
	    },

	    setActiveState: function setActiveState(active) {
	        if (active === true) {
	            this.activate();
	        } else if (active === false) {
	            this.deactivate();
	        }
	    }
	};

	var createBinaryDigit = function createBinaryDigit() {
	    var digit = createDiv();
	    digit.classList.add('binary-digit');

	    return Object.create(binaryDigitPrototype, {
	        element: {
	            value: digit,
	            enumerable: true
	        }
	    });
	};

	var createDigit = function createDigit(numBinaryDigits) {
	    var binaryDigits = [];

	    var digit = createDiv();
	    digit.classList.add('digit');

	    for (var i = 0; i < numBinaryDigits; i += 1) {
	        var binaryDigit = createBinaryDigit();

	        binaryDigits.push(binaryDigit);
	        digit.appendChild(binaryDigit.element);
	    }

	    return {
	        element: digit,

	        setValue: function setValue(binaryValue) {
	            // fill from right to left to ensure digit positions
	            var str = String(binaryValue);
	            var reversedBinaryValues = str.split('').reverse();
	            var reversedDigits = (0, _array.copyArray)(binaryDigits).reverse();

	            reversedDigits.forEach(function (binaryDigit, index) {
	                var value = reversedBinaryValues[index] || '0';
	                var active = value === '1';
	                binaryDigit.setActiveState(active);
	            });
	        }
	    };
	};

	exports.createBinaryDigit = createBinaryDigit;
	exports.createDigit = createDigit;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var copyArray = function copyArray(ar) {
	    ar = ar || [];
	    return ar.slice(0);
	};

	exports.copyArray = copyArray;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var getTime = exports.getTime = function getTime() {
	    var timeMatch = Date().match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/);
	    return timeMatch && timeMatch[0];
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var toBinaryString = exports.toBinaryString = function toBinaryString(val) {
	    var num = Number(val);
	    return !isNaN(num) && num.toString(2) || '';
	};

/***/ }
/******/ ])
});
;