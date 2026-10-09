/* ==========================================================================
   COMPONENT: <unilesa-header>
   ========================================================================== */

class UnilesaHeader extends HTMLElement {
  connectedCallback() {
    this.render();
    this.initEvents();
  }

  static get observedAttributes() {
    return ['title', 'subtitle'];
  }

  attributeChangedCallback() {
    this.render();
    this.initEvents();
  }

  render() {
    const student = window.UniStore ? window.UniStore.getStudent() : {
      firstName: 'Jane',
      degree: 'B.Sc. Computer Science',
      level: '100 Level',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
    };

    const title = this.getAttribute('title') || `Welcome Back, ${student.firstName}`;
    const subtitle = this.getAttribute('subtitle') || `${student.degree} &bull; ${student.level}`;
    const notifs = window.UniStore ? window.UniStore.getNotifications() : [];
    const unreadCount = notifs.filter(n => n.unread).length;
    const wallet = window.UniStore ? window.UniStore.getWallet() : { balance: 35000 };
    const formattedWallet = '₦' + wallet.balance.toLocaleString('en-NG', { minimumFractionDigits: 2 });

    this.innerHTML = `
      <header class="top-header">
        
        <!-- Left Title / Greeting & Mobile Hamburger -->
        <div class="header-left-wrap">
          <button type="button" class="header-icon-btn mobile-menu-btn" id="headerMobileMenuBtn" aria-label="Open Navigation">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
          
          <div class="header-brand-mobile">
            <img src="https://unilesa.edu.ng/static/frontpage/assets/img/icons/unilesa_origina.png" alt="UNILESA" class="mobile-header-crest" onerror="this.style.display='none';">
          </div>

          <div class="header-left-greeting">
            <h1 id="headerGreetingTitle">${title}</h1>
            <p id="headerGreetingSubtitle">${subtitle}</p>
          </div>
        </div>

        <!-- Right Quick Actions -->
        <div class="header-right-actions">
          
          <!-- Search Bar (Desktop) -->
          <div class="header-search">
            <span class="search-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input type="text" placeholder="Search courses, fees, records..." id="globalSearchInput">
            <span class="shortcut-kbd">⌘K</span>
          </div>

          <!-- Student Wallet Balance Chip -->
          <a href="payments.html" class="header-wallet-chip" title="UNILESA Student Portal Wallet">
            <div class="wallet-chip-icon">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
            </div>
            <div class="wallet-chip-texts">
              <span class="wallet-chip-label">Wallet</span>
              <span class="wallet-chip-amt">${formattedWallet}</span>
            </div>
          </a>

          <!-- Helpdesk Support (Desktop Only) -->
          <button type="button" class="header-icon-btn header-helpdesk-btn" id="helpdeskTriggerBtn" title="ICT Helpdesk Support" onclick="openHelpdeskModal(event)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </button>

          <!-- Notifications Bell & Dropdown -->
          <div class="header-dropdown-wrap">
            <button type="button" class="header-icon-btn" id="headerNotifBtn" title="Notifications & Bulletins" aria-label="Notifications">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              ${unreadCount > 0 ? `<span class="notification-badge"></span>` : ''}
            </button>

            <!-- Notifications Dropdown Panel -->
            <div class="dropdown-panel header-notif-panel" id="headerNotifPanel">
              <div class="dropdown-header" style="display:flex; justify-content:space-between; align-items:center;">
                <span>Student Notifications</span>
                <span class="badge badge-gold" style="font-size:0.6rem;">${unreadCount} New</span>
              </div>
              <div style="max-height:260px; overflow-y:auto; padding:0.4rem 0;">
                ${notifs.map(n => `
                  <a href="${n.link || 'announcements.html'}" class="dropdown-item" style="flex-direction:column; align-items:flex-start; gap:0.2rem; border-bottom:1px solid var(--grey-100);">
                    <div style="font-size:0.78rem; color:var(--navy-900); font-weight:${n.unread ? '700' : '500'};">${n.text}</div>
                    <div style="font-size:0.66rem; color:var(--grey-500);">${n.date}</div>
                  </a>
                `).join('')}
              </div>
              <a href="announcements.html" style="padding:0.65rem; text-align:center; font-size:0.75rem; font-weight:700; color:var(--gold-600); background:#FAFBFD; border-top:1px solid var(--grey-200); display:block;">
                View All Bulletins &rarr;
              </a>
            </div>
          </div>

          <!-- User Profile Avatar & Dropdown -->
          <div class="header-dropdown-wrap">
            <button type="button" class="user-profile-menu-btn" id="headerUserMenuBtn" title="Account Menu" aria-label="User Account Menu" style="background:none; border:none; cursor:pointer;">
              <img class="user-avatar-lg" src="${student.avatarUrl}" alt="Student Photo">
            </button>

            <!-- User Menu Dropdown Panel -->
            <div class="dropdown-panel header-user-panel" id="headerUserMenuPanel">
              <div class="dropdown-header">
                <div style="font-weight:700; color:var(--navy-900);">${student.fullName}</div>
                <div style="font-size:0.68rem; color:var(--grey-500); margin-top:0.1rem;">${student.matricNumber}</div>
                <div style="margin-top:0.35rem; font-size:0.7rem; color:var(--gold-600); font-weight:700;">Wallet: ${formattedWallet}</div>
              </div>
              <a href="profile.html" class="dropdown-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span>My Profile &amp; Bio-Data</span>
              </a>
              <a href="payments.html" class="dropdown-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                <span>Fee Payments &amp; Wallet</span>
              </a>
              <a href="medical-clearance.html" class="dropdown-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                <span>Medical Clearance</span>
              </a>
              <div style="border-top:1px solid var(--grey-200); margin:0.3rem 0;"></div>
              <a href="#" class="dropdown-item danger" onclick="openLogoutModal(event)">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                <span>Sign Out</span>
              </a>
            </div>
          </div>

        </div>

      </header>
    `;
  }

