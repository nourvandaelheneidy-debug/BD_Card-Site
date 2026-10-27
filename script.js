const nameInput = document.getElementById('recipientName');
const personalizeBtn = document.getElementById('personalizeBtn');
const letterName = document.getElementById('letterName');
const finalName = document.getElementById('finalName');
const envelope = document.getElementById('envelope');
const openedNote = document.getElementById('openedNote');
const toast = document.getElementById('toast');

function cleanName(value) {
  return value.trim().replace(/\s+/g, ' ').slice(0, 28);
}
function personalize() {
  const name = cleanName(nameInput.value) || 'Someone Wonderful';
  letterName.textContent = name;
  finalName.textContent = name === 'Someone Wonderful' ? 'you' : name;
  nameInput.value = name === 'Someone Wonderful' ? '' : name;
  showToast(name === 'Someone Wonderful' ? 'Add a name to make the card yours ♡' : `Made with love for ${name} ♡`);
}
personalizeBtn.addEventListener('click', personalize);
nameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') personalize();
});
document.getElementById('openCardLink').addEventListener('click', () => {
  document.getElementById('birthday-card').scrollIntoView({ behavior: 'smooth' });
  window.setTimeout(openEnvelope, 450);
});
function openEnvelope() {
  const isOpen = envelope.classList.toggle('open');
  envelope.setAttribute('aria-expanded', String(isOpen));
  openedNote.textContent = isOpen ? 'Surprise! Sending you the biggest birthday hug in words ♡' : 'Your message is waiting inside 💌';
  if (isOpen) celebrate(28);
}
envelope.addEventListener('click', openEnvelope);

const wishMessages = [
  'May a lovely little surprise find its way to you ✨',
  'Wishing you a year full of brave dreams and soft landings ♡',
  'Your next chapter has so many beautiful possibilities 🌷',
  'May the things you hope for meet you halfway ✦'
];
document.getElementById('wishBtn').addEventListener('click', () => {
  document.getElementById('wishResult').textContent = wishMessages[Math.floor(Math.random() * wishMessages.length)];
  celebrate(18);
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove('show'), 2600);
}
function celebrate(amount = 45) {
  const symbols = ['✦', '♡', '✧', '✿', '•'];
  const colors = ['#f5a8c6', '#c8b7f5', '#f4c66e', '#e78ab0', '#ffffff'];
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.color = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty('--duration', `${2 + Math.random() * 2.3}s`);
    piece.style.setProperty('--drift', `${Math.random() * 180 - 90}px`);
    piece.style.animationDelay = `${Math.random() * .7}s`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 5200);
  }
}
document.getElementById('celebrateBtn').addEventListener('click', () => {
  celebrate(65);
  showToast('Sending birthday sparkle your way! ✨');
});

[
  ['photoOne', 'previewOne'],
  ['photoTwo', 'previewTwo'],
  ['photoThree', 'previewThree']
].forEach(([inputId, previewId]) => {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  input.addEventListener('change', () => {
    const file = input.files && input.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Please choose an image file.');
      input.value = '';
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      preview.replaceChildren();
      const image = document.createElement('img');
      image.src = reader.result;
      image.alt = 'Your selected birthday memory';
      preview.appendChild(image);
      showToast('Memory added to your preview ♡');
    });
    reader.readAsDataURL(file);
  });
});
