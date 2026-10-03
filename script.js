// Auto-assign course classes
document.querySelectorAll('.day-column h4').forEach(h4 => {
  const key = h4.textContent.trim().toLowerCase();
  const map = {
    ads: "ads",
    cao: "cao",
    dnp: "dnp",
    dsy: "dsy",
    sep3: "sep3",
    aften: "evening"
  };
  if (map[key]) h4.classList.add(map[key]);
});

// On page-load
document.querySelectorAll('.day-tasks').forEach(day => {

    const children = [...day.children];
    let currentBlock = null;

    children.forEach(el => {

        if (el.tagName === 'H4') {

            const course = el.textContent.trim().toLowerCase();

            currentBlock = document.createElement('div');
            currentBlock.classList.add('course-block');

            if (
                ['ads', 'cao', 'dnp', 'dsy', 'sep3']
                .includes(course)
            ) {
                currentBlock.classList.add(course);
            }

            day.insertBefore(currentBlock, el);
            currentBlock.appendChild(el);

        } else if (
            currentBlock &&
            el.tagName === 'UL'
        ) {

            currentBlock.appendChild(el);

        }

    });

});

// Build course blocks automatically
document.querySelectorAll('.day-tasks').forEach(day => {

    const nodes = [...day.children];
    let currentBlock = null;

    nodes.forEach(node => {

        if (node.tagName === 'H4') {

            const course = node.textContent.trim().toLowerCase();

            currentBlock = document.createElement('div');
            currentBlock.classList.add('course-block', course);

            day.insertBefore(currentBlock, node);
            currentBlock.appendChild(node);

        } else if (
            currentBlock &&
            node.tagName === 'UL'
        ) {

            currentBlock.appendChild(node);

        }

    });

});


// Filter buttons
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(btn => {

    btn.addEventListener('click', () => {

        const course = btn.dataset.course;

        filterButtons.forEach(b =>
            b.classList.remove('active')
        );

        btn.classList.add('active');

        document.querySelectorAll('.course-block')
            .forEach(block => {

                if (course === 'all') {

                    block.style.display = '';

                } else {

                    block.style.display =
                        block.classList.contains(course)
                        ? ''
                        : 'none';

                }
            });

        document.querySelectorAll('.day-evening')
            .forEach(evening => {

                if (
                    course === 'all' ||
                    course === 'evening'
                ) {

                    evening.style.display = '';

                } else {

                    evening.style.display = 'none';

                }

            });

    });

});

// Dates (ISO weeks)
const SEMESTER_YEAR = 2026;
const dayOffsets = {
  mandag: 0, tirsdag: 1, onsdag: 2, torsdag: 3,
  fredag: 4, lørdag: 5, søndag: 6
};

// Monday of ISO week 1 is the Monday of the week containing Jan 4
function isoWeekMonday(year, week) {
  const jan4 = new Date(year, 0, 4);
  const monday = new Date(year, 0, 4 - ((jan4.getDay() + 6) % 7));
  monday.setDate(monday.getDate() + (week - 1) * 7);
  return monday;
}

function isoWeekOf(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7)); // Thursday of this week
  const jan4 = new Date(d.getFullYear(), 0, 4);
  return {
    year: d.getFullYear(),
    week: 1 + Math.round(((d - jan4) / 86400000 - 3 + ((jan4.getDay() + 6) % 7)) / 7)
  };
}

const sameDay = (a, b) => a.toDateString() === b.toDateString();
const formatDate = d =>
  d.toLocaleDateString("da-DK", { day: "numeric", month: "short" });

const today = new Date();

document.querySelectorAll(".week-card").forEach(card => {
  const monday = isoWeekMonday(SEMESTER_YEAR, Number(card.dataset.week));

  card.querySelectorAll(".day-column").forEach(col => {
    const nameEl = col.querySelector(".day-name");
    const offset = dayOffsets[nameEl.textContent.trim().toLowerCase()];
    if (offset === undefined) return;

    const date = new Date(monday);
    date.setDate(monday.getDate() + offset);

    const dateEl = document.createElement("span");
    dateEl.className = "day-date";
    dateEl.textContent = formatDate(date);
    nameEl.after(dateEl);

    if (sameDay(date, today)) col.classList.add("today");
  });
});

// Week navigation
const weeks = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48];
const weekNav = document.getElementById("weekNav");
const weekCards = document.querySelectorAll(".week-card");

function selectWeek(w) {
  document.querySelectorAll(".week-btn").forEach(b =>
    b.classList.toggle("active", b.dataset.week === String(w))
  );
  weekCards.forEach(card => {
    card.classList.toggle("active", card.dataset.week === String(w));
  });
}

weeks.forEach(w => {
  const btn = document.createElement("button");
  btn.textContent = "Uge " + w;
  btn.className = "week-btn";
  btn.dataset.week = w;

  btn.addEventListener("click", () => {
    selectWeek(w);

    window.scrollTo({
      top: weekNav.offsetTop - 20,
      behavior: "smooth"
    });
  });

  weekNav.appendChild(btn);
});

// Open on the current week (clamped to the semester range)
const current = isoWeekOf(today);
let startWeek = weeks[0];
if (current.year > SEMESTER_YEAR) {
  startWeek = weeks[weeks.length - 1];
} else if (current.year === SEMESTER_YEAR) {
  startWeek = Math.min(Math.max(current.week, weeks[0]), weeks[weeks.length - 1]);
}
selectWeek(startWeek);
