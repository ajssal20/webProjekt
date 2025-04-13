
import { createConnection } from '$lib/db/mysql';
import {BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD} from '$env/static/private';
// Function for authenticating requests using Basic Auth
async function authenticate(request) {
    // Extract the 'authorization' header from the request
    const authHeader = request.headers.get('authorization');
   
    // If the 'authorization' header is missing, return a 401 response with Basic Auth prompt
    if (!authHeader) {
        return new Response(null, {
            status: 401,
            headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' }
        });
    }
   
    // Decode the base64 credentials from the 'authorization' header
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = atob(base64Credentials); // Decode base64 to get the username and password
    const [username, password] = credentials.split(':');
   
    // If the username and password do not match the stored credentials, return 401
    if (username !== BASIC_AUTH_USERNAME || password !== BASIC_AUTH_PASSWORD) {
        return new Response(JSON.stringify({ message: 'Access denied' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // If authentication passes, return null to allow further processing
    return null;
}

// GET method to fetch an article by its UUID
export async function GET({ params }) {
    const { uuid } = params; // Extract the UUID from URL params
    const connection = await createConnection(); // Create a connection to the database
    const [rows] = await connection.execute('SELECT * FROM articles WHERE id = ?', [uuid]); // Fetch the article based on ID
    const article = rows[0]; // Get the first row (article)
    
    // Return the article data in JSON format with a 200 status
    return new Response(JSON.stringify(article), {
        status: 200,
        headers: { 'content-type': 'application/json' }
    });
}

// PUT method to update an article by its UUID
export async function PUT({ params, request }) {
    const auth = await authenticate(request); // Authenticate the request
    if (auth) return auth; // If authentication fails, return the response

    const { uuid } = params; // Extract the UUID from URL params
    const connection = await createConnection(); // Create a connection to the database

    try {
        const data = await request.json(); // Parse the incoming JSON data

        // Execute an UPDATE query to modify the article's fields (with COALESCE to avoid overwriting with null)
        const [result] = await connection.execute(
            `UPDATE articles 
             SET image = COALESCE(?, image), 
                 description = COALESCE(?, description), 
                 author = COALESCE(?, author), 
                 votes = COALESCE(?, votes)
             WHERE id = ?`,
            [data.image ?? null, data.description ?? null, data.author ?? null, data.votes ?? null, uuid]
        );

        // If no rows were affected, return a 404 response (article not found)
        if (result.affectedRows === 0) {
            return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
        }

        // Return the updated article data in JSON format with a 200 status
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'content-type': 'application/json' }
        });

    } catch (error) {
        // Return an error message with a 500 status in case of any exceptions
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

// DELETE method to delete an article by its ID (UUID)
export async function DELETE({ params, request }) {
    const auth = await authenticate(request); // Authenticate the request
    if (auth) return auth; // If authentication fails, return the response

    const { uuid } = params; // Extract the UUID from URL params
    const connection = await createConnection(); // Create a connection to the database
 
    try {
        // Execute a DELETE query to remove the article with the given UUID
        const [result] = await connection.execute(
            'DELETE FROM articles WHERE id = ?',
            [uuid]
        );
 
        // If no rows were affected, return a 404 response (article not found)
        if (result.affectedRows === 0) {
            return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
        }
 
        // Return a 204 status (No Content) for a successful deletion with no content to return
        return new Response(null, { status: 204 });
 
    } catch (error) {
        // Return an error message with a 500 status in case of any exceptions
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}



  