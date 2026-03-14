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

// মূল প্রক্সি কানেকশন
app.use('/', createProxyMiddleware({
    target: 'https://academi.cx',
    changeOrigin: true,
    secure: false, 
    agent: proxyAgent,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Cookie': premiumCookies
    },
    onProxyReq: (proxyReq, req, res) => {
        // 🕵️ ডিটেকটিভ লজিক: প্রক্সির ভেতর থেকেই রিকোয়েস্ট ট্র্যাক করা হচ্ছে
        if (req.method === 'POST') {
            console.log('🔥 NEW POST REQUEST DETECTED: ', req.url);
        }
    },
    onError: (err, req, res) => {
        console.error('Proxy Error:', err.message);
        if (!res.headersSent) {
            res.status(500).send('প্রক্সিতে সমস্যা হচ্ছে: ' + err.message);
        }
    }
}));

const PORT = process.env.PORT || 10000; // Render সাধারণত ১০০০০ পোর্ট ব্যবহার করে
app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
