let puntuacion: number = 0;

function muestraPuntuacion() {
  const elementoPuntuacion = document.getElementById(
    "puntuacion"
  ) as HTMLDivElement;
  elementoPuntuacion.textContent = puntuacion.toString();
}

function dameCarta(): number {
  const numero = Math.floor(Math.random() * 10) + 1; // 1 a 10
  return numero;
}

function mostrarCarta(carta: number): void {
  const elementoCarta = document.getElementById("carta") as HTMLImageElement;
  const rutaBase =
    "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/";
  let tipoCarta = "";

  switch (carta) {
    case 1:
      tipoCarta = "1_as-copas.jpg";
      break;
    case 2:
      tipoCarta = "2_dos-copas.jpg";
      break;
    case 3:
      tipoCarta = "3_tres-copas.jpg";
      break;
    case 4:
      tipoCarta = "4_cuatro-copas.jpg";
      break;
    case 5:
      tipoCarta = "5_cinco-copas.jpg";
      break;
    case 6:
      tipoCarta = "6_seis-copas.jpg";
      break;
    case 7:
      tipoCarta = "7_siete-copas.jpg";
      break;
    case 8:
      tipoCarta = "10_sota-copas.jpg";
      break;
    case 9:
      tipoCarta = "11_caballo-copas.jpg";
      break;
    case 10:
      tipoCarta = "12_rey-copas.jpg";
      break;
    default:
      tipoCarta = "back.jpg";
  }

  elementoCarta.src = rutaBase + tipoCarta;
}

function obtenerValorCarta(carta: number): number {
  return carta >= 8 ? 0.5 : carta;
}

document.addEventListener("DOMContentLoaded", () => {
  muestraPuntuacion();

  const botonDameCarta = document.getElementById(
    "dameCarta"
  ) as HTMLButtonElement;
  const botonPlantarse = document.getElementById(
    "plantarse"
  ) as HTMLButtonElement;
  const botonNuevaPartida = document.getElementById(
    "nuevaPartida"
  ) as HTMLButtonElement;
  const botonVerQueHabriaPasado = document.getElementById(
    "verQueHabriaPasado"
  ) as HTMLButtonElement;
  const mensajeDiv = document.getElementById("mensaje") as HTMLDivElement;

  botonDameCarta.addEventListener("click", () => {
    const nuevaCarta = dameCarta();
    mostrarCarta(nuevaCarta);

    const valor = obtenerValorCarta(nuevaCarta);
    puntuacion += valor;
    muestraPuntuacion();

    if (puntuacion > 7.5) {
      mensajeDiv.textContent = "Game Over 😵 te has pasado de 7.5 puntos";
      botonDameCarta.disabled = true;
      botonPlantarse.disabled = true;
    } else if (puntuacion === 7.5) {
      mensajeDiv.textContent = "¡Has ganado!🏆Exactamente 7.5 puntos";
      botonDameCarta.disabled = true;
      botonPlantarse.disabled = true;
    }
  });

  botonPlantarse.addEventListener("click", () => {
    if (puntuacion < 4) {
      mensajeDiv.textContent = "Pareces más prudente que un semáforo en rojo";
    } else if (puntuacion === 5) {
      mensajeDiv.textContent = "Has tirado de freno de mano a tiempo";
    } else if (puntuacion >= 6 && puntuacion < 7.5) {
      mensajeDiv.textContent = "Has estado más cerca que el WiFi del vecino";
    }
    botonDameCarta.disabled = true;
    botonPlantarse.disabled = true;
    botonVerQueHabriaPasado.style.display = "inline-block";
  });

  botonVerQueHabriaPasado.addEventListener("click", () => {
    let puntuacionHipotetica = puntuacion;
    let cartasExtra: number[] = [];

    while (puntuacionHipotetica <= 7.5) {
      const nuevaCarta = dameCarta();
      const valor = obtenerValorCarta(nuevaCarta);
      puntuacionHipotetica += valor;
      cartasExtra.push(nuevaCarta);

      if (puntuacionHipotetica >= 7.5) break;
    }

    let resultado = `Si hubieras seguido, habrías sacado: ${cartasExtra
      .map((c) => (c >= 8 ? "0.5" : c.toString()))
      .join(", ")}. Total hipotético: ${puntuacionHipotetica.toFixed(1)}`;

    if (puntuacionHipotetica === 7.5) {
      resultado += " — Lo habrías clavado!";
    } else if (puntuacionHipotetica > 7.5) {
      resultado += " — Te habrías pasado 😬";
    }

    mensajeDiv.textContent = resultado;
  });

  botonNuevaPartida.addEventListener("click", () => {
    puntuacion = 0;
    muestraPuntuacion();
    botonDameCarta.disabled = false;
    botonPlantarse.disabled = false;
    mensajeDiv.textContent = "";
    const elementoCarta = document.getElementById("carta") as HTMLImageElement;
    elementoCarta.src =
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
    botonVerQueHabriaPasado.style.display = "none";
  });
});
