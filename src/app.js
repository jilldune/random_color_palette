"strict";

const paletteBoard = document.getElementById('palette_board');
const reFreshBtn = document.getElementById('refresh-palette-btn');

const MAX_BOX =  30;

// hex code generator
const hexGenerator = () => {
    let randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
    randomHex = `#${randomHex.padStart(6, "0")}`;
    return randomHex;
}

const copyColor = (container, color) => {
    const colorName = container.querySelector('.color-name');
    navigator.clipboard.writeText(color)
    .then(() => {
        colorName.innerText = "copied";
        setTimeout(() => { colorName.innerText = color; }, 1000);
    }).catch(()=>{ alert('Failed to copy color code') });
}

// Generates new Palette Boxes
const generatePaletteBoxes = () => {
    paletteBoard.innerHTML = '';
    for (let i = 0; i < MAX_BOX; i++) {
        let color = hexGenerator();
        let li = document.createElement('li');
        li.classList.add('color-container');
        li.innerHTML = `
            <div class="color-screen" style="background-color: ${color}"></div>
            <p class="color-name">${color}</p>
        `;
        li.addEventListener('click', ()=>{ copyColor(li, color); });
        paletteBoard.append(li);
    }
}
generatePaletteBoxes();

// Generate new palette button
const generatePalette = () => { generatePaletteBoxes(); }
reFreshBtn.addEventListener('click', generatePalette);