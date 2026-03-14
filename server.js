const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { SocksProxyAgent } = require('socks-proxy-agent');
const cors = require('cors');

const app = express();
app.use(cors());

// আপনার আসল পেইড প্রক্সি (SOCKS5 সেটআপ)
const proxyUrl = 'socks5://14a5fbc0cc539:19a07222b3@23.26.255.31:12324'; 
const proxyAgent = new SocksProxyAgent(proxyUrl);

// আপনার দেওয়া কুকি
const premiumCookies = "intercom-device-id-gcaopn51=d90c72b3-f368-46c5-90c1-7bf408d6769b; intercom-session-gcaopn51=TFRsNFBrWnJDbmhUY1VpOU4zMWwydGFsTXBack9tcG91WjRxRzR5V0grUDMvZVR0RDZxd3VkTjJLbXdmeFh3TDZGT2RNaDVodlUxanNrMlM5SkRIQnd3bG1HdXNFb2QxWDRSMk1aei9BQUZTNmFUUkFyWU4rKzVVbWp5SDdncDVSSkVUL2psZEVQL3hnaEcySFd3L3NhTmxxczIyK0x2MVFNelovaEhQdEd4bE5sdWtydm9hNWJhNU5yOWJIUkF2ais0OWVNWEtJUmROTFlZWm84ZTQ1dz09LS1LdlkwYWt6dDVhVFRueW1YbnZRRzFBPT0=--4777605d35f0307e3e91b377dbcc119ba2e5683c; PHPSESSID=nleame2qv88fq0tcugr6s7g680; rememberme=cc845e949e5361aa4b3d703270dfb35f39cc697a7dcee1db";

// মূল প্রক্সি কনফিগারেশন
const proxyOptions = {
    target: 'https://academi.cx',
    changeOrigin: true,
    secure: false,
    agent: proxyAgent,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Cookie': premiumCookies
    },
    onProxyReq: (proxyReq, req, res) => {
        // শুধু লগ দেখার জন্য, কোনো হেডার এখানে সেট করছি না যাতে ক্র্যাশ না করে
        if (req.method === 'POST') {
            console.log('🔥 NEW POST REQUEST:', req.url);
        }
    },
    onError: (err, req, res) => {
        console.error('Proxy Error:', err.message);
        if (!res.headersSent) {
            res.status(500).send('Proxy Connection Error.');
        }
    }
};

// প্রক্সি রুট সেটআপ
app.use('/', createProxyMiddleware(proxyOptions));

// পোর্ট সেটআপ (Render-এর জন্য খুবই গুরুত্বপূর্ণ)
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is live on port ${PORT}`);
});
