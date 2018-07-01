/**
 * kukki v1.0.2 build Sun Jul 01 2018
 * https://github.com/vanruesc/kukki
 * Copyright 2018 Raoul van Rüschen, Zlib
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.KUKKI = {})));
}(this, (function (exports) { 'use strict';

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var cookieAttributeRegExp = /^(?:expires|max-age|path|domain|secure)$/i;

  var past = new Date(0);

  var Kukki = function () {
  	function Kukki() {
  		classCallCheck(this, Kukki);
  	}

  	createClass(Kukki, null, [{
  		key: "get",
  		value: function get$$1(key) {

  			var result = null;

  			if (key !== undefined && key !== null) {

  				result = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[-.+*]/g, "\\$&") + "\\s*=\\s*([^;]*).*$)|^.*$"), "$1"));
  			}

  			return result;
  		}
  	}, {
  		key: "set",
  		value: function set$$1(key, value, attributes) {

  			attributes = Object.assign({
  				expires: null,
  				path: null,
  				domain: null,
  				secure: false
  			}, attributes);

  			if (key !== undefined && key !== null && !cookieAttributeRegExp.test(key)) {

  				var expires = attributes.expires !== null ? "; expires=" + attributes.expires.toUTCString() : "";
  				var path = attributes.path !== null ? "; path=" + attributes.path : "";
  				var domain = attributes.domain !== null ? "; domain=" + attributes.domain : "";
  				var secure = attributes.secure ? "; secure" : "";

  				document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + expires + path + domain + secure;
  			}
  		}
  	}, {
  		key: "has",
  		value: function has(key) {

  			var result = false;

  			if (key !== undefined && key !== null && !cookieAttributeRegExp.test(key)) {

  				result = new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[-.+*]/g, "\\$&") + "\\s*=").test(document.cookie);
  			}

  			return result;
  		}
  	}, {
  		key: "delete",
  		value: function _delete(key, attributes) {

  			if (this.has(key)) {

  				attributes = Object.assign({
  					path: null,
  					domain: null
  				}, attributes);

  				var expires = "; expires=" + past.toUTCString();
  				var path = attributes.path !== null ? "; path=" + attributes.path : "";
  				var domain = attributes.domain !== null ? "; domain=" + attributes.domain : "";

  				document.cookie = encodeURIComponent(key) + "=" + expires + path + domain;
  			}
  		}
  	}, {
  		key: "keys",
  		value: function keys() {

  			return document.cookie.replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:=[^;]*)?;\s*/).map(function (key) {
  				return decodeURIComponent(key);
  			});
  		}
  	}]);
  	return Kukki;
  }();

  exports.Kukki = Kukki;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
