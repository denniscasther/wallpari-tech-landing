/* ===================================================================
   Wallpari.tech — Landing JS
   =================================================================== */

/* WhatsApp de Wallpari, en formato internacional sin "+" ni espacios
   (51 = Perú + 923696270). */
const WA_NUMBER = "51923696270";
const WA_MENSAJE = "Hola Wallpari 👋, quiero cotizar un proyecto.";
const EMAIL = "contacto@wallpari.pe";

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

/* ---- Formulario → abre el correo con los datos ---- */
(function initForm(){
  const form = document.getElementById("contactForm");
  if(!form) return;
  form.addEventListener("submit", function(e){
    e.preventDefault();
    const nombre   = (form.nombre.value || "").trim();
    const email    = (form.email.value || "").trim();
    const servicio = form.servicio.value;
    const mensaje  = (form.mensaje.value || "").trim();

    const asunto = "Nueva solicitud de " + (nombre || "cliente") + " — " + servicio;
    const cuerpo =
      "Nombre: " + nombre + "\n" +
      "Correo: " + email + "\n" +
      "Servicio de interés: " + servicio + "\n\n" +
      "Mensaje:\n" + mensaje + "\n";

    window.location.href =
      "mailto:" + EMAIL + "?subject=" + encodeURIComponent(asunto) + "&body=" + encodeURIComponent(cuerpo);
  });
})();

/* ---- Año en el footer ---- */
(function initYear(){
  const y = document.getElementById("year");
  if(y) y.textContent = new Date().getFullYear();
})();
