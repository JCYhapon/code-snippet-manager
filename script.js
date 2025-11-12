// DOM Elements
const snippetsEl = document.querySelector("#snippets");
const languagesEl = document.querySelector("#languages");
const tagsEl = document.querySelector("#tags");
const addSnippetsEl = document.querySelector("#addSnippet");
const searchSnippetsEl = document.querySelector("#searchSnippets");
const listTagsEl = document.querySelector("#listTags");
const addSnippetModalEl = document.querySelector("#addSnippetModal");
const snippetFormEl = document.querySelector("#snippetForm");
const closeModalEl = document.querySelector(".close");
const listSnippetsEl = document.querySelector("#listSnippets");
const overlayEl = document.querySelector("#overlay");

// State
let snippetCounts = 0;
let allSnippets = [];
let uniqueLanguages = new Set();
let uniqueTags = new Set();

// Open Modal
addSnippetsEl.addEventListener("click", () => {
  addSnippetModalEl.classList.remove("hidden");
  overlayEl.classList.add("show");
  document.body.style.overflow = "hidden"; // prevent background scroll
});

// Close Modal
closeModalEl.addEventListener("click", closeModal);
overlayEl.addEventListener("click", closeModal);

function closeModal() {
  addSnippetModalEl.classList.add("hidden");
  overlayEl.classList.remove("show");
  modal.style.display = "none";
  document.body.style.overflow = ""; // restore scrolling
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !addSnippetsEl.classList.contains("hidden")) {
    closeModal();
  }
});

// Add Snippet
snippetFormEl.addEventListener("submit", addSnippet);

function addSnippet(e) {
  e.preventDefault();

  // Get values
  const title = document.querySelector("#snippetTitle").value.trim();
  const code = document.querySelector("#snippetCode").value.trim();
  const language =
    document.querySelector("#snippetLanguage").value.trim() || "Code";
  const tags = document.querySelector("#snippetTags").value.trim();
  const description = document
    .querySelector("#snippetDescription")
    .value.trim();

  // Hide warnings first
  document.querySelector("#titleWarning").classList.add("hidden");
  document.querySelector("#codeWarning").classList.add("hidden");

  // Validation
  if (!title) {
    document.querySelector("#titleWarning").classList.remove("hidden");
    return;
  }

  if (!code) {
    document.querySelector("#codeWarning").classList.remove("hidden");
    return;
  }

  // Create snippet object
  const snippet = {
    id: Date.now(),
    title,
    code,
    language,
    tags: tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t),
    description,
  };

  // Add to array
  allSnippets.push(snippet);

  // Update stats
  uniqueLanguages.add(language);
  snippet.tags.forEach((tag) => uniqueTags.add(tag));

  snippetCounts++;
  updateStats();
  updateTagsList();

  // Render snippet
  renderSnippet(snippet);

  // Clear form and close modal
  snippetFormEl.reset();
  closeModal();
}

// Render single snippet
function renderSnippet(snippet) {
  const div = document.createElement("div");
  div.classList.add("snippets-card");
  div.dataset.id = snippet.id;

  const tagsHTML =
    snippet.tags.length > 0
      ? `<div style="display: flex; gap: 5px; flex-wrap: wrap; margin-top: 10px;">${snippet.tags
          .map(
            (tag) =>
              `<span style="background: #e0e0e0; padding: 3px 10px; border-radius: 12px; font-size: 11px;">${tag}</span>`
          )
          .join("")}</div>`
      : "";

  div.innerHTML = `
          <h3 style="margin: 0 0 10px; font-size: 16px;">${snippet.title}</h3>
          <span class="snippet-language">${snippet.language}</span>
          <pre class="snippet-code">${escapeHtml(snippet.code)}</pre>
          ${
            snippet.description
              ? `<p style="margin: 10px 0 0; color: #666; font-size: 13px;">${snippet.description}</p>`
              : ""
          }
          ${tagsHTML}
          <button onclick="deleteSnippet(${
            snippet.id
          })" style="margin-top: 10px; background: #d32f2f; padding: 8px 16px; font-size: 12px;">Delete</button>
        `;

  // Remove empty state if exists
  const emptyState = listSnippetsEl.querySelector(".empty-state");
  if (emptyState) {
    emptyState.remove();
  }

  listSnippetsEl.appendChild(div);
}

// Delete snippet
window.deleteSnippet = function (id) {
  if (confirm("Are you sure you want to delete this snippet?")) {
    allSnippets = allSnippets.filter((s) => s.id !== id);
    const card = document.querySelector(`[data-id="${id}"]`);
    card.remove();

    snippetCounts--;

    // Recalculate unique languages and tags
    uniqueLanguages.clear();
    uniqueTags.clear();
    allSnippets.forEach((s) => {
      uniqueLanguages.add(s.language);
      s.tags.forEach((tag) => uniqueTags.add(tag));
    });

    updateStats();
    updateTagsList();

    // Show empty state if no snippets
    if (allSnippets.length === 0) {
      showEmptyState();
    }
  }
};

// Update statistics
function updateStats() {
  snippetsEl.textContent = snippetCounts;
  languagesEl.textContent = uniqueLanguages.size;
  tagsEl.textContent = uniqueTags.size;
}

// Update tags list
function updateTagsList() {
  if (uniqueTags.size === 0) {
    listTagsEl.innerHTML =
      '<p style="color: #999; font-size: 12px; margin: 0;">No tags yet</p>';
    return;
  }

  listTagsEl.innerHTML = Array.from(uniqueTags)
    .map(
      (tag) => `<span class="tag" onclick="filterByTag('${tag}')">${tag}</span>`
    )
    .join("");
}

// Filter by tag
window.filterByTag = function (tag) {
  searchSnippetsEl.value = tag;
  filterSnippets();
};

// Search functionality
searchSnippetsEl.addEventListener("input", filterSnippets);

function filterSnippets() {
  const query = searchSnippetsEl.value.toLowerCase();

  document.querySelectorAll(".snippets-card").forEach((card) => {
    const text = card.textContent.toLowerCase();
    if (text.includes(query)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Show empty state
function showEmptyState() {
  listSnippetsEl.innerHTML = `
          <div class="empty-state">
            <h3>No snippets yet</h3>
            <p>Click "Add New Snippet" to create your first code snippet!</p>
          </div>
        `;
}

// Initialize with empty state
if (allSnippets.length === 0) {
  showEmptyState();
}
