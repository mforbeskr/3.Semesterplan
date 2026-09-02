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

// Course filter
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const course = btn.dataset.course;

    // Toggle active button
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Loop over all day-task groups
    document.querySelectorAll('.day-tasks').forEach(group => {
      const h4 = group.querySelector('h4');
      if (!h4) {
        group.style.display = 'none';
        return;
      }

      const courseName = h4.textContent.trim().toLowerCase();

      if (course === 'all') {
        group.style.display = '';
      } else {
        group.style.display = (courseName === course) ? '' : 'none';
      }
    });

    // Evening section
    document.querySelectorAll('.day-evening').forEach(evening => {
      const isEvening = evening.querySelector('h4').textContent.trim().toLowerCase() === 'aften';

      if (course === 'evening') {
        evening.style.display = '';
      } else if (course === 'all') {
        evening.style.display = '';
      } else {
        evening.style.display = 'none';
      }
    });
  });
});


// Week navigation
const weeks = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48];
const weekNav = document.getElementById("weekNav");
const weekCards = document.querySelectorAll(".week-card");

weeks.forEach((w, idx) => {
  const btn = document.createElement("button");
  btn.textContent = "Uge " + w;
  btn.className = "week-btn" + (idx === 0 ? " active" : "");
  btn.dataset.week = w;

  btn.addEventListener("click", () => {
    document.querySelectorAll(".week-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    weekCards.forEach(card => {
      card.classList.toggle("active", card.dataset.week === String(w));
    });

    window.scrollTo({
      top: weekNav.offsetTop - 20,
      behavior: "smooth"
    });
  });

  weekNav.appendChild(btn);
});
