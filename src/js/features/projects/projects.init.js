import { projectsData } from "./project.data.js";

const sanitizeInlineHTML = (html) => {
  if (!html) return "";
  const container = document.createElement("div");
  container.innerHTML = html;
  const allowed = new Set(["B", "STRONG", "I", "EM", "BR"]);

  container.querySelectorAll("*").forEach((node) => {
    if (!allowed.has(node.tagName)) {
      node.replaceWith(document.createTextNode(node.textContent));
    }
  });

  return container.innerHTML;
};

const renderInline = (value) => sanitizeInlineHTML(String(value ?? ""));

export function initializeProjectTiles() {
  const tiles = document.querySelectorAll(".project-tile");
  tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      const projectId = tile.dataset.projectId;
      openProjectDetails(projectId);
    });

    tile.querySelectorAll(".project-action").forEach((action) => {
      action.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    });
  });
}

export function openProjectDetails(projectId) {
  if (!projectId) return;

  const data = projectsData[projectId];
  if (!data) return;

  const existingOverlay = document.querySelector(".project-detail-overlay");
  if (existingOverlay) existingOverlay.remove();

  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay", "project-detail-overlay", "visible");

  const detailTitleId = `project-detail-title-${projectId}`;
  const detailOverviewId = data.overview ? `project-detail-overview-${projectId}` : "";
  const detailDescriptionId = data.description ? `project-detail-description-${projectId}` : "";
  const describedByIds = [detailOverviewId, detailDescriptionId].filter(Boolean).join(" ");
  const ariaDescribedByAttr = describedByIds ? ` aria-describedby="${describedByIds}"` : "";

  const overviewMarkup = data.overview
    ? `<p class="project-detail-overview" id="${detailOverviewId}">${renderInline(data.overview)}</p>`
    : "";

  const galleryMarkup = Array.isArray(data.images) && data.images.length > 0
    ? `
            <section class="project-detail-section">
                <h3>Images</h3>
                <div class="project-detail-gallery">
                    ${data.images
                      .map(
                        (image) => `
                        <figure class="project-detail-figure">
                            <img src="${image.src}" alt="${image.alt || data.title} image">
                            <figcaption class="project-detail-caption">${image.alt || data.title}</figcaption>
                        </figure>
                    `
                      )
                      .join("")}
                </div>
            </section>
        `
    : "";

  const descriptionMarkup = data.description
    ? `
            <section class="project-detail-section">
                <h3>Project Description</h3>
                <p id="${detailDescriptionId}">${renderInline(data.description)}</p>
            </section>
        `
    : "";

  const featuresMarkup = Array.isArray(data.features) && data.features.length > 0
    ? `
            <section class="project-detail-section">
                <h3>Key Features</h3>
                <ul>
                    ${data.features.map((feature) => `<li>${renderInline(feature)}</li>`).join("")}
                </ul>
            </section>
        `
    : "";

  const challengesMarkup = Array.isArray(data.challenges) && data.challenges.length > 0
    ? `
            <section class="project-detail-section">
                <h3>Challenges &amp; Solutions</h3>
                <div class="project-detail-challenges">
                    ${data.challenges
                      .map(
                        (challenge) => {
                          const solutionItems = Array.isArray(challenge.solution)
                            ? challenge.solution
                            : (typeof challenge.solution === "string" && challenge.solution.trim())
                              ? [challenge.solution]
                              : [];

                          const solutionsMarkup = solutionItems.length
                            ? `
                                <div class="project-detail-solution">
                                    <p class="project-detail-solution-label"><strong>Solution:</strong></p>
                                    <ul>
                                        ${solutionItems.map((item) => `<li>${renderInline(item)}</li>`).join("")}
                                    </ul>
                                </div>
                              `
                            : `<p><strong>Solution:</strong> ${renderInline(challenge.solution || "Not specified")}</p>`;

                          return `
                        <div class="project-detail-challenge">
                            <h4>${renderInline(challenge.title)}</h4>
                            <p><strong>Challenge:</strong> ${renderInline(challenge.challenge)}</p>
                            ${solutionsMarkup}
                        </div>
                    `;
                        }
                      )
                      .join("")}
                </div>
            </section>
        `
    : "";

  const impactsMarkup = Array.isArray(data.impacts) && data.impacts.length > 0
    ? `
            <section class="project-detail-section">
                <h3>Impacts &amp; Results</h3>
                <ul>
                    ${data.impacts.map((impact) => `<li>${renderInline(impact)}</li>`).join("")}
                </ul>
            </section>
        `
    : "";

  const techStackMarkup = Array.isArray(data.techStack) && data.techStack.length > 0
    ? `
            <section class="project-detail-section">
                <h3>Technology Stack</h3>
                <div class="project-detail-tags">
                    ${data.techStack.map((tool) => `<span class="project-detail-tag">${tool}</span>`).join("")}
                </div>
            </section>
        `
    : "";

  const detailSections = [galleryMarkup, descriptionMarkup, featuresMarkup, challengesMarkup, impactsMarkup, techStackMarkup]
    .filter(Boolean)
    .join("");

  const liveAction = data.liveUrl
    ? `<a href="${data.liveUrl}" class="project-action project-visit" target="_blank" rel="noopener"><i class="fas fa-arrow-up-right-from-square"></i><span>View Demo</span></a>`
    : "";

  const githubAction = data.githubUrl
    ? `<a href="${data.githubUrl}" class="project-action project-github" target="_blank" rel="noopener"><i class="fab fa-github"></i> <span>View Repo</span></a>`
    : "";

  overlay.innerHTML = `
        <div class="modal-content project-detail-content" role="dialog" aria-modal="true" aria-labelledby="${detailTitleId}"${ariaDescribedByAttr} tabindex="-1">
            <span class="close-button" aria-label="Close project details">&times;</span>
            <div class="project-detail-header">
                <div class="project-detail-heading">
                    <h2 class="project-detail-title" id="${detailTitleId}">${data.title}</h2>
                    ${overviewMarkup}
                </div>
                <div class="project-detail-actions">
                    ${liveAction || ""}
                    ${githubAction || ""}
                </div>
            </div>
            <div class="project-detail-body">
                ${detailSections}
            </div>
        </div>
    `;

  document.body.appendChild(overlay);

  const closeButton = overlay.querySelector(".close-button");
  const dialogContent = overlay.querySelector(".project-detail-content");

  const closeOverlay = () => {
    overlay.classList.remove("visible");
    document.removeEventListener("keydown", escHandler);
    setTimeout(() => overlay.remove(), 250);
  };

  const escHandler = (event) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      closeOverlay();
    }
  };

  if (closeButton) closeButton.addEventListener("click", closeOverlay);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeOverlay();
  });

  document.addEventListener("keydown", escHandler);

  if (dialogContent) {
    dialogContent.focus({ preventScroll: false });
  }
}
