const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const htmlFile = 'file:///' + path.resolve(__dirname, 'apostila.html').replace(/\\/g, '/');
  const pdfOut  = path.resolve(__dirname, 'apostila.pdf');

  console.log('Abrindo Edge headless...');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900 });

  console.log('Carregando apostila.html...');
  await page.goto(htmlFile, { waitUntil: 'networkidle0', timeout: 60000 });

  // aguarda fontes e SVGs renderizarem
  await new Promise(r => setTimeout(r, 2000));

  console.log('Gerando PDF...');
  await page.pdf({
    path: pdfOut,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: false,   // sem cabeçalho/rodapé do browser
    margin: { top: '15mm', bottom: '15mm', left: '12mm', right: '12mm' }
  });

  await browser.close();
  console.log('PDF gerado:', pdfOut);
})();
