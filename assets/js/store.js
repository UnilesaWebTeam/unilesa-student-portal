/* ==========================================================================
   UNI-LESA STUDENT PORTAL STATE & DATA STORE
   ========================================================================== */

const UniStore = (() => {
  const STORAGE_KEY_STUDENT = 'unilesa_student_profile';
  const STORAGE_KEY_NOTIFS = 'unilesa_notifications';
  const STORAGE_KEY_WALLET = 'unilesa_student_wallet';
  const STORAGE_KEY_FEES = 'unilesa_student_fees';
  const STORAGE_KEY_BURSARY = 'unilesa_bursary_policy';

  const defaultBursaryPolicy = {
    session: '2025/2026 Academic Session',
    activeSemester: 'First Semester',
    activeTerm: 'First Semester',
    scheduleMode: 'split_60_40',
    scheduleModeTitle: 'Two-Semester Split Schedule (60% First Semester / 40% Second Semester)',
    modeDescription: 'Standard Institutional Billing: Students settle 60% upon First Semester registration, and the remaining 40% prior to Second Semester commencement.',
    clearanceMinimumPercent: 60,
    examClearanceLocked: true,
    sundryBatchAllowed: true,
    walletRestrictionEnforced: true,
    lateRegistrationSurcharge: 10000,
    lateRegistrationDeadline: '15 Nov 2026',
    authorizedOfficer: 'Dr. O. A. Adeleke (Bursar, UNILESA)',
    lastDirectiveDate: '28 Sep 2026, 09:30 AM',
    approvedFees: [
      { id: 'fee_tuition', code: 'TUI-100L', name: '100 Level First Semester Tuition & Statutory Levies', category: 'tuition', termAmount: 185000, sessionTotal: 308000, mandatory: true, status: 'Active' },
      { id: 'fee_nacos', code: 'SND-NACOS', name: 'Nigeria Association of Computing Students (NACOS) Dues', category: 'dues', termAmount: 5000, sessionTotal: 5000, mandatory: true, status: 'Active' },
      { id: 'fee_faculty', code: 'SND-FSC', name: 'Faculty of Science & Computing Development Levy', category: 'sundry', termAmount: 3500, sessionTotal: 3500, mandatory: true, status: 'Active' },
      { id: 'fee_sug', code: 'SND-SUG', name: 'Student Union Government (SUG) Statutory Due', category: 'sundry', termAmount: 2000, sessionTotal: 2000, mandatory: true, status: 'Active' },
      { id: 'fee_library', code: 'SND-LIB', name: 'Library Development & E-Resource Access Levy', category: 'sundry', termAmount: 4000, sessionTotal: 4000, mandatory: true, status: 'Active' },
      { id: 'fee_ict', code: 'SND-ICT', name: 'ICT Directorate Technological & Portal Maintenance Levy', category: 'sundry', termAmount: 10000, sessionTotal: 10000, mandatory: true, status: 'Active' },
      { id: 'fee_health', code: 'SND-MED', name: 'University Health Services & TISHIP Insurance Levy', category: 'sundry', termAmount: 6000, sessionTotal: 6000, mandatory: true, status: 'Active' },
      { id: 'fee_hostel', code: 'ACC-MOR', name: 'Hostel Maintenance & Utility (Moremi Hall)', category: 'hostel', termAmount: 40000, sessionTotal: 40000, mandatory: false, status: 'Active' }
    ]
  };

  const defaultStudent = {
    firstName: 'Jane',
    lastName: 'Doe',
    fullName: 'Jane Adaeze Doe',
    matricNumber: 'UNILESA/2026/CSC/0142',
    jambRegNo: '202610948211EF',
    email: 'j.doe@student.unilesa.edu.ng',
    phone: '+234 803 456 7890',
    faculty: 'Faculty of Science & Computing',
    department: 'Computer Science',
    degree: 'B.Sc. Computer Science',
    level: '100 Level',
    academicSession: '2025/2026 Academic Session',
    semester: '1st Semester (First Semester)',
    cgpa: '3.75',
    totalCredits: '42 / 120',
    hostelStatus: 'Allocated (Room 204)',
    feeStatus: 'Partially Cleared (₦185,000 paid)',
    medicalStatus: 'Cleared (Fit for Enrollment)',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    initials: 'JD'
  };

  const defaultWallet = {
    balance: 35000.00,
    currency: 'NGN',
    totalDeposited: 120000.00,
    totalSpentOnFees: 85000.00,
    restrictionPolicy: 'Restricted Institutional Wallet: Funds deposited in this wallet can only be applied toward tuition, statutory departmental levies, hostel accommodation, and official portal sundry fees.',
    virtualAccount: {
      bank: 'Wema Bank (UNILESA Collections)',
      accountNumber: '9928104491',
      accountName: 'UNILESA / JANE ADAEZE DOE'
    },
    transactions: [
      { id: 'TXW-88192', type: 'deposit', method: 'Bank Transfer (Virtual Account)', amount: 50000.00, description: 'Wallet Top-up via Wema Bank Virtual Account', date: '20 Oct 2024, 10:14 AM', status: 'Completed', ref: 'DEP-883910' },
      { id: 'TXW-88193', type: 'payment', method: 'UNILESA Student Wallet', amount: 10000.00, description: 'Payment for ICT & Portal Technological Levy', date: '21 Oct 2024, 02:30 PM', status: 'Completed', ref: 'FEE-ICT-2026' },
      { id: 'TXW-88194', type: 'payment', method: 'UNILESA Student Wallet', amount: 6000.00, description: 'Payment for University Health & TISHIP Levy', date: '21 Oct 2024, 02:45 PM', status: 'Completed', ref: 'FEE-MED-2026' },
      { id: 'TXW-88195', type: 'deposit', method: 'Debit Card (Mastercard)', amount: 35000.00, description: 'Wallet Top-up for First Semester Sundry Levies', date: '22 Oct 2024, 11:20 AM', status: 'Completed', ref: 'DEP-994120' }
    ]
  };

  const defaultNotifications = [
    { id: 1, text: '⏳ 100L Course registration closes in 3 days.', date: 'Today', unread: true, link: '#' },
    { id: 2, text: '💳 ₦5,000.00 NACOS Departmental Due outstanding.', date: 'Yesterday', unread: true, link: 'payments.html' },
    { id: 3, text: '🏢 Hostel Room 204 allocated for First Semester.', date: '2 days ago', unread: false, link: '#' },
    { id: 4, text: '📋 First Semester Examination Timetable Published.', date: '3 days ago', unread: false, link: 'exam-timetable.html' }
  ];

  function getStudent() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STUDENT);
      if (saved) return { ...defaultStudent, ...JSON.parse(saved) };
    } catch (e) {
      console.warn('Could not read student profile from localStorage:', e);
    }
    return defaultStudent;
  }

  function setStudent(data) {
    try {
      const current = getStudent();
      const updated = { ...current, ...data };
      localStorage.setItem(STORAGE_KEY_STUDENT, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('unilesa:student-updated', { detail: updated }));
      return updated;
    } catch (e) {
      console.error('Failed to save student profile:', e);
      return data;
    }
  }

  function getWallet() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WALLET);
      if (saved) return { ...defaultWallet, ...JSON.parse(saved) };
    } catch (e) {
      console.warn('Could not read wallet from localStorage:', e);
    }
    return defaultWallet;
  }

  function setWallet(data) {
    try {
      const current = getWallet();
      const updated = { ...current, ...data };
      localStorage.setItem(STORAGE_KEY_WALLET, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('unilesa:wallet-updated', { detail: updated }));
      return updated;
    } catch (e) {
      console.error('Failed to save wallet state:', e);
      return data;
    }
  }

  function getBursaryPolicy() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BURSARY);
      if (saved) return { ...defaultBursaryPolicy, ...JSON.parse(saved) };
    } catch (e) {
      console.warn('Could not read bursary policy from localStorage:', e);
    }
    return defaultBursaryPolicy;
  }

  function setBursaryPolicy(data) {
    try {
      const current = getBursaryPolicy();
      const updated = { ...current, ...data };
      localStorage.setItem(STORAGE_KEY_BURSARY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('unilesa:bursary-updated', { detail: updated }));
      return updated;
    } catch (e) {
      console.error('Failed to save bursary policy:', e);
      return data;
    }
  }

  function addApprovedFee(fee) {
    const policy = getBursaryPolicy();
    const fees = policy.approvedFees || [];
    const newFee = {
      id: fee.id || 'fee_' + Date.now(),
      code: fee.code || 'SND-NEW',
      name: fee.name || 'New Approved Institutional Fee',
      category: fee.category || 'sundry',
      termAmount: parseFloat(fee.termAmount) || 0,
      sessionTotal: parseFloat(fee.sessionTotal) || (parseFloat(fee.termAmount) || 0),
      mandatory: fee.mandatory !== undefined ? fee.mandatory : true,
      status: fee.status || 'Active',
      description: fee.description || 'Senate & Bursary approved statutory fee tariff.'
    };
    policy.approvedFees = [...fees, newFee];
    setBursaryPolicy(policy);
    return { success: true, fee: newFee };
  }

  function updateApprovedFee(fee) {
    const policy = getBursaryPolicy();
    const fees = policy.approvedFees || [];
    const index = fees.findIndex(f => f.id === fee.id || f.code === fee.code);
    if (index !== -1) {
      const current = fees[index];
      fees[index] = {
        ...current,
        ...fee,
        termAmount: parseFloat(fee.termAmount) !== undefined ? parseFloat(fee.termAmount) : current.termAmount,
        sessionTotal: parseFloat(fee.sessionTotal) !== undefined ? parseFloat(fee.sessionTotal) : current.sessionTotal
      };
      policy.approvedFees = fees;
      setBursaryPolicy(policy);
      return { success: true, fee: fees[index] };
    }
    return { success: false, message: 'Fee not found' };
  }

  function deleteApprovedFee(feeId) {
    const policy = getBursaryPolicy();
    const fees = policy.approvedFees || [];
    const filtered = fees.filter(f => f.id !== feeId && f.code !== feeId);
    policy.approvedFees = filtered;
    setBursaryPolicy(policy);
    return { success: true };
  }

  const STORAGE_KEY_MULTI_FINANCE = 'unilesa_student_multi_finances';

  const defaultMultiSessionFinances = {
    currentSessionKey: '2025/2026',
    sessions: [
      {
        key: '2024/2025',
        title: '2024/2025 Academic Session',
        level: '100 Level (Previous Session)',
        isCurrent: false,
        hasArrears: true,
        notes: 'Carried forward second semester tuition split balance & departmental laboratory levies.',
        fees: [
          {
            id: 'arr_tui_24',
            code: 'TUI-2024-S2',
            name: '2024/2025 Second Semester Tuition (Balance Carried Forward)',
            category: 'tuition',
            amount: 25000.00,
            sessionKey: '2024/2025',
            sessionTitle: '2024/2025 Session',
            semester: 'Second Semester',
            paid: false,
            mandatory: true,
            statusText: 'OUTSTANDING ARREARS',
            description: 'Unsettled 40% split balance from 2024/2025 Second Semester billing.'
          },
          {
            id: 'arr_lab_24',
            code: 'SND-FSC-24',
            name: '2024/2025 Faculty Science & Computing Lab Equipment Due',
            category: 'sundry',
            amount: 6000.00,
            sessionKey: '2024/2025',
            sessionTitle: '2024/2025 Session',
            semester: 'Second Semester',
            paid: false,
            mandatory: true,
            statusText: 'OUTSTANDING ARREARS',
            description: 'Faculty of Science & Computing Laboratory Equipment Levy Arrears.'
          },
          {
            id: 'arr_sug_24',
            code: 'SND-SUG-24',
            name: '2024/2025 Student Union Government (SUG) Statutory Due Arrears',
            category: 'dues',
            amount: 4000.00,
            sessionKey: '2024/2025',
            sessionTitle: '2024/2025 Session',
            semester: 'Second Semester',
            paid: false,
            mandatory: true,
            statusText: 'OUTSTANDING ARREARS',
            description: 'Central SUG Statutory Due Arrears from prior academic session.'
          },
          {
            id: 'paid_tui_24_s1',
            code: 'TUI-2024-S1',
            name: '2024/2025 First Semester Tuition (60% Split)',
            category: 'tuition',
            amount: 175000.00,
            sessionKey: '2024/2025',
            sessionTitle: '2024/2025 Session',
            semester: 'First Semester',
            paid: true,
            mandatory: true,
            statusText: 'CLEARED',
            paidDate: '14 Nov 2023, 10:20 AM',
            receiptRef: 'REM-2024-TUI-0142',
            method: 'Remita Gateway (Debit Card)',
            description: 'Initial 100L First Semester Tuition & Matriculation fees.'
          },
          {
            id: 'paid_tui_24_s2_partial',
            code: 'TUI-2024-S2-P1',
            name: '2024/2025 Second Semester Tuition (Tranche 1)',
            category: 'tuition',
            amount: 65000.00,
            sessionKey: '2024/2025',
            sessionTitle: '2024/2025 Session',
            semester: 'Second Semester',
            paid: true,
            mandatory: true,
            statusText: 'CLEARED',
            paidDate: '12 Apr 2024, 02:15 PM',
            receiptRef: 'REM-2024-TUI2-0881',
            method: 'Remita Gateway (Bank Transfer)',
            description: 'Second semester tuition installment payment.'
          },
          {
            id: 'paid_nacos_24',
            code: 'SND-NACOS-24',
            name: '2024/2025 NACOS Departmental Association Due',
            category: 'dues',
            amount: 5000.00,
            sessionKey: '2024/2025',
            sessionTitle: '2024/2025 Session',
            semester: 'First Semester',
            paid: true,
            mandatory: true,
            statusText: 'CLEARED',
            paidDate: '18 Nov 2023, 11:30 AM',
            receiptRef: 'WAL-2024-NACOS-01',
            method: 'UNILESA Wallet',
            description: 'NACOS Departmental Annual Dues.'
          },
          {
            id: 'paid_med_24',
            code: 'SND-MED-24',
            name: '2024/2025 University Health & TISHIP Insurance',
            category: 'sundry',
            amount: 6000.00,
            sessionKey: '2024/2025',
            sessionTitle: '2024/2025 Session',
            semester: 'First Semester',
            paid: true,
            mandatory: true,
            statusText: 'CLEARED',
            paidDate: '20 Nov 2023, 09:00 AM',
            receiptRef: 'WAL-2024-MED-02',
            method: 'UNILESA Wallet',
            description: 'University Health Services enrollment.'
          },
          {
            id: 'paid_ict_24',
            code: 'SND-ICT-24',
            name: '2024/2025 ICT Directorate Maintenance Levy',
            category: 'sundry',
            amount: 9000.00,
            sessionKey: '2024/2025',
            sessionTitle: '2024/2025 Session',
            semester: 'First Semester',
            paid: true,
            mandatory: true,
            statusText: 'CLEARED',
            paidDate: '22 Nov 2023, 01:45 PM',
            receiptRef: 'WAL-2024-ICT-03',
            method: 'UNILESA Wallet',
            description: 'Portal and CBT access fee.'
          }
        ]
      },
      {
        key: '2025/2026',
        title: '2025/2026 Academic Session',
        level: '100 Level (Current Active Session)',
        isCurrent: true,
        hasArrears: false,
        notes: 'Current active semester fee obligations and statutory departmental levies.',
        fees: [
          {
            id: 'feeCardTuition',
            code: 'TUI-100L',
            name: '100 Level First Semester Tuition & Statutory Levies',
            category: 'tuition',
            amount: 185000.00,
            sessionKey: '2025/2026',
            sessionTitle: '2025/2026 Session',
            semester: 'First Semester',
            paid: true,
            mandatory: true,
            statusText: 'CLEARED • 23 OCT 2024',
            paidDate: '23 Oct 2024, 09:15 AM',
            receiptRef: 'PID-331829',
            method: 'Remita Gateway (Debit Card)',
            description: 'Matriculation • Library • Laboratory • Examination Registration'
          },
          {
            id: 'feeCardHostel',
            code: 'ACC-MOR',
            name: 'Hostel Maintenance & Utility (Moremi Hall)',
            category: 'hostel',
            amount: 40000.00,
            sessionKey: '2025/2026',
            sessionTitle: '2025/2026 Session',
            semester: 'First Semester',
            paid: true,
            mandatory: false,
            statusText: 'PAID • 04 OCT 2024',
            paidDate: '04 Oct 2024, 11:20 AM',
            receiptRef: 'PID-329841',
            method: 'Remita Gateway (Bank Branch)',
            description: 'First Semester Bedspace 204 Allocation & Utility Maintenance'
          },
          {
            id: 'feeCardIct',
            code: 'SND-ICT',
            name: 'ICT Directorate Technological & Portal Maintenance Levy',
            category: 'sundry',
            amount: 10000.00,
            sessionKey: '2025/2026',
            sessionTitle: '2025/2026 Session',
            semester: 'First Semester',
            paid: true,
            mandatory: true,
            statusText: 'PAID VIA WALLET • 21 OCT',
            paidDate: '21 Oct 2024, 02:30 PM',
            receiptRef: 'FEE-ICT-2026',
            method: 'UNILESA Student Wallet',
            description: 'High-Speed Campus Wi-Fi & CBT Centre Subscription'
          },
          {
            id: 'feeCardHealth',
            code: 'SND-MED',
            name: 'University Health Services & TISHIP Insurance Levy',
            category: 'sundry',
            amount: 6000.00,
            sessionKey: '2025/2026',
            sessionTitle: '2025/2026 Session',
            semester: 'First Semester',
            paid: true,
            mandatory: true,
            statusText: 'PAID VIA WALLET • 21 OCT',
            paidDate: '21 Oct 2024, 02:45 PM',
            receiptRef: 'FEE-MED-2026',
            method: 'UNILESA Student Wallet',
            description: 'Tertiary Institution Social Health Insurance & University Clinic Card'
          },
          {
            id: 'feeCardNacos',
            code: 'SND-NACOS',
            name: 'Nigeria Association of Computing Students (NACOS) Dues',
            category: 'dues',
            amount: 5000.00,
            sessionKey: '2025/2026',
            sessionTitle: '2025/2026 Session',
            semester: 'First Semester',
            paid: false,
            mandatory: true,
            statusText: 'OUTSTANDING',
            description: 'Departmental Annual Membership, Tech Week, & Coding Bootcamp Fund'
          },
          {
            id: 'feeCardFaculty',
            code: 'SND-FSC',
            name: 'Faculty of Science & Computing Development Levy',
            category: 'sundry',
            amount: 3500.00,
            sessionKey: '2025/2026',
            sessionTitle: '2025/2026 Session',
            semester: 'First Semester',
            paid: false,
            mandatory: true,
            statusText: 'OUTSTANDING',
            description: 'Annual Faculty Research Publication & Computational Lab Maintenance'
          },
          {
            id: 'feeCardSug',
            code: 'SND-SUG',
            name: 'Student Union Government (SUG) Statutory Due',
            category: 'dues',
            amount: 2000.00,
            sessionKey: '2025/2026',
            sessionTitle: '2025/2026 Session',
            semester: 'First Semester',
            paid: false,
            mandatory: true,
            statusText: 'OUTSTANDING',
            description: 'University of Ilesa Central Student Union Representation & Welfare Fund'
          },
          {
            id: 'feeCardLibrary',
            code: 'SND-LIB',
            name: 'Library Development & E-Resource Access Levy',
            category: 'sundry',
            amount: 4000.00,
            sessionKey: '2025/2026',
            sessionTitle: '2025/2026 Session',
            semester: 'First Semester',
            paid: false,
            mandatory: true,
            statusText: 'OUTSTANDING',
            description: 'University Digital Repository, IEEE/JSTOR Institutional Journal Access'
          }
        ]
      }
    ]
  };

  function getMultiSessionFinances() {
    let data;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MULTI_FINANCE);
      if (saved) {
        data = JSON.parse(saved);
      } else {
        data = defaultMultiSessionFinances;
      }
    } catch (e) {
      console.warn('Could not read multi-session finances from localStorage:', e);
      data = defaultMultiSessionFinances;
    }

    // Compute live calculations
    let prevArrears = 0;
    let prevBilled = 0;
    let prevPaid = 0;
    const prevItems = [];

    let currOutstanding = 0;
    let currBilled = 0;
    let currPaid = 0;
    const currUnpaidItems = [];

    let totalAllBilled = 0;
    let totalAllPaid = 0;

    data.sessions.forEach(sess => {
      let sBilled = 0;
      let sPaid = 0;
      let sUnpaid = 0;

      (sess.fees || []).forEach(f => {
        const amt = parseFloat(f.amount) || 0;
        sBilled += amt;
        totalAllBilled += amt;

        if (f.paid) {
          sPaid += amt;
          totalAllPaid += amt;
        } else {
          sUnpaid += amt;
          if (sess.isCurrent) {
            currOutstanding += amt;
            currUnpaidItems.push(f);
          } else {
            prevArrears += amt;
            prevItems.push(f);
          }
        }
      });

      sess.totalBilled = sBilled;
      sess.totalPaid = sPaid;
      sess.arrearsBalance = sUnpaid;
      sess.hasArrears = sUnpaid > 0;
      sess.isCleared = sUnpaid === 0;
      sess.percentCleared = sBilled > 0 ? Math.round((sPaid / sBilled) * 100) : 100;

      if (sess.isCurrent) {
        currBilled = sBilled;
        currPaid = sPaid;
      } else {
        prevBilled += sBilled;
        prevPaid += sPaid;
      }
    });

    const totalConsolidatedOutstanding = prevArrears + currOutstanding;
    const sessionsMap = {};
    (data.sessions || []).forEach(s => {
      sessionsMap[s.key] = s;
    });

    return {
      currentSessionKey: data.currentSessionKey || '2025/2026',
      sessions: data.sessions,
      sessionsMap: sessionsMap,
      // Prior session arrears metrics
      previousSessionArrears: prevArrears,
      previousSessionBilled: prevBilled,
      previousSessionPaid: prevPaid,
      previousSessionItems: prevItems,
      unpaidItems: prevItems,
      hasPreviousSessionDebt: prevArrears > 0,
      // Current session metrics
      currentSessionOutstanding: currOutstanding,
      currentSessionBilled: currBilled,
      currentSessionPaid: currPaid,
      currentSessionUnpaidItems: currUnpaidItems,
      // Global consolidated metrics
      totalConsolidatedOutstanding: totalConsolidatedOutstanding,
      totalConsolidatedOwing: totalConsolidatedOutstanding,
      totalConsolidatedBilled: totalAllBilled,
      totalConsolidatedPaid: totalAllPaid,
      totalConsolidatedSettled: totalAllPaid,
      percentConsolidatedCleared: totalAllBilled > 0 ? Math.round((totalAllPaid / totalAllBilled) * 100) : 100,
      isFullyClearedAllSessions: totalConsolidatedOutstanding === 0,
      // Clearance docket eligibility: Must have 0 prior arrears AND at least 60% of current session tuition
      clearanceDocketEligible: prevArrears === 0 && (currPaid >= (currBilled * 0.6))
    };
  }

  function setMultiSessionFinances(data) {
    try {
      localStorage.setItem(STORAGE_KEY_MULTI_FINANCE, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent('unilesa:finances-updated', { detail: data }));
      return getMultiSessionFinances();
    } catch (e) {
      console.error('Failed to save multi-session finances:', e);
      return data;
    }
  }

  function getPreviousSessionArrears() {
    const fin = getMultiSessionFinances();
    return {
      hasArrears: fin.hasPreviousSessionDebt,
      totalArrears: fin.previousSessionArrears,
      items: fin.previousSessionItems,
      unpaidItems: fin.previousSessionItems,
      previousSessionTitle: fin.sessions.find(s => !s.isCurrent)?.title || '2024/2025 Academic Session'
    };
  }

  function payFeeItem(arg1, arg2 = 'UNILESA Student Wallet', arg3 = null) {
    let feeId = arg1;
    let paymentMethod = arg2;
    let customRef = arg3;

    // Handle dual signatures: payFeeItem('2024/2025', 'arr_tui_24', 'UNILESA Wallet') or payFeeItem('arr_tui_24', 'UNILESA Wallet')
    if (arg1 && (arg1.includes('/') || arg1.startsWith('20')) && typeof arg2 === 'string' && !arg2.toLowerCase().includes('wallet') && !arg2.toLowerCase().includes('remita') && !arg2.toLowerCase().includes('gateway') && !arg2.toLowerCase().includes('card') && !arg2.toLowerCase().includes('bank')) {
      feeId = arg2;
      paymentMethod = arg3 || 'UNILESA Student Wallet';
      customRef = arguments[3] || null;
    }

    const rawData = (() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_MULTI_FINANCE);
        return saved ? JSON.parse(saved) : defaultMultiSessionFinances;
      } catch (e) {
        return defaultMultiSessionFinances;
      }
    })();

    let targetFee = null;
    let targetSession = null;

    for (const sess of rawData.sessions) {
      const found = (sess.fees || []).find(f => f.id === feeId || f.code === feeId);
      if (found) {
        targetFee = found;
        targetSession = sess;
        break;
      }
    }

    if (!targetFee) {
      return { success: false, message: `Fee item with ID "${feeId}" not found in institutional catalog.` };
    }

    if (targetFee.paid) {
      return { success: false, message: `Fee item "${targetFee.name}" has already been cleared.` };
    }

    const amount = targetFee.amount;
    const isArrears = !targetSession.isCurrent;
    const txRef = customRef || (paymentMethod.toLowerCase().includes('wallet') 
      ? 'WAL-TXN-' + Math.floor(100000 + Math.random() * 900000)
      : 'REM-' + Math.floor(100000 + Math.random() * 900000));

    // Handle Wallet payment deduction
    if (paymentMethod.toLowerCase().includes('wallet')) {
      const wallet = getWallet();
      if (wallet.balance < amount) {
        return {
          success: false,
          message: `Insufficient wallet balance (₦${wallet.balance.toLocaleString('en-NG', {minimumFractionDigits:2})}). Please fund your wallet to pay ₦${amount.toLocaleString('en-NG', {minimumFractionDigits:2})}.`
        };
      }

      const newTx = {
        id: 'TXW-' + Math.floor(10000 + Math.random() * 90000),
        type: 'payment',
        method: 'UNILESA Student Wallet',
        amount: amount,
        description: `Payment for ${targetFee.name} [${targetSession.title}]`,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        status: 'Completed',
        ref: txRef,
        sessionKey: targetSession.key
      };

      setWallet({
        ...wallet,
        balance: wallet.balance - amount,
        totalSpentOnFees: (wallet.totalSpentOnFees || 0) + amount,
        transactions: [newTx, ...(wallet.transactions || [])]
      });
    }

    // Mark fee as paid
    const nowStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    targetFee.paid = true;
    targetFee.paidDate = nowStr;
    targetFee.receiptRef = txRef;
    targetFee.method = paymentMethod;
    targetFee.statusText = `PAID VIA ${paymentMethod.toUpperCase()} • TODAY`;

    // Persist multi-session data
    setMultiSessionFinances(rawData);

    // Update student general fee status string
    const updatedFinances = getMultiSessionFinances();
    setStudent({
      feeStatus: updatedFinances.isFullyClearedAllSessions 
        ? '100% Cleared (All Sessions)' 
        : (updatedFinances.hasPreviousSessionDebt 
            ? `Arrears Active (₦${updatedFinances.previousSessionArrears.toLocaleString('en-NG')} Debt)` 
            : `Current Session Active (₦${updatedFinances.currentSessionPaid.toLocaleString('en-NG')} Paid)`)
    });

    return {
      success: true,
      fee: targetFee,
      session: targetSession,
      isArrears: isArrears,
      receiptRef: txRef,
      newTotals: updatedFinances
    };
  }

  function payBatchFees(feeIds, paymentMethod = 'UNILESA Student Wallet', customRef = null) {
    if (!Array.isArray(feeIds) || feeIds.length === 0) {
      return { success: false, message: 'No fee items selected for payment.' };
    }

    const rawData = (() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_MULTI_FINANCE);
        return saved ? JSON.parse(saved) : defaultMultiSessionFinances;
      } catch (e) {
        return defaultMultiSessionFinances;
      }
    })();

    let totalAmount = 0;
    const targetFees = [];

    for (const sess of rawData.sessions) {
      for (const f of sess.fees || []) {
        if (feeIds.includes(f.id) && !f.paid) {
          totalAmount += f.amount;
          targetFees.push({ fee: f, session: sess });
        }
      }
    }

    if (targetFees.length === 0) {
      return { success: false, message: 'All selected items have already been cleared.' };
    }

    // Check wallet if applicable
    if (paymentMethod.toLowerCase().includes('wallet')) {
      const wallet = getWallet();
      if (wallet.balance < totalAmount) {
        return {
          success: false,
          message: `Insufficient wallet balance (₦${wallet.balance.toLocaleString('en-NG', {minimumFractionDigits:2})}). Total required: ₦${totalAmount.toLocaleString('en-NG', {minimumFractionDigits:2})}.`
        };
      }
    }

    const batchTxRef = customRef || (paymentMethod.toLowerCase().includes('wallet') 
      ? 'WAL-BATCH-' + Math.floor(100000 + Math.random() * 900000)
      : 'REM-BATCH-' + Math.floor(100000 + Math.random() * 900000));

    // Process Wallet deduction
    if (paymentMethod.toLowerCase().includes('wallet')) {
      const wallet = getWallet();
      const feeNamesSummary = targetFees.map(t => t.fee.name).join(', ');
      const newTx = {
        id: 'TXW-' + Math.floor(10000 + Math.random() * 90000),
        type: 'payment',
        method: 'UNILESA Student Wallet',
        amount: totalAmount,
        description: `Batch Payment for ${targetFees.length} Fee Obligations (${feeNamesSummary.substring(0, 65)}...)`,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        status: 'Completed',
        ref: batchTxRef
      };

      setWallet({
        ...wallet,
        balance: wallet.balance - totalAmount,
        totalSpentOnFees: (wallet.totalSpentOnFees || 0) + totalAmount,
        transactions: [newTx, ...(wallet.transactions || [])]
      });
    }

    // Mark all target fees as paid
    const nowStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    targetFees.forEach(({ fee }) => {
      fee.paid = true;
      fee.paidDate = nowStr;
      fee.receiptRef = batchTxRef;
      fee.method = paymentMethod;
      fee.statusText = `PAID VIA ${paymentMethod.toUpperCase()} • TODAY`;
    });

    setMultiSessionFinances(rawData);

    const updatedFinances = getMultiSessionFinances();
    setStudent({
      feeStatus: updatedFinances.isFullyClearedAllSessions 
        ? '100% Cleared (All Sessions)' 
        : (updatedFinances.hasPreviousSessionDebt 
            ? `Arrears Active (₦${updatedFinances.previousSessionArrears.toLocaleString('en-NG')} Debt)` 
            : `Current Session Active (₦${updatedFinances.currentSessionPaid.toLocaleString('en-NG')} Paid)`)
    });

    return {
      success: true,
      paidCount: targetFees.length,
      totalAmount: totalAmount,
      receiptRef: batchTxRef,
      newTotals: updatedFinances
    };
  }

  function payPreviousSessionArrears(paymentMethod = 'UNILESA Student Wallet', customRef = null) {
    const fin = getMultiSessionFinances();
    const unpaidPrior = fin.previousSessionItems.map(i => i.id);
    if (unpaidPrior.length === 0) {
      return { success: false, message: 'No prior session arrears outstanding on this student account.' };
    }
    return payBatchFees(unpaidPrior, paymentMethod, customRef || 'BUR-ARR-CLEAR-' + Date.now().toString().slice(-6));
  }

  function payAllOutstandingFees(paymentMethod = 'UNILESA Student Wallet', customRef = null) {
    const fin = getMultiSessionFinances();
    const allUnpaid = [
      ...fin.previousSessionItems.map(i => i.id),
      ...fin.currentSessionUnpaidItems.map(i => i.id)
    ];
    if (allUnpaid.length === 0) {
      return { success: false, message: 'All institutional fee obligations across all academic sessions are already 100% cleared.' };
    }
    return payBatchFees(allUnpaid, paymentMethod, customRef || 'BUR-CONSOL-' + Date.now().toString().slice(-6));
  }

  function assessSessionArrears(matric, sessionKey, arrearsItem) {
    const rawData = (() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_MULTI_FINANCE);
        return saved ? JSON.parse(saved) : defaultMultiSessionFinances;
      } catch (e) {
        return defaultMultiSessionFinances;
      }
    })();

    let sess = rawData.sessions.find(s => s.key === sessionKey);
    if (!sess) {
      sess = {
        key: sessionKey,
        title: `${sessionKey} Academic Session`,
        level: 'Prior Academic Record',
        isCurrent: false,
        hasArrears: true,
        fees: []
      };
      rawData.sessions.unshift(sess);
    }

    const newItem = {
      id: arrearsItem.id || 'arr_' + Date.now(),
      code: arrearsItem.code || 'ARR-BUR',
      name: arrearsItem.name || 'Prior Session Bursary Debit Assessment',
      category: arrearsItem.category || 'sundry',
      amount: parseFloat(arrearsItem.amount) || 0,
      sessionKey: sessionKey,
      sessionTitle: `${sessionKey} Session`,
      semester: arrearsItem.semester || 'Second Semester',
      paid: false,
      mandatory: true,
      statusText: 'OUTSTANDING ARREARS',
      description: arrearsItem.description || 'Assessed prior academic session obligation.'
    };

    sess.fees.push(newItem);
    sess.hasArrears = true;
    setMultiSessionFinances(rawData);

    return { success: true, item: newItem, finances: getMultiSessionFinances() };
  }

  function waiveSessionArrears(matric, sessionKey, feeId, reason = 'Bursar Executive Authorization') {
    const rawData = (() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_MULTI_FINANCE);
        return saved ? JSON.parse(saved) : defaultMultiSessionFinances;
      } catch (e) {
        return defaultMultiSessionFinances;
      }
    })();

    for (const sess of rawData.sessions) {
      if (sess.key === sessionKey || !sessionKey) {
        const found = (sess.fees || []).find(f => f.id === feeId);
        if (found) {
          found.paid = true;
          found.paidDate = new Date().toLocaleDateString('en-GB') + ' (Official Waiver)';
          found.receiptRef = 'BUR-WAIVE-' + Math.floor(10000 + Math.random() * 90000);
          found.statusText = `WAIVED BY BURSAR • ${reason}`;
          found.method = 'Official Senate/Bursary Waiver';
          setMultiSessionFinances(rawData);
          return { success: true, fee: found, finances: getMultiSessionFinances() };
        }
      }
    }
    return { success: false, message: 'Fee item not found' };
  }

  function resetFinanceData() {
    localStorage.removeItem(STORAGE_KEY_MULTI_FINANCE);
    window.dispatchEvent(new CustomEvent('unilesa:finances-updated', { detail: defaultMultiSessionFinances }));
    return getMultiSessionFinances();
  }

  function getFinancialLedger() {
    const fin = getMultiSessionFinances();
    const wallet = getWallet();
    const ledger = [];

    // Add paid fee records across all sessions
    (fin.sessions || []).forEach(sess => {
      (sess.fees || []).forEach(fee => {
        if (fee.paid) {
          ledger.push({
            id: fee.id || 'fee_' + Math.random(),
            ref: fee.receiptRef || 'UNL-REC-' + Math.floor(100000 + Math.random() * 900000),
            session: sess.key,
            sessionTitle: sess.title,
            isArrears: !sess.isCurrent,
            title: fee.name,
            description: `${fee.name} [${sess.title}]`,
            category: fee.category || 'tuition',
            amount: parseFloat(fee.amount) || 0,
            method: fee.method || 'Direct Institutional Remittance',
            date: fee.paidDate || 'Settled',
            status: 'Settled',
            type: 'payment'
          });
        }
      });
    });

    // Add wallet transactions (especially deposits)
    (wallet.transactions || []).forEach(tx => {
      if (tx.type === 'deposit' || !ledger.some(l => l.ref === tx.ref)) {
        ledger.push({
          id: tx.id || 'tx_' + Math.random(),
          ref: tx.ref || 'WAL-' + Math.floor(100000 + Math.random() * 900000),
          session: tx.sessionKey || fin.currentSessionKey,
          sessionTitle: tx.sessionKey === '2024/2025' ? '2024/2025 Academic Session' : '2025/2026 Academic Session',
          isArrears: tx.sessionKey === '2024/2025',
          title: tx.description || (tx.type === 'deposit' ? 'Student Wallet Top-up' : 'Fee Payment'),
          description: tx.description || 'Wallet Transaction',
          category: tx.type === 'deposit' ? 'deposit' : 'wallet',
          amount: parseFloat(tx.amount) || 0,
          method: tx.method || 'UNILESA Student Wallet',
          date: tx.date || new Date().toLocaleDateString('en-GB'),
          status: tx.status || 'Completed',
          type: tx.type || 'payment'
        });
      }
    });

    return ledger;
  }

  const defaultAuditStudents = [
    {
      matricNumber: 'UNILESA/2026/CSC/0142',
      jambRegNo: '202610948211EF',
      fullName: 'Jane Adaeze Doe',
      department: 'Computer Science',
      faculty: 'Faculty of Science & Computing',
      level: '100 Level',
      session: '2025/2026 Academic Session',
      semester: 'First Semester',
      status: 'Arrears Flagged (Prior Session Debt: ₦35,000)',
      totalSessionFee: 249500,
      totalPaid: 235000,
      previousSessionArrears: 35000,
      previousSessionTitle: '2024/2025 Academic Session',
      pendingSundry: 14500,
      totalConsolidatedDebt: 49500,
      walletBalance: 35000,
      isCleared: false,
      clearanceDate: 'Blocked — 2024/2025 Arrears Pending',
      receipts: [
        { ref: 'REM-881920-TUI', session: '2025/2026', name: '100L First Semester Tuition (60% Split)', amount: 185000, method: 'Remita Gateway (Debit Card)', date: '18 Oct 2024, 09:42 AM', status: 'Settled' },
        { ref: 'WAL-991823-ICT', session: '2025/2026', name: 'ICT Directorate Technological Levy', amount: 10000, method: 'UNILESA Student Wallet', date: '21 Oct 2024, 02:30 PM', status: 'Settled' },
        { ref: 'WAL-991824-MED', session: '2025/2026', name: 'University Health & TISHIP Insurance', amount: 6000, method: 'UNILESA Student Wallet', date: '21 Oct 2024, 02:45 PM', status: 'Settled' },
        { ref: 'REM-883910-MOR', session: '2025/2026', name: 'Hostel Accommodation (Moremi Hall)', amount: 40000, method: 'Remita Gateway (Bank Branch)', date: '22 Oct 2024, 11:20 AM', status: 'Settled' },
        { ref: 'ARR-TUI-2024', session: '2024/2025', name: '2024/2025 Second Semester Tuition (Carried Forward)', amount: 25000, method: 'Pending Arrears Clearance', date: 'Prior Session Arrears', status: 'Unpaid' },
        { ref: 'ARR-LAB-2024', session: '2024/2025', name: '2024/2025 Faculty Lab Equipment Due', amount: 6000, method: 'Pending Arrears Clearance', date: 'Prior Session Arrears', status: 'Unpaid' },
        { ref: 'ARR-SUG-2024', session: '2024/2025', name: '2024/2025 SUG Statutory Due Arrears', amount: 4000, method: 'Pending Arrears Clearance', date: 'Prior Session Arrears', status: 'Unpaid' },
        { ref: 'SND-NACOS-DUE', session: '2025/2026', name: 'NACOS Departmental Association Due', amount: 5000, method: 'Pending Wallet Settlement', date: 'Current Pending', status: 'Unpaid' }
      ]
    },
    {
      matricNumber: 'UNILESA/2026/CSC/0088',
      jambRegNo: '202610849201AB',
      fullName: 'Babatunde Olawale Adeleke',
      department: 'Computer Science',
      faculty: 'Faculty of Science & Computing',
      level: '100 Level',
      session: '2025/2026 Academic Session',
      semester: 'First Semester',
      status: 'Partially Cleared (60%)',
      totalSessionFee: 249500,
      totalPaid: 185000,
      previousSessionArrears: 0,
      previousSessionTitle: '2024/2025 (Clean Record)',
      pendingSundry: 24500,
      totalConsolidatedDebt: 24500,
      walletBalance: 12000,
      isCleared: true,
      clearanceDate: '29 Sep 2026',
      receipts: [
        { ref: 'REM-772911-TUI', session: '2025/2026', name: '100L First Semester Tuition (60% Split)', amount: 185000, method: 'Remita Gateway (Bank Transfer)', date: '19 Oct 2024, 10:15 AM', status: 'Settled' }
      ]
    },
    {
      matricNumber: 'UNILESA/2026/CYB/0023',
      jambRegNo: '202610447291CD',
      fullName: 'Amina Fatima Yusuf',
      department: 'Cyber Security',
      faculty: 'Faculty of Science & Computing',
      level: '100 Level',
      session: '2025/2026 Academic Session',
      semester: 'First Semester',
      status: 'Full Session 100% Cleared (Zero Arrears)',
      totalSessionFee: 308000,
      totalPaid: 308000,
      previousSessionArrears: 0,
      previousSessionTitle: '2024/2025 (100% Settled)',
      pendingSundry: 0,
      totalConsolidatedDebt: 0,
      walletBalance: 50000,
      isCleared: true,
      clearanceDate: '15 Oct 2026',
      receipts: [
        { ref: 'REM-554109-FULL', session: '2025/2026', name: 'Full Session Tuition & All Statutory Dues', amount: 308000, method: 'Remita Gateway (Online Card)', date: '15 Oct 2024, 08:30 AM', status: 'Settled' }
      ]
    },
    {
      matricNumber: 'UNILESA/2026/SWE/0055',
      jambRegNo: '202610772901GH',
      fullName: 'Chukwuemeka Kingsley Obi',
      department: 'Software Engineering',
      faculty: 'Faculty of Science & Computing',
      level: '100 Level',
      session: '2025/2026 Academic Session',
      semester: 'First Semester',
      status: 'Critical Action Required (Arrears: ₦58,000)',
      totalSessionFee: 249500,
      totalPaid: 110000,
      previousSessionArrears: 58000,
      previousSessionTitle: '2024/2025 Academic Session',
      pendingSundry: 35000,
      totalConsolidatedDebt: 93000,
      walletBalance: 2500,
      isCleared: false,
      clearanceDate: 'Unissued (Prior Arrears & Low Clearance)',
      receipts: [
        { ref: 'REM-331902-TR1', session: '2025/2026', name: '3-Tier Installment (Tranche 1)', amount: 110000, method: 'Remita Gateway', date: '20 Oct 2024, 03:10 PM', status: 'Settled' }
      ]
    }
  ];

  function getAuditStudents() {
    return defaultAuditStudents;
  }

  function fundWallet(amount, method = 'Card / Transfer', ref = null) {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return { success: false, message: 'Invalid deposit amount' };
    }

    const current = getWallet();
    const txRef = ref || 'DEP-' + Math.floor(100000 + Math.random() * 900000);
    const newTx = {
      id: 'TXW-' + Math.floor(10000 + Math.random() * 90000),
      type: 'deposit',
      method: method,
      amount: numAmount,
      description: `Wallet Top-up via ${method}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      status: 'Completed',
      ref: txRef
    };

    const updated = {
      ...current,
      balance: current.balance + numAmount,
      totalDeposited: (current.totalDeposited || 0) + numAmount,
      transactions: [newTx, ...(current.transactions || [])]
    };

    setWallet(updated);
    return { success: true, newBalance: updated.balance, transaction: newTx };
  }

  function payWithWallet(feeName, amount, feeRef = null) {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return { success: false, message: 'Invalid fee amount' };
    }

    const current = getWallet();
    if (current.balance < numAmount) {
      return { 
        success: false, 
        message: `Insufficient wallet balance (₦${current.balance.toLocaleString('en-NG', {minimumFractionDigits:2})}). Please fund your wallet to proceed.` 
      };
    }

    const txRef = feeRef || 'FEE-WAL-' + Math.floor(100000 + Math.random() * 900000);
    const newTx = {
      id: 'TXW-' + Math.floor(10000 + Math.random() * 90000),
      type: 'payment',
      method: 'UNILESA Student Wallet',
      amount: numAmount,
      description: `Payment for ${feeName}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      status: 'Completed',
      ref: txRef
    };

    const updated = {
      ...current,
      balance: current.balance - numAmount,
      totalSpentOnFees: (current.totalSpentOnFees || 0) + numAmount,
      transactions: [newTx, ...(current.transactions || [])]
    };

    setWallet(updated);
    return { success: true, newBalance: updated.balance, transaction: newTx };
  }

  function getNotifications() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_NOTIFS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read notifications from localStorage:', e);
    }
    return defaultNotifications;
  }

  function setNotifications(notifs) {
    try {
      localStorage.setItem(STORAGE_KEY_NOTIFS, JSON.stringify(notifs));
      window.dispatchEvent(new CustomEvent('unilesa:notifs-updated', { detail: notifs }));
    } catch (e) {
      console.error('Failed to save notifications:', e);
    }
  }

  const STORAGE_KEY_COURSES = 'unilesa_student_courses';

  const defaultCourseCatalog = {
    'First Semester': [
      // 100 Level First Semester
      {
        id: 'CSC101',
        code: 'CSC 101',
        title: 'Introduction to Computer Science & Problem Solving',
        units: 3,
        level: '100 Level',
        type: 'Core',
        category: 'departmental',
        compulsory: true,
        lecturer: 'Dr. A. O. Babalola',
        venue: 'ICT Lecture Hall 1',
        schedule: 'Mon 08:00 AM - 10:00 AM • Wed 02:00 PM - 04:00 PM (Lab)',
        prerequisite: 'None',
        description: 'History and evolution of computing, algorithms, problem decomposition, number systems, and basic IT architecture.'
      },
      {
        id: 'CSC103',
        code: 'CSC 103',
        title: 'Programming Methodology I (Python)',
        units: 3,
        level: '100 Level',
        type: 'Core',
        category: 'departmental',
        compulsory: true,
        lecturer: 'Dr. M. K. Alabi',
        venue: 'Software Engineering Lab 3',
        schedule: 'Tue 10:00 AM - 12:00 PM • Thu 10:00 AM - 12:00 PM (Lab)',
        prerequisite: 'None',
        description: 'Structured programming fundamentals using Python: data structures, control flow, functions, file I/O, and recursion.'
      },
      {
        id: 'MAT101',
        code: 'MAT 101',
        title: 'General Mathematics I (Algebra & Trigonometry)',
        units: 3,
        level: '100 Level',
        type: 'Core',
        category: 'faculty',
        compulsory: true,
        lecturer: 'Prof. E. T. Oloyede',
        venue: 'ETF 750 Auditorium',
        schedule: 'Mon 10:00 AM - 12:00 PM • Fri 08:00 AM - 10:00 AM',
        prerequisite: 'O-Level Mathematics',
        description: 'Set theory, functions, quadratic equations, mathematical induction, binomial theorem, trigonometric identities.'
      },
      {
        id: 'PHY101',
        code: 'PHY 101',
        title: 'General Physics I (Mechanics, Thermal & Waves)',
        units: 3,
        level: '100 Level',
        type: 'Core',
        category: 'faculty',
        compulsory: true,
        lecturer: 'Dr. S. I. Adeyemi',
        venue: 'Faculty of Science LT 2',
        schedule: 'Wed 08:00 AM - 10:00 AM • Thu 08:00 AM - 10:00 AM',
        prerequisite: 'O-Level Physics',
        description: 'Vectors, kinematics, Newton’s laws of motion, work-energy theorem, circular motion, simple harmonic motion, fluid mechanics.'
      },
      {
        id: 'PHY107',
        code: 'PHY 107',
        title: 'General Physics Practical I',
        units: 1,
        level: '100 Level',
        type: 'Core',
        category: 'faculty',
        compulsory: true,
        lecturer: 'Mr. T. A. Adeleke',
        venue: 'Central Physics Laboratory',
        schedule: 'Fri 02:00 PM - 05:00 PM (Lab)',
        prerequisite: 'Co-requisite: PHY 101',
        description: 'Hands-on practical laboratory experiments verifying physical constants, mechanics principles, and error analysis.'
      },
      {
        id: 'GST101',
        code: 'GST 101',
        title: 'Communication in English I',
        units: 2,
        level: '100 Level',
        type: 'GST',
        category: 'university',
        compulsory: true,
        lecturer: 'Dr. (Mrs) F. A. Ogundele',
        venue: 'University Main Auditorium',
        schedule: 'Tue 08:00 AM - 10:00 AM',
        prerequisite: 'None',
        description: 'Logical writing, comprehension techniques, academic essay structuring, vocabulary building, and speech phonetics.'
      },
      {
        id: 'GST103',
        code: 'GST 103',
        title: 'Nigerian Peoples and Culture',
        units: 2,
        level: '100 Level',
        type: 'GST',
        category: 'university',
        compulsory: true,
        lecturer: 'Dr. K. O. Famakinwa',
        venue: 'Arts Lecture Theatre 1',
        schedule: 'Thu 02:00 PM - 04:00 PM',
        prerequisite: 'None',
        description: 'Historical heritage of Nigeria, cultural evolution, socio-political structures, citizenship ethics, and national unity.'
      },
      {
        id: 'GST105',
        code: 'GST 105',
        title: 'Use of Library, Study Skills & ICT',
        units: 2,
        level: '100 Level',
        type: 'GST',
        category: 'university',
        compulsory: true,
        lecturer: 'Mrs. B. O. Adeleke (University Librarian)',
        venue: 'University E-Library Complex',
        schedule: 'Wed 11:00 AM - 01:00 PM',
        prerequisite: 'None',
        description: 'Cataloguing systems, Boolean research queries, intellectual property, citation standards (APA/IEEE), and digital archival retrieval.'
      },
      {
        id: 'STA101',
        code: 'STA 101',
        title: 'Descriptive Statistics & Probability I',
        units: 2,
        level: '100 Level',
        type: 'Elective',
        category: 'elective',
        compulsory: false,
        lecturer: 'Dr. B. J. Ajayi',
        venue: 'Mathematical Sciences Room 12',
        schedule: 'Mon 02:00 PM - 04:00 PM',
        prerequisite: 'None',
        description: 'Measures of central tendency, dispersion, probability axioms, permutations, combinations, and frequency distributions.'
      },
      {
        id: 'CHM101',
        code: 'CHM 101',
        title: 'General Chemistry I (Physical & Inorganic)',
        units: 3,
        level: '100 Level',
        type: 'Elective',
        category: 'elective',
        compulsory: false,
        lecturer: 'Dr. O. P. Fakorede',
        venue: 'Chemical Sciences LT 1',
        schedule: 'Tue 02:00 PM - 04:00 PM • Fri 10:00 AM - 11:00 AM',
        prerequisite: 'O-Level Chemistry',
        description: 'Atomic structure, periodic table trends, stoichiometry, chemical bonding, gas laws, and thermochemistry.'
      },
      {
        id: 'ENT101',
        code: 'ENT 101',
        title: 'Foundations of Entrepreneurship & Innovation',
        units: 2,
        level: '100 Level',
        type: 'Elective',
        category: 'elective',
        compulsory: false,
        lecturer: 'UNILESA Entrepreneurship Centre',
        venue: 'Centre for Innovation & Enterprise',
        schedule: 'Fri 11:00 AM - 01:00 PM',
        prerequisite: 'None',
        description: 'Venture ideation, business model canvas, market validation, bootstrapping, and intellectual property basics in Nigeria.'
      },

      // 200 Level First Semester
      {
        id: 'CSC201',
        code: 'CSC 201',
        title: 'Computer Programming I (Object Oriented Java)',
        units: 3,
        level: '200 Level',
        type: 'Core',
        category: 'departmental',
        compulsory: true,
        lecturer: 'Dr. A. O. Babalola',
        venue: 'Hardware Architecture Lab',
        schedule: 'Mon 10:00 AM - 12:00 PM • Wed 10:00 AM - 12:00 PM (Lab)',
        prerequisite: 'CSC 103',
        description: 'Object-oriented paradigm in Java, classes, inheritance, polymorphism, encapsulation, exception handling, and GUI development.'
      },
      {
        id: 'CSC203',
        code: 'CSC 203',
        title: 'Foundations of Data Structures & Algorithms',
        units: 3,
        level: '200 Level',
        type: 'Core',
        category: 'departmental',
        compulsory: true,
        lecturer: 'Dr. M. K. Alabi',
        venue: 'Software Engineering Lab 3',
        schedule: 'Tue 08:00 AM - 10:00 AM • Thu 02:00 PM - 04:00 PM',
        prerequisite: 'CSC 104',
        description: 'Abstract data types, stacks, queues, linked lists, binary search trees, hash tables, asymptotic notation, and sorting algorithms.'
      },
      {
        id: 'CSC205',
        code: 'CSC 205',
        title: 'Operating Systems Principles & Concurrency',
        units: 3,
        level: '200 Level',
        type: 'Core',
        category: 'departmental',
        compulsory: true,
        lecturer: 'Engr. D. O. Falade',
        venue: 'Faculty of Science LT 1',
        schedule: 'Wed 08:00 AM - 10:00 AM • Fri 10:00 AM - 12:00 PM',
        prerequisite: 'CSC 102',
        description: 'Process management, multithreading, CPU scheduling algorithms, deadlock detection and avoidance, virtual memory, and file systems.'
      },
      {
        id: 'MAT201',
        code: 'MAT 201',
        title: 'Linear Algebra I & Numerical Methods',
        units: 3,
        level: '200 Level',
        type: 'Core',
        category: 'faculty',
        compulsory: true,
        lecturer: 'Prof. E. T. Oloyede',
        venue: 'ETF 750 Auditorium',
        schedule: 'Mon 02:00 PM - 04:00 PM • Thu 10:00 AM - 12:00 PM',
        prerequisite: 'MAT 101',
        description: 'Vector spaces, linear transformations, matrices, determinants, eigenvalues, eigenvectors, and Gaussian elimination.'
      },
      {
        id: 'GST201',
        code: 'GST 201',
        title: 'Peace Studies and Conflict Resolution II',
        units: 2,
        level: '200 Level',
        type: 'GST',
        category: 'university',
        compulsory: true,
        lecturer: 'Prof. J. A. Kolawole',
        venue: 'University Main Auditorium',
        schedule: 'Tue 02:00 PM - 04:00 PM',
        prerequisite: 'GST 106',
        description: 'Advanced mediation frameworks, communal conflict management, restorative justice, human rights instruments, and peace accords.'
      },
      {
        id: 'ENT201',
        code: 'ENT 201',
        title: 'Entrepreneurship & Innovation Clinic I',
        units: 2,
        level: '200 Level',
        type: 'Elective',
        category: 'elective',
        compulsory: false,
        lecturer: 'UNILESA Enterprise Hub',
        venue: 'Centre for Innovation',
        schedule: 'Thu 08:00 AM - 10:00 AM',
        prerequisite: 'ENT 101',
        description: 'Business pitching, financial forecasting, prototype modeling, regulatory compliance, and market testing.'
      },

      // 300 Level First Semester
      {
        id: 'CSC301',
        code: 'CSC 301',
        title: 'Structured Systems Analysis & Object-Oriented Design',
        units: 3,
        level: '300 Level',
        type: 'Core',
        category: 'departmental',
        compulsory: true,
        lecturer: 'Dr. A. O. Babalola',
        venue: 'ICT Lecture Hall 2',
        schedule: 'Mon 08:00 AM - 10:00 AM • Wed 10:00 AM - 12:00 PM',
        prerequisite: 'CSC 204',
        description: 'SDLC models, Agile/Scrum methodologies, UML diagramming, requirements engineering, architectural patterns, and CASE tools.'
      },
      {
        id: 'CSC303',
        code: 'CSC 303',
        title: 'Automata Theory, Computability & Formal Languages',
        units: 3,
        level: '300 Level',
        type: 'Core',
        category: 'departmental',
        compulsory: true,
        lecturer: 'Dr. M. K. Alabi',
        venue: 'Computer Science Seminar Room',
        schedule: 'Tue 10:00 AM - 12:00 PM • Thu 10:00 AM - 12:00 PM',
        prerequisite: 'MAT 201',
        description: 'Deterministic and non-deterministic finite automata, regular expressions, context-free grammars, pushdown automata, and Turing machines.'
      },
      {
        id: 'CSC305',
        code: 'CSC 305',
        title: 'Data Communications & Computer Networking Protocols',
        units: 3,
        level: '300 Level',
        type: 'Core',
        category: 'departmental',
        compulsory: true,
        lecturer: 'Engr. D. O. Falade',
        venue: 'Cisco Networking Academy Lab',
        schedule: 'Wed 02:00 PM - 05:00 PM (Lab)',
        prerequisite: 'CSC 205',
        description: 'OSI and TCP/IP stack, packet routing protocols (OSPF, BGP), subnetting, socket programming, Wireshark packet analysis, and DNS architecture.'
      },
      {
        id: 'CSC309',
        code: 'CSC 309',
        title: 'Artificial Intelligence & Heuristic Algorithms',
        units: 3,
        level: '300 Level',
        type: 'Core',
        category: 'departmental',
        compulsory: true,
        lecturer: 'Dr. B. J. Ajayi',
        venue: 'AI & Data Science Lab',
        schedule: 'Fri 08:00 AM - 11:00 AM',
        prerequisite: 'CSC 203',
        description: 'State space search, A* search, adversarial minimax game trees, knowledge representation, expert systems, and fuzzy logic.'
      },
      {
        id: 'CSC313',
        code: 'CSC 313',
        title: 'Cybersecurity Fundamentals & Cryptographic Systems',
        units: 2,
        level: '300 Level',
        type: 'Elective',
        category: 'elective',
        compulsory: false,
        lecturer: 'Dr. O. P. Fakorede',
        venue: 'Cyber Security Lab 1',
        schedule: 'Mon 02:00 PM - 04:00 PM',
        prerequisite: 'CSC 205',
        description: 'Symmetric and asymmetric encryption (AES, RSA), hashing algorithms, PKI infrastructure, ethical penetration testing, and zero trust models.'
      },

      // 400 Level First Semester
      {
        id: 'CSC401',
        code: 'CSC 401',
        title: 'Software Engineering Project Management & QA',
        units: 3,
        level: '400 Level',
        type: 'Core',
        category: 'departmental',
        compulsory: true,
        lecturer: 'Dr. A. O. Babalola',
        venue: 'Faculty of Science LT 1',
        schedule: 'Mon 10:00 AM - 01:00 PM',
        prerequisite: 'CSC 301',
        description: 'Estimation models (COCOMO), risk management, automated CI/CD pipelines, unit/integration testing (Jest, JUnit), code coverage, and ISO 9000.'
      },
      {
        id: 'CSC403',
        code: 'CSC 403',
        title: 'Compiler Construction & Parsing Techniques',
        units: 3,
        level: '400 Level',
        type: 'Core',
        category: 'departmental',
        compulsory: true,
        lecturer: 'Dr. M. K. Alabi',
        venue: 'Computer Science Postgrad Room',
        schedule: 'Tue 08:00 AM - 11:00 AM',
        prerequisite: 'CSC 303',
        description: 'Lexical analysis (Lex/Flex), LL and LR parsing (Yacc/Bison), syntax-directed translation, symbol table management, code optimization, and LLVM.'
      },
      {
        id: 'CSC405',
        code: 'CSC 405',
        title: 'Distributed Systems & High-Performance Computing',
        units: 3,
        level: '400 Level',
        type: 'Core',
        category: 'departmental',
        compulsory: true,
        lecturer: 'Engr. D. O. Falade',
        venue: 'Cloud Computing Lab',
        schedule: 'Wed 10:00 AM - 01:00 PM',
        prerequisite: 'CSC 305',
        description: 'RPC, message brokers (Kafka, RabbitMQ), consensus algorithms (Raft, Paxos), CAP theorem, distributed databases, and MPI/CUDA computing.'
      },
      {
        id: 'CSC407',
        code: 'CSC 407',
        title: 'Machine Learning, Deep Learning & Computer Vision',
        units: 3,
        level: '400 Level',
        type: 'Core',
        category: 'departmental',
        compulsory: true,
        lecturer: 'Dr. B. J. Ajayi',
        venue: 'AI & Data Science Lab',
        schedule: 'Thu 02:00 PM - 05:00 PM',
        prerequisite: 'CSC 309',
        description: 'Supervised and unsupervised learning, CNNs, Transformers, backpropagation, PyTorch, image classification, and transfer learning.'
      },
      {
        id: 'CSC497',
        code: 'CSC 497',
        title: 'Final Year Research Seminar & Proposal Defense',
        units: 2,
        level: '400 Level',
        type: 'Core',
        category: 'departmental',
        compulsory: true,
        lecturer: 'Departmental Project Committee',
        venue: 'Faculty Conference Hall',
        schedule: 'Fri 09:00 AM - 01:00 PM',
        prerequisite: 'Final Year Standing',
        description: 'Literature review formulation, methodology design, ethics review, proposal drafting, and formal oral defense before academic panel.'
      },

      // 500 Level First Semester
      {
        id: 'CSC501',
        code: 'CSC 501',
        title: 'Advanced Machine Learning & Autonomous Agents',
        units: 3,
        level: '500 Level',
        type: 'Core',
        category: 'departmental',
        compulsory: true,
        lecturer: 'Prof. J. A. Kolawole',
        venue: 'Advanced Research Lab',
        schedule: 'Mon 02:00 PM - 05:00 PM',
        prerequisite: 'CSC 407',
        description: 'Reinforcement learning, multi-agent coordination, autonomous decision pipelines, policy gradients, and generative models.'
      },
      {
        id: 'CSC503',
        code: 'CSC 503',
        title: 'Quantum Computing & Post-Quantum Cryptography',
        units: 3,
        level: '500 Level',
        type: 'Core',
        category: 'departmental',
        compulsory: true,
        lecturer: 'Dr. O. P. Fakorede',
        venue: 'Advanced Research Lab',
        schedule: 'Wed 08:00 AM - 11:00 AM',
        prerequisite: 'CSC 405',
        description: 'Qubits, quantum superposition, entanglement, Shor’s algorithm, Grover’s search, and lattice-based post-quantum cryptographic primitives.'
      }
    ],

    'Second Semester': [
      // 100 Level Second Semester
      {
        id: 'CSC102',
        code: 'CSC 102',
        title: 'Computer Hardware Fundamentals & Logic Circuits',
        units: 3,
        level: '100 Level',
        type: 'Core',
        category: 'departmental',
        compulsory: true,
        lecturer: 'Dr. A. O. Babalola',
        venue: 'Hardware Architecture Lab',
        schedule: 'Mon 08:00 AM - 10:00 AM • Wed 02:00 PM - 04:00 PM (Lab)',
        prerequisite: 'CSC 101',
        description: 'Boolean algebra, logic gates, combinational logic, flip-flops, registers, CPU architecture, and bus interconnects.'
      },
      {
        id: 'CSC104',
        code: 'CSC 104',
        title: 'Programming Methodology II (Data Structures in C++)',
        units: 3,
        level: '100 Level',
        type: 'Core',
        category: 'departmental',
        compulsory: true,
        lecturer: 'Dr. M. K. Alabi',
        venue: 'Software Engineering Lab 3',
        schedule: 'Tue 10:00 AM - 12:00 PM • Thu 10:00 AM - 12:00 PM',
        prerequisite: 'CSC 103',
        description: 'Object-oriented programming, memory management, pointers, linked lists, stacks, queues, and tree traversal in C++.'
      },
      {
        id: 'MAT102',
        code: 'MAT 102',
        title: 'General Mathematics II (Calculus & Vectors)',
        units: 3,
        level: '100 Level',
        type: 'Core',
        category: 'faculty',
        compulsory: true,
        lecturer: 'Prof. E. T. Oloyede',
        venue: 'ETF 750 Auditorium',
        schedule: 'Mon 10:00 AM - 12:00 PM • Fri 08:00 AM - 10:00 AM',
        prerequisite: 'MAT 101',
        description: 'Differential and integral calculus, limits, continuity, Taylor series, vector calculus, dot and cross products.'
      },
      {
        id: 'PHY102',
        code: 'PHY 102',
        title: 'General Physics II (Electricity & Magnetism)',
        units: 3,
        level: '100 Level',
        type: 'Core',
        category: 'faculty',
        compulsory: true,
        lecturer: 'Dr. S. I. Adeyemi',
        venue: 'Faculty of Science LT 2',
        schedule: 'Wed 08:00 AM - 10:00 AM • Thu 08:00 AM - 10:00 AM',
        prerequisite: 'PHY 101',
        description: 'Coulomb’s law, electric fields, Gauss’s law, capacitance, DC circuits, magnetic fields, electromagnetic induction.'
      },
      {
        id: 'PHY108',
        code: 'PHY 108',
        title: 'General Physics Practical II',
        units: 1,
        level: '100 Level',
        type: 'Core',
        category: 'faculty',
        compulsory: true,
        lecturer: 'Mr. T. A. Adeleke',
        venue: 'Central Physics Laboratory',
        schedule: 'Fri 02:00 PM - 05:00 PM (Lab)',
        prerequisite: 'PHY 107',
        description: 'Experimental investigation of electrical circuits, potentiometer measurements, lenses, and magnetic deflection.'
      },
      {
        id: 'GST102',
        code: 'GST 102',
        title: 'Communication in English II',
        units: 2,
        level: '100 Level',
        type: 'GST',
        category: 'university',
        compulsory: true,
        lecturer: 'Dr. (Mrs) F. A. Ogundele',
        venue: 'University Main Auditorium',
        schedule: 'Tue 08:00 AM - 10:00 AM',
        prerequisite: 'GST 101',
        description: 'Technical report writing, research methodologies, seminar presentations, public speaking, and speech delivery.'
      },
      {
        id: 'GST104',
        code: 'GST 104',
        title: 'Philosophy, Logic & Human Existence',
        units: 2,
        level: '100 Level',
        type: 'GST',
        category: 'university',
        compulsory: true,
        lecturer: 'Dr. E. O. Oladipo',
        venue: 'Arts Lecture Theatre 1',
        schedule: 'Thu 02:00 PM - 04:00 PM',
        prerequisite: 'None',
        description: 'Epistemology, symbolic logic, fallacies of reasoning, existentialism, morality, and ethical dilemmas in society.'
      },
      {
        id: 'GST106',
        code: 'GST 106',
        title: 'Peace & Conflict Resolution Studies',
        units: 2,
        level: '100 Level',
        type: 'GST',
        category: 'university',
        compulsory: true,
        lecturer: 'Prof. J. A. Kolawole',
        venue: 'University Main Auditorium',
        schedule: 'Wed 11:00 AM - 01:00 PM',
        prerequisite: 'None',
        description: 'Root causes of conflicts, negotiation models, mediation tactics, peace building frameworks, and global diplomacy.'
      },
      {
        id: 'STA102',
        code: 'STA 102',
        title: 'Inferential Statistics & Hypothesis Testing',
        units: 2,
        level: '100 Level',
        type: 'Elective',
        category: 'elective',
        compulsory: false,
        lecturer: 'Dr. B. J. Ajayi',
        venue: 'Mathematical Sciences Room 12',
        schedule: 'Mon 02:00 PM - 04:00 PM',
        prerequisite: 'STA 101',
        description: 'Sampling distributions, central limit theorem, hypothesis testing (Z-test, T-test, Chi-square), and regression analysis.'
      },
      {
        id: 'CSC108',
        code: 'CSC 108',
        title: 'Web Technologies & Frontend Engineering',
        units: 2,
        level: '100 Level',
        type: 'Elective',
        category: 'elective',
        compulsory: false,
        lecturer: 'Engr. D. O. Falade',
        venue: 'ICT Innovation Lab 1',
        schedule: 'Fri 11:00 AM - 01:00 PM',
        prerequisite: 'CSC 101',
        description: 'DOM manipulation, responsive design principles, modern CSS architectures, JavaScript ES6+, and API consumption.'
      },

      // 200 Level Second Semester
      {
        id: 'CSC202',
        code: 'CSC 202',
        title: 'Computer Organization, Architecture & Assembly',
        units: 3,
        level: '200 Level',
        type: 'Core',
        category: 'departmental',
        compulsory: true,
        lecturer: 'Dr. A. O. Babalola',
        venue: 'Hardware Lab 2',
        schedule: 'Mon 08:00 AM - 10:00 AM • Wed 08:00 AM - 10:00 AM',
        prerequisite: 'CSC 102',
        description: 'Instruction set architecture (MIPS/x86), ALU design, microprogramming, memory hierarchy (cache, RAM), and pipelining.'
      },
      {
        id: 'CSC204',
        code: 'CSC 204',
        title: 'Object-Oriented Software Engineering & Design Patterns',
        units: 3,
        level: '200 Level',
        type: 'Core',
        category: 'departmental',
        compulsory: true,
        lecturer: 'Dr. M. K. Alabi',
        venue: 'Software Lab 3',
        schedule: 'Tue 10:00 AM - 12:00 PM • Thu 10:00 AM - 12:00 PM',
        prerequisite: 'CSC 201',
        description: 'SOLID principles, Gang of Four design patterns (Factory, Singleton, Observer, Strategy), refactoring, and test-driven development.'
      },
      {
        id: 'CSC206',
        code: 'CSC 206',
        title: 'Database Management Systems I (Relational / SQL)',
        units: 3,
        level: '200 Level',
        type: 'Core',
        category: 'departmental',
        compulsory: true,
        lecturer: 'Dr. B. J. Ajayi',
        venue: 'ICT Database Lab',
        schedule: 'Wed 02:00 PM - 05:00 PM (Lab)',
        prerequisite: 'CSC 103',
        description: 'Relational algebra, ER diagrams, normalization (1NF through BCNF), complex SQL queries, transactions (ACID), and indexing.'
      },
      {
        id: 'MAT202',
        code: 'MAT 202',
        title: 'Real Analysis & Multivariable Calculus',
        units: 3,
        level: '200 Level',
        type: 'Core',
        category: 'faculty',
        compulsory: true,
        lecturer: 'Prof. E. T. Oloyede',
        venue: 'ETF 750 Auditorium',
        schedule: 'Mon 10:00 AM - 12:00 PM • Fri 08:00 AM - 10:00 AM',
        prerequisite: 'MAT 102',
        description: 'Sequences, series convergence tests, partial derivatives, multiple integrals, Green’s theorem, Stokes’ theorem, and divergence theorem.'
      },
      {
        id: 'GST202',
        code: 'GST 202',
        title: 'General Agriculture, Food Security & Climate Action',
        units: 2,
        level: '200 Level',
        type: 'GST',
        category: 'university',
        compulsory: true,
        lecturer: 'Faculty of Agriculture',
        venue: 'University Main Auditorium',
        schedule: 'Thu 02:00 PM - 04:00 PM',
        prerequisite: 'None',
        description: 'Agronomy principles, livestock farming, sustainable soil conservation, post-harvest loss prevention, and climate smart agriculture.'
      },
      {
        id: 'CSC208',
        code: 'CSC 208',
        title: 'Mobile Application Development (Flutter / Kotlin)',
        units: 2,
        level: '200 Level',
        type: 'Elective',
        category: 'elective',
        compulsory: false,
        lecturer: 'Engr. D. O. Falade',
        venue: 'ICT Innovation Lab 2',
        schedule: 'Fri 02:00 PM - 04:00 PM',
        prerequisite: 'CSC 201',
        description: 'Cross-platform mobile frameworks, state management (Provider/Riverpod), REST integration, offline SQLite persistence, and UI lifecycles.'
      },

      // 300 Level Second Semester
      {
        id: 'CSC399',
        code: 'CSC 399',
        title: 'Students Industrial Work Experience Scheme (SIWES / 6-Month IT Attachment)',
        units: 6,
        level: '300 Level',
        type: 'Core',
        category: 'departmental',
        compulsory: true,
        lecturer: 'SIWES Directorate / Industry Supervisors',
        venue: 'Accredited Industry Placement',
        schedule: 'Mon - Fri Full Time (24 Weeks)',
        prerequisite: '300L First Semester Standing',
        description: 'Comprehensive 6-month supervised practical immersion in recognized IT corporations, engineering firms, or software hubs.'
      },
      {
        id: 'CSC302',
        code: 'CSC 302',
        title: 'Embedded Systems & Internet of Things (IoT) Engineering',
        units: 3,
        level: '300 Level',
        type: 'Elective',
        category: 'elective',
        compulsory: false,
        lecturer: 'Engr. D. O. Falade',
        venue: 'Embedded IoT Lab',
        schedule: 'Sat 09:00 AM - 12:00 PM',
        prerequisite: 'CSC 202',
        description: 'Microcontrollers (ESP32, Arduino, Raspberry Pi), sensor interfacing, MQTT communication protocols, and Edge computing.'
      },

      // 400 Level Second Semester
      {
        id: 'CSC499',
        code: 'CSC 499',
        title: 'Final Year Capstone Research Project & Software Defense',
        units: 6,
        level: '400 Level',
        type: 'Core',
        category: 'departmental',
        compulsory: true,
        lecturer: 'Assigned Academic Supervisor & External Examiner',
        venue: 'Faculty Conference Hall',
        schedule: 'Full Session Capstone Project',
        prerequisite: 'CSC 497',
        description: 'Individual research and full-stack software development addressing real-world problem, culminating in thesis dissertation and viva defense.'
      },
      {
        id: 'CSC402',
        code: 'CSC 402',
        title: 'Human-Computer Interaction & UX Architecture',
        units: 3,
        level: '400 Level',
        type: 'Core',
        category: 'departmental',
        compulsory: true,
        lecturer: 'Dr. A. O. Babalola',
        venue: 'Design Thinking Studio',
        schedule: 'Tue 10:00 AM - 01:00 PM',
        prerequisite: 'CSC 301',
        description: 'User-centered design principles, cognitive ergonomics, usability metrics, accessibility (WCAG 2.1), wireframing, and Figma prototyping.'
      },
      {
        id: 'CSC404',
        code: 'CSC 404',
        title: 'Cloud Native DevOps & Site Reliability Engineering',
        units: 3,
        level: '400 Level',
        type: 'Core',
        category: 'departmental',
        compulsory: true,
        lecturer: 'Engr. D. O. Falade',
        venue: 'Cloud DevOps Center',
        schedule: 'Wed 02:00 PM - 05:00 PM',
        prerequisite: 'CSC 405',
        description: 'Containerization with Docker, Kubernetes cluster orchestration, Terraform IaC, Prometheus/Grafana observability, and zero-downtime deployments.'
      },
      {
        id: 'CSC408',
        code: 'CSC 408',
        title: 'Natural Language Processing & Large Language Models',
        units: 3,
        level: '400 Level',
        type: 'Elective',
        category: 'elective',
        compulsory: false,
        lecturer: 'Dr. B. J. Ajayi',
        venue: 'AI Research Lab',
        schedule: 'Thu 10:00 AM - 01:00 PM',
        prerequisite: 'CSC 407',
        description: 'Tokenization, word embeddings (Word2Vec, BERT), attention mechanisms, RAG architectures, prompt engineering, and fine-tuning.'
      },

      // 500 Level Second Semester
      {
        id: 'CSC502',
        code: 'CSC 502',
        title: 'Advanced Neural Networks & Edge AI Systems',
        units: 3,
        level: '500 Level',
        type: 'Core',
        category: 'departmental',
        compulsory: true,
        lecturer: 'Prof. J. A. Kolawole',
        venue: 'Advanced AI Lab',
        schedule: 'Mon 09:00 AM - 12:00 PM',
        prerequisite: 'CSC 501',
        description: 'Model quantization, pruning, TinyML for embedded microcontrollers, ONNX runtime acceleration, and neuromorphic architectures.'
      },
      {
        id: 'CSC599',
        code: 'CSC 599',
        title: 'Post-Graduation Masters Thesis & Industrial Defense',
        units: 6,
        level: '500 Level',
        type: 'Core',
        category: 'departmental',
        compulsory: true,
        lecturer: 'Postgraduate Board & External Assessor',
        venue: 'Senate Chamber',
        schedule: 'Full Academic Term',
        prerequisite: '500L Standing',
        description: 'Original academic thesis contribution with peer-reviewed publication requirement in high-impact indexed journals.'
      }
    ]
  };

  const defaultCourseRegistrations = {
    'First Semester': {
      status: 'Approved', // 'Not Started', 'Draft', 'Submitted', 'Approved'
      submittedDate: '24 Oct 2026, 02:15 PM',
      approvedDate: '25 Oct 2026, 11:30 AM',
      approvedBy: 'Dr. A. O. Babalola (HOD, Computer Science)',
      levelAdvisor: 'Dr. M. K. Alabi',
      dean: 'Prof. O. J. Adebayo (Dean, Faculty of Science & Computing)',
      selectedCourseIds: ['CSC101', 'CSC103', 'MAT101', 'PHY101', 'PHY107', 'GST101', 'GST103', 'GST105', 'STA101'],
      totalUnits: 21,
      minUnits: 15,
      maxUnits: 24,
      bursaryCleared: true,
      barcode: 'UNL-CRF-2026-0142-S1'
    },
    'Second Semester': {
      status: 'Draft',
      submittedDate: null,
      approvedDate: null,
      approvedBy: null,
      levelAdvisor: 'Dr. M. K. Alabi',
      dean: 'Prof. O. J. Adebayo',
      selectedCourseIds: ['CSC102', 'CSC104', 'MAT102', 'PHY102', 'PHY108', 'GST102', 'GST104', 'GST106'],
      totalUnits: 19,
      minUnits: 15,
      maxUnits: 24,
      bursaryCleared: false,
      barcode: 'UNL-CRF-2026-0142-S2'
    }
  };

  const STORAGE_KEY_CATALOG = 'unilesa_course_catalog';

  function normalizeSemesterKey(key) {
    if (!key) return 'First Semester';
    const clean = String(key).trim().toLowerCase();
    if (clean.includes('second') || clean.includes('rain') || clean === '2' || clean === '2nd') {
      return 'Second Semester';
    }
    return 'First Semester';
  }

  function getCourseCatalog(semester = 'First Semester', levelFilter = null) {
    const semKey = normalizeSemesterKey(semester);
    let courses = [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CATALOG);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed[semKey] && Array.isArray(parsed[semKey])) courses = parsed[semKey];
        else if (semKey === 'First Semester' && parsed['First Term']) courses = parsed['First Term'];
        else if (semKey === 'Second Semester' && parsed['Second Term']) courses = parsed['Second Term'];
      }
    } catch (e) {
      console.warn('Could not read course catalog from localStorage:', e);
    }
    if (!courses || courses.length === 0) {
      courses = defaultCourseCatalog[semKey] || defaultCourseCatalog['First Semester'] || [];
    }

    // Guarantee each course has proper level field
    courses = courses.map(c => {
      if (!c.level) {
        const m = (c.code || '').match(/\b([1-5])\d{2}\b/);
        return { ...c, level: m ? `${m[1]}00 Level` : '100 Level' };
      }
      return c;
    });

    // Optional level filtering
    if (levelFilter && levelFilter !== 'all' && levelFilter !== 'All Levels') {
      const cleanTarget = String(levelFilter).replace(/\s+/g, '').toLowerCase();
      courses = courses.filter(c => {
        const cLvl = (c.level || '').replace(/\s+/g, '').toLowerCase();
        if (cLvl.includes(cleanTarget)) return true;
        if (cleanTarget.includes('100') && c.code.match(/1\d{2}/)) return true;
        if (cleanTarget.includes('200') && c.code.match(/2\d{2}/)) return true;
        if (cleanTarget.includes('300') && c.code.match(/3\d{2}/)) return true;
        if (cleanTarget.includes('400') && c.code.match(/4\d{2}/)) return true;
        if (cleanTarget.includes('500') && c.code.match(/5\d{2}/)) return true;
        return false;
      });
    }

    return courses;
  }

  function saveCourseCatalogState(catalogObj) {
    try {
      localStorage.setItem(STORAGE_KEY_CATALOG, JSON.stringify(catalogObj));
      window.dispatchEvent(new CustomEvent('unilesa:catalog-updated', { detail: catalogObj }));
      return true;
    } catch (e) {
      console.error('Failed to save course catalog:', e);
      return false;
    }
  }

  function getAllCourseCatalogs() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CATALOG);
      if (saved) {
        const parsed = JSON.parse(saved);
        const normalized = {};
        normalized['First Semester'] = parsed['First Semester'] || parsed['First Term'] || defaultCourseCatalog['First Semester'];
        normalized['Second Semester'] = parsed['Second Semester'] || parsed['Second Term'] || defaultCourseCatalog['Second Semester'];
        return normalized;
      }
    } catch (e) {
      console.warn('Could not read all catalogs:', e);
    }
    return { ...defaultCourseCatalog };
  }

  function addCourseToCatalog(course, semester = 'First Semester') {
    const semKey = normalizeSemesterKey(semester);
    const all = getAllCourseCatalogs();
    const semCatalog = all[semKey] || defaultCourseCatalog[semKey] || [];
    const codeClean = (course.code || 'CSC 199').replace(/\s+/g, '');
    
    // Determine level if not supplied
    let courseLevel = course.level;
    if (!courseLevel) {
      const match = (course.code || '').match(/\b([1-5])\d{2}\b/);
      courseLevel = match ? `${match[1]}00 Level` : '100 Level';
    }

    const newCourse = {
      id: course.id || codeClean,
      code: course.code || 'CSC 199',
      title: course.title || 'New Course',
      units: parseInt(course.units) || 2,
      level: courseLevel,
      type: course.type || 'Core',
      category: course.category || (course.type === 'Core' ? 'departmental' : 'elective'),
      compulsory: course.type === 'Core' || course.compulsory === true,
      lecturer: course.lecturer || 'Staff Instructor',
      venue: course.venue || 'Lecture Theatre 1',
      schedule: course.schedule || 'TBA',
      prerequisite: course.prerequisite || 'None',
      description: course.description || 'Academic course offering under UNILESA curriculum.'
    };
    all[semKey] = [newCourse, ...semCatalog];
    saveCourseCatalogState(all);
    addAuditLog({
      event: 'COURSE_CATALOG_CREATED',
      severity: 'Info',
      user: 'ICT Admin (Directorate of ICT)',
      description: `Added new course ${newCourse.code} (${newCourse.title}, ${newCourse.units} Units, ${newCourse.level}) to ${semKey} catalog`
    });
    return { success: true, course: newCourse };
  }

  function updateCourseInCatalog(course, semester = 'First Semester') {
    const semKey = normalizeSemesterKey(semester);
    const all = getAllCourseCatalogs();
    const semCatalog = all[semKey] || defaultCourseCatalog[semKey] || [];
    const index = semCatalog.findIndex(c => c.id === course.id || c.code === course.code);
    if (index !== -1) {
      const current = semCatalog[index];
      let courseLevel = course.level || current.level;
      if (!courseLevel) {
        const match = (course.code || current.code || '').match(/\b([1-5])\d{2}\b/);
        courseLevel = match ? `${match[1]}00 Level` : '100 Level';
      }

      semCatalog[index] = {
        ...current,
        ...course,
        level: courseLevel,
        units: parseInt(course.units) || current.units
      };
      all[semKey] = semCatalog;
      saveCourseCatalogState(all);
      addAuditLog({
        event: 'COURSE_CATALOG_MODIFIED',
        severity: 'Info',
        user: 'ICT Admin (Directorate of ICT)',
        description: `Modified course syllabus/lecturer for ${semCatalog[index].code} (${courseLevel})`
      });
      return { success: true, course: semCatalog[index] };
    }
    return { success: false, message: 'Course not found' };
  }

  function deleteCourseFromCatalog(courseId, semester = 'First Semester') {
    const semKey = normalizeSemesterKey(semester);
    const all = getAllCourseCatalogs();
    const semCatalog = all[semKey] || defaultCourseCatalog[semKey] || [];
    const filtered = semCatalog.filter(c => c.id !== courseId && c.code !== courseId);
    all[semKey] = filtered;
    saveCourseCatalogState(all);
    addAuditLog({
      event: 'COURSE_CATALOG_DELETED',
      severity: 'Warning',
      user: 'ICT Admin (Directorate of ICT)',
      description: `Removed course ${courseId} from ${semKey} catalog`
    });
    return { success: true };
  }

  function getCourseRegistration(semester = 'First Semester') {
    const semKey = normalizeSemesterKey(semester);
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COURSES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed[semKey]) return parsed[semKey];
        if (semKey === 'First Semester' && parsed['First Term']) return parsed['First Term'];
        if (semKey === 'Second Semester' && parsed['Second Term']) return parsed['Second Term'];
      }
    } catch (e) {
      console.warn('Could not read courses from localStorage:', e);
    }
    return defaultCourseRegistrations[semKey] || defaultCourseRegistrations['First Semester'];
  }

  function saveCourseRegistration(semester, selectedCourseIds, status = 'Draft') {
    const semKey = normalizeSemesterKey(semester);
    try {
      const allRegs = (() => {
        const saved = localStorage.getItem(STORAGE_KEY_COURSES);
        return saved ? JSON.parse(saved) : { ...defaultCourseRegistrations };
      })();

      const catalog = getCourseCatalog(semKey);
      const totalUnits = catalog
        .filter(c => selectedCourseIds.includes(c.id))
        .reduce((sum, c) => sum + c.units, 0);

      const existing = allRegs[semKey] || allRegs[semester] || defaultCourseRegistrations[semKey];
      allRegs[semKey] = {
        ...existing,
        selectedCourseIds,
        totalUnits,
        status: status,
        submittedDate: status === 'Submitted' || status === 'Approved' ? new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : existing.submittedDate
      };

      localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(allRegs));
      window.dispatchEvent(new CustomEvent('unilesa:courses-updated', { detail: { semester: semKey, term: semKey, registration: allRegs[semKey] } }));
      return { success: true, registration: allRegs[semKey] };
    } catch (e) {
      console.error('Failed to save course registration:', e);
      return { success: false, error: e.message };
    }
  }

  function setCourseBursaryClearance(semester, isCleared = true) {
    const semKey = normalizeSemesterKey(semester);
    try {
      const allRegs = (() => {
        const saved = localStorage.getItem(STORAGE_KEY_COURSES);
        return saved ? JSON.parse(saved) : { ...defaultCourseRegistrations };
      })();

      const existing = allRegs[semKey] || allRegs[semester] || defaultCourseRegistrations[semKey];
      allRegs[semKey] = {
        ...existing,
        bursaryCleared: isCleared
      };

      localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(allRegs));
      window.dispatchEvent(new CustomEvent('unilesa:courses-updated', { detail: { semester: semKey, term: semKey, registration: allRegs[semKey] } }));
      return { success: true, registration: allRegs[semKey] };
    } catch (e) {
      console.error('Failed to update bursary clearance:', e);
      return { success: false, error: e.message };
    }
  }

  const STORAGE_KEY_RESULTS = 'unilesa_student_results';

  const defaultAcademicResults = {
    '100L': {
      levelName: '100 Level (Freshman Year)',
      session: '2025/2026 Academic Session',
      semesters: {
        'First Semester': {
          semesterTitle: 'First Semester (2025/2026)',
          termTitle: 'First Semester (2025/2026)',
          gpa: 4.76,
          cgpa: 4.76,
          tcu: 21,
          tup: 21,
          twgp: 100,
          standing: 'First Class Honours Standing',
          senateApproval: 'Approved by University Senate on 14 Mar 2026',
          courses: [
            { code: 'CSC 101', title: 'Introduction to Computer Science & Problem Solving', units: 3, ca: 28, lab: 18, exam: 46, total: 92, grade: 'A', gp: 5, wgp: 15, remark: 'Distinction' },
            { code: 'CSC 103', title: 'Programming Methodology I (Python)', units: 3, ca: 27, lab: 19, exam: 45, total: 91, grade: 'A', gp: 5, wgp: 15, remark: 'Distinction' },
            { code: 'MAT 101', title: 'General Mathematics I (Algebra & Trigonometry)', units: 3, ca: 25, lab: 0, exam: 43, total: 68, grade: 'B', gp: 4, wgp: 12, remark: 'Very Good' },
            { code: 'PHY 101', title: 'General Physics I (Mechanics, Thermal & Waves)', units: 3, ca: 26, lab: 0, exam: 44, total: 70, grade: 'A', gp: 5, wgp: 15, remark: 'Distinction' },
            { code: 'PHY 107', title: 'General Physics Practical I', units: 1, ca: 0, lab: 19, exam: 28, total: 87, grade: 'A', gp: 5, wgp: 5, remark: 'Distinction' },
            { code: 'GST 101', title: 'Communication in English I', units: 2, ca: 26, lab: 0, exam: 45, total: 71, grade: 'A', gp: 5, wgp: 10, remark: 'Distinction' },
            { code: 'GST 103', title: 'Nigerian Peoples and Culture', units: 2, ca: 25, lab: 0, exam: 43, total: 68, grade: 'B', gp: 4, wgp: 8, remark: 'Very Good' },
            { code: 'GST 105', title: 'Use of Library, Study Skills & ICT', units: 2, ca: 27, lab: 0, exam: 46, total: 73, grade: 'A', gp: 5, wgp: 10, remark: 'Distinction' },
            { code: 'STA 101', title: 'Descriptive Statistics & Probability I', units: 2, ca: 24, lab: 0, exam: 46, total: 70, grade: 'A', gp: 5, wgp: 10, remark: 'Distinction' }
          ]
        },
        'Second Semester': {
          semesterTitle: 'Second Semester (2025/2026)',
          termTitle: 'Second Semester (2025/2026)',
          gpa: 4.76,
          cgpa: 4.76,
          tcu: 21,
          tup: 21,
          twgp: 100,
          standing: 'First Class Honours Standing',
          senateApproval: 'Approved by University Senate on 22 Aug 2026',
          courses: [
            { code: 'CSC 102', title: 'Computer Hardware Fundamentals & Logic Circuits', units: 3, ca: 26, lab: 17, exam: 45, total: 88, grade: 'A', gp: 5, wgp: 15, remark: 'Distinction' },
            { code: 'CSC 104', title: 'Programming Methodology II (Data Structures in C++)', units: 3, ca: 28, lab: 19, exam: 47, total: 94, grade: 'A', gp: 5, wgp: 15, remark: 'Distinction' },
            { code: 'MAT 102', title: 'General Mathematics II (Calculus & Vectors)', units: 3, ca: 24, lab: 0, exam: 42, total: 66, grade: 'B', gp: 4, wgp: 12, remark: 'Very Good' },
            { code: 'PHY 102', title: 'General Physics II (Electricity & Magnetism)', units: 3, ca: 25, lab: 0, exam: 45, total: 70, grade: 'A', gp: 5, wgp: 15, remark: 'Distinction' },
            { code: 'PHY 108', title: 'General Physics Practical II', units: 1, ca: 0, lab: 18, exam: 28, total: 86, grade: 'A', gp: 5, wgp: 5, remark: 'Distinction' },
            { code: 'GST 102', title: 'Communication in English II', units: 2, ca: 27, lab: 0, exam: 45, total: 72, grade: 'A', gp: 5, wgp: 10, remark: 'Distinction' },
            { code: 'GST 104', title: 'Philosophy, Logic & Human Existence', units: 2, ca: 24, lab: 0, exam: 44, total: 68, grade: 'B', gp: 4, wgp: 8, remark: 'Very Good' },
            { code: 'GST 106', title: 'Peace & Conflict Resolution Studies', units: 2, ca: 26, lab: 0, exam: 46, total: 72, grade: 'A', gp: 5, wgp: 10, remark: 'Distinction' },
            { code: 'CSC 108', title: 'Web Technologies & Frontend Engineering', units: 2, ca: 29, lab: 19, exam: 48, total: 96, grade: 'A', gp: 5, wgp: 10, remark: 'Distinction' }
          ]
        }
      },
      get terms() { return this.semesters; }
    },
    '200L': {
      levelName: '200 Level (Sophomore Year)',
      session: '2026/2027 Academic Session',
      semesters: {
        'First Semester': {
          semesterTitle: 'First Semester (2026/2027)',
          termTitle: 'First Semester (2026/2027)',
          gpa: 4.70,
          cgpa: 4.74,
          tcu: 20,
          tup: 20,
          twgp: 94,
          standing: 'First Class Honours Standing',
          senateApproval: 'Approved by University Senate on 10 Mar 2027',
          courses: [
            { code: 'CSC 201', title: 'Computer Programming I (Java & OOP)', units: 3, ca: 28, lab: 18, exam: 43, total: 89, grade: 'A', gp: 5, wgp: 15, remark: 'Distinction' },
            { code: 'CSC 203', title: 'Discrete Structures & Graph Theory', units: 3, ca: 26, lab: 0, exam: 46, total: 72, grade: 'A', gp: 5, wgp: 15, remark: 'Distinction' },
            { code: 'CSC 205', title: 'Operating Systems & System Architecture', units: 3, ca: 27, lab: 17, exam: 44, total: 78, grade: 'A', gp: 5, wgp: 15, remark: 'Distinction' },
            { code: 'MAT 201', title: 'Mathematical Methods I', units: 3, ca: 23, lab: 0, exam: 41, total: 64, grade: 'B', gp: 4, wgp: 12, remark: 'Very Good' },
            { code: 'STA 201', title: 'Probability Distributions & Statistics', units: 3, ca: 24, lab: 0, exam: 45, total: 69, grade: 'B', gp: 4, wgp: 12, remark: 'Very Good' },
            { code: 'GST 201', title: 'Entrepreneurship & Venture Creation', units: 2, ca: 29, lab: 18, exam: 47, total: 84, grade: 'A', gp: 5, wgp: 10, remark: 'Distinction' },
            { code: 'CSC 207', title: 'Digital Electronics & Microprocessors', units: 3, ca: 26, lab: 18, exam: 40, total: 74, grade: 'A', gp: 5, wgp: 15, remark: 'Distinction' }
          ]
        },
        'Second Semester': {
          semesterTitle: 'Second Semester (2026/2027)',
          termTitle: 'Second Semester (2026/2027)',
          gpa: 4.84,
          cgpa: 4.76,
          tcu: 19,
          tup: 19,
          twgp: 92,
          standing: 'First Class Honours Standing',
          senateApproval: 'Approved by University Senate on 18 Aug 2027',
          courses: [
            { code: 'CSC 202', title: 'Computer Programming II (Database Systems & SQL)', units: 3, ca: 29, lab: 19, exam: 44, total: 92, grade: 'A', gp: 5, wgp: 15, remark: 'Distinction' },
            { code: 'CSC 204', title: 'Object-Oriented Software Engineering', units: 3, ca: 28, lab: 18, exam: 49, total: 85, grade: 'A', gp: 5, wgp: 15, remark: 'Distinction' },
            { code: 'CSC 206', title: 'Computer Architecture & Organization', units: 3, ca: 26, lab: 0, exam: 50, total: 76, grade: 'A', gp: 5, wgp: 15, remark: 'Distinction' },
            { code: 'MAT 202', title: 'Linear Algebra & Numerical Analysis', units: 3, ca: 24, lab: 0, exam: 44, total: 68, grade: 'B', gp: 4, wgp: 12, remark: 'Very Good' },
            { code: 'GST 202', title: 'Peace Building & Global Security', units: 2, ca: 27, lab: 0, exam: 41, total: 78, grade: 'A', gp: 5, wgp: 10, remark: 'Distinction' },
            { code: 'CSC 208', title: 'Assembly Language & Low-Level Programming', units: 3, ca: 25, lab: 16, exam: 40, total: 71, grade: 'A', gp: 5, wgp: 15, remark: 'Distinction' },
            { code: 'CSC 210', title: 'Community-Based IT Software Project', units: 2, ca: 28, lab: 19, exam: 41, total: 88, grade: 'A', gp: 5, wgp: 10, remark: 'Distinction' }
          ]
        }
      },
      get terms() { return this.semesters; }
    },
    '300L': {
      levelName: '300 Level (Junior Year)',
      session: '2027/2028 Academic Session',
      semesters: {
        'First Semester': {
          semesterTitle: 'First Semester (2027/2028)',
          termTitle: 'First Semester (2027/2028)',
          gpa: 4.82,
          cgpa: 4.77,
          tcu: 17,
          tup: 17,
          twgp: 82,
          standing: 'First Class Honours Standing',
          senateApproval: 'Approved by University Senate on 12 Mar 2028',
          courses: [
            { code: 'CSC 301', title: 'Database Management Systems & Cloud SQL', units: 3, ca: 29, lab: 18, exam: 44, total: 91, grade: 'A', gp: 5, wgp: 15, remark: 'Distinction' },
            { code: 'CSC 303', title: 'Artificial Intelligence & Expert Systems', units: 3, ca: 28, lab: 18, exam: 42, total: 88, grade: 'A', gp: 5, wgp: 15, remark: 'Distinction' },
            { code: 'CSC 305', title: 'Data Communications & Network Security', units: 3, ca: 26, lab: 0, exam: 48, total: 74, grade: 'A', gp: 5, wgp: 15, remark: 'Distinction' },
            { code: 'CSC 307', title: 'Compiler Construction & Automata Theory', units: 3, ca: 24, lab: 0, exam: 44, total: 68, grade: 'B', gp: 4, wgp: 12, remark: 'Very Good' },
            { code: 'CSC 309', title: 'Research Methodology & Technical Writing', units: 2, ca: 28, lab: 0, exam: 44, total: 82, grade: 'A', gp: 5, wgp: 10, remark: 'Distinction' },
            { code: 'CSC 311', title: 'Web Application Security & DevOps', units: 3, ca: 27, lab: 19, exam: 40, total: 86, grade: 'A', gp: 5, wgp: 15, remark: 'Distinction' }
          ]
        },
        'Second Semester': {
          semesterTitle: 'Second Semester (2027/2028 - SIWES)',
          termTitle: 'Second Semester (2027/2028 - SIWES)',
          gpa: 5.00,
          cgpa: 4.78,
          tcu: 6,
          tup: 6,
          twgp: 30,
          standing: 'First Class Honours Standing',
          senateApproval: 'Industrial Attachment Assessment Completed',
          courses: [
            { code: 'CSC 300', title: 'Students Industrial Work Experience Scheme (SIWES 6-Months)', units: 6, ca: 30, lab: 20, exam: 48, total: 98, grade: 'A', gp: 5, wgp: 30, remark: 'Distinction' }
          ]
        }
      },
      get terms() { return this.semesters; }
    },
    '400L': {
      levelName: '400 Level (Final Year - Curriculum)',
      session: '2028/2029 Academic Session',
      semesters: {
        'First Semester': {
          semesterTitle: 'First Semester (2028/2029 - Enrolled / Projected)',
          termTitle: 'First Semester (2028/2029 - Enrolled / Projected)',
          gpa: 4.80,
          cgpa: 4.79,
          tcu: 15,
          tup: 15,
          twgp: 72,
          standing: 'First Class Honours Standing (Projected)',
          senateApproval: 'Registered Curriculum Courses',
          courses: [
            { code: 'CSC 401', title: 'Software Engineering Methodologies & Quality Assurance', units: 3, ca: 28, lab: 18, exam: 44, total: 90, grade: 'A', gp: 5, wgp: 15, remark: 'Projected A' },
            { code: 'CSC 403', title: 'Distributed Systems & Microservices Architecture', units: 3, ca: 27, lab: 17, exam: 42, total: 86, grade: 'A', gp: 5, wgp: 15, remark: 'Projected A' },
            { code: 'CSC 405', title: 'Cryptography, Cyber Warfare & Network Security', units: 3, ca: 26, lab: 0, exam: 45, total: 71, grade: 'A', gp: 5, wgp: 15, remark: 'Projected A' },
            { code: 'CSC 407', title: 'Machine Learning, Deep Neural Networks & NLP', units: 3, ca: 28, lab: 18, exam: 46, total: 92, grade: 'A', gp: 5, wgp: 15, remark: 'Projected A' },
            { code: 'CSC 499', title: 'Final Year Capstone Research Project I', units: 3, ca: 29, lab: 0, exam: 43, total: 82, grade: 'A', gp: 5, wgp: 15, remark: 'Projected A' }
          ]
        },
        'Second Semester': {
          semesterTitle: 'Second Semester (2028/2029 - Enrolled / Projected)',
          termTitle: 'Second Semester (2028/2029 - Enrolled / Projected)',
          gpa: 4.75,
          cgpa: 4.78,
          tcu: 12,
          tup: 12,
          twgp: 57,
          standing: 'First Class Honours Standing (Projected)',
          senateApproval: 'Registered Curriculum Courses',
          courses: [
            { code: 'CSC 402', title: 'Big Data Analytics & Distributed Computing (Hadoop/Spark)', units: 3, ca: 28, lab: 17, exam: 43, total: 88, grade: 'A', gp: 5, wgp: 15, remark: 'Projected A' },
            { code: 'CSC 404', title: 'Human-Computer Interaction & UX Engineering', units: 3, ca: 27, lab: 0, exam: 41, total: 68, grade: 'B', gp: 4, wgp: 12, remark: 'Projected B' },
            { code: 'CSC 406', title: 'Cloud Computing, Kubernetes & Serverless DevOps', units: 3, ca: 28, lab: 18, exam: 44, total: 90, grade: 'A', gp: 5, wgp: 15, remark: 'Projected A' },
            { code: 'CSC 499', title: 'Final Year Capstone Project Defense & Software Demonstration', units: 3, ca: 30, lab: 20, exam: 45, total: 95, grade: 'A', gp: 5, wgp: 15, remark: 'Projected A' }
          ]
        }
      },
      get terms() { return this.semesters; }
    }
  };

  function getAcademicResults() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RESULTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read academic results:', e);
    }
    return defaultAcademicResults;
  }

  function getResultsForLevelAndSemester(level = '100L', semester = 'First Semester') {
    const semKey = normalizeSemesterKey(semester);
    const results = getAcademicResults();
    const lvlData = results[level] || results['100L'];
    const sems = lvlData.semesters || lvlData.terms;
    if (sems && sems[semKey]) {
      return sems[semKey];
    }
    if (sems && sems['First Semester']) return sems['First Semester'];
    if (sems && sems['First Term']) return sems['First Term'];
    return defaultAcademicResults['100L'].semesters['First Semester'];
  }

  function getResultsForLevelAndTerm(level = '100L', term = 'First Semester') {
    return getResultsForLevelAndSemester(level, term);
  }

  function getOverallCGPASummary() {
    const results = getAcademicResults();
    let totalCredits = 0;
    let totalWeightedPoints = 0;
    let totalPassedCredits = 0;
    let semesterHistory = [];

    const levels = ['100L', '200L', '300L', '400L'];
    levels.forEach(lvl => {
      const lvlData = results[lvl];
      if (lvlData) {
        const sems = lvlData.semesters || lvlData.terms;
        if (sems) {
          Object.keys(sems).forEach(semKey => {
            const t = sems[semKey];
            if (t.courses && t.courses.length > 0) {
              totalCredits += t.tcu;
              totalPassedCredits += t.tup;
              totalWeightedPoints += t.twgp;
              const displaySem = semKey.replace(/Term/g, 'Semester');
              semesterHistory.push({
                level: lvl,
                semester: displaySem,
                term: displaySem,
                title: `${lvl} ${displaySem}`,
                gpa: t.gpa,
                cgpa: parseFloat((totalWeightedPoints / totalCredits).toFixed(2)),
                units: t.tcu
              });
            }
          });
        }
      }
    });

    const cgpa = totalCredits > 0 ? parseFloat((totalWeightedPoints / totalCredits).toFixed(2)) : 4.76;
    return {
      cgpa: cgpa,
      totalCreditsRegistered: totalCredits,
      totalCreditsPassed: totalPassedCredits,
      totalWeightedPoints: totalWeightedPoints,
      degreeClass: cgpa >= 4.50 ? 'First Class Honours' : cgpa >= 3.50 ? 'Second Class Honours (Upper Division)' : cgpa >= 2.40 ? 'Second Class Honours (Lower Division)' : 'Third Class Honours',
      semesterHistory: semesterHistory,
      termHistory: semesterHistory
    };
  }

  function resetCourseRegistrations() {
    try {
      localStorage.removeItem(STORAGE_KEY_COURSES);
      window.dispatchEvent(new CustomEvent('unilesa:courses-updated', { detail: { semester: 'First Semester', term: 'First Semester', registration: defaultCourseRegistrations['First Semester'] } }));
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  /* ==================== ICT ADMINISTRATION & SYSTEM SETTINGS ==================== */
  const STORAGE_KEY_ICT_SETTINGS = 'unilesa_ict_settings';
  const STORAGE_KEY_USERS = 'unilesa_user_directory';
  const STORAGE_KEY_AUDIT = 'unilesa_audit_logs';

  const defaultPortalWindows = {
    courseRegistration: {
      id: 'courseRegistration',
      name: 'Course Registration Window',
      category: 'academic',
      status: 'OPEN',
      enabled: true,
      deadline: '2026-11-15',
      lateFee: 10000,
      minUnits: 15,
      maxUnits: 24,
      allowedLevels: ['100L', '200L', '300L', '400L', '500L'],
      restrictionMessage: 'Course Registration for the current semester is currently closed by the Directorate of ICT / Academic Affairs. Please contact your Departmental Level Adviser.',
      lastModified: '02 Oct 2026, 08:15 AM'
    },
    tuitionPayment: {
      id: 'tuitionPayment',
      name: 'Tuition & Fees Payment Gateway',
      category: 'financial',
      status: 'OPEN',
      enabled: true,
      splitBilling: true,
      webhookStatus: 'Remita API 200 OK',
      restrictionMessage: 'Online tuition payment processing is temporarily suspended for scheduled Bursary financial audit.',
      lastModified: '01 Oct 2026, 06:45 PM'
    },
    examDocket: {
      id: 'examDocket',
      name: 'Examination Docket Gate',
      category: 'examinations',
      status: 'OPEN',
      enabled: true,
      clearanceThreshold: 60,
      barcodeEnabled: true,
      restrictionMessage: 'Examination Docket barcode generation is restricted. You must settle at least 60% of your tuition fees to generate an official exam hall pass.',
      lastModified: '28 Sep 2026, 10:00 AM'
    },
    resultsChecking: {
      id: 'resultsChecking',
      name: 'Semester Results Publication Gate',
      category: 'academic',
      status: 'OPEN',
      enabled: true,
      senateApproved: true,
      senateGazette: 'SEN/2025-2026/RES/001',
      restrictionMessage: 'Semester results are undergoing Senate Committee validation and moderations. Official transcript viewing will be enabled once gazetted.',
      lastModified: '30 Sep 2026, 02:00 PM'
    },
    hostelAccommodation: {
      id: 'hostelAccommodation',
      name: 'Hostel Accommodation Gate',
      category: 'welfare',
      status: 'OPEN',
      enabled: true,
      totalSpaces: 1000,
      allocatedSpaces: 842,
      freshmenOnly: true,
      restrictionMessage: 'Hostel accommodation bed-space allocation portal is currently closed for the current semester session.',
      lastModified: '25 Sep 2026, 12:00 PM'
    }
  };

  const defaultIctSettings = {
    systemStatus: 'Operational',
    systemUptime: '99.98%',
    activeSession: '2025/2026 Academic Session',
    activeSemester: 'First Semester',
    activeTerm: 'First Semester',
    activeSection: 'Undergraduate Regular',
    semesterPhase: 'Lectures & Registration Phase',
    termStartDate: '2026-09-15',
    semesterStartDate: '2026-09-15',
    senateGazetteRef: 'SEN/2025-2026/RES/001',
    courseRegStatus: 'OPEN',
    courseRegDeadline: '15 Nov 2026',
    addDropStatus: 'OPEN',
    addDropDeadline: '22 Nov 2026',
    resultViewingStatus: 'OPEN',
    gradeUploadStatus: 'OPEN',
    minCreditUnits: 15,
    maxCreditUnits: 24,
    lateRegFee: 10000,
    clearanceThreshold: 60,
    twoFactorEnforced: true,
    maintenanceMode: false,
    jambCapsSyncStatus: 'Connected (Live)',
    lastBackup: '02 Oct 2026, 04:00 AM',
    portalWindows: defaultPortalWindows
  };

  const defaultUserDirectory = [
    { id: 'USR-STU-0142', role: 'Student', name: 'Jane Adaeze Doe', identifier: 'UNILESA/2026/CSC/0142', email: 'j.doe@student.unilesa.edu.ng', faculty: 'Science & Computing', department: 'Computer Science', level: '100L', status: 'Active', phone: '+234 803 456 7890', lastLogin: 'Today, 10:14 AM' },
    { id: 'USR-STU-0143', role: 'Student', name: 'Tunde Babatunde Adeleke', identifier: 'UNILESA/2026/CSC/0143', email: 't.adeleke@student.unilesa.edu.ng', faculty: 'Science & Computing', department: 'Computer Science', level: '100L', status: 'Active', phone: '+234 802 331 4488', lastLogin: 'Today, 09:40 AM' },
    { id: 'USR-STU-0144', role: 'Student', name: 'Chioma Grace Okonkwo', identifier: 'UNILESA/2026/CSC/0144', email: 'c.okonkwo@student.unilesa.edu.ng', faculty: 'Science & Computing', department: 'Computer Science', level: '100L', status: 'Password Reset', phone: '+234 814 555 9012', lastLogin: 'Yesterday, 04:12 PM' },
    { id: 'USR-STU-0145', role: 'Student', name: 'Emmanuel Ayomide Balogun', identifier: 'UNILESA/2026/CSC/0145', email: 'e.balogun@student.unilesa.edu.ng', faculty: 'Science & Computing', department: 'Computer Science', level: '100L', status: 'Suspended', phone: '+234 809 111 2233', lastLogin: '3 days ago' },
    { id: 'USR-LEC-0021', role: 'Lecturer', name: 'Dr. A. O. Babalola', identifier: 'UNILESA/STAFF/ACAD/021', email: 'a.babalola@unilesa.edu.ng', faculty: 'Science & Computing', department: 'Computer Science', level: 'N/A', status: 'Active', phone: '+234 803 112 3344', lastLogin: 'Today, 08:30 AM' },
    { id: 'USR-LEC-0022', role: 'Lecturer', name: 'Dr. M. K. Alabi', identifier: 'UNILESA/STAFF/ACAD/022', email: 'm.alabi@unilesa.edu.ng', faculty: 'Science & Computing', department: 'Computer Science', level: 'Level Adviser (100L)', status: 'Active', phone: '+234 805 223 4455', lastLogin: 'Today, 09:15 AM' },
    { id: 'USR-HOD-0005', role: 'HOD', name: 'Prof. E. T. Oloyede', identifier: 'UNILESA/STAFF/ACAD/005', email: 'e.oloyede@unilesa.edu.ng', faculty: 'Science & Computing', department: 'Mathematical Sciences', level: 'Head of Dept', status: 'Active', phone: '+234 802 778 9900', lastLogin: 'Today, 07:45 AM' },
    { id: 'USR-ADM-0012', role: 'Admissions', name: 'Mr. B. K. Oladipo', identifier: 'UNILESA/STAFF/ADM/012', email: 'admissions@unilesa.edu.ng', faculty: 'Academic Affairs', department: 'Admissions Division', level: 'Senior Admissions Officer', status: 'Active', phone: '+234 803 999 8877', lastLogin: 'Today, 09:00 AM' },
    { id: 'USR-BUR-0008', role: 'Bursary', name: 'Dr. O. A. Adeleke', identifier: 'UNILESA/STAFF/BUR/008', email: 'bursar@unilesa.edu.ng', faculty: 'Bursary', department: 'Finance & Accounts', level: 'University Bursar', status: 'Active', phone: '+234 803 777 6655', lastLogin: 'Today, 08:00 AM' }
  ];

  const defaultAuditLogs = [
    { id: 'LOG-9921', event: 'COURSE_REG_WINDOW_TOGGLED', severity: 'Info', user: 'ICT Admin (Admin_Engr_Kola)', description: 'Course Registration Window opened for 2025/2026 First Semester', ip: '192.168.1.10', date: '02 Oct 2026, 08:15 AM' },
    { id: 'LOG-9920', event: 'PASSWORD_RESET_FORCED', severity: 'Warning', user: 'System (Automated Provisioner)', description: 'Mandatory password reset triggered for 142 newly matriculated 100L students', ip: '10.0.0.1', date: '01 Oct 2026, 11:30 PM' },
    { id: 'LOG-9919', event: 'REMITA_GATEWAY_SYNC', severity: 'Success', user: 'Remita Webhook IPN', description: 'Reconciled 34 tuition payments amounting to ₦6,290,000.00', ip: '197.210.64.12', date: '01 Oct 2026, 06:45 PM' },
    { id: 'LOG-9918', event: 'SECURITY_LOGIN_BLOCKED', severity: 'Danger', user: 'Unknown IP (Brute Force Detected)', description: 'Blocked IP after 5 consecutive failed login attempts on UNILESA/2026/CSC/0142', ip: '102.89.44.18', date: '01 Oct 2026, 02:22 PM' },
    { id: 'LOG-9917', event: 'COURSE_CATALOG_MODIFIED', severity: 'Info', user: 'ICT Admin (Admin_Engr_Kola)', description: 'Added elective course CSC 105: Introduction to Web Technologies & Internet', ip: '192.168.1.10', date: '30 Sep 2026, 03:10 PM' }
  ];

  function getIctSettings() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ICT_SETTINGS);
      if (saved) return { ...defaultIctSettings, ...JSON.parse(saved) };
    } catch (e) {
      console.warn('Could not read ICT settings:', e);
    }
    return defaultIctSettings;
  }

  function setIctSettings(data) {
    try {
      const current = getIctSettings();
      const updated = { ...current, ...data };
      localStorage.setItem(STORAGE_KEY_ICT_SETTINGS, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('unilesa:ict-settings-updated', { detail: updated }));
      return updated;
    } catch (e) {
      console.error('Failed to save ICT settings:', e);
      return data;
    }
  }

  function getPortalGates() {
    const settings = getIctSettings();
    return settings.portalWindows || defaultPortalWindows;
  }

  function setPortalGates(gates) {
    const settings = getIctSettings();
    const updatedSettings = {
      ...settings,
      portalWindows: {
        ...(settings.portalWindows || defaultPortalWindows),
        ...gates
      }
    };
    return setIctSettings(updatedSettings);
  }

  function updatePortalGate(gateKey, updates) {
    const gates = getPortalGates();
    const currentGate = gates[gateKey] || { id: gateKey, name: gateKey, enabled: true };
    const updatedGate = {
      ...currentGate,
      ...updates,
      lastModified: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    gates[gateKey] = updatedGate;
    setPortalGates(gates);

    addAuditLog({
      event: 'PORTAL_GATE_CONFIGURED',
      severity: 'Info',
      user: 'ICT Admin (Directorate of ICT)',
      description: `Modified rules and directives for gate: "${updatedGate.name}" (Status: ${updatedGate.enabled ? 'ACTIVE/OPEN' : 'LOCKED/RESTRICTED'})`
    });

    return updatedGate;
  }

  function togglePortalGate(gateKey, forceState) {
    const gates = getPortalGates();
    const currentGate = gates[gateKey] || { id: gateKey, name: gateKey, enabled: true };
    const newState = forceState !== undefined ? forceState : !currentGate.enabled;

    currentGate.enabled = newState;
    currentGate.status = newState ? 'OPEN' : 'LOCKED';
    currentGate.lastModified = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    gates[gateKey] = currentGate;
    setPortalGates(gates);

    addAuditLog({
      event: newState ? 'PORTAL_GATE_OPENED' : 'PORTAL_GATE_RESTRICTED',
      severity: newState ? 'Info' : 'Warning',
      user: 'ICT Admin (Directorate of ICT)',
      description: `Gate "${currentGate.name}" was ${newState ? 'OPENED for student transactions' : 'RESTRICTED by administrative directive'}`
    });

    return currentGate;
  }

  function isGateOpen(gateKey) {
    const gates = getPortalGates();
    const gate = gates[gateKey];
    if (!gate) return true;
    return !!gate.enabled;
  }


  function getUserDirectory() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USERS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read user directory:', e);
    }
    return defaultUserDirectory;
  }

  function setUserDirectory(users) {
    try {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
      window.dispatchEvent(new CustomEvent('unilesa:users-updated', { detail: users }));
      return users;
    } catch (e) {
      console.error('Failed to save user directory:', e);
      return users;
    }
  }

  function addUser(user) {
    const users = getUserDirectory();
    const newUser = {
      id: user.id || 'USR-' + (user.role === 'Student' ? 'STU-' : 'STF-') + Math.floor(1000 + Math.random() * 9000),
      role: user.role || 'Student',
      name: user.name || 'New University User',
      identifier: user.identifier || (user.role === 'Student' ? 'UNILESA/2026/CSC/' + Math.floor(1000 + Math.random() * 9000) : 'UNILESA/STAFF/' + Math.floor(100 + Math.random() * 900)),
      email: user.email || 'user@student.unilesa.edu.ng',
      faculty: user.faculty || 'Science & Computing',
      department: user.department || 'Computer Science',
      level: user.level || '100L',
      status: 'Active',
      phone: user.phone || '+234 800 000 0000',
      lastLogin: 'Never (New Account)'
    };
    const updated = [newUser, ...users];
    setUserDirectory(updated);

    addAuditLog({
      event: 'USER_ACCOUNT_PROVISIONED',
      severity: 'Info',
      user: 'ICT Admin (Directorate of ICT)',
      description: `Provisioned new ${newUser.role} account for ${newUser.name} (${newUser.identifier})`
    });

    return { success: true, user: newUser };
  }

  function updateUserStatus(userId, status) {
    const users = getUserDirectory();
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
      users[index].status = status;
      setUserDirectory(users);
      addAuditLog({
        event: 'USER_STATUS_MODIFIED',
        severity: status === 'Suspended' ? 'Warning' : 'Info',
        user: 'ICT Admin (Directorate of ICT)',
        description: `Changed account status of ${users[index].name} (${users[index].identifier}) to ${status}`
      });
      return { success: true, user: users[index] };
    }
    return { success: false, message: 'User not found' };
  }

  function updateUser(userId, data) {
    const users = getUserDirectory();
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
      const oldUser = users[index];
      users[index] = {
        ...oldUser,
        ...data,
        id: oldUser.id
      };
      setUserDirectory(users);
      addAuditLog({
        event: 'USER_DATA_MODIFIED',
        severity: 'Info',
        user: 'ICT Admin (Directorate of ICT)',
        description: `Updated profile details for ${users[index].name} (${users[index].identifier})`
      });

      // Synchronize student store if modifying active student
      const studentProfile = getStudent();
      if (studentProfile && (studentProfile.matricNumber === oldUser.identifier || studentProfile.matricNumber === users[index].identifier)) {
        setStudent({
          fullName: users[index].name,
          firstName: users[index].name.split(' ')[0] || studentProfile.firstName,
          email: users[index].email,
          phone: users[index].phone,
          matricNumber: users[index].identifier,
          faculty: users[index].faculty,
          department: users[index].department,
          level: users[index].level || '100 Level'
        });
      }

      return { success: true, user: users[index] };
    }
    return { success: false, message: 'User not found' };
  }

  function deleteUser(userId) {
    const users = getUserDirectory();
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
      const deletedUser = users[index];
      const filtered = users.filter(u => u.id !== userId);
      setUserDirectory(filtered);
      addAuditLog({
        event: 'USER_ACCOUNT_DELETED',
        severity: 'Danger',
        user: 'ICT Admin (Directorate of ICT)',
        description: `Permanently deleted ${deletedUser.role} account of ${deletedUser.name} (${deletedUser.identifier})`
      });
      return { success: true, user: deletedUser };
    }
    return { success: false, message: 'User not found' };
  }

  function resetUserPassword(userId) {
    const users = getUserDirectory();
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
      const tempPass = 'UNILESA#' + Math.floor(100000 + Math.random() * 900000);
      users[index].status = 'Password Reset';
      setUserDirectory(users);
      addAuditLog({
        event: 'PASSWORD_RESET_ISSUED',
        severity: 'Warning',
        user: 'ICT Admin (Directorate of ICT)',
        description: `Issued temporary credential override for ${users[index].name} (${users[index].identifier})`
      });
      return { success: true, tempPassword: tempPass, user: users[index] };
    }
    return { success: false, message: 'User not found' };
  }

  function getAuditLogs() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AUDIT);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read audit logs:', e);
    }
    return defaultAuditLogs;
  }

  function addAuditLog(log) {
    try {
      const logs = getAuditLogs();
      const newLog = {
        id: 'LOG-' + Math.floor(1000 + Math.random() * 9000),
        event: log.event || 'SYSTEM_EVENT',
        severity: log.severity || 'Info',
        user: log.user || 'ICT Admin',
        description: log.description || 'System operation executed',
        ip: log.ip || '192.168.1.10',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
      };
      const updated = [newLog, ...logs.slice(0, 49)];
      localStorage.setItem(STORAGE_KEY_AUDIT, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('unilesa:audit-updated', { detail: updated }));
      return newLog;
    } catch (e) {
      console.error('Failed to add audit log:', e);
      return null;
    }
  }

  function dispatchBroadcast(title, text, priority = 'normal', target = 'All Students') {
    const notifs = getNotifications();
    const newNotif = {
      id: Date.now(),
      text: `${priority === 'urgent' ? '🚨 ' : '📢 '} ${title}: ${text}`,
      date: 'Just now',
      unread: true,
      link: 'announcements.html'
    };
    setNotifications([newNotif, ...notifs]);
    addAuditLog({
      event: 'SYSTEM_BROADCAST_DISPATCHED',
      severity: priority === 'urgent' ? 'Warning' : 'Info',
      user: 'ICT Admin (Directorate of ICT)',
      description: `Dispatched broadcast "${title}" to target group: ${target}`
    });
    return { success: true, notification: newNotif };
  }

  function bulkAddUsers(userArray) {
    if (!Array.isArray(userArray) || userArray.length === 0) return { success: false, count: 0 };
    const currentUsers = getUserDirectory();
    const newUsers = userArray.map((u, i) => {
      const role = u.role || 'Student';
      return {
        id: 'USR-' + (role === 'Student' ? 'STU-' : 'STF-') + Math.floor(1000 + Math.random() * 9000) + '-' + i,
        role: role,
        name: u.name || 'Freshman User',
        identifier: u.identifier || (role === 'Student' ? 'UNILESA/2026/' + (u.departmentCode || 'CSC') + '/' + String(100 + currentUsers.length + i).padStart(4, '0') : 'UNILESA/STAFF/' + Math.floor(100 + Math.random() * 900)),
        email: u.email || `${(u.name || 'student').toLowerCase().replace(/\s+/g, '.')}@student.unilesa.edu.ng`,
        faculty: u.faculty || 'Science & Computing',
        department: u.department || 'Computer Science',
        level: u.level || '100L',
        status: 'Active',
        phone: u.phone || '+234 800 000 0000',
        lastLogin: 'Never (Batch Provisioned)'
      };
    });

    const updated = [...newUsers, ...currentUsers];
    setUserDirectory(updated);

    addAuditLog({
      event: 'BATCH_USER_PROVISIONING',
      severity: 'Success',
      user: 'ICT Admin (Directorate of ICT)',
      description: `Bulk provisioned ${newUsers.length} user accounts from CSV roster upload.`
    });

    return { success: true, count: newUsers.length, users: newUsers };
  }

  /* ==========================================================================
     CLEARANCE DOCUMENTS REPOSITORY & SCREENING DATA
     ========================================================================== */
  const STORAGE_KEY_DOCUMENTS = 'unilesa_clearance_documents';

  const defaultClearanceDocuments = [
    {
      id: 'doc_jamb',
      title: 'JAMB Official Admission Letter',
      category: 'admissions',
      categoryLabel: 'Statutory Admissions',
      mandatory: true,
      fileName: 'JAMB_Admission_Letter_2026.pdf',
      fileSize: '840 KB',
      fileType: 'pdf',
      uploadDate: '12 Oct 2026, 09:14 AM',
      verifiedDate: '15 Oct 2026, 11:30 AM',
      status: 'Verified',
      verificationCode: 'DOC-JAMB-2026-88192',
      issuingAuthority: 'Joint Admissions and Matriculation Board (JAMB CAPS)',
      verifiedBy: 'Mr. E. O. Oladipo (Admissions Officer)',
      remarks: 'Authentic 100L Direct Entry/UTME Admission Letter reconciled with JAMB Central Processing Registry.',
      documentNumber: 'JAMB/2026/UTME/10948211EF',
      downloadUrl: '#',
      previewType: 'pdf'
    },
    {
      id: 'doc_olevel',
      title: "O'Level (WAEC / SSCE) Senior Secondary Certificate",
      category: 'academic',
      categoryLabel: 'Academic Qualifications',
      mandatory: true,
      fileName: 'WAEC_Official_Certificate_JaneDoe.pdf',
      fileSize: '1.24 MB',
      fileType: 'pdf',
      uploadDate: '12 Oct 2026, 09:20 AM',
      verifiedDate: '15 Oct 2026, 01:15 PM',
      status: 'Verified',
      verificationCode: 'DOC-WAEC-2026-44019',
      issuingAuthority: 'West African Examinations Council (WAEC Direct)',
      verifiedBy: 'Mrs. K. A. Adebisi (Senior Assistant Registrar, Records)',
      remarks: 'Certified 5 credits including English Language, Mathematics, Physics, Chemistry, and Computer Studies.',
      documentNumber: 'WAEC-NG-2024-419082',
      downloadUrl: '#',
      previewType: 'pdf'
    },
    {
      id: 'doc_birth',
      title: 'National Birth Certificate / Age Declaration',
      category: 'identity',
      categoryLabel: 'Identity & Origin',
      mandatory: true,
      fileName: 'National_Birth_Certificate_NPC.pdf',
      fileSize: '540 KB',
      fileType: 'pdf',
      uploadDate: '13 Oct 2026, 10:05 AM',
      verifiedDate: '16 Oct 2026, 02:40 PM',
      status: 'Verified',
      verificationCode: 'DOC-NPC-2026-11802',
      issuingAuthority: 'National Population Commission (NPC Nigeria)',
      verifiedBy: 'Mr. T. S. Fashola (Registry Verification Desk)',
      remarks: 'Date of birth verified as 14 May 2006. Valid statutory identity record.',
      documentNumber: 'NPC-OS-2006-0928114',
      downloadUrl: '#',
      previewType: 'pdf'
    },
    {
      id: 'doc_lga',
      title: 'Local Government Certificate of Origin',
      category: 'identity',
      categoryLabel: 'Identity & Origin',
      mandatory: true,
      fileName: 'Ilesa_East_LGA_Origin_Cert.pdf',
      fileSize: '620 KB',
      fileType: 'pdf',
      uploadDate: '13 Oct 2026, 10:12 AM',
      verifiedDate: '16 Oct 2026, 03:00 PM',
      status: 'Verified',
      verificationCode: 'DOC-LGA-2026-33910',
      issuingAuthority: 'Ilesa East Local Government Secretariat, Osun State',
      verifiedBy: 'Mr. T. S. Fashola (Registry Verification Desk)',
      remarks: 'Indigene verification confirmed by Local Government Council Secretary.',
      documentNumber: 'IELGA/SEC/2026/0412',
      downloadUrl: '#',
      previewType: 'pdf'
    },
    {
      id: 'doc_attestation',
      title: 'Letter of Attestation / Character Reference',
      category: 'admissions',
      categoryLabel: 'Statutory Admissions',
      mandatory: true,
      fileName: 'Letter_of_Attestation_Clergy.pdf',
      fileSize: '410 KB',
      fileType: 'pdf',
      uploadDate: '14 Oct 2026, 11:30 AM',
      verifiedDate: '17 Oct 2026, 10:20 AM',
      status: 'Verified',
      verificationCode: 'DOC-ATT-2026-77218',
      issuingAuthority: 'Christ the King Cathedral, Ilesa / High Court Notary',
      verifiedBy: 'Mrs. K. A. Adebisi (Senior Assistant Registrar, Records)',
      remarks: 'Character testimonial signed and sealed by Senior Notary / Clergy.',
      documentNumber: 'ATT/NOT/2026/089',
      downloadUrl: '#',
      previewType: 'pdf'
    },
    {
      id: 'doc_medical',
      title: 'University Health Services Medical Fitness Certificate',
      category: 'medical',
      categoryLabel: 'Medical & Health',
      mandatory: true,
      fileName: 'UNILESA_Medical_Fitness_Clearance.pdf',
      fileSize: '780 KB',
      fileType: 'pdf',
      uploadDate: '18 Oct 2026, 08:30 AM',
      verifiedDate: '18 Oct 2026, 02:00 PM',
      status: 'Verified',
      verificationCode: 'DOC-MED-2026-90412',
      issuingAuthority: 'Directorate of University Health Services, UNILESA Clinic',
      verifiedBy: 'Dr. (Mrs.) B. T. Adeleke (Chief Medical Officer)',
      remarks: 'Chest X-Ray, Genotype AA, Blood Group O+ verified. Certified physically & mentally fit for enrollment.',
      documentNumber: 'UHS/MC/2026/0142',
      downloadUrl: '#',
      previewType: 'pdf'
    }
  ];

  function getClearanceDocuments() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DOCUMENTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not load clearance documents from localStorage:', e);
    }
    return defaultClearanceDocuments;
  }

  function setClearanceDocuments(docs) {
    try {
      localStorage.setItem(STORAGE_KEY_DOCUMENTS, JSON.stringify(docs));
    } catch (e) {
      console.warn('Could not save clearance documents to localStorage:', e);
    }
  }

  function uploadStudentDocument(docData) {
    const docs = getClearanceDocuments();
    const existingIndex = docs.findIndex(d => d.id === docData.id || d.title.toLowerCase() === (docData.title || '').toLowerCase());
    
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + 
                    now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    let updatedDoc;
    if (existingIndex >= 0) {
      updatedDoc = {
        ...docs[existingIndex],
        ...docData,
        uploadDate: dateStr,
        status: docData.autoApprove ? 'Verified' : 'Pending Verification',
        verifiedDate: docData.autoApprove ? dateStr : null,
        verificationCode: docData.verificationCode || `DOC-UNL-${Math.floor(10000 + Math.random() * 90000)}`
      };
      docs[existingIndex] = updatedDoc;
    } else {
      updatedDoc = {
        id: docData.id || 'doc_' + Date.now(),
        title: docData.title || 'Official Academic Credential',
        category: docData.category || 'admissions',
        categoryLabel: docData.categoryLabel || 'Statutory Admissions',
        mandatory: docData.mandatory !== undefined ? docData.mandatory : true,
        fileName: docData.fileName || 'Uploaded_Document.pdf',
        fileSize: docData.fileSize || '1.1 MB',
        fileType: docData.fileType || 'pdf',
        uploadDate: dateStr,
        verifiedDate: docData.autoApprove ? dateStr : null,
        status: docData.autoApprove ? 'Verified' : 'Pending Verification',
        verificationCode: `DOC-UNL-${Math.floor(10000 + Math.random() * 90000)}`,
        issuingAuthority: docData.issuingAuthority || 'University of Ilesa Registry Division',
        verifiedBy: docData.autoApprove ? 'Academic Affairs Registry Desk' : 'Pending Review',
        remarks: docData.remarks || 'Document uploaded and queued for Registry screening.',
        documentNumber: docData.documentNumber || `REG-${Date.now().toString().slice(-6)}`,
        downloadUrl: '#',
        previewType: 'pdf'
      };
      docs.push(updatedDoc);
    }

    setClearanceDocuments(docs);
    return { success: true, document: updatedDoc, documents: docs };
  }

  function updateDocumentVerification(id, status, officerRemarks) {
    const docs = getClearanceDocuments();
    const doc = docs.find(d => d.id === id);
    if (!doc) return { success: false, message: 'Document not found' };

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + 
                    now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    doc.status = status;
    if (status === 'Verified') {
      doc.verifiedDate = dateStr;
      doc.verifiedBy = 'Mr. E. O. Oladipo (Admissions Officer)';
    }
    if (officerRemarks) {
      doc.remarks = officerRemarks;
    }

    setClearanceDocuments(docs);
    return { success: true, document: doc };
  }

  function getClearanceSummary() {
    const docs = getClearanceDocuments();
    const total = docs.length;
    const verified = docs.filter(d => d.status === 'Verified').length;
    const pending = docs.filter(d => d.status === 'Pending Verification' || d.status === 'Under Review').length;
    const rejected = docs.filter(d => d.status === 'Action Required' || d.status === 'Rejected').length;
    const percentComplete = total > 0 ? Math.round((verified / total) * 100) : 0;
    const allApproved = verified === total && total > 0;

    return {
      total,
      verified,
      pending,
      rejected,
      percentComplete,
      allApproved,
      screeningOfficer: 'Mr. E. O. Oladipo (Principal Assistant Registrar, Admissions & Records)',
      certificateId: 'UNL-CLR-2026-0142-CERT',
      status: allApproved ? 'Fully Cleared & Authenticated' : (percentComplete >= 80 ? 'Substantially Cleared' : 'In Progress')
    };
  }

  return {
    getStudent,
    setStudent,
    getWallet,
    setWallet,
    getBursaryPolicy,
    setBursaryPolicy,
    addApprovedFee,
    updateApprovedFee,
    deleteApprovedFee,
    getAuditStudents,
    fundWallet,
    payWithWallet,
    // Multi-Session Student Finance & Arrears API
    getMultiSessionFinances,
    setMultiSessionFinances,
    getPreviousSessionArrears,
    getFinancialLedger,
    payFeeItem,
    payBatchFees,
    payPreviousSessionArrears,
    payAllOutstandingFees,
    assessSessionArrears,
    waiveSessionArrears,
    resetFinanceData,
    getNotifications,
    setNotifications,
    getCourseCatalog,
    addCourseToCatalog,
    updateCourseInCatalog,
    deleteCourseFromCatalog,
    getCourseRegistration,
    saveCourseRegistration,
    setCourseBursaryClearance,
    resetCourseRegistrations,
    getAcademicResults,
    getResultsForLevelAndSemester,
    getResultsForLevelAndTerm,
    getOverallCGPASummary,
    // Clearance Documents API
    getClearanceDocuments,
    setClearanceDocuments,
    uploadStudentDocument,
    updateDocumentVerification,
    getClearanceSummary,
    // ICT Administration API
    getIctSettings,
    setIctSettings,
    getPortalGates,
    setPortalGates,
    updatePortalGate,
    togglePortalGate,
    isGateOpen,
    getUserDirectory,
    setUserDirectory,
    addUser,
    updateUser,
    deleteUser,
    bulkAddUsers,
    updateUserStatus,
    resetUserPassword,
    getAuditLogs,
    addAuditLog,
    dispatchBroadcast
  };
})();

window.UniStore = UniStore;
