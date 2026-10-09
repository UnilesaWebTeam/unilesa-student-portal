/* ==========================================================================
   COMPONENT: <unilesa-admin-sidebar>
   University of Ilesa Role-Specific Administrative Sidebar
   Renders dedicated, isolated menus per user role without cross-department pollution.
   ========================================================================== */

class UnilesaAdminSidebar extends HTMLElement {
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

  detectRole(activePage) {
    if (activePage && (activePage.startsWith('bursary') || activePage === 'tariffs' || activePage === 'policy' || activePage === 'audit' || activePage === 'reports' || activePage === 'clearance')) return 'bursary';
    if (activePage === 'lecturer') return 'lecturer';
    if (activePage === 'admissions') return 'admissions';
    return 'ict';
  }

  render() {
    const activePage = this.getAttribute('active') || 'ict';
    const role = this.detectRole(activePage);

    // Profile & Menu config per user persona
    let config = {
      brandSub: 'ICT Directorate',
      homeUrl: 'ict.html',
      staff: {
        fullName: 'Engr. K. A. Babalola',
        role: 'Director of ICT & Infrastructure',
        staffId: 'STAFF/ICT/2019/001',
        initials: 'KB',
        avatarBg: 'linear-gradient(135deg, #0F1F42 0%, #2563EB 100%)'
      },
      groups: [
        {
          title: 'ICT Directorate Modules',
          items: [
            {
              id: 'ict',
              altId: 'dashboard',
              name: 'ICT Central Dashboard',
              url: 'ict.html',
              icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>'
            },
            {
              id: 'users',
              altId: 'directory',
              name: 'User Accounts Directory',
              url: 'ict-users.html',
              icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>'
            },
            {
              id: 'gates',
              altId: 'windows',
              name: 'Portal Windows & Gates',
              url: 'ict-gates.html',
              icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>'
            },
            {
              id: 'courses',
              altId: 'catalog',
              name: 'Master Course Catalog',
              url: 'ict-courses.html',
              icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>'
            },
            {
              id: 'audit',
              altId: 'logs',
              name: 'Security Audit Trail',
              url: 'ict-audit.html',
              icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>'
            },
            {
              id: 'broadcast',
              altId: 'announcements',
              name: 'Broadcast Dispatch',
              url: 'ict-broadcast.html',
              icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>'
            }
          ]
        }
      ]
    };

    if (role === 'bursary') {
      config = {
        brandSub: 'Bursary Directorate',
        homeUrl: 'bursary.html',
        staff: {
          fullName: 'Dr. O. A. Adeleke',
          role: 'University Bursar',
          staffId: 'STAFF/BUR/2018/004',
          initials: 'OA',
          avatarBg: 'linear-gradient(135deg, #78350F 0%, #D97706 100%)'
        },
        groups: [
          {
            title: 'Bursary Financial Operations',
            items: [
              {
                id: 'bursary',
                altId: 'dashboard',
                name: 'Executive Revenue Dashboard',
                url: 'bursary.html',
                icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>'
              },
              {
                id: 'policy',
                altId: 'bursary-policy',
                name: 'Payment Policy & Split Modes',
                url: 'bursary-policy.html',
                icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>'
              },
              {
                id: 'tariffs',
                altId: 'bursary-tariffs',
                name: 'Approved Fee Tariffs & Sundries',
                url: 'bursary-tariffs.html',
                icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>'
              },
              {
                id: 'audit',
                altId: 'clearance',
                name: 'Student Clearance & Arrears Audit',
                url: 'bursary-audit.html',
                icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>'
              },
              {
                id: 'reports',
                altId: 'ledger',
                name: 'Master Ledger & Reconciliation',
                url: 'bursary-reports.html',
                icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>'
              }
            ]
          }
        ]
      };
    } else if (role === 'lecturer') {
      config = {
        brandSub: 'Lecturer Console',
        homeUrl: 'lecturer.html',
        staff: {
          fullName: 'Dr. A. O. Babalola',
          role: 'Course Instructor & HOD',
          staffId: 'STAFF/ACAD/2020/021',
          initials: 'AB',
          avatarBg: 'linear-gradient(135deg, #064E3B 0%, #059669 100%)'
        },
        groups: [
          {
            title: 'Academic Duties',
            items: [
              {
                id: 'lecturer',
                name: 'Continuous Assessment & Grading',
                url: 'lecturer.html',
                icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>'
              },
              {
                id: 'crf_approvals',
                name: 'CRF Registration Endorsements',
                url: 'lecturer.html',
                icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>'
              }
            ]
          }
        ]
      };
    } else if (role === 'admissions') {
      config = {
        brandSub: 'Admissions & Registry',
        homeUrl: 'admissions.html',
        staff: {
          fullName: 'Mr. B. K. Oladipo',
          role: 'Senior Admissions Officer',
          staffId: 'STAFF/ADM/2021/012',
          initials: 'BO',
          avatarBg: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)'
        },
        groups: [
          {
            title: 'Registry & Admissions',
            items: [
              {
                id: 'admissions',
                name: 'Candidate Screening & JAMB CAPS',
                url: 'admissions.html',
                icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>'
              }
            ]
          }
        ]
      };
    }

