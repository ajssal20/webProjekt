import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

// Load function that checks if the user is an admin and fetches articles
export async function load({locals}) {
	// If the user is not logged in or not an admin, redirect them to the login page
	if (!locals.user || locals.user.role !== 'admin') {
		redirect(302, '/login');
	}

	// Create a connection to the database
	let connection = await createConnection();
	// Select all articles
	let [rows] = await connection.execute('SELECT * FROM articles');

	// Return the articles data to be used in the page
	return {
		articles: rows
	};
}

export const actions = {
	// Action for deleting an article
	deleteArticle: async ({ request }) => {
		// Extract form data from the request
		const formData = await request.formData();
		// Get the article ID from the form data
		const id = formData.get('id');
		// Create a connection to the database
		const connection = await createConnection();
		// Execute the DELETE query to remove the article with the given ID
		const [result] = await connection.execute('DELETE FROM articles WHERE id = ?', [id]);
	}
};