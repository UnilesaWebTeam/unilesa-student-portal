/* ==========================================================================
   COMPONENT: <unilesa-sidebar>
   ========================================================================== */

class UnilesaSidebar extends HTMLElement {
  connectedCallback() {
    this.render();
    this.initEvents();
  }

  static get observedAttributes() {
    return ['active'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'active' && oldValue !== newValue) {
      this.updateActiveLink(newValue);
    }
  }

  render() {
    const activePage = this.getAttribute('active') || 'dashboard';
    const student = window.UniStore ? window.UniStore.getStudent() : {
      fullName: 'Jane Adaeze Doe',
      matricNumber: 'UNILESA/2026/CSC/0142',
      initials: 'JD'
    };

    this.innerHTML = `
      <!-- Mobile Sidebar Backdrop Overlay -->
      <div class="sidebar-backdrop" id="sidebarBackdrop"></div>

      <aside class="sidebar" id="sidebar">
        <!-- Sidebar Header -->
        <div class="sidebar-header">
          <a href="dashboard.html" class="brand-logo-area">
            <div class="brand-icon">
              <img src="https://unilesa.edu.ng/static/frontpage/assets/img/icons/unilesa_origina.png" alt="UNILESA Logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
              <span style="display:none; color:#fff; font-weight:800; font-size:0.8rem;">UL</span>
            </div>
            <div class="brand-title">
              UNILESA
              <span>Student Portal</span>
            </div>
          </a>

          <!-- Desktop Collapse Button -->
          <button type="button" class="sidebar-toggle-btn" id="sidebarToggleBtn" aria-label="Toggle Sidebar" title="Collapse Sidebar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
          </button>

          <!-- Mobile Close Button -->
          <button type="button" class="sidebar-close-btn" id="sidebarCloseBtn" aria-label="Close Sidebar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <!-- Sidebar Navigation -->
        <nav class="sidebar-nav">
          
          <!-- Main Group -->
          <div class="nav-group">
            <a href="dashboard.html" class="nav-item ${activePage === 'dashboard' ? 'active' : ''}" data-page="dashboard">
              <span class="nav-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              </span>
              <span>Dashboard</span>
            </a>

            <a href="announcements.html" class="nav-item ${activePage === 'announcements' ? 'active' : ''}" data-page="announcements">
              <span class="nav-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              </span>
              <span>Announcements</span>
              <span style="margin-left:auto; font-size:0.65rem; font-weight:700; padding:0.15rem 0.45rem; border-radius:20px; background:var(--gold-500); color:var(--navy-950);">NEW</span>
            </a>
          </div>

          <!-- Academic Group -->
          <div class="nav-group" id="navGroupAcademic">
            <div class="nav-group-header" data-toggle="navGroupAcademic">
              <span>Academic</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            <div class="nav-group-items">
              <a href="course-registration.html" class="nav-item ${activePage === 'courses' || activePage === 'course-registration' ? 'active' : ''}" data-page="courses">
                <span class="nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg></span>
                <span>Course Registration</span>
              </a>
              <a href="exam-timetable.html" class="nav-item ${activePage === 'timetable' ? 'active' : ''}" data-page="timetable">
                <span class="nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>
                <span>Exam Timetable</span>
              </a>
              <a href="results.html" class="nav-item ${activePage === 'results' ? 'active' : ''}" data-page="results">
                <span class="nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></span>
                <span>Semester Results</span>
              </a>
              <a href="#" class="nav-item" onclick="openSiwesModal(event)">
                <span class="nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg></span>
                <span>SIWES / IT Portal</span>
              </a>
              <a href="#" class="nav-item" onclick="openTpModal(event)">
                <span class="nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg></span>
                <span>Teaching Practice (TP)</span>
              </a>
            </div>
          </div>

          <!-- Financials & Records -->
          <div class="nav-group" id="navGroupFinances">
            <div class="nav-group-header" data-toggle="navGroupFinances">
              <span>Financials &amp; Records</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            <div class="nav-group-items">
              <a href="payments.html" class="nav-item ${activePage === 'payments' ? 'active' : ''}" data-page="payments">
                <span class="nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg></span>
                <span>Fee Payments</span>
              </a>
              <a href="profile.html" class="nav-item ${activePage === 'profile' ? 'active' : ''}" data-page="profile">
                <span class="nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span>
                <span>Student Profile</span>
              </a>
              <a href="medical-clearance.html" class="nav-item ${activePage === 'medical' ? 'active' : ''}" data-page="medical">
                <span class="nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg></span>
                <span>Medical Clearance</span>
              </a>
              <a href="#" class="nav-item" onclick="openHostelModal(event)">
                <span class="nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></span>
                <span>Hostel Accommodation</span>
              </a>
              <a href="documents.html" class="nav-item ${activePage === 'documents' ? 'active' : ''}" data-page="documents">
                <span class="nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg></span>
                <span>Clearance Documents</span>
              </a>
            </div>
          </div>

          <!-- Session & Logout -->
          <div class="nav-group" style="margin-top:auto;">
            <a href="#" class="nav-item" onclick="openLogoutModal(event)" style="color:var(--rose-tag);">
              <span class="nav-icon" style="color:var(--rose-tag);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              </span>
              <span>Sign Out</span>
            </a>
          </div>

        </nav>

        <!-- Student Badge Footer -->
        <div class="sidebar-footer">
          <a href="profile.html" class="student-badge-card" style="text-decoration:none;">
            <div class="student-avatar-sm" id="sidebarAvatar">${student.initials}</div>
            <div class="student-info-sm">
              <div class="name" id="sidebarStudentName">${student.fullName}</div>
              <div class="matric" id="sidebarStudentMatric">${student.matricNumber}</div>
            </div>
          </a>
        </div>

      </aside>
    `;
  }

