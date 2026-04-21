//  LOADER 
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
});

// DARK MODE 
function toggleMode() {
  document.body.classList.toggle("light");
  localStorage.setItem("theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
}

window.onload = () => {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
  }
};

//TYPEWRITER 
const text = ["QA Engineer", "Developer", "Blockchain Explorer"];
let i = 0, j = 0;

function type() {
  const el = document.querySelector(".typing");
  if (!el) return;

  if (j < text[i].length) {
    el.innerHTML += text[i][j++];
  } else {
    setTimeout(() => {
      el.innerHTML = "";
      j = 0;
      i = (i + 1) % text.length;
    }, 1200);
  }
  setTimeout(type, 120);
}
type();



//  ACTIVE NAV 
const links = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let fromTop = window.scrollY;

  links.forEach(link => {
    let section = document.querySelector(link.getAttribute("href"));
    if (section &&
        section.offsetTop <= fromTop &&
        section.offsetTop + section.offsetHeight > fromTop) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// MOBILE MENU
function toggleMenu() {
  document.querySelector("nav").classList.toggle("show");
}
function openProject(name) {
  const modal = document.getElementById("modal");
  modal.style.display = "block";
  document.getElementById("modalContent").innerHTML =
    "<h2>" + name + "</h2><p>Project details coming soon...</p>";
}
// SLIDER
let index = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(i) {
  slides.forEach(slide => slide.classList.remove("active"));

  index = (i + slides.length) % slides.length;

  document.querySelector(".slides").style.transform =
    `translateX(${-index * 100}%)`;

  slides[index].classList.add("active");
}

function moveSlide(step) {
  showSlide(index + step);
}
let current = 0;
const cards = document.querySelectorAll(".project-card");

function updateCarousel() {
  cards.forEach((card, i) => {
    card.classList.remove("active");
    if (i === current) {
      card.classList.add("active");
    }
  });
}

function nextSlide() {
  current = (current + 1) % cards.length;
  updateCarousel();
}

setInterval(nextSlide, 3000);

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y / rect.height - 0.5) * 15;
    const rotateY = (x / rect.width - 0.5) * 15;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});

const hero = document.querySelector(".hero");

document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  hero.style.transform = `translate(${x}px, ${y}px)`;
});
const revealElements = document.querySelectorAll(".section, .project-card");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

revealElements.forEach(el => observer.observe(el));

function openProject(project) {
  const modal = document.getElementById("projectModal");

  const data = {
    voting: {
      title: "Blockchain Voting System",
      desc: "A decentralized voting system using Solidity ensuring transparency and security.",
      github: "https://github.com/yourusername/voting",
      images: ["images/vote1.png", "images/vote2.png"]
    },

    weather: {
      title: "Weather App",
      desc: "Real-time weather app using API integration.",
      github: "https://github.com/roshan43210/Advanced_Weather_App",
      images: ["images/weather 1.png"]
    },

    testing: {
      title: "Manual Testing Tool",
      desc: "Generate test cases and bug reports automatically.",
      github: "https://github.com/roshan43210/Manual-Tester-DOC-Generator-System",
      images: ["images/manual 1.png"]
    }
    
  };

  const projectData = data[project];

  //  SAFETY CHECK
  if (!projectData) {
    console.error("Project not found:", project);
    return;
  }

  // SET DATA
  document.getElementById("modalTitle").innerText = projectData.title;
  document.getElementById("modalDesc").innerText = projectData.desc;
  document.getElementById("githubLink").href = projectData.github;

  // LOAD IMAGES
  const imgContainer = document.getElementById("modalImages");
  imgContainer.innerHTML = "";

  projectData.images.forEach(img => {
    imgContainer.innerHTML += `<img src="${img}" alt="project image">`;
  });

  // SHOW MODAL
  modal.style.display = "flex";
}

window.onclick = function(e) {
  const modal = document.getElementById("projectModal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
};
const counters = document.querySelectorAll(".stat-box h3");

counters.forEach(counter => {
  let target = parseInt(counter.innerText);
  let count = 0;

  let update = () => {
    count++;
    counter.innerText = count + "+";

    if (count < target) {
      setTimeout(update, 50);
    }
  };

  update();
});

async function sendMessage() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const success = document.getElementById("successMsg");

  if (!name || !email || !message) {
    alert("Fill all fields");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, message })
    });

    const data = await res.text();

    success.innerText = "✅ Message sent successfully!";
    success.style.opacity = "1";

  } catch (err) {
    success.innerText = "❌ Failed to send message";
  }
}

  // SHOW SUCCESS
  success.innerText = "✅ Message sent successfully!";
  success.style.opacity = "1";

  // RESET
  name.value = "";
  email.value = "";
  message.value = "";

  // AUTO HIDE
  setTimeout(() => {
    success.style.opacity = "0";
  }, 3000);

