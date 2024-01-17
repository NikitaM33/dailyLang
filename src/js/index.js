document.querySelectorAll('.drop').forEach((drop) => {
  const select = drop.querySelector('.drop__button');
  const options = drop.querySelector('.drop__list');
  const optionItems = options.querySelectorAll('.drop__list-item');
  const inputHidden = drop.querySelector('.drop__lang--hidden');
  
  const svg = `<svg
  width="17"
  height="10"
  viewBox="0 0 17 10"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  >
  <path
    d="M1 1L8.5 8.5"
    stroke="white"
    stroke-width="2"
    stroke-linecap="round"
  />
  <path
    d="M16 1L8.5 8.5"
    stroke="white"
    stroke-width="2"
    stroke-linecap="round"
  />
  </svg>`;
  
  // Обработчик нажатия на кнопку дропдаун
  function dropdownHandler() {
    options.classList.toggle('drop__list--visible');
    this.classList.add('drop__button--active');
  }
  
  // Обработчик выбора списка
  function selectOptionHandler(e) {
    e.stopPropagation();
    select.innerHTML = `${this.innerText} ${svg}`;
    select.focus();
    inputHidden.value = this.dataset.value;
    options.classList.remove('drop__list--visible');
  }
  
  // Клик вне дропдауна закрывает список
  function closeOptions(e) {
    if (e.target !== select) {
      options.classList.remove('drop__list--visible');
      select.classList.remove('drop__button--active');
    }
  }
  
  // Клик по кнопке дропдаун
  select.addEventListener('click', dropdownHandler);
  
  // Выбор элемента списка
  optionItems.forEach((item) => {
    item.addEventListener('click', selectOptionHandler);
  });
  
  // Клик снаружи опций
  document.addEventListener('click', closeOptions);
  
  // Событие по кнопкам
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab' || e.key === 'Escape') {
      options.classList.remove('drop__list--visible');
      select.classList.remove('drop__button--active');
    }
  });
});


