// checkGec.js

// Import the data for GEC from the "250.66" table
const gecTable = {
    "14": "#8",
    "12": "#8",
    "10": "#8",
    "8": "#8",
    "6": "#8",
    "4": "#6",
    "3": "#6",
    "2": "#6",
    "1": "#6",
    "1/0": "#6",
    "2/0": "#4",
    "3/0": "#4",
    "4/0": "#2",
    "250": "#2",
    "350": "#2",
    "500": "#1/0",
    "600": "#1/0",
    "750": "2/0",
    "1000": "2/0",
    "1100": "2/0",
    "1250": "3/0",
    "1500": "3/0",
    "1750": "3/0",
    "2000": "3/0",
    "2500": "3/0",
    "3000": "3/0",
    "3500": "3/0",
    "4000": "3/0",
    // Add other mappings as necessary
};

function checkGec(setId) {
    const setItem = document.getElementById(`set-${setId}`);
    if (setItem) {
        const gecDetails = extractGecDetails(setItem.innerText);
        const largestCCCSize = findLargestCCC(gecDetails);

        if (largestCCCSize) {
            const requiredGecSize = gecTable[largestCCCSize];
            if (requiredGecSize) {
                showGecResults(gecDetails, largestCCCSize, requiredGecSize);
            } else {
                alert("No matching GEC size found for the largest CCC conductor.");
            }
        } else {
            promptForCCCForGec(setId);
        }
    }
}

function promptForCCCForGec(setId) {
    const cccSize = prompt("No CCC conductor found. Please enter the size of the CCC conductor (e.g., 14, 12, 10, 8, etc.):");
    if (cccSize) {
        if (gecTable.hasOwnProperty(cccSize)) {
            const requiredGecSize = gecTable[cccSize];
            const setItem = document.getElementById(`set-${setId}`);
            if (setItem) {
                const gecDetails = extractGecDetails(setItem.innerText);
                showGecResults(gecDetails, cccSize, requiredGecSize);
            }
        } else {
            alert("Invalid CCC size entered. Please try again.");
        }
    } else {
        alert("No CCC size entered. Unable to check GEC requirements.");
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

function extractGecDetails(text) {
    const detailsList = [];
    const wireMatches = text.match(/Wire \(GEC\): Type - (\w+-?\w*), Size - (\d+\/?\d*), Length - (\d+) ft, Count - (\d+)/g);
    if (wireMatches) {
        wireMatches.forEach(match => {
            const details = {};
            const matchDetails = match.match(/Wire \(GEC\): Type - (\w+-?\w*), Size - (\d+\/?\d*), Length - (\d+) ft, Count - (\d+)/);
            if (matchDetails) {
                details.type = "GEC"; // Fixed type to "GEC"
                details.size = matchDetails[2];
                details.length = parseInt(matchDetails[3]);
                details.count = parseInt(matchDetails[4]);
                detailsList.push(details);
            }
        });
    }
    return detailsList;
}

function showGecResults(detailsList, largestCCCSize, requiredGecSize) {
    const gecDetails = detailsList.filter(detail => detail.type === "GEC");

    if (gecDetails.length > 0) {
        const results = gecDetails.map(gec => {
            const isSufficient = compareWireSizes(gec.size, requiredGecSize);
            const sizeComparison = isSufficient ? "Sufficient" : "Insufficient";
            return `${gec.size} GEC: ${gec.length} ft, Count: ${gec.count} - Minimum required size: ${requiredGecSize} (${sizeComparison} size)`;
        }).join('\n');
        alert(`Largest CCC Size: ${largestCCCSize}\nMinimum required GEC size: ${requiredGecSize}\n\nIncluded GEC Sizes:\n${results}`);
    } else {
        alert(`No GEC wire added to the set.\nLargest CCC Size: ${largestCCCSize}\nMinimum required GEC size: ${requiredGecSize}`);
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
