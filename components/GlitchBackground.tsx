import React, { useEffect, useRef } from "react";

const GlitchBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // --- Configuration from user prompt ---
    const glitchColors = ['#2b4539', '#61dca3', '#61b3dc'];
    const glitchSpeed = 50; // ms between glitches
    const smooth = true; // Enable smooth color transitions
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789';
    const lettersAndSymbols = Array.from(characters);

    const fontSize = 16;
    const charWidth = 10;
    const charHeight = 20;

    // --- State variables ---
    let animationFrame: number;
    let letters: any[] = [];
    let grid = { columns: 0, rows: 0 };
    let lastGlitch = Date.now();

    // --- Helper functions ---
    const randChar = () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
    const randColor = () => glitchColors[Math.floor(Math.random() * glitchColors.length)];

    const hexToRgb = (hex: string) => {
        const s = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(s, (_m, r, g, b) => r + r + g + g + b + b);
        const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return m ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) } : null;
    };

    const interpolate = (start: {r:number,g:number,b:number}, end: {r:number,g:number,b:number}, f: number) => {
        const r = Math.round(start.r + (end.r - start.r) * f);
        const g = Math.round(start.g + (end.g - start.g) * f);
        const b = Math.round(start.b + (end.b - start.b) * f);
        return `rgb(${r},${g},${b})`;
    };

    const calcGrid = (w: number, h: number) => ({
        columns: Math.ceil(w / charWidth),
        rows: Math.ceil(h / charHeight)
    });
    
    // --- Core logic ---
    const initLetters = (cols: number, rows: number) => {
        grid = { columns: cols, rows };
        const total = cols * rows;
        // Initialize letters with properties needed for smooth transitions
        letters = Array.from({ length: total }, () => {
            const color = randColor();
            return {
                char: randChar(),
                color: color, // current display color
                startColorHex: color, // start of transition
                targetColor: color, // end of transition
                prog: 1 // progress (0 to 1)
            };
        });
    };
    
    const draw = () => {
        if (!ctx || !letters.length) return;
        const parent = canvas.parentElement;
        if (!parent) return;
        const r = parent.getBoundingClientRect();
        
        ctx.clearRect(0, 0, r.width, r.height);
        ctx.font = `${fontSize}px monospace`;
        ctx.textBaseline = 'top';
        letters.forEach((l, i) => {
            const x = (i % grid.columns) * charWidth;
            const y = Math.floor(i / grid.columns) * charHeight;
            ctx.fillStyle = l.color;
            ctx.fillText(l.char, x, y);
        });
    };

    const update = () => {
        if (!letters.length) return;
        const cnt = Math.max(1, Math.floor(letters.length * 0.05));
        for (let i = 0; i < cnt; i++) {
            const idx = Math.floor(Math.random() * letters.length);
            const l = letters[idx];
            l.char = randChar();

            if (smooth) {
              // Only start a new transition if the previous one is complete
              if (l.prog === 1) { 
                l.startColorHex = l.targetColor;
                l.targetColor = randColor();
                l.prog = 0;
              }
            } else {
              // For non-smooth, just snap to the new color
              l.targetColor = randColor();
              l.color = l.targetColor;
            }
        }
    };
    
    const smoothTransition = () => {
        let redraw = false;
        letters.forEach(l => {
            if (l.prog < 1) {
                l.prog = Math.min(l.prog + 0.05, 1);
                const s = hexToRgb(l.startColorHex);
                const e = hexToRgb(l.targetColor);
                if (s && e) {
                    l.color = interpolate(s, e, l.prog);
                    redraw = true;
                }
                if(l.prog === 1) {
                    l.color = l.targetColor; // Ensure it ends on the exact target color
                }
            }
        });
        if (redraw) draw();
    };

    const animate = () => {
        const now = Date.now();
        if (now - lastGlitch >= glitchSpeed) {
            update();
            lastGlitch = now;
        }
        
        if (smooth) {
          smoothTransition();
        } else {
          draw();
        }

        animationFrame = requestAnimationFrame(animate);
    };

    const resize = () => {
        const dpr = window.devicePixelRatio || 1;
        const parent = canvas.parentElement;
        if (!parent || !ctx) return;

        const r = parent.getBoundingClientRect();
        canvas.width = r.width * dpr;
        canvas.height = r.height * dpr;
        canvas.style.width = `${r.width}px`;
        canvas.style.height = `${r.height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        
        const { columns, rows } = calcGrid(r.width, r.height);
        initLetters(columns, rows);
        draw();
    };

    // --- Setup and Cleanup ---
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        cancelAnimationFrame(animationFrame);
        resize();
        animate();
      }, 100);
    };

    resize();
    animate();
    
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div id="glitch-container">
      <canvas ref={canvasRef} id="glitch-background" />
      <div id="outer-vignette" />
    </div>
  );
};

export default GlitchBackground;