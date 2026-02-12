const seedColorEl = document.getElementById('seed-color')
const schemeModeEl = document.getElementById('scheme-mode-select')
const getSchemeBtn = document.getElementById('get-scheme-btn')
const schemeResultEl = document.getElementById('scheme-result')
const schemeModalEl = document.getElementById('scheme-modal')

getSchemeBtn.addEventListener('click', fetchColorScheme)
schemeResultEl.addEventListener('click', copyToClipboard)

function fetchColorScheme() {
    const seedColorClean = seedColorEl.value.slice(-6)
    const schemeModeClean = schemeModeEl.value.toLowerCase()
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColorClean}&format=json&mode=${schemeModeClean}`)
        .then(res => res.json())
        .then(data => {
            
            let colorList = ''
            data.colors.forEach(color => {
                colorList += `
                    <li class='scheme-color'
                        style='background-color:${color.hex.value}'
                        id='${color.hex.clean}'><p>${color.hex.value}</p></li>
                `
            });
            schemeResultEl.innerHTML = colorList
        })
}

function copyToClipboard(e){
    const tagClicked = e.target.tagName.toLowerCase()
    const hexValueSpan = document.getElementById('hex-value')

    if(tagClicked === 'li'){
        navigator.clipboard.writeText(`#${e.target.id}`)
        hexValueSpan.textContent = `#${e.target.id}`
        schemeModalEl.classList.add('modal-display')
        setTimeout(removeModal, 2000)
    }
    else if(tagClicked === 'p'){
        hexValueSpan.textContent = `${e.target.textContent}`
        navigator.clipboard.writeText(`${e.target.textContent}`)
        schemeModalEl.classList.add('modal-display')
        setTimeout(removeModal, 2000)
    }
}

function removeModal() {
    schemeModalEl.classList.remove('modal-display')
}