  initEvents() {
    // Mobile Drawer Open Handler
    const mobileBtn = this.querySelector('#headerMobileMenuBtn');
    if (mobileBtn) {
      mobileBtn.addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        const backdrop = document.getElementById('sidebarBackdrop');
        if (sidebar) sidebar.classList.add('open');
        if (backdrop) backdrop.classList.add('show');
        document.body.style.overflow = 'hidden';
      });
    }

    // Notifications Dropdown Toggle
    const notifBtn = this.querySelector('#headerNotifBtn');
    const notifPanel = this.querySelector('#headerNotifPanel');
    const userBtn = this.querySelector('#headerUserMenuBtn');
    const userPanel = this.querySelector('#headerUserMenuPanel');

    if (notifBtn && notifPanel) {
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (userPanel) userPanel.classList.remove('show');
        notifPanel.classList.toggle('show');
      });
    }

    if (userBtn && userPanel) {
      userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (notifPanel) notifPanel.classList.remove('show');
        userPanel.classList.toggle('show');
      });
    }

    // Close dropdowns on document click
    document.addEventListener('click', (e) => {
      if (notifPanel && !notifPanel.contains(e.target) && e.target !== notifBtn) {
        notifPanel.classList.remove('show');
      }
      if (userPanel && !userPanel.contains(e.target) && e.target !== userBtn) {
        userPanel.classList.remove('show');
      }
    });

    // Live update listener
    window.addEventListener('unilesa:student-updated', (e) => {
      const student = e.detail;
      const titleEl = this.querySelector('#headerGreetingTitle');
      const subEl = this.querySelector('#headerGreetingSubtitle');
      if (titleEl && !this.getAttribute('title')) {
        titleEl.textContent = `Welcome Back, ${student.firstName}`;
      }
      if (subEl && !this.getAttribute('subtitle')) {
        subEl.innerHTML = `${student.degree} &bull; ${student.level}`;
      }
    });

    window.addEventListener('unilesa:wallet-updated', () => {
      this.render();
      this.initEvents();
    });
  }
}

customElements.define('unilesa-header', UnilesaHeader);
