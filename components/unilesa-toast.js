/* ==========================================================================
   COMPONENT: <unilesa-toast> & GLOBAL TOAST ENGINE
   ========================================================================== */

class UnilesaToast extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<div class="toast-container" id="toastContainer"></div>`;
  }
}

customElements.define('unilesa-toast', UnilesaToast);

// Global Toast Singleton API
const UniToast = (() => {
  function getContainer() {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  const icons = {
    success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    warning: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
    error: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
    info: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
  };

  function show(title, message, type = 'info', duration = 4000) {
    const container = getContainer();
    const item = document.createElement('div');
    item.className = `toast-item ${type}`;

    item.innerHTML = `
      <div class="toast-icon">
        ${icons[type] || icons.info}
      </div>
      <div class="toast-body">
        <div class="toast-title">${title}</div>
        ${message ? `<div class="toast-msg">${message}</div>` : ''}
      </div>
      <button type="button" style="background:none; border:none; color:var(--grey-400); cursor:pointer; padding:2px; display:flex;" aria-label="Dismiss">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    `;

    const closeBtn = item.querySelector('button');
    const dismiss = () => {
      item.classList.add('removing');
      setTimeout(() => {
        if (item.parentNode) item.parentNode.removeChild(item);
      }, 250);
    };

    if (closeBtn) closeBtn.addEventListener('click', dismiss);
    if (duration > 0) setTimeout(dismiss, duration);

    container.appendChild(item);
  }

  return { show };
})();

window.UniToast = UniToast;
