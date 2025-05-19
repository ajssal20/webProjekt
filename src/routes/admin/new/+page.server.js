import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';  // Ermöglicht Umleitung auf andere Seiten
import { error } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';// Sicherer Zugriffstoken aus .env-Datei

// Load function that checks if the user is an admin
export async function load({ locals }) {
	// If the user is not logged in or not an admin, redirect them to the login page
	if (!locals.user || locals.user.role !== 'admin') {
		redirect(302, '/login');// Wird zur Login-Seite weitergeleitet

	}
}

export const actions = {
	// Action for creating a new article
	createArticle: async ({ request }) => {
		// Extract form data from the request
		const formData = await request.formData();
        // Get the image file from the form data
        const image = formData.get('image');
		// Upload the image to Vercel Blob storage and get the image URL
		const { url } = await put('images/' + image.name, image, {
			addRandomSuffix: true,  // Fügt zufällige Endung an den Dateinamen, um Kollisionen zu vermeiden
			access: 'public', // Make the image publicly accessible
			token: BLOB_READ_WRITE_TOKEN // Pass in the secure Blob storage access token
		});

		// Create a connection to the database
		const connection = await createConnection();
		// Insert the article data into the database
		const [result] = await connection.execute(
			'INSERT INTO articles (image, description, author) VALUES (?, ?, ?)',
			[url, formData.get('description'), formData.get('author')]
		);

		// If successful, redirect the user to the admin page
		if (result.affectedRows) {
			redirect(303, '/admin');
		}
	}
};