  initEvents() {
    // Nav group accordion toggles
    this.querySelectorAll('[data-toggle]').forEach(header => {
      header.addEventListener('click', () => {
        const targetId = header.getAttribute('data-toggle');
        const targetGroup = this.querySelector(`#${targetId}`);
        if (targetGroup) targetGroup.classList.toggle('collapsed');
      });
    });

    // Desktop sidebar collapse toggle
    const toggleBtn = this.querySelector('#sidebarToggleBtn');
    const appLayout = document.getElementById('appLayout') || document.querySelector('.app-layout');
    
    const updateToggleBtnState = (isCollapsed) => {
      if (toggleBtn) {
        toggleBtn.setAttribute('title', isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar');
        toggleBtn.setAttribute('aria-label', isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar');
        toggleBtn.setAttribute('aria-expanded', isCollapsed ? 'false' : 'true');
      }
    };

    if (toggleBtn && appLayout) {
      toggleBtn.addEventListener('click', () => {
        appLayout.classList.toggle('sidebar-collapsed');
        const isCollapsed = appLayout.classList.contains('sidebar-collapsed');
        localStorage.setItem('unilesa_sidebar_collapsed', isCollapsed ? 'true' : 'false');
        updateToggleBtnState(isCollapsed);
      });
    }

    // Restore collapse state
    if (localStorage.getItem('unilesa_sidebar_collapsed') === 'true' && appLayout) {
      appLayout.classList.add('sidebar-collapsed');
      updateToggleBtnState(true);
    } else {
      updateToggleBtnState(false);
    }

    // Mobile drawer handlers
    const sidebarEl = this.querySelector('#sidebar');
    const backdropEl = this.querySelector('#sidebarBackdrop');
    const closeBtn = this.querySelector('#sidebarCloseBtn');

    const closeMobileSidebar = () => {
      if (sidebarEl) sidebarEl.classList.remove('open');
      if (backdropEl) backdropEl.classList.remove('show');
      document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeMobileSidebar);
    if (backdropEl) backdropEl.addEventListener('click', closeMobileSidebar);

    // Live update listener
    window.addEventListener('unilesa:student-updated', (e) => {
      const student = e.detail;
      const avatarEl = this.querySelector('#sidebarAvatar');
      const nameEl = this.querySelector('#sidebarStudentName');
      const matricEl = this.querySelector('#sidebarStudentMatric');
      if (avatarEl) avatarEl.textContent = student.initials || 'JD';
      if (nameEl) nameEl.textContent = student.fullName || 'Jane Adaeze Doe';
      if (matricEl) matricEl.textContent = student.matricNumber || 'UNILESA/2026/CSC/0142';
    });
  }

  updateActiveLink(pageKey) {
    this.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-page') === pageKey) {
        item.classList.add('active');
      }
    });
  }
}

customElements.define('unilesa-sidebar', UnilesaSidebar);
