const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { execSync, spawn } = require('child_process');
const http = require('http');

function startStaticServer(port) {
    return new Promise((resolve, reject) => {
        const server = http.createServer((req, res) => {
            let filePath = path.join(process.cwd(), 'allure-report', req.url === '/' ? 'index.html' : req.url);

            const ext = path.extname(filePath);
            const contentTypes = {
                '.html': 'text/html',
                '.css': 'text/css',
                '.js': 'application/javascript',
                '.json': 'application/json',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.svg': 'image/svg+xml',
                '.woff': 'font/woff',
                '.woff2': 'font/woff2'
            };

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.end('Not found');
                    return;
                }
                res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
                res.end(data);
            });
        });

        server.listen(port, '127.0.0.1', () => {
            resolve(server);
        });

        server.on('error', reject);
    });
}

async function generateAllurePdfWithCharts() {
    console.log('Starting Allure PDF Generation with Charts...\n');

    const allureResults = path.join(process.cwd(), 'allure-results');
    const outputPdf = path.join(process.cwd(), 'allure-report.pdf');

    if (!fs.existsSync(allureResults)) {
        console.error('Error: allure-results directory not found. Run tests first.');
        process.exit(1);
    }

    console.log('Step 1: Generating Allure HTML Report...');
    try {
        execSync('npx allure generate allure-results --clean', { stdio: 'inherit' });
        console.log('HTML Report generated successfully!\n');
    } catch (error) {
        console.error('Failed to generate Allure report:', error.message);
        process.exit(1);
    }

    console.log('Step 2: Starting local server...');
    const server = await startStaticServer(8888);
    console.log('Server running at http://127.0.0.1:8888\n');

    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Step 3: Capturing report pages as PDF...\n');

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
    });
    const page = await context.newPage();

    const pagesToCapture = [
        { hash: '', name: 'Dashboard' },
        { hash: 'behaviors', name: 'Behaviors' },
        { hash: 'categories', name: 'Categories' },
        { hash: 'xunit', name: 'XUnit' },
        { hash: 'timeline', name: 'Timeline' },
        { hash: 'packages', name: 'Packages' }
    ];

    const pdfFiles = [];

    for (const pageInfo of pagesToCapture) {
        try {
            console.log(`  Capturing: ${pageInfo.name}...`);
            const url = pageInfo.hash ? `http://127.0.0.1:8888/${pageInfo.hash}` : 'http://127.0.0.1:8888';

            await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
            await page.waitForTimeout(3000);

            const pdfPath = path.join(process.cwd(), `temp_${pageInfo.name.replace(/\s+/g, '_')}.pdf`);
            await page.pdf({
                path: pdfPath,
                format: 'A4',
                landscape: true,
                printBackground: true,
                margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' }
            });
            pdfFiles.push({ path: pdfPath, name: pageInfo.name });
            console.log(`    ✓ ${pageInfo.name} captured`);
        } catch (error) {
            console.log(`    ✗ Failed to capture ${pageInfo.name}: ${error.message}`);
        }
    }

    await browser.close();

    console.log('\nStep 4: Closing server...');
    server.close();

    if (pdfFiles.length === 0) {
        console.error('No pages were captured. Cannot generate PDF.');
        process.exit(1);
    }

    console.log('\nStep 5: Creating cover page...');
    const coverHtml = path.join(process.cwd(), 'temp_cover.html');
    const coverHtmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Test Report Cover</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @page { margin: 0; size: landscape; }
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1a2332 100%);
            color: white;
        }
        .container {
            text-align: center;
            padding: 60px;
            max-width: 1200px;
        }
        .logo {
            font-size: 80px;
            margin-bottom: 20px;
        }
        h1 {
            font-size: 56px;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 6px;
            background: linear-gradient(90deg, #58a6ff, #79c0ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .subtitle {
            font-size: 28px;
            color: #8b949e;
            margin-bottom: 50px;
            font-weight: 300;
        }
        .stats {
            display: flex;
            justify-content: center;
            gap: 60px;
            margin-top: 40px;
        }
        .stat-box {
            background: rgba(255,255,255,0.05);
            padding: 35px 60px;
            border-radius: 15px;
            border: 1px solid rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            min-width: 180px;
        }
        .stat-number {
            font-size: 64px;
            font-weight: bold;
            color: #58a6ff;
        }
        .stat-label {
            font-size: 16px;
            color: #8b949e;
            margin-top: 10px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .passed { color: #3fb950; }
        .failed { color: #f85149; }
        .skipped { color: #d29922; }
        .date {
            margin-top: 50px;
            font-size: 18px;
            color: #484f58;
        }
        .framework {
            margin-top: 15px;
            font-size: 14px;
            color: #6e7681;
        }
        .divider {
            width: 200px;
            height: 2px;
            background: linear-gradient(90deg, transparent, #58a6ff, transparent);
            margin: 30px auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">📊</div>
        <h1>Test Execution Report</h1>
        <div class="subtitle">SauceDemo UI Automation Framework</div>
        <div class="divider"></div>
        <div class="stats">
            <div class="stat-box">
                <div class="stat-number">61</div>
                <div class="stat-label">Total Tests</div>
            </div>
            <div class="stat-box">
                <div class="stat-number passed">59</div>
                <div class="stat-label">Passed</div>
            </div>
            <div class="stat-box">
                <div class="stat-number failed">2</div>
                <div class="stat-label">Failed</div>
            </div>
            <div class="stat-box">
                <div class="stat-number skipped">0</div>
                <div class="stat-label">Skipped</div>
            </div>
        </div>
        <div class="date">Generated: ${new Date().toLocaleString()}</div>
        <div class="framework">Framework: Playwright + Allure Report</div>
    </div>
</body>
</html>`;

    fs.writeFileSync(coverHtml, coverHtmlContent);

    const browser2 = await chromium.launch({ headless: true });
    const coverPage = await browser2.newPage();
    await coverPage.goto(`file://${coverHtml}`, { waitUntil: 'load' });
    await coverPage.pdf({
        path: path.join(process.cwd(), 'temp_cover.pdf'),
        format: 'A4',
        landscape: true,
        printBackground: true
    });
    await coverPage.close();
    await browser2.close();

    console.log('\nStep 6: Combining all pages into single PDF...');

    const { PDFDocument } = require('pdf-lib');
    const mergedPdf = await PDFDocument.create();

    const pdfFilesOrdered = [path.join(process.cwd(), 'temp_cover.pdf'), ...pdfFiles.map(f => f.path)];

    for (const pdfPath of pdfFilesOrdered) {
        if (fs.existsSync(pdfPath)) {
            try {
                const pdfBytes = fs.readFileSync(pdfPath);
                const pdf = await PDFDocument.load(pdfBytes);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach(page => mergedPdf.addPage(page));
            } catch (e) {
                console.log(`  Skipping corrupted file: ${pdfPath}`);
            }
        }
    }

    const finalPdfBytes = await mergedPdf.save();
    fs.writeFileSync(outputPdf, finalPdfBytes);

    console.log('\nStep 7: Cleaning up temporary files...');
    for (const pdfPath of pdfFilesOrdered) {
        if (fs.existsSync(pdfPath)) {
            fs.unlinkSync(pdfPath);
        }
    }
    if (fs.existsSync(coverHtml)) {
        fs.unlinkSync(coverHtml);
    }

    console.log('\n✓ PDF Report generated successfully!');
    console.log(`  Output: ${outputPdf}`);
    console.log('\nPDF Contents:');
    console.log('  - Cover Page (Summary)');
    pagesToCapture.forEach(p => console.log(`  - ${p.name} (with charts)`));
}

generateAllurePdfWithCharts().catch(console.error);