function classifyPlant() {
  const input = document.getElementById('imageUpload');
  const output = document.getElementById('output');
  const preview = document.getElementById('imagePreview');

  if (!input.files.length) {
    output.textContent = '❌ Please upload a plant image first.';
    return;
  }

  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    preview.src = e.target.result;
    preview.style.display = 'block';
    output.innerHTML = '🔍 Classifying...';

    // Simulated prediction logic
    setTimeout(() => {
      output.innerHTML = "✅ This might be <strong>Haloxylon salicornicum</strong>, a common desert shrub in the UAE.";
    }, 2000);
  };

  reader.readAsDataURL(file);
}
