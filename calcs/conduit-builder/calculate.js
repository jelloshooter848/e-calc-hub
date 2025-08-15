// calculate.js

function calculateWeight() {
    let totalWeight = 0;
    let totalWireArea = 0;
    let totalConduitArea = 0;
    let hasFreeAir = false;
    let numConductors = 0;
    let setDetails = '';

    const listItems = document.getElementById('entryList').getElementsByTagName('li');
    for (let item of listItems) {
        const text = item.innerText;
        console.log('Processing item:', text); // Debugging log

        if (text.startsWith('Conduit:')) {
            const typeMatch = text.match(/Type - ([^,]+)/);
            const sizeMatch = text.match(/Size - ([^,]+)/);
            const lengthMatch = text.match(/Length - ([^ ]+)/);

            if (typeMatch && sizeMatch && lengthMatch) {
                const type = typeMatch[1];
                const size = sizeMatch[1];
                const length = parseFloat(lengthMatch[1]);
                setDetails += `Conduit: Type - ${type}, Size - ${size}, Length - ${length} ft\n`;

                if (type === "Free Air") {
                    hasFreeAir = true;
                } else {
                    const weightPerFootIndex = ["1/2", "3/4", "1", "1-1/4", "1-1/2", "2", "2-1/2", "3", "3-1/2", "4"].indexOf(size);
                    const weightPerFoot = conduitData[type][weightPerFootIndex];
                    const conduitArea = conduitSizeData[type][size];

                    if (weightPerFoot !== undefined && !isNaN(weightPerFoot)) {
                        totalWeight += weightPerFoot * length;
                        totalConduitArea += conduitArea;
                    } else {
                        console.log(`No weight data found for conduit type: ${type}, size: ${size}`); // Debugging log
                    }
                }
            } else {
                console.log('Conduit data match failed', typeMatch, sizeMatch, lengthMatch); // Debugging log
            }
        } else if (text.startsWith('Wire:') || text.startsWith('Wire (Non-CCC):') || text.startsWith('Wire (EGC):') || text.startsWith('Wire (GEC):') || text.startsWith('Wire (SBJ):')) {
            const typeMatch = text.match(/Type - ([^,]+)/);
            const sizeMatch = text.match(/Size - ([^,]+)/);
            const lengthMatch = text.match(/Length - ([^ ]+)/);
            const countMatch = text.match(/Count - ([^ ]+)/);

            if (typeMatch && sizeMatch && lengthMatch && countMatch) {
                const type = typeMatch[1];
                const size = sizeMatch[1];
                const length = parseFloat(lengthMatch[1]);
                const count = parseInt(countMatch[1]);
                const isNonCcc = text.includes('(Non-CCC)');
                const isEgc = text.includes('(EGC)');
                const isGec = text.includes('(GEC)');
                const isSbj = text.includes('(SBJ)');
                setDetails += `Wire${isNonCcc ? ' (Non-CCC)' : isEgc ? ' (EGC)' : isGec ? ' (GEC)' : isSbj ? ' (SBJ)' : ''}: Type - ${type}, Size - ${size}, Length - ${length} ft, Count - ${count}\n`;
                const wire = wireData.find(w => w.size === size);
                console.log('Wire data:', wire); // Debugging log

                if (wire) {
                    const weightPerFoot = type === 'THWN-2' ? wire.THWN2.weight / 1000 : wire.XHHW2.weight / 1000;
                    if (weightPerFoot !== undefined && !isNaN(weightPerFoot)) {
                        console.log(`Weight per foot: ${weightPerFoot}, Length: ${length}, Count: ${count}`); // Debugging log
                        totalWeight += weightPerFoot * length * count;

                        // Calculate total wire area
                        const wireArea = type === 'THWN-2' ? wire.THWN2.area : wire.XHHW2.area;
                        totalWireArea += wireArea * count;
                        numConductors += count; // Increment for CCC, non-CCC, EGC, GEC, and SBJ
                    } else {
                        console.log(`No weight data found for wire type: ${type}, size: ${size}`); // Debugging log
                    }
                } else {
                    console.log(`No data found for wire size: ${size}`); // Debugging log
                }
            } else {
                console.log('Wire data match failed', typeMatch, sizeMatch, lengthMatch, countMatch); // Debugging log
            }
        }
    }

    // Calculate fill percentage only if there is no Free Air
    if (!hasFreeAir && totalConduitArea > 0) {
        const fillPercentage = (totalWireArea / totalConduitArea) * 100;
        console.log(`Calculated fill percentage: ${fillPercentage}%`); // Debugging log
        document.getElementById('wireFill').innerText = `${fillPercentage.toFixed(2)}%`;

        // Determine allowable fill percentage based on number of conductors
        const allowableFillPercentage = getAllowableFillPercentage(numConductors);

        // Check if wire area exceeds allowable fill percentage
        if (fillPercentage > allowableFillPercentage) {
            alert(`Warning: The total wire area exceeds the allowable fill percentage of ${allowableFillPercentage}% (Actual: ${fillPercentage.toFixed(2)}%)`);
        }
    } else {
        document.getElementById('wireFill').innerText = 'N/A';
    }

    console.log(`Calculated total weight: ${totalWeight} lbs`); // Debugging log
    document.getElementById('totalWeight').innerText = `${totalWeight.toFixed(2)} lbs`;

    // Add the current set to the list of sets
    setCount++;
    const setList = document.getElementById('setsList');
    const setItem = document.createElement('li');
    setItem.id = `set-${setCount}`; // Unique ID for the set
    setItem.innerHTML = `Set ${setCount}:\n${setDetails}Weight - ${totalWeight.toFixed(2)} lbs, Conduit Fill - ${document.getElementById('wireFill').innerText} <br> <button onclick="checkAmpacity(${setCount})">Check Ampacity</button> <button onclick="checkEgc(${setCount})">Check EGC</button> <button onclick="checkGec(${setCount})">Check GEC</button> <button onclick="checkSbj(${setCount})">Check SBJ</button> <button onclick="editSet(${setCount})">Edit</button> <button onclick="removeSet(${setCount})">Remove</button>`;
    setList.appendChild(setItem);

    // Update the cumulative weight
    cumulativeWeight += totalWeight;
    console.log(`Updated cumulative weight: ${cumulativeWeight} lbs`); // Debugging log
    document.getElementById('cumulativeWeight').innerText = `${cumulativeWeight.toFixed(2)} lbs`;

    // Reset the current list but keep the sets list and cumulative weight
    resetCurrentList();
    updateEmptyEntries('entryList');
    updateEmptyEntries('setsList');
}

