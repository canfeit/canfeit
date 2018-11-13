"use strict";
const fs = require("fs");
const path = require("path");
const asc = require("assemblyscript/cli/asc");
console.log("########################################");
console.log("wasm 编译 loader");
console.log("########################################");
module.exports = function loader() {
  const targetPath = path.join(
    require("os").tmpdir(),
    path.parse(this.resourcePath).name + ".wasm"
  );
  asc.main(
    [
      path.relative(process.cwd(), this.resourcePath),
      "-b",
      path.relative(process.cwd(), targetPath),
      "-O3z",
      "--validate",
      "--optimize",
      "--noDebug"
    ],
    err => {
      if (err) return this.async()(err);
      const asm = fs.readFileSync(targetPath);
      this.async()(
        null,
        `const buffer = new ArrayBuffer(${Buffer.from(asm).length});
        const uint8 = new Uint8Array(buffer);
        uint8.set([${Buffer.from(asm).join(",")}]);
        module.exports = new WebAssembly.Instance(new WebAssembly.Module(uint8), {}).exports;`
      );
    }
  );
};
