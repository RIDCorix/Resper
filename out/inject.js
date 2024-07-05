console.log("Message from inject.js")
// add event listener to input field
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', (event) => {
        // if '番仔' is typed, add a under line belowe the text
        // add as new element, not as style
        if(event.target.value.includes('番仔')) {
            // put a red line below the text
            const line = document.createElement('div')
            line.style.width = '100%'
            line.style.height = '1px'
            line.style.backgroundColor = 'red'
            event.target.parentNode.appendChild(line)
            // position
            startPosition = event.target.getBoundingClientRect()
            line.style.position = 'absolute'
            line.style.top = startPosition.bottom + 'px'
            line.style.left = startPosition.left + 'px'
            // get text width of 番仔
            const span = document.createElement('span')
            span.innerText = '番仔'
            document.body.appendChild(span)
            const textWidth = span.getBoundingClientRect().width
            document.body.removeChild(span)
            // set width of the line
            line.style.width = textWidth + 'px'
            // width of text before 番仔
            const textBefore = event.target.value.split('番仔')[0]
            span.innerText = textBefore
            document.body.appendChild(span)
            const textBeforeWidth = span.getBoundingClientRect().width
            document.body.removeChild(span)
            // set left position of the line
            line.style.left = startPosition.left + textBeforeWidth + 'px'
        }
    })
})
