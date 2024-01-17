const rangeInput = document.querySelectorAll('.filter__range-input input');
const durationMin = document.querySelector('.filter__duration-min');
const durationMax = document.querySelector('.filter__duration-max');
const progress = document.querySelector('.filter__progress');

let monthGap = 1;

rangeInput.forEach((input, e) => {
  input.addEventListener('input', () => {
    let min = parseInt(rangeInput[0].value);
    let max = parseInt(rangeInput[1].value);

    if (max - min < monthGap) {
      rangeInput[0].value = max - monthGap;
      rangeInput[1].value = min + monthGap;

      //   if (e.target.className === 'filter__range-min') {
      //     rangeInput[0].value = max - monthGap;
      //   } else {
      //     rangeInput[1].value = min + monthGap;
      //   }
    } else {
      durationMin.innerText = min;
      durationMax.innerText = max;
      progress.style.left = (min / rangeInput[0].max) * 100 - 2 + '%';
      progress.style.right = 102 - (max / rangeInput[1].max) * 100 + '%';
    }
  });
});
