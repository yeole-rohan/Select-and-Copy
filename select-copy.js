if (!window.location.href.includes("spreadsheets")) {
  document.onselectionchange = function () {
    document.execCommand("copy");
  };
}
