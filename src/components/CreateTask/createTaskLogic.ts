export const validEmail = (email: string): boolean =>
	/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
