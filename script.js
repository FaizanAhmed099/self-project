
  const menuBtn = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const sidebarClose = document.getElementById("sidebarClose");

  // Toggle button click
  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    sidebar.classList.toggle("show");
  });

  // Close button inside sidebar
  sidebarClose.addEventListener("click", () => {
    sidebar.classList.remove("show");
    menuBtn.classList.remove("active");
  });

