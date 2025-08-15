// updateCalculations.js

function updateTotalWeightAndWireFill() {
    let totalWeight = 0;
    let totalWireArea = 0;
    let totalConduitArea = 0;
    let numConductors = 0;
    let hasFreeAir = false;

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
    } else {
        document.getElementById('wireFill').innerText = 'N/A';
    }

    console.log(`Calculated total weight: ${totalWeight} lbs`); // Debugging log
    document.getElementById('totalWeight').innerText = `${totalWeight.toFixed(2)} lbs`;
}
