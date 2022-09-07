const tableData = [
{
    'Blockchain': 'Ethereum',
    'Sales': '$17,554,901',
    'Change (24h)': '104.91%',
    'Buyers': 13566,
    'Txns': 49947
},
{
    'Blockchain': 'Solana',
    'Sales': '$6,429,485',
    'Change (24h)': '158.07%',
    'Buyers': 13682,
    'Txns': 130432
},
{
    'Blockchain': 'ImmutableX',
    'Sales': '$3,244,492',
    'Change (24h)': '152.62%',
    'Buyers': 2025,
    'Txns': 58199
},
{
    'Blockchain': 'Flow',
    'Sales': '$847,939',
    'Change (24h)': '211.34%',
    'Buyers': 2850,
    'Txns': 30678
},
{
    'Blockchain': 'Panini',
    'Sales': '$446,999',
    'Change (24h)': '269.85%',
    'Buyers': 209,
    'Txns': 7124
},
{
    'Blockchain': 'Polygon',
    'Sales': '$387,717',
    'Change (24h)': '6.99%',
    'Buyers': 2681,
    'Txns': 2232
},
{
    'Blockchain': 'Ronin',
    'Sales': '$334,412',
    'Change (24h)': '122.18%',
    'Buyers': 4363,
    'Txns': 31048
},
{
    'Blockchain': 'BNB',
    'Sales': '$155,849',
    'Change (24h)': '21.46%',
    'Buyers': 799,
    'Txns': 997
},
{
    'Blockchain': 'Tezos',
    'Sales': '$81,911',
    'Change (24h)': '232.12%',
    'Buyers': 681,
    'Txns': 3519
},
{
    'Blockchain': 'WAX',
    'Sales': '$75,846',
    'Change (24h)': '143.45%',
    'Buyers': 1640,
    'Txns': 29486
},
{
    'Blockchain': 'Avalanche',
    'Sales': '$60,954',
    'Change (24h)': '2.74%',
    'Buyers': 224,
    'Txns': 385
},
{
    'Blockchain': 'Arbitrum',
    'Sales': '$31,309',
    'Change (24h)': '58.38%',
    'Buyers': 842,
    'Txns': 1239
},
{
    'Blockchain': 'Palm',
    'Sales': '$18,600',
    'Change (24h)': '68.58%',
    'Buyers': 186,
    'Txns': 1028
},
{
    'Blockchain': 'Cronos',
    'Sales': '$9,869',
    'Change (24h)': '36.02%',
    'Buyers': 30,
    'Txns': 32
},
{
    'Blockchain': 'Fantom',
    'Sales': '$3,063',
    'Change (24h)': '839.72%',
    'Buyers': 8,
    'Txns': 9
},
{
    'Blockchain': 'Theta',
    'Sales': '$499',
    'Change (24h)': '267.00%',
    'Buyers': 4,
    'Txns': 21
},
{
    'Blockchain': 'OKC',
    'Sales': '$29',
    'Change (24h)': '0.00%',
    'Buyers': 4,
    'Txns': 2
}
];



const tableDataText = tableData.map((x,i) => {
    const trText = `
<tr>
<td class="summary-sales-table__column summary-sales-table__column-rank summary-sales-table__cell-rank rank-cell">${i+1}</td>
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

