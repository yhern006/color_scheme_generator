const seedColorEl = document.getElementById('seed-color')
const schemeModeEl = document.getElementById('scheme-mode-select')
const getSchemeBtn = document.getElementById('get-scheme-btn')
const schemeResultEl = document.getElementById('scheme-result')

getSchemeBtn.addEventListener('click', fetchColorScheme)
schemeResultEl.addEventListener('click', copyToClipboard)

function fetchColorScheme() {
    const seedColorClean = seedColorEl.value.slice(-6)
    const schemeModeClean = schemeModeEl.value.toLowerCase()
    console.log(schemeModeClean)
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColorClean}&format=json&mode=${schemeModeClean}`)
        .then(res => res.json())
        .then(data => {
            
            let colorList = ''
            data.colors.forEach(color => {
                console.log(`color: ${color.hex.value}`)

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
    console.log(e.target.id)
    navigator.clipboard.writeText(`#${e.target.id}`)

    alert(`copied to clipboard: #${e.target.id}`)
}
