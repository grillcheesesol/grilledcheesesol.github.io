const dialogue = [
    "Hi, I'm Grilled Cheese.",
    "I'm a memecoin on Base and im a mf grilled cheese.",
    "Projects nowadays kind of suck, including this one.",
    "Wouldn't it be funny if a grilled cheese was #1 on Base though?"
];

let currentLine = 0;
let currentChar = 0;
const textElement = document.getElementById("dialogue-text");
const nextButton = document.getElementById("next-btn");
const backButton = document.getElementById("back-btn");
const tokenomicsContainer = document.getElementById("tokenomics-container");
const socialsContainer = document.getElementById("socials-container");
const tokenomicsTitleElement = document.getElementById("tokenomics-title");

const copyCAButton = document.getElementById("copy-ca-btn");
const contractText = "0x123456789ABCDEF123456789ABCDEF123456789A";

let isTyping = false;
let tokenomicsRendered = false;
let socialsRendered = false;

const tokenomicsTitle = "Tokenomics";
const tokenomicsItems = [
    "Supply: 1,000,000,000 GRILL",
    "Taxes: fuck taxes",
    "Fentanyl: positive",
    "LP: locked"
];

// Function to type out text character by character
function typeText(line) {
    isTyping = true;
    textElement.textContent = ""; // Clear previous text
    currentChar = 0;

    function type() {
        if (currentChar < dialogue[line].length) {
            textElement.textContent += dialogue[line].charAt(currentChar);
            currentChar++;
            setTimeout(type, 50); // Typing speed
        } else {
            isTyping = false; // Typing finished
        }
    }

    type();
}

// Function to type out the Tokenomics title
function typeTokenomicsTitle(title, element) {
    let index = 0;

    function type() {
        if (index < title.length) {
            element.textContent += title.charAt(index);
            index++;
            setTimeout(type, 100); // Typing speed
        } else {
            displayTokenomicsItems(); // Display items after title is typed
        }
    }

    type();
}

// Function to display Tokenomics items with styling for specific keywords
function displayTokenomicsItems() {
    const listElement = document.getElementById("tokenomics-list");
    tokenomicsItems.forEach((item, i) => {
        const div = document.createElement("div");
        div.className = "tokenomics-item";
        div.style.animationDelay = `${i * 0.5}s`; // Add delay for each item

        // Check for specific keywords and apply custom styling
        if (item.startsWith("Supply:")) {
            div.innerHTML = `<span class="highlight supply">Supply:</span> ${item.slice(8)}`;
        } else if (item.startsWith("Taxes:")) {
            div.innerHTML = `<span class="highlight taxes">Taxes:</span> ${item.slice(7)}`;
        } else if (item.startsWith("Fentanyl:")) {
            div.innerHTML = `<span class="highlight fentanyl">Fentanyl:</span> ${item.slice(10)}`;
        } else if (item.startsWith("LP:")) {
            div.innerHTML = `<span class="highlight lp">LP:</span> ${item.slice(4)}`;
        } else {
            div.textContent = item; // Default style for other items
        }

        listElement.appendChild(div);
    });
}


// Show Tokenomics section
function showTokenomics() {
    if (tokenomicsRendered) return; // Prevent re-rendering
    tokenomicsRendered = true;
    tokenomicsContainer.classList.add("visible");
    typeTokenomicsTitle(tokenomicsTitle, tokenomicsTitleElement);

    // Show Socials section immediately after Tokenomics is revealed
    showSocials();
}

// Show Socials section
function showSocials() {
    if (socialsRendered) return; // Prevent re-rendering
    socialsRendered = true;
    socialsContainer.classList.add("visible");
}

// Copy Contract Address
copyCAButton.addEventListener("click", () => {
    navigator.clipboard.writeText(contractText).then(() => {
        alert("Contract Address Copied!");
    }).catch(err => {
        console.error("Could not copy text: ", err);
    });
});

// Update button states based on the current dialogue
function updateButtons() {
    if (currentLine === 0) {
        backButton.classList.add("disabled");
    } else {
        backButton.classList.remove("disabled");
    }

    if (currentLine === dialogue.length - 1) {
        nextButton.style.display = "none"; // Hide next button at the end
        showTokenomics(); // Show Tokenomics when reaching the last dialogue
    } else {
        nextButton.style.display = "inline"; // Show next button otherwise
    }
}

// Event listener for clicking the next button
nextButton.addEventListener("click", () => {
    if (isTyping || currentLine >= dialogue.length - 1) return; // Ignore clicks while typing or at end
    currentLine++;
    typeText(currentLine);
    updateButtons();
});

// Event listener for clicking the back button
backButton.addEventListener("click", () => {
    if (isTyping || currentLine <= 0) return; // Ignore clicks while typing or at beginning
    currentLine--;
    typeText(currentLine);
    updateButtons();
});

// Initialize the typing effect and setup
document.addEventListener("DOMContentLoaded", () => {
    typeText(currentLine);
    updateButtons();

    // Hide Tokenomics and Socials sections initially
    tokenomicsContainer.classList.remove("visible");
    socialsContainer.classList.remove("visible");
});
