let page = 1;

document.addEventListener('DOMContentLoaded', function() {
    startApp();
});

function startApp() {
    showServices();

    // Resalta el DIV actual según el tab al que se presiona
    showSection();

    // oculta o muestra una sección según el tab al que se presiona
    changeSection();

    // paginación siguiente y anterior
    nextPage();
    
    previousPage();

    // Comprueba la pagina actual para ocultar o mostrar la paginación
    pagerButtons();
}

function showSection() {
    // eliminar show-section de la section anterior
    const previousSection = document.querySelector('.show-section');
    if(previousSection) {
        previousSection.classList.remove('show-section');
    }

    const currentSection = document.querySelector(`#step-${page}`);
    currentSection.classList.add('show-section');

    const previousTab = document.querySelector('.tabs .current');
    if(previousTab) {
        // Eliminar la clase de current en el anterior
        previousTab.classList.remove('current');
    }
    
    // resalta el tab actual
    const tab = document.querySelector(`[data-step="${page}"]`);
    tab.classList.add('current');
}

function changeSection() {
    const links = document.querySelectorAll('.tabs button');
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            page = parseInt(e.target.dataset.step);

            // llamar la funcion de mostrar la seccion
            showSection();

            pagerButtons();
        })
    })
}

async function showServices() {
    try {
        const response = await fetch('./servicios.json');
        const data = await response.json();
        const { services } = data;

        // Generar HTML
        services.forEach(service => {
            const { id, name, price } = service;

            // DOM Scripting
            // Generar nombre del servicio
            const serviceName = document.createElement('p');
            serviceName.textContent = name;
            serviceName.classList.add('service-name');
            // Generar precio del servicio
            const servicePrice = document.createElement('p');
            servicePrice.textContent = `$ ${price}`;
            servicePrice.classList.add('service-price');

            // Generar div contenedor del servicio
            const serviceDiv = document.createElement('div');
            serviceDiv.classList.add('service');

            // inyectar precio y nombre al div del servicio
            serviceDiv.appendChild(serviceName);
            serviceDiv.appendChild(servicePrice);
            serviceDiv.dataset.serviceId = id;

            // selcciona un servicio para la cita
            serviceDiv.onclick = selectService;

            // inyectar al HTML
            document.querySelector('#services').appendChild(serviceDiv);
        });
    } catch (error) {
        console.log('error');
    }
}

function selectService(e) {
    let element;
    // forzar que el elemento al cual le damos click sea el div
    if(e.target.tagName === 'P') {
        element = e.target.parentElement;
    } else {
        element = e.target;
    }

    // cuando seleccionen un servicio añadirle la clase seleccionado
    if(element.classList.contains('selected')) {
        element.classList.remove('selected');
    } else {
        element.classList.add('selected');
    }
}

function nextPage() {
    const nextPage = document.querySelector('#next');
    nextPage.addEventListener('click', () => {
        page++;
        // volver a comprobar en que pagina esta el paginador
        pagerButtons();
    });
}

function previousPage() {
    const previousPage = document.querySelector('#previous');
    previousPage.addEventListener('click', () => {
        page--;
        // volver a comprobar en que pagina esta el paginador
        pagerButtons();
    });
}

function pagerButtons() {
    const nextPage = document.querySelector('#next');
    const previousPage = document.querySelector('#previous');

    if(page === 1) {
        previousPage.classList.add('hide')
    } else if(page === 3) {
        nextPage.classList.add('hide');
        previousPage.classList.remove('hide');
    } else {
        previousPage.classList.remove('hide');
        nextPage.classList.remove('hide');
    }

    // cambiar la seccion por la de la pagina
    showSection();
}

