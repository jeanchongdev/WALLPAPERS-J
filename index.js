document.addEventListener('click', function(event) {
    // Verificar que el clic se realice en un botón con la clase 'Btn'
    if (event.target.classList.contains('Btnn')) {
        const fileURL = event.target.getAttribute('data-file');  // Obtener la ruta del archivo desde el atributo 'data-file'

        fetch(fileURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                const url = URL.createObjectURL(blob);
                const enlace = document.createElement('a');
                enlace.href = url;
                enlace.download = fileURL.split('/').pop();  // Nombre del archivo a descargar
                document.body.appendChild(enlace);
                enlace.click();
                document.body.removeChild(enlace);
                URL.revokeObjectURL(url);
            })
            .catch(error => console.error('Error al descargar la imagen:', error));
    }
});