class ProjectCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['title', 'image', 'alt', 'description', 'link'];
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="project-card">
                <h2>${this.getAttribute('title') || 'Untitled'}</h2>
                <picture>
                    <img src="${this.getAttribute('image')}" alt="${this.getAttribute('alt')}">
                </picture>
                <p>${this.getAttribute('description') || ''}</p>
                <a href="${this.getAttribute('link')}" target="_blank">Learn More</a>
            </div>
        `;
    }
}

customElements.define('project-card', ProjectCard);

async function loadProjects() {
    const projectContainer = document.getElementById('projects-list');
    projectContainer.innerHTML = '';

    try {
        const response = await fetch('projects.json');
        const projects = await response.json();

        projects.forEach(proj => {
            const card = document.createElement('project-card');
            card.setAttribute('title', proj.title);
            card.setAttribute('image', proj.image);
            card.setAttribute('alt', proj.alt);
            card.setAttribute('description', proj.description);
            card.setAttribute('link', proj.link);
            projectContainer.appendChild(card);
        });

    } catch (error) {
        console.error('Error loading projects:', error);
        projectContainer.innerHTML = `<p>Failed to load projects.</p>`;
    }
}

document.addEventListener('DOMContentLoaded', loadProjects);
