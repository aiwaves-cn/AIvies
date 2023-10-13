<template>
  <div id="iviewBg">
    <slot></slot>
  </div>
</template>

<script>
import * as THREE from "three";
// import Stats from "./stats.module";
import { onMounted } from "vue";
export default {
  props: {
    //控制x轴波浪的长度
    amountX: {
      type: Number,
      default: 50,
    },
    //控制y轴波浪的长度
    amountY: {
      type: Number,
      default: 50,
    },
    //控制点颜色
    color: {
      type: String,
      default: "#6FADD6",
    },
    //控制波浪的位置
    top: {
      type: Number,
      default: 350,
    },
  },
  data () {
    return {
      SEPARATION: 100,
      container: "",
      camera: "",
      scene: "",
      renderer: "",
      particles: "",
      count: 0,
      mouseX: 0,
      windowHalfX: "",
    };
  },
  mounted () {
    this.windowHalfX = window.innerWidth / 2;
    this.init();
    this.animate();
  },
  methods: {
    init () {
      this.container = document.createElement("div");
      document.getElementById("iviewBg").appendChild(this.container);

      //创建透视相机
      this.camera = new THREE.PerspectiveCamera(
        75, //摄像机视锥体垂直视野角度
        window.innerWidth / window.innerHeight, //摄像机视锥体长宽比
        1, //摄像机视锥体近端面
        10000 //摄像机视锥体远端面
      );

      //设置相机z轴视野
      this.camera.position.z = 1000;

      //创建场景
      this.scene = new THREE.Scene();

      const numParticles = this.amountX * this.amountY;

      const positions = new Float32Array(numParticles * 3);
      const scales = new Float32Array(numParticles);

      let i = 0,
        j = 0;

      // 初始化粒子位置和大小
      for (let ix = 0; ix < this.amountX; ix++) {
        for (let iy = 0; iy < this.amountY; iy++) {
          positions[i] =
            ix * this.SEPARATION - (this.amountX * this.SEPARATION) / 2; // x
          positions[i + 1] = 0; // y
          positions[i + 2] =
            iy * this.SEPARATION - (this.amountY * this.SEPARATION) / 2; // z
          scales[j] = 1;
          i += 3;
          j++;
        }
      }

      //是面片、线或点几何体的有效表述。包括顶点位置，面片索引、法相量、颜色值、UV 坐标和自定义缓存属性值。使用 BufferGeometry 可以有效减少向 GPU 传输上述数据所需的开销
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

      //着色器材质(ShaderMaterial),设置球的大小，颜色，等
      const material = new THREE.ShaderMaterial({
        uniforms: {
          //设置球的颜色
          color: { value: new THREE.Color(this.color) },
        },
        //控制球的大小
        vertexShader:
          "attribute float scale; void main() {vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );gl_PointSize = scale * ( 300.0 / - mvPosition.z );gl_Position = projectionMatrix * mvPosition;}",
        fragmentShader:
          "uniform vec3 color;void main() {if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;gl_FragColor = vec4( color, 1.0 );}",
      });

      //一个用于显示点的类。
      this.particles = new THREE.Points(geometry, material);
      //往场景中添加点
      this.scene.add(this.particles);

      //alpha - canvas是否包含alpha (透明度)。默认为 false。
      //渲染器的背景色默认为黑色，设置渲染器的背景色为透明
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setClearAlpha(0);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.container.appendChild(this.renderer.domElement);

      //显示右上角fps框
      // stats = new Stats();
      //   container.appendChild(stats.dom);

      this.container.style.touchAction = "none";
      //监听鼠标移动事件
      // this.container.addEventListener("pointermove", this.onPointerMove);

      // //调整波浪的位置
      this.container.style.position = "relative";
      // this.container.style.top = `${this.top}px`;
      this.container.style.top = `${300}px`;

      window.addEventListener("resize", this.onWindowResize);
    },
    render () {
      this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05;
      this.camera.position.y = 400;
      this.camera.lookAt(this.scene.position);

      const positions = this.particles.geometry.attributes.position.array;
      const scales = this.particles.geometry.attributes.scale.array;

      // 设置粒子位置和大小
      let i = 0,
        j = 0;
      for (let ix = 0; ix < this.amountX; ix++) {
        for (let iy = 0; iy < this.amountY; iy++) {
          positions[i + 1] =
            Math.sin((ix + this.count) * 0.3) * 50 +
            Math.sin((iy + this.count) * 0.5) * 50;

          scales[j] =
            (Math.sin((ix + this.count) * 0.3) + 1) * 10 +
            (Math.sin((iy + this.count) * 0.5) + 1) * 10;

          i += 3;
          j++;
        }
      }

      this.particles.geometry.attributes.position.needsUpdate = true;
      this.particles.geometry.attributes.scale.needsUpdate = true;

      this.renderer.render(this.scene, this.camera);

      this.count += 0.05;
    },
    onWindowResize () {
      this.windowHalfX = window.innerWidth / 2;
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    onPointerMove (event) {
      if (event.isPrimary === false) return;
      this.mouseX = event.clientX - this.windowHalfX;
    },
    animate () {
      requestAnimationFrame(this.animate);
      this.render();
      //fps 实时更新
      // stats.update();
    },
  },
};
</script>

<style lang="scss" scoped>
#iviewBg {
  // background: url("../../assets/imgs/wavesBg.png") no-repeat;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
  display: flex;
}
</style>