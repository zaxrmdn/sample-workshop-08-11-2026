# CV Portfolio — GitHub Actions CI/CD Workshop

Static CV website with CI/CD: linting, browser tests, security scan, build artifact, and GitHub Pages deployment. No VPS required.

## Tools
- HTMLHint: HTML linting
- ESLint: JavaScript linting
- Playwright: browser testing
- Trivy: vulnerability, misconfiguration, and secret scan
- GitHub Actions and GitHub Pages

## Run locally (Node.js 22+)
```bash
npm install
npx playwright install chromium
npm run lint
npm test
npm run build
npm run preview
```
Open http://127.0.0.1:4173.

## Pipeline
1. Lint: HTMLHint and ESLint.
2. Test: Playwright tests homepage, sections, theme toggle, footer year, and mobile menu.
3. Security: Trivy scans filesystem for HIGH/CRITICAL findings.
4. Build: packages production files into `dist`.
5. Artifact: uploads Pages artifact.
6. Deploy: deploys only on push to `main`, after all CI jobs pass.

Pull requests run CI but do not deploy.

## Enable GitHub Pages
1. Create a repository and push the project to branch `main`.
2. Open Settings → Pages.
3. Set Build and deployment Source to **GitHub Actions**.
4. Monitor the `CV Website CI/CD` workflow in Actions.
5. Open the URL shown by the `github-pages` environment after successful deployment.

## Optional manual approval
Open Settings → Environments → github-pages and add Required reviewers if this feature is available for the repository/plan. Creating an environment alone does not enforce approval.

## Workshop troubleshooting
- Add an unused variable to `script.js` to fail ESLint.
- Change a Playwright expectation to fail browser testing.
- Open a pull request and verify CI runs without deployment.
- Push to `main` after checks pass to trigger deployment.

Replace sample profile details in `index.html`; customize design in `style.css` and interactions in `script.js`.
