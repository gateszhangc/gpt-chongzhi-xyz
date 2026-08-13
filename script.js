const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#site-nav');

menuButton?.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const planOptions = [...document.querySelectorAll('.plan-option')];
const receiptWorkload = document.querySelector('#receipt-workload');
const receiptFit = document.querySelector('#receipt-fit');
const receiptNote = document.querySelector('#receipt-note');

planOptions.forEach((option) => {
  option.setAttribute('aria-pressed', option.classList.contains('active') ? 'true' : 'false');
  option.addEventListener('click', () => {
    planOptions.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-pressed', 'false');
    });
    option.classList.add('active');
    option.setAttribute('aria-pressed', 'true');
    receiptWorkload.textContent = option.dataset.workload;
    receiptFit.textContent = option.dataset.fit;
    receiptNote.textContent = option.dataset.note;
  });
});

const checks = [...document.querySelectorAll('.check-card input')];
const count = document.querySelector('#check-count');
const progress = document.querySelector('#check-progress');
const message = document.querySelector('#check-message');
const messages = [
  'Start with the destination account.',
  'Next, compare the live plans.',
  'Now prepare the billing details.',
  'One last step: plan to save the receipt.',
  'Your purchase checklist is complete.'
];

function updateChecklist() {
  const completed = checks.filter((item) => item.checked).length;
  count.textContent = `${completed} of ${checks.length} complete`;
  progress.style.width = `${(completed / checks.length) * 100}%`;
  message.textContent = messages[completed];
}
checks.forEach((check) => check.addEventListener('change', updateChecklist));

// Add future footer badges here; the marquee duplicates the set for a seamless loop.
const partnerBadges = [
  { label: 'Hermes Agent', url: 'https://hermesagent.homes/' }
];

const badgeTrack = document.querySelector('#badge-track');
if (badgeTrack) {
  for (let group = 0; group < 8; group += 1) {
    partnerBadges.forEach(({ label, url }) => {
      const link = document.createElement('a');
      link.className = 'project-badge';
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = label;
      badgeTrack.append(link);
    });
  }
}

document.querySelector('#year').textContent = String(new Date().getFullYear());
