import { test, expect } from '@playwright/test';

test.describe('Portfólio Davi Fraga - E2E Tests', () => {
  test('Home page renders hero, positioning and prominent name correctly', async ({ page }) => {
    await page.goto('/');

    // Check prominent name
    await expect(page.getByText('Davi Fraga', { exact: true }).first()).toBeVisible();

    // Check main title
    await expect(page.locator('h1')).toContainText('Desenvolvedor Full Stack');
    await expect(page.locator('h1')).toContainText('Engenharia de Software');

    // Check availability badge
    await expect(page.getByText('Disponível para oportunidades em Desenvolvimento de Software')).toBeVisible();

    // Check strategic stack in hero
    await expect(page.getByText('Java', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Spring Boot', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('NestJS', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('React', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Angular', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('PostgreSQL', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Docker', { exact: true }).first()).toBeVisible();

    // Check CTAs
    await expect(page.getByRole('link', { name: /Ver projetos/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Currículo/i }).first()).toBeVisible();
  });

  test('Metrics section renders all four engineering stats', async ({ page }) => {
    await page.goto('/');

    const metricsSection = page.getByLabel('Métricas de engenharia e produção');
    await expect(metricsSection.getByText('578+')).toBeVisible();
    await expect(metricsSection.getByText('1.000+')).toBeVisible();
    await expect(metricsSection.getByText('226+')).toBeVisible();
    await expect(metricsSection.getByText('Containers em produção')).toBeVisible();
  });

  test('Featured project #1 (Gestão LGND) renders with full details and stats', async ({ page }) => {
    await page.goto('/');

    const lgndHeading = page.getByRole('heading', { name: 'Gestão LGND — Central da Manada' });
    await expect(lgndHeading).toBeVisible();
    await expect(page.getByText('PROJETO DESTAQUE Nº 1')).toBeVisible();
    await expect(page.getByText('Produto em produção').first()).toBeVisible();
    await expect(page.getByText('578', { exact: true })).toBeVisible();
    await expect(page.getByText('Testes automatizados').first()).toBeVisible();
  });

  test('All primary featured projects and engineering cases are displayed', async ({ page }) => {
    await page.goto('/');

    // Primary projects
    await expect(page.getByRole('heading', { name: 'Consolidador Redmine' })).toBeVisible();
    await expect(page.getByText('GetCoders — Estágio em Desenvolvimento Web').first()).toBeVisible();

    await expect(page.getByRole('heading', { name: 'Plataforma de Gestão Jurídica' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'FluxoCorreto' })).toBeVisible();

    // Engineering cases
    await expect(page.getByRole('heading', { name: 'Coligação 2026' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Landing Page Flamengo' })).toBeVisible();
  });

  test('Academic projects section renders GynLog and PDV', async ({ page }) => {
    await page.goto('/');

    const academicSection = page.getByLabel('Projetos Acadêmicos e Formativos');
    await expect(academicSection.getByRole('heading', { name: 'GynLog Fleet Manager' })).toBeVisible();
    await expect(academicSection.getByRole('heading', { name: 'PDV Posto de Combustível' })).toBeVisible();
    await expect(academicSection.getByText('Java Desktop').first()).toBeVisible();
  });

  test('Experience, Skills by Domain and About section render correctly', async ({ page }) => {
    await page.goto('/');

    // Experience
    await expect(page.getByRole('heading', { name: 'Estagiário em Desenvolvimento Web' })).toBeVisible();
    await expect(page.getByText('GetCoders').first()).toBeVisible();

    // Education
    const educationHeading = page.getByRole('heading', { name: 'Engenharia de Software', exact: true });
    await expect(educationHeading).toBeVisible();
    await expect(page.getByText('Faculdade SENAI FATESG')).toBeVisible();

    // Categorized domains in stack section
    const stackSection = page.getByLabel('Stack e Tecnologias');
    await expect(stackSection.getByRole('heading', { name: 'Backend', exact: true })).toBeVisible();
    await expect(stackSection.getByRole('heading', { name: 'Frontend', exact: true })).toBeVisible();
    await expect(stackSection.getByRole('heading', { name: 'Banco de Dados', exact: true })).toBeVisible();
    await expect(stackSection.getByRole('heading', { name: 'Quality Engineering', exact: true })).toBeVisible();
    await expect(stackSection.getByRole('heading', { name: 'Segurança', exact: true })).toBeVisible();

    // Contact with corrected email
    await expect(page.getByRole('heading', { name: 'Vamos conversar?' })).toBeVisible();
    await expect(page.getByText('fragadavi30@gmail.com').first()).toBeVisible();
  });

  test('Can navigate to Case Study page and view deep architectural breakdown', async ({ page }) => {
    await page.goto('/projects/gestao-lgnd');

    await expect(page.locator('h1')).toContainText('Gestão LGND — Central da Manada');
    await expect(page.getByRole('heading', { name: 'Contexto de Negócio' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Problema & Gargalos' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Solução de Engenharia' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Visão Geral & Fluxo de Execução' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Frontend Next.js' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Core API NestJS' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Por que estas escolhas foram tomadas?' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Desafios Técnicos Enfrentados & Soluções' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Segurança', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Testes & Qualidade' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Resultados & Impacto' })).toBeVisible();

    // Next project link should work
    const nextBtn = page.getByRole('link', { name: /Próximo Projeto/i });
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();
    await expect(page).toHaveURL(/\/projects\//);
  });

  test('Redmine Consolidador case study has NO GitHub button', async ({ page }) => {
    await page.goto('/projects/redmine-consolidador');

    await expect(page.locator('h1')).toContainText('Consolidador Redmine');
    await expect(page.getByText('GetCoders — Estágio em Desenvolvimento Web').first()).toBeVisible();
    await expect(page.getByText('Java 17').first()).toBeVisible();
    await expect(page.getByText('Spring Boot').first()).toBeVisible();

    // Ensure no GitHub link is present on Redmine page
    await expect(page.getByRole('link', { name: /Ver Repositório no GitHub/i })).not.toBeVisible();
  });

  test('Last project case study navigates back to Home instead of loop', async ({ page }) => {
    await page.goto('/projects/landing-flamengo');

    const returnBtn = page.getByRole('link', { name: /Voltar para a Página Inicial/i });
    await expect(returnBtn).toBeVisible();
    await returnBtn.click();
    await expect(page).toHaveURL(/#projetos/);
  });

  test('Clicking logo in navbar scrolls smoothly back to top of page', async ({ page }) => {
    await page.goto('/');

    // Scroll down to contact section
    await page.locator('#contato').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const scrollYAfterScroll = await page.evaluate(() => window.scrollY);
    expect(scrollYAfterScroll).toBeGreaterThan(500);

    // Click brand logo in navbar
    const brandLogo = page.getByLabel('Davi Fraga - Voltar ao topo');
    await expect(brandLogo).toBeVisible();
    await brandLogo.click();

    // Wait for scroll animation to reach top
    await page.waitForFunction(() => window.scrollY === 0, { timeout: 3000 });
    const finalScrollY = await page.evaluate(() => window.scrollY);
    expect(finalScrollY).toBe(0);
  });
});
