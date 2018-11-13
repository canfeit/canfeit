const { spawn, execFile, exec } = require("child_process");
const args = ["-lc", "env"];

const ls = spawn("/bin/bash", args);
ls.stdout.on("data", data => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on("data", data => {
  console.log(`stderr: ${data}`);
});
ls.on("error", err => {
  console.log("Failed to start subprocess.", err.message);
});

execFile("/bin/bash", args, (error, stdout, stderr) => {
  error && console.error(`error: ${error}`);
  stderr && console.log(`stderr: ${stderr}`);
  if (stdout) {
    const ret = {};
    for (const line of stdout.split("\n")) {
      const parts = line.split("=");
      ret[parts.shift()] = parts.join("=");
    }
    console.log(ret);
  }
});

exec('/bin/bash -lc "adb version"', (error, stdout, stderr) => {
  error && console.error(`error: ${error}`);
  stderr && console.log(`stderr: ${stderr}`);
  stdout && console.log(stdout);
});

if (process.platform !== "win32") {
  const { stdout } = spawnSync("/bin/bash", ["-lc", "env"]);
  if (stdout) {
    const ret = {};
    for (const line of stdout.toString().split("\n")) {
      const parts = line.split("=");
      ret[parts.shift()] = parts.join("=");
    }
    Object.assign(process.env, ret);
  }
}
