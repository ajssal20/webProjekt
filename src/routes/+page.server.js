import { createConnection } from '$lib/db/mysql';

export async function load({locals}) {
	let connection = await createConnection();
	let [rows] = await connection.execute('SELECT * FROM articles');
	console.log(locals)

	return {
		articles: rows,
		user: locals.user
	};
}