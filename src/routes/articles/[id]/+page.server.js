import { createConnection } from '$lib/db/mysql';

export const actions = {
	// Action for adding a comment to an article
	comment: async ({ request }) => {
		// Retrieve the form data from the request
		const formData = await request.formData();

		// Extract necessary fields from the form data
		const id = formData.get('article_id');
		const name = formData.get('name');
		const text = formData.get('text');

		// Create the database connection
		const connection = await createConnection();

		// Insert the comment into the comments table
		const [result] = await connection.execute(
			'INSERT INTO comments (article_id, name, text) VALUES (?, ?, ?)',
			[id, name, text]
		);
	},

	// Action for upvoting an article
	// upvoteDie Funktion, die aufgerufen wird, wenn ein Nutzer einen Artikel „hochvoten“ will
	upvote: async ({ request }) => {
		// Retrieve the form data from the request
		//liest die daten die gesendet werden
		const formData = await request.formData();
		const id = formData.get('id'); // Article ID for the upvote action

		// Create the database connection
		const connection = await createConnection();

		// Execute an UPDATE query to increment the votes of the article by 1
		const [result] = await connection.execute(
			'UPDATE articles SET votes = votes + 1 WHERE id = ?',
			[id]
		);

		// If the update affected any rows, return a success response
		//Es zeigt an, wie viele Zeilen in der Datenbank tatsächlich verändert wurden.
		if (result.affectedRows) {
			return { success: true };
		} else {
			// If no rows were affected, return an error response
			return { error: 'Fail' };
		}
	}
};

//wir brauchen export um  wenn du Funktionen wie upvote() in anderen Modulen verwenden wills
// Load function to fetch article and related comments based on the article ID
export async function load({ params, locals }) {
	// Create the database connection
	let connection = await createConnection();

	// Retrieve the article by its ID from the database
	let [rows] = await connection.execute('SELECT * FROM articles WHERE id = ?', [params.id]);

	// Retrieve the comments related to the article
	let [comments] = await connection.execute('SELECT * FROM comments WHERE article_id = ?', [
		params.id
	]);

	// Return the article data, comments, and user details for rendering
	return {
		articles: rows,
		comments: comments,
		user: locals.user
	};
}