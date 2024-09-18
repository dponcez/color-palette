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

export const initApp = () => {
  const createColorItems = (color, description) => {
    // palette content
    const htmlRefs = {
      paletteContainer: createElementByClass('div', 'palette--container'),
      colorName: createElementByClass('code', 'color--name'),
      copyBtn: createElementByClass('button', 'copy--btn'),
      infoContainer: createElementByClass('div', 'color--info__container'),
      info: createElementByClass('p', 'info'),
      closeAlertBtn: createElementByClass('button', 'close'),
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
      closeAlertBtn,
      alertBox,
      message,
      audio
    } = htmlRefs;
  
    const grid = document.querySelector('[data-grid]');
  
    paletteContainer.style.backgroundColor = color;
    colorName.textContent = color;
    copyBtn.textContent = 'copy color';
    info.textContent = description;
  
    if(color === '#000000'){
      colorName.style.color = '#ffffff'
    }

    // event
    eventHandler(copyBtn, 'click', debounce( async () => {
      await navigator.clipboard.writeText(colorName);

      message.textContent = 'copied!';
      closeAlertBtn.textContent = 'x';

      alertBox.appendChild(closeAlertBtn);
      alertBox.appendChild(message);

      grid.appendChild(alertBox);
      
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