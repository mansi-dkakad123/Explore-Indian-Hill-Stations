const hillStations = {
  shimla: {
    name: "Shimla",
    images: ["image/shimla.jpg", "image/shimla2.jpg", "image/shimla3.jpg", "image/shimla4.jpg"],
    video: "vedio/shimla.mp4",
    description: "Shimla is known for colonial architecture, snow in winters, and pine forests. But it gets very crowded during peak seasons."
  },
  manali: {
    name: "Manali",
    images: ["image/manali1.jpg", "image/manali2.jpg"],
    video: "vedio/manali.mp4",
    description: "Manali is popular for its snow activities, Rohtang Pass, and backpacking crowd. However, prices rise during peak tourist season."
  },
  darjeeling: {
    name: "Darjeeling",
    images: ["image/Darjeeling1.jpg", "image/Darjeeling2.jpg" ],
    video: "vedio/Darjeeling.mp4",
    description: "Darjeeling is famous for its tea plantations, toy train, and views of Mount Kanchenjunga. Landslides can occur during monsoon."
  }
};

// DOM elements
const searchBar = document.getElementById('searchBar');
const suggestions = document.getElementById('suggestions');
const hillName = document.getElementById('hillName');
const hillImages = document.getElementById('hillImages');  // Multiple images container
const hillDesc = document.getElementById('hillDesc');
const result = document.getElementById('result');
const videoSource = document.getElementById('videoSource');
const videoTag = document.getElementById('hillVideo');

// Search logic
searchBar.addEventListener('input', () => {
  const query = searchBar.value.trim().toLowerCase();
  suggestions.innerHTML = '';

  if (!query) return;

  Object.keys(hillStations).forEach(key => {
    const station = hillStations[key];
    if (station.name.toLowerCase().startsWith(query)) {
      const li = document.createElement('li');
      li.textContent = station.name;
      li.addEventListener('click', () => showHillStation(key));
      suggestions.appendChild(li);
    }
  });
});

// Show selected hill station
function showHillStation(key) {
  const data = hillStations[key];
  if (!data) return;

  hillName.textContent = data.name;
  hillDesc.textContent = data.description;

  // Show multiple images
  hillImages.innerHTML = ''; // Clear previous images
  data.images.forEach(path => {
    const img = document.createElement('img');
    img.src = path;
    img.style.width = '250px';
    img.style.margin = '10px';
    img.style.borderRadius = '10px';
    img.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
    hillImages.appendChild(img);
  });

  // Load video
  videoSource.src = data.video;
  videoTag.load();

  result.classList.remove('hidden');
  suggestions.innerHTML = '';
  searchBar.value = '';
}
