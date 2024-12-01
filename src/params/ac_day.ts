export function match(param: string) {
	if (!/^\d+$/.test(param)) {
		return false;
	}
	const paramNum = Number(param);
	return 1 <= paramNum && paramNum <= 24;
}
