const numberOfSnippets = document.querySelector("#snippets");
const numberOfLanguages = document.querySelector("#languages");
const numberOfTags = document.querySelector("#tags");
const addSnippetsEl = document.querySelector("#addSnippet");
const searchSnippetsEl = document.querySelector("#searchSnippets");
const listTagsEl = document.querySelector("#listTags");
const listSnippetsEl = document.querySelector("#listSnippets");
const addSnippetModalEl = document.querySelector("#addSnippetModal");
const snippetFormEl = document.querySelector("#snippetForm");
const closeModalEl = document.querySelector(".close");

addSnippetsEl.addEventListener("click", () => {
  addSnippetModalEl.classList.remove("hidden");
});

closeModalEl.addEventListener("click", () => {
  addSnippetModalEl.classList.add("hidden"); // hide the modal again
  document.body.style.overflow = ""; // restore scrolling
});

snippetFormEl.addEventListener("submit", addSnippet);

function addSnippet(e) {
  //Prevent the page to reload once the submit button was clicked
  e.preventDefault();
  const title = document.querySelector("#snippetTitle").value;
  const code = document.querySelector("#snippetCode").value;
  const language = document.querySelector("#snippetLanguage").value;
  const tag = document.querySelector("#snippetTags").value;
  const description = document.querySelector("#snippetDescription").value;

  const snippet = {
    title,
    code,
    language,
    tag,
    description
  }

  console.log(snippet);
}
