import { allInfo } from './modules/Info.js';
import { dynamicStyles } from './modules/themes.js';

const informationBlock = document.querySelector('div.info');
const arrCategories = document.querySelectorAll('div.category');

arrCategories.forEach((category) => {
    category.addEventListener('click', function () {

        for (let i = 0; i < arrCategories.length; i++) {
            let currentParagraphForCheck = arrCategories[i].querySelector('p');

            if (currentParagraphForCheck.classList.contains('active')) {
                currentParagraphForCheck.classList.remove('active');
                arrCategories[i].classList.remove('disabled');
            }
        }

        let currentActiveParagraph = category.querySelector('p');
        currentActiveParagraph.classList.add('active');
        category.classList.add('disabled');

        informationBlock.innerHTML = '';

        switch (category.id) {
            case 'VCI':

                const { mainElements, exampleTitle, intelTypeTitle } = constructorForIndex(
                    allInfo.VCI.abbr,
                    allInfo.VCI.index,
                    allInfo.VCI.whatShowInfo,
                );

                informationBlock.append(...mainElements);

                allInfo.VCI.createWhatCan.forEach(elem => {
                    informationBlock.append(createWhatCan(elem.id, elem.title, elem.description));
                });

                informationBlock.appendChild(exampleTitle());

                allInfo.VCI.createExample.forEach(elem => {
                    informationBlock.append(createExample(elem.id, elem.title, elem.question, elem.target));
                });

                informationBlock.appendChild(intelTypeTitle());

                allInfo.VCI.createIntel.forEach(elem => {
                    informationBlock.append(createIntel(elem));
                });

                dynamicStyles();
                
                break;

            case 'CVCI':
                constructorForIndex(`CVCI (Crystallized Verbal Comprehension Index)`, `CVCI:`);
                break;

            case 'FVCI':
                constructorForIndex(`FVCI (Fluid Verbal Comprehension Index)`, `FVCI:`);
                break;

            case 'VSI':
                constructorForIndex(`VSI (Visual Spatial Index)`, `VSI:`);
                break;
        }
    })
});


const constructorForIndex = (title, index, showInfo) => {

    const AllElements = [];

    const nameIndexH1 = document.createElement('h1');
    nameIndexH1.classList.add('titleIndex');
    nameIndexH1.textContent = title;

    const whatShowDT = document.createElement('dt');
    whatShowDT.classList.add('whatShow', 'Title');
    whatShowDT.innerHTML = `<span>?</span><p>Что показывает ${index}</p><span>?</span>`;

    const whatShowDD = document.createElement('dd');
    whatShowDD.classList.add('whatShow', 'Info');
    whatShowDD.innerHTML = showInfo;

    const whatCanTitleH2 = document.createElement('h2');
    whatCanTitleH2.classList.add('whatCan', 'Title');
    whatCanTitleH2.innerHTML = `${index} измеряет, как хорошо человек может:`;

    AllElements.push(nameIndexH1, whatShowDT, whatShowDD, whatCanTitleH2);

    const exampleTaskTitleH2 = document.createElement('h2');
    exampleTaskTitleH2.classList.add('exampleTask', 'Title');
    exampleTaskTitleH2.innerHTML = `Примеры задач для оценки ${index}:`;

    const typesIntelTitleH2 = document.createElement('h2');
    typesIntelTitleH2.classList.add('typeIntel', 'Title');
    typesIntelTitleH2.innerHTML = `Виды использования разных типов интеллекта:`;

    return {
        mainElements: AllElements,
        exampleTitle: () => exampleTaskTitleH2,
        intelTypeTitle: () => typesIntelTitleH2
    };
};



const createWhatCan = (Num, Title, Info) => {
    const WhatCanBlock = document.createElement('div');
    WhatCanBlock.classList.add('Can');

    const CanTitleDT = document.createElement('dt');
    CanTitleDT.classList.add('WhatCan', 'Title');
    CanTitleDT.innerHTML = `<span>${Num}</span><span>)</span><p>${Title}</p>`;

    const CanInfoDD = document.createElement('dd');
    CanInfoDD.classList.add('WhatCan', 'Info');
    CanInfoDD.innerHTML = Info;

    WhatCanBlock.append(CanTitleDT, CanInfoDD);
    return WhatCanBlock;
}

