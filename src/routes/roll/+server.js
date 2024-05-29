export function GET() {
	const number = Math.floor(Math.random() * 6) + 1;

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return new Response(number, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
