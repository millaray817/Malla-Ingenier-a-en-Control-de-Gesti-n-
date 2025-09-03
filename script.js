// Seleccionar todos los ramos
const ramos = document.querySelectorAll(".ramo");

ramos.forEach(ramo => {
  ramo.addEventListener("click", () => {
    // Si está bloqueado, no se puede hacer nada
    if (ramo.classList.contains("bloqueado")) return;

    // Si está no aprobado → aprobar
    if (ramo.classList.contains("no-aprobado")) {
      ramo.classList.remove("no-aprobado");
      ramo.classList.add("aprobado");

      // Buscar ramos que dependan de este
      const desbloquear = document.querySelectorAll(`[data-prereq*='${ramo.id}']`);
      desbloquear.forEach(dep => {
        // Puede tener múltiples prerequisitos separados por coma
        const prereqs = dep.dataset.prereq.split(",");
        const todosAprobados = prereqs.every(pr => 
          document.getElementById(pr).classList.contains("aprobado")
        );
        if (todosAprobados) {
          dep.classList.remove("bloqueado");
          dep.classList.add("no-aprobado");
        }
      });

    // Si ya está aprobado → deshacer (volver a no aprobado)
    } else if (ramo.classList.contains("aprobado")) {
      ramo.classList.remove("aprobado");
      ramo.classList.add("no-aprobado");
    }
  });
});
