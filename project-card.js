const LOCAL_STORAGE_KEY = "projects";
const REMOTE_JSON_URL = "https://my-json-server.typicode.com/shaheerimran/cs134-hw5/projects";

class ProjectCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ["title", "image", "alt", "description", "link"];
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="project-card">
                <h2>${this.getAttribute("title") || "Untitled"}</h2>
                <picture>
                    <img src="${this.getAttribute("image")}" alt="${this.getAttribute("alt")}">
                </picture>
                <p>${this.getAttribute("description") || ""}</p>
                <a href="${this.getAttribute("link")}" target="_blank">Learn More</a>
            </div>
        `;
    }
}

customElements.define("project-card", ProjectCard);

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("load-local").addEventListener("click", loadLocalProjects);
    document.getElementById("load-remote").addEventListener("click", loadRemoteProjects);
});

function saveToLocalStorage(data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

function loadFromLocalStorage() {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
}

function displayProjects(projects) {
    const projectContainer = document.getElementById("projects-list");
    projectContainer.innerHTML = "";

    projects.forEach(proj => {
        const card = document.createElement("project-card");
        card.setAttribute("title", proj.title);
        card.setAttribute("image", proj.image);
        card.setAttribute("alt", proj.alt);
        card.setAttribute("description", proj.description);
        card.setAttribute("link", proj.link);
        projectContainer.appendChild(card);
    });
}

function loadLocalProjects() {
    let projects = loadFromLocalStorage();

    if (projects.length === 0) {
        projects = [
            {
                title: "Sample Project",
                image: "https://via.placeholder.com/150",
                alt: "Placeholder Image",
                description: "This is a sample project added from local storage.",
                link: "https://example.com"
            }
        ];
        saveToLocalStorage(projects); 
    }

    displayProjects(projects);
}

async function loadRemoteProjects() {
    try {
        const response = await fetch(REMOTE_JSON_URL);
        if (!response.ok) throw new Error("Failed to fetch remote projects");

        const projects = await response.json();
        saveToLocalStorage(projects); 
        displayProjects(projects);
    } catch (error) {
        console.error("Error loading remote projects:", error);
    }
}
