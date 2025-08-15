const ampacityData = {
    "ampacity": {
        "14": {"60": 15, "75": 20, "90": 25},
        "12": {"60": 20, "75": 25, "90": 30},
        "10": {"60": 30, "75": 35, "90": 40},
        "8": {"60": 40, "75": 50, "90": 55},
        "6": {"60": 55, "75": 65, "90": 75},
        "4": {"60": 70, "75": 85, "90": 95},
        "3": {"60": 85, "75": 100, "90": 115},
        "2": {"60": 95, "75": 115, "90": 130},
        "1": {"60": 110, "75": 130, "90": 150},
        "1/0": {"60": 125, "75": 150, "90": 170},
        "2/0": {"60": 145, "75": 175, "90": 195},
        "3/0": {"60": 165, "75": 200, "90": 225},
        "4/0": {"60": 195, "75": 230, "90": 260},
        "250": {"60": 215, "75": 255, "90": 290}
    },
    "ccc_derating": {
        "1-3": 1.0,
        "4-6": 0.8,
        "7-9": 0.7,
        "10-20": 0.5,
        "21-30": 0.45,
        "31-40": 0.4,
        "41 and above": 0.35
    },
    "ambient_temp_derating": {
        "30 or less": {"60": 1.00, "75": 1.00, "90": 1.00},
        "31-35": {"60": 0.91, "75": 0.94, "90": 0.96},
        "36-40": {"60": 0.82, "75": 0.88, "90": 0.91},
        "41-45": {"60": 0.71, "75": 0.82, "90": 0.87},
        "46-50": {"60": 0.58, "75": 0.75, "90": 0.82},
        "51-55": {"60": 0.41, "75": 0.67, "90": 0.76},
        "56-60": {"60": 0.00, "75": 0.58, "90": 0.71},
        "61-65": {"60": 0.00, "75": 0.47, "90": 0.65},
        "66-70": {"60": 0.00, "75": 0.33, "90": 0.58},
        "71-75": {"60": 0.00, "75": 0.00, "90": 0.50},
        "76-80": {"60": 0.00, "75": 0.00, "90": 0.41},
        "81-85": {"60": 0.00, "75": 0.00, "90": 0.29},
        "86 and above": {"60": 0.00, "75": 0.00, "90": 0.00}
    }
};

const freeAirCopperData = {
    "18": {"60": null, "75": null, "90": 18},
    "16": {"60": null, "75": null, "90": 24},
    "14": {"60": 25, "75": 30, "90": 35},
    "12": {"60": 30, "75": 35, "90": 40},
    "10": {"60": 40, "75": 50, "90": 55},
    "8": {"60": 55, "75": 80, "90": 80},
    "6": {"60": 75, "75": 95, "90": 105},
    "4": {"60": 95, "75": 120, "90": 140},
    "3": {"60": 115, "75": 140, "90": 165},
    "2": {"60": 130, "75": 155, "90": 190},
    "1": {"60": 150, "75": 170, "90": 215},
    "1/0": {"60": 170, "75": 195, "90": 245},
    "2/0": {"60": 195, "75": 225, "90": 280},
    "3/0": {"60": 225, "75": 260, "90": 320},
    "4/0": {"60": 260, "75": 300, "90": 365},
    "250": {"60": 290, "75": 345, "90": 425}
};

function checkAmpacity(setId) {
    const setItem = document.getElementById(`set-${setId}`);
    if (setItem) {
        const conductorDetails = extractConductorDetails(setItem.innerText);
        console.log('Conductor Details:', conductorDetails);  // Debugging log
        showAmpacityResults(setId, conductorDetails);
    }
}

function extractConductorDetails(text) {
    const detailsList = [];
    const conduitMatch = text.match(/Conduit: Type - ([^,]+)/);
    let conduitType = null;
    if (conduitMatch) {
        conduitType = conduitMatch[1];
    } else {
        conduitType = "No Conduit";  // Explicitly handle the no conduit case
    }
    const wireMatches = text.match(/Wire: Type - (\w+-?\w*), Size - (\d+\/?\d*), Length - (\d+) ft, Count - (\d+)/g);
    console.log('Wire Matches:', wireMatches);  // Log the matches found
    if (wireMatches) {
        wireMatches.forEach(match => {
            const details = {};
            const matchDetails = match.match(/Wire: Type - (\w+-?\w*), Size - (\d+\/?\d*), Length - (\d+) ft, Count - (\d+)/);
            if (matchDetails) {
                details.wireType = matchDetails[1];
                details.wireSize = matchDetails[2];
                details.wireLength = parseInt(matchDetails[3]);
                details.wireCount = parseInt(matchDetails[4]);
                detailsList.push(details);
            } else {
                console.error('Failed to match wire details:', match);  // Log the error
            }
        });
    }
    console.log('Extracted Details:', { conduitType, detailsList });  // Debugging log
    return { conduitType, detailsList };
}

function getBaseAmpacity(wireSize, tempRating) {
    console.log('Getting Base Ampacity for Wire Size:', wireSize, 'Temp Rating:', tempRating);
    if (ampacityData.ampacity[wireSize] && ampacityData.ampacity[wireSize][tempRating]) {
        return ampacityData.ampacity[wireSize][tempRating];
    } else {
        console.error('Ampacity data not found for:', wireSize, tempRating);  // Logging error
        return undefined;
    }
}

