"use client";

import { useEffect, useRef } from "react";

export default function ShaderBackground({
  intensity = 0.55,
  hue = 162,
}: { intensity?: number; hue?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const cfg = useRef({ intensity, hue });
  useEffect(() => { cfg.current = { intensity, hue }; }, [intensity, hue]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) return;

    const vsh = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`;
    const fsh = `
      precision highp float;
      uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse;
      uniform float uIntensity; uniform float uHue;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p){
        vec2 i = floor(p); vec2 f = fract(p);
        float a = hash(i), b = hash(i + vec2(1,0));
        float c = hash(i + vec2(0,1)), d = hash(i + vec2(1,1));
        vec2 u = f*f*(3.0-2.0*f);
        return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
      }
      float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.; a*=.5;} return v; }
      vec3 hsv2rgb(vec3 c){
        vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
        vec3 q = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(q - K.xxx, 0.0, 1.0), c.y);
      }
      void main(){
        vec2 uv = (gl_FragCoord.xy - .5*uRes) / uRes.y;
        vec2 m = (uMouse - .5*uRes) / uRes.y;
        float t = uTime * 0.05;
        vec2 q = uv * 1.4 + vec2(fbm(uv*2.+t), fbm(uv*2.-t))*0.6;
        float n = fbm(q + t*0.5);
        float dm = exp(-length(uv-m)*1.8) * 0.6;
        n += dm * 0.4;
        float hueN = mod(uHue + n*40.0, 360.0) / 360.0;
        vec3 c1 = hsv2rgb(vec3(hueN, 0.55, 0.5));
        vec3 c2 = hsv2rgb(vec3(mod(uHue+60.0,360.0)/360.0, 0.5, 0.6));
        vec3 col = mix(c1, c2, smoothstep(0.4, 0.8, n));
        col *= smoothstep(1.4, 0.2, length(uv));
        col *= uIntensity;
        col += (hash(gl_FragCoord.xy + uTime) - 0.5) * 0.02;
        gl_FragColor = vec4(col, 1.0);
      }
    `;
    const compile = (src: string, type: number) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src); gl.compileShader(sh);
      return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(vsh, gl.VERTEX_SHADER));
    gl.attachShader(prog, compile(fsh, gl.FRAGMENT_SHADER));
    gl.linkProgram(prog); gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uInt = gl.getUniformLocation(prog, "uIntensity");
    const uHue = gl.getUniformLocation(prog, "uHue");

    let mouse: [number, number] = [window.innerWidth/2, window.innerHeight/2];
    const onMove = (e: PointerEvent) => { mouse = [e.clientX, window.innerHeight - e.clientY]; };
    window.addEventListener("pointermove", onMove);

    const dpr = Math.min(1.4, window.devicePixelRatio || 1);
    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const start = performance.now();
    let raf = 0;
    const loop = () => {
      const t = (performance.now() - start) / 1000;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouse[0] * dpr, mouse[1] * dpr);
      gl.uniform1f(uInt, cfg.current.intensity);
      gl.uniform1f(uHue, cfg.current.hue);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="bg-canvas" />;
}
