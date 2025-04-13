import  { login } from '$lib/db/auth';
import { redirect } from '@sveltejs/kit';

export const actions = {
    // Action for the login process
    login: async ({ request, cookies }) => {

        // Retrieve form data (email and password) from the incoming request
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');

        // Attempt to log the user in by calling the custom 'login' function
        const token = await login(email, password);

        // If login is successful and token is generated
        if (token) {
            cookies.set('session', token, {
                maxAge: 60 * 60 * 24 * 7, // Cookie will expire in 7 days
                path: '/',
                httpOnly: true,
                sameSite: 'strict'
            });
            // Redirect the user to the '/admin' page upon successful login
            redirect(302, '/admin');
        } else {
            // If login failed, return an error message
            return {
                success: false,
                message: 'Login failed' // Inform the user that the login attempt was unsuccessful
            };
        }
    }
};