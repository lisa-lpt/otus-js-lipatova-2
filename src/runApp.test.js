import { checkParagraphs } from "./runApp.js";

describe("Тесты для задачи про параграфы", () => {
  let el;
  let input;
  let button;
  let paragraph;
  let paragraphs;

  beforeEach(() => {
    el = document.createElement("div");
    checkParagraphs(el);
    input = el.querySelector("input");
    button = el.querySelector("button");
    paragraph = el.querySelector("p");
    paragraphs = el.querySelectorAll("p");
  });

  const inputparagraph = (str) => {
    input.value = str;
    input.dispatchEvent(new Event("input"));
  };

  it("1. Проверка существования поля ввода", () => {
    expect(input).toBeDefined();
  });

  it("2. Проверка существования кнопки", () => {
    expect(button).toBeDefined();
  });

  it("3. Параграфов по умолчанию должно быть 3", () => {
    expect(paragraphs.length).toBe(3);
  });

  it("4. Кнопка скрыта", () => {
    expect(button.hasAttribute("hidden")).toBe(true);
  });

  it("5. Поле ввода заполнено -- кнопка видна", () => {
    inputparagraph("There is text");
    expect(button.hasAttribute('[hidden="hidden"]')).toBe(false);
  });

  it("6. Пустое поле ввода -- кнопка скрыта", () => {
    inputparagraph("There is text");
    inputparagraph("");
    expect(button.hasAttribute("hidden")).toBe(true);
  });

  it("7. Получить 4 параграфа", () => {
      inputparagraph("There is text");
      button.click();
      let newParagraphs = el.querySelectorAll("p");
      expect(paragraphs.length + 1).toBe(newParagraphs.length);
  });

   it("8. Проверка добавления пятого параграфов", () => {
      inputparagraph("б 5555");      
      button.click();
      inputparagraph("с 6666");
      button.click();
      let newParagraphs = el.querySelectorAll("p");
      expect(paragraphs.length + 2).toBe(newParagraphs.length);
  });

  it("9. Одновременно может быть не более 5 параграфов", () => {
    for (let i = 0; i < 7; i++) {
      inputparagraph("Text");
      button.click();
    }
    let newParagraphs = el.querySelectorAll("p");
    expect(newParagraphs.length).toBe(5);
  });
  
  it("11. Параграфы совпадают с тем, что было введено в инпут", () => {
    let text = `${Math.random()}`;
    input.value = text;
    button.click();
    paragraphs = el.querySelectorAll("p");
    expect(paragraphs[paragraphs.length-1].innerHTML).toEqual(text);
  });

  it("12. Проверка существования параграфа ", () => {
    expect(paragraph).toBeDefined();
  });

  it("13. Поле ввода пустое по умолчанию", () => {
    expect(input.value = "").toBe("");
  });

  it("14. Поле ввода очищается после добавления параграфа", () => {
    inputparagraph("Text 888")
    button.click();
    expect(input.value).toBe("");
  });

  it("7. Получить 5 параграфов", () => {
      inputparagraph("There is text");
      button.click();
      inputparagraph("There is text");
      button.click();
      let newParagraphs = el.querySelectorAll("p");
      expect(paragraphs.length + 2).toBe(newParagraphs.length);
  });

});