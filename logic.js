// Global scope functions
window.showLoader = function () {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "block";
};

window.hideLoader = function () {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
};

window.toggleMenu = function () {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  if (window.innerWidth <= 768) {
    // Mobile behavior: Use translateX
    sidebar.classList.toggle("open");
    overlay.classList.toggle("active");
  } else {
    // Desktop behavior: Shrink the space
    sidebar.classList.toggle("closed");
  }
};

window.loadDoc = function (docId) {
  const doc = documents.find((d) => d.id === docId);
  if (!doc) return;

  window.showLoader();

  // Update UI
  document.getElementById("headerTitle").innerText = doc.title;
  document.getElementById("extLink").href = doc.url;
  document.getElementById("docFrame").src = doc.url;

  // Update List Styles
  document
    .querySelectorAll(".doc-item")
    .forEach((el) => el.classList.remove("active"));
  const listItem = document.getElementById(`item-${docId}`);
  if (listItem) listItem.classList.add("active");

  // Close menu on mobile after selection
  const sidebar = document.getElementById("sidebar");
  if (window.innerWidth <= 768 && sidebar.classList.contains("open")) {
    window.toggleMenu();
  }
};

function init() {
  const list = document.getElementById("documentList");
  const docFrame = document.getElementById("docFrame");

  // Attach onload listener
  docFrame.onload = window.hideLoader;

  documents.forEach((doc) => {
    const div = document.createElement("div");
    div.id = `item-${doc.id}`;
    div.className = "doc-item";
    div.innerHTML = `
                    <span class="material-symbols-rounded opacity-50">description</span>
                    <span>${doc.title}</span>
                `;
    div.onclick = () => window.loadDoc(doc.id);
    list.appendChild(div);
  });

  // Auto-load first document
  if (documents.length > 0) window.loadDoc(documents[0].id);
}

window.addEventListener("DOMContentLoaded", init);
