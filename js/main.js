/* ===================================================================
   Wallpari.tech — Landing JS
   =================================================================== */

/* WhatsApp de Wallpari, en formato internacional sin "+" ni espacios
   (51 = Perú + 923696270). */
const WA_NUMBER = "51923696270";
const WA_MENSAJE = "Hola Wallpari 👋, quiero cotizar un proyecto.";
const EMAIL = "contacto@wallpari.pe";

/* ID del formulario en Formspree — es la última parte de la URL que te da
   Formspree: https://formspree.io/f/XXXXXXXX  →  copia sólo el XXXXXXXX.
   Mientras diga TU_ID_FORMSPREE, el formulario sigue funcionando por correo. */
const FORMSPREE_ID = "TU_ID_FORMSPREE";

/* ---- Enlaces de WhatsApp ---- */
(function initWhatsApp(){
  const url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(WA_MENSAJE);
  document.querySelectorAll("[data-wa], [data-wa-plain]").forEach(function(el){
    el.setAttribute("href", url);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });
})();

/* ---- Menú móvil ---- */
(function initNav(){
  const toggle = document.getElementById("navToggle");
  const links  = document.getElementById("navLinks");
  if(!toggle || !links) return;
  toggle.addEventListener("click", function(){
    const open = links.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  // cerrar al hacer clic en un enlace
  links.querySelectorAll("a").forEach(function(a){
    a.addEventListener("click", function(){
      links.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
})();

/* ---- Reveal al hacer scroll ---- */
(function initReveal(){
  const items = document.querySelectorAll(".reveal");
  if(!("IntersectionObserver" in window)){
    items.forEach(function(el){ el.classList.add("is-visible"); });
    return;
  }
  const io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add("is-visible"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(function(el){ io.observe(el); });
})();

/* ---- Formulario → Formspree (sin servidor propio) ----
   Si FORMSPREE_ID no está configurado, o si el envío falla, cae de vuelta
   al método anterior: abrir el correo del visitante con los datos. */
(function initForm(){
  const form = document.getElementById("contactForm");
  if(!form) return;
  const boton     = document.getElementById("formSubmit");
  const estado    = document.getElementById("formStatus");
  const etiqueta  = boton ? boton.textContent : "";

  function avisar(texto, ok){
    if(!estado) return;
    estado.textContent = texto;
    estado.className = "form-status " + (ok ? "form-status--ok" : "form-status--err");
    estado.hidden = false;
  }

  function datosDelForm(){
    const nombre   = (form.nombre.value || "").trim();
    const servicio = form.servicio.value;
    return {
      nombre: nombre,
      servicio: servicio,
      asunto: "Nueva solicitud de " + (nombre || "cliente") + " — " + servicio,
      cuerpo:
        "Nombre: " + nombre + "\n" +
        "Correo: " + (form.email.value || "").trim() + "\n" +
        "Servicio de interés: " + servicio + "\n\n" +
        "Mensaje:\n" + (form.mensaje.value || "").trim() + "\n"
    };
  }

  function abrirCorreo(d){
    window.location.href =
      "mailto:" + EMAIL + "?subject=" + encodeURIComponent(d.asunto) + "&body=" + encodeURIComponent(d.cuerpo);
  }

  form.addEventListener("submit", function(e){
    e.preventDefault();
    const d = datosDelForm();

    // Sin ID configurado todavía → respaldo por correo
    if(!FORMSPREE_ID || FORMSPREE_ID === "TU_ID_FORMSPREE"){ abrirCorreo(d); return; }

    const datos = new FormData(form);
    datos.append("_subject", d.asunto);

    if(boton){ boton.disabled = true; boton.textContent = "Enviando…"; }
    avisar("Enviando tu solicitud…", true);

    fetch("https://formspree.io/f/" + FORMSPREE_ID, {
      method: "POST",
      body: datos,
      headers: { "Accept": "application/json" }
    })
    .then(function(r){
      if(r.ok){
        form.reset();
        avisar("¡Gracias" + (d.nombre ? ", " + d.nombre : "") + "! Recibimos tu solicitud y te respondemos muy pronto.", true);
        return;
      }
      return r.json().catch(function(){ return {}; }).then(function(j){
        const detalle = (j.errors || []).map(function(x){ return x.message; }).join(", ");
        throw new Error(detalle || "respuesta " + r.status);
      });
    })
    .catch(function(err){
      avisar("No pudimos enviar el formulario (" + err.message + "). Abrimos tu correo como alternativa…", false);
      setTimeout(function(){ abrirCorreo(d); }, 1800);
    })
    .then(function(){
      if(boton){ boton.disabled = false; boton.textContent = etiqueta; }
    });
  });
})();

/* ---- Año en el footer ---- */
(function initYear(){
  const y = document.getElementById("year");
  if(y) y.textContent = new Date().getFullYear();
})();
