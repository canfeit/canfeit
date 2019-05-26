const cras = [
  {
    name: "孙琛丽",
    nickName: "孙琛丽",
    loginName: "15143000080",
    idCard: "450101198701011143",
    avatarPhoto:
      "http://119.61.21.185:15036/craftsman/head/221e54d0-4c6d-4553-bd39-fba5d93c489d.png",
    detail: "123"
  },
  {
    name: "赵玉瑾",
    nickName: "赵玉瑾",
    loginName: "13155000070",
    idCard: "450101198701016200",
    avatarPhoto:
      "http://119.61.21.185:15036/craftsman/head/ba900d4b-c152-4bbb-8b36-242bbbec8de1.png",
    detail: "123"
  },
  {
    name: "李冷雁",
    nickName: "李冷雁",
    loginName: "15153370600",
    idCard: "450101198701010845",
    avatarPhoto:
      "http://119.61.21.185:15036/craftsman/head/8bb61e22-653c-463b-becd-6120629420be.png",
    detail: "123"
  },
  {
    name: "杨傲霜",
    nickName: "杨傲霜",
    loginName: "17053002158",
    idCard: "450101198701018345",
    avatarPhoto:
      "http://119.61.21.185:15036/craftsman/head/6ffb5a54-b572-4116-80ea-d062a39ade70.png",
    detail: "123"
  },
  {
    name: "孙雄英",
    nickName: "孙雄英",
    loginName: "15588005700",
    idCard: "450101198701017465",
    avatarPhoto:
      "http://119.61.21.185:15036/craftsman/head/aab88c13-09a8-4a67-812d-5795ece8a1dc.jpg",
    detail: "123"
  },
  {
    name: "赵新梅",
    nickName: "赵新梅",
    loginName: "15806660400",
    idCard: "130101199201018146",
    avatarPhoto:
      "http://119.61.21.185:15036/craftsman/head/ad2005c7-1cdd-4816-b459-02210a165eac.jpg",
    detail: "123"
  }
];
pm.test("response is ok", function() {
  const sign = dataJson => {
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
    dataJson.arguments = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(JSON.stringify(dataJson)),
      CryptoJS.enc.Utf8.parse("2017082817430823"),
      {
        iv: CryptoJS.enc.Utf8.parse("3280347182807102"),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    ).toString();
    return dataJson;
  };
  pm.response.to.have.status(200);
  pm.sendRequest(
    {
      url: "http://119.61.21.185:15036/platform/subshop/getList.do",
      method: "POST",
      body: {
        mode: "raw",
        raw: JSON.stringify({
          pageNo: 0,
          sign: "9c3cf3f37dd7468be2980907acd8fefc",
          arguments:
            "tcRPMv82esxqBIwPxpSobY9D2/DQBY7V5IDImKDV3rKFBEO8WXmzUJ1IMSVhqznNJSVAAUEl+fNNM2tNHW4WCQ=="
        })
      }
    },
    function(err, res) {
      let shop;
      const shopName = JSON.parse(request.data)["name"];
      console.log(shopName);
      if (!err)
        for (shop of res.json().result) {
          if (shop.name === shopName) break;
        }
      for (const cra of cras) {
        pm.sendRequest({
          url: "http://119.61.21.185:15036/platform/craftsman/addCraftman.do",
          method: "POST",
          body: {
            mode: "raw",
            raw: JSON.stringify(
              sign(
                Object.assign(
                  {
                    sex: "0",
                    age: "20",
                    storeName: shop.name,
                    storeCode: shop.storeCode,
                    city: "156220100",
                    cityName: "长春市",
                    idZ:
                      "http://119.61.21.185:15036/craftsman/head/e16576a7-df2a-4804-902e-f104cb989051.jpg",
                    idF:
                      "http://119.61.21.185:15036/craftsman/idCard/a38d4412-5b24-406a-bf5f-be112d7f5bc0.jpg",
                    group: 3
                  },
                  cra
                )
              )
            )
          }
        });
      }
    }
  );
});
