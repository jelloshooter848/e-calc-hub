// addEntries.js

function addConduit() {
    const isFreeAir = document.getElementById('freeAir').checked;
    const conduitType = document.getElementById('conduitType1').value;
    const conduitSize = document.getElementById('conduitSize1').value;
    const conduitLength = document.getElementById('conduitLength1').value;

    if (isFreeAir || (conduitType && conduitSize && conduitLength)) {
        const listItem = document.createElement('li');
        if (isFreeAir) {
            listItem.innerHTML = `Conduit: Type - Free Air <button onclick="removeItem(this)">Remove</button>`;
        } else {
            listItem.innerHTML = `Conduit: Type - ${conduitType}, Size - ${conduitSize}, Length - ${conduitLength} ft <button onclick="removeItem(this)">Remove</button>`;
        }
        document.getElementById('entryList').appendChild(listItem);

        // Reset input fields
        document.getElementById('conduitType1').selectedIndex = 0;
        document.getElementById('conduitSize1').selectedIndex = 0;
        document.getElementById('conduitLength1').value = '10';
        document.getElementById('freeAir').checked = false;
        toggleFreeAir();

        // Update total weight and wire fill
        updateTotalWeightAndWireFill();
        updateEmptyEntries('entryList');
        updateEmptyEntries('setsList');
    } else {
        alert('Please fill out all fields for the conduit.');
    }
}

function addWire() {
    const wireType = document.getElementById('wireType1').value;
    const wireSize = document.getElementById('wireSize1').value;
    const wireLength = document.getElementById('wireLength1').value;
    const wireCount = document.getElementById('wireCount1').value;

    if (wireType && wireSize && wireLength && wireCount) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `Wire: Type - ${wireType}, Size - ${wireSize}, Length - ${wireLength} ft, Count - ${wireCount} <button onclick="removeItem(this)">Remove</button>`;
        document.getElementById('entryList').appendChild(listItem);

        // Reset input fields
        document.getElementById('wireType1').selectedIndex = 0;
        document.getElementById('wireSize1').selectedIndex = 0;
        document.getElementById('wireLength1').value = '10';
        document.getElementById('wireCount1').value = '1';

        // Update total weight and wire fill
        updateTotalWeightAndWireFill();
        updateEmptyEntries('entryList');
        updateEmptyEntries('setsList');
    } else {
        alert('Please fill out all fields for the wire.');
    }
}

function addNonCccWire() {
    const wireType = document.getElementById('wireType1').value;
    const wireSize = document.getElementById('wireSize1').value;
    const wireLength = document.getElementById('wireLength1').value;
    const wireCount = document.getElementById('wireCount1').value;

    if (wireType && wireSize && wireLength && wireCount) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `Wire (Non-CCC): Type - ${wireType}, Size - ${wireSize}, Length - ${wireLength} ft, Count - ${wireCount} <button onclick="removeItem(this)">Remove</button>`;
        document.getElementById('entryList').appendChild(listItem);

        // Reset input fields
        document.getElementById('wireType1').selectedIndex = 0;
        document.getElementById('wireSize1').selectedIndex = 0;
        document.getElementById('wireLength1').value = '10';
        document.getElementById('wireCount1').value = '1';

        // Update total weight and wire fill
        updateTotalWeightAndWireFill();
        updateEmptyEntries('entryList');
        updateEmptyEntries('setsList');
    } else {
        alert('Please fill out all fields for the wire.');
    }
}

function addEgc() {
    const wireType = document.getElementById('wireType1').value;
    const wireSize = document.getElementById('wireSize1').value;
    const wireLength = document.getElementById('wireLength1').value;
    const wireCount = document.getElementById('wireCount1').value;

    if (wireType && wireSize && wireLength && wireCount) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `Wire (EGC): Type - ${wireType}, Size - ${wireSize}, Length - ${wireLength} ft, Count - ${wireCount} <button onclick="removeItem(this)">Remove</button>`;
        document.getElementById('entryList').appendChild(listItem);

        // Reset input fields
        document.getElementById('wireType1').selectedIndex = 0;
        document.getElementById('wireSize1').selectedIndex = 0;
        document.getElementById('wireLength1').value = '10';
        document.getElementById('wireCount1').value = '1';

        // Update total weight and wire fill
        updateTotalWeightAndWireFill();
        updateEmptyEntries('entryList');
        updateEmptyEntries('setsList');
    } else {
        alert('Please fill out all fields for the wire.');
    }
}

function addGec() {
    const wireType = document.getElementById('wireType1').value;
    const wireSize = document.getElementById('wireSize1').value;
    const wireLength = document.getElementById('wireLength1').value;
    const wireCount = document.getElementById('wireCount1').value;

    if (wireType && wireSize && wireLength && wireCount) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `Wire (GEC): Type - ${wireType}, Size - ${wireSize}, Length - ${wireLength} ft, Count - ${wireCount} <button onclick="removeItem(this)">Remove</button>`;
        document.getElementById('entryList').appendChild(listItem);

        // Reset input fields
        document.getElementById('wireType1').selectedIndex = 0;
        document.getElementById('wireSize1').selectedIndex = 0;
        document.getElementById('wireLength1').value = '10';
        document.getElementById('wireCount1').value = '1';

        // Update total weight and wire fill
        updateTotalWeightAndWireFill();
        updateEmptyEntries('entryList');
        updateEmptyEntries('setsList');
    } else {
        alert('Please fill out all fields for the wire.');
    }
}

function addSbj() {
    const wireType = document.getElementById('wireType1').value;
    const wireSize = document.getElementById('wireSize1').value;
    const wireLength = document.getElementById('wireLength1').value;
    const wireCount = document.getElementById('wireCount1').value;

    if (wireType && wireSize && wireLength && wireCount) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `Wire (SBJ): Type - ${wireType}, Size - ${wireSize}, Length - ${wireLength} ft, Count - ${wireCount} <button onclick="removeItem(this)">Remove</button>`;
        document.getElementById('entryList').appendChild(listItem);

        // Reset input fields
        document.getElementById('wireType1').selectedIndex = 0;
        document.getElementById('wireSize1').selectedIndex = 0;
        document.getElementById('wireLength1').value = '10';
        document.getElementById('wireCount1').value = '1';

        // Update total weight and wire fill
        updateTotalWeightAndWireFill();
        updateEmptyEntries('entryList');
        updateEmptyEntries('setsList');
    } else {
        alert('Please fill out all fields for the wire.');
    }
}

function removeItem(button) {
    const listItem = button.parentElement;
    listItem.parentElement.removeChild(listItem);
    updateTotalWeightAndWireFill();
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
