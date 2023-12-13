const ZAPClient = require('zap-api');

const targetUrl = 'http://your-website-url.com'; // replace with your website URL
const apiKey = 'your-api-key'; // replace with your ZAP API key

// Create ZAP client instance
const zap = new ZAPClient({
    apiKey: apiKey,
    proxy: 'http://localhost:8090', // ZAP proxy URL
    ajax: true,
});

// Start ZAP and perform a basic spider scan
async function startZAP() {
    try {
        // Start ZAP
        await zap.startZAP();

        // Access your target URL through ZAP proxy
        await zap.accessTargetViaZAP(targetUrl);

        // Spider the target URL
        await zap.spider(targetUrl);

        // Wait for the spider to finish
        await zap.waitForSpiderToFinish();

        // Print the spider results
        const spiderResults = await zap.getSpiderResults();
        console.log('Spider Results:', spiderResults);

        // Perform active scan
        await zap.activeScan(targetUrl);

        // Wait for the active scan to finish
        await zap.waitForActiveScanToFinish();

        // Print the scan results
        const scanResults = await zap.getScanResults();
        console.log('Scan Results:', scanResults);
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        // Shutdown ZAP
        await zap.shutdownZAP();
    }
}

// Run the security tests
startZAP();
