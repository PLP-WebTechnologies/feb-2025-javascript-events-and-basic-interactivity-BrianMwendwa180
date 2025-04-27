// Event Handling Section
const eventButton = document.getElementById('eventButton');
const eventMessage = document.getElementById('eventMessage');

eventButton.addEventListener('click', () => {
  eventMessage.textContent = 'Button clicked!';
});

eventButton.addEventListener('mouseenter', () => {
  eventMessage.textContent = 'Hovering over the button!';
});

eventButton.addEventListener('mouseleave', () => {
  eventMessage.textContent = '';
});

document.addEventListener('keydown', (e) => {
  eventMessage.textContent = `Key pressed: ${e.key}`;
  setTimeout(() => {
    eventMessage.textContent = '';
  }, 1000);
});

// Secret action: double-click or long press
let pressTimer;
eventButton.addEventListener('dblclick', () => {
  eventMessage.textContent = 'Secret double-click action triggered! 🎉';
  setTimeout(() => {
    eventMessage.textContent = '';
  }, 2000);
});

eventButton.addEventListener('mousedown', () => {
  pressTimer = setTimeout(() => {
    eventMessage.textContent = 'Secret long press action triggered! 🔥';
    setTimeout(() => {
      eventMessage.textContent = '';
    }, 2000);
  }, 1500);
});

eventButton.addEventListener('mouseup', () => {
  clearTimeout(pressTimer);
});

// Interactive Elements Section

// Button that changes text or color
const colorButton = document.getElementById('colorButton');
let colorToggle = false;
colorButton.addEventListener('click', () => {
  if (colorToggle) {
    colorButton.textContent = 'Change my color';
    colorButton.style.backgroundColor = '#e67e22';
  } else {
    colorButton.textContent = 'Color changed!';
    colorButton.style.backgroundColor = '#27ae60';
  }
  colorToggle = !colorToggle;
});

// Image gallery/slideshow
const galleryImages = document.querySelectorAll('.gallery-image');
const prevImageBtn = document.getElementById('prevImage');
const nextImageBtn = document.getElementById('nextImage');
let currentImageIndex = 0;

function showImage(index) {
  galleryImages.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
}

prevImageBtn.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  showImage(currentImageIndex);
});

nextImageBtn.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  showImage(currentImageIndex);
});

// Tabs / Accordion
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-tab');

    tabButtons.forEach((b) => b.classList.remove('active'));
    tabContents.forEach((content) => content.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});

// Form Validation
const signupForm = document.getElementById('signupForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const formMessage = document.getElementById('formMessage');

function validateEmail(email) {
  const re = /^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/;
  return re.test(email);
}

function validateForm() {
  let valid = true;

  // Name validation
  if (!nameInput.value.trim()) {
    nameError.textContent = 'Name is required.';
    valid = false;
  } else {
    nameError.textContent = '';
  }

  // Email validation
  if (!emailInput.value.trim()) {
    emailError.textContent = 'Email is required.';
    valid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    emailError.textContent = 'Invalid email format.';
    valid = false;
  } else {
    emailError.textContent = '';
  }

  // Password validation
  if (!passwordInput.value) {
    passwordError.textContent = 'Password is required.';
    valid = false;
  } else if (passwordInput.value.length < 8) {
    passwordError.textContent = 'Password must be at least 8 characters.';
    valid = false;
  } else {
    passwordError.textContent = '';
  }

  return valid;
}

// Real-time feedback
nameInput.addEventListener('input', () => {
  if (nameInput.value.trim()) {
    nameError.textContent = '';
  }
});

emailInput.addEventListener('input', () => {
  if (validateEmail(emailInput.value.trim())) {
    emailError.textContent = '';
  }
});

passwordInput.addEventListener('input', () => {
  if (passwordInput.value.length >= 8) {
    passwordError.textContent = '';
  }
});

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validateForm()) {
    formMessage.textContent = 'Form submitted successfully!';
    formMessage.style.color = '#27ae60';
    signupForm.reset();
  } else {
    formMessage.textContent = '';
  }
});

// New code for user instruction handling
const instructionInput = document.getElementById('instructionInput');
const executeInstructionBtn = document.getElementById('executeInstruction');
const instructionFeedback = document.getElementById('instructionFeedback');

executeInstructionBtn.addEventListener('click', () => {
  const instruction = instructionInput.value.trim().toLowerCase();
  if (!instruction) {
    instructionFeedback.textContent = 'Please enter an instruction.';
    return;
  }

  instructionFeedback.textContent = '';

  // Map instructions to actions
  if (instruction === 'click button') {
    eventButton.click();
    instructionFeedback.textContent = 'Clicked the event button.';
  } else if (instruction === 'change color') {
    colorButton.click();
    instructionFeedback.textContent = 'Toggled the color button.';
  } else if (instruction === 'next image') {
    nextImageBtn.click();
    instructionFeedback.textContent = 'Moved to next image in gallery.';
  } else if (instruction === 'previous image') {
    prevImageBtn.click();
    instructionFeedback.textContent = 'Moved to previous image in gallery.';
  } else if (instruction.startsWith('switch to tab ')) {
    const tabNumber = instruction.split('switch to tab ')[1];
    const tabBtn = Array.from(tabButtons).find(btn => btn.textContent.toLowerCase() === `tab ${tabNumber}`);
    if (tabBtn) {
      tabBtn.click();
      instructionFeedback.textContent = `Switched to Tab ${tabNumber}.`;
    } else {
      instructionFeedback.textContent = `Tab ${tabNumber} not found.`;
    }
  } else {
    instructionFeedback.textContent = 'Instruction not recognized. Try: "click button", "change color", "next image", "previous image", "switch to tab X".';
  }

  instructionInput.value = '';
});

//  code to enhance image gallery responsiveness
function adjustGallerySize() {
  const galleryContainer = document.querySelector('.gallery-container');
  if (!galleryContainer) return;

  const containerWidth = galleryContainer.clientWidth;
  const images = galleryContainer.querySelectorAll('.gallery-image');
  images.forEach(img => {
    img.style.width = containerWidth + 'px';
    img.style.height = 'auto';
  });
}

// Adjust gallery size on window resize and initial load
window.addEventListener('resize', adjustGallerySize);
window.addEventListener('load', adjustGallerySize);
