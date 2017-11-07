const fs = require('fs-extra');
const path = require('path');
const spawn = require('cross-spawn');

const appPath = path.join('..', '..')
const templatePath = 'template';
const appPackage = require(path.join(appPath, 'package.json'));
console.log('your current package.json',appPackage)
appPackage.scripts = appPackage.scripts || {}
appPackage.scripts.release = appPackage.scripts.release || "standard-version&&yarn doc";
appPackage.scripts.push = appPackage.scripts.push || "git push --follow-tags&&npm publish";
appPackage.scripts.doc = appPackage.scripts.doc || "typedoc --out docs --mode file --theme minimal --readme none";
appPackage.scripts.install = appPackage.scripts.install || "yarn global upgrade-interactive --latest&yarn upgradeInteractive --latest";
appPackage.scripts.commitmsg = appPackage.scripts.commitmsg || "commitlint -e";
if (!appPackage.commitlint) {
    appPackage.commitlint = {
        "extends": [
            "@commitlint/config-angular"
        ]
    }
}
if (!appPackage.standard) {
    appPackage.standard = {
        "parser": "typescript-eslint-parser",
        "plugins": [
            "typescript"
        ]
    }
}

fs.writeFileSync(
    path.join(appPath, 'package.json'),
    JSON.stringify(appPackage, null, 2)
);

if (fs.existsSync(templatePath)) {
    fs.copySync(templatePath, appPath);
}

command = `cd ${appPath}&&yarn`;
args = [
    'add',
    "@commitlint/cli",
    "@commitlint/config-angular",
    "eslint-plugin-typescript",
    "husky",
    "standard",
    "standard-version",
    "typedoc",
    "typescript-eslint-parser",
    "typescript"
];
console.log(command)
const proc = spawn.sync(command, args, { stdio: 'inherit' });
if (proc.status !== 0) {
    console.error(`\`${command} ${args.join(' ')}\` failed`);
    return;
}
