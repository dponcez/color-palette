import { createElementByClass } from "./createElements.js"
import { debounce } from "../utils/debounce.js"

/**
 * Color Palette
 * 
 * @param { string } color: based on the value of the current color
 * @param { string } description: information based on the color name
 * @returns { HTMLElement } 
 */

const eventHandler = ($, event, callback) => $.addEventListener(event, callback);
const selector = (element) => document.querySelector(element);

export const initApp = () => {
  const createColorItems = (color, description) => {
    // palette content
    const htmlRefs = {
      paletteContainer: createElementByClass('div', 'palette--container'),
      colorName: createElementByClass('code', 'color--name'),
      copyBtn: createElementByClass('button', 'copy--btn'),
      infoContainer: createElementByClass('div', 'color--info__container'),
      info: createElementByClass('p', 'info'),
      alertBox: createElementByClass('div', 'box'),
      message: createElementByClass('p', 'message'),
      audio: createElementByClass('audio', 'player')
    }
  
    const {
      paletteContainer,
      colorName,
      copyBtn,
      infoContainer,
      info,
      alertBox,
      message,
      audio
    } = htmlRefs;
  
    const grid = selector('[data-grid]');
    const container = selector('.container');
  
    paletteContainer.style.backgroundColor = color;
    colorName.textContent = color;
    copyBtn.textContent = 'copy color';
    info.textContent = description;
  
    if(color === '#000000'){
      colorName.style.color = '#f5f6f7'
    }

    // event
    eventHandler(copyBtn, 'click', debounce( async () => {
      await navigator.clipboard.writeText(colorName.textContent);

      message.textContent = 'copied!';

      alertBox.appendChild(message);
      container.appendChild(alertBox);

      audio.src = '../assets/sound/sound.mp3';

      if(alertBox.classList.contains('box')){
        audio.play()
      }

      setTimeout(() => {
        container.removeChild(alertBox);
      }, 1500)
      
    }, false))
  
    // append elements
    infoContainer.appendChild(info)
  
    paletteContainer.appendChild(colorName);
    paletteContainer.appendChild(copyBtn);
    paletteContainer.appendChild(infoContainer);
  
    grid.appendChild(paletteContainer);
  }
  
  
  const fetchData = async () => {
    const requestUrl = '../json/index.json';
    try {
      const response = await fetch(requestUrl);
      const data = await response.json();
    
      for(const {color, description} of data){
        createColorItems(color, description)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  
  fetchData()
}