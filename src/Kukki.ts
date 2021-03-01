import { CookieAttributes } from "./CookieAttributes";

/**
 * A regular expression that identifies cookie attributes.
 */

const cookieAttributesRegExp = /^(?:expires|max-age|path|domain|secure)$/i;

/**
 * A date that lies in the past.
 */

const past = new Date(0);

/**
 * The cookie manager.
 */

export class Kukki {

	/**
	 * Retrieves the value of the specified cookie.
	 *
	 * @param key - The name of the cookie.
	 * @return The value of the cookie, or null if the cookie doesn't exist.
	 */

	static get(key: string): string {

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
	 * @param key - The name of the cookie.
	 * @param value - The value of the cookie.
	 * @param attributes - Optional cookie attributes.
	 */

	static set(key: string, value: string, attributes: CookieAttributes): void {

		attributes = Object.assign({
			expires: null,
			path: null,
			domain: null,
			secure: false
		}, attributes);

		if(key !== undefined && key !== null && !cookieAttributesRegExp.test(key)) {

			const expires = attributes.expires ? "; expires=" + attributes.expires.toUTCString() : "";
			const path = attributes.path ? "; path=" + attributes.path : "";
			const domain = attributes.domain ? "; domain=" + attributes.domain : "";
			const secure = attributes.secure ? "; secure" : "";

			document.cookie = encodeURIComponent(key) + "=" +
				encodeURIComponent(value) + expires + path + domain + secure;

		}

	}

	/**
	 * Checks if the specified cookie exists.
	 *
	 * @param {String} key - The name of the cookie.
	 * @return {Boolean} Whether the cookie exists.
	 */

	static has(key: string): boolean {

		let result = false;

		if(key !== undefined && key !== null && !cookieAttributesRegExp.test(key)) {

			const regExp = new RegExp("(?:^|;\\s*)" + encodeURIComponent(key)
				.replace(/[-.+*]/g, "\\$&") + "\\s*=");

			result = regExp.test(document.cookie);

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
	 * @param key - The name of the cookie.
	 * @param attributes - Additional cookie attributes.
	 */

	static delete(key: string, attributes: CookieAttributes): void {

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
	 * @return The keys.
	 */

	static keys(): string[] {

		return document.cookie
			.replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, "")
			.split(/\s*(?:=[^;]*)?;\s*/)
			.map((key) => decodeURIComponent(key));

	}

}
