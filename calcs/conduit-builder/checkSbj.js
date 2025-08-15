// checkSbj.js

// Import the data for SBJ from the "250.102(C)" table
const sbjTable = {
    "14": "8",
    "12": "8",
    "10": "8",
    "8": "8",
    "6": "8",
    "4": "8",
    "3": "8",
    "2": "8",
    "1": "6",
    "1/0": "6",
    "2/0": "4",
    "3/0": "4",
    "4/0": "2",
    "250": "2",
    "350": "2",
    "500": "1/0",
    "600": "1/0",
    "750": "2/0",
    "1000": "2/0",
    "1100": "2/0",
    "1250": "3/0",
    "1500": "3/0",
    "1750": "3/0",
    "2000": "4/0",
    "2500": "250",
    "3000": "350",
    "3500": "400",
    "4000": "400",
    "5000": "500",
    "6000": "600"
};

function checkSbj(setId) {
    const setItem = document.getElementById(`set-${setId}`);
    if (setItem) {
        const sbjDetails = extractSbjDetails(setItem.innerText);
        const largestCCCSize = findLargestCCC(sbjDetails);

        if (largestCCCSize) {
            const requiredSbjSize = sbjTable[largestCCCSize];
            if (requiredSbjSize) {
                showSbjResults(sbjDetails, largestCCCSize, requiredSbjSize);
            } else {
                alert("No matching SBJ size found for the largest CCC conductor.");
            }
        } else {
            promptForCCCForSbj(setId);
        }
    }
}

function promptForCCCForSbj(setId) {
    const cccSize = prompt("No CCC conductor found. Please enter the size of the CCC conductor (e.g., 14, 12, 10, 8, etc.):");
    if (cccSize) {
        if (sbjTable.hasOwnProperty(cccSize)) {
            const requiredSbjSize = sbjTable[cccSize];
            const setItem = document.getElementById(`set-${setId}`);
            if (setItem) {
                const sbjDetails = extractSbjDetails(setItem.innerText);
                showSbjResults(sbjDetails, cccSize, requiredSbjSize);
            }
        } else {
            alert("Invalid CCC size entered. Please try again.");
        }
    } else {
        alert("No CCC size entered. Unable to check SBJ requirements.");
    }
}

function findLargestCCC(detailsList) {
    let largestSize = null;
    detailsList.forEach(detail => {
        if (!["Non-CCC", "EGC", "GEC", "SBJ"].includes(detail.type)) {
            if (!largestSize || compareSizes(detail.size, largestSize) > 0) {
                largestSize = detail.size;
            }
        }
    });
    return largestSize;
}

function compareSizes(size1, size2) {
    const sizeOrder = ["14", "12", "10", "8", "6", "4", "3", "2", "1", "1/0", "2/0", "3/0", "4/0", "250", "350", "500", "750", "1000", "1100", "1250", "1500", "1750", "2000", "2500", "3000", "3500", "4000"];
    return sizeOrder.indexOf(size1) - sizeOrder.indexOf(size2);
}

function extractSbjDetails(text) {
    const detailsList = [];
    const wireMatches = text.match(/Wire \(SBJ\): Type - (\w+-?\w*), Size - (\d+\/?\d*), Length - (\d+) ft, Count - (\d+)/g);
    if (wireMatches) {
        wireMatches.forEach(match => {
            const details = {};
            const matchDetails = match.match(/Wire \(SBJ\): Type - (\w+-?\w*), Size - (\d+\/?\d*), Length - (\d+) ft, Count - (\d+)/);
            if (matchDetails) {
                details.type = "SBJ"; // Fixed type to "SBJ"
                details.size = matchDetails[2];
                details.length = parseInt(matchDetails[3]);
                details.count = parseInt(matchDetails[4]);
                detailsList.push(details);
            }
        });
    }
    return detailsList;
}

function showSbjResults(detailsList, largestCCCSize, requiredSbjSize) {
    const sbjDetails = detailsList.filter(detail => detail.type === "SBJ");

    if (sbjDetails.length > 0) {
        const results = sbjDetails.map(sbj => {
            const isSufficient = compareWireSizes(sbj.size, requiredSbjSize);
            const sizeComparison = isSufficient ? "Sufficient" : "Insufficient";
            return `${sbj.size} SBJ: ${sbj.length} ft, Count: ${sbj.count} - Minimum required size: ${requiredSbjSize} (${sizeComparison} size)`;
        }).join('\n');
        alert(`Largest CCC Size: ${largestCCCSize}\nMinimum required SBJ size: ${requiredSbjSize}\n\nIncluded SBJ Sizes:\n${results}`);
    } else {
        alert(`No SBJ wire added to the set.\nLargest CCC Size: ${largestCCCSize}\nMinimum required SBJ size: ${requiredSbjSize}`);
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
