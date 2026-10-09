/* ==========================================================================
   COMPONENT: <unilesa-modals>
   ========================================================================== */

class UnilesaModals extends HTMLElement {
  connectedCallback() {
    this.render();
    this.initEvents();
  }

  render() {
    this.innerHTML = `
      <!-- 1. RECEIPT PREVIEW MODAL -->
      <div class="modal-backdrop" id="receiptModal">
        <div class="modal-box">
          <div class="modal-header-clean">
            <h3>Bursary Payment Receipt</h3>
            <button type="button" class="modal-close-icon" onclick="closeModal('receiptModal')" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div class="modal-content-inner">
            <div style="background:#FBFBFA; border:1.5px dashed var(--grey-300); border-radius:12px; padding:1.2rem;">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1rem; border-bottom:1px solid var(--grey-200); padding-bottom:0.8rem;">
                <div>
                  <div style="font-weight:800; color:var(--navy-900); font-size:0.95rem;">UNIVERSITY OF ILESA</div>
                  <div style="font-size:0.7rem; color:var(--grey-500);">Official e-Receipt &bull; Bursary Department</div>
                </div>
                <span class="badge badge-success" id="receiptModalBadge">Completed</span>
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.6rem; font-size:0.78rem; margin-bottom:1rem;">
                <div>
                  <div style="color:var(--grey-500); font-size:0.68rem; font-weight:600;">TRANSACTION ID</div>
                  <div style="font-family:monospace; font-weight:700; color:var(--navy-900);" id="receiptModalId">PID - 331829</div>
                </div>
                <div>
                  <div style="color:var(--grey-500); font-size:0.68rem; font-weight:600;">PAYMENT DATE</div>
                  <div style="font-weight:600;" id="receiptModalDate">23 Oct 2024</div>
                </div>
                <div>
                  <div style="color:var(--grey-500); font-size:0.68rem; font-weight:600;">FEE CATEGORY</div>
                  <div style="font-weight:600;" id="receiptModalCategory">First Semester Tuition &amp; Levies</div>
                </div>
                <div>
                  <div style="color:var(--grey-500); font-size:0.68rem; font-weight:600;">AMOUNT PAID</div>
                  <div style="font-weight:800; color:var(--navy-900); font-size:0.92rem;" id="receiptModalAmount">₦185,000.00</div>
                </div>
              </div>
              <div style="background:var(--white); border:1px solid var(--grey-200); border-radius:8px; padding:0.6rem 0.8rem; font-size:0.72rem; color:var(--grey-600); display:flex; align-items:center; justify-content:space-between;">
                <span>Digital Signature Verified</span>
                <span style="color:var(--green-ok); font-weight:700;">&#10003; AUTHENTICATED</span>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline btn-sm" onclick="window.print()">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
              Print Receipt
            </button>
            <button type="button" class="btn btn-primary btn-sm" onclick="closeModal('receiptModal')">Done</button>
          </div>
        </div>
      </div>

      <!-- 2. COURSE REGISTRATION MODAL -->
      <div class="modal-backdrop" id="courseRegModal">
        <div class="modal-box">
          <div class="modal-header-clean">
            <h3>Course Registration (First Semester 2025/2026)</h3>
            <button type="button" class="modal-close-icon" onclick="closeModal('courseRegModal')" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div class="modal-content-inner">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; padding:0.75rem; background:var(--green-bg); border:1px solid var(--green-border); border-radius:10px;">
              <div>
                <div style="font-weight:700; color:var(--green-ok); font-size:0.82rem;">Registration Approved &amp; Locked</div>
                <div style="font-size:0.7rem; color:var(--grey-700);">Level Adviser &bull; Dr. A. K. Alabi</div>
              </div>
              <span class="badge badge-success">Approved</span>
            </div>
            <p style="font-size:0.8rem; color:var(--grey-700); line-height:1.45; margin:0 0 0.8rem;">
              You are currently registered for <strong>8 Courses (21 Credit Units)</strong> for the 2025/2026 First Semester.
            </p>
            <div style="background:#FAFBFD; border:1px solid var(--grey-300); border-radius:10px; padding:0.7rem; font-size:0.75rem;">
              <div style="display:flex; justify-content:space-between; padding:0.35rem 0; border-bottom:1px solid var(--grey-200);">
                <span>CSC 101 - Intro to Computer Science</span>
                <strong>3 Units</strong>
              </div>
              <div style="display:flex; justify-content:space-between; padding:0.35rem 0; border-bottom:1px solid var(--grey-200);">
                <span>CSC 103 - Intro to Problem Solving</span>
                <strong>3 Units</strong>
              </div>
              <div style="display:flex; justify-content:space-between; padding:0.35rem 0; border-bottom:1px solid var(--grey-200);">
                <span>MTH 101 - Elementary Mathematics I</span>
                <strong>3 Units</strong>
              </div>
              <div style="display:flex; justify-content:space-between; padding:0.35rem 0;">
                <span>GST 111 - Communication in English</span>
                <strong>2 Units</strong>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline btn-sm" onclick="window.location.href='course-registration.html'">Print Course Form (CRF)</button>
            <a href="course-registration.html" class="btn btn-gold btn-sm">Open Course Suite &rarr;</a>
          </div>
        </div>
      </div>

      <!-- 3. HOSTEL ACCOMMODATION MODAL -->
      <div class="modal-backdrop" id="hostelModal">
        <div class="modal-box">
          <div class="modal-header-clean">
            <h3>Hostel Accommodation</h3>
            <button type="button" class="modal-close-icon" onclick="closeModal('hostelModal')" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div class="modal-content-inner">
            <div style="text-align:center; padding:1rem 0;">
              <div style="width:50px; height:50px; border-radius:50%; background:var(--gold-100); color:var(--gold-600); display:flex; align-items:center; justify-content:center; margin:0 auto 0.75rem;">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              </div>
              <h4 style="margin:0 0 0.3rem; font-size:1.05rem;">Moremi Female Hall of Residence</h4>
              <p style="font-size:0.78rem; color:var(--grey-600); margin:0;">Block B &bull; Room 204 &bull; Bedspace 2</p>
            </div>
            <div style="background:#FAFBFD; border:1.5px solid var(--grey-300); border-radius:10px; padding:0.8rem; font-size:0.78rem; display:grid; grid-template-columns:1fr 1fr; gap:0.6rem;">
              <div>
                <span style="color:var(--grey-500); font-size:0.68rem; display:block;">STATUS</span>
                <span class="badge badge-warning">Allocated</span>
              </div>
              <div>
                <span style="color:var(--grey-500); font-size:0.68rem; display:block;">SESSION</span>
                <strong>2025/2026</strong>
              </div>
              <div>
                <span style="color:var(--grey-500); font-size:0.68rem; display:block;">HALL WARDEN</span>
                <strong>Mrs. F. Adebayo</strong>
              </div>
              <div>
                <span style="color:var(--grey-500); font-size:0.68rem; display:block;">CHECK-IN PASS</span>
                <strong style="color:var(--green-ok);">&#10003; Ready</strong>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline btn-sm" onclick="showToast('Hostel Pass', 'Check-in pass downloaded successfully', 'success')">Download Check-in Slip</button>
            <button type="button" class="btn btn-primary btn-sm" onclick="closeModal('hostelModal')">Close</button>
          </div>
        </div>
      </div>

      <!-- 4. SEMESTER RESULTS MODAL -->
      <div class="modal-backdrop" id="resultsModal">
        <div class="modal-box">
          <div class="modal-header-clean">
            <h3>Academic Results &amp; CGPA Summary</h3>
            <button type="button" class="modal-close-icon" onclick="closeModal('resultsModal')" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div class="modal-content-inner">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-bottom:1rem;">
              <div style="background:var(--purple-light); border:1px solid #C7D2FE; padding:0.75rem; border-radius:10px; text-align:center;">
                <div style="font-size:0.68rem; color:#4338CA; font-weight:700;">CURRENT CGPA</div>
                <div style="font-size:1.4rem; font-weight:800; color:#312E81;">3.75</div>
                <div style="font-size:0.65rem; color:#4338CA;">Second Class Upper</div>
              </div>
              <div style="background:var(--green-bg); border:1px solid var(--green-border); padding:0.75rem; border-radius:10px; text-align:center;">
                <div style="font-size:0.68rem; color:var(--green-ok); font-weight:700;">CREDITS EARNED</div>
                <div style="font-size:1.4rem; font-weight:800; color:#065F46;">42 / 120</div>
                <div style="font-size:0.65rem; color:var(--green-ok);">Good Standing</div>
              </div>
            </div>
            <p style="font-size:0.75rem; color:var(--grey-600); margin:0;">Official statement of result can be generated after senate approval.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline btn-sm" onclick="showToast('Result Slip', 'Provisional transcript queued for export', 'info')">Export Transcript</button>
            <button type="button" class="btn btn-primary btn-sm" onclick="closeModal('resultsModal')">Close</button>
          </div>
        </div>
      </div>

      <!-- 5. SIWES / IT MODAL -->
      <div class="modal-backdrop" id="siwesModal">
        <div class="modal-box" style="max-width:520px;">
          <div class="modal-header-clean">
            <div style="display:flex; align-items:center; gap:0.6rem;">
              <div style="width:32px; height:32px; border-radius:8px; background:#EFF6FF; color:#1D4ED8; display:flex; align-items:center; justify-content:center;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
              </div>
              <h3 style="margin:0;">SIWES / Industrial Training Portal</h3>
            </div>
            <button type="button" class="modal-close-icon" onclick="closeModal('siwesModal')" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div class="modal-content-inner">
            <div style="background:#F8FAFC; border:1px solid var(--grey-300); border-radius:10px; padding:0.9rem 1rem; margin-bottom:0.9rem;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
                <span style="font-size:0.75rem; color:var(--grey-600);">Directorate of SIWES &bull; ITF Accredited</span>
                <span class="badge badge-info">300L 2nd Semester</span>
              </div>
              <h4 style="margin:0 0 0.3rem; font-size:0.92rem; color:var(--navy-900);">SIWES Placement &amp; Digital Logbook</h4>
              <p style="font-size:0.78rem; color:var(--grey-700); line-height:1.45; margin:0;">
                Eligible students in Sciences, Computing, Technology, and Engineering undergo mandatory 6-month industrial attachments with registered corporate firms and government establishments.
              </p>
            </div>
            
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.6rem; font-size:0.76rem; margin-bottom:0.9rem;">
              <div style="padding:0.65rem 0.8rem; background:#FAFBFD; border:1px solid var(--grey-300); border-radius:8px;">
                <div style="font-weight:700; color:var(--navy-900);">ITF Form 8 Submission</div>
                <div style="color:var(--grey-600); margin-top:0.15rem;">Submission Window: Pending</div>
              </div>
              <div style="padding:0.65rem 0.8rem; background:#FAFBFD; border:1px solid var(--grey-300); border-radius:8px;">
                <div style="font-weight:700; color:var(--navy-900);">Supervisor Allocation</div>
                <div style="color:var(--grey-600); margin-top:0.15rem;">Institutional &amp; Industry Guides</div>
              </div>
            </div>

            <div style="background:#FFFBEB; border:1px solid #FDE68A; border-radius:8px; padding:0.6rem 0.8rem; font-size:0.75rem; color:#92400E;">
              💡 <b>Orientation Notice:</b> Mandatory virtual SIWES pre-placement workshop takes place every 2nd semester.
            </div>
          </div>
          <div class="modal-footer" style="display:flex; justify-content:space-between;">
            <button type="button" class="btn btn-outline btn-sm" onclick="showToast('SIWES Guide', 'Downloading UNILESA SIWES Handbook PDF...', 'info')">Download Guide</button>
            <button type="button" class="btn btn-primary btn-sm" onclick="closeModal('siwesModal')">Close</button>
          </div>
        </div>
      </div>

      <!-- 5B. TEACHING PRACTICE (TP) MODAL -->
      <div class="modal-backdrop" id="tpModal">
        <div class="modal-box" style="max-width:520px;">
          <div class="modal-header-clean">
            <div style="display:flex; align-items:center; gap:0.6rem;">
              <div style="width:32px; height:32px; border-radius:8px; background:#FEF3C7; color:#B45309; display:flex; align-items:center; justify-content:center;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              </div>
              <h3 style="margin:0;">Teaching Practice (TP) Portal</h3>
            </div>
            <button type="button" class="modal-close-icon" onclick="closeModal('tpModal')" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div class="modal-content-inner">
            <div style="background:#F8FAFC; border:1px solid var(--grey-300); border-radius:10px; padding:0.9rem 1rem; margin-bottom:0.9rem;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
                <span style="font-size:0.75rem; color:var(--grey-600);">Faculty of Education &bull; TP Board</span>
                <span class="badge badge-gold">200L / 300L Education</span>
              </div>
              <h4 style="margin:0 0 0.3rem; font-size:0.92rem; color:var(--navy-900);">School Posting &amp; Practicum Supervision</h4>
              <p style="font-size:0.78rem; color:var(--grey-700); line-height:1.45; margin:0;">
                The Teaching Practice (TP) Portal coordinates secondary/primary school postings, lesson plan submissions, micro-teaching reviews, and on-site supervisor evaluation visits across Osun State schools.
              </p>
            </div>
            
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.6rem; font-size:0.76rem; margin-bottom:0.9rem;">
              <div style="padding:0.65rem 0.8rem; background:#FAFBFD; border:1px solid var(--grey-300); border-radius:8px;">
                <div style="font-weight:700; color:var(--navy-900);">Partner School Posting</div>
                <div style="color:var(--grey-600); margin-top:0.15rem;">Selected: Ilesa Grammar School</div>
              </div>
              <div style="padding:0.65rem 0.8rem; background:#FAFBFD; border:1px solid var(--grey-300); border-radius:8px;">
                <div style="font-weight:700; color:var(--navy-900);">Lesson Plan Diary</div>
                <div style="color:var(--grey-600); margin-top:0.15rem;">Weekly Pedagogical Uploads</div>
              </div>
            </div>

            <div style="background:#F0FDF4; border:1px solid #BBF7D0; border-radius:8px; padding:0.6rem 0.8rem; font-size:0.75rem; color:#166534;">
              🎓 <b>Accreditation Tip:</b> Ensure your Teaching Practice posting endorsement letter is stamped by the host school Principal.
            </div>
          </div>
          <div class="modal-footer" style="display:flex; justify-content:space-between;">
            <button type="button" class="btn btn-outline btn-sm" onclick="showToast('Lesson Plan Template', 'Downloading Official Lesson Plan Schema...', 'info')">Lesson Plan Format</button>
            <button type="button" class="btn btn-primary btn-sm" onclick="closeModal('tpModal')">Close</button>
          </div>
        </div>
      </div>

      <!-- 6. HELPDESK SUPPORT MODAL -->
      <div class="modal-backdrop" id="helpdeskModal">
        <div class="modal-box">
          <div class="modal-header-clean">
            <h3>UNILESA ICT Helpdesk Support</h3>
            <button type="button" class="modal-close-icon" onclick="closeModal('helpdeskModal')" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div class="modal-content-inner">
            <p style="font-size:0.8rem; color:var(--grey-700); margin:0 0 1rem; line-height:1.45;">
              Having issues with course registration, school fees clearance, or credentials? Reach our 24/7 technical team:
            </p>
            <div style="display:flex; flex-direction:column; gap:0.6rem; font-size:0.8rem;">
              <div style="padding:0.65rem; background:#FAFBFD; border:1px solid var(--grey-300); border-radius:8px;">
                <div style="font-weight:700; color:var(--navy-900);">Email Support</div>
                <div style="color:var(--grey-600);">support@unilesa.edu.ng</div>
              </div>
              <div style="padding:0.65rem; background:#FAFBFD; border:1px solid var(--grey-300); border-radius:8px;">
                <div style="font-weight:700; color:var(--navy-900);">ICT Directorate Line</div>
                <div style="color:var(--grey-600);">+234 (0) 801 234 5678 / +234 (0) 809 876 5432</div>
              </div>
              <div style="padding:0.65rem; background:#FAFBFD; border:1px solid var(--grey-300); border-radius:8px;">
                <div style="font-weight:700; color:var(--navy-900);">Physical Office</div>
                <div style="color:var(--grey-600);">ICT Centre, Main Campus, Ilesa, Osun State</div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary btn-sm" onclick="closeModal('helpdeskModal')">Close</button>
          </div>
        </div>
      </div>

      <!-- 7. SIGN OUT MODAL -->
      <div class="modal-backdrop" id="logoutModal">
        <div class="modal-box" style="max-width:400px;">
          <div class="modal-header-clean">
            <h3 style="color:var(--rose-tag);">Confirm Sign Out</h3>
            <button type="button" class="modal-close-icon" onclick="closeModal('logoutModal')" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div class="modal-content-inner">
            <p style="font-size:0.83rem; color:var(--grey-700); margin:0; line-height:1.45;">
              Are you sure you want to end your student portal session?
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-ghost btn-sm" onclick="closeModal('logoutModal')">Cancel</button>
            <a href="login.html" class="btn btn-danger btn-sm">Sign Out</a>
          </div>
        </div>
      </div>
    `;
  }

  initEvents() {
    this.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.classList.remove('show');
          backdrop.style.display = 'none';
          document.body.style.overflow = '';
        }
      });
    });
  }
}

customElements.define('unilesa-modals', UnilesaModals);
