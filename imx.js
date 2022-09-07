const imx = {
    'cryptoslam': [{
        'Blockchain': 'ImmutableX',
        'Sales': 3244492,
        'Change (24h)': '152.62%',
        'Buyers': 2025,
        'Txns': 58199
    }],
    'immutascan': [{
        'Blockchain': 'ImmutableX',
        'Sales': 63686.99,
        'Change (24h)': '152.62%',
        'Buyers': 1199802,
        'Txns': 14152
    }]
};

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

document.getElementById("cryptoslam-imx-sales").innerText = `$${numberWithCommas(imx["cryptoslam"][0]["Sales"])}`
document.getElementById("immutascan-imx-sales").innerText = `$${numberWithCommas(imx["immutascan"][0]["Sales"])}`


document.getElementById("cryptoslam-imx-change").innerText = `${imx["cryptoslam"][0]["Change (24h)"]}`
document.getElementById("immutascan-imx-change").innerText = `${imx["immutascan"][0]["Change (24h)"]}`

document.getElementById("cryptoslam-imx-buyers").innerText = `${imx["cryptoslam"][0]["Buyers"]}`
document.getElementById("cryptoslam-imx-txns").innerText = `${imx["cryptoslam"][0]["Txns"]}`


document.getElementById("cryptoslam-discrepancy").innerText = `$${numberWithCommas(Math.abs(imx["immutascan"][0]["Sales"] - imx["cryptoslam"][0]["Sales"]))}`



