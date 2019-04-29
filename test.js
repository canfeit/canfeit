var webdriver = require("selenium-webdriver"),
  By = webdriver.By,
  until = webdriver.until;

var driver = new webdriver.Builder().forBrowser("chrome").build();

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
(async () => {
  driver.get("http://119.61.21.187");
  driver.findElement(By.className("el-input__inner")).sendKeys("admin");
  //输入密码
  driver
    .findElement(
      By.xpath('//*[@id="app"]/div/div[1]/div/form/div[2]/div/div/input')
    )
    .sendKeys("admin");
  //点击登录按钮
  driver
    .findElement(By.xpath('//*[@id="app"]/div/div[1]/div/form/button'))
    .click();
  await sleep(6000);
  //点击报表table
  setTimeout(
    () => driver.findElement(By.xpath("//a[contains(text(),'报表')]")).click(),
    10000
  );
  await sleep(20000);
  //选择项目
  driver
    .findElement(
      By.xpath(
        '//*[@id="app"]/div/div/div[3]/div[1]/div[2]/div/div/div[2]/div/div[1]/div/div/button'
      )
    )
    .click();
  await sleep(10000);
  driver
    .findElement(By.xpath("//ul[@id='dropdown-menu-328']/div/li/label/span[2]"))
    .click();
})();
