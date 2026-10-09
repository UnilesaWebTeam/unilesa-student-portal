/* ==========================================================================
   COMPONENT: <unilesa-mobile-nav>
   ========================================================================== */

class UnilesaMobileNav extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['active'];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const active = this.getAttribute('active') || 'dashboard';

    this.innerHTML = `
      <nav class="mobile-bottom-nav" aria-label="Mobile Navigation">
        <a href="dashboard.html" class="mobile-nav-tab ${active === 'dashboard' ? 'active' : ''}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          <span>Home</span>
        </a>
        <a href="announcements.html" class="mobile-nav-tab ${active === 'announcements' || active === 'news' ? 'active' : ''}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          <span>News</span>
        </a>
        <a href="exam-timetable.html" class="mobile-nav-tab ${active === 'timetable' ? 'active' : ''}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          <span>Exams</span>
        </a>
        <a href="payments.html" class="mobile-nav-tab ${active === 'payments' ? 'active' : ''}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
          <span>Fees</span>
        </a>
        <a href="profile.html" class="mobile-nav-tab ${active === 'profile' ? 'active' : ''}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span>Profile</span>
        </a>
      </nav>
    `;
  }
}

customElements.define('unilesa-mobile-nav', UnilesaMobileNav);
