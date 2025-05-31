
const plants = [
  {
    commonName: "Desert Hyacinth",
    scientificName: "Cistanche tubulosa",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Cistanche_tubulosa_in_Israel_01.jpg/320px-Cistanche_tubulosa_in_Israel_01.jpg"
  },
  {
    commonName: "Mangrove",
    scientificName: "Avicennia marina",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Avicennia_marina_flowers.jpg/320px-Avicennia_marina_flowers.jpg"
  }
];

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      alert(`Latitude: ${position.coords.latitude}\nLongitude: ${position.coords.longitude}`);
    }, () => {
      alert("GPS access denied");
    });
  } else {
    alert("Geolocation not supported");
  }
}

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    document.getElementById("camera").srcObject = stream;
  })
  .catch(() => {
    alert("Camera access denied or not supported");
  });

const searchInput = document.getElementById("search");
const plantList = document.getElementById("plantList");

function renderPlants(filter = "") {
  plantList.innerHTML = "";
  const results = plants.filter(p =>
    p.commonName.toLowerCase().includes(filter.toLowerCase()) ||
    p.scientificName.toLowerCase().includes(filter.toLowerCase())
  );
  if (results.length === 0) {
    plantList.innerHTML = `<p class='plant-item'>No plants found.</p>`;
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

searchInput.addEventListener("input", () => {
  renderPlants(searchInput.value);
});

renderPlants();
