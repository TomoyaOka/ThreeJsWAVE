import * as THREE from "three";

export default class PlaneMesh {
  constructor() {
    this.Config = {
      width: window.innerWidth, // Canvasの幅
      height: window.innerHeight, // Canvasの高さ
      cameraZ: 100, // カメラのz座標
      dpr: 1.0, // device pixel ratio
      aspectRatio: 1.0, // 画面アスペクト比
    };

    this.segment = 100.0;
  }
  meshInit() {
    this.geometry = new THREE.PlaneGeometry(1, 0.5, this.segment, this.segment);
    this.texture = this.createTexture({
      text: "WAVE", // 描画したいテキスト
      fontSize: 1000, // フォントサイズ
    });

    // マテリアルの作成
    this.material = new THREE.RawShaderMaterial({
      uniforms: {
        texture: { value: this.texture },
        uTime: { value: 0.0 },
      },
      vertexShader: `
      precision mediump float;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      uniform float uTime;
      attribute vec3 position;
      attribute vec2 uv;
      varying vec2 vUv;

      float PI = 3.1415926535897932384626433832795;

      void main() {
        vUv = uv;
        vec3 pos = position;

        float offset = 3.0;
        float freq = 0.005;
        float amp = 0.2;

        pos.x = pos.x + sin(pos.y * offset + uTime * freq * PI ) * amp;
        pos.y = pos.y + sin(pos.x * offset + uTime * freq * PI ) * amp;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
      `,
      fragmentShader: `
      precision mediump float;
      uniform sampler2D texture;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        vec3 color = texture2D(texture, uv).rgb;
        gl_FragColor = vec4(color, 1.0);
      }

      `,
      transparent: true,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    return this.mesh;
  }

  loop() {
    this.mesh.material.uniforms.uTime.value++;
  }

  /**
   * 2D Canvasからテクスチャを作成する
   * @param {Object} options
   * @param {stirng} options.text 描画したい文字列
   * @param {number} options.fontSize フォントサイズ
   * @return {Object} テクスチャを返す。
   * @memberof Canvas
   */
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
    const height = options.fontSize * this.Config.dpr * 1.0; // 文字に合わせて高さを調整。ここの高さは任意で
    canvas.width = width;
    canvas.height = height;

    // 中央にテキストを描画
    ctx.fillStyle = "#000000";
    ctx.strokeStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width * 2, canvas.height * 2);

    ctx.font = `bold ${options.fontSize * this.Config.dpr}px '${fontFamily}'`;
    ctx.textBaseline = "hanging";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(options.text, -10, 200); // 文字が途切れないように調整。数値はよしなに

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
