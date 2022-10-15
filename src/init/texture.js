import * as THREE from "three";

export default class Textures {
  /**
   * 2D Canvasからテクスチャを作成する
   * @param {Object} options
   * @param {stirng} options.text 描画したい文字列
   * @param {number} options.fontSize フォントサイズ
   * @return {Object} テクスチャを返す。
   * @memberof Canvas
   */

  constructor() {
    this.Config = {
      width: window.innerWidth, // Canvasの幅
      height: window.innerHeight, // Canvasの高さ
      cameraZ: 1000, // カメラのz座標
      dpr: 1, // device pixel ratio
      aspectRatio: 1.0, // 画面アスペクト比
    };
  }

  createTexture(options) {
    // Canvas要素を作成
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // measureTextするためいったん設定
    const fontFamily = "monospace";
    ctx.font = `bold ${options.fontSize * this.Config.dpr}px '${fontFamily}'`;
    const textWidth = ctx.measureText(options.text); // 文字の横幅を取得

    // dprに対応したサイズを計算
    const width = textWidth.width;
    const height = options.fontSize * this.Config.dpr * 0.8; // 文字に合わせて高さを調整。ここの高さは任意で
    // 幅を指定
    canvas.width = width;
    canvas.height = height;

    // 中央にテキストを描画
    ctx.font = `bold ${options.fontSize * this.Config.dpr}px '${fontFamily}'`;
    ctx.textAlign = "left";
    ctx.textBaseline = "hanging";
    ctx.fillStyle = "rgba(0, 0, 0, 1.0)";
    ctx.fillText(options.text, -5, 0); // 文字が途切れないように調整。数値はよしなに

    // ↓canvasの文字を確認したいとき。テキストを描画したcanvasをbodyに追加しているだけです。
    // document.body.appendChild(canvas);
    // canvas.style.backgroundColor = '#933';
    // canvas.style.position = 'relative';

    // テクスチャを作成
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = false;
    // ↓ここら辺の設定をしておかないとthree.jsでエラーが出る時がある
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBAFormat;

    return texture;
  }
}
