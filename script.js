document.addEventListener('DOMContentLoaded', function() {
  const wrapper = document.getElementById('wrapper');
  const sections = document.querySelectorAll('.section');
  let currentSectionIndex = 0;
  let isAnimating = false;

  function goToSection(index) {
    if (index < 0 || index >= sections.length) return;
    isAnimating = true;
    wrapper.style.transform = `translateY(-${index * 100}vh)`;
    currentSectionIndex = index;

    setTimeout(() => {
      isAnimating = false;
    }, 2000);
  }

  window.addEventListener('wheel', function(e) {
    if (isAnimating) return;
    e.preventDefault();
    if (e.deltaY > 0 && currentSectionIndex < sections.length - 1) {
      goToSection(currentSectionIndex + 1);
    } else if (e.deltaY < 0 && currentSectionIndex > 0) {
      goToSection(currentSectionIndex - 1);
    }
  }, { passive: false });

  let touchStartY = null;
  window.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].clientY;
  });
  window.addEventListener('touchend', function(e) {
    if (isAnimating) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    if (diff > 50 && currentSectionIndex < sections.length - 1) {
      goToSection(currentSectionIndex + 1);
    } else if (diff < -50 && currentSectionIndex > 0) {
      goToSection(currentSectionIndex - 1);
    }
  });
});

window.addEventListener("load", function() {
  setTimeout(function() {
    window.scrollTo(0, 1);
  }, 0);
});

