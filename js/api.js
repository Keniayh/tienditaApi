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
    let productsContainer = document.getElementById("products");
    productsContainer.innerHTML = '';

    dato.forEach(product => {
        let productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
        <h2>${product.nombre}</h2>
        <p>Código: ${product.codigo}</p>
        <p>Precio: $${product.precio.toFixed(2)}</p>
        <p>Stock: ${product.stock}</p>
        <button onclick="deleteProduct('${product.codigo}')">Eliminar</button>
        `;
        productsContainer.appendChild(productElement);
    });
}

// Crear el nuevo producto...
function submitForm() {

    const codigo = document.getElementById('codigo').value;
    const nombre = document.getElementById('nombre').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const stock = parseInt(document.getElementById('stock').value);

    const storeData = {
        codigo: codigo,
        nombre: nombre,
        precio: precio,
        stock: stock
    };

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

// Funcion para eliminar un producto de la API

function deleteProduct(codigo) {
    let xhr = new XMLHttpRequest();
    let url = `http://localhost:3703/api/demo/deletestore/${codigo}`;
    xhr.open('DELETE', url, true);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status === 200) {
            let message = this.responseText;
            alert(message);
            fetchStore();
        } else if (this.readyState == 4) {
            console.error("Error al eliminar el producto");
            alert("Error al eliminar el producto");
        }
    }
    xhr.send();
}   

fetchStore();