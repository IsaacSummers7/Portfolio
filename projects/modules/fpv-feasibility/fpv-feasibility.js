document.querySelectorAll('.carousel').forEach(el => {
  const images = JSON.parse(el.dataset.images);
  let current = 0;
  let timer;

  el.innerHTML =
    images.map((src, i) =>
      `<img src="${src}" class="${i === 0 ? 'active' : ''}" alt="">`
    ).join('') +
    (
      images.length > 1
        ? `<button class="carousel-arrow left" aria-label="Previous image">‹</button>
           <button class="carousel-arrow right" aria-label="Next image">›</button>
           <div class="carousel-dots">
             ${images.map((_, i) =>
               `<span class="carousel-dot ${i === 0 ? 'active' : ''}" data-i="${i}"></span>`
             ).join('')}
           </div>`
        : ''
    );

  const imagesOnPage = el.querySelectorAll('img');
  const dots = el.querySelectorAll('.carousel-dot');

  const show = index => {
    imagesOnPage.forEach((image, i) => {
      image.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    current = index;
  };

  const next = () => show((current + 1) % images.length);
  const previous = () => show((current - 1 + images.length) % images.length);

  const resetTimer = () => {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  };

  if (images.length > 1) {
    el.querySelector('.left').onclick = () => {
      previous();
      resetTimer();
    };

    el.querySelector('.right').onclick = () => {
      next();
      resetTimer();
    };

    dots.forEach(dot => {
      dot.onclick = () => {
        show(Number(dot.dataset.i));
        resetTimer();
      };
    });

    timer = setInterval(next, 5000);
  }
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold:0.12 }
);

document.querySelectorAll('.reveal').forEach(section => {
  observer.observe(section);
});