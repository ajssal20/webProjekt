import { createConnection } from '$lib/db/mysql';

export async function load({ locals }) {
    // Establish a connection to the database
    let connection = await createConnection();
    
    // Get all articles from the 'articles' table
    let [rows] = await connection.execute('SELECT * FROM articles');

    // Return the list of articles and user information
    return {
        articles: rows, // Array of articles fetched from the database
        user: locals.user // User data (if available in locals)
    };
}