// Check if the URL does not include "spreadsheets"
if (!window.location.href.includes("spreadsheets")) {
  // Add an event listener for the "selectionchange" event
  document.addEventListener("selectionchange", function () {
    // Get the current selection
    var selection = window.getSelection();
    // Get the selected text
    var selectedText = selection.toString();

    // Check if there is selected text
    if (selectedText.length > 0) {
      // Create a popup with the selected text
      createCopyPopup(selection);
    } else {
      // If there is no selected text, remove the popup
      removeCopyPopup();
    }
  });

  // Function to create a popup for copying selected text
  function createCopyPopup(selection) {
    // Check if the popup already exists
    var popup = document.getElementById("copyPopup");
    if (!popup) {
      // If the popup does not exist, create it
      popup = document.createElement("div");
      popup.id = "copyPopup";
      popup.style.position = "absolute";
      popup.style.border = "1px solid #ccc";
      popup.style.background = "black";
      popup.style.padding = "5px";
      popup.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
      popup.style.zIndex = "10000000";
      popup.style.borderRadius = "5px"

      // Create a button inside the popup
      var copyButton = document.createElement("button");
      copyButton.textContent = "Copy";

      // Add a click event listener to the button
      copyButton.addEventListener("click", function () {
        // Copy the selected text to the clipboard
        copyTextToClipboard(selection.toString());
        // Remove the popup after copying
        removeCopyPopup();
      });

      var searchButton = document.createElement("button");
      searchButton.textContent = "Search";
      searchButton.addEventListener("click", function () {
        searchSelectedText(selection.toString());
        removeCopyPopup();
      });
      // Add styles to the buttons
      copyButton.style.cssText = getButtonStyles();
      searchButton.style.cssText = getButtonStyles(true);
      // Append the button to the popup
      popup.appendChild(copyButton);
      popup.appendChild(searchButton);

      // Append the popup to the document body
      document.body.appendChild(popup);
    }

    // Get the range of the selection
    var range = selection.getRangeAt(0);
    // Get the bounding rectangle of the range
    var rect = range.getBoundingClientRect();

    // Position the popup below the selected text
    popup.style.top = rect.bottom + window.scrollY + "px";
    popup.style.left = rect.right + window.scrollX + "px";
  }

  // Function to remove the copy popup
  function removeCopyPopup() {
    var popup = document.getElementById("copyPopup");
    if (popup) {
      // If the popup exists, remove it from the document body
      document.body.removeChild(popup);
    }
  }
  // Function to get button styles
  function getButtonStyles(isSearchButton) {
    return `
      background: white;
      color: black;
      padding: 8px;
      border: none;
      cursor: pointer;
      margin: 8px;
      border-radius: 4px;
      transition: background-color 0.3s ease;
      ${isSearchButton ? ":hover { text-decoration: underline; }" : ""}
    `;
  }

  function searchSelectedText(text) {
    var searchQuery = encodeURIComponent(text);
    var searchUrl = "https://www.google.com/search?q=" + searchQuery;

    // Open a new tab in the user's default browser
    window.open(searchUrl, "_blank");
  }

  // Function to copy text to the clipboard
  function copyTextToClipboard(text) {
    // Create a temporary textarea element
    var dummy = document.createElement("textarea");
    // Append the textarea to the document body
    document.body.appendChild(dummy);
    // Set the value of the textarea to the selected text
    dummy.value = text;
    // Select the text in the textarea
    dummy.select();
    // Execute the "copy" command to copy the text to the clipboard
    document.execCommand("copy");
    // Remove the temporary textarea from the document body
    document.body.removeChild(dummy);
  }
}
