document.addEventListener("DOMContentLoaded", () => {
  const teclado = document.getElementById("teclado");
  const teclas = Array.from(teclado.getElementsByClassName("tecla")).filter(
    (tecla) => tecla.value !== "Borrar"
  );
  const borrarBtn = teclado.querySelector(".borrar");
  const claveInput = document.getElementById("clave");

  // Organizar los números de manera aleatoria
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledTeclas = shuffle(teclas);
  shuffledTeclas.forEach((tecla) => teclado.insertBefore(tecla, borrarBtn));

  // Convertir números en asteriscos al hacer hover
  teclas.forEach((tecla) => {
    tecla.addEventListener("mouseenter", () => {
      teclas.forEach((t) => {
        if (t.value !== "Borrar") {
          t.setAttribute("data-original-value", t.value);
          t.value = "*";
        }
      });
    });

    tecla.addEventListener("mouseleave", () => {
      teclas.forEach((t) => {
        if (t.value !== "Borrar") {
          t.value = t.getAttribute("data-original-value");
        }
      });
    });

    // Ingresar números en la caja de clave
    tecla.addEventListener("click", () => {
      claveInput.value += tecla.getAttribute("data-original-value");
    });
  });

  // Borrar el último número ingresado
  borrarBtn.addEventListener("click", () => {
    claveInput.value = claveInput.value.slice(0, -1);
  });

  // Cambiar el contraste de las teclas
  document.getElementById("oscuro").addEventListener("click", () => {
    teclas.forEach((tecla) => (tecla.style.background = "black"));
  });

  document.getElementById("medio").addEventListener("click", () => {
    teclas.forEach((tecla) => (tecla.style.background = "#555"));
  });

  document.getElementById("claro").addEventListener("click", () => {
    teclas.forEach((tecla) => (tecla.style.background = "lightgrey"));
  });
});
