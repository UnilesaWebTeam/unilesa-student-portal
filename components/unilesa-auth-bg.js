/* ==========================================================================
   COMPONENT: <unilesa-auth-bg>
   ========================================================================== */

class UnilesaAuthBg extends HTMLElement {
  connectedCallback() {
    this.render();
    this.initCanvas();
  }

  render() {
    this.innerHTML = `
      <div class="bg-mesh"></div>
      <div class="bg-grid"></div>
      <div class="blobs-wrapper">
        <div class="blob blob-gold"></div>
        <div class="blob blob-navy"></div>
        <div class="blob blob-indigo"></div>
        <div class="blob blob-amber"></div>
      </div>
      <canvas class="bg-canvas" id="authBgCanvas"></canvas>
    `;
  }

  initCanvas() {
    const canvas = this.querySelector('#authBgCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const count = 35;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    let animId;
    function animate() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(205, 164, 52, 0.4)';
      ctx.strokeStyle = 'rgba(205, 164, 52, 0.08)';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(205, 164, 52, ${p.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    }
    animate();

    this.disconnectedCallback = () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }
}

customElements.define('unilesa-auth-bg', UnilesaAuthBg);
