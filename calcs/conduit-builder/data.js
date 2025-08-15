// data.js

// Conduit data
const conduitData = {
    "Western Tube EMT": [0.30, 0.46, 0.67, 1.01, 1.16, 1.48, 2.16, 2.63, 3.49, 3.93],
    "Western Tube IMC": [0.62, 0.84, 1.19, 1.58, 1.94, 2.56, 4.41, 5.43, 6.29, 7.00],
    "Western Tube RMC": [0.82, 1.09, 1.61, 2.18, 2.63, 3.50, 5.59, 7.27, 8.80, 10.30],
    "Western Tube RAC": [0.82, 1.09, 1.61, 2.18, 2.63, 3.50, 5.59, 7.27, 8.80, 10.30],  // Same as RMC
    "PullEase Aluminum EMT": [0.115, 0.19, 0.265, 0.344, 0.425, 0.726, 1.12, 1.406, 1.89, 2.216],
    "JM Eagle PVC Schedule 40": [0.19, 0.28, 0.40, 0.57, 0.67, 0.86, 1.20, 1.45, 1.65, 1.89],
    "JM Eagle PVC Schedule 80": [0.28, 0.40, 0.57, 0.80, 0.95, 1.29, 1.67, 2.04, 2.38, 2.74]
};

// Conduit size data
const conduitSizeData = {
    "Western Tube EMT": {
        "1/2": 0.304,
        "3/4": 0.533,
        "1": 0.866,
        "1-1/4": 1.496,
        "1-1/2": 2.073,
        "2": 3.356,
        "2-1/2": 4.796,
        "3": 7.393,
        "3-1/2": 9.519,
        "4": 12.722
    },
    "PullEase Aluminum EMT": {
        "1/2": 0.304,
        "3/4": 0.533,
        "1": 0.866,
        "1-1/4": 1.496,
        "1-1/2": 2.073,
        "2": 3.356,
        "2-1/2": 4.796,
        "3": 7.393,
        "3-1/2": 9.519,
        "4": 12.722
    },
    "Western Tube IMC": {
        "1/2": 0.342,
        "3/4": 0.586,
        "1": 0.959,
        "1-1/4": 1.647,
        "1-1/2": 2.225,
        "2": 3.63,
        "2-1/2": 5.135,
        "3": 7.922,
        "3-1/2": 10.584,
        "4": 13.631
    },
    "Western Tube RMC": {
        "1/2": 0.314,
        "3/4": 0.549,
        "1": 0.887,
        "1-1/4": 1.526,
        "1-1/2": 2.071,
        "2": 3.408,
        "2-1/2": 4.866,
        "3": 7.499,
        "3-1/2": 10.01,
        "4": 12.882,
        "5": 20.212,
        "6": 29.158
    },
    "Western Tube RAC": {
        "1/2": 0.314,
        "3/4": 0.549,
        "1": 0.887,
        "1-1/4": 1.526,
        "1-1/2": 2.071,
        "2": 3.408,
        "2-1/2": 4.866,
        "3": 7.499,
        "3-1/2": 10.01,
        "4": 12.882,
        "5": 20.212,
        "6": 29.158
    },
    "JM Eagle PVC Schedule 80": {
        "1/2": 0.217,
        "3/4": 0.409,
        "1": 0.688,
        "1-1/4": 1.237,
        "1-1/2": 1.711,
        "2": 2.874,
        "2-1/2": 4.119,
        "3": 6.442,
        "3-1/2": 8.688,
        "4": 11.258,
        "5": 17.855,
        "6": 25.598
    },
    "JM Eagle PVC Schedule 40": {
        "1/2": 0.285,
        "3/4": 0.508,
        "1": 0.832,
        "1-1/4": 1.453,
        "1-1/2": 1.986,
        "2": 3.291,
        "2-1/2": 4.695,
        "3": 7.268,
        "3-1/2": 9.737,
        "4": 12.554,
        "5": 19.761,
        "6": 28.567
    }
};

