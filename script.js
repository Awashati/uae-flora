function classifyPlant() {
  const input = document.getElementById('imageUpload');
  const output = document.getElementById('output');
  const preview = document.getElementById('imagePreview');

  if (!input.files.length) {
    output.textContent = '❌ Please upload a plant image.';
    return;
  }

  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    preview.src = e.target.result;
    preview.style.display = 'block';
    output.textContent = '🔍 Analyzing...';

    // Simulated AI classification (fake output)
    setTimeout(() => {
      output.innerHTML = "✅ Predicted: <strong>Prosopis cineraria</strong> (Ghaf Tree)";
    }, 1500);
  };

  reader.readAsDataURL(file);
}
