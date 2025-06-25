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

    // Debug environment variables
    console.log('Environment variables:', {
        USER_NAME: process.env.USER_NAME,
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: process.env.VERCEL
    });

    res.json({ 
        userName: process.env.USER_NAME || 'Your Name',
        debug: {
            hasUserName: !!process.env.USER_NAME,
            nodeEnv: process.env.NODE_ENV,
            isVercel: !!process.env.VERCEL
        }
    });
}