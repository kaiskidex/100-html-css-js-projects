const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");

generateBtn.addEventListener("click", generatePalette);

paletteContainer.addEventListener("click", (e) => {
    const colorBox = e.target.closest(".color-box");
    if (!colorBox) return;


    if (
        e.target.classList.contains("copy-btn") ||
        e.target.classList.contains("color")
    ) {
        const hexValue = colorBox.querySelector(".hex-value").textContent;
        const copyBtn = colorBox.querySelector(".copy-btn");

        navigator.clipboard
            .writeText(hexValue)
            .then(() => showCopySuccess(copyBtn))
            .catch(console.error);
    }
});


function updateTitleGradient(colors) {
    const h1 = document.querySelector("h1");
    h1.style.backgroundImage = `linear-gradient(45deg, ${colors[0]}, ${colors[2]})`;
}

function updateBackgroundGradient(colors) {
    const gradient = `linear-gradient(135deg, ${colors.join(", ")})`;
    document.body.style.setProperty("--bg-gradient", colors.join(", "));
}

function updateGenerateButton(colors) {
    const gradientColors = colors.slice(0, 2);

    const gradient = `linear-gradient(45deg, ${gradientColors.join(", ")})`;

    const btn = document.getElementById("generate-btn");
    btn.style.background = gradient;
    btn.style.color = "#fff";
}




function showCopySuccess(copyBtn) {
    copyBtn.classList.remove("far", "fa-copy");
    copyBtn.classList.add("fas", "fa-check");
    copyBtn.style.color = "#48bb78";

    setTimeout(() => {
        copyBtn.classList.remove("fas", "fa-check");
        copyBtn.classList.add("far", "fa-copy");
        copyBtn.style.color = "";
    }, 1500);
}

function generatePalette() {
    const colors = [];

    for (let i = 0; i < 5; i++) {
        colors.push(generateRandomColor());
    }

    updatePaletteDisplay(colors);
     updateTitleGradient(colors);
    updateBackgroundGradient(colors);
    updateGenerateButton(colors);
}

function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function updatePaletteDisplay(colors) {
    const colorBoxes = document.querySelectorAll(".color-box");

    colorBoxes.forEach((box, index) => {
        box.querySelector(".color").style.backgroundColor = colors[index];
        box.querySelector(".hex-value").textContent = colors[index];
    });
}
