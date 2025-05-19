
import { createConnection } from '$lib/db/mysql';
import {BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD} from '$env/static/private';
 
// Function for authenticating requests using Basic Auth
async function authenticate(request) {
    // Extract 'authorization' header from the request
    const authHeader = request.headers.get('authorization');
   
    // If 'authorization' header is missing, prompt for Basic Auth credentials with 401 status
    if (!authHeader) {
        return new Response(null, {
            status: 401,
            headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' }// 'WWW-Authenticate: Basic realm="Secure Area"'
        // fordert Basic Auth und zeigt im Login-Popup "Secure Area" als Bereichsnamen an.
        });
    }
   
    // Decode the base64 credentials from the 'authorization' header
    const base64Credentials = authHeader.split(' ')[1]; // Extract the base64 part of the header
    const credentials = atob(base64Credentials); // Decode the base64 string into the username:password format
    const [username, password] = credentials.split(':'); // Split into username and password

    // If the username or password doesn't match, deny access with 401
    if (username !== BASIC_AUTH_USERNAME || password !== BASIC_AUTH_PASSWORD) {
        return new Response(JSON.stringify({ message: 'Access denied' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // If authentication is successful, return null to continue processing
    return null;
}

// GET method to fetch all articles from the database
export async function GET({ params }) {
    const { uuid } = params; // Extract 'uuid' from URL parameters
    const connection = await createConnection(); // Establish a connection to the database

    // Execute query to retrieve all articles from the database
    const [rows] = await connection.execute('SELECT * FROM articles');

    // Return the articles as a JSON response with status 200 (OK)
    return new Response(JSON.stringify(rows), {
        status: 200,
        headers: { 'content-type': 'application/json' }
    });
}

// POST method to create a new article
export async function POST({ request }) {
    const auth = await authenticate(request); // Authenticate the request
    if (auth) return auth; // If authentication fails, return the error response

    const data = await request.json(); // JSON-Daten aus der Anfrage nehmen (neuer Artikel)

    const connection = await createConnection(); // Establish a connection to the database

    // Execute the INSERT query to add a new article to the 'articles' table
    const [result] = await connection.execute(
        'INSERT INTO articles (image, description, author, votes) VALUES (?, ?, ?, ?)',
        [data.image, data.description, data.author, data.votes]
    );

    await connection.end(); // Close the database connection

    // Return the newly created article data as a JSON response with status 201 (Created)
    return new Response(JSON.stringify(data), {
        status: 201,
        headers: { 'content-type': 'application/json' }
    });
}