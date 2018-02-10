const lang = {
  en: "qwertyuiop[]asdfghjkl;'zxcvbnm,./"
};

lang.en.split('');
let rows = {
  top: [],
  middle: [],
  bottom: []
};

for(let index = 0; index < lang.en.length; index++){  
  let String1Keyboard = lang.en.slice(0,12);
  let String2Keyboard = lang.en.slice(12,23);
  let String3Keyboard = lang.en.slice(23,lang.en.length);
  rows.top = String1Keyboard.split('');
  rows.middle = String2Keyboard.split('');
  rows.bottom = String3Keyboard.split('');
};
console.log(rows);

const notes = ["do", "re", "mi", "fa", "sol", "la", "si"];

const playSound = note => {
  const audio = document.querySelector(`audio[data-note=${note}]`);
  audio.currentTime = 0;
  audio.play();
};

const html = document.querySelector("#keyboard-tpl").textContent.trim();
const parent = document.querySelector("#keyboard-container");

function renderKeyboard(tpl, rows, parent) {
 tpl = '<h1>You pressed: <span class="pressed"></span></h1>\
 <div class="slideThree">\
 <input type="checkbox" value="None" id="slideThree" name="check" checked />\
 <label for="slideThree"></label>\
 <span class="sound">Sound</span>\
 </div>\
 <div class="keyboard">\
 <%Object.keys(rows).map((index) =>{%>\
  <div>\
  <%rows[index].forEach((item) => { %>\
    <button class="button" data-note="mi"><%- item %></button>  <%})%>\
    </div> <%})%>\
    <button class="button space-button" data-note="mi">SPACE</button>\
    </div>';  
    const compile = _.template(tpl); 
    const result = compile(rows)
    parent.innerHTML = result;   
  };
  renderKeyboard(html, rows, parent);

  const buttons = Array.from(document.querySelectorAll(".button"));
  const pressed = document.querySelector(".pressed");
  
  const keyDown = (event) => {    
    buttons.map((button) => {
      if(event.key === button.textContent){
       button.classList.add('keyboard_btn--active');
       pressed.textContent = button.textContent;          
       if (document.querySelector('#slideThree').checked === true){
        playSound(button.dataset.note);        
      };
    };
  })
  };

//Функция для удаления класса
const removeClassListButton = (buttons) => {
  buttons.map((button) => {
    button.classList.remove('keyboard_btn--active');    
  });
};

const callback = event => {
 removeClassListButton(buttons);
 keyDown(event);
}; 
window.addEventListener("keydown", callback);