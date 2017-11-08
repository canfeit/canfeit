const fs = require('fs-extra')
const path = require('path')

const appPath = path.join('..', '..')
const templatePath = 'template'
const appPackage = fs.existsSync(path.join(appPath, 'package.json'))
  ? require(path.join(appPath, 'package.json'))
  : {
    "name": "canfeit",
    "version": "0.0.1",
    "description": "",
    "keywords": [],
    "author": "wangjianhui <wangjianhui@herebookstore.com> (https://github.com/canfeit/canfeit/blob/master/README.md)",
    "homepage": "https://github.com/canfeit/canfeit/blob/master/README.md",
    "repository": {
      "type": "git",
      "url": "https://github.com/canfeit/canfeit.git"
    },
    "license": "MIT",
    "bugs": {
      "url": "https://github.com/canfeit/canfeit/issues"
    },
  }

appPackage.scripts = appPackage.scripts || {}
appPackage.scripts.release = appPackage.scripts.release || 'standard-version&&yarn doc'
appPackage.scripts.push = appPackage.scripts.push || 'git push --follow-tags&&npm publish'
appPackage.scripts.doc = appPackage.scripts.doc || 'typedoc --out docs --mode file --theme minimal --readme none'
appPackage.scripts.install = appPackage.scripts.install || 'yarn global upgrade-interactive --latest&yarn upgradeInteractive --latest'
appPackage.scripts.commitmsg = appPackage.scripts.commitmsg || 'commitlint -e'
appPackage.scripts.postinstall = appPackage.scripts.postinstall || "node -e console.log('#'.repeat(80)+'\\n\\n','docs:'+process.env.npm_package_homepage,'\\n\\n'+'#'.repeat(80))"
if (!appPackage.commitlint) {
  appPackage.commitlint = {
    'extends': [
      '@commitlint/config-angular'
    ]
  }
}
if (!appPackage.standard) {
  appPackage.standard = {
    'parser': 'typescript-eslint-parser',
    'plugins': [
      'typescript'
    ]
  }
}

fs.writeFileSync(
  path.join(appPath, 'package.json'),
  JSON.stringify(appPackage, null, 2)
)

if (fs.existsSync(templatePath)) {
  fs.copySync(templatePath, appPath)
}
