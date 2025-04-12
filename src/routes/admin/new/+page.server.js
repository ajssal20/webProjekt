import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export async function load({ locals }) {
	if (!locals.user || locals.user.role !== 'admin') {
		redirect(302, '/login');
	}
}

export const actions = {
	createArticle: async ({ request }) => {
		const formData = await request.formData();
        const image = formData.get('image');
		const { url } = await put('images/' + image.name, image, {
			access: 'public',
			token: BLOB_READ_WRITE_TOKEN
		});
		console.log(formData);

		const connection = await createConnection();
		const [result] = await connection.execute(
			'INSERT INTO articles (image, description, author) VALUES (?, ?, ?)',
			[url, formData.get('description'), formData.get('author')]
		);
		console.log(result);
		if (result.affectedRows) {
			redirect(303, '/admin');
		}
	}
};