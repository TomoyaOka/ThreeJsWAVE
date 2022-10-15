/*-------------------------------------------------------------------------------------
* ■ Reference
* https://qiita.com/mtoutside/items/b1e6adb8ca60c14a8ee4
--------------------------------------------------------------------------------------*/

import * as THREE from "three";
import PlaneMesh from "./init/mesh";
import { gsap } from "gsap";

export default class Canvas {
  constructor() {
    this.container = document.querySelector("#CanvasContainer");
    this.planeMesh = new PlaneMesh();
    this.Config = {
      width: window.innerWidth, // Canvasの幅
      height: window.innerHeight, // Canvasの高さ
      cameraZ: 1, // カメラのz座標
      dpr: 1, // device pixel ratio
      aspectRatio: 1.0, // 画面アスペクト比
    };
    this._resize = this._resize.bind(this);
    this._render = this._render.bind(this);
  }

  init() {
    this._renderer();
    this._scene();
    this._camera();
    this._mesh();
    this._render();
    window.addEventListener("resize", this._resize);
  }

  _renderer() {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.renderer.setClearColor(0x000000);
    this.renderer.setSize(this.Config.width, this.Config.height);
    this.renderer.setPixelRatio(this.Config.dpr);
    this.container.appendChild(this.renderer.domElement);
  }

  _scene() {
    this.scene = new THREE.Scene();
  }

  _camera() {
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1);
  }

  _mesh() {
    const mesh = this.planeMesh.meshInit();
    this.scene.add(mesh);
  }

  setConfig() {
    this.Config = {
      width: window.innerWidth, // Canvasの幅
      height: window.innerHeight, // Canvasの高さ
      cameraZ: 1000, // カメラのz座標
      dpr: 1, // device pixel ratio
      aspectRatio: 1.0, // 画面アスペクト比
    };
    // 親要素のサイズを取得
    const domRect = this.container.getBoundingClientRect();
    const width = domRect.width;
    const height = domRect.height;

    this.Config.dpr = Math.min(window.devicePixelRatio, 2);
    this.Config.width = width;
    this.Config.height = height;
    this.Config.halfWidth = this.Config.width / 2;
    this.Config.halfHeight = this.Config.height / 2;
    this.Config.aspectRatio = this.Config.width / this.Config.height;
  }

  resizeScene() {
    this.renderer.setSize(this.Config.width, this.Config.height);
  }

  _resize() {
    this.setConfig();
    this.resizeScene();
  }

  _render() {
    requestAnimationFrame(this._render);
    this.planeMesh.loop();
    this.renderer.render(this.scene, this.camera);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const newCanvas = new Canvas();
  newCanvas.init();
});
export {};
