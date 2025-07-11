// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  const current = root.getAttribute('data-theme') || (prefersDark ? 'dark' : 'light');
  setTheme(current === 'dark' ? 'light' : 'dark');
}

themeToggle.addEventListener('click', toggleTheme);

// On load, set theme from localStorage or system
(function() {
  const saved = localStorage.getItem('theme');
  if (saved) setTheme(saved);
  else setTheme(prefersDark ? 'dark' : 'light');
})();

// Smooth scroll for nav links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Render projects from projects.json
function renderProjects(projects) {
  const projectsList = document.getElementById('projects-list');
  projectsList.innerHTML = projects.map(project => `
    <div class="project-card">
      <div class="project-header">
        <img src="${project.thumbnail}" alt="${project.title} thumbnail" class="project-thumb" />
        <div class="project-title">${project.title}</div>
        <span class="project-badge">${project.badge}</span>
      </div>
      <div class="project-status">${project.status}${project.userCount ? ' &bull; ' + project.userCount + ' users' : ''}</div>
      <div class="project-desc">${project.description}</div>
      <div class="project-meta">
        <span>Released: ${project.date}</span>
        <div class="project-tech">
          ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
        </div>
      </div>
      <div class="project-links">
        ${project.live ? `<a href="${project.live}" target="_blank" rel="noopener">Live Site</a>` : ''}
        <a href="${project.github}" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
  `).join('');
}

function renderSkills(skills) {
  const skillsGrid = document.querySelector('.skills-grid');
  skillsGrid.innerHTML = skills.map(skill => `
    <div class="skill-badge">
      <img src="${skill.icon}" alt="${skill.name} icon" class="skill-icon" />
      <span>${skill.name}</span>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  // Fetch and render projects and skills
  fetch('projects.json')
    .then(res => res.json())
    .then(data => {
      renderProjects(data.projects || []);
      renderSkills(data.skills || []);
    })
    .catch(() => {
      document.getElementById('projects-list').innerHTML = '<div style="color:var(--color-secondary)">Unable to load projects.</div>';
      document.querySelector('.skills-grid').innerHTML = '<div style="color:var(--color-secondary)">Unable to load skills.</div>';
    });

  // Section reveal animations
  const revealSections = document.querySelectorAll('section, .footer');
  const revealOnScroll = () => {
    const trigger = window.innerHeight * 0.92;
    revealSections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top < trigger) {
        sec.style.opacity = 1;
        sec.style.transform = 'none';
      }
    });
  };
  revealSections.forEach(sec => {
    sec.style.opacity = 0;
    sec.style.transform = 'translateY(40px)';
    sec.style.transition = 'opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)';
  });
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // Set footer year automatically
  const yearSpan = document.getElementById('footer-year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Update footer social links with real URLs and icons
  const socialLinks = document.querySelector('.social-links');
  if (socialLinks) {
    socialLinks.innerHTML = `
      <a href="https://github.com/nzmcno" aria-label="GitHub" target="_blank" rel="noopener">
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      </a>
      <a href="https://linkedin.com/in/nazimcanozpinarli" aria-label="LinkedIn" target="_blank" rel="noopener">
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
      </a>
      <a href="mailto:nazimcano@proton.me" aria-label="Email" target="_blank" rel="noopener">
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 13.065l-11.985-8.065h23.97l-11.985 8.065zm-12-9.065v16h24v-16h-24zm22 2.236v11.764h-20v-11.764l10 6.736 10-6.736zm-10 8.764l-10-6.736v11.764h20v-11.764l-10 6.736z"/></svg>
      </a>
      <a href="https://x.com/nzmcno" aria-label="Twitter" target="_blank" rel="noopener">
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 5.924c-.793.352-1.645.59-2.54.698.913-.547 1.615-1.414 1.946-2.448-.855.508-1.803.877-2.81 1.077-.807-.861-1.957-1.4-3.232-1.4-2.444 0-4.426 1.98-4.426 4.426 0 .347.04.684.115 1.008-3.68-.185-6.943-1.947-9.127-4.624-.382.656-.6 1.418-.6 2.233 0 1.54.784 2.899 1.978 3.696-.728-.023-1.413-.223-2.012-.557v.056c0 2.152 1.531 3.946 3.566 4.353-.373.102-.765.157-1.17.157-.286 0-.561-.028-.83-.08.562 1.753 2.192 3.029 4.126 3.062-1.51 1.183-3.417 1.888-5.49 1.888-.357 0-.709-.021-1.056-.062 1.957 1.256 4.285 1.99 6.787 1.99 8.142 0 12.6-6.747 12.6-12.6 0-.192-.004-.384-.013-.574.865-.624 1.615-1.404 2.209-2.292z"/></svg>
      </a>
    `;
  }
}); 