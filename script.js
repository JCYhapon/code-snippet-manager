const numberOfSnippets = document.querySelector('#snippets');
const numberOfLanguages = document.querySelector('#languages');
const numberOfTags = document.querySelector('#tags');
const addSnippetsEl = document.querySelector('#addSnippet');
const searchSnippetsEl = document.querySelector('#searchSnippets');
const listTagsEl = document.querySelector('#listTags');
const listSnippetsEl = document.querySelector('#listSnippets');
const addSnippetModalEl = document.querySelector('#addSnippetModal');
const snippetTitleEl = document.querySelector('#snippetTitle');
const snippetCodeEl = document.querySelector('#snippetCode');
const snippetLanguageEl = document.querySelector('#snippetLanguage');
const snippetTagsEl = document.querySelector('#snippetTags');
const snippetDescriptionEl = document.querySelector('#snippetDescription');
const snippetFormEl = document.querySelector('#snippetForm'); 

addSnippetsEl.addEventListener('click', () => {
    addSnippetModalEl.classList.remove('hidden');
})