const dataJson = JSON.parse(request.data.toString());
delete dataJson.arguments;
delete dataJson.sign;
const keys = Object.keys(dataJson).sort();
const dataArray = [];
for (const key of keys) {
  if (dataJson[key] === "") {
    continue;
  }
  if (key === "pwd" || key === "password") {
    const pwd = CryptoJS.MD5(dataJson[key]).toString();
    dataJson[key] = pwd;
    dataArray.push(key + "=" + pwd);
    continue;
  }
  dataArray.push(key + "=" + dataJson[key]);
}
dataArray.push("key=E02353AF68EBE70D507EB8BF362460B5");
const sign = CryptoJS.MD5(dataArray.join("&")).toString();
dataJson.sign = sign;
pm.environment.set("sign", sign);
pm.environment.set(
  "arguments",
  CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(JSON.stringify(dataJson)),
    CryptoJS.enc.Utf8.parse("2017082817430823"),
    {
      iv: CryptoJS.enc.Utf8.parse("3280347182807102"),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }
  ).toString()
);
