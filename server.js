const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { HttpsProxyAgent } = require('https-proxy-agent');
const cors = require('cors');

const app = express();
app.use(cors());

// আপাতত একটি ডেমো আইপি দিচ্ছি যাতে সার্ভার রান হয় কোনো এরর ছাড়া।
const proxyUrl = 'http://127.0.0.1:8080'; 
const proxyAgent = new HttpsProxyAgent(proxyUrl);

// মূল প্রক্সি সেটআপ (academi.cx এর সাথে কানেকশন)
app.use('/', createProxyMiddleware({
    target: 'https://academi.cx',
    changeOrigin: true,
    agent: proxyAgent, 
    onProxyReq: (proxyReq, req, res) => {
        // এখানে আপনার প্রিমিয়াম অ্যাকাউন্টের কুকি বসবে (পরে অ্যাড করবো)
        proxyReq.setHeader('Cookie', 'YOUR_PREMIUM_COOKIE_HERE');
    }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
