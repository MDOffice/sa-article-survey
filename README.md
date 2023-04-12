# SA-Article-Survey &middot; ![npm](https://img.shields.io/npm/v/@mdoffice/sa-filter) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/MDOffice/SA-Filter)

UI component for article grading

Installation
-----------
```bash
npm install @mdoffice/sa-article-survey
```

Publish (auto)
-----------
```bash
npm version patch
git push origin
git push --tags
```
 - [Make release with last tag](https://github.com/MDOffice/sa-article-survey/releases/new)
 - [Wait to finish build and publish](https://github.com/MDOffice/sa-article-survey/actions)


Publish (manual)
-----------
```bash
npm ci
npm run build
npm version patch
git push origin
git push --tags
npm adduser --registry=https://registry.npmjs.org //if first
npm publish
```
