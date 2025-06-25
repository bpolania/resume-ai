// For Vercel serverless functions, sometimes we need to access env vars differently
const getUserName = () => {
    // Try multiple ways to access the environment variable
    return process.env.USER_NAME || 
           process.env.VERCEL_ENV_USER_NAME || 
           process.env['USER_NAME'] ||
           'Boris'; // Fallback to your name instead of generic
};

export default async function handler(req, res) {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const userName = getUserName();

    // Debug all environment variables
    console.log('All env vars starting with USER:', Object.keys(process.env).filter(key => key.includes('USER')));
    console.log('Environment variables:', {
        USER_NAME: process.env.USER_NAME,
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: process.env.VERCEL,
        VERCEL_ENV: process.env.VERCEL_ENV,
        userName: userName
    });

    res.json({ 
        userName: userName
    });
}