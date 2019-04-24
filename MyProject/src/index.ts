import "reflect-metadata";
import { createConnection } from "typeorm";
import { t_applet_user as User } from "./entity/User";
import { t_applet_order as Order } from "./entity/Order";
import { t_applet_project_products as PP } from "./entity/PP";
var iconv = require("iconv-lite");
createConnection()
  .then(async connection => {
    let users = await connection
      .getRepository(User)
      .createQueryBuilder("user")
      //   .select("id").getRawMany();
      .getMany();
    let orders = await connection
      .getRepository(Order)
      .createQueryBuilder("order")
      .select("DISTINCT *")
      .where(
        "date(order.SERVICE_END_TIME) between '2019-03-01' and '2019-03-31' and (order.TRADESTATE = :state1 OR order.TRADESTATE = :state2 OR order.TRADESTATE = :state3 OR order.TRADESTATE = :state4)",
        {
          state1: "WAITSERVICE",
          state2: "SERVICE",
          state3: "ASSESS",
          state4: "FINISH"
        }
      )
      .getRawMany();
    let pp = await connection
      .getRepository(PP)
      .createQueryBuilder("pp")
      .getMany();
    function getUserMap(RECOMMEND_LOGIN_NAME, id) {
      for (let i = 0; i < users.length; i++) {
        const user2 = users[i];
        if (user2.LOGIN_NAME === RECOMMEND_LOGIN_NAME) {
          if (user2.RECOMMEND_LOGIN_NAME === null) {
            if (!userMap[user2.id]) {
              userMap[user2.id] = [];
              userMap[user2.id].NICK_NAME = user2.NICK_NAME;
            }
            userMap[user2.id].push(id);
          } else {
            return getUserMap(user2.RECOMMEND_LOGIN_NAME, id);
          }
          break;
        }
      }
    }
    const userMap = {};
    const userProduct = {};
    const product = {};
    let productList = pp.map(ppp => {
      if (!product[ppp.PROJECT_ID]) product[ppp.PROJECT_ID] = {};
      product[ppp.PROJECT_ID][ppp.PRODUCT_NAME] = {
        DOSAGE: ppp.DOSAGE,
        UNIT: ppp.UNIT,
        COST: ppp.COST
      };
      return ppp.PRODUCT_NAME;
    });
    let productList2 = pp.map(ppp => ppp.PRODUCT_NAME + "(" + ppp.UNIT + ")");
    productList = Array.from(new Set(productList));
    productList2 = Array.from(new Set(productList));
    orders.map(order => {
      if (!userProduct[order.USER_ID]) userProduct[order.USER_ID] = {};
      userProduct[order.USER_ID].sum =
        1 + (userProduct[order.USER_ID].sum || 0);
      for (const productName in product[order.PROJECT_ID]) {
        if (product[order.PROJECT_ID].hasOwnProperty(productName)) {
          const element = product[order.PROJECT_ID][productName];
          userProduct[order.USER_ID][productName] =
            +element.DOSAGE + (userProduct[order.USER_ID][productName] || 0);
        }
      }
    });
    users.map(user => {
      if (user.RECOMMEND_LOGIN_NAME === null) {
        if (!userMap[user.id]) {
          userMap[user.id] = [];
          userMap[user.id].NICK_NAME = user.NICK_NAME;
          userMap[user.id].LOGIN_NAME = user.LOGIN_NAME;
          userMap[user.id].LOGIN_NAME = user.LOGIN_NAME;
        }
      } else {
        getUserMap(user.RECOMMEND_LOGIN_NAME, user.id);
      }
    });

    // console.log("*********************项目消耗产品信息", product);
    // console.log("*********************用户所有订单的各产品总消耗", userProduct);
    // console.log("*********************股东用户关系", userMap);

    let result = ",手机号,单数," + productList2.join() + "\n";
    for (const key in userMap) {
      if (userMap.hasOwnProperty(key)) {
        const cost = [];
        cost.push(userMap[key].NICK_NAME);
        cost.push(userMap[key].LOGIN_NAME);
        cost.push(0);
        userProduct[key] && (cost["orderSum"] = userProduct[key].sum);
        for (const product of productList) {
          if (userProduct[key] && userProduct[key][product]) {
            cost.push(userProduct[key][product]);
          } else cost.push(0);
        }
        for (const LOGIN_NAME of userMap[key]) {
          if (userProduct[LOGIN_NAME])
            cost["orderSum"] =
              userProduct[LOGIN_NAME].sum + (cost["orderSum"] || 0);
          for (let i = 0; i < productList.length; i++) {
            if (
              userProduct[LOGIN_NAME] &&
              userProduct[LOGIN_NAME][productList[i]]
            ) {
              cost[i + 3] =
                userProduct[LOGIN_NAME][productList[i]] + (cost[i + 3] || 0);
            }
          }
        }
        if (cost.filter(n => n).length > 2) {
          cost[2] = cost["orderSum"];
          result += cost.join() + "\r\n";
        }
      }
    }
    require("fs").writeFile(
      __dirname + "/统计.csv",
      iconv.encode(result, "gbk"),
      function(err) {
        if (err) throw err;
        console.log("ok");
      }
    );
  })
  .catch(error => console.log(error));
