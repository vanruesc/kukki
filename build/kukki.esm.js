/**
 * kukki v1.1.0 build Mon Feb 03 2020
 * https://github.com/vanruesc/kukki
 * Copyright 2020 Raoul van Rüschen
 * @license Zlib
 */
/**
 * A regular expression that identifies cookie attributes.
 *
 * @type {RegExp}
 * @private
 */

const cookieAttributeRegExp = /^(?:expires|max-age|path|domain|secure)$/i;

/**
 * A date that lies in the past.
 *
 * @type {Date}
 * @private
 */

const past = new Date(0);

/**
 * The cookie manager.
 */

class Kukki {

	/**
	 * Retrieves the value of the specified cookie.
	 *
	 * @param {String} key - The name of the cookie.
	 * @return {String} The value of the cookie, or null if the cookie doesn't exist.
	 */

	static get(key) {

		let result = null;

		if(key !== undefined && key !== null) {

			result = decodeURIComponent(document.cookie.replace(new RegExp(
				"(?:(?:^|.*;)\\s*" +
				encodeURIComponent(key).replace(/[-.+*]/g, "\\$&") +
				"\\s*=\\s*([^;]*).*$)|^.*$"
			), "$1"));

			if(result.length === 0) {

				result = null;

			}

		}

		return result;

	}

	/**
	 * Sets a new cookie or updates an existing one.
	 *
	 * @param {String} key - The name of the cookie.
	 * @param {String} value - The value of the cookie.
	 * @param {Object} [attributes] - Optional cookie attributes.
	 * @param {Date} [attributes.expires] - The expiration date. If omitted, the cookie will only be valid during the current session.
	 * @param {String} [attributes.path] - The path under which the cookie should be visible.
	 * @param {String} [attributes.domain] - The domain under which the cookie should be visible. If omitted, the cookie will only be visible where it was created.
	 * @param {Boolean} [attributes.secure=false] - Whether the cookie requires a secure connection.
	 */

	static set(key, value, attributes) {

		attributes = Object.assign({
			expires: null,
			path: null,
			domain: null,
			secure: false
		}, attributes);

		if(key !== undefined && key !== null && !cookieAttributeRegExp.test(key)) {

			const expires = (attributes.expires !== null) ? "; expires=" + attributes.expires.toUTCString() : "";
			const path = (attributes.path !== null) ? "; path=" + attributes.path : "";
			const domain = (attributes.domain !== null) ? "; domain=" + attributes.domain : "";
			const secure = (attributes.secure) ? "; secure" : "";

			document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + expires + path + domain + secure;

		}

	}

	/**
	 * Checks if the specified cookie exists.
	 *
	 * @param {String} key - The name of the cookie.
	 * @return {Boolean} Whether the cookie exists.
	 */

	static has(key) {

		let result = false;

		if(key !== undefined && key !== null && !cookieAttributeRegExp.test(key)) {

			result = (new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[-.+*]/g, "\\$&") + "\\s*=")).test(document.cookie);

		}

		return result;

	}

	/**
	 * Removes the specified cookie.
	 *
	 * Cookies that have been created with a `path` or `domain` attribute can only
	 * be deleted if those attributes are provided. Cookies with an `http`
	 * attribute cannot be deleted programmatically.
	 *
	 * @param {String} key - The name of the cookie.
	 * @param {Object} [attributes] - Additional cookie attributes.
	 * @param {String} [attributes.path] - The path under which the cookie is visible. Not required if the path was never specified.
	 * @param {String} [attributes.domain] - The domain under which the cookie is visible. Not required if the domain was never specified.
	 */

	static delete(key, attributes) {

		if(this.has(key)) {

			attributes = Object.assign({
				path: null,
				domain: null
			}, attributes);

			const expires = "; expires=" + past.toUTCString();
			const path = (attributes.path !== null) ? "; path=" + attributes.path : "";
			const domain = (attributes.domain !== null) ? "; domain=" + attributes.domain : "";

			document.cookie = encodeURIComponent(key) + "=" + expires + path + domain;

		}

	}

	/**
	 * Returns an array of cookie keys.
	 *
	 * @return {String[]} The keys.
	 */

	static keys() {

		return document.cookie
			.replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, "")
			.split(/\s*(?:=[^;]*)?;\s*/)
			.map((key) => decodeURIComponent(key));

	}

}

export { Kukki };
