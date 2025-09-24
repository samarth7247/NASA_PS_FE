// Modular JavaScript for interactivity and NASA data integration
document.addEventListener('DOMContentLoaded', () => {
  // GSAP Animations
  gsap.registerPlugin(ScrollTrigger);

  // Navbar shrink on scroll
  gsap.to('#main-nav', {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
    padding: '0.5rem 1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    onUpdate: () => document.querySelector('#main-nav').classList.add('shrink'),
    onComplete: () => document.querySelector('#main-nav').classList.remove('shrink'),
  });

  // Hero score counter
  gsap.fromTo('#score-counter', { innerText: 0 }, {
    innerText: 75,
    duration: 2,
    snap: { innerText: 1 },
    ease: 'power1.out',
    onUpdate: function () {
      document.querySelector('#score-counter').innerText = Math.round(this.targets()[0].innerText);
    },
  });

  // Problem card entrance
  gsap.utils.toArray('.problem-card').forEach(card => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out',
    });
  });

  // REPLACE - NASA INTEGRATION
  const fetchNASAData = async (year) => {
    const useLiveData = document.querySelector('#data-toggle').checked;
    if (!useLiveData) {
      // DEMO DATA
      return {
        aqi: 0.7,
        ndvi: 0.8,
        lst: 0.6,
        precipitation: 0.5,
        groundwater: 0.4,
        infrastructure: 0.9,
      };
    }

    try {
      const response = await fetch(`https://api.earthdata.nasa.gov/v1/data?year=${year}&key=YOUR_NASA_API_KEY_HERE`, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Network error');
      const data = await response.json();
      // Normalize data (0–1)
      return {
        aqi: data.aqi / 100,
        ndvi: data.ndvi / 100,
        lst: 1 - (data.lst / 50), // Invert temperature
        precipitation: data.precipitation / 1000,
        groundwater: data.groundwater / 100,
        infrastructure: 0.9, // Placeholder
      };
    } catch (error) {
      console.error('Fetch error, using demo data:', error);
      return {
        aqi: 0.7,
        ndvi: 0.8,
        lst: 0.6,
        precipitation: 0.5,
        groundwater: 0.4,
        infrastructure: 0.9,
      };
    }
  };

  // Chart.js Scorecard
  const ctx = document.getElementById('scorecard-chart').getContext('2d');
  const scorecardChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Air', 'Water', 'Green Cover', 'Heat', 'Ecosystem', 'Infra'],
      datasets: [{
        label: 'Environmental Indicators',
        data: [0.7, 0.5, 0.8, 0.6, 0.4, 0.9],
        backgroundColor: ['#007bff', '#28a745', '#20c997', '#dc3545', '#6f42c1', '#ffc107'],
      }],
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true, max: 1 },
      },
      plugins: {
        legend: { display: false },
      },
    },
  });

  // Update chart on time-slider change
  document.querySelector('#time-slider').addEventListener('input', async (e) => {
    const year = e.target.value;
    const data = await fetchNASAData(year);
    scorecardChart.data.datasets[0].data = [
      data.aqi,
      data.precipitation,
      data.ndvi,
      data.lst,
      data.groundwater,
      data.infrastructure,
    ];
    scorecardChart.update();
    const score = Math.round(
      (data.aqi * 0.3 + data.ndvi * 0.2 + data.precipitation * 0.25 + data.lst * 0.15 + data.groundwater * 0.1 + data.infrastructure * 0.1) * 100
    );
    gsap.to('#aggregate-score', {
      innerText: score,
      duration: 0.5,
      snap: { innerText: 1 },
      onUpdate: function () {
        document.querySelector('#aggregate-score').innerText = Math.round(this.targets()[0].innerText);
      },
    });
  });

  // Map pin interactions (placeholder)
  const map = document.querySelector('#main-map');
  map.addEventListener('click', (e) => {
    gsap.to(e.target, { scale: 1.2, duration: 0.3, yoyo: true, repeat: 1 });
  });
});