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
                maxAge: 60 * 60 * 24 * 7,  // 7 Tage in Sekunden
                path: '/',                 // Cookie gilt für die gesamte Seite               
                httpOnly: true,            // Cookie ist nur für HTTP (nicht für JS zugreifbar)
                sameSite: 'strict'
            });
            // Nach erfolgreichem Login wird der Nutzer auf die Admin-Seite weitergeleitet
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