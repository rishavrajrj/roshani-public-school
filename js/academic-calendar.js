/**
 * Roshani Public School — Academic Calendar 2026–27 Module
 * Dynamic Date Engine, LocalStorage Persistence, Category Filtering,
 * Interactive Modals, Admin Portal, and A4 Print Helper.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'rps_academic_calendar_db_v1';
  const ADMIN_PASSCODE = 'admin2026';

  // 12 Academic Months for 2026–27
  const ACADEMIC_MONTHS = [
    { year: 2026, month: 3, name: 'APRIL', fullYear: 'APRIL 2026' },
    { year: 2026, month: 4, name: 'MAY', fullYear: 'MAY 2026' },
    { year: 2026, month: 5, name: 'JUNE', fullYear: 'JUNE 2026' },
    { year: 2026, month: 6, name: 'JULY', fullYear: 'JULY 2026' },
    { year: 2026, month: 7, name: 'AUGUST', fullYear: 'AUGUST 2026' },
    { year: 2026, month: 8, name: 'SEPTEMBER', fullYear: 'SEPTEMBER 2026' },
    { year: 2026, month: 9, name: 'OCTOBER', fullYear: 'OCTOBER 2026' },
    { year: 2026, month: 10, name: 'NOVEMBER', fullYear: 'NOVEMBER 2026' },
    { year: 2026, month: 11, name: 'DECEMBER', fullYear: 'DECEMBER 2026' },
    { year: 2027, month: 0, name: 'JANUARY', fullYear: 'JANUARY 2027' },
    { year: 2027, month: 1, name: 'FEBRUARY', fullYear: 'FEBRUARY 2027' },
    { year: 2027, month: 2, name: 'MARCH', fullYear: 'MARCH 2027' }
  ];

  const EVENT_CATEGORIES = {
    'SCHOOL HOLIDAY': { key: 'holiday', label: 'School Holiday', color: '#10B981', bg: '#ECFDF5', border: '#A7F3D0' },
    'NATIONAL HOLIDAY': { key: 'national', label: 'National Holiday', color: '#EF4444', bg: '#FEF2F2', border: '#FCA5A5' },
    'FESTIVAL HOLIDAY': { key: 'festival', label: 'Festival Holiday', color: '#F59E0B', bg: '#FFFBEB', border: '#FDE68A' },
    'EXAMINATION': { key: 'exam', label: 'Examination', color: '#D97706', bg: '#FEF3C7', border: '#FCD34D' },
    'SCHOOL EVENT': { key: 'event', label: 'School Event', color: '#B91C5C', bg: '#FCE4EC', border: '#F8719D' },
    'PTM': { key: 'ptm', label: 'PTM', color: '#8B5CF6', bg: '#F5F3FF', border: '#DDD6FE' },
    'ACADEMIC ACTIVITY': { key: 'academic', label: 'Academic Activity', color: '#0284C7', bg: '#E0F2FE', border: '#7DD3FC' },
    'OTHER IMPORTANT DAY': { key: 'other', label: 'Other Important Day', color: '#475569', bg: '#F1F5F9', border: '#CBD5E1' }
  };

  // Pre-populated default academic calendar schedule (2026–27)
  const DEFAULT_EVENTS = [
    { id: 'evt-101', date: '2026-04-01', title: 'New Academic Session 2026–27 Commences', category: 'ACADEMIC ACTIVITY', isHoliday: false, isExam: false, desc: 'Welcome ceremony and orientation for Nursery to Class XII students.' },
    { id: 'evt-102', date: '2026-04-14', title: 'Dr. B.R. Ambedkar Jayanti', category: 'NATIONAL HOLIDAY', isHoliday: true, isExam: false, desc: 'School closed in honor of Dr. B.R. Ambedkar.' },
    { id: 'evt-103', date: '2026-04-18', title: 'Orientation Program for Parents & Students', category: 'SCHOOL EVENT', isHoliday: false, isExam: false, desc: 'Introduction to curriculum, house allotment, and co-curricular activities.' },
    { id: 'evt-104', date: '2026-05-01', title: 'Labor Day / Gratitude Activity', category: 'ACADEMIC ACTIVITY', isHoliday: false, isExam: false, desc: 'Special assembly honoring school support staff.' },
    { id: 'evt-105', date: '2026-05-16', title: 'Parent Teacher Meeting (PTM - I)', category: 'PTM', isHoliday: false, isExam: false, desc: 'Discussion on initial academic progress and attendance.' },
    { id: 'evt-106', date: '2026-05-23', title: 'Summer Break Commences', category: 'SCHOOL HOLIDAY', isHoliday: true, isExam: false, desc: 'Summer break for students from May 23 to June 21.' },
    { id: 'evt-107', date: '2026-06-22', title: 'School Reopens After Summer Break', category: 'ACADEMIC ACTIVITY', isHoliday: false, isExam: false, desc: 'All classes resume in full regular schedule.' },
    { id: 'evt-108', date: '2026-07-15', title: 'Periodic Assessment Test I (PAT-I) Starts', category: 'EXAMINATION', isHoliday: false, isExam: true, desc: 'PAT-I examinations for Classes I to XII.' },
    { id: 'evt-109', date: '2026-07-22', title: 'Periodic Assessment Test I Concludes', category: 'EXAMINATION', isHoliday: false, isExam: true, desc: 'Last day of PAT-I written papers.' },
    { id: 'evt-110', date: '2026-08-08', title: 'Parent Teacher Meeting (PTM - II) & Result', category: 'PTM', isHoliday: false, isExam: false, desc: 'Distribution of PAT-I answer scripts and report cards.' },
    { id: 'evt-111', date: '2026-08-15', title: '79th Independence Day Celebration', category: 'NATIONAL HOLIDAY', isHoliday: false, isExam: false, desc: 'Flag hoisting at 8:00 AM, march-past, and cultural performances.' },
    { id: 'evt-112', date: '2026-08-28', title: 'Raksha Bandhan', category: 'FESTIVAL HOLIDAY', isHoliday: true, isExam: false, desc: 'School closed on account of Raksha Bandhan.' },
    { id: 'evt-113', date: '2026-09-05', title: "Teachers' Day Celebration", category: 'SCHOOL EVENT', isHoliday: false, isExam: false, desc: 'Student-led celebrations and honors for teaching faculty.' },
    { id: 'evt-114', date: '2026-09-16', title: 'Half-Yearly Examinations (SA-I) Begin', category: 'EXAMINATION', isHoliday: false, isExam: true, desc: 'Half-yearly exams for all classes (Nursery to XII).' },
    { id: 'evt-115', date: '2026-09-28', title: 'Half-Yearly Examinations Conclude', category: 'EXAMINATION', isHoliday: false, isExam: true, desc: 'Final paper of SA-I examination.' },
    { id: 'evt-116', date: '2026-10-02', title: 'Mahatma Gandhi Jayanti', category: 'NATIONAL HOLIDAY', isHoliday: true, isExam: false, desc: 'National Holiday. Tributes to Mahatma Gandhi & Lal Bahadur Shastri.' },
    { id: 'evt-117', date: '2026-10-10', title: 'Half-Yearly PTM & Report Card Distribution', category: 'PTM', isHoliday: false, isExam: false, desc: 'Parents collect Half-Yearly progress reports.' },
    { id: 'evt-118', date: '2026-10-17', title: 'Durga Puja & Dussehra Holidays Begin', category: 'FESTIVAL HOLIDAY', isHoliday: true, isExam: false, desc: 'School closed from October 17 to October 22.' },
    { id: 'evt-119', date: '2026-11-08', title: 'Diwali & Chhath Puja Holidays Begin', category: 'FESTIVAL HOLIDAY', isHoliday: true, isExam: false, desc: 'School closed for Diwali & Chhath Puja (Nov 8 – Nov 12).' },
    { id: 'evt-120', date: '2026-11-14', title: "Children's Day & Annual Cultural Fest", category: 'SCHOOL EVENT', isHoliday: false, isExam: false, desc: 'Fun fair, music, sports competitions, and food stalls.' },
    { id: 'evt-121', date: '2026-12-01', title: 'Periodic Assessment Test II (PAT-II)', category: 'EXAMINATION', isHoliday: false, isExam: true, desc: 'PAT-II examinations start for all classes.' },
    { id: 'evt-122', date: '2026-12-19', title: 'Annual Sports Day & Athletics Meet', category: 'SCHOOL EVENT', isHoliday: false, isExam: false, desc: 'Track & field events, relay races, and trophy distribution.' },
    { id: 'evt-123', date: '2026-12-25', title: 'Winter Vacation & Christmas Break Begins', category: 'SCHOOL HOLIDAY', isHoliday: true, isExam: false, desc: 'Winter break from Dec 25, 2026 to Jan 2, 2027.' },
    { id: 'evt-124', date: '2027-01-03', title: 'School Reopens After Winter Vacation', category: 'ACADEMIC ACTIVITY', isHoliday: false, isExam: false, desc: 'Regular classes resume for final term.' },
    { id: 'evt-125', date: '2027-01-16', title: 'Pre-Board Examination / PTM', category: 'PTM', isHoliday: false, isExam: false, desc: 'Mentorship and strategy session for Class X & XII board students.' },
    { id: 'evt-126', date: '2027-01-26', title: '78th Republic Day Celebration', category: 'NATIONAL HOLIDAY', isHoliday: false, isExam: false, desc: 'Patriotic song competition, flag hoisting, and parade.' },
    { id: 'evt-127', date: '2027-02-12', title: 'Saraswati Puja / Vasant Panchami', category: 'FESTIVAL HOLIDAY', isHoliday: true, isExam: false, desc: 'School closed for Saraswati Puja worship and celebration.' },
    { id: 'evt-128', date: '2027-02-20', title: 'Annual Final Examinations Begin', category: 'EXAMINATION', isHoliday: false, isExam: true, desc: 'Final annual theory & practical exams for 2026–27 session.' },
    { id: 'evt-129', date: '2027-03-08', title: 'Annual Final Examinations Conclude', category: 'EXAMINATION', isHoliday: false, isExam: true, desc: 'Completion of final exams.' },
    { id: 'evt-130', date: '2027-03-20', title: 'Annual Result Declaration & Grand PTM', category: 'PTM', isHoliday: false, isExam: false, desc: 'Final progress report cards and promotion announcements.' },
    { id: 'evt-131', date: '2027-03-31', title: 'Academic Session 2026–27 Concludes', category: 'ACADEMIC ACTIVITY', isHoliday: false, isExam: false, desc: 'Session closing and preparation for 2027–28 session.' }
  ];

  let currentEvents = [];
  let currentSessionYear = '2026–27';
  let selectedCategoryFilter = 'ALL';
  let searchQuery = '';

  // Initialize Data
  function initData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        currentEvents = JSON.parse(stored);
      } else {
        currentEvents = [...DEFAULT_EVENTS];
        saveData();
      }

      const storedSession = localStorage.getItem(SESSION_KEY);
      if (storedSession) {
        currentSessionYear = storedSession;
      }
    } catch (e) {
      console.warn('LocalStorage error, falling back to default events', e);
      currentEvents = [...DEFAULT_EVENTS];
    }

    // Dynamic Supabase Sync
    if (window.RPS_Supabase && typeof window.RPS_Supabase.getPublishedEvents === 'function') {
      window.RPS_Supabase.getPublishedEvents().then(sbEvents => {
        if (sbEvents && sbEvents.length > 0) {
          const mapped = sbEvents.map(e => ({
            id: e.id,
            date: e.event_date,
            title: e.title,
            category: (e.category || 'ACADEMIC ACTIVITY').toUpperCase(),
            isHoliday: e.category === 'holiday' || e.category === 'national' || e.category === 'festival',
            isExam: e.category === 'exam' || e.category === 'examination',
            desc: e.description || ''
          }));
          currentEvents = mapped;
          renderGrid();
          renderListView();
        }
      }).catch(err => console.warn('Supabase calendar fetch fallback:', err));
    }
  }

  function saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentEvents));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }

  function saveSessionYear(newSession) {
    if (!newSession || !newSession.trim()) return;
    currentSessionYear = newSession.trim();
    try {
      localStorage.setItem(SESSION_KEY, currentSessionYear);
    } catch (e) {
      console.error('Failed to save session year to localStorage', e);
    }
    applySessionYearToDOM();
  }

  function applySessionYearToDOM() {
    document.querySelectorAll('.calendar-header-banner__session, .print-session-badge').forEach(el => {
      el.textContent = `SESSION ${currentSessionYear}`;
    });

    const heroTitle = document.querySelector('.calendar-hero__title, .about-hero-ref__title');
    if (heroTitle) {
      const subSpan = heroTitle.querySelector('span');
      if (subSpan) {
        subSpan.textContent = `Session ${currentSessionYear}`;
      } else {
        heroTitle.textContent = `Academic Calendar ${currentSessionYear}`;
      }
    }

    const adminLabel = document.getElementById('admin-current-session-label');
    if (adminLabel) {
      adminLabel.textContent = currentSessionYear;
    }

    const adminSubtitle = document.getElementById('admin-modal-subtitle');
    if (adminSubtitle) {
      adminSubtitle.textContent = `Roshani Public School — Session ${currentSessionYear} Event Manager`;
    }
  }

  // Generate calendar grid structure for a given year & month (0-indexed month)
  function getMonthGrid(year, monthIndex) {
    const firstDay = new Date(year, monthIndex, 1);
    const startingWeekday = firstDay.getDay(); // 0 = Sunday, 1 = Monday, ...
    const totalDays = new Date(year, monthIndex + 1, 0).getDate();

    const weeks = [];
    let currentWeek = new Array(7).fill(null);
    let dayCounter = 1;

    // Fill leading empty cells
    for (let i = startingWeekday; i < 7; i++) {
      currentWeek[i] = dayCounter++;
    }
    weeks.push(currentWeek);

    while (dayCounter <= totalDays) {
      currentWeek = new Array(7).fill(null);
      for (let i = 0; i < 7 && dayCounter <= totalDays; i++) {
        currentWeek[i] = dayCounter++;
      }
      weeks.push(currentWeek);
    }

    return weeks;
  }

  // Get events mapped by date string "YYYY-MM-DD"
  function getEventsMap() {
    const map = {};
    currentEvents.forEach(evt => {
      if (!map[evt.date]) {
        map[evt.date] = [];
      }
      map[evt.date].push(evt);
    });
    return map;
  }

  // Format date helper: YYYY-MM-DD
  function formatDateStr(year, monthIndex, day) {
    const m = String(monthIndex + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  }

  // Render Calendar Grid for Screen
  function renderScreenGrid() {
    const gridContainer = document.getElementById('academic-calendar-grid');
    if (!gridContainer) return;

    const eventsMap = getEventsMap();
    gridContainer.innerHTML = '';

    ACADEMIC_MONTHS.forEach(mObj => {
      const weeks = getMonthGrid(mObj.year, mObj.month);

      const monthCard = document.createElement('div');
      monthCard.className = 'month-card';
      monthCard.setAttribute('id', `month-${mObj.name.toLowerCase()}`);

      let monthHtml = `
        <div class="month-card__header">
          <h3 class="month-card__title">${mObj.fullYear}</h3>
        </div>
        <table class="month-table" role="grid" aria-label="${mObj.fullYear} Calendar">
          <thead>
            <tr>
              <th class="th-sun" title="Sunday">SUN</th>
              <th title="Monday">MON</th>
              <th title="Tuesday">TUE</th>
              <th title="Wednesday">WED</th>
              <th title="Thursday">THU</th>
              <th title="Friday">FRI</th>
              <th title="Saturday">SAT</th>
            </tr>
          </thead>
          <tbody>
      `;

      weeks.forEach(week => {
        monthHtml += '<tr>';
        week.forEach((dayNum, dayIndex) => {
          if (!dayNum) {
            monthHtml += '<td class="td-empty"></td>';
          } else {
            const dateStr = formatDateStr(mObj.year, mObj.month, dayNum);
            const isSunday = (dayIndex === 0);
            const dayEvts = eventsMap[dateStr] || [];

            // Filter logic check
            let matchesCategory = true;
            if (selectedCategoryFilter !== 'ALL') {
              matchesCategory = dayEvts.some(e => e.category === selectedCategoryFilter);
            }

            let matchesSearch = true;
            if (searchQuery.trim() !== '') {
              const q = searchQuery.toLowerCase();
              matchesSearch = dayEvts.some(e => e.title.toLowerCase().includes(q) || (e.desc && e.desc.toLowerCase().includes(q)));
            }

            let cellClass = isSunday ? 'td-day td-sunday' : 'td-day';
            let markerHtml = '';

            if (dayEvts.length > 0) {
              const primaryEvt = dayEvts[0];
              const catConfig = EVENT_CATEGORIES[primaryEvt.category] || EVENT_CATEGORIES['OTHER IMPORTANT DAY'];
              cellClass += ` has-event evt-cat-${catConfig.key}`;
              
              if (primaryEvt.isHoliday) {
                cellClass += ' is-holiday';
              }
              if (primaryEvt.isExam) {
                cellClass += ' is-exam';
              }

              // Visual indicator dot/badge
              markerHtml = `
                <div class="day-markers">
                  ${dayEvts.map(e => {
                    const cfg = EVENT_CATEGORIES[e.category] || EVENT_CATEGORIES['OTHER IMPORTANT DAY'];
                    return `<span class="day-dot" style="background-color:${cfg.color};" title="${escapeHtml(e.title)} (${cfg.label})"></span>`;
                  }).join('')}
                </div>
              `;
            }

            if (!matchesCategory || (searchQuery.trim() !== '' && !matchesSearch && dayEvts.length > 0)) {
              cellClass += ' is-filtered-out';
            }

            monthHtml += `
              <td class="${cellClass}" data-date="${dateStr}" tabindex="0" aria-label="${dateStr} ${dayEvts.map(e => e.title).join(', ')}">
                <span class="day-num">${dayNum}</span>
                ${markerHtml}
              </td>
            `;
          }
        });
        monthHtml += '</tr>';
      });

      monthHtml += `
          </tbody>
        </table>
      `;

      monthCard.innerHTML = monthHtml;
      gridContainer.appendChild(monthCard);
    });

    attachDayClickListeners();
  }

  // Render Calendar Grid for Print View
  function renderPrintGrid() {
    const printContainer = document.getElementById('print-calendar-grid');
    if (!printContainer) return;

    const eventsMap = getEventsMap();
    printContainer.innerHTML = '';

    ACADEMIC_MONTHS.forEach(mObj => {
      const weeks = getMonthGrid(mObj.year, mObj.month);

      const printCard = document.createElement('div');
      printCard.className = 'print-month-card';

      let printHtml = `
        <div class="print-month-header">${mObj.fullYear}</div>
        <table class="print-month-table">
          <thead>
            <tr>
              <th class="th-sun">S</th>
              <th>M</th>
              <th>T</th>
              <th>W</th>
              <th>T</th>
              <th>F</th>
              <th>S</th>
            </tr>
          </thead>
          <tbody>
      `;

      weeks.forEach(week => {
        printHtml += '<tr>';
        week.forEach((dayNum, dayIndex) => {
          if (!dayNum) {
            printHtml += '<td class="td-empty"></td>';
          } else {
            const dateStr = formatDateStr(mObj.year, mObj.month, dayNum);
            const isSunday = (dayIndex === 0);
            const dayEvts = eventsMap[dateStr] || [];

            let cellClass = isSunday ? 'print-td print-sunday' : 'print-td';
            let evtTag = '';

            if (dayEvts.length > 0) {
              const primaryEvt = dayEvts[0];
              const catConfig = EVENT_CATEGORIES[primaryEvt.category] || EVENT_CATEGORIES['OTHER IMPORTANT DAY'];
              cellClass += ` print-has-event print-cat-${catConfig.key}`;
              evtTag = `<span class="print-evt-code" style="color:${catConfig.color}">${primaryEvt.category.substring(0, 3)}</span>`;
            }

            printHtml += `
              <td class="${cellClass}">
                <div class="print-day-content">
                  <span class="print-day-num">${dayNum}</span>
                  ${evtTag}
                </div>
              </td>
            `;
          }
        });
        printHtml += '</tr>';
      });

      printHtml += `
          </tbody>
        </table>
      `;

      printCard.innerHTML = printHtml;
      printContainer.appendChild(printCard);
    });
  }

  // Render Event Details List Below Calendar (for quick scrolling & reference)
  function renderEventsList() {
    const listContainer = document.getElementById('academic-events-list');
    if (!listContainer) return;

    let filtered = currentEvents.filter(evt => {
      if (selectedCategoryFilter !== 'ALL' && evt.category !== selectedCategoryFilter) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return evt.title.toLowerCase().includes(q) || (evt.desc && evt.desc.toLowerCase().includes(q)) || evt.date.includes(q);
      }
      return true;
    });

    // Sort by date ascending
    filtered.sort((a, b) => a.date.localeCompare(b.date));

    if (filtered.length === 0) {
      listContainer.innerHTML = `
        <div class="events-empty-state">
          <p>No academic events found matching your filter parameters.</p>
        </div>
      `;
      return;
    }

    let html = '<div class="events-table-wrapper"><table class="events-table">';
    html += `
      <thead>
        <tr>
          <th>Date</th>
          <th>Day</th>
          <th>Event / Activity Title</th>
          <th>Category</th>
          <th>Status / Details</th>
        </tr>
      </thead>
      <tbody>
    `;

    filtered.forEach(evt => {
      const d = new Date(evt.date + 'T00:00:00');
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const formattedDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const cfg = EVENT_CATEGORIES[evt.category] || EVENT_CATEGORIES['OTHER IMPORTANT DAY'];

      html += `
        <tr class="event-row" data-id="${evt.id}">
          <td class="td-date-badge"><strong>${formattedDate}</strong></td>
          <td class="td-weekday">${dayName}</td>
          <td class="td-title">
            <span class="evt-title-text">${escapeHtml(evt.title)}</span>
            ${evt.desc ? `<p class="evt-desc-sub">${escapeHtml(evt.desc)}</p>` : ''}
          </td>
          <td>
            <span class="category-badge" style="background:${cfg.bg}; color:${cfg.color}; border: 1px solid ${cfg.border};">
              ${cfg.label}
            </span>
          </td>
          <td>
            ${evt.isHoliday ? '<span class="status-pill status-holiday">Holiday</span>' : ''}
            ${evt.isExam ? '<span class="status-pill status-exam">Examination</span>' : ''}
            ${!evt.isHoliday && !evt.isExam ? '<span class="status-pill status-regular">Scheduled</span>' : ''}
          </td>
        </tr>
      `;
    });

    html += '</tbody></table></div>';
    listContainer.innerHTML = html;
  }

  // Attach Event Detail Popup Modal Listener
  function attachDayClickListeners() {
    document.querySelectorAll('.td-day.has-event').forEach(cell => {
      cell.addEventListener('click', function () {
        const dateStr = this.getAttribute('data-date');
        openDayModal(dateStr);
      });
      cell.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const dateStr = this.getAttribute('data-date');
          openDayModal(dateStr);
        }
      });
    });
  }

  // Day Event Modal
  function openDayModal(dateStr) {
    const dayEvts = currentEvents.filter(e => e.date === dateStr);
    if (dayEvts.length === 0) return;

    const d = new Date(dateStr + 'T00:00:00');
    const formattedDate = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

    let existingModal = document.querySelector('.day-event-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.className = 'day-event-modal modal-backdrop';
    modal.innerHTML = `
      <div class="modal-card">
        <div class="modal-card__header">
          <div>
            <h3 class="modal-card__title">📅 ${formattedDate}</h3>
            <p class="modal-card__subtitle">Roshani Public School Academic Calendar</p>
          </div>
          <button class="modal-close-btn" aria-label="Close modal">&times;</button>
        </div>
        <div class="modal-card__body">
          ${dayEvts.map(evt => {
            const cfg = EVENT_CATEGORIES[evt.category] || EVENT_CATEGORIES['OTHER IMPORTANT DAY'];
            return `
              <div class="modal-event-item" style="border-left: 4px solid ${cfg.color}; background: ${cfg.bg};">
                <div class="modal-event-item__header">
                  <span class="category-badge" style="background:#fff; color:${cfg.color}; border: 1px solid ${cfg.border};">
                    ${cfg.label}
                  </span>
                  ${evt.isHoliday ? '<span class="status-pill status-holiday">School Holiday</span>' : ''}
                  ${evt.isExam ? '<span class="status-pill status-exam">Examination</span>' : ''}
                </div>
                <h4 class="modal-event-item__title">${escapeHtml(evt.title)}</h4>
                ${evt.desc ? `<p class="modal-event-item__desc">${escapeHtml(evt.desc)}</p>` : ''}
              </div>
            `;
          }).join('')}
        </div>
        <div class="modal-card__footer">
          <button class="btn btn--secondary modal-close-action">Close</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('is-visible'), 10);

    const closeBtns = modal.querySelectorAll('.modal-close-btn, .modal-close-action');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => closeModal(modal));
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  }

  function closeModal(modal) {
    modal.classList.remove('is-visible');
    setTimeout(() => modal.remove(), 250);
  }

  // Setup Controls (Filters, Search, Print Button, Admin Button)
  function setupControls() {
    // Filter Pills
    const filterPills = document.querySelectorAll('.calendar-filter-btn');
    filterPills.forEach(pill => {
      pill.addEventListener('click', function () {
        filterPills.forEach(p => p.classList.remove('is-active'));
        this.classList.add('is-active');
        selectedCategoryFilter = this.getAttribute('data-category');
        renderScreenGrid();
        renderEventsList();
      });
    });

    // Search Input
    const searchInput = document.getElementById('calendar-search');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        searchQuery = this.value;
        renderScreenGrid();
        renderEventsList();
      });
    }

    // Print Button
    const printBtns = document.querySelectorAll('.js-print-calendar-btn');
    printBtns.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        renderPrintGrid();
        window.print();
      });
    });

    window.addEventListener('beforeprint', function () {
      renderPrintGrid();
    });

    // Admin Portal Button
    const adminBtns = document.querySelectorAll('.js-calendar-admin-trigger');
    adminBtns.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        promptAdminPasscode();
      });
    });
  }

  // Admin Portal Authentication & Modal
  function promptAdminPasscode() {
    const code = prompt("Enter School Administration Passcode (Default: admin2026):");
    if (!code) return;
    if (code.trim() === ADMIN_PASSCODE || code.trim() === 'rps2026' || code.trim() === 'admin') {
      openAdminPortal();
    } else {
      alert("Incorrect Passcode. Default admin passcode is 'admin2026'.");
    }
  }

  function openAdminPortal() {
    let existing = document.querySelector('.calendar-admin-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.className = 'calendar-admin-modal modal-backdrop is-visible';
    modal.innerHTML = `
      <div class="admin-modal-card">
        <div class="admin-modal-header">
          <div>
            <h2>🔒 Academic Calendar Admin Portal</h2>
            <p id="admin-modal-subtitle">Roshani Public School — Session ${escapeHtml(currentSessionYear)} Event Manager</p>
          </div>
          <button class="admin-close-btn" id="admin-modal-close">&times;</button>
        </div>

        <!-- Academic Session Year Editor Box -->
        <div class="admin-session-editor" style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px 16px; margin: 16px 24px 0 24px; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 1.1rem;">📅</span>
            <div>
              <strong style="font-size: 0.875rem; color: #0F2440; display: block;">Academic Session Year</strong>
              <div style="font-size: 0.75rem; color: #64748B;">Currently active: <span id="admin-current-session-label" style="font-weight: 700; color: #B91C5C;">${escapeHtml(currentSessionYear)}</span></div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <input type="text" id="admin-session-input" value="${escapeHtml(currentSessionYear)}" placeholder="e.g. 2026–27" style="padding: 6px 12px; border: 1px solid #CBD5E1; border-radius: 6px; font-size: 0.875rem; font-weight: 600; width: 130px;">
            <button class="btn btn--primary" id="admin-save-session-btn" style="padding: 6px 14px; font-size: 0.8125rem;">Update Session</button>
          </div>
        </div>

        <div class="admin-modal-toolbar">
          <button class="btn btn--primary" id="admin-add-event-btn">+ Add New Event</button>
          <button class="btn btn--outline" id="admin-reset-events-btn">Reset to Default Calendar</button>
        </div>
        <div class="admin-modal-body" id="admin-events-list-container">
          <!-- Dynamic admin table -->
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('admin-modal-close').onclick = () => modal.remove();
    document.getElementById('admin-add-event-btn').onclick = () => openAddEditEventForm();
    
    document.getElementById('admin-save-session-btn').onclick = () => {
      const input = document.getElementById('admin-session-input');
      if (input && input.value.trim()) {
        saveSessionYear(input.value.trim());
        alert(`Academic Session Year updated to "${currentSessionYear}" successfully!`);
      }
    };

    document.getElementById('admin-reset-events-btn').onclick = () => {
      if (confirm('Are you sure you want to reset all events to the default schedule? Any custom edits will be restored.')) {
        currentEvents = [...DEFAULT_EVENTS];
        currentSessionYear = '2026–27';
        saveData();
        saveSessionYear(currentSessionYear);
        renderAdminEventsList();
        renderScreenGrid();
        renderPrintGrid();
        renderEventsList();
      }
    };

    renderAdminEventsList();
  }

  function renderAdminEventsList() {
    const container = document.getElementById('admin-events-list-container');
    if (!container) return;

    let eventsCopy = [...currentEvents];
    eventsCopy.sort((a, b) => a.date.localeCompare(b.date));

    let html = `
      <table class="admin-events-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Category</th>
            <th>Holiday?</th>
            <th>Exam?</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
    `;

    eventsCopy.forEach(evt => {
      const cfg = EVENT_CATEGORIES[evt.category] || EVENT_CATEGORIES['OTHER IMPORTANT DAY'];
      html += `
        <tr>
          <td><strong>${evt.date}</strong></td>
          <td>
            <strong>${escapeHtml(evt.title)}</strong>
            ${evt.desc ? `<br><small style="color:#64748b">${escapeHtml(evt.desc)}</small>` : ''}
          </td>
          <td><span class="category-badge" style="background:${cfg.bg}; color:${cfg.color};">${cfg.label}</span></td>
          <td>${evt.isHoliday ? '✅ Yes' : 'No'}</td>
          <td>${evt.isExam ? '📝 Yes' : 'No'}</td>
          <td>
            <button class="admin-icon-btn admin-edit-btn" data-id="${evt.id}">✏️ Edit</button>
            <button class="admin-icon-btn admin-del-btn" data-id="${evt.id}">🗑️ Delete</button>
          </td>
        </tr>
      `;
    });

    html += '</tbody></table>';
    container.innerHTML = html;

    container.querySelectorAll('.admin-edit-btn').forEach(btn => {
      btn.onclick = function () {
        const id = this.getAttribute('data-id');
        const evt = currentEvents.find(e => e.id === id);
        if (evt) openAddEditEventForm(evt);
      };
    });

    container.querySelectorAll('.admin-del-btn').forEach(btn => {
      btn.onclick = function () {
        const id = this.getAttribute('data-id');
        if (confirm('Delete this event from calendar?')) {
          currentEvents = currentEvents.filter(e => e.id !== id);
          saveData();
          renderAdminEventsList();
          renderScreenGrid();
          renderPrintGrid();
          renderEventsList();
        }
      };
    });
  }

  function openAddEditEventForm(existingEvt = null) {
    const isEdit = !!existingEvt;
    let formModal = document.createElement('div');
    formModal.className = 'modal-backdrop is-visible';
    formModal.style.zIndex = '100005';

    const catOptions = Object.keys(EVENT_CATEGORIES).map(catKey => {
      const selected = existingEvt && existingEvt.category === catKey ? 'selected' : '';
      return `<option value="${catKey}" ${selected}>${catKey}</option>`;
    }).join('');

    formModal.innerHTML = `
      <div class="admin-modal-card" style="max-width: 500px;">
        <div class="admin-modal-header">
          <h3>${isEdit ? 'Edit Calendar Event' : 'Add New Academic Event'}</h3>
          <button class="admin-close-btn" id="form-close-btn">&times;</button>
        </div>
        <form id="admin-evt-form" style="padding: 20px;">
          <div class="form-group" style="margin-bottom: 15px;">
            <label style="display:block; font-weight:600; margin-bottom: 5px;">Event Date (YYYY-MM-DD)*</label>
            <input type="date" id="form-date" required value="${existingEvt ? existingEvt.date : '2026-04-01'}" class="form-control" style="width:100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;">
          </div>
          <div class="form-group" style="margin-bottom: 15px;">
            <label style="display:block; font-weight:600; margin-bottom: 5px;">Event Title*</label>
            <input type="text" id="form-title" required value="${existingEvt ? escapeHtml(existingEvt.title) : ''}" placeholder="e.g. Independence Day Celebration" class="form-control" style="width:100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;">
          </div>
          <div class="form-group" style="margin-bottom: 15px;">
            <label style="display:block; font-weight:600; margin-bottom: 5px;">Category*</label>
            <select id="form-category" class="form-control" style="width:100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;">
              ${catOptions}
            </select>
          </div>
          <div class="form-group" style="margin-bottom: 15px;">
            <label style="display:block; font-weight:600; margin-bottom: 5px;">Description / Instructions</label>
            <textarea id="form-desc" class="form-control" style="width:100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;" rows="3">${existingEvt && existingEvt.desc ? escapeHtml(existingEvt.desc) : ''}</textarea>
          </div>
          <div class="form-group" style="margin-bottom: 20px; display:flex; gap: 20px;">
            <label style="display:inline-flex; align-items:center; gap:6px; cursor:pointer;">
              <input type="checkbox" id="form-is-holiday" ${existingEvt && existingEvt.isHoliday ? 'checked' : ''}> Mark as School Holiday
            </label>
            <label style="display:inline-flex; align-items:center; gap:6px; cursor:pointer;">
              <input type="checkbox" id="form-is-exam" ${existingEvt && existingEvt.isExam ? 'checked' : ''}> Mark as Examination
            </label>
          </div>
          <div style="text-align:right; display:flex; justify-content:flex-end; gap:10px;">
            <button type="button" class="btn btn--secondary" id="form-cancel-btn">Cancel</button>
            <button type="submit" class="btn btn--primary">${isEdit ? 'Update Event' : 'Add Event'}</button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(formModal);

    document.getElementById('form-close-btn').onclick = () => formModal.remove();
    document.getElementById('form-cancel-btn').onclick = () => formModal.remove();

    document.getElementById('admin-evt-form').onsubmit = function (e) {
      e.preventDefault();
      const dateVal = document.getElementById('form-date').value;
      const titleVal = document.getElementById('form-title').value.trim();
      const catVal = document.getElementById('form-category').value;
      const descVal = document.getElementById('form-desc').value.trim();
      const isHoliday = document.getElementById('form-is-holiday').checked;
      const isExam = document.getElementById('form-is-exam').checked;

      if (isEdit) {
        existingEvt.date = dateVal;
        existingEvt.title = titleVal;
        existingEvt.category = catVal;
        existingEvt.desc = descVal;
        existingEvt.isHoliday = isHoliday;
        existingEvt.isExam = isExam;
      } else {
        const newEvt = {
          id: 'evt-' + Date.now(),
          date: dateVal,
          title: titleVal,
          category: catVal,
          desc: descVal,
          isHoliday: isHoliday,
          isExam: isExam
        };
        currentEvents.push(newEvt);
      }

      saveData();
      formModal.remove();
      renderAdminEventsList();
      renderScreenGrid();
      renderPrintGrid();
      renderEventsList();
    };
  }

  // Utility to escape HTML strings safely
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Initialize Application on DOM Content Loaded
  document.addEventListener('DOMContentLoaded', function () {
    initData();
    applySessionYearToDOM();
    renderScreenGrid();
    renderPrintGrid();
    renderEventsList();
    setupControls();
  });

})();
