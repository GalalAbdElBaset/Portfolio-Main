"use strict";

/***********************************************
 * Init & helpers
 ***********************************************/
document.getElementById('year').textContent = new Date().getFullYear();
AOS.init({
  once: true,
  easing: 'ease-out-cubic',
  duration: 700
}); // remove preloader

window.addEventListener('load', function () {
  setTimeout(function () {
    var pre = document.getElementById('preloader');
    if (pre) pre.style.opacity = '0';
    setTimeout(function () {
      return pre && pre.remove();
    }, 600);
  }, 700);
}); // Typing effect

(function typing() {
  var el = document.getElementById('typingLine');
  var texts = ["Hi, I'm Galal Abdelbaset — Front-End Developer 💻", "I build modern, fast & accessible web experiences.", "JavaScript · React · Performance"];
  var idx = 0,
      _char = 0,
      forward = true;

  function step() {
    var t = texts[idx];
    el.textContent = t.slice(0, _char);

    if (forward) {
      _char++;

      if (_char > t.length) {
        forward = false;
        setTimeout(step, 1200);
        return;
      }
    } else {
      _char--;

      if (_char === 0) {
        forward = true;
        idx = (idx + 1) % texts.length;
      }
    }

    setTimeout(step, forward ? 60 : 24);
  }

  step();
})();
/***********************************************
 * Theme toggle (floating) + save in localStorage
 ***********************************************/


var themeFloat = document.getElementById('themeFloat');
var themeIcon = document.getElementById('themeIcon');
var bodyEl = document.body;
var saved = localStorage.getItem('site-theme');

if (saved === 'light') {
  bodyEl.classList.add('light');
  themeIcon.className = 'fa-solid fa-sun';
  themeFloat.setAttribute('aria-pressed', 'true');
}

updateThemeFloat();
themeFloat.addEventListener('click', function () {
  bodyEl.classList.toggle('light');
  var isLight = bodyEl.classList.contains('light');
  localStorage.setItem('site-theme', isLight ? 'light' : 'dark');
  updateThemeFloat();
  bodyEl.style.transition = 'background 450ms ease, color 450ms ease';
});

function updateThemeFloat() {
  var isLight = bodyEl.classList.contains('light');
  themeIcon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  themeFloat.title = isLight ? 'Switch to dark mode' : 'Switch to light mode';
  themeFloat.setAttribute('aria-pressed', isLight ? 'true' : 'false');
} // Accent buttons


document.querySelectorAll('.palette').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var c = btn.dataset.color;
    document.documentElement.style.setProperty('--accent', c);
    if (c === '#ef4444') document.documentElement.style.setProperty('--accent-2', '#f97316');else if (c === '#10b981') document.documentElement.style.setProperty('--accent-2', '#06b6d4');else document.documentElement.style.setProperty('--accent-2', '#8b5cf6');
  });
});
/***********************************************
 * Header scroll behavior & back-to-top
 ***********************************************/

