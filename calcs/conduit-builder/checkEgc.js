const egcData = [
    { breakerSize: 15, copper: "#14", aluminum: "#12" },
    { breakerSize: 20, copper: "#12", aluminum: "#10" },
    { breakerSize: 60, copper: "#10", aluminum: "#8" },
    { breakerSize: 100, copper: "#8", aluminum: "#6" },
    { breakerSize: 200, copper: "#6", aluminum: "#4" },
    { breakerSize: 300, copper: "#4", aluminum: "#2" },
    { breakerSize: 400, copper: "#3", aluminum: "#1" },
    { breakerSize: 500, copper: "#2", aluminum: "1/0" },
    { breakerSize: 600, copper: "#1", aluminum: "2/0" },
    { breakerSize: 800, copper: "1/0", aluminum: "3/0" },
    { breakerSize: 1000, copper: "2/0", aluminum: "4/0" },
    { breakerSize: 1200, copper: "3/0", aluminum: "250" },
    { breakerSize: 1600, copper: "4/0", aluminum: "300" },
    { breakerSize: 2000, copper: "250", aluminum: "350" },
    { breakerSize: 2500, copper: "350", aluminum: "400" },
    { breakerSize: 3000, copper: "400", aluminum: "500" },
    { breakerSize: 4000, copper: "500", aluminum: "600" },
    { breakerSize: 5000, copper: "600", aluminum: "750" },
    { breakerSize: 6000, copper: "750", aluminum: "900" }
];

function checkEgc(setId) {
    const setItem = document.getElementById(`set-${setId}`);
    if (setItem) {
        const breakerFuseSize = prompt("Enter the size of the largest breaker or fuse size (in Amps):");
        if (breakerFuseSize !== null && breakerFuseSize !== "") {
            const matchingData = getMatchingEgcData(parseInt(breakerFuseSize));
            if (matchingData) {
                const egcDetails = extractEgcDetails(setItem.innerText);
                console.log("Extracted EGC Details:", egcDetails);
                showEgcResults(egcDetails, breakerFuseSize, matchingData);
            } else {
                alert("No matching data found for the provided breaker/fuse size.");
            }
        } else {
            alert("Breaker/Fuse size is required to proceed.");
        }
    }
}

function getMatchingEgcData(breakerSize) {
    for (let i = 0; i < egcData.length; i++) {
        if (breakerSize <= egcData[i].breakerSize) {
            return egcData[i];
        }
    }
    return null;
}

function extractEgcDetails(text) {
    const detailsList = [];
    const wireMatches = text.match(/Wire \(EGC\): Type - (\w+-?\w*), Size - (\d+\/?\d*), Length - (\d+) ft, Count - (\d+)/g);
    if (wireMatches) {
        wireMatches.forEach(match => {
            const details = {};
            const matchDetails = match.match(/Wire \(EGC\): Type - (\w+-?\w*), Size - (\d+\/?\d*), Length - (\d+) ft, Count - (\d+)/);
            if (matchDetails) {
                details.wireType = matchDetails[1];
                details.wireSize = matchDetails[2];
                details.wireLength = parseInt(matchDetails[3]);
                details.wireCount = parseInt(matchDetails[4]);
                detailsList.push(details);
            }
        });
    }
    return detailsList;
}

function showEgcResults(detailsList, breakerFuseSize, matchingData) {
    if (detailsList.length > 0) {
        const results = detailsList.map(d => {
            const wireSize = d.wireSize;
            const requiredSize = matchingData.copper; // Assuming copper wire for this example
            const isSufficient = compareWireSizes(wireSize, requiredSize);
            console.log(`Comparing actual size ${wireSize} with required size ${requiredSize}: ${isSufficient ? "Sufficient" : "Insufficient"}`);
            const sizeComparison = isSufficient ? "Sufficient" : "Insufficient";
            return `${wireSize} ${d.wireType}: ${d.wireLength} ft, Count: ${d.wireCount} - Minimum required size: ${requiredSize} (${sizeComparison} size)`;
        }).join('\n');
        alert(`Breaker/Fuse Size: ${breakerFuseSize} A\n\nEGC Details:\n${results}`);
    } else {
        alert(`Breaker/Fuse Size: ${breakerFuseSize} A\n\nNo EGC wire added to the set.`);
    }
}

function compareWireSizes(actualSize, requiredSize) {
    const wireSizeOrder = [
        "18", "16", "14", "12", "10", "8", "6", "4", "3", "2", "1",
        "1/0", "2/0", "3/0", "4/0", "250", "300", "350", "400", "500",
        "600", "700", "750", "800", "900", "1000", "1250", "1500",
        "1750", "2000", "2500", "3000", "3500", "4000", "5000", "6000"
    ];

    // Normalize sizes to remove '#'
    const normalizedActualSize = actualSize.replace('#', '');
    const normalizedRequiredSize = requiredSize.replace('#', '');

    const actualIndex = wireSizeOrder.indexOf(normalizedActualSize);
    const requiredIndex = wireSizeOrder.indexOf(normalizedRequiredSize);

    console.log(`Actual Size: ${normalizedActualSize}, Required Size: ${normalizedRequiredSize}`);
    console.log(`Actual Size Index: ${actualIndex}, Required Size Index: ${requiredIndex}`);

    // Ensure the actual size is at least as large as the required size
    return actualIndex >= requiredIndex;
}



// Call the example function to see the results
exampleCheckEgc();
