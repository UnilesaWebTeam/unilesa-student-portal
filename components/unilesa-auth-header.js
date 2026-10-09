/* ==========================================================================
   COMPONENT: <unilesa-auth-header>
   ========================================================================== */

class UnilesaAuthHeader extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['step', 'total', 'step-label'];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const step = parseInt(this.getAttribute('step') || '0', 10);
    const total = parseInt(this.getAttribute('total') || '4', 10);
    const stepLabel = this.getAttribute('step-label') || (step > 0 ? `Step ${step} of ${total}` : '');
    const percent = step > 0 ? Math.min(100, Math.round((step / total) * 100)) : 0;

    this.innerHTML = `
      <div class="brand-row">
        <div class="brand-left">
          <div class="logo-badge">
            <img src="https://unilesa.edu.ng/static/frontpage/assets/img/icons/unilesa_origina.png" alt="UNILESA Logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
            <span class="fallback">UL</span>
          </div>
          <div class="word">
            UNILESA
            <span>Student Portal</span>
            <span class="motto">Excellence, Character &amp; Service</span>
          </div>
        </div>
        ${stepLabel ? `<div class="step-badge">${stepLabel}</div>` : ''}
      </div>

      ${step > 0 ? `
        <div class="progress-track">
          <div class="progress-fill" style="width: ${percent}%;"></div>
        </div>
        <div class="progress-labels">
          <span class="${step >= 1 ? (step === 1 ? 'current' : 'done') : ''}">1. Password</span>
          <span class="${step >= 2 ? (step === 2 ? 'current' : 'done') : ''}">2. Documents</span>
          <span class="${step >= 3 ? (step === 3 ? 'current' : 'done') : ''}">3. Review</span>
          <span class="${step >= 4 ? (step === 4 ? 'current' : 'done') : ''}">4. Complete</span>
        </div>
      ` : ''}
    `;
  }
}

customElements.define('unilesa-auth-header', UnilesaAuthHeader);
