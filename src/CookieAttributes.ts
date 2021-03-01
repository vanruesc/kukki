/**
 * Cookie attributes.
 */

export interface CookieAttributes {

	/**
	 * The expiration date. If omitted, the cookie will only be valid during the
	 * current session.
	 */

	expires: Date;

	/**
	 * The path under which the cookie should be visible.
	 */

	path: string;

	/**
	 * The domain under which the cookie should be visible. If omitted, the cookie
	 * will only be visible where it was created.
	 */

	domain: string;

	/**
	 * Whether the cookie requires a secure connection.
	 */

	secure: boolean;

}
