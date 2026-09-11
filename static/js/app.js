const feedButton = document.getElementById("feedButton");
const resetButton = document.getElementById("resetButton");

const elephant = document.getElementById("elephant");
const status = document.getElementById("status");
const fileInput = document.getElementById("fileInput");

const fpiDisplay = document.getElementById("fpi");
const fart = document.getElementById("fart");
const fartCountDisplay = document.getElementById("fartCount");

const meterBar = document.getElementById("meterBar");
const meterText = document.getElementById("meterText");

const fileInfo = document.getElementById("fileInfo");
const poop = document.getElementById("poop");

const report = document.getElementById("report");
const achievement = document.getElementById("achievement");

const mealName = document.getElementById("mealName");
const mealType = document.getElementById("mealType");
const hungerDisplay = document.getElementById("hunger");


let fartCount = 0;
let mealCount = 0;
let hunger = 100;


// FILE SELECTED

fileInput.addEventListener("change", function () {

    if (fileInput.files.length === 0) {
        return;
    }

    const file = fileInput.files[0];

    mealName.innerHTML = "📄 " + file.name;

    let type = "Unknown";

    if (file.name.toLowerCase().endsWith(".txt")) {
        type = "Text";
    }
    else if (file.name.toLowerCase().endsWith(".pdf")) {
        type = "PDF";
    }
    else if (
        file.name.toLowerCase().endsWith(".jpg") ||
        file.name.toLowerCase().endsWith(".jpeg") ||
        file.name.toLowerCase().endsWith(".png")
    ) {
        type = "Image";
    }
    else if (
        file.name.toLowerCase().endsWith(".mp3") ||
        file.name.toLowerCase().endsWith(".wav")
    ) {
        type = "Audio";
    }

    mealType.innerHTML = "🍴 Meal Type: " + type;

});


// FEED BUTTON

feedButton.addEventListener("click", async function () {

    if (fileInput.files.length === 0) {

        status.innerHTML =
            "😐 The elephant is hungry! Choose a file first.";

        return;
    }


    const file = fileInput.files[0];


    fileInfo.innerHTML =
        "📄 File: " + file.name +
        "<br>📦 Size: " + file.size + " bytes" +
        "<br>🧾 Type: " + (file.type || "Unknown");


    feedButton.disabled = true;


    fart.innerHTML = "";
    poop.innerHTML = "";
    report.innerHTML = "";
    achievement.innerHTML = "";


    elephant.innerHTML = "🐘🍴";
    elephant.classList.add("eating");

    status.innerHTML =
        "😋 Eating " + file.name + "...";


    const formData = new FormData();

    formData.append("file", file);


    try {

        const response = await fetch("/upload", {
            method: "POST",
            body: formData
        });


        const result = await response.text();

        console.log("Flask response:", result);


        const match =
            result.match(/Fart Potential:\s*(\d+)\/100/);


        if (!match) {

            status.innerHTML =
                "❌ Flask replied, but FPI could not be found.";

            console.log(result);

            elephant.classList.remove("eating");

            feedButton.disabled = false;

            return;
        }


        const fpi = Number(match[1]);


        mealCount++;


        hunger = Math.max(0, hunger - 20);

        hungerDisplay.innerHTML =
            "🍽️ Hunger: " + hunger + "%";


        fpiDisplay.innerHTML =
            "💨 FPI: " + fpi + "/100";


        meterBar.style.width = fpi + "%";


        if (fpi < 30) {

            meterText.innerHTML =
                "💨 Fart-O-Meter: Mild";

        }
        else if (fpi < 70) {

            meterText.innerHTML =
                "💨💨 Fart-O-Meter: Dangerous";

        }
        else {

            meterText.innerHTML =
                "💨💨💨 Fart-O-Meter: EVACUATE!";

        }


        // DIGEST

        setTimeout(function () {

            elephant.classList.remove("eating");

            elephant.innerHTML = "🐘🤢";

            status.innerHTML =
                "🤢 Digesting " + file.name + "...";

        }, 1000);


        // COUNTDOWN

        setTimeout(function () {

            status.innerHTML =
                "🫃 Processing the meal... 3... 2... 1...";

        }, 1500);


        // FART

        setTimeout(function () {

            elephant.innerHTML = "🐘💨";

            elephant.classList.add("shaking");


            fart.innerHTML =
                "💨💨💨 PFFFFFFFFT! 💨💨💨";
                fart.classList.remove("fart-animation");

void fart.offsetWidth;

fart.classList.add("fart-animation");


            fartCount++;


            fartCountDisplay.innerHTML =
                fartCount;


            poop.innerHTML = "💩";


            report.innerHTML =
                "🧪 Scientific Report:<br>" +
                "Meal successfully destroyed.<br>" +
                "Digestive efficiency: questionable.<br>" +
                "Environmental impact: 💨";


            if (mealCount === 1) {

                achievement.innerHTML =
                    "🏆 Achievement Unlocked: First Meal!";

            }


            if (fartCount === 5) {

                achievement.innerHTML =
                    "🏆 Achievement Unlocked: Professional Farter! 💨";

            }


            if (fartCount === 10) {

                achievement.innerHTML =
                    "🏆 Achievement Unlocked: FART LEGEND! 💨👑";

            }


            if (mealCount === 5) {

                achievement.innerHTML =
                    "🏆 Achievement Unlocked: Elephant Master Chef! 🐘🍽️";

            }


            status.innerHTML =
                "💨 SUCCESS! Elephant has farted.";


            setTimeout(function () {

                elephant.classList.remove("shaking");

            }, 500);


            feedButton.disabled = false;


        }, 2500);


    }

    catch (error) {

        console.error("UPLOAD ERROR:", error);

        elephant.classList.remove("eating");

        elephant.innerHTML = "🐘😐";

        status.innerHTML =
            "❌ Something went wrong. Check the browser console.";

        feedButton.disabled = false;

    }

});


// RESET BUTTON

resetButton.addEventListener("click", function () {

    location.reload();

});