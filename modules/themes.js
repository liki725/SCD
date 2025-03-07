const elementsForChange = {
    headerBlock: document.querySelector('header'),
    elementsInMain: document.querySelectorAll('main > aside, main > div'),
    asideText: document.querySelector('aside')
};

const currentHour = new Date().getHours();


const getCurrentTheme = () => (currentHour >= 8 && currentHour < 20 ? 'light' : 'dark');

const staticStyles = () => {
    if (getCurrentTheme() === 'light') {
        document.body.classList.add('lightTheme');
        document.body.style.backgroundColor = '#F5F5F5';
        elementsForChange.headerBlock.style.backgroundColor = '#FFF';
        for (let i = 0; i < elementsForChange.elementsInMain.length; i++) elementsForChange.elementsInMain[i].style.backgroundColor = '#FFF';
        elementsForChange.asideText.style.color = '#000';
    } else {
        document.body.classList.add('darkTheme');
        document.body.style.backgroundColor = '#121212';
        elementsForChange.headerBlock.style.backgroundColor = '#000';
        for (let i = 0; i < elementsForChange.elementsInMain.length; i++) elementsForChange.elementsInMain[i].style.backgroundColor = '#000';
        elementsForChange.asideText.style.color = '#FFF';
    }
}

export const dynamicStyles = () => {
    const titleElements = document.querySelectorAll('i.title');
    const isolateSpans = document.querySelectorAll('span.isolate');
    const allDD = document.querySelectorAll('div.info dd');
    if (getCurrentTheme() === 'light') {
        titleElements.forEach(elem => elem.style.color = '#00F');
        isolateSpans.forEach(elem => elem.style.color = '#000');
        allDD.forEach(elem => elem.style.color = '#000');
    } else {
        titleElements.forEach(elem => elem.style.color = '#FF0');
        isolateSpans.forEach(elem => elem.style.color = '#FFF');
        allDD.forEach(elem => elem.style.color = '#FFF');
    }
}

window.onload = staticStyles;