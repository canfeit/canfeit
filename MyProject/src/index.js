// import "reflect-metadata";
// import { createConnection } from "typeorm";
// import { t_applet_user as User } from "./entity/User";
// import { t_applet_order as Order } from "./entity/Order";
// import { t_applet_project_products as PP } from "./entity/PP";
// var iconv = require("iconv-lite");
// createConnection()
//   .then(async connection => {
//     let pp = await connection
//       .getRepository(PP)
//       .createQueryBuilder("pp")
//       .getMany();
//     const product = {};
//     let productList = pp.map(ppp => {
//       if (!product[ppp.PROJECT_ID]) product[ppp.PROJECT_ID] = {};
//       product[ppp.PROJECT_ID][ppp.PRODUCT_NAME] = {
//         DOSAGE: ppp.DOSAGE,
//         UNIT: ppp.UNIT,
//         COST: ppp.COST
//       };
//       return ppp.PRODUCT_NAME;
//     });
//     let productList2 = pp.map(ppp => ppp.PRODUCT_NAME + "(" + ppp.UNIT + ")");
//     productList = Array.from(new Set(productList));
//     productList2 = Array.from(new Set(productList));
const product = {
  "1": {
    //精致V脸
    洁手晶露: { DOSAGE: "0.5", UNIT: "g", COST: "26" },
    玫瑰精油: { DOSAGE: "3", UNIT: "滴", COST: "450" },
    舒压: { DOSAGE: "0", UNIT: "ml", COST: "0" },
    凝韵轻柔卸妆乳: { DOSAGE: "2", UNIT: "ml", COST: "160" },
    柔润洁面乳: { DOSAGE: "2", UNIT: "ml", COST: "166" },
    洁肤霸: { DOSAGE: "0.5", UNIT: "g", COST: "49" },
    N喷: { DOSAGE: "1", UNIT: "ml", COST: "100" },
    "紧致凝胶+修身美颜SPA机（波浪头）": {
      DOSAGE: "4",
      UNIT: "ml",
      COST: "736"
    },
    "紧致凝胶+Body Spa机(提升）": { DOSAGE: "4", UNIT: "ml", COST: "736" },
    芦荟啫喱: { DOSAGE: "3", UNIT: "ml", COST: "360" },
    滋润喷雾: { DOSAGE: "1", UNIT: "ml", COST: "40" },
    活水面膜: { DOSAGE: "5", UNIT: "ml", COST: "900" },
    眼霜: { DOSAGE: "0.3", UNIT: "ml", COST: "600" },
    "湿凝霜 ": { DOSAGE: "1.5", UNIT: "g", COST: "620" }
  },
  "2": {
    //水颜活泉
    洁手晶露: { DOSAGE: "0.5", UNIT: "g", COST: "26" },
    玫瑰精油: { DOSAGE: "3", UNIT: "滴", COST: "450" },
    舒压放松: { DOSAGE: "0", UNIT: "ml", COST: "0" },
    凝韵轻柔卸妆乳: { DOSAGE: "2", UNIT: "ml", COST: "160" },
    柔润洁面乳: { DOSAGE: "2", UNIT: "ml", COST: "166" },
    洁肤霸: { DOSAGE: "0.5", UNIT: "克", COST: "49" },
    N喷: { DOSAGE: "1", UNIT: "ml", COST: "100" },
    轻柔磨砂膏: { DOSAGE: "2", UNIT: "ml", COST: "264" },
    "敷面膏（头部按摩）": { DOSAGE: "5", UNIT: "ml", COST: "760" },
    "净化凝露（小白）": { DOSAGE: "4", UNIT: "ml", COST: "3500" },
    "舒活凝露（小蓝）": { DOSAGE: "4", UNIT: "ml", COST: "3500" },
    芦荟啫喱: { DOSAGE: "3", UNIT: "ml", COST: "40" },
    滋润喷雾: { DOSAGE: "1", UNIT: "ml", COST: "360" },
    "活水面膜（头部按摩+肩颈按摩）": {
      DOSAGE: "5",
      UNIT: "ml",
      COST: "900"
    },
    眼霜: { DOSAGE: "0.3", UNIT: "ml", COST: "600" },
    湿凝霜: { DOSAGE: "1.5", UNIT: "克", COST: "620" }
  },
  "3": {
    //紧致润透
    洁手晶露: { DOSAGE: "0.5", UNIT: "ML", COST: "26" },
    玫瑰精油: { DOSAGE: "1", UNIT: "滴", COST: "150" },
    舒压: { DOSAGE: "0", UNIT: "ML", COST: "0" },
    凝韵轻柔卸妆乳: { DOSAGE: "2", UNIT: "ML", COST: "160" },
    柔润洁面乳: { DOSAGE: "2", UNIT: "ML", COST: "166" },
    洁肤霸: { DOSAGE: "0.5", UNIT: "G", COST: "49" },
    N喷: { DOSAGE: "1", UNIT: "ML", COST: "100" },
    轻柔磨砂膏: { DOSAGE: "2", UNIT: "ML", COST: "264" },
    敷面膏: { DOSAGE: "5", UNIT: "ML", COST: "760" },
    "紧致凝胶+修身美颜SPA机": { DOSAGE: "4", UNIT: "ML", COST: "736" },
    "净化凝露（白）": { DOSAGE: "4", UNIT: "ML", COST: "3500" },
    "舒活凝露（蓝）": { DOSAGE: "4", UNIT: "ML", COST: "3500" },
    芦荟啫喱: { DOSAGE: "3", UNIT: "ML", COST: "360" },
    滋润喷雾: { DOSAGE: "1", UNIT: "ML", COST: "40" },
    活水面膜: { DOSAGE: "8", UNIT: "ML", COST: "1440" },
    眼霜: { DOSAGE: "0.5", UNIT: "ML", COST: "1000" },
    "面霜 ": { DOSAGE: "1", UNIT: "G", COST: "358" }
  },
  "4": {
    //净透润白
    洁手晶露: { DOSAGE: "0.5", UNIT: "g", COST: "26" },
    玫瑰精油: { DOSAGE: "1", UNIT: "滴", COST: "150" },
    舒压: { DOSAGE: "0", UNIT: "ml", COST: "0" },
    凝韵轻柔卸妆乳: { DOSAGE: "2", UNIT: "ml", COST: "160" },
    柔润洁面乳: { DOSAGE: "3", UNIT: "ml", COST: "249" },
    洁肤霸: { DOSAGE: "0.5", UNIT: "g", COST: "49" },
    N喷: { DOSAGE: "1", UNIT: "ml", COST: "100" },
    轻柔磨砂膏: { DOSAGE: "2", UNIT: "ml", COST: "264" },
    "敷面膏（头部按摩）": { DOSAGE: "5", UNIT: "ml", COST: "760" },
    紧致凝胶: { DOSAGE: "4", UNIT: "ml", COST: "736" },
    柔润爽肤水: { DOSAGE: "1", UNIT: "ml", COST: "69" },
    "净化凝露（小白）": { DOSAGE: "4", UNIT: "ml", COST: "3500" },
    "舒活凝露(小蓝）": { DOSAGE: "4", UNIT: "ml", COST: "3500" },
    芦荟啫喱: { DOSAGE: "5", UNIT: "ml", COST: "600" },
    滋润喷雾: { DOSAGE: "3", UNIT: "ml", COST: "120" },
    "活水面膜（肩颈按摩）": { DOSAGE: "5", UNIT: "ml", COST: "900" },
    眼霜: { DOSAGE: "0.3", UNIT: "ml", COST: "600" },
    湿凝霜: { DOSAGE: "1.5", UNIT: "g", COST: "620" }
  },
  "5": {
    //明眸睛喜
    洁手晶露: { DOSAGE: "0.5", UNIT: "g", COST: "26" },
    玫瑰精油: { DOSAGE: "3", UNIT: "滴", COST: "450" },
    凝韵轻柔卸妆乳: { DOSAGE: "2", UNIT: "ml", COST: "160" },
    柔润洁面乳: { DOSAGE: "2", UNIT: "ml", COST: "166" },
    柔润爽肤水: { DOSAGE: "3", UNIT: "ml", COST: "208" },
    紧致凝胶: { DOSAGE: "2", UNIT: "ml", COST: "368" },
    舒纹精华露: { DOSAGE: "2", UNIT: "ml", COST: "2134" },
    眼霜: { DOSAGE: "0.5", UNIT: "ml", COST: "1000" },
    湿凝霜: { DOSAGE: "1", UNIT: "g", COST: "411" }
  },
  "6": {
    //全身SPA
    洁手晶露: { DOSAGE: "0.5", UNIT: "g", COST: "26" },
    玫瑰精油: { DOSAGE: "3", UNIT: "滴", COST: "450" },
    舒压: { DOSAGE: "0", UNIT: "", COST: "0" },
    "紧致凝胶+修身美颜SPA机（波浪头）": {
      DOSAGE: "100",
      UNIT: "ml",
      COST: "18400"
    },
    紧肤乳: { DOSAGE: "20", UNIT: "ml", COST: "3680" },
    热灸石: { DOSAGE: "", UNIT: "", COST: "0" }
  },
  "7": {
    //背部SPA
    洁手晶露: { DOSAGE: "0.5", UNIT: "g", COST: "26" },
    玫瑰精油: { DOSAGE: "3", UNIT: "滴", COST: "450" },
    舒压: { DOSAGE: "0", UNIT: "ml", COST: "0" },
    精致凝胶: { DOSAGE: "40", UNIT: "ml", COST: "7360" },
    紧肤乳: { DOSAGE: "3", UNIT: "ml", COST: "552" },
    热灸石: { DOSAGE: "0", UNIT: "", COST: "0" }
  },
  "8": {
    //豪华版肩颈SPA
    洁手晶露: { DOSAGE: "0.5", UNIT: "g", COST: "26" },
    玫瑰精油: { DOSAGE: "3", UNIT: "滴", COST: "450" },
    舒压: { DOSAGE: "0", UNIT: "ml", COST: "0" },
    紧致凝胶: { DOSAGE: "40", UNIT: "ml", COST: "8280" },
    紧肤乳: { DOSAGE: "2", UNIT: "ml", COST: "368" },
    热灸石: { DOSAGE: "0", UNIT: "", COST: "0" }
  },
  "9": {
    //肩颈SPA
    洁手晶露: { DOSAGE: "0.5", UNIT: "g", COST: "26" },
    玫瑰精油: { DOSAGE: "3", UNIT: "滴", COST: "450" },
    舒压: { DOSAGE: "0", UNIT: "ml", COST: "0" },
    紧致凝胶: { DOSAGE: "30", UNIT: "ml", COST: "5520" },
    紧肤乳: { DOSAGE: "2", UNIT: "ml", COST: "368" },
    热灸石: { DOSAGE: "0", UNIT: "", COST: "0" }
  },
  "10": {
    //手部SPA
    洁手晶露: { DOSAGE: "0.5", UNIT: "ML", COST: "26" },
    玫瑰精油: { DOSAGE: "3", UNIT: "滴", COST: "450" },
    舒压: { DOSAGE: "0", UNIT: "ml", COST: "0" },
    "紧致凝胶+美颜spa（正反面）": {
      DOSAGE: "40",
      UNIT: "ml",
      COST: "7360"
    },
    紧肤乳: { DOSAGE: "8", UNIT: "ml", COST: "1472" },
    热灸石: { DOSAGE: "0", UNIT: "", COST: "0" }
  },
  "11": {
    //腰腹SPA
    洁手晶露: { DOSAGE: "0.5", UNIT: "g", COST: "26" },
    玫瑰精油: { DOSAGE: "3", UNIT: "滴", COST: "450" },
    舒压: { DOSAGE: "0", UNIT: "ml", COST: "0" },
    "紧致凝胶+美颜spa（正反面）": {
      DOSAGE: "40",
      UNIT: "ml",
      COST: "7360"
    },
    紧肤乳: { DOSAGE: "6", UNIT: "ml", COST: "1104" },
    热灸石: { DOSAGE: "", UNIT: "", COST: "0" }
  },
  "12": {
    //腰部SPA
    洁手晶露: { DOSAGE: "0.5", UNIT: "g", COST: "26" },
    玫瑰精油: { DOSAGE: "3", UNIT: "滴", COST: "450" },
    舒压: { DOSAGE: "0", UNIT: "ml", COST: "0" },
    "紧致凝胶+美颜spa+美体spa": { DOSAGE: "25", UNIT: "ml", COST: "4600" },
    紧肤乳: { DOSAGE: "3", UNIT: "ml", COST: "5520" },
    热灸石: { DOSAGE: "", UNIT: "", COST: "0" }
  },
  "13": {
    //腿部SPA
    洁手晶露: { DOSAGE: "0.5", UNIT: "g", COST: "26" },
    玫瑰精油: { DOSAGE: "3", UNIT: "滴", COST: "450" },
    舒压: { DOSAGE: "0", UNIT: "ml", COST: "0" },
    "紧致凝胶+美颜spa（正反面）": {
      DOSAGE: "50",
      UNIT: "ml",
      COST: "9200"
    },
    紧肤乳: { DOSAGE: "8", UNIT: "ml", COST: "1472" },
    热灸石: { DOSAGE: "", UNIT: "", COST: "0" }
  }
};
// console.log("*********************项目消耗产品信息", product);
//  "1"//精致V脸 "2"//水颜活泉     "3" //紧致润透    "4"  //净透润白  "5"//明眸睛喜
// "6"//全身SPA  "7"//背部SPA  "8"//豪华版肩颈SPA
//  "9"//肩颈SPA  "10"//手部SPA  "11"//腰腹SPA  "12"//腰部SPA  "13"//腿部SPA

const input = { "1": 2 };
const data = {};
for (const i in input) {
  for (const k in product[i]) {
    data[k] = +product[i][k].DOSAGE * input[i] + (data[k] || 0);
  }
}
console.log(data);
// let result = ",手机号,单数," + productList2.join() + "\n";
// })
// .catch(error => console.log(error));
