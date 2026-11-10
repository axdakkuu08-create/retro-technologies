(() => {
  document.documentElement.classList.add("js");

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-nav");

  if (menuButton && nav) {
    const closeMenu = (returnFocus = false) => {
      menuButton.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      if (returnFocus) menuButton.focus();
    };

    menuButton.addEventListener("click", () => {
      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open", !expanded);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeMenu());
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        closeMenu(true);
      }
    });

    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 761px)").matches) closeMenu();
    });
  }

  const catalogue = document.querySelector("#project-catalogue");
  if (catalogue) {
    const cards = [...catalogue.querySelectorAll(".project-card")];
    const groups = [...catalogue.querySelectorAll(".catalogue-group")];
    const cardHomes = new Map(cards.map((card, index) => [card, {
      group: card.closest(".catalogue-group"),
      grid: card.closest(".project-grid"),
      originalOrder: index
    }]));
    const search = document.querySelector("#product-search");
    const division = document.querySelector("#division-filter");
    const status = document.querySelector("#status-filter");
    const sort = document.querySelector("#sort-order");
    const clear = document.querySelector("#clear-filters");
    const count = document.querySelector("#catalogue-count");
    const empty = document.querySelector("#catalogue-empty");
    const searchForm = document.querySelector(".catalogue-tools");
    let sortedGrid = catalogue.querySelector("#sorted-projects");

    if (!sortedGrid) {
      sortedGrid = document.createElement("div");
      sortedGrid.id = "sorted-projects";
      sortedGrid.className = "project-grid sorted-project-grid";
      sortedGrid.hidden = true;
      catalogue.prepend(sortedGrid);
    }

    searchForm?.addEventListener("submit", (event) => event.preventDefault());

    const updateCatalogue = () => {
      const query = (search?.value || "").trim().toLocaleLowerCase();
      const selectedDivision = division?.value || "all";
      const selectedStatus = status?.value || "all";
      let visibleCount = 0;

      cards.forEach((card) => {
        const matchesQuery = !query || `${card.dataset.name} ${card.dataset.division}`.toLocaleLowerCase().includes(query);
        const matchesDivision = selectedDivision === "all" || card.dataset.division === selectedDivision;
        const matchesStatus = selectedStatus === "all" || card.dataset.status === selectedStatus;
        const visible = matchesQuery && matchesDivision && matchesStatus;
        card.hidden = !visible;
        if (visible) visibleCount += 1;
      });

      if (sort?.value === "name") {
        groups.forEach((group) => { group.hidden = true; });
        sortedGrid.hidden = false;
        [...cards]
          .sort((a, b) => a.dataset.name.localeCompare(b.dataset.name, "en", {sensitivity: "base"}))
          .forEach((card) => sortedGrid.append(card));
      } else {
        sortedGrid.hidden = true;
        cards.forEach((card) => {
          const home = cardHomes.get(card);
          home.grid.append(card);
        });
        groups.forEach((group) => {
          const hasVisibleProduct = cards.some((card) => cardHomes.get(card).group === group && !card.hidden);
          group.hidden = !hasVisibleProduct;
        });
      }

      if (count) count.textContent = `${visibleCount} ${visibleCount === 1 ? "product" : "products"} found`;
      if (empty) empty.hidden = visibleCount !== 0;
    };

    [search, division, status, sort].forEach((control) => {
      control?.addEventListener(control === search ? "input" : "change", updateCatalogue);
    });

    clear?.addEventListener("click", () => {
      if (search) search.value = "";
      if (division) division.value = "all";
      if (status) status.value = "all";
      if (sort) sort.value = "division";
      updateCatalogue();
      search?.focus();
    });

    document.querySelectorAll("[data-filter-division]").forEach((button) => {
      button.addEventListener("click", () => {
        if (division) division.value = button.dataset.filterDivision;
        updateCatalogue();
        document.querySelector("#ecosystem")?.scrollIntoView({behavior: "smooth", block: "start"});
        division?.focus({preventScroll: true});
      });
    });

    const queryDivision = new URLSearchParams(window.location.search).get("division");
    if (queryDivision && division && [...division.options].some((option) => option.value === queryDivision || option.textContent === queryDivision)) {
      division.value = queryDivision;
    }
    updateCatalogue();
  }

  const legacyPage = document.querySelector("[data-legacy-project]");
  if (legacyPage) {
    const slugs = {
      "nexus-ai": "nexus-ai",
      "repilot-ai": "repilot-ai",
      pulse: "pulse",
      "arcane-protocol": "arcane-protocol",
      "ai-engineering-os": "ai-engineering-os",
      "gemini-github-bridge": "gemini-github-bridge",
      "offline-online-app": "offline-online-app"
    };
    const selected = new URLSearchParams(window.location.search).get("project");
    if (selected && slugs[selected]) window.location.replace(`products/${slugs[selected]}/`);
  }

  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
