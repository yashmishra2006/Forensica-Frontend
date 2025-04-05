document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("fileInput");
  const fileNameDisplay = document.getElementById("fileName");
  const startBtn = document.getElementById("startBtn");
  const progressBar = document.getElementById("progressBar");
  const progressContainer = document.getElementById("progressContainer");

  let selectedFile = null;

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = [
      "application/zip",
      "text/csv",
      "application/json",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain"
    ];

    const validExtensions = [".zip", ".csv", ".json", ".docx", ".txt"];

    const isValidType = validTypes.includes(file.type);
    const isValidExtension = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));

    if (!isValidType && !isValidExtension) {
      alert("❌ Invalid file type. Please upload a .zip, .csv, .json, .docx, or .txt file.");
      fileInput.value = "";
      fileNameDisplay.textContent = "No file selected.";
      selectedFile = null;
      startBtn.disabled = true;
      return;
    }

    selectedFile = file;
    fileNameDisplay.textContent = `📁 ${file.name}`;
    startBtn.disabled = false;
  });

  startBtn.addEventListener("click", () => {
    if (!selectedFile) return;

    startBtn.disabled = true;
    progressContainer.style.display = "block";

    let width = 0;

    const interval = setInterval(() => {
      if (width >= 100) {
        clearInterval(interval);
        window.location.href = "results.html";
      } else {
        width += 2;
        progressBar.style.width = width + "%";
        progressBar.textContent = width + "%";
      }
    }, 80);
  });
});