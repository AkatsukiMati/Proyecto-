// Función mejorada para generar el HTML de una tarjeta de vehículos
const generateVehiculoCard = ({ img, modelo, precio, generacion, descrip }) => {
    return `
        <div class="card col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 mb-5">
            <img src="${img}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${modelo}</h5>
                <p class="card-text">${descrip}</p>
                <h5 class="card-title">${precio}</h5>
                <h6 class="card-title">${generacion}</h6>
                <button class="btn btn-primary comprar-btn" data-modelo="${modelo}">
                    <i class="fa-solid fa-cart-shopping"></i>&nbsp;Comprar
                </button>
            </div>
        </div>
    `;
};

// Función para obtener los vehículos desde la API y renderizar las tarjetas
const obtenerYRenderizarVehiculos = async () => {
    try {
        const response = await fetch('https://run.mocky.io/v3/3c74301a-fded-482c-a124-ab63e776fe4a');
        if (!response.ok) {
            throw new Error('La solicitud falló');
        }
        const vehiculos = await response.json();
        console.log('Data de la API:', vehiculos); // Mostrar los datos de la API en la consola
        renderVehiculos(vehiculos); // Llama a la función renderVehiculos para mostrar las tarjetas
    } catch (error) {
        console.error('Error:', error);
    }
};

// Función para renderizar las tarjetas de vehículos y almacenarlas en localStorage
const renderVehiculos = (vehiculos) => {
    const contenedor = document.getElementById("contenedorVehiculos");
    contenedor.innerHTML = ""; // Limpiar el contenedor antes de renderizar las tarjetas
    vehiculos.forEach((vehiculo) => {
        const cardHTML = generateVehiculoCard(vehiculo); // Genera el HTML de la tarjeta para cada vehículo
        contenedor.innerHTML += cardHTML; // Agrega la tarjeta al contenedor

        // Almacenar el vehículo en localStorage
        localStorage.setItem(vehiculo.modelo, JSON.stringify(vehiculo));
    });

    // Añadir evento de clic a los botones de compra
    document.querySelectorAll('.comprar-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const modelo = event.currentTarget.getAttribute('data-modelo');
            window.location.href = `chevrolet-unico.html?modelo=${encodeURIComponent(modelo)}`;
        });
    });
};

// Función para filtrar y renderizar los vehículos según el modelo ingresado en el campo de búsqueda
const filtrarYRenderizarVehiculos = (vehiculos, searchTerm) => {
    const filteredVehiculos = vehiculos.filter((vehiculo) =>
        vehiculo.modelo.toLowerCase().includes(searchTerm)
    );
    renderVehiculos(filteredVehiculos); // Renderiza las tarjetas filtradas
};

// Listener de evento para el campo de búsqueda
const searchInput = document.getElementById("modelo");
searchInput.addEventListener("input", async () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    try {
        const response = await fetch('https://run.mocky.io/v3/3c74301a-fded-482c-a124-ab63e776fe4a');
        if (!response.ok) {
            throw new Error('La solicitud falló');
        }
        const vehiculos = await response.json();
        filtrarYRenderizarVehiculos(vehiculos, searchTerm); // Filtra y renderiza las tarjetas
    } catch (error) {
        console.error('Error:', error);
    }
});

// Mostrar todos los vehículos al cargar la página
obtenerYRenderizarVehiculos();

