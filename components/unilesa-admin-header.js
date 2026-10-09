/* ==========================================================================
   COMPONENT: <unilesa-admin-header>
   UNILESA Enterprise Suite Administrative Top Navigation Header
   ========================================================================== */

class UnilesaAdminHeader extends HTMLElement {
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

  detectRole(title) {
    const t = title.toLowerCase();
    if (t.includes('bursary')) return 'bursary';
    if (t.includes('lecturer')) return 'lecturer';
    if (t.includes('admission')) return 'admissions';
    return 'ict';
  }

  render() {
    const title = this.getAttribute('title') || 'UNILESA ICT Directorate';
    const subtitle = this.getAttribute('subtitle') || 'Enterprise Portal Management & Central Operations';
    const role = this.detectRole(title);

    let adminUser = {
      name: 'Engr. K. A. Babalola',
      role: 'Director of ICT',
      dept: 'Directorate of ICT & Infrastructure',
      initials: 'KB',
      avatarBg: 'linear-gradient(135deg, #0F1F42 0%, #2563EB 100%)'
    };

    if (role === 'bursary') {
      adminUser = {
        name: 'Dr. O. A. Adeleke',
        role: 'University Bursar',
        dept: 'Directorate of Bursary & Financial Services',
        initials: 'OA',
        avatarBg: 'linear-gradient(135deg, #78350F 0%, #D97706 100%)'
      };
    } else if (role === 'lecturer') {
      adminUser = {
        name: 'Dr. A. O. Babalola',
        role: 'Course Instructor & HOD',
        dept: 'Faculty of Science & Computing',
        initials: 'AB',
        avatarBg: 'linear-gradient(135deg, #064E3B 0%, #059669 100%)'
      };
    } else if (role === 'admissions') {
      adminUser = {
        name: 'Mr. B. K. Oladipo',
        role: 'Senior Admissions Officer',
        dept: 'Admissions & Registry Directorate',
        initials: 'BO',
        avatarBg: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)'
      };
    }

    this.innerHTML = `
      <header class="top-header admin-top-header" style="background:#FFFFFF; border-bottom:1px solid #E2E8F0;">
        
        <!-- Left Title / Greeting & Mobile Hamburger -->
        <div class="header-left-wrap">
          <button type="button" class="header-icon-btn mobile-menu-btn" id="headerMobileMenuBtn" aria-label="Open Navigation">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
          
          <div class="header-brand-mobile">
            <img src="https://unilesa.edu.ng/static/frontpage/assets/img/icons/unilesa_origina.png" alt="UNILESA" class="mobile-header-crest" onerror="this.style.display='none';">
          </div>

          <div class="header-left-greeting">
            <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
              <h1 id="headerGreetingTitle" style="font-size:1.15rem; font-weight:800; color:var(--navy-950); margin:0;">${title}</h1>
              <span class="badge" style="background:#ECFDF5; color:#059669; border:1px solid #A7F3D0; font-size:0.65rem; font-weight:700;">
                ● ONLINE ACTIVE
              </span>
            </div>
            <p id="headerGreetingSubtitle" style="font-size:0.75rem; color:var(--grey-600); margin:0.15rem 0 0;">${subtitle}</p>
          </div>
        </div>

        <!-- Right Quick Actions -->
        <div class="header-right-actions">
          
          <!-- Admin Search Bar (Desktop) -->
          <div class="header-search" style="min-width:260px;">
            <span class="search-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input type="text" placeholder="Search records, IDs, codes..." id="adminGlobalSearchInput">
            <span class="shortcut-kbd">⌘K</span>
          </div>

          <!-- Academic Session Pill -->
          <div style="background:#F1F5F9; border:1px solid #CBD5E1; padding:0.35rem 0.75rem; border-radius:8px; font-size:0.75rem; font-weight:700; color:#334155; display:flex; align-items:center; gap:0.4rem;" class="hide-mobile">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <span>2025/2026 Session</span>
          </div>

          <!-- Security Alerts Bell & Dropdown -->
          <div class="header-dropdown-wrap">
            <button type="button" class="header-icon-btn" id="adminNotifBtn" title="System Alerts" aria-label="System Alerts">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              <span class="notification-badge" style="background:#10B981;"></span>
            </button>

            <!-- Alerts Dropdown Panel -->
            <div class="dropdown-panel header-notif-panel" id="adminNotifPanel" style="width:340px;">
              <div class="dropdown-header" style="display:flex; justify-content:space-between; align-items:center;">
                <span>System Health &amp; Activity</span>
                <span class="badge" style="background:#10B981; color:#fff; font-size:0.6rem;">LIVE OK</span>
              </div>
              <div style="max-height:260px; overflow-y:auto; padding:0.4rem 0;">
                <div class="dropdown-item" style="flex-direction:column; align-items:flex-start; gap:0.2rem; border-bottom:1px solid var(--grey-100);">
                  <div style="font-size:0.76rem; color:var(--navy-900); font-weight:700;">Database Synchronization Active</div>
                  <div style="font-size:0.66rem; color:var(--grey-500);">All shards operational &bull; 0 latency</div>
                </div>
                <div class="dropdown-item" style="flex-direction:column; align-items:flex-start; gap:0.2rem; border-bottom:1px solid var(--grey-100);">
                  <div style="font-size:0.76rem; color:var(--navy-900); font-weight:700;">Portal Gateways Monitored</div>
                  <div style="font-size:0.66rem; color:var(--grey-500);">HTTPS 200 OK across all endpoints</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Admin User Profile Avatar & Dropdown -->
          <div class="header-dropdown-wrap">
            <button type="button" class="user-profile-menu-btn" id="adminUserMenuBtn" title="Administrator Menu" aria-label="Administrator Menu" style="background:none; border:none; cursor:pointer; display:flex; align-items:center; gap:0.5rem;">
              <div style="width:36px; height:36px; border-radius:50%; background:${adminUser.avatarBg}; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.8rem; border:2px solid #E2E8F0;">
                ${adminUser.initials}
              </div>
            </button>

            <!-- Admin Menu Dropdown Panel -->
            <div class="dropdown-panel header-user-panel" id="adminUserMenuPanel" style="width:260px;">
              <div class="dropdown-header">
                <div style="font-weight:800; color:var(--navy-900);">${adminUser.name}</div>
                <div style="font-size:0.68rem; color:#B45309; font-weight:700; margin-top:0.1rem;">${adminUser.role}</div>
                <div style="font-size:0.65rem; color:var(--grey-500); margin-top:0.15rem;">${adminUser.dept}</div>
              </div>
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

    // Dropdown Toggles
    const notifBtn = this.querySelector('#adminNotifBtn');
    const notifPanel = this.querySelector('#adminNotifPanel');
    const userBtn = this.querySelector('#adminUserMenuBtn');
    const userPanel = this.querySelector('#adminUserMenuPanel');

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

    // Global Admin Search Handler
    const searchInput = this.querySelector('#adminGlobalSearchInput');
    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const q = searchInput.value.trim();
          if (q) {
            if (window.showToast) {
              window.showToast('Search', `Searching records for "${q}"...`, 'info');
            }
            const userSearch = document.getElementById('userSearchInput');
            if (userSearch) {
              userSearch.value = q;
              if (window.filterUserSearch) window.filterUserSearch();
              if (window.switchIctTab) window.switchIctTab('usersTab');
            }
          }
        }
      });
    }
  }
}

customElements.define('unilesa-admin-header', UnilesaAdminHeader);
