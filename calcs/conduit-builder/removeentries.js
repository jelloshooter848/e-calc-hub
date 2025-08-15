// removeEntries.js

function removeItem(button) {
    const listItem = button.parentElement;
    listItem.remove();
    // Update total weight and wire fill
    updateTotalWeightAndWireFill();
}

function removeSet(setId) {
    const setItem = document.getElementById(`set-${setId}`);
    if (setItem) {
        const weightMatch = setItem.innerText.match(/Weight - ([\d.]+) lbs/);
        if (weightMatch) {
            const weight = parseFloat(weightMatch[1]);
            cumulativeWeight -= weight;
            document.getElementById('cumulativeWeight').innerText = `${cumulativeWeight.toFixed(2)} lbs`;
        }
        setItem.remove();
    }
}
