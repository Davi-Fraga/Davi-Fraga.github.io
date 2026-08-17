import { chromium } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';

async function waitForServer(url: string, timeout = 30000): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status === 200 || res.status === 304) {
        return;
      }
    } catch {
      // ignore and retry
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Servidor não respondeu em ${url} dentro do limite de tempo.`);
}

async function runVisualBrowserTest() {
  console.log('🚀 Iniciando servidor Next.js na porta 3000...');
  
  // Inicia servidor Next.js
  const server = spawn('npx', ['next', 'start', '-p', '3000'], {
    shell: true,
    stdio: 'pipe',
  });

  try {
    await waitForServer('http://localhost:3000');
    console.log('✓ Servidor Next.js online em http://localhost:3000');

    const screenshotsDir = path.join(process.cwd(), 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    const browser = await chromium.launch({ headless: true });

    // 1. Desktop Viewport Test
    console.log('📱 Testando Desktop (1440x900)...');
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const desktopPage = await desktopContext.newPage();
    
    await desktopPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    console.log('  ✓ Home page carregada');

    // Screenshot Hero & Top
    await desktopPage.screenshot({ path: path.join(screenshotsDir, '01-desktop-hero.png'), fullPage: false });
    console.log('  📸 Screenshot capturada: 01-desktop-hero.png');

    // Scroll to Projects
    await desktopPage.locator('#projetos').scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(600);
    await desktopPage.screenshot({ path: path.join(screenshotsDir, '02-desktop-projects.png'), fullPage: false });
    console.log('  📸 Screenshot capturada: 02-desktop-projects.png');

    // Scroll to Experience & Stack
    await desktopPage.locator('#experiencia').scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(600);
    await desktopPage.screenshot({ path: path.join(screenshotsDir, '03-desktop-experience.png'), fullPage: false });
    console.log('  📸 Screenshot capturada: 03-desktop-experience.png');

    // Scroll to Contact
    await desktopPage.locator('#contato').scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(600);
    await desktopPage.screenshot({ path: path.join(screenshotsDir, '04-desktop-contact.png'), fullPage: false });
    console.log('  📸 Screenshot capturada: 04-desktop-contact.png');

    // Test Case Study Navigation
    console.log('🔍 Testando navegação para Case Study (Gestão LGND)...');
    await desktopPage.goto('http://localhost:3000/projects/gestao-lgnd', { waitUntil: 'networkidle' });
    await desktopPage.screenshot({ path: path.join(screenshotsDir, '05-case-study-gestao-lgnd.png'), fullPage: false });
    console.log('  📸 Screenshot capturada: 05-case-study-gestao-lgnd.png');

    // Test Case Study Redmine
    console.log('🔍 Testando navegação para Case Study (Consolidador Redmine)...');
    await desktopPage.goto('http://localhost:3000/projects/redmine-consolidador', { waitUntil: 'networkidle' });
    await desktopPage.screenshot({ path: path.join(screenshotsDir, '06-case-study-redmine.png'), fullPage: false });
    console.log('  📸 Screenshot capturada: 06-case-study-redmine.png');

    await desktopContext.close();

    // 2. Mobile Viewport Test (iPhone 14 / Pixel 5)
    console.log('📱 Testando Mobile Viewport (390x844)...');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    await mobilePage.screenshot({ path: path.join(screenshotsDir, '07-mobile-hero.png'), fullPage: false });
    console.log('  📸 Screenshot capturada: 07-mobile-hero.png');

    // Test Mobile Menu Toggle
    const menuButton = mobilePage.getByRole('button', { name: /Abrir menu/i });
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await mobilePage.waitForTimeout(400);
      await mobilePage.screenshot({ path: path.join(screenshotsDir, '08-mobile-menu-open.png'), fullPage: false });
      console.log('  📸 Screenshot capturada: 08-mobile-menu-open.png');
    }

    await mobileContext.close();
    await browser.close();

    console.log('✨ Teste visual no browser concluído com sucesso!');
  } finally {
    server.kill();
  }
}

runVisualBrowserTest().catch((err) => {
  console.error('Erro no teste de browser:', err);
  process.exit(1);
});
