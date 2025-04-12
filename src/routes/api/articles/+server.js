
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
    const [rows] =  await connection.execute('SELECT * FROM articles');
    
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { 'content-type': 'application/json' }
    });
  }

  export async function POST({ request }) {
    const auth = await authenticate(request);
    if (auth) return auth;
      const data = await request.json();

      console.log(data)

      const connection = await createConnection();

      const [result] = await connection.execute(
          'INSERT INTO articles (image, description, author, votes) VALUES (?, ?, ?, ?)',
          [data.image, data.description, data.author, data.votes]
      );
  
      await connection.end();
  
      return new Response(JSON.stringify(data), {
          status: 201,
          headers: { 'content-type': 'application/json' }
      });
  }