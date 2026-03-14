const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { SocksProxyAgent } = require('socks-proxy-agent');
const cors = require('cors');

const app = express();
app.use(cors());

const proxyAgent = new SocksProxyAgent('socks5://14a5fbc0cc539:19a07222b3@23.26.255.31:12324');

app.use('/', createProxyMiddleware({
    target: 'https://academi.cx',
    changeOrigin: true,
    agent: proxyAgent,
    // headers সরাসরি এখানে দিন, onProxyReq ব্যবহার করার দরকার নেই
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Cookie': 'intercom-device-id-gcaopn51=d90c72b3-f368-46c5-90c1-7bf408d6769b; intercom-session-gcaopn51=TFRsNFBrWnJDbmhUY1VpOU4zMWwydGFsTXBack9tcG91WjRxRzR5V0grUDMvZVR0RDZxd3VkTjJLbXdmeFh3TDZGT2RNaDVodlUxanNrMlM5SkRIQnd3bG1HdXNFb2QxWDRSMk1aei9BQUZTNmFUUkFyWU4rKzVVbWp5SDdncDVSSkVUL2psZEVQL3hnaEcySFd3L3NhTmxxczIyK0x2MVFNelovaEhQdEd4bE5sdWtydm9hNWJhNU5yOWJIUkF2ais0OWVNWEtJUmROTFlZWm84ZTQ1dz09LS1LdlkwYWt6dDVhVFRueW1YbnZRRzFBPT0=--4777605d35f0307e3e91b377dbcc119ba2e5683c; PHPSESSID=nleame2qv88fq0tcugr6s7g680; rememberme=cc845e949e5361aa4b3d703270dfb35f39cc697a7dcee1db'
    }
}));

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on port ${PORT}`);
});
