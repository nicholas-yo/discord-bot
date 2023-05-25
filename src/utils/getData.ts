const getData = async <Data>(
	...args: [input: RequestInfo | URL, init?: RequestInit | undefined]
) => {
	let error: boolean | undefined;

	try {
		const res = await fetch(...args);

		if (!res.ok) {
			error = true;
			throw new Error();
		}

		const data = (await res.json()) as Data;

		if (!data) throw new Error();

		return {
			data,
			error
		};
	} catch (err) {
		return {
			error: true
		};
	}
};

export default getData;
