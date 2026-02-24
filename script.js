document.addEventListener("DOMContentLoaded", () => {
    const inputName = document.getElementById('inputName');
    const inputPic = document.getElementById('inputPic');
    const cardName = document.getElementById('cardName');
    const cardImg = document.getElementById('cardImg');
    const cardID = document.getElementById('cardID');
    const downloadBtn = document.getElementById('downloadBtn');


    // 1. Random ID Generation (On Page Load)
    const generateRandomID = () => {
        const randomNum = Math.floor(100000 + Math.random() * 900000);
        cardID.innerText = "SUM-" + randomNum;
    };
    generateRandomID();

    

    // 2. Name update logic
    inputName.addEventListener('input', () => {
        cardName.innerText = inputName.value.toUpperCase() || "MEMBER NAME";
    });

    // 3. Image preview logic
    inputPic.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                cardImg.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // 4. Download logic (html2canvas)
    downloadBtn.addEventListener('click', () => {
        const target = document.querySelector("#id-card-wrap");

        html2canvas(target, {
            backgroundColor: null,
            scale: 3 // High resolution output
        }).then(canvas => {
            const link = document.createElement('a');
            const fileName = inputName.value ? inputName.value.replace(/\s+/g, '_') : 'SumOne_Member';
            link.download = "SumOne_ID_" + fileName + ".png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        });
    });
});

