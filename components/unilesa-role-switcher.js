/* ==========================================================================
   COMPONENT: <unilesa-role-switcher>
   Interactive Global Persona & User Interface Quick Switcher Widget
   ========================================================================== */

class UnilesaRoleSwitcher extends HTMLElement {
  connectedCallback() {
    this.render();
    this.initEvents();
  }

  static get observedAttributes() {
    return ['current'];
  }

  attributeChangedCallback() {
    this.render();
    this.initEvents();
  }

  render() {
    const current = this.getAttribute('current') || this.detectCurrentRole();

    const roles = [
      {
        id: 'student',
        name: 'Student Portal',
        persona: 'Jane Adaeze Doe',
        badge: '100L Computer Science',
        idNumber: 'UNILESA/2026/CSC/0142',
        url: 'dashboard.html',
        icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>',
        color: '#2563EB',
        bgColor: '#EFF6FF',
        badgeColor: '#1D4ED8'
      },
      {
        id: 'ict',
        name: 'Directorate of ICT',
        persona: 'Engr. K. A. Babalola',
        badge: 'Director of ICT',
        idNumber: 'STAFF/ICT/2019/001',
        url: 'ict.html',
        icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
        color: '#0284C7',
        bgColor: '#F0F9FF',
        badgeColor: '#0369A1'
      },
      {
        id: 'bursary',
        name: 'Directorate of Bursary',
        persona: 'Dr. O. A. Adeleke',
        badge: 'University Bursar',
        idNumber: 'STAFF/BUR/2018/004',
        url: 'bursary.html',
        icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
        color: '#D97706',
        bgColor: '#FFFBEB',
        badgeColor: '#B45309'
      },
      {
        id: 'lecturer',
        name: 'Lecturer & HOD Console',
        persona: 'Dr. A. O. Babalola',
        badge: 'Course Instructor & HOD',
        idNumber: 'STAFF/ACAD/2020/021',
        url: 'lecturer.html',
        icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>',
        color: '#059669',
        bgColor: '#ECFDF5',
        badgeColor: '#047857'
      },
      {
        id: 'admissions',
        name: 'Admissions & Registry',
        persona: 'Mr. B. K. Oladipo',
        badge: 'Senior Admissions Officer',
        idNumber: 'STAFF/ADM/2021/012',
        url: 'admissions.html',
        icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>',
        color: '#7C3AED',
        bgColor: '#F5F3FF',
        badgeColor: '#6D28D9'
      }
    ];

    const currentRoleObj = roles.find(r => r.id === current) || roles[0];

    this.innerHTML = `
      <style>
        .role-switcher-floating-btn {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 9999;
          background: #0F1F42;
          color: #FFFFFF;
          border: 2px solid rgba(205, 164, 52, 0.6);
          border-radius: 30px;
          padding: 0.5rem 0.95rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          box-shadow: 0 10px 30px -5px rgba(15, 31, 66, 0.4);
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(8px);
        }
        .role-switcher-floating-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 14px 35px -5px rgba(15, 31, 66, 0.5);
          border-color: #CDA434;
        }
        .role-switcher-badge-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #4ADE80;
          box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7);
          animation: rolePulse 1.8s infinite;
        }
        @keyframes rolePulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(74, 222, 128, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
        }

        .role-switcher-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(5, 14, 33, 0.7);
          backdrop-filter: blur(6px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.25s ease, visibility 0.25s ease;
          padding: 1rem;
          box-sizing: border-box;
        }
        .role-switcher-modal-backdrop.show {
          opacity: 1;
          visibility: visible;
        }
        .role-switcher-panel {
          background: #FFFFFF;
          border-radius: 20px;
          width: 100%;
          max-width: 540px;
          box-shadow: 0 20px 60px -10px rgba(15, 31, 66, 0.4);
          border: 1px solid #E2E8F0;
          overflow: hidden;
          transform: translateY(15px);
          transition: transform 0.25s ease;
        }
        .role-switcher-modal-backdrop.show .role-switcher-panel {
          transform: translateY(0);
        }
        .role-switcher-header {
          background: linear-gradient(135deg, #050E21 0%, #0F1F42 100%);
          color: #FFFFFF;
          padding: 1.25rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid rgba(205,164,52,0.4);
        }
        .role-switcher-list {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          max-height: 480px;
          overflow-y: auto;
        }
        .role-card-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1rem;
          border-radius: 12px;
          border: 1.5px solid #E2E8F0;
          background: #FAFBFD;
          text-decoration: none;
          color: inherit;
          transition: all 0.2s ease;
        }
        .role-card-item:hover {
          border-color: #0F1F42;
          background: #FFFFFF;
          transform: translateX(4px);
          box-shadow: 0 6px 20px rgba(15, 31, 66, 0.06);
        }
        .role-card-item.active {
          border-color: #CDA434;
          background: #FFFDF8;
          box-shadow: 0 6px 20px rgba(205, 164, 52, 0.15);
        }
        @media (max-width: 640px) {
          .role-switcher-floating-btn { bottom: 4.8rem; right: 1rem; font-size: 0.75rem; padding: 0.45rem 0.8rem; }
        }
      </style>

      <!-- Floating Switcher Pill Button -->
      <button type="button" class="role-switcher-floating-btn" id="roleSwitcherTriggerBtn" title="Switch User Interface (Student / ICT / Bursary / Lecturer / Admissions)">
        <span class="role-switcher-badge-dot"></span>
        <span style="font-size:0.75rem; font-weight:800; color:#CDA434; text-transform:uppercase; letter-spacing:0.04em;">Persona:</span>
        <span style="font-size:0.8rem; font-weight:700;">${currentRoleObj.name}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-left:0.15rem;"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>

      <!-- Switcher Modal Dialog -->
      <div class="role-switcher-modal-backdrop" id="roleSwitcherBackdrop">
        <div class="role-switcher-panel">
          <div class="role-switcher-header">
            <div>
              <div style="font-size:0.68rem; font-weight:800; color:#CDA434; text-transform:uppercase; letter-spacing:0.06em;">
                UNILESA Multi-User Portal Suite
              </div>
              <h3 style="margin:0.15rem 0 0; font-size:1.15rem; font-family:'Playfair Display', serif; color:#FFFFFF;">
                Switch Role Interface
              </h3>
            </div>
            <button type="button" id="roleSwitcherCloseBtn" style="background:rgba(255,255,255,0.1); border:none; color:#FFFFFF; width:30px; height:30px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
              &times;
            </button>
          </div>

          <div class="role-switcher-list">
            ${roles.map(r => `
              <a href="${r.url}" class="role-card-item ${r.id === current ? 'active' : ''}">
                <div style="display:flex; align-items:center; gap:0.85rem;">
                  <div style="width:40px; height:40px; border-radius:10px; background:${r.bgColor}; color:${r.color}; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                    ${r.icon}
                  </div>
                  <div>
                    <div style="display:flex; align-items:center; gap:0.45rem;">
                      <span style="font-size:0.88rem; font-weight:800; color:var(--navy-950);">${r.name}</span>
                      ${r.id === current ? `<span style="font-size:0.6rem; font-weight:800; padding:0.1rem 0.4rem; border-radius:10px; background:#FEF3C7; color:#B45309; border:1px solid #FDE68A;">CURRENT VIEW</span>` : ''}
                    </div>
                    <div style="font-size:0.75rem; color:#475569; margin-top:0.1rem; font-weight:600;">
                      ${r.persona} &bull; <span style="font-family:'Fira Code', monospace; font-size:0.7rem;">${r.idNumber}</span>
                    </div>
                  </div>
                </div>
                <div style="display:flex; align-items:center; gap:0.4rem;">
                  <span style="font-size:0.68rem; font-weight:700; color:${r.badgeColor}; background:${r.bgColor}; padding:0.25rem 0.6rem; border-radius:20px; white-space:nowrap;">
                    ${r.badge}
                  </span>
                  <span style="font-size:0.9rem; color:#94A3B8;">&rarr;</span>
                </div>
              </a>
            `).join('')}
          </div>

          <div style="background:#F8FAFC; border-top:1px solid #E2E8F0; padding:0.75rem 1.25rem; display:flex; justify-content:space-between; align-items:center; font-size:0.72rem; color:#64748B;">
            <span>💡 Switching interfaces loads the authenticated persona view.</span>
            <a href="login.html" style="font-weight:700; color:var(--navy-900); text-decoration:none;">Sign Out / Switch Account</a>
          </div>
        </div>
      </div>
    `;
  }

  detectCurrentRole() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('ict')) return 'ict';
    if (path.includes('bursary')) return 'bursary';
    if (path.includes('lecturer')) return 'lecturer';
    if (path.includes('admissions')) return 'admissions';
    return 'student';
  }

  initEvents() {
    const triggerBtn = this.querySelector('#roleSwitcherTriggerBtn');
    const backdrop = this.querySelector('#roleSwitcherBackdrop');
    const closeBtn = this.querySelector('#roleSwitcherCloseBtn');

    if (triggerBtn && backdrop) {
      triggerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        backdrop.classList.add('show');
      });
    }

    if (closeBtn && backdrop) {
      closeBtn.addEventListener('click', () => {
        backdrop.classList.remove('show');
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.classList.remove('show');
        }
      });
    }
  }
}

customElements.define('unilesa-role-switcher', UnilesaRoleSwitcher);
