const projects = [
    {
        name: "Model 1",
        id: "1",
        url: "https://ifcjs.github.io/ifcjs-crash-course/sample-apps/01/"
    },
    {
        name: "Model 2",
        id: "2",
        url: "https://ifcjs.github.io/ifcjs-crash-course/sample-apps/02/"
    },
    {
        name: "Model 3",
        id: "3",
        url: "https://ifcjs.github.io/ifcjs-crash-course/sample-apps/03/"
    },
    {
        name: "Model 4",
        id: "4",
        url: "https://ifcjs.github.io/ifcjs-crash-course/sample-apps/04/"
    },
    {
        name: "Model 5",
        id: "5",
        url: "https://ifcjs.github.io/ifcjs-crash-course/sample-apps/05/"
    },
];

// Get all cards
const projectContainer = document.getElementById("projects-container");
const projectCards = Array.from(projectContainer.children);

const templateProjectCard = projectCards[0];
const baseURL = "./model-viewer.html";


for(let project of projects){

    // Create a new card
    const newCard = templateProjectCard.cloneNode(true);

    // Add project name to card
    const cardTitle = newCard.querySelector('h2');
    cardTitle.textContent = project.name;

    // Add project url to card
    const button = newCard.querySelector('a');
    button.href = baseURL + `?id=${project.id}`;

    // Add card to container
    projectContainer.appendChild(newCard);

}

templateProjectCard.remove();
