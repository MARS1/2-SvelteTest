import * as database from '$lib/server/database.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const { description } = await request.json();

	const userid = cookies.get('userid');
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const { id } = await database.createTodo({ userid, description });

	return json({ id }, { status: 201 });
}