function applyDerating(baseAmpacity, wireCount) {
    let deratingFactor = 1.0;
    console.log('Applying derating for wire count:', wireCount);
    for (let range in ampacityData.ccc_derating) {
        const [min, max] = range.includes('and above') ? [parseInt(range), Infinity] : range.split('-').map(Number);
        if ((max && wireCount >= min && wireCount <= max) || (!max && wireCount >= min)) {
            deratingFactor = ampacityData.ccc_derating[range];
            break;
        }
    }
    console.log('Derating factor applied:', deratingFactor);
    return baseAmpacity * deratingFactor;
}

function calculateAmpacities(detailsList, tempRating, conduitType) {
    console.log('Calculating ampacities with conduit type:', conduitType);
    const totalWireCount = detailsList.reduce((total, details) => total + details.wireCount, 0);
    const ampacities = detailsList.map(details => {
        let baseAmpacity;
        if (conduitType === "Free Air" || conduitType === "No Conduit") {
            baseAmpacity = freeAirCopperData[details.wireSize] ? freeAirCopperData[details.wireSize][tempRating] : undefined;
                } else {
            baseAmpacity = getBaseAmpacity(details.wireSize, tempRating);
        }

        if (baseAmpacity === undefined) {
            return { wireSize: details.wireSize, wireType: details.wireType, ampacity: 'N/A' };
        }

        let deratedAmpacity;
        if (conduitType === "Free Air" || conduitType === "No Conduit") {
            console.log(`No CCC derating applied for ${details.wireSize} ${details.wireType} in Free Air or No Conduit.`);
            deratedAmpacity = baseAmpacity;
        } else {
            deratedAmpacity = applyDerating(baseAmpacity, totalWireCount);
        }

        return { wireSize: details.wireSize, wireType: details.wireType, ampacity: deratedAmpacity };
    });
    console.log('Calculated Ampacities:', ampacities);  // Debugging log
    return ampacities;
}

function applyAmbientTemperatureDerating(ampacities, ambientTemperature, tempRating) {
    let deratingFactor = 1.0;
    for (let range in ampacityData.ambient_temp_derating) {
        let min, max;
        if (range.includes('or less')) {
            min = Number.NEGATIVE_INFINITY;
            max = parseInt(range);
        } else if (range.includes('and above')) {
            min = parseInt(range);
            max = Number.POSITIVE_INFINITY;
        } else {
            [min, max] = range.split('-').map(Number);
        }

        if (ambientTemperature >= min && ambientTemperature <= max) {
            deratingFactor = ampacityData.ambient_temp_derating[range][tempRating];
            console.log(`Derating factor found: ${deratingFactor} for range: ${range}`);
            break;
        }
    }

    return ampacities.map(a => {
        return {
            wireSize: a.wireSize,
            wireType: a.wireType,
            ampacity: (a.ampacity * deratingFactor).toFixed(2)
        };
    });
}

function showAmpacityResults(setId, conductorDetails) {
    const tempRating = prompt("Enter the temperature rating (60, 75, 90):");
    if (tempRating !== null && tempRating !== "" && (tempRating === "60" || tempRating === "75" || tempRating === "90")) {
        const { conduitType, detailsList } = conductorDetails;
        console.log('Conduit Type:', conduitType, 'Details List:', detailsList);  // Debugging log
        let ampacities = calculateAmpacities(detailsList, tempRating, conduitType);
        const ampacityDetails = ampacities.map(a => `${a.wireSize} ${a.wireType}: ${a.ampacity} A`).join('\n');

        const action = prompt(`Temperature Rating: ${tempRating}°C\n\nEnter ambient temperature. If unsure or not needed, leave blank.`);
        if (action === null) {
            return;
        } else if (action.toLowerCase() === "no") {
            alert("No additional derating needed.");
        } else if (!isNaN(action)) {
            const ambientTemperature = parseFloat(action);
            const deratedAmpacities = applyAmbientTemperatureDerating(ampacities, ambientTemperature, tempRating);
            const deratedAmpacityDetails = deratedAmpacities.map(a => `${a.wireSize} ${a.wireType}: ${a.ampacity} A`).join('\n');

            const confirmAction = confirm(`Ambient Temperature: ${ambientTemperature}°C\n\nDerated Ampacity Details:\n${deratedAmpacityDetails}\n\nClick 'OK' to add ampcity to the conduit info or 'Cancel' to close.`);
            if (confirmAction) {
                performCustomAction(setId, detailsList, deratedAmpacities);
            }
        } else {
            alert("Invalid input. Please try again.");
        }
    } else {
        alert("Valid temperature rating (60, 75, 90) is required to proceed.");
    }
}

function performCustomAction(setId, detailsList, deratedAmpacities) {
    const setItem = document.getElementById(`set-${setId}`);
    if (setItem) {
        const updatedContent = setItem.innerHTML.split('\n').map(line => {
            deratedAmpacities.forEach(da => {
                const regex = new RegExp(`Wire: Type - ${da.wireType}, Size - ${da.wireSize}`);
                if (regex.test(line)) {
                    line += ` Derated Ampacity: ${da.ampacity} A`;
                }
            });
            return line;
        }).join('\n');
        setItem.innerHTML = updatedContent;
    }
}