    this.innerHTML = `
      <!-- Mobile Sidebar Backdrop Overlay -->
      <div class="sidebar-backdrop" id="sidebarBackdrop"></div>

      <aside class="sidebar admin-sidebar" id="sidebar" style="background:#FFFFFF;">
        <!-- Sidebar Header -->
        <div class="sidebar-header" style="border-bottom:1px solid #E2E8F0;">
          <a href="${config.homeUrl}" class="brand-logo-area">
            <div class="brand-icon" style="background: linear-gradient(135deg, #0F1F42 0%, #1E3A8A 100%);">
              <img src="https://unilesa.edu.ng/static/frontpage/assets/img/icons/unilesa_origina.png" alt="UNILESA Logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
              <span style="display:none; color:#fff; font-weight:800; font-size:0.8rem;">UL</span>
            </div>
            <div class="brand-title">
              UNILESA
              <span style="color:#B45309; font-weight:800; display:inline-flex; align-items:center; gap:0.25rem;">
                ${config.brandSub}
              </span>
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

        <!-- Role-Specific Navigation -->
        <nav class="sidebar-nav">
          ${config.groups.map(g => `
            <div class="nav-group">
              <div class="nav-group-header">
                <span>${g.title}</span>
              </div>
              <div class="nav-group-items">
                ${g.items.map(item => {
                  const isActive = activePage === item.id || (item.altId && activePage === item.altId);
                  return `
                    <a href="${item.url}" class="nav-item ${isActive ? 'active' : ''}" data-page="${item.id}">
                      <span class="nav-icon">
                        ${item.icon}
                      </span>
                      <span>${item.name}</span>
                    </a>
                  `;
                }).join('')}
              </div>
            </div>
          `).join('')}

          <!-- Session Actions -->
          <div class="nav-group" style="margin-top:auto; padding-top:0.5rem; border-top:1px dashed #E2E8F0;">
            <a href="#" class="nav-item" onclick="openLogoutModal(event)" style="color:var(--rose-tag); margin-top:0.25rem;">
              <span class="nav-icon" style="color:var(--rose-tag);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              </span>
              <span>Sign Out</span>
            </a>
          </div>
        </nav>

        <!-- Role-Specific Staff Badge Footer -->
        <div class="sidebar-footer" style="background:#F8FAFC; border-top:1px solid #E2E8F0;">
          <div class="student-badge-card" style="border-color:#CBD5E1;">
            <div class="student-avatar-sm" style="background:${config.staff.avatarBg};">
              ${config.staff.initials}
            </div>
            <div class="student-info-sm">
              <div class="name" style="color:#0F172A; font-weight:800;">${config.staff.fullName}</div>
              <div class="matric" style="color:#64748B; font-weight:600;">${config.staff.role}</div>
            </div>
          </div>
        </div>
      </aside>
    `;
  }

  initEvents() {
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

customElements.define('unilesa-admin-sidebar', UnilesaAdminSidebar);
