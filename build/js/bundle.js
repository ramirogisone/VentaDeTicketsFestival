
document.addEventListener('DOMContentLoaded', function() {
    crearGaleria();
});

function crearGaleria() {
    const galeria = document.querySelector('.imagenes-contenedor');

    for(let i = 1; i <= 12; i++) {
        const imagen = document.createElement('IMG');
        imagen.src = `build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId = i;
        imagen.onclick = agrandarImagen;

        const lista = document.createElement('LI');
        lista.appendChild(imagen);
        galeria.appendChild(lista)
    }

}

function agrandarImagen (ev) {
    const id = (ev.target.dataset.imagenId);
    const imagen = document.createElement('IMG');
    imagen.src = `build/img/grande/${id}.webp`;

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');

    cerrarImagen.onclick = function() {
        overlay.remove();
    }
    overlay.onclick = function() {
        overlay.remove();
    }

    overlay.appendChild(cerrarImagen);
    
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}