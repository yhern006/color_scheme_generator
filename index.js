const seedColorEl = document.getElementById('seed-color')
const schemeModeEl = document.getElementById('scheme-mode-select')
const getSchemeBtn = document.getElementById('get-scheme-btn')

getSchemeBtn.addEventListener('click', fetchColorScheme)

function fetchColorScheme() {
    const seedColorClean = seedColorEl.value.slice(-6)
    const schemeModeClean = schemeModeEl.value.toLowerCase()
    console.log(schemeModeClean)
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColorClean}&format=json&mode=${schemeModeClean}`)
        .then(res => res.json())
        .then(data => {
            
            const schemeResultEl = document.getElementById('scheme-result')

            let colorList = ''
            data.colors.forEach(color => {
                console.log(`color: ${color.hex.value}`)

                colorList += `
                    <li class='scheme-color'
                        style='background-color:${color.hex.value}'><p>${color.hex.value}</p></li>
                `
            });
            schemeResultEl.innerHTML = colorList
        })
}

// ex: https://www.thecolorapi.com/scheme?hex=0047AB&format=html&mode=analogic&count=6
