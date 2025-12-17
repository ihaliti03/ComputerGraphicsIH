// Planet definitions (NASA textures)
const planets = [
  {
    id: "mercury",
    name: "Mercury",
    texture: "assets/mercury.jpg",
    radius: 0.2,
    orbitRadius: 2,
    orbitSpeed: 10000,
    description:
      "The smallest planet, closest to the Sun. Its surface is covered in craters.",
  },
  {
    id: "venus",
    name: "Venus",
    texture: "assets/venus.jpg",
    radius: 0.35,
    orbitRadius: 3,
    orbitSpeed: 16000,
    description: "Venus has a thick, toxic atmosphere and extreme surface heat.",
  },
  {
    id: "earth",
    name: "Earth",
    texture: "assets/earth.jpg",
    radius: 0.4,
    orbitRadius: 4,
    orbitSpeed: 20000,
    description: "Our home planet — blue oceans, land, and a protective atmosphere.",
    hasMoon: true,
  },
  {
    id: "mars",
    name: "Mars",
    texture: "assets/mars.jpg",
    radius: 0.3,
    orbitRadius: 5,
    orbitSpeed: 25000,
    description: "The Red Planet, known for its iron-rich dust and tall volcanoes.",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    texture: "assets/jupiter.jpg",
    radius: 0.9,
    orbitRadius: 7,
    orbitSpeed: 40000,
    description:
      "The gas giant with a massive red storm and dozens of moons.",
  },
];

const scene = document.querySelector("a-scene");
const planetContainer = document.querySelector("#planets");
const infoBox = document.querySelector("#planetInfo");
const cameraRig = document.querySelector("#cameraRig");

planets.forEach((p) => {
  const orbit = document.createElement("a-entity");
  orbit.setAttribute("id", `${p.id}-orbit`);
  orbit.setAttribute(
    "animation",
    `property: rotation; to: 0 360 0; loop: true; dur: ${p.orbitSpeed}`
  );

  const planet = document.createElement("a-sphere");
  planet.setAttribute("id", p.id);
  planet.setAttribute("radius", p.radius);
  planet.setAttribute("src", p.texture);
  planet.setAttribute("position", `${p.orbitRadius} 1.5 -5`);
  planet.setAttribute("animation__rotate", "property: rotation; to: 0 360 0; loop: true; dur: 10000");
  planet.setAttribute("class", "clickable");

  // Add event for click
  planet.addEventListener("click", () => showInfo(p));

  orbit.appendChild(planet);
  planetContainer.appendChild(orbit);

  // Add a moon if Earth
  if (p.hasMoon) {
    const moonOrbit = document.createElement("a-entity");
    moonOrbit.setAttribute("animation", "property: rotation; to: 0 360 0; loop: true; dur: 8000");

    const moon = document.createElement("a-sphere");
    moon.setAttribute("radius", "0.1");
    moon.setAttribute("color", "#cccccc");
    moon.setAttribute("position", "0.8 0 0");

    moonOrbit.appendChild(moon);
    planet.appendChild(moonOrbit);
  }
});

// Create asteroid belt
const asteroidBelt = document.createElement("a-entity");
for (let i = 0; i < 80; i++) {
  const asteroid = document.createElement("a-sphere");
  asteroid.setAttribute("radius", Math.random() * 0.05 + 0.02);
  asteroid.setAttribute("color", "#555");
  const angle = Math.random() * Math.PI * 2;
  const distance = 6 + Math.random() * 0.5;
  const x = Math.cos(angle) * distance;
  const z = Math.sin(angle) * distance - 5;
  asteroid.setAttribute("position", `${x} 1.5 ${z}`);
  asteroidBelt.appendChild(asteroid);
}
scene.appendChild(asteroidBelt);

// Show planet info and zoom camera
function showInfo(planet) {
  infoBox.style.display = "block";
  infoBox.innerHTML = `<h3>${planet.name}</h3><p>${planet.description}</p>`;

  // Zoom animation
  cameraRig.setAttribute(
    "animation",
    `property: position; to: ${planet.orbitRadius / 2} 1.6 -${planet.orbitRadius + 1}; dur: 1000; easing: easeInOutQuad`
  );
}

// Hide info when clicking background
scene.addEventListener("click", (e) => {
  if (!e.target.classList.contains("clickable")) {
    infoBox.style.display = "none";
    cameraRig.setAttribute("animation", "property: position; to: 0 1.6 0; dur: 1000");
  }
});
