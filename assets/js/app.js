/* ==========================================================================
   UNI-LESA APPLICATION UTILITIES & CONTROLLERS
   ========================================================================== */

// ---------- Modal Helpers ----------
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'flex';
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('show');
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// Global modal triggers for sidebar & header actions
function openCourseRegModal(e) {
  if (e && e.preventDefault) e.preventDefault();
  openModal('courseRegModal');
}

function openHostelModal(e) {
  if (e && e.preventDefault) e.preventDefault();
  openModal('hostelModal');
}

function openResultsModal(e) {
  if (e && e.preventDefault) e.preventDefault();
  openModal('resultsModal');
}

function openSiwesModal(e) {
  if (e && e.preventDefault) e.preventDefault();
  openModal('siwesModal');
}

function openTpModal(e) {
  if (e && e.preventDefault) e.preventDefault();
  openModal('tpModal');
}

function openLogoutModal(e) {
  if (e && e.preventDefault) e.preventDefault();
  openModal('logoutModal');
}

function openHelpdeskModal(e) {
  if (e && e.preventDefault) e.preventDefault();
  openModal('helpdeskModal');
}

function previewReceipt(id, category, date, amount, status) {
  const idEl = document.getElementById('receiptModalId');
  const catEl = document.getElementById('receiptModalCategory');
  const dateEl = document.getElementById('receiptModalDate');
  const amtEl = document.getElementById('receiptModalAmount');
  const badgeEl = document.getElementById('receiptModalBadge');

  if (idEl) idEl.textContent = id || 'PID - 331829';
  if (catEl) catEl.textContent = category || 'Tuition & Development Levy';
  if (dateEl) dateEl.textContent = date || '23 October 2024';
  if (amtEl) amtEl.textContent = amount || '₦185,000.00';
  if (badgeEl) {
    badgeEl.textContent = status || 'Completed';
    badgeEl.className = 'badge ' + (String(status).toLowerCase().includes('comp') ? 'badge-success' : 'badge-warning');
  }

  openModal('receiptModal');
}

// ---------- Clipboard Helper ----------
function copyMatricNumber(matric) {
  const matricVal = matric || (window.UniStore ? window.UniStore.getStudent().matricNumber : 'UNILESA/2026/CSC/0142');
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(matricVal).then(() => {
      if (window.UniToast) {
        window.UniToast.show('Copied to Clipboard', `Matriculation Number: ${matricVal}`, 'success');
      } else {
        alert(`Matriculation Number copied: ${matricVal}`);
      }
    }).catch(() => {
      fallbackCopy(matricVal);
    });
  } else {
    fallbackCopy(matricVal);
  }
}

function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    if (window.UniToast) {
      window.UniToast.show('Copied to Clipboard', text, 'success');
    } else {
      alert(`Copied: ${text}`);
    }
  } catch (err) {
    alert(`Matric Number: ${text}`);
  }
  document.body.removeChild(textArea);
}

// Quick Toast alias
function showToast(title, message, type = 'info') {
  if (window.UniToast) {
    window.UniToast.show(title, message, type);
  } else {
    console.log(`[Toast ${type.toUpperCase()}] ${title}: ${message}`);
  }
}

// Global Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
  // ESC to close any open modal
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-backdrop.show').forEach(m => m.classList.remove('show'));
    document.querySelectorAll('.dropdown-panel.show').forEach(d => d.classList.remove('show'));
    document.body.style.overflow = '';
  }

  // Cmd+K or Ctrl+K for Global Search
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    const searchInput = document.getElementById('globalSearchInput');
    if (searchInput) {
      searchInput.focus();
      searchInput.select();
    }
  }
});
