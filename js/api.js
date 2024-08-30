function fetchStore() {
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost:3703/api/demo/list-store'
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status === 200) {
            let dato = JSON.parse(this.responseText);
            displayProduct(dato);
            console.log(dato);
        } else {
            return ("Hay un pequeño errorsito!!!!");
        }
    }
    xhr.send()
}


function displayProduct(dato) {
    let storeProduct = document.getElementById("products")
}
function submitForm() {
    // Obtener los valores del formulario
    const codigo = document.getElementById('codigo').value;
    const nombre = document.getElementById('nombre').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const stock = parseInt(document.getElementById('stock').value);

    // Crear el objeto con los datos del producto
    const storeData = {
        codigo: codigo,
        nombre: nombre,
        precio: precio,
        stock: stock
    };

    // Enviar la solicitud POST
    fetch('http://localhost:3703/api/demo/createstore', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(storeData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Producto creado:', data);
        alert('Producto creado con éxito');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al crear el producto');
    });
}


fetchStore();