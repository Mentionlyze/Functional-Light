function partial(fn: Function, ...presetArgs: any[]) {
	return function partiallyApplied(...laterArgs: any[]) {
		return fn(...presetArgs, laterArgs)
	}
}

function prop(key: string, obj: Record<string, any>) {
	return obj[key]
}

function getCurrentSession() {
	// TODO
}

function lookupUser(sessionId: string) {
	// TODO
}

function lookupOrders(userId: string) {
	// TODO
}

function processOrders(orders: any) {
	// TODO
}

const getSessionId = partial(prop, "sessId");
const getUserId = partial(prop, "uId");

var session, sessionId, user, userId, orders;

session = getCurrentSession();
if (session != null) sessionId = getSessionId(session);
if (sessionId != null) user = lookupUser(sessionId);
if (user != null) userId = getUserId(user);
if (userId != null) orders = lookupOrders(userId);
if (orders != null) processOrders(orders);

function guard(fn: Function) {
	return function guarded(arg: any) {
		return arg !== null ? fn(arg) : arg
	}
}

[getSessionId, lookupUser, getUserId, lookupOrders, processOrders]
	.map(guard)
	.reduce((result, nextFn) => nextFn(result), getCurrentSession());


function mergeReducer(merged: any[], v: any, idx: number) {
	return merged.splice(idx * 2, 0, v)
}


(['sessId', 'uId'] as string[])
	.map((propName: string) => partial(prop, propName))
	.reduce(mergeReducer, [lookupUser])
	.map(guard)
	.reduce((result, nextFn) => nextFn(result), getCurrentSession())












