// class ProjectCard extends HTMLElement {
//     constructor() {
//         super();
//         this.attachShadow({ mode: 'open' });
//     }

//     connectedCallback() {
//         this.render();
//     }

//     static get observedAttributes() {
//         return ['title', 'image', 'alt', 'description', 'link'];
//     }

//     attributeChangedCallback() {
//         this.render();
//     }

//     render() {
//         this.shadowRoot.innerHTML = `
//             <style>
//                 :host {
//                     display: block;
//                     background: var(--card-bg, #fff);
//                     color: var(--card-text, #333);
//                     border-radius: var(--card-border-radius, 10px);
//                     box-shadow: var(--card-shadow, 0 4px 8px rgba(0,0,0,0.1));
//                     padding: 1rem;
//                     max-width: 300px;
//                     transition: transform 0.3s ease;
//                 }
//                 :host(:hover) {
//                     transform: scale(1.05);
//                 }
//                 h2 {
//                     font-size: 1.5rem;
//                     margin: 0 0 0.5rem;
//                 }
//                 picture img {
//                     width: 100%;
//                     height: auto;
//                     border-radius: 5px;
//                 }
//                 p {
//                     font-size: 1rem;
//                     line-height: 1.4;
//                 }
//                 a {
//                     display: inline-block;
//                     margin-top: 0.5rem;
//                     text-decoration: none;
//                     color: var(--link-color, #007BFF);
//                 }
//             </style>
//             <h2>${this.getAttribute('title') || 'Untitled'}</h2>
//             <picture>
//                 <img src="${this.getAttribute('image')}" alt="${this.getAttribute('alt')}" />
//             </picture>
//             <p>${this.getAttribute('description') || ''}</p>
//             <a href="${this.getAttribute('link')}" target="_blank">Learn More</a>
//         `;
//     }
// }

// customElements.define('project-card', ProjectCard);

// async function loadProjects() {
//     const projectContainer = document.getElementById('projects-list');
//     projectContainer.innerHTML = '';

//     let projects = JSON.parse(localStorage.getItem('projects')) || [];

//     try {
//         const response = await fetch('projects.json');
//         const remoteProjects = await response.json();
//         projects = [...projects, ...remoteProjects];
//     } catch (error) {
//         console.error('Error fetching projects:', error);
//     }

//     projects.forEach(proj => {
//         const card = document.createElement('project-card');
//         card.setAttribute('title', proj.title);
//         card.setAttribute('image', proj.image);
//         card.setAttribute('alt', proj.alt);
//         card.setAttribute('description', proj.description);
//         card.setAttribute('link', proj.link);
//         projectContainer.appendChild(card);
//     });
// }

// document.addEventListener('DOMContentLoaded', loadProjects);
