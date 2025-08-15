// resetEntries.js

function resetList() {
    console.log('Reset button clicked'); // Debugging log
    document.getElementById('entryList').innerHTML = '';
    document.getElementById('setsList').innerHTML = ''; // Reset the sets list
    cumulativeWeight = 0; // Reset cumulative weight
    document.getElementById('cumulativeWeight').innerText = '0 lbs';
    document.getElementById('totalWeight').innerText = '0 lbs';
    document.getElementById('wireFill').innerText = '0%';

    // Reset dropdowns and input fields to default values
    document.getElementById('conduitType1').selectedIndex = 0;
    document.getElementById('conduitSize1').selectedIndex = 0;
    document.getElementById('conduitLength1').value = '10';
    document.getElementById('wireType1').selectedIndex = 0;
    document.getElementById('wireSize1').selectedIndex = 0;
    document.getElementById('wireLength1').value = '10';
    document.getElementById('wireCount1').value = '1';
    document.getElementById('freeAir').checked = false;
    toggleFreeAir();

    // Repopulate the dropdowns
    populateConduitSizes(document.getElementById('conduitSize1'), 'Western Tube EMT');
    populateWireSizes(document.getElementById('wireSize1'));

    updateEmptyEntries('entryList');
    updateEmptyEntries('setsList');
}

function resetCurrentList() {
    console.log('Resetting current list'); // Debugging log
    document.getElementById('entryList').innerHTML = '';
    document.getElementById('totalWeight').innerText = '0 lbs';
    document.getElementById('wireFill').innerText = '0%';

    // Reset dropdowns and input fields to default values
    document.getElementById('conduitType1').selectedIndex = 0;
    document.getElementById('conduitSize1').selectedIndex = 0;
    document.getElementById('conduitLength1').value = '10';
    document.getElementById('wireType1').selectedIndex = 0;
    document.getElementById('wireSize1').selectedIndex = 0;
    document.getElementById('wireLength1').value = '10';
    document.getElementById('wireCount1').value = '1';
    document.getElementById('freeAir').checked = false;
    toggleFreeAir();

    // Repopulate the dropdowns
    populateConduitSizes(document.getElementById('conduitSize1'), 'Western Tube EMT');
    populateWireSizes(document.getElementById('wireSize1'));

    updateEmptyEntries('entryList');
    updateEmptyEntries('setsList');
}
