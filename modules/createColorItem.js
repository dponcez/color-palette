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
const log = (value) => console.log(value);

export const initApp = () => {
  const createColorItems = (color, description) =>  {
    const htmlRefs = {
      paletteContainer: createElementByClass('div', 'palette--container'),
      hexColor: createElementByClass('div', 'hex--color'),
      infoContainer: createElementByClass('div', 'info--container'),
      hexInfoContainer: createElementByClass('div', 'hex--info__container'),
      nameInfo: createElementByClass('p', 'name--info'),
      hexInfo: createElementByClass('code', 'hex--info'),
      title: createElementByClass('p', 'title'),
      copyBtn: createElementByClass('button', 'copy--btn'),
      alertBox: createElementByClass('div', 'box'),
      message: createElementByClass('p', 'message'),
      audio: createElementByClass('audio', '')
    }

    const {
      paletteContainer,
      hexColor,
      infoContainer,
      hexInfoContainer,
      nameInfo,
      hexInfo,
      title,
      copyBtn,
      alertBox,
      message,
      audio
    } = htmlRefs;

    const grid = selector('[data-grid');
    const container = selector('.container');

    hexColor.style.backgroundColor = color;
    hexInfo.textContent = color;
    nameInfo.textContent = 'hex:'
    title.textContent = description;
    copyBtn.textContent = 'copy color';

    // append elements
    hexInfoContainer.appendChild(nameInfo);
    hexInfoContainer.appendChild(hexInfo);

    infoContainer.appendChild(hexInfoContainer);
    infoContainer.appendChild(title);

    paletteContainer.appendChild(hexColor);
    paletteContainer.appendChild(infoContainer);
    paletteContainer.appendChild(copyBtn);

    // event
    eventHandler(copyBtn, 'click', debounce( async () => {

      try {
        await navigator.clipboard.writeText(hexInfo.textContent);
  
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
        
      } catch (error) {
        log(`Error to copy the hex color: ${error}`)
      }
      
    }, false))

    grid.appendChild(paletteContainer);
  }

  const fetchData = async () => {
    const requestUrl = '../json/index.json';

    try {
      const response = await fetch(requestUrl);
      const data = await response.json();

      for(const { color, description } of data){
        createColorItems(color, description)
      }
    } catch (error) {
      log(`Failure to parse the data: ${error}`)
    }
  }

  fetchData()
}