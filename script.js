const fleetPool = [
  { model: "Dacia Sandero", type: "City Car", fuel: "Petrol", seats: 5, price: 290 },
  { model: "Renault Clio 5", type: "City Car", fuel: "Diesel", seats: 5, price: 330 },
  { model: "Peugeot 208", type: "City Car", fuel: "Petrol", seats: 5, price: 340 },
  { model: "Hyundai i10", type: "Compact", fuel: "Petrol", seats: 5, price: 260 },
  { model: "Volkswagen Golf 8", type: "Sedan", fuel: "Diesel", seats: 5, price: 470 },
  { model: "Toyota Corolla", type: "Sedan", fuel: "Hybrid", seats: 5, price: 520 },
  { model: "Skoda Octavia", type: "Sedan", fuel: "Diesel", seats: 5, price: 500 },
  { model: "Kia Sportage", type: "SUV", fuel: "Diesel", seats: 5, price: 680 },
  { model: "Hyundai Tucson", type: "SUV", fuel: "Diesel", seats: 5, price: 690 },
  { model: "Nissan Qashqai", type: "SUV", fuel: "Petrol", seats: 5, price: 660 },
  { model: "Dacia Duster", type: "SUV", fuel: "Diesel", seats: 5, price: 560 },
  { model: "Ford Tourneo", type: "Family Van", fuel: "Diesel", seats: 7, price: 820 },
  { model: "Volkswagen Caddy", type: "Utility", fuel: "Diesel", seats: 2, price: 610 },
  { model: "Fiat Doblo", type: "Utility", fuel: "Diesel", seats: 2, price: 590 },
  { model: "Mercedes C-Class", type: "Premium", fuel: "Diesel", seats: 5, price: 920 },
  { model: "BMW 3 Series", type: "Premium", fuel: "Petrol", seats: 5, price: 980 }
];

const fleetGrid = document.getElementById("fleetGrid");
const shuffleButton = document.getElementById("shuffleFleet");

function shuffled(source) {
  return [...source].sort(() => Math.random() - 0.5);
}

function fleetCard(car, index) {
  return `
    <article class="fleet-card reveal" style="transition-delay:${index * 60}ms">
      <h3>${car.model}</h3>
      <div class="fleet-meta">
        <span class="chip">${car.type}</span>
        <span class="chip">${car.fuel}</span>
        <span class="chip">${car.seats} seats</span>
      </div>
      <p class="price">${car.price} MAD / day</p>
    </article>
  `;
}

function renderFleet() {
  const selected = shuffled(fleetPool).slice(0, 8);
  fleetGrid.innerHTML = selected.map(fleetCard).join("");
  observeReveal();
}

function animateCounters() {
  const counters = document.querySelectorAll(".count");
  counters.forEach((counter) => {
    const target = Number(counter.dataset.target);
    const durationMs = 1400;
    const start = performance.now();

    function frame(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      counter.textContent = Math.floor(progress * target).toLocaleString("en-US");
      if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  });
}

function observeReveal() {
  const items = document.querySelectorAll(".reveal:not(.observed)");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  items.forEach((item) => {
    item.classList.add("observed");
    observer.observe(item);
  });
}

shuffleButton.addEventListener("click", () => {
  shuffleButton.classList.remove("rotate");
  void shuffleButton.offsetWidth;
  shuffleButton.classList.add("rotate");
  renderFleet();
});

window.addEventListener("DOMContentLoaded", () => {
  renderFleet();
  observeReveal();
  animateCounters();
});
