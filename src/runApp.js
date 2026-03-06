export function checkParagraphs(el) {
    el.innerHTML = `
         <input class="input">
         <button class="button" hidden="hidden">Добавить</button>
          <p class="paragraph"> Paragraph1 </p>
          <p class="paragraph"> Paragraph2 </p>
          <p class="paragraph"> Paragraph3 </p>
    `;

// Сверстать страницу и подключить к ней файл со
// скриптом. На странице должны быть три текстовых
// параграфа, поле ввода и кнопка. Напишите скрипт,
// который будет выполнять следующие условия:
// 1.Кнопка скрыта, если в поле ввода нет значения.
// 2.При клике на кнопку добавляется новый параграф,
// содержащий текст из поля ввода.
// 3.*Если параграфов становится больше 5, первый из
// них удаляется.

  
const input = el.querySelector('.input');
const button = el.querySelector('.button');
// const container = el.querySelector('.container');

input.addEventListener('input', function() {
		if (this.value.trim() != "") { 
			button.removeAttribute("hidden");
		} else {
			button.setAttribute("hidden", "hidden");
		}
	});
	
	button.addEventListener("click", () => {
		const newParagraph = document.createElement('p');
    newParagraph.innerHTML = input.value;
    el.appendChild(newParagraph);
    input.value = "";

		const paragraphsCounter = el.querySelectorAll("p");
		if (paragraphsCounter.length > 5) {
			paragraphsCounter[0].remove();
		}
	});
};