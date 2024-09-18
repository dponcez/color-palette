/**
 * Create element based on tag and classes
 * 
 * @param { string } tagName: tag name of the elements
 * @param { string } classes: set class attribute on the elements
 * @returns { HTMLElement }
 */

const createElement = (element) => document.createElement(element)

export const createElementByClass = (tagName, classes) => {
  const element = createElement(tagName);

  element.setAttribute('class', classes);
  return element
}