var header = document.getElementById('siteHeader');
var backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', function () {
  var y = window.scrollY;

  if (y > 20) {
    header.style.backdropFilter = 'blur(6px)';
    header.style.background = 'rgba(2,6,23,0.55)';
    header.style.boxShadow = '0 8px 30px rgba(2,6,23,0.35)';
  } else {
    header.style.backdropFilter = 'none';
    header.style.background = 'transparent';
    header.style.boxShadow = 'none';
  }

  backToTop.style.display = y > 600 ? 'block' : 'none';
});
backToTop.addEventListener('click', function () {
  return window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
/***********************************************
 * Avatar parallax
 ***********************************************/

var avatar = document.getElementById('avatar');

if (avatar) {
  avatar.addEventListener('mousemove', function (e) {
    var r = avatar.getBoundingClientRect();
    var cx = r.left + r.width / 2;
    var cy = r.top + r.height / 2;
    var dx = (e.clientX - cx) / r.width;
    var dy = (e.clientY - cy) / r.height;
    avatar.style.transform = "translate3d(".concat(dx * 8, "px, ").concat(dy * 8, "px, 0) rotateX(").concat(dy * 6, "deg) rotateY(").concat(dx * 6, "deg)");
    var img = avatar.querySelector('img');
    if (img) img.style.transform = "scale(1.07) translate3d(".concat(dx * 6, "px, ").concat(dy * 6, "px, 0)");
  });
  avatar.addEventListener('mouseleave', function () {
    avatar.style.transform = '';
    var img = avatar.querySelector('img');
    if (img) img.style.transform = '';
  });
}
/***********************************************
 * Skills animate with IntersectionObserver
 ***********************************************/


var skills = document.querySelectorAll('.skill');
var skillsObs = new IntersectionObserver(function (entries) {
  entries.forEach(function (en) {
    if (en.isIntersecting) {
      var el = en.target;
      var val = +el.dataset.skill || 70;
      var bar = el.querySelector('.bar > i');
      bar.style.transform = 'scaleX(' + val / 100 + ')';
    }
  });
}, {
  threshold: 0.3
});
skills.forEach(function (s) {
  return skillsObs.observe(s);
});
/***********************************************
 * Testimonials slider
 ***********************************************/

(function testiSlider() {
  var list = document.getElementById('testiList');
  if (!list) return;
  var idx = 0;
  var items = list.children;
  var total = items.length;
  list.style.width = 100 * total + '%';
  Array.from(items).forEach(function (it) {
    return it.style.width = 100 / total + '%';
  });
  setInterval(function () {
    idx = (idx + 1) % total;
    list.style.transform = 'translateX(' + -idx * 100 + '%)';
  }, 5000);
})();
/***********************************************
 * Project modal
 ***********************************************/


function openProjectModal(projectCard) {
  var data = JSON.parse(projectCard.getAttribute('data-project') || '{}');
  var modal = document.getElementById('projectModal');
  var content = document.getElementById('modalContent');
  content.innerHTML = "\n        <div style=\"display:grid;grid-template-columns:1fr 320px;gap:18px\">\n            <div>\n                <img src=\"".concat(data.img, "\" alt=\"").concat(data.title, "\" style=\"width:100%;height:240px;object-fit:cover;border-radius:10px;margin-bottom:10px\">\n                <h3>").concat(data.title, "</h3>\n                <p class=\"muted\">").concat(data.desc, "</p>\n                <div style=\"height:10px\"></div>\n                <a href=\"").concat(data.live, "\" target=\"_blank\" class=\"cta\" style=\"padding:8px 16px;font-size:14px;\"><i class=\"fa-solid fa-arrow-up-right-from-square\"></i> View Live</a>\n                <a href=\"").concat(data.code, "\" target=\"_blank\" class=\"cta\" style=\"padding:8px 16px;font-size:14px;margin-left:8px\"><i class=\"fa-solid fa-code\"></i> View Code</a>\n            </div>\n            <div style=\"padding:8px\">\n                <h4>Details</h4>\n                <p class=\"muted\">Technologies: HTML \xB7 CSS \xB7 JS</p>\n                <p class=\"muted\">Role: Front-end Developer</p>\n                <p class=\"muted\">Year: 2025</p>\n            </div>\n        </div>\n    ");
  modal.style.display = 'flex';
  setTimeout(function () {
    return modal.style.opacity = '1';
  }, 20);
}

function closeProjectModal() {
  var modal = document.getElementById('projectModal');
  modal.style.opacity = '0';
  setTimeout(function () {
    return modal.style.display = 'none';
  }, 220);
} // Attach click event to all project cards


document.querySelectorAll('.project').forEach(function (project) {
  project.addEventListener('click', function (e) {
    // Don't open modal if clicking on links inside project
    if (e.target.tagName === 'A' || e.target.closest('a')) return;
    openProjectModal(this);
  });
}); // Close modal when clicking outside

document.getElementById('projectModal').addEventListener('click', function (e) {
  if (e.target.id === 'projectModal') closeProjectModal();
});
/***********************************************
 * View More Projects Button
 ***********************************************/

var allProjectsShown = false;
var viewMoreBtn = document.getElementById('viewMoreBtn');
var projectsGrid = document.getElementById('projectsGrid');
var additionalProjects = [{
  title: "Gradife — Student Activities System",
  desc: "A web system for student activities with registration & login functionality and categorized activity sections.",
  img: "https://iili.io/Ksi74St.md.png",
  live: "https://galalabdelbaset.github.io/gradife-main/",
  code: "https://github.com/GalalAbdElBaset/gradife-main.git",
  tags: "HTML · CSS · JavaScript"
}, {
  title: "Interactive Portfolio",
  desc: "A personal portfolio website with smooth UI transitions, animations, and responsive layout.",
  img: "https://iili.io/KsPpmF9.md.png",
  live: "#",
  code: "#",
  tags: "HTML · CSS · JavaScript"
}, {
  title: "Modern Web Template",
  desc: "A responsive web template with modern layout, animations, and interactive UI components.",
  img: "https://iili.io/Ksigle9.md.png",
  live: "https://galalabdelbaset.github.io/ModernWebTemplate/",
  code: "https://github.com/GalalAbdElBaset/ModernWebTemplate",
  tags: "HTML · CSS · JavaScript"
}, {
  title: "Coffee Website Page",
  desc: "A modern coffee shop website with multiple sections and responsive layout.",
  img: "https://iili.io/CFs3hzJ.md.png",
  live: "https://galalabdelbaset.github.io/coffee-web/index.html",
  code: "https://github.com/GalalAbdElBaset/CoffeeWebsitPage",
  tags: "HTML · CSS · JavaScript"
}, {
  title: "Design Place",
  desc: "A responsive interior design website featuring project showcases, company services, and a modern user experience.",
  img: "https://iili.io/CFLhaVt.md.png",
  live: "https://galalabdelbaset.github.io/Design-plase-main/",
  code: "https://github.com/GalalAbdElBaset/Design-plase-main",
  tags: "HTML · CSS · JavaScript"
}];

function createProjectCard(project) {
  return "\n        <div class=\"project card\" data-aos=\"flip-left\" data-aos-duration=\"850\"\n            data-project='{\"title\":\"".concat(project.title.replace(/'/g, "\\'"), "\",\"desc\":\"").concat(project.desc.replace(/'/g, "\\'"), "\",\"img\":\"").concat(project.img, "\",\"live\":\"").concat(project.live, "\",\"code\":\"").concat(project.code, "\"}'>\n            <img src=\"").concat(project.img, "\" alt=\"").concat(project.title, "\" />\n            <h4>").concat(project.title, "</h4>\n            <div class=\"tags muted\">").concat(project.tags, "</div>\n            <p class=\"muted\">").concat(project.desc, "</p>\n            <div style=\"display:flex;gap:8px;margin-top:10px\">\n                <a href=\"").concat(project.live, "\" target=\"_blank\" class=\"cta\" style=\"padding:6px 10px;font-size:13px;\"><i class=\"fa-solid fa-arrow-up-right-from-square\"></i> Live</a>\n                <a href=\"").concat(project.code, "\" target=\"_blank\" class=\"cta\" style=\"padding:6px 10px;font-size:13px;\"><i class=\"fa-solid fa-code\"></i> Code</a>\n            </div>\n        </div>\n    ");
}

if (viewMoreBtn) {
  viewMoreBtn.addEventListener('click', function () {
    if (!allProjectsShown) {
      additionalProjects.forEach(function (project) {
        var projectHTML = createProjectCard(project);
        projectsGrid.insertAdjacentHTML('beforeend', projectHTML);
      }); // Re-attach click events to new projects

      document.querySelectorAll('.project').forEach(function (project) {
        project.removeEventListener('click', project.clickHandler);

        var handler = function handler(e) {
          if (e.target.tagName === 'A' || e.target.closest('a')) return;
          openProjectModal(this);
        };

        project.clickHandler = handler;
        project.addEventListener('click', handler);
      });
      allProjectsShown = true;
      viewMoreBtn.textContent = 'Show Less Projects';
      viewMoreBtn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Show Less Projects';
    } else {
      // Remove additional projects (keep first 6)
      var allProjects = document.querySelectorAll('#projectsGrid .project');

      for (var i = 6; i < allProjects.length; i++) {
        allProjects[i].remove();
      }

      allProjectsShown = false;
      viewMoreBtn.textContent = 'View More Projects';
      viewMoreBtn.innerHTML = '<i class="fa-solid fa-eye"></i> View More Projects';
    }
  });
}
/***********************************************
 * Cursor trail
 ***********************************************/


var cursorDot = document.getElementById('cursorDot');
window.addEventListener('mousemove', function (e) {
  cursorDot.style.left = e.clientX - 8 + 'px';
  cursorDot.style.top = e.clientY - 8 + 'px';
  cursorDot.style.width = '16px';
  cursorDot.style.height = '16px';
  cursorDot.style.borderRadius = '50%';
  cursorDot.style.background = 'linear-gradient(90deg,var(--accent),var(--accent-2))';
  cursorDot.style.boxShadow = '0 8px 30px rgba(59,130,246,0.12)';
  cursorDot.style.transform = 'translateZ(0) scale(1)';
});
window.addEventListener('mouseleave', function () {
  cursorDot.style.transform = 'scale(0.2)';
  cursorDot.style.opacity = '0.6';
});
/***********************************************
 * EmailJS + SweetAlert2
 ***********************************************/

(function emailJsSetup() {
  var EMAILJS_SERVICE_ID = "service_t7iw30t";
  var EMAILJS_TEMPLATE_ID = "template_a9xdpk9";
  var EMAILJS_PUBLIC_KEY = "WynlS30VWiIW1B0sN";

  if (window.emailjs && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  } else {
    console.warn('EmailJS not initialized — replace placeholders to enable sending.');
  }

  var form = document.getElementById('contactForm');
  var sendBtn = document.getElementById('sendBtn');
  var sendSpinner = document.getElementById('sendSpinner');
  var sendText = sendBtn.querySelector('.sendText');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    sendBtn.classList.add('loading');
    sendText.textContent = 'Sending...';
    sendSpinner.style.display = 'inline-block';
    sendBtn.disabled = true;
    var templateParams = {
      from_name: document.getElementById('name').value,
      reply_to: document.getElementById('email').value,
      message: document.getElementById('message').value
    };

    if (window.emailjs && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams).then(function (response) {
        sendBtn.classList.remove('loading');
        sendText.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        sendSpinner.style.display = 'none';
        sendBtn.disabled = false;
        form.reset();
        Swal.fire({
          title: 'Thank you! 🎉',
          html: "Thank you for your message. I'll get back to you as soon as possible \uD83D\uDE0A",
          icon: 'success',
          confirmButtonColor: getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#3b82f6'
        });
      }, function (error) {
        sendBtn.classList.remove('loading');
        sendText.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        sendSpinner.style.display = 'none';
        sendBtn.disabled = false;
        console.error('EmailJS Error:', error);
        Swal.fire({
          title: 'Oops...',
          text: 'Something went wrong while sending the message. Please try again later or email me directly.',
          icon: 'error'
        });
      });
    } else {
      sendBtn.classList.remove('loading');
      sendText.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
      sendSpinner.style.display = 'none';
      sendBtn.disabled = false;
      Swal.fire({
        title: 'Demo Mode',
        html: "Message would be sent to: ".concat(templateParams.from_name, "<br><br>This is a demo. EmailJS needs to be configured."),
        icon: 'info'
      });
      form.reset();
    }
  });
})();
/***********************************************
 * Accessibility: focus outlines for keyboard users
 ***********************************************/


document.addEventListener('keyup', function (e) {
  if (e.key === 'Tab') document.body.classList.add('show-focus-outlines');
});
/***********************************************
 * Smooth scroll for navigation links
 ***********************************************/

document.querySelectorAll('nav a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute('href'));

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
//# sourceMappingURL=main.dev.js.map
