function changeDisplay() {
  let element = document.querySelector(".home-header-toggle");
  if (element.style.display == "none") {
    element.style.display = "flex";
  } else {
    element.style.display = "none";
  }
}

const marqueeContent = document.querySelector(".home-footer-marquee");

for (let i = 0; i < 20; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}

function download() {
  browser.downloads("../assets/icons/Icon-Start.png");
}

const state = {};
const carouselList = document.querySelector(".projects-carousel-list");
const carouselItems = document.querySelectorAll(".projects-carousel-list-item");
const elems = Array.from(carouselItems);

carouselList.addEventListener("click", function (event) {
  var newActive = event.target.closest(".projects-carousel-list-item");

  var isItem = newActive.closest(".projects-carousel-list-item");

  if (!isItem) {
    return;
  }

  update(newActive);
});

const update = function (newActive) {
  const newActivePos = newActive.dataset.position;

  const current = elems.find((elem) => elem.dataset.position == 0);
  const prev = elems.find((elem) => elem.dataset.position == -1);
  const next = elems.find((elem) => elem.dataset.position == 1);
  const first = elems.find((elem) => elem.dataset.position == -2);
  const last = elems.find((elem) => elem.dataset.position == 2);

  [current, prev, next, first, last].forEach((item) => {
    var itemPos = item.dataset.position;

    item.dataset.position = getPos(itemPos, newActivePos);
  });
};

const getPos = function (current, active) {
  const diff = current - active;

  if (Math.abs(current - active) > 2) {
    return -current;
  }

  return diff;
};

let x_start = null;
let x_end = null;
let y_start = null;
let y_end = null;

carouselList.addEventListener("touchstart", function (event) {
  event.preventDefault;
  x_start = event.touches[0].clientX;
  y_start = event.touches[0].clientY;
});

carouselList.addEventListener("touchend", function (event) {
  event.preventDefault;
  x_end = event.changedTouches[0].clientX;
  y_end = event.changedTouches[0].clientY;
  if (Math.abs(x_start - x_end) > 50 && Math.abs(y_start - y_end) < 20) {
    left_or_right();
  }
});

function left_or_right() {
  if (x_start < x_end) {
    let tmp = document.querySelector(
      '.projects-carousel-list-item[data-position="1"]'
    );
    update(tmp);
  } else {
    let tmp = document.querySelector(
      '.projects-carousel-list-item[data-position="-1"]'
    );
    update(tmp);
  }
}
