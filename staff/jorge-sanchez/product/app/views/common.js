// dom (general purpose)

function createElement(tagName) {
    return document.createElement(tagName)
}

function changeDisplay(element, value) {
    element.style.display = value
}

function setTextContent(element, text) {
    element.textContent = text
}

function addChild(element, childElement) {
    element.appendChild(childElement)
}

function setClass(element, clazz) {
    element.className = clazz
}

function createTextNode(text) {
    return document.createTextNode(text)
}

// interface (application specific)

function createView() {
    return createElement('div')
}

function hideView(view) {
    changeDisplay(view, 'none')
}

function showView(view) {
    changeDisplay(view, '')
}

function createTitle() {
    return createElement('h1')
}

function createParagraph() {
    return createElement('p')
}

function createNavigation() {
    return createElement('nav')
}

function createLink() {
    const link = createElement('a')
    link.href = ''

    return link
}