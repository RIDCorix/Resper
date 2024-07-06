console.log("Message from inject.js")
// add event listener to input field
function underlineText(input, targetText) {
    const inputText = input.value;
    // get from resper-underline under this input
    const underlineElement = getUnderlineElement(input);
    console.log('underlineElement', underlineElement);
    const startIndex = inputText.indexOf(targetText);

    if (startIndex !== -1) {
        const endIndex = startIndex + targetText.length;
        console.log('startIndex', startIndex);
        const textBeforeTarget = inputText.slice(0, startIndex);
        const textAfterTarget = inputText.slice(endIndex);

        const inputStyles = window.getComputedStyle(input);

        // 計算文字寬度
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = inputStyles.font;
        const textBeforeWidth = context.measureText(textBeforeTarget).width;
        const targetTextWidth = context.measureText(targetText).width;

        underlineElement.style.width = `${targetTextWidth}px`;
        underlineElement.style.marginLeft = `${textBeforeWidth}px`;
        underlineElement.style.bottom = `0px`;
        underlineElement.style.display = 'block';
        underlineElement.style.height = '1px';
        // color
        underlineElement.style.backgroundColor = 'red';
    } else {
        underlineElement.style.display = 'none';
    }
}

const inputs = document.querySelectorAll('input, textarea');

inputs.forEach((input, index) => {
    // 創建下劃線元素
    const underline = document.createElement('div');
    underline.className = 'resper-underline';

    // 插入下劃線元素到 input 元素之後
    input.parentNode.insertBefore(underline, input.nextSibling);

    // 設置自定義屬性以建立關聯
    input.setAttribute('data-underline-id', `underline-${index}`);
    underline.setAttribute('id', `underline-${index}`);
});

// 定義一個函數來找到對應的下劃線元素
function getUnderlineElement(input) {
    const underlineId = input.getAttribute('data-underline-id');
    return document.getElementById(underlineId);
}

// 示例：如何使用 getUnderlineElement 函數
inputs.forEach(input => {
    input.addEventListener('input', (event) => {
        if (event.target.value.includes('番仔')) {
            underlineText(input, '番仔');
            const rect = input.getBoundingClientRect();
            buttonMenu = createButtonMenu(input);
            buttonMenu.style.left = `${rect.left}px`;
            buttonMenu.style.top = `${rect.bottom + window.scrollY}px`;
            buttonMenu.style.display = 'block';
            input.parentNode.insertBefore(buttonMenu, input.nextSibling);
        }
    });
});

function createButtonMenu(input) {
    const buttonMenu = document.createElement('div');
    buttonMenu.className = 'resper-button-buttonMenu';
    // absolute
    buttonMenu.style.position = 'absolute';
    buttonMenu.style.zIndex = '9999';
    buttonMenu.innerHTML = `
        <button class="resper-button">Button 1</button>
        <button class="resper-button">Button 2</button>
        <button class="resper-button">Button 3</button>
    `;
    document.body.appendChild(buttonMenu);
    return buttonMenu;
}