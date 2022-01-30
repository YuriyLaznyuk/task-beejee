export const validPassword = (password: string): boolean =>
	/^123$/.test(password);
export const validAdmin = (username: string): boolean =>
	/^admin$/.test(username);
