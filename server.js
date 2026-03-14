const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { HttpsProxyAgent } = require('https-proxy-agent');
const cors = require('cors');

const app = express();
app.use(cors());

// আপনার আসল পেইড প্রক্সি সেটআপ
const proxyUrl = 'http://14a5fbc0cc539:19a07222b3@23.26.255.31:12324'; 
const proxyAgent = new HttpsProxyAgent(proxyUrl);

// মূল প্রক্সি কানেকশন
app.use('/', createProxyMiddleware({
    target: 'https://academi.cx',
    changeOrigin: true,
    secure: false, // SSL/TLS এরর এড়ানোর জন্য
    agent: proxyAgent,
    onProxyReq: (proxyReq, req, res) => {
        // ব্রাউজার সেজে সাইটে ঢোকার জন্য User-Agent
        proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    },
    onError: (err, req, res) => {
        // এরর হলে যেন বিস্তারিত মেসেজ দেখায়
        console.error('Proxy Error:', err.message);
        res.status(500).send('প্রক্সিতে সমস্যা হচ্ছে: ' + err.message);
    }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
