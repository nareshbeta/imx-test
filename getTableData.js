function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("https://jjrw2vhu5qzqhdshs4oxcnfa540skjud.lambda-url.us-east-1.on.aws/", requestOptions)
    .then(response => response.json())
    .then(result => {

        const imx = result["overall_output_1"];
        const tableData = result["overall_output_2"];
        const projects = result["overall_output_3"]["data"]["getMetricsAll"]["items"]

        document.getElementById("cryptoslam-imx-sales").innerText = `$${numberWithCommas(imx["cryptoslam"][0]["Sales"])}`
        document.getElementById("immutascan-imx-sales").innerText = `$${numberWithCommas(imx["immutascan"][0]["Sales"])}`


        document.getElementById("cryptoslam-imx-change").innerText = `${imx["cryptoslam"][0]["Change (24h)"]}`
        document.getElementById("immutascan-imx-change").innerText = `${imx["immutascan"][0]["Change (24h)"]}`

        document.getElementById("cryptoslam-imx-buyers").innerText = `${imx["cryptoslam"][0]["Buyers"]}`
        document.getElementById("cryptoslam-imx-txns").innerText = `${imx["cryptoslam"][0]["Txns"]}`


        document.getElementById("cryptoslam-discrepancy").innerText = `$${numberWithCommas(Math.abs(imx["immutascan"][0]["Sales"] - imx["cryptoslam"][0]["Sales"]))}`

        const tableDataText = tableData.map((x, i) => {
            const trText = `
        <tr>
        <td class="summary-sales-table__column summary-sales-table__column-rank summary-sales-table__cell-rank rank-cell">${i + 1}</td>
        <td class="summary-sales-table__column summary-sales-table__column-product summary-sales-table__cell-product product">
                <span class="summary-sales-table__column-product-name">${x["Blockchain"]}</span>
        </td>
        <td class="summary-sales-table__column summary-sales-table__column-sales cursor-default fantokens-sales">
            <span>${x["Sales"]}</span>
        </td>
        <td class="summary-sales-table__column summary-sales-table__column-change summary-sales-table__no-wrap cursor-default">
            <span style="color: #1d8843; font-weight: 500"
                data-toggle="tooltip" class="js-tooltip"
                data-container="body" title="$8,214,265.49">${x["Change (24h)"]}</span>
        </td>
        <td class="summary-sales-table__column summary-sales-table__column-buyers">
            ${x["Buyers"]}</td>
        <td
            class="summary-sales-table__column summary-sales-table__column-txns">
            ${x["Txns"]}</td>
        </tr>
        
        `;

            return trText;
        }).join(`
        `);

        document.getElementById("blockchains_by_nft_volume_24h").innerHTML = tableDataText;


        const projectsTableDataText = projects.map((x, i) => {
            const trText = `
    <tr>
    <td
        class="summary-sales-table__column summary-sales-table__column-rank summary-sales-table__cell-rank rank-cell">
        ${i + 1}</td>
    <td
        class="summary-sales-table__column summary-sales-table__column-product summary-sales-table__cell-product product">
        <span data-toggle="tooltip" data-container="body"
            class="js-tooltip">
                
                <span
                    class="summary-sales-table__column-product-name">${x["name"]}</span>
        </span>
    </td>
    <td
        class="summary-sales-table__column summary-sales-table__column-sales cursor-default fantokens-sales">

        <span data-toggle="tooltip" data-container="body"
            class="js-tooltip">
                <span>$${numberWithCommas(x["last_7_usd"])}</span>
        </span>

    </td>
    <td
        class="summary-sales-table__column summary-sales-table__column-change summary-sales-table__no-wrap cursor-default">
        <span style="color: #ca2d2d; font-weight: 500"
            data-toggle="tooltip" class="js-tooltip"
            data-container="body"></span>${x["last_7_count"]}</span>
    </td>

    <td
        class="summary-sales-table__column summary-sales-table__column-sales cursor-default fantokens-sales">

        <span data-toggle="tooltip" data-container="body"
            class="js-tooltip">
                <span>$${numberWithCommas(x["last_30_usd"])}</span>
        </span>

    </td>
    <td
    class="summary-sales-table__column summary-sales-table__column-sales cursor-default fantokens-sales">

    <span data-toggle="tooltip" data-container="body"
        class="js-tooltip">
            <span>$${numberWithCommas(x["last_30_count"])}</span>
    </span>

</td>
    <td
        class="summary-sales-table__column summary-sales-table__column-change summary-sales-table__no-wrap cursor-default">
        <span style="color: #ca2d2d; font-weight: 500"
            data-toggle="tooltip" class="js-tooltip"
            data-container="body"></span>${x["all_time_count"]}</span>
    </td>

    <td
        class="summary-sales-table__column summary-sales-table__column-sales cursor-default fantokens-sales">

        <span data-toggle="tooltip" data-container="body"
            class="js-tooltip">
                <span>$${numberWithCommas(x["all_time_usd"])}</span>
        </span>

    </td>
    <td
        class="summary-sales-table__column summary-sales-table__column-change summary-sales-table__no-wrap cursor-default">
        <span style="color: #ca2d2d; font-weight: 500"
            data-toggle="tooltip" class="js-tooltip"
            data-container="body"></span>${x["owner_count"]}</span>
    </td>

</tr>

`;

            return trText;
        }).join(`
`);

        document.getElementById("projects_on_imx_24h").innerHTML = projectsTableDataText;
        document.getElementById("projects_on_imx_7d").innerHTML = projectsTableDataText;
        document.getElementById("projects_on_imx_30d").innerHTML = projectsTableDataText;
        document.getElementById("projects_on_imx_all_time").innerHTML = projectsTableDataText;
    })
    .catch(error => console.log('error', error));