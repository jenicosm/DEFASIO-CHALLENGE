// Mapeo de encriptación y desencriptación
const encriptarMapa = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
};

const desencriptarMapa = Object.fromEntries(
    Object.entries(encriptarMapa).map(([key, value]) => [value, key])
);

function encriptarTexto(texto) {
    return texto.split('').map(char => encriptarMapa[char] || char).join('');
}

function desencriptarTexto(texto) {
    let textoDesencriptado = texto;
    for (const [encriptado, original] of Object.entries(desencriptarMapa)) {
        const regex = new RegExp(encriptado, 'g');
        textoDesencriptado = textoDesencriptado.replace(regex, original);
    }
    return textoDesencriptado;
}

function mostrarResultado(texto) {
    const espacioResultado = document.querySelector('.espacio_resultado');
    const resultadoTexto = document.getElementById('resultado-texto');
    const botonCopiar = document.getElementById('boton-copiar');

    resultadoTexto.textContent = texto;
    botonCopiar.style.display = 'block';

    // Asegúrate de que el texto se muestra en el div resultado
    espacioResultado.innerHTML = '';  // Limpiar contenido previo
    espacioResultado.appendChild(resultadoTexto);
    espacioResultado.appendChild(botonCopiar);
}

function encriptar() {
    const textarea = document.getElementById('campo_texto');
    const textoEncriptado = encriptarTexto(textarea.value);
    mostrarResultado(textoEncriptado);
}

function desencriptar() {
    const textarea = document.getElementById('campo_texto');
    const textoDesencriptado = desencriptarTexto(textarea.value);
    mostrarResultado(textoDesencriptado);
}

function copiarTexto() {
    const resultadoTexto = document.getElementById('resultado-texto');
    const botonCopiar = document.getElementById('boton-copiar');
    
    navigator.clipboard.writeText(resultadoTexto.textContent).then(() => {
        // Cambiar el texto del botón para mostrar que se copió
        botonCopiar.textContent = '¡Copiado!';
        
        // Restaurar el texto del botón después de 2 segundos
        setTimeout(() => {
            botonCopiar.textContent = 'Copiar';
        }, 2000); // Tiempo que el mensaje permanece visible
    });
}

document.querySelector('.boton-encriptar').addEventListener('click', encriptar);
document.querySelector('.boton-desencriptar').addEventListener('click', desencriptar);
document.getElementById('boton-copiar').addEventListener('click', copiarTexto);
