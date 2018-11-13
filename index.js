import React, { Component } from "react";
import { Button } from "antd";
import { BannerParser } from "minicap";

import { ipcRenderer } from "electron";
export default class extends Component {
  onMouseDown(evt) {
    this.isPressing = true;
    const width = Math.round(
      evt.clientX * this.ratio * (this.touchSize[2] / this.banner.realWidth)
    );
    const height = Math.round(
      evt.clientY * this.ratio * (this.touchSize[3] / this.banner.realHeight)
    );
    this.minitouch.write(
      // `d 0 ${evt.nativeEvent.offsetX * 2} ${evt.nativeEvent.offsetY * 2} 50\n` d 触控点个数 x y 压力值
      `d 0 ${width} ${height} 50\n`
    );
    this.minitouch.write("c\n");
  }
  onMouseUp(evt) {
    this.isPressing = false;
    this.minitouch.write("u 0\n");
    this.minitouch.write("c\n");
  }
  info() {
    const windowTitleHeight = window.screen.availHeight - window.innerHeight;
    this.canvasHeight =
      window.screen.availHeight - windowTitleHeight - this.footer.scrollHeight;
    console.log("send height", this.footer.scrollHeight, this.canvasHeight);
    ipcRenderer.send("canvasHeight", this.canvasHeight);
    this.setState({
      canvasHeight: this.canvasHeight
    });
    //test log
    ipcRenderer.once("deviceWinShowed", (_, { width, height }) => {
      console.log("屏幕分辨率", {
        width: window.screen.width,
        height: window.screen.height
      });
      console.log("屏幕内容区（去掉win任务栏/mac菜单栏）", {
        width: window.screen.availWidth,
        height: window.screen.availHeight
      });
      console.log("设备窗口内容区(除去菜单栏、工具栏等)=body.client+滚动条", {
        width: window.innerWidth,
        height: window.innerHeight
      });
      console.log("设备窗口屏幕大小", {
        width: this.canvas.getBoundingClientRect().width,
        height: this.canvas.getBoundingClientRect().height
      });
      console.log("设备屏幕压缩比例(实际)", {
        width: width / this.canvas.getBoundingClientRect().width,
        height: height / this.canvas.getBoundingClientRect().height
      });
      console.log(
        "win标题栏/mac红绿灯高度(屏幕内容区高度-最大化浏览器内容区高度)",
        window.screen.availHeight - window.innerHeight
      );
      console.log("底部按钮高度", this.footer.scrollHeight);
      console.log("body.client，内容＋内边距+边框(height + padding+border)", {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      });
      console.log("body.offset，内容＋内边距(height + padding)+溢出部分", {
        width: document.body.offsetWidth,
        height: document.body.offsetHeight
      });
      console.log("body.scroll，offset+border", {
        width: document.body.scrollWidth,
        height: document.body.scrollHeight
      });
    });
  }
  componentDidMount() {
    import { f } from "../assembly/sample.js";
    console.log("wasm start", f(10));
    this.minitouch = require("net").connect({ port: 1718 });
    this.minicap = require("net").connect({ port: 1717 });
    this.info();
    let data = [];
    const g = this.canvas.getContext("2d");
    this.minicap.on("data", chunk => {
      // @ts-ignore
      data.push(...chunk);
      if (this.banner === null) {
        const parser = new BannerParser();
        parser.parse(data.splice(0, 24));
        this.banner = parser.take();
        console.log("minicapSize", this.banner);
        this.ratio = this.banner.realHeight / this.canvasHeight;
      } else {
        const arr = data.slice(0, 4);
        const size =
          (arr[3] << 24) | (arr[2] << 16) | (arr[1] << 8) | (arr[0] << 0);
        if (data.length >= size + 4) {
          const chunk = data.slice(4, 4 + size);
          const img = new Image();
          img.onload = () => {
            this.canvas.width = img.width;
            this.canvas.height = img.height;
            g.drawImage(img, 0, 0);
          };
          img.src =
            "data:image/png;base64," + Buffer.from(chunk).toString("base64");
          data = data.slice(4 + size);
        }
      }
    });
    this.minitouch.on("data", chunk => {
      this.touchSize = chunk
        .toString()
        .split("^")[1]
        .split(" ");
    });
  }

  render() {
    return (
      <div>
        <div
          onMouseDown={this.onMouseDown.bind(this)}
          onMouseUp={this.onMouseUp.bind(this)}
          onMouseOut={() => (this.isPressing = false)}
        >
          <canvas ref={canvas => (this.canvas = canvas)} />
        </div>
        <div ref={footer => (this.footer = footer)}>
          <Button
            shape="circle"
            type="primary"
            onClick={() => {
              client.shell(this.props.device, 'input keyevent "KEYCODE_MENU"');
            }}
          >
            menu
          </Button>
          <Button
            shape="circle"
            type="primary"
            onClick={() =>
              client.shell(this.props.device, 'input keyevent "KEYCODE_HOME"')
            }
          >
            home
          </Button>
          <Button
            shape="circle"
            type="primary"
            onClick={() =>
              client.shell(this.props.device, 'input keyevent "KEYCODE_BACK"')
            }
          >
            back
          </Button>
        </div>
      </div>
    );
  }
}
