const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { HttpsProxyAgent } = require('https-proxy-agent');
const cors = require('cors');

const app = express();
app.use(cors());

// ১. আপনার কেনা Proxy IP এর তথ্য (পরে এখানে আসল আইপি বসাতে হবে)
const proxyUrl = 'http://username:password@your_proxy_ip:port'; 
const proxyAgent = new HttpsProxyAgent(proxyUrl);

// ২. মূল প্রক্সি সেটআপ (academi.cx এর সাথে কানেকশন)
app.use('/', createProxyMiddleware({
    target: 'https://academi.cx',
    changeOrigin: true,
    agent: proxyAgent, // এই লাইনটি আপনার আইপি লুকিয়ে ফেলবে
    onProxyReq: (proxyReq, req, res) => {
        // এখানে আপনার প্রিমিয়াম অ্যাকাউন্টের কুকি বসবে (পরে অ্যাড করবো)
        proxyReq.setHeader('Cookie', 'YOUR_PREMIUM_COOKIE_HERE');
    }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
