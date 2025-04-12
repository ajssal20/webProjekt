
import { createConnection } from '$lib/db/mysql';
import {BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD} from '$env/static/private';
async function authenticate(request) {
 
    const authHeader = request.headers.get('authorization');
   
    if (!authHeader){
        return new Response(null,{
            status: 401,
            headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"'}
        });
   
    }
   
   
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = atob(base64Credentials);
    const [username, password] = credentials.split(':');
   
   
    if (username !== BASIC_AUTH_USERNAME || password !== BASIC_AUTH_PASSWORD){
        return new Response (JSON.stringify({message:'Access denied'}), {
            status: 401,
            headers: {'Content-Type': 'application/json'},
        });
    }
    return null;
   
    }


export async function GET({ params }) {
    const { uuid } = params;
	const connection = await createConnection();
    const [rows] =  await connection.execute('SELECT * FROM articles WHERE id = ?', [uuid]);
	const article = rows[0];
    return new Response(JSON.stringify(article), {
      status: 200,
      headers: { 'content-type': 'application/json' }
    });
  }

  export async function PUT({ params, request }) {
    const auth = await authenticate(request);
    if (auth) return auth;

    const { uuid } = params;
    const connection = await createConnection();

    try {
        const data = await request.json();

        const [result] = await connection.execute(
            `UPDATE articles 
             SET image = COALESCE(?, image), 
                 description = COALESCE(?, description), 
                 author = COALESCE(?, author), 
                 votes = COALESCE(?, votes)
             WHERE id = ?`,
            [data.image ?? null, data.description ?? null, data.author ?? null, data.votes ?? null, uuid]
        );

        if (result.affectedRows === 0) {
            return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'content-type': 'application/json' }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

  export async function DELETE({ params, request }) {
    const auth = await authenticate(request);
    if (auth) return auth;
    const { uuid } = params;
    const connection = await createConnection();
 
    try {
        const [result] = await connection.execute(
            'DELETE FROM articles WHERE id = ?',
            [uuid]
        );
 
        if (result.affectedRows === 0) {
            return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
        }
 
        return new Response(null, { status: 204 });
 
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}



  