const plants = []; // currently no entries, ready for future diagnosis

// 📍 Get user's GPS location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const coords = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
      alert(coords);
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

// 📸 Activate camera stream
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    const videoEl = document.getElementById("camera");
    if (videoEl) {
      videoEl.srcObject = stream;
      videoEl.onloadeddata = () => {
        const message = document.createElement("p");
        message.innerText = "🔍 Live camera is active. Point it at a plant to begin recognition.";
        videoEl.parentElement.appendChild(message);
      };
    }
  })
  .catch(err => {
    alert("Camera access denied or not supported");
    console.error(err);
  });

// 🔍 Search and display plant matches
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
    plantList.innerHTML += `
      <div class="plant-item">
        <img src="${plant.image}" alt="${plant.commonName}" style="width: 100%; border-radius: 8px; margin-bottom: 0.5rem;">
        <strong>${plant.commonName}</strong>
        <em>${plant.scientificName}</em>
      </div>
    `;
  });
}

searchInput?.addEventListener("input", () => {
  renderPlants(searchInput.value);
});

renderPlants(); // initialize display

