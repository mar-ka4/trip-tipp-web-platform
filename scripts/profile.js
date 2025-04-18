import usersData from './usersData.js';
import routesData from './routesData.js';

function renderProfile() {
  // Получаем текущего пользователя из localStorage
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    window.location.href = 'europe.html'; // Редирект, если не авторизован
    return;
  }

  // Проверяем, есть ли пользователь в usersData
  const user = usersData.find(user => user.nickname === currentUser.nickname);
  if (!user) {
    console.error('User not found');
    window.location.href = 'europe.html';
    return;
  }

  // Заполняем данные профиля
  const avatarElement = document.getElementById('profile-avatar');
  if (user.avatar) {
    avatarElement.style.backgroundImage = `url('${user.avatar}')`;
  } else {
    avatarElement.style.backgroundImage = '';
  }

  document.getElementById('profile-username').textContent = user.nickname;
  document.getElementById('profile-description').textContent = user.description;
  document.getElementById('stat-countries').textContent = user.visitedCountries;
  document.getElementById('stat-routes').textContent = user.createdRoutes;

  // Рендерим маршруты автора
  const routesContainer = document.getElementById('routes-container');
  const userRoutes = routesData.filter(route => route.author === user.nickname);

  routesContainer.innerHTML = userRoutes.map((route, index) => `
    <div class="route-card">
      <div class="route-image">
        ${route.gallery.map((imgSrc, imgIndex) => `
          <img src="${imgSrc}" alt="${route.name}" class="${imgIndex === 0 ? 'active' : ''}">
        `).join('')}
        ${route.gallery.length > 1 ? `
          <button class="arrow arrow-left"><i class="fas fa-chevron-left"></i></button>
          <button class="arrow arrow-right"><i class="fas fa-chevron-right"></i></button>
        ` : ''}
      </div>
      <div class="route-details">
        <div class="route-title">${route.name}</div>
        <div class="route-location">${route.location}</div>
        <div class="route-features">
          <div class="feature-tag">${route.type}</div>
          <div class="feature-tag">${route.duration}</div>
          <div class="feature-tag">${route.difficulty}</div>
          <div class="feature-tag">${route.points} точек</div>
        </div>
        <div class="route-price">5$</div>
      </div>
    </div>
  `).join('');

  // Добавляем обработчики для стрелок
  const routeCards = routesContainer.querySelectorAll('.route-card');
  routeCards.forEach(card => {
    const routeImage = card.querySelector('.route-image');
    const images = routeImage.querySelectorAll('img');
    const totalImages = images.length;
    if (totalImages <= 1) return;

    let currentImageIndex = 0;
    const arrowLeft = routeImage.querySelector('.arrow-left');
    const arrowRight = routeImage.querySelector('.arrow-right');

    function showImage(index) {
      images.forEach((img, i) => {
        img.className = i === index ? 'active' : '';
      });
    }

    arrowLeft.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
      showImage(currentImageIndex);
    });

    arrowRight.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex + 1) % totalImages;
      showImage(currentImageIndex);
    });
  });
  
  // Add event listener for edit profile button
  setupEditProfileButton();
}

// Setup edit profile functionality
function setupEditProfileButton() {
  const editButton = document.querySelector('.edit-profile-btn');
  const usernameElement = document.getElementById('profile-username');
  const descriptionElement = document.getElementById('profile-description');
  
  let isEditing = false;
  
  editButton.addEventListener('click', () => {
    if (!isEditing) {
      // Switch to edit mode
      isEditing = true;
      editButton.textContent = 'Save Changes';
      
      // Make username editable
      usernameElement.classList.add('editing');
      usernameElement.contentEditable = true;
      
      // Make description editable
      descriptionElement.classList.add('editing');
      descriptionElement.contentEditable = true;
      
      // Focus on the username field
      usernameElement.focus();
    } else {
      // Save changes
      isEditing = false;
      editButton.textContent = 'Edit Profile';
      
      // Make fields non-editable
      usernameElement.contentEditable = false;
      descriptionElement.contentEditable = false;
      
      // Remove editing styling
      usernameElement.classList.remove('editing');
      descriptionElement.classList.remove('editing');
      
      // Save changes to localStorage
      saveProfileChanges(usernameElement.textContent, descriptionElement.textContent);
    }
  });
}

// Save profile changes to localStorage
function saveProfileChanges(newUsername, newDescription) {
  // Get current user
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) return;
  
  // Update user data
  const updatedUser = {
    ...currentUser,
    nickname: newUsername,
    description: newDescription
  };
  
  // Save back to localStorage
  localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  
  // Update in usersData (if needed for current session)
  const userIndex = usersData.findIndex(user => user.nickname === currentUser.nickname);
  if (userIndex !== -1) {
    usersData[userIndex].nickname = newUsername;
    usersData[userIndex].description = newDescription;
  }
}

// Вызываем рендеринг при загрузке
document.addEventListener('DOMContentLoaded', renderProfile);