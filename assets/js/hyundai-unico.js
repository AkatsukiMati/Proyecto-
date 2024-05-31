// Obtener el modelo del vehículo de la URL
const params = new URLSearchParams(window.location.search);
const hyundaiModelo = params.get('modelo');

// Función para obtener los detalles del vehículo por su modelo
const obtenerDetallesVehiculo = async (modelo) => {
  try {
    const response = await fetch('https://run.mocky.io/v3/f7d24dda-858a-433d-8585-3087f6292dc0');
    if (!response.ok) {
      throw new Error('La solicitud falló');
    }
    const vehiculos = await response.json();
    const vehiculo = vehiculos.find(vehiculo => vehiculo.modelo === modelo);
    if (!vehiculo) {
      throw new Error('Vehículo no encontrado');
    }
    console.log('Detalles del vehículo:', vehiculo); // Verificar los detalles del vehículo
    renderizarDetalleVehiculo(vehiculo);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Función para renderizar los detalles del vehículo
const renderizarDetalleVehiculo = (vehiculo) => {
  const vehiculoDetailContainer = document.getElementById("hyundaiDetailContainer");
  vehiculoDetailContainer.innerHTML = ""; // Limpiar el contenedor

  const vehiculoHTML = `
    <div class="card">
        <img src="${vehiculo.img}" class="card-img-top" alt="${vehiculo.modelo}">
        <div class="card-body">
            <h5 class="card-title">${vehiculo.modelo}</h5>
            <p class="card-text">Precio: ${vehiculo.precio}</p>
            <p class="card-text">Año: ${vehiculo.generacion}</p>
            <p class="card-text">Descripción: ${vehiculo.descrip}</p>
            <a href="javascript:history.back()" class="btn btn-primary">Volver</a>
        </div>
    </div>
  `;

  // Insertar el HTML en el contenedor
  vehiculoDetailContainer.innerHTML = vehiculoHTML;
};

// Cargar los detalles del vehículo al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  obtenerDetallesVehiculo(hyundaiModelo);
});




