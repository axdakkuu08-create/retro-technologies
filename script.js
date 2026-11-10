const projects = [
  {id:"nexus-ai",name:"NEXUS-AI",category:"AI & Automation",symbol:"N",description:"An AI platform focused on intelligent assistants and agent orchestration.",status:"Status not yet verified"},
  {id:"repilot-ai",name:"RepoPilot AI",category:"AI & Automation",symbol:"R",description:"Repository intelligence and developer assistance for understanding and working with codebases.",status:"Status not yet verified"},
  {id:"pulse",name:"Pulse",category:"Entertainment",symbol:"P",description:"An independent music discovery and streaming experience.",status:"Status not yet verified"},
  {id:"arcane-protocol",name:"Arcane Protocol",category:"Gaming",symbol:"A",description:"A sci-fi first-person shooter project with its own world and gameplay direction.",status:"Status not yet verified"},
  {id:"ai-engineering-os",name:"AI Engineering OS",category:"Engineering",symbol:"E",description:"An AI-assisted engineering workspace focused on structured, verifiable development.",status:"Status not yet verified"},
  {id:"gemini-github-bridge",name:"Gemini GitHub Bridge",category:"Integrations",symbol:"G",description:"An integration project connecting AI workflows with GitHub engineering tasks.",status:"Status not yet verified"},
  {id:"offline-online-app",name:"Offline / Online App",category:"New Product",symbol:"↔",description:"A planned product designed around useful offline capability with connected features when online.",status:"Concept"}
];

const grid = document.querySelector("#project-grid");
if (grid) {
  grid.innerHTML = projects.map((project) => `
    <a class="project-card" href="project.html?project=${encodeURIComponent(project.id)}" aria-label="Explore ${project.name}">
      <div class="card-top"><span class="project-symbol" aria-hidden="true">${project.symbol}</span><span class="project-category">${project.category}</span></div>
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <span class="project-status">${project.status}</span>
      <span class="card-link">Explore project <span aria-hidden="true">→</span></span>
    </a>`).join("");
}

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open", !expanded);
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  }));
}

const detail = document.querySelector("#project-detail");
if (detail) {
  const selectedId = new URLSearchParams(window.location.search).get("project");
  const selected = projects.find((project) => project.id === selectedId);
  if (!selected) {
    detail.innerHTML = '<div class="detail-card"><p class="eyebrow">PROJECT NOT FOUND</p><h1>Nothing here yet.</h1><p class="not-found">That project link may be incomplete or outdated.</p><a class="button button-primary" href="index.html#ecosystem">Back to ecosystem</a></div>';
  } else {
    document.title = `${selected.name} — RETRO Technologies`;
    detail.innerHTML = `
      <div class="detail-card">
        <p class="eyebrow">${selected.category.toUpperCase()}</p>
        <h1>${selected.name}</h1>
        <p class="detail-description">${selected.description}</p>
        <div class="detail-meta"><span class="meta-chip">${selected.category}</span><span class="meta-chip">${selected.status}</span><span class="meta-chip">Independent project</span></div>
        <div class="detail-note">This is an ecosystem catalogue entry. Detailed features, repository links, availability, and release information will be added only when verified.</div>
        <p style="margin:2rem 0 0"><a class="text-link" href="index.html#ecosystem">← Back to all projects</a></p>
      </div>`;
  }
}