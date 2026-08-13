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
  {
    name: 'Hermes Agent',
    description: 'An open-source AI agent platform',
    url: 'https://hermesagent.homes/',
    icon: './hermes-agent.svg'
  }
];

const badgeTrack = document.querySelector('#badge-track');
if (badgeTrack) {
  for (let groupIndex = 0; groupIndex < 2; groupIndex += 1) {
    const group = document.createElement('div');
    group.className = 'badge-group';
    if (groupIndex === 1) group.setAttribute('aria-hidden', 'true');

    for (let repeat = 0; repeat < 4; repeat += 1) {
      partnerBadges.forEach(({ name, description, url, icon }) => {
      const link = document.createElement('a');
      link.className = 'project-badge';
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      if (groupIndex !== 0 || repeat !== 0) {
        link.tabIndex = -1;
        link.setAttribute('aria-hidden', 'true');
      }

      const image = document.createElement('img');
      image.src = icon;
      image.alt = '';
      image.width = 40;
      image.height = 40;

      const copy = document.createElement('span');
      copy.className = 'project-badge-copy';
      const title = document.createElement('strong');
      title.textContent = name;
      const summary = document.createElement('span');
      summary.textContent = description;
      copy.append(title, summary);

      const arrow = document.createElement('span');
      arrow.className = 'project-badge-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '→';
      link.append(image, copy, arrow);
      group.append(link);
      });
    }
    badgeTrack.append(group);
  }
}

document.querySelector('#year').textContent = String(new Date().getFullYear());
