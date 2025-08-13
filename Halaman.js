// Halaman.js — Hamburger + Flip Card (final)

// ============== HAMBURGER (HP) ==============
(function setupHamburger() {
  const toggleBtn = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  if (!toggleBtn || !menu) return;

  // Hindari inisialisasi ganda
  if (toggleBtn.dataset.bound === "true") return;
  toggleBtn.dataset.bound = "true";

  toggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    menu.classList.toggle("show");
    const expanded = menu.classList.contains("show");
    toggleBtn.setAttribute("aria-expanded", expanded ? "true" : "false");
  });
})();

// ============== FLIP CARD ==============
document.addEventListener("DOMContentLoaded", () => {
  // Deskripsi singkat per destinasi (silakan lengkapi/ubah sesuai kebutuhan)
  const DESCRIPTIONS = {
    // ===== Tabanan =====
    "Pura Tanah Lot":
      "Rising from a rocky outcrop in the sea, Tanah Lot is one of Bali’s most iconic temples. " +
      "Built in the 16th century, it’s renowned for stunning ocean views and magical sunsets. " +
      "Accessible at low tide, this sacred site blends spiritual charm with breathtaking scenery — " +
      "an unmissable stop on any Bali trip.",

    // ===== Badung =====
    "Pura Luhur Uluwatu":
      "Perched on a dramatic cliff 70 meters above the ocean, Uluwatu Temple is one of Bali’s most revered sea temples. " +
      "Famous for its panoramic sunsets, powerful waves, and evening Kecak dance performances, " +
      "it offers a perfect blend of culture, spirituality, and breathtaking scenery.",

    // ===== Gianyar =====
    "Air Terjun Tegenungan":
      "Nestled in lush greenery near Ubud, Tegenungan Waterfall is one of Bali’s most accessible and popular cascades. " +
      "Its wide curtain of water drops into a natural pool, offering a refreshing spot surrounded by scenic viewpoints.",

    "Tegalalang Rice Terrace":
      "Carved into the hills of Ubud, Tegalalang Rice Terrace showcases Bali’s iconic subak irrigation system " +
      "and breathtaking tiered landscapes. In the early morning, the soft sunlight bathes the fields in golden hues, " +
      "creating a serene atmosphere perfect for strolls or enjoying a coffee at nearby hillside cafés.",

    "Bali Zoo":
      "A family-friendly wildlife sanctuary in the heart of Bali, Bali Zoo offers interactive experiences that bring visitors closer to nature. " +
      "From feeding elephants to enjoying breakfast with orangutans, the zoo provides an engaging mix of education, " +
      "adventure, and animal encounters for all ages.",

    "Bali Safari & Marine Park":
      "Spread across lush grounds, Bali Safari & Marine Park offers a journey through Africa, Asia, and beyond." +
      "Ride the safari tram to see exotic wildlife in natural habitats, and enjoy live shows, cultural performances," +
      "and family-friendly attractions for a full-day adventure.",

    // ===== Nusa Penida =====
    "Pantai Kelingking":
      "Perched on the dramatic cliffs of Nusa Penida, Kelingking Beach is famed for its T-Rex-shaped headland and striking turquoise waters. " +
      "Adventurers can take on the steep, rugged trail down to its pristine white sand beach, " +
      "rewarded by one of the most unforgettable coastal views in Indonesia.",

    // ===== Buleleng =====
    "Lovina Beach":
      "Located on Bali’s tranquil north coast, Lovina Beach is renowned for its calm waters and laid-back charm. " +
      "At dawn, boats set sail for dolphin-watching tours, offering magical encounters with pods of wild dolphins " +
      "against the backdrop of a glowing sunrise.",

    "Air Terjun Sekumpul":
      "Hidden deep within Buleleng’s emerald valleys, Sekumpul Waterfall is a spectacular cluster of towering cascades. " +
      "Reached via a trek through rice fields and river crossings, this awe-inspiring natural wonder rewards visitors " +
      "with its powerful beauty and serene jungle surroundings.",

    // ===== Kintamani =====
    "Gunung Batur":
      "A favorite among trekking enthusiasts, Mount Batur offers a rewarding sunrise hike with panoramic views " +
      "of its volcanic caldera and shimmering Lake Batur. " +
      "The early morning chill is offset by the warmth of the first sunlight, making it a truly unforgettable Bali adventure.",
  };

  // Siapkan struktur flip untuk setiap kartu
  document.querySelectorAll(".travel-card").forEach((card) => {
    // Jangan duplikasi jika sudah di-setup
    if (card.classList.contains("js-initialized")) return;
    card.classList.add("js-initialized");

    // Buat sisi depan (.card-front) dengan memindahkan konten awal
    const front = document.createElement("div");
    front.className = "card-front";

    // Pindahkan semua anak .travel-card ke dalam .card-front
    while (card.firstChild) {
      front.appendChild(card.firstChild);
    }

    // Ambil judul & lokasi dari sisi depan untuk sisi belakang
    const titleText =
      front.querySelector("h3")?.textContent?.trim() || "Detail";
    const locText = front.querySelector(".location")?.textContent?.trim() || "";

    // Buat sisi belakang (.card-back)
    const back = document.createElement("div");
    back.className = "card-back";
    back.innerHTML = `
      <div class="back-content">
        <h3>${titleText}</h3>
        <p class="location">${locText}</p>
        <p class="desc">${
          DESCRIPTIONS[titleText] || "Deskripsi akan segera hadir."
        }</p>
        <div class="back-actions">
          <button class="btn-back" aria-label="Back">Back</button>
          <a href="#" class="btn-booknow">Book Now</a>
        </div>
      </div>
    `;

    // Bungkus kedua sisi dalam .card-inner, lalu masukkan kembali ke .travel-card
    const inner = document.createElement("div");
    inner.className = "card-inner";
    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    // Delegasi klik pada kartu:
    // - Klik "View Details" → flip
    // - Klik "Back" → unflip
    card.addEventListener("click", (ev) => {
      const viewBtn = ev.target.closest(".btn-view");
      const backBtn = ev.target.closest(".btn-back");

      if (viewBtn) {
        ev.preventDefault();
        card.classList.add("flipped");
      } else if (backBtn) {
        ev.preventDefault();
        card.classList.remove("flipped");
      }
    });
  });

  // Tekan ESC untuk menutup semua kartu yang sedang terbuka
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") {
      document
        .querySelectorAll(".travel-card.flipped")
        .forEach((c) => c.classList.remove("flipped"));
    }
  });
});
