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

addSnippetsEl.addEventListener("click", () => {
  addSnippetModalEl.classList.remove("hidden");
    overlayEl.classList.add("overlay");
    overlayEl.classList.add("show");
});

closeModalEl.addEventListener("click", () => {
  addSnippetModalEl.classList.add("hidden"); // hide the modal again
  document.body.style.overflow = ""; // restore scrolling
  overlayEl.classList.remove("overlay");
});

snippetFormEl.addEventListener("submit", addSnippet);

let snippetCounts = 0;

function addSnippet(e) {
  //Prevent the page to reload once the submit button was clicked
  e.preventDefault();

  const title = document.querySelector("#snippetTitle").value;
  const code = document.querySelector("#snippetCode").value;
  const language = document.querySelector("#snippetLanguage").value;
  const tag = document.querySelector("#snippetTags").value;
  const description = document.querySelector("#snippetDescription").value;

  if(!title) {
    const titleWarningEl = document.querySelector("#titleWarning");
    titleWarningEl.classList.remove("hidden");
    return;
  };

  if(!code) {
    const codeWarningEl = document.querySelector("#codeWarning");
    codeWarningEl.classList.remove("hidden");
    return;
  };

  const snippet = {
    title,
    code,
    language,
    tag,
    description,
  };

  const div = document.createElement("div");
  div.classList.add("snippets-card");
  div.innerHTML = `
    <h3>${snippet.title}</h3>
    <span>${snippet.code}</span>
    <p>${snippet.language}</p>
    <p>${snippet.tag}</p>
    <p>${snippet.description}</p>
    `;
  listSnippetsEl.appendChild(div);

  snippetCounts++;
  snippetsEl.textContent =  snippetCounts;
}