function editSet(setId) {
    const setItem = document.getElementById(`set-${setId}`);
    if (setItem) {
        const text = setItem.innerText;

        // Clear the current entry list
        resetCurrentList();

        // Extract conduit details and populate the form
        const conduitMatch = text.match(/Conduit: Type - ([^,]+), Size - ([^,]+), Length - ([^ ]+) ft/);
        if (conduitMatch) {
            const conduitType = conduitMatch[1];
            const conduitSize = conduitMatch[2];
            const conduitLength = conduitMatch[3];

            // Populate the form fields
            document.getElementById('conduitType1').value = conduitType;
            document.getElementById('conduitSize1').value = conduitSize;
            document.getElementById('conduitLength1').value = conduitLength;

            // Add the conduit back to the entry list
            const listItem = document.createElement('li');
            listItem.innerHTML = `Conduit: Type - ${conduitType}, Size - ${conduitSize}, Length - ${conduitLength} ft <button onclick="removeItem(this)">Remove</button>`;
            document.getElementById('entryList').appendChild(listItem);
        }

        // Extract wire details and populate the form
        const wireMatches = text.match(/Wire(?: \((Non-CCC|EGC|GEC|SBJ)\))?: Type - ([^,]+), Size - ([^,]+), Length - ([^ ]+) ft, Count - ([^ ]+)/g);
        if (wireMatches) {
            wireMatches.forEach(wireMatch => {
                const wireDetails = wireMatch.match(/Wire(?: \((Non-CCC|EGC|GEC|SBJ)\))?: Type - ([^,]+), Size - ([^,]+), Length - ([^ ]+) ft, Count - ([^ ]+)/);
                if (wireDetails) {
                    const wireCategory = wireDetails[1];
                    document.getElementById('wireType1').value = wireDetails[2];
                    document.getElementById('wireSize1').value = wireDetails[3];
                    document.getElementById('wireLength1').value = wireDetails[4];
                    document.getElementById('wireCount1').value = wireDetails[5];

                    switch (wireCategory) {
                        case 'Non-CCC':
                            addNonCccWire();
                            break;
                        case 'EGC':
                            addEgc();
                            break;
                        case 'GEC':
                            addGec();
                            break;
                        case 'SBJ':
                            addSbj();
                            break;
                        default:
                            addWire();
                    }
                }
            });
        }

        // Remove the set from the list
        removeSet(setId);
    }
}


function updateSetItem(setItem, setDetails, totalWeight) {
    setItem.innerHTML = `Set ${setItem.id.split('-')[1]}:\n${setDetails}Weight - ${totalWeight.toFixed(2)} lbs, Conduit Fill - ${document.getElementById('wireFill').innerText}  <button onclick="checkAmpacity(${setItem.id.split('-')[1]})">Check Ampacity</button> <button onclick="checkEgc(${setItem.id.split('-')[1]})">Check EGC</button> <button onclick="checkGec(${setItem.id.split('-')[1]})">Check GEC</button> <button onclick="checkSbj(${setItem.id.split('-')[1]})">Check SBJ</button> <button onclick="editSet(${setItem.id.split('-')[1]})">Edit</button> <button onclick="removeSet(${setItem.id.split('-')[1]})">Remove</button>`;
}
