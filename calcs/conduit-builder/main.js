// main.js

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('Page loaded'); // Debugging log
    const conduitTypeSelect = document.getElementById('conduitType1');
    conduitTypeSelect.addEventListener('change', () => {
        console.log(`Conduit type changed to: ${conduitTypeSelect.value}`); // Debugging log
        populateConduitSizes(document.getElementById('conduitSize1'), conduitTypeSelect.value);
    });

    // Initial population
    console.log('Initial population of conduit sizes'); // Debugging log
    populateConduitSizes(document.getElementById('conduitSize1'), conduitTypeSelect.value);
    populateWireSizes(document.getElementById('wireSize1'));

    document.getElementById('freeAir').addEventListener('change', toggleFreeAir);
    document.getElementById('addConduitBtn').addEventListener('click', addConduit);
    document.getElementById('addWireBtn').addEventListener('click', addWire);
    document.getElementById('addNonCccWireBtn').addEventListener('click', addNonCccWire);
    document.getElementById('addEgcWireBtn').addEventListener('click', addEgc);
    document.getElementById('addGecWireBtn').addEventListener('click', addGec);
    document.getElementById('addGroundedConductorWireBtn').addEventListener('click', addSbj); // Updated line
    document.getElementById('resetButton').addEventListener('click', resetList);
    document.getElementById('calculateBtn').addEventListener('click', calculateWeight);

    // Add this line to include editSet function globally
    window.editSet = editSet;

    // Add the export button event listener
    if (window.jspdf) {
        document.getElementById('exportButton').addEventListener('click', exportConduits);
    } else {
        console.error('jsPDF library is not loaded');
    }

    updateEmptyEntries('entryList');
    updateEmptyEntries('setsList');
});

// Function to export conduits to PDF
async function exportConduits() {
    const { jsPDF } = window.jspdf;

    if (!jsPDF) {
        console.error('jsPDF is not defined');
        return;
    }

    const doc = new jsPDF();

    // Add a title
    doc.setFontSize(18);
    doc.text('Conduit and Wire Set Data', 10, 10);

    // Get data from setsList
    const setsList = document.getElementById('setsList');
    const sets = setsList.getElementsByTagName('li');

    let yOffset = 20; // Initial Y offset for the content
    for (let i = 0; i < sets.length; i++) {
        let setText = sets[i].innerText;

        // Remove action button texts
        setText = setText.replace(/Check Ampacity\s*Check EGC\s*Check GEC\s*Check SBJ\s*Edit\s*Remove/g, '');

        // Split set text into lines and wrap text within the page width
        const lines = doc.splitTextToSize(setText, 180); // 180 to allow margins on both sides
        for (const line of lines) {
            doc.text(line, 10, yOffset);
            yOffset += 10; // Move down for the next line
            if (yOffset > 280) { // Check if the page is near the bottom
                doc.addPage();
                yOffset = 20; // Reset Y offset for new page
            }
        }
        yOffset += 10; // Add extra space between sets
    }

    // Save the PDF
    doc.save('conduits.pdf');
}

document.getElementById('exportButton').addEventListener('click', exportConduits);
