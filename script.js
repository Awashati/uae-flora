
let plants = [];

async function loadPlantData() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/Awashati/uae-flora/main/plants.json');
    const data = await response.json();
    plants = data;
    renderPlants();
  } catch (error) {
    console.error("Failed to load plant data:", error);
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const coords = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
      const locBox = document.createElement("p");
      locBox.textContent = coords;
      document.getElementById("locationDisplay")?.appendChild(locBox);
    }, () => {
      alert("GPS access denied");
    });
  } else {
    alert("Geolocation not supported");
  }
}

let classifier;

async function loadClassifier() {
  const modelURL = 'https://teachablemachine.withgoogle.com/models/k-LIVE_MODEL_ID/model.json';
  classifier = await ml5.imageClassifier(modelURL);
}

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    const videoEl = document.getElementById("camera");
    if (videoEl) {
      videoEl.srcObject = stream;
      videoEl.onloadeddata = () => {
        const message = document.createElement("p");
        message.innerText = "🔍 Live camera is active. Point it at a plant to diagnose.";
        videoEl.parentElement.appendChild(message);
        startRecognition();
      };
    }
  })
  .catch(err => {
    alert("Camera access denied or not supported");
    console.error(err);
  });

function startRecognition() {
  const videoEl = document.getElementById("camera");
  if (classifier && videoEl) {
    setInterval(() => {
      classifier.classify(videoEl, (err, results) => {
        if (err) return console.error(err);
        const resultBox = document.getElementById("diagnosis") || document.createElement("div");
        resultBox.id = "diagnosis";
        resultBox.innerHTML = `🧠 Prediction: <strong>${results[0].label}</strong> (${(results[0].confidence * 100).toFixed(1)}%)`;
        videoEl.parentElement.appendChild(resultBox);
      });
    }, 5000);
  }
}

const searchInput = document.getElementById("search");
const plantList = document.getElementById("plantList");

function renderPlants(filter = "") {
  plantList.innerHTML = "";
  const results = plants.filter(p =>
    p.commonName.toLowerCase().includes(filter.toLowerCase()) ||
    p.scientificName.toLowerCase().includes(filter.toLowerCase())
  );
  if (results.length === 0) {
    plantList.innerHTML = `<p class='plant-item'>No matching plants found.</p>`;
    return;
  }
  results.forEach(plant => {
    const card = document.createElement("div");
    card.className = "plant-item";
    card.innerHTML = `
      <img src="${plant.image}" alt="${plant.commonName}" style="width: 100%; border-radius: 8px; margin-bottom: 0.5rem;">
      <strong>${plant.commonName}</strong><br>
      <em>${plant.scientificName}</em>
    `;
    plantList.appendChild(card);
  });
}

searchInput?.addEventListener("input", () => {
  renderPlants(searchInput.value);
});

loadPlantData();
loadClassifier();
