  const reveals = document.querySelectorAll(".project-card, .footer-card");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach(el => {
    el.classList.add("reveal");
    observer.observe(el);
  });

    const filterButtons = document.querySelectorAll(".work-filters button");
  const projects = document.querySelectorAll(".project-card");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.textContent.toLowerCase();

      // Active state
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      projects.forEach(card => {
        const category = card.dataset.category;

        if (filter === "all projects" || category === filter) {
          card.classList.remove("hide");
          card.classList.add("show");
        } else {
          card.classList.remove("show");
          card.classList.add("hide");
        }
      });
    });
  });