const idConsejo = document.getElementById("id-consejo");
const textoConsejo = document.getElementById("texto-consejo");
const botonConsejo = document.getElementById("boton-consejo");

async function cargarConsejo() {
  botonConsejo.disabled = true;
  textoConsejo.textContent = "Loading Advice...";

  try {
    const respuesta = await fetch("https://api.adviceslip.com/advice", {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!respuesta.ok) {
      throw new Error("Failed to fetch advice.");
    }

    const datos = await respuesta.json();
    const { id: numeroConsejo, advice: contenidoConsejo } = datos.slip;

    idConsejo.textContent = `ADVICE #${numeroConsejo}`;
    textoConsejo.textContent = contenidoConsejo;
  } catch (error) {
    idConsejo.textContent = "ADVICE #---";
    textoConsejo.textContent = "Unable to load advice.";
  } finally {
    botonConsejo.disabled = false;
  }
}

botonConsejo.addEventListener("click", cargarConsejo);
cargarConsejo();