// Wire data
const wireData = [
    {size: "18", THWN2: {weight: 8.0, area: 0.0}, XHHW2: {weight: 0.0, area: 0.0}},
    {size: "16", THWN2: {weight: 12.0, area: 0.0}, XHHW2: {weight: 0.0, area: 0.0}},
    {size: "14", THWN2: {weight: 16.0, area: 0.0097}, XHHW2: {weight: 18.0, area: 0.0139}},
    {size: "12", THWN2: {weight: 24.0, area: 0.0133}, XHHW2: {weight: 26.0, area: 0.0181}},
    {size: "10", THWN2: {weight: 38.0, area: 0.0211}, XHHW2: {weight: 40.0, area: 0.0243}},
    {size: "8", THWN2: {weight: 63.0, area: 0.0366}, XHHW2: {weight: 65.0, area: 0.0437}},
    {size: "6", THWN2: {weight: 96.0, area: 0.0507}, XHHW2: {weight: 98.0, area: 0.0590}},
    {size: "4", THWN2: {weight: 153.0, area: 0.0824}, XHHW2: {weight: 149.0, area: 0.0814}},
    {size: "3", THWN2: {weight: 189.0, area: 0.0973}, XHHW2: {weight: 185.0, area: 0.0962}},
    {size: "2", THWN2: {weight: 234.0, area: 0.1158}, XHHW2: {weight: 230.0, area: 0.1146}},
    {size: "1", THWN2: {weight: 299.0, area: 0.1562}, XHHW2: {weight: 300.0, area: 0.1534}},
    {size: "1/0", THWN2: {weight: 372.0, area: 0.1855}, XHHW2: {weight: 358.0, area: 0.1825}},
    {size: "2/0", THWN2: {weight: 462.0, area: 0.2223}, XHHW2: {weight: 450.0, area: 0.2190}},
    {size: "3/0", THWN2: {weight: 575.0, area: 0.2679}, XHHW2: {weight: 561.0, area: 0.2642}},
    {size: "4/0", THWN2: {weight: 712.0, area: 0.3237}, XHHW2: {weight: 714.0, area: 0.3197}},
    {size: "250", THWN2: {weight: 851.0, area: 0.397}, XHHW2: {weight: 834.0, area: 0.3904}},
    {size: "300", THWN2: {weight: 1010.0, area: 0.4608}, XHHW2: {weight: 985.0, area: 0.4536}},
    {size: "350", THWN2: {weight: 1170.0, area: 0.5242}, XHHW2: {weight: 1175.0, area: 0.5166}},
    {size: "400", THWN2: {weight: 1330.0, area: 0.5863}, XHHW2: {weight: 1341.0, area: 0.5782}},
    {size: "500", THWN2: {weight: 1650.0, area: 0.7073}, XHHW2: {weight: 1643.0, area: 0.6984}},
    {size: "600", THWN2: {weight: 2000.0, area: 0.8676}, XHHW2: {weight: 1960.0, area: 0.8709}},
    {size: "700", THWN2: {weight: 0.0, area: 0.9887}, XHHW2: {weight: 0.0, area: 0.9923}},
    {size: "750", THWN2: {weight: 1466.0, area: 1.0496}, XHHW2: {weight: 2435.0, area: 1.0532}},
    {size: "800", THWN2: {weight: 0.0, area: 1.1085}, XHHW2: {weight: 0.0, area: 1.1122}},
    {size: "900", THWN2: {weight: 0.0, area: 1.2311}, XHHW2: {weight: 0.0, area: 1.2351}},
    {size: "1000", THWN2: {weight: 3260.0, area: 1.3478}, XHHW2: {weight: 3220.0, area: 1.3519}},
    {size: "1250", THWN2: {weight: 0.0, area: 0.0}, XHHW2: {weight: 0.0, area: 1.7180}},
    {size: "1500", THWN2: {weight: 0.0, area: 0.0}, XHHW2: {weight: 0.0, area: 2.0156}},
    {size: "1750", THWN2: {weight: 0.0, area: 0.0}, XHHW2: {weight: 0.0, area: 2.3127}},
    {size: "2000", THWN2: {weight: 0.0, area: 0.0}, XHHW2: {weight: 0.0, area: 2.6073}}
];

let setCount = 0;
let cumulativeWeight = 0;