const createExample = (letterIndex, title, question, target) => {

    const exampleDiv = document.createElement('div');
    exampleDiv.classList.add('Example');

    const exampleTaskTitleDT = document.createElement('dt');
    exampleTaskTitleDT.classList.add('exampleTask', 'Title');
    exampleTaskTitleDT.innerHTML = `<span>${letterIndex}</span><span>:</span><p>${title}</p>`;

    const exampleTaskQuestionDD = document.createElement('dd');
    exampleTaskQuestionDD.classList.add('exampleTask', 'Question');
    exampleTaskQuestionDD.innerHTML = `<span>?</span><u>Задача:</u><p>${question}</p>`;

    const exampleTaskTargetDD = document.createElement('dd');
    exampleTaskTargetDD.classList.add('exampleTask', 'Target');
    exampleTaskTargetDD.innerHTML = `<span>!</span><u>Цель:</u><p>${target}</p>`;

    exampleDiv.append(exampleTaskTitleDT, exampleTaskQuestionDD, exampleTaskTargetDD);

    return exampleDiv
}


const createIntel = (params) => {

    let checkerIntelHas = params.CanOrcant;  // Извлекаем canOrcant из params

    const typeIntelDiv = document.createElement('div');
    typeIntelDiv.classList.add('IntelType');

    const IntelTypeTitleDT = document.createElement('dt');
    IntelTypeTitleDT.classList.add('IntelType', 'Title');

    const howRelatedIntelRes = document.createElement('dd');
    howRelatedIntelRes.classList.add('Related', 'Result');

    const createIntelHasTrue = (params) => {

        const { Intelligence, HowOften, QuestionAndExample, howRelated, howRelatedRes } = params; // деструктуризация

        IntelTypeTitleDT.innerHTML = `
<svg class="check" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 4L10 18L3 10" stroke="green" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
</svg><p>${Intelligence} Intelligence</p> <span class="isolate"> — (${HowOften})</span>`;

        const exampleIntelQuestionAndExampleDD = document.createElement('dd');
        exampleIntelQuestionAndExampleDD.classList.add('exampleTask', 'Question');
        exampleIntelQuestionAndExampleDD.innerHTML = `<span>?</span><u>Пример/Задача:</u><p>${QuestionAndExample}</p>`;

        const howRelatedIntel = document.createElement('dd');
        howRelatedIntel.classList.add('Related', 'Info');
        howRelatedIntel.innerHTML = `<span>?</span><u>Как это связано:</u><p>${howRelated}</p>`;

        howRelatedIntelRes.innerHTML = `<span>!</span><u>Итог:</u><p>${howRelatedRes}</p>`;

        typeIntelDiv.append(IntelTypeTitleDT, exampleIntelQuestionAndExampleDD, howRelatedIntel, howRelatedIntelRes);
    }

    const createIntelHasFalse = (params) => {

        const { Intelligence, NotExplanation, howRelatedRes } = params; // деструктуризация

        IntelTypeTitleDT.innerHTML = `<svg class="cross" width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
    <line x1="6" y1="6" x2="24" y2="24" stroke="red" stroke-width="6" stroke-linecap="round"/>
    <line x1="24" y1="6" x2="6" y2="24" stroke="red" stroke-width="6" stroke-linecap="round"/>
</svg><p>${Intelligence} Intelligence</p> <span class="isolate"> — (Никогда, Косвенный)</span>`;

        const whyNotFit = document.createElement('dd');
        whyNotFit.classList.add('NotFit', 'Question');
        whyNotFit.innerHTML = `<span>?</span><u>Почему не подходит:</u><p>${NotExplanation}</p>`;

        howRelatedIntelRes.innerHTML = `<span>!</span><u>Итог:</u><p>${howRelatedRes}</p>`;

        typeIntelDiv.append(IntelTypeTitleDT, whyNotFit, howRelatedIntelRes)
    }

    // Используем checkerIntelHas, который теперь извлекается из params
    if (checkerIntelHas) {
        createIntelHasTrue(params);
    } else {
        createIntelHasFalse(params);
    }

    return typeIntelDiv;
}
