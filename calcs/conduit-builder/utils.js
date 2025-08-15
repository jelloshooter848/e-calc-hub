// utils.js

function getAllowableFillPercentage(numConductors) {
    if (numConductors === 1) {
        return 53;
    } else if (numConductors === 2) {
        return 31;
    } else {
        return 40;
    }
}

function populateConduitSizes(selectElement, conduitType) {
    console.log(`Populating conduit sizes for type: ${conduitType}`); // Debugging log
    selectElement.innerHTML = ''; // Clear existing options
    const sizes = conduitSizeData[conduitType];
    if (sizes) {
        // Define the desired order
        const sizeOrder = ["1/2", "3/4", "1", "1-1/4", "1-1/2", "2", "2-1/2", "3", "3-1/2", "4", "5", "6"];
        
        sizeOrder.forEach(size => {
            if (sizes[size] !== undefined) {
                const option = document.createElement('option');
                option.value = size;
                option.text = size;
                selectElement.appendChild(option);
                console.log(`Added option: ${size}`); // Debugging log
            }
        });
        console.log('Conduit sizes populated for', conduitType); // Debugging log
    } else {
        console.log('No sizes found for conduit type:', conduitType); // Debugging log
    }
}

function populateWireSizes(selectElement) {
    console.log('Populating wire sizes'); // Debugging log
    selectElement.innerHTML = ''; // Clear existing options

    wireData.forEach(wire => {
        // Condition: ignore wire sizes that have a weight or area of 0 for both THWN-2 and XHHW-2 types
        if (wire.THWN2.weight !== 0 && wire.XHHW2.weight !== 0 && wire.THWN2.area !== 0 && wire.XHHW2.area !== 0) {
            const option = document.createElement('option');
            option.value = wire.size;
            option.text = wire.size;
            selectElement.appendChild(option);
            console.log(`Added wire size option: ${wire.size}`); // Debugging log
        } else {
            console.log(`Ignored wire size option: ${wire.size}`); // Debugging log
        }
    });

    console.log('Wire sizes populated'); // Debugging log
}

function toggleFreeAir() {
    const isFreeAir = document.getElementById('freeAir').checked;
    const conduitTypeField = document.getElementById('conduitType1').parentElement;
    const conduitSizeField = document.getElementById('conduitSize1').parentElement;
    const conduitLengthField = document.getElementById('conduitLength1').parentElement;

    if (isFreeAir) {
        conduitTypeField.style.display = "none";
        conduitSizeField.style.display = "none";
        conduitLengthField.style.display = "none";
    } else {
        conduitTypeField.style.display = "block";
        conduitSizeField.style.display = "block";
        conduitLengthField.style.display = "block";
    }
}

function updateEmptyEntries(listId) {
    const list = document.getElementById(listId);
    if (list.children.length === 0) {
        const emptyItem = document.createElement('li');
        emptyItem.classList.add('empty-item');
        emptyItem.innerText = 'Empty';
        list.appendChild(emptyItem);
    } else {
        const emptyItems = list.getElementsByClassName('empty-item');
        while (emptyItems.length > 0) {
            emptyItems[0].parentNode.removeChild(emptyItems[0]);
        }
    }
}
