window.customElements.define('skill-section', class extends HTMLElement
{
    constructor()
    {
        super(); //Calling the constructor of the HTMLElement class and not the Skills 
        const row = document.getElementById('skill-section-row'); 
        const ColumDiv = document.createElement('div');
        ColumDiv.classList.add('col-lg');
        //Creating an image node
        const image = document.createElement('img');
        image.src = this.getAttribute('path');
        image.style.width = "20%";
        //Creating an heading node
        const heading = document.createElement('h4');
        heading.classList.add('fw-light');
        heading.textContent = this.getAttribute('name');
        const hr = document.createElement('hr');
        this.parentNode.appendChild(ColumDiv);
        ColumDiv.appendChild(image);
        ColumDiv.appendChild(heading);
        ColumDiv.appendChild(hr);
    }
});

