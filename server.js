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
    agent: proxyAgent, // এই লাইনটি আপনার আসল প্রক্সি আইপি দিয়ে কানেক্ট করবে
    onProxyReq: (proxyReq, req, res) => {
        // এখানে পরে আপনার প্রিমিয়াম অ্যাকাউন্টের কুকি বসবে
    }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
