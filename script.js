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

// Course filter
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(btn => {

    btn.addEventListener('click', () => {

        const course = btn.dataset.course;

        filterButtons.forEach(b =>
            b.classList.remove('active')
        );

        btn.classList.add('active');

        document
            .querySelectorAll('.course-block')
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

        document
            .querySelectorAll('.day-evening')
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
