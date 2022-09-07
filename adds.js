var apiUrl = 'https://api.slamland.io/api/';
var imgUrl = 'https://api.slamland.io/images';
var maxTiles = 0;
var websiteId;
var webDomain = '';
const adds = [];
var str1 = '';

function getCurrentETHRate() {
    fetch(apiUrl + 'Tile/GetPriceInETH').then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        var json = response.json();
        json.then((data) => {
            localStorage.setItem("ethRate", data.payload.eth);
        })
    });
}

function getPriceInUSD() {
    fetch(apiUrl + 'Tile/GetExchangeRate').then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    }).then(data => {
        if (data.payload != null) {
            localStorage.setItem("usdRate", data.payload[0].rate);
        }
    });
}

function saveWhiteListInfo() {
    var email = document.getElementById('txtEmail').value;
    var accountAddress = document.getElementById('txtAccountAddress').value;
    var tileId = parseInt(localStorage.getItem("whitelisttileid"));
    if (email == null || email == undefined || email == '') {
        alert("Please enter email address");
        document.getElementById('txtEmail').focus();
        return false;
    }
    if (accountAddress == null || accountAddress == undefined || accountAddress == '') {
        alert("Please enter account addresses");
        document.getElementById('txtAccountAddress').focus();
        return false;
    }
    let data = JSON.stringify({
        TileId: tileId,
        EmailAddress: email,
        AccountAddresses: accountAddress
    });
    fetch(apiUrl + 'Tile/SaveWhiteListInfo', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
    }).then(response => response.json())
        .then(data => {
            alert(data.message);
            document.getElementById('txtEmail').value = '';
            document.getElementById('txtAccountAddress').value = '';
        });
}

function trimText(str, number) {
    return str.length > number ?
        str.substring(0, number) + '...' :
        str;
}

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

function formatMoney(n) {
    return (Math.round(n * 100) / 100).toLocaleString();
}

function renderTwitterTile(tweet) {
    var twitterData = tweet;

    var twitterHtml =
        "<div><div style='display: flex;align-items: flex-start;width: 100%;max-width: 260px;' >" +
        "<img src='" +
        twitterData.twitterProfilePhoto +
        "' alt='' style='width:24px;height:24px;border-radius:50%;border:2px solid #FFFFFF'>" +
        "<div style='padding-left: 13px;'><h4 style='font-weight: bold;font-size: 16px;line-height: 1.5;margin: 0;color: #FFFFFF; float: left;'>" +
        "<a style='color: #FFFFFF;text-decoration:none' href='" +
        twitterData.twitterAccountLink +
        "' target='_blank'>" +
        twitterData.twitterName +
        "</a>" +
        "</h4><span style='float: left; margin-left: 5px; margin-top: 4px;'><img src='" +
        imgUrl +
        "/twitterVerifiedIcon.svg' /></span></div></div>" +
        "<div style='display:flex;justify-content: space-between;'><div style='position: relative;width: 100%;margin-left: 0;margin-top: 10px;'>" +
        "<div id='content-box'  style='height: 103px; overflow: hidden;' onMouseOver=this.style.height='auto' onMouseOut=this.style.height='103px'>" +
        "<p style='font-weight: normal;font-size: 12px;line-height: 17px;color: #FFFFFF;margin: 0; background: rgba(0, 0, 0, 1);border-radius:4px 4px 0px 0px;padding: 10px 10px;padding-bottom: 5px;'>" +
        twitterData.nftText +
        "<img src='https://hqdemo.com/slamland/images/tweeticons.png' style='height: 14px;'/>";

    if (
        twitterData.tweetImageUrl != null &&
        twitterData.tweetImageUrl != undefined &&
        twitterData.tweetImageUrl != ""
    ) {
        twitterHtml +=
            "<img src='" +
            twitterData.tweetImageUrl +
            "' style='margin-top: 6px; width: 100%;'/>";
    }

    twitterHtml +=
        "</p><p style='font-weight: normal;font-size: 12px;line-height: 16px;color: #FFFFFF;margin: 0; background: rgba(0, 0, 0, 1);padding: 10px 10px;padding-top: 0; display: flex;justify-content: space-between;padding-bottom: 20px;'>" +
        "<a href='" +
        twitterData.tweetLink +
        "' target='_blank' style='font-weight: normal;font-size: 10px;line-height: 16px;color: #FFFFFF;text-decoration: none;'>View In Twitter</a>" +
        "<a href='" +
        twitterData.twitterAccountLink +
        "' style='font-weight: normal;font-size: 10px;line-height: 16px;color: #FFFFFF;text-decoration: none;'>@" +
        twitterData.twitterHandle +
        "</a>" +
        "</p><div style=' position: absolute; left: 0; bottom: 0; width: 100%; text-align: center; background: linear-gradient(180deg, rgba(0, 0, 0, 0) 15%, #000000 133.33%); padding: 5px 0; '>" +
        "<span id='rotate' style='display: inline-block;width: 0;height: 0;margin-left: 0px;vertical-align: middle;border-top: 6px solid white;border-right: 6px solid transparent;border-left: 6px solid transparent; cursor: pointer;'></span></div>" +
        "</div></div></div><div style='background: #1DA1F2;position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: -1; overflow: hidden; border-radius: 5px;'>" +
        "<div style=' display:none; background-image: url(&#39;" +
        twitterData.tweetImageUrl +
        "&#39;); background-size: 100%; height: 100%; width: 100%; filter: blur(40px); background-position: center center; z-index: -1; background-color:#020C21; transform: scale(1.5);'></div>" +
        "</div></div>";
    return twitterHtml;
}

function renderDiscordTile(discordData) {
    var discordData = discordData;

    return "<div style='position: absolute;left: 0;top: 0;width: 100%;height: 100%;overflow: hidden;border-radius: 5px;'>" +
        "<div style='display: flex; background: #5865F2; height: 46px; position: relative;'>" +
        "<div style='display: flex;align-items: flex-start;width: 100%;max-width: 260px;'>" +
        "<img src='" + imgUrl + "/discordHeaderIcon.svg' alt='' style=' width: 64px;height: 64px;position: absolute;top: 35%;left: 12px;'></div>" +
        "<div style='width: 100%;max-width: 125px;justify-content: end;display: flex; align-items: center;'>" +
        "<img src='" + imgUrl + "/dicardTileIcon.svg' alt='' style='width: 24px;height: 24px;margin-right:10px'>" +
        "</div></div>" +
        "<div style='background:#292841;color:#fff;display:flex;justify-content: space-between; align-items: center;padding: 0 12px;height: 100px;padding-top: 40px;'>" +
        "<div><h3 style='font-weight: bold;font-size: 16px;line-height: 22px;margin: 0;' title=" + discordData.nftText + ">" + trimText(discordData.nftText, 30) + "</h3>" +
        "<div style='display:flex; align-items: center;'>" +
        "<p style='text-align:left;'><img style='width:16px;height: 16px;' src='" + imgUrl + "/discardMemberIcon.svg'>" +
        "<span style='margin-left:8px;font-weight: normal;font-size: 12px;'>" + numberWithCommas(discordData.noofMembers) + " members</span></p></div></div>" +
        "<div><a class='discordButttonHover' target='_blank' href='" + discordData.inviteLink + "' style='border: 0;padding: 7px 26px;text-transform: uppercase;color: #fff;background: #5865F2;box-shadow: 0px 5px 8px rgb(0 0 0 / 25%);border-radius: 4px 0px;font-weight: bold;font-size: 14px;line-height: 18px;text-decoration: none;'>" +
        "Join</a></div></div></div>";
}

function renderWhitelistTile(wlData) {

    var whitelistData = wlData;
    var backgroundImage = '';
    if (whitelistData.collectionImages.length > 0) {
        backgroundImage = whitelistData.collectionImages[0].imageUrl;
    }
    if (backgroundImage == null || backgroundImage == '' || backgroundImage == undefined) {
        backgroundImage = imgUrl + '/ninja.png';
    }
    localStorage.setItem("whitelisttileid", whitelistData.id);

    return (
        "<div style=''><div style='display: flex; margin-top: 8px;'>" +
        "<div style='margin-top: 0;display: flex;align-items: flex-start;max-width: 100%;flex: 0 0 60%;'></div>" +
        "<div style='max-width: 100%;flex: 0 0 35%;justify-content: space-between;display: flex;'>" +
        "<a href='" +
        whitelistData.websiteLink +
        "' target='_blank' title='website link'><img src='" +
        imgUrl +
        "/share.png' alt='' style='width: 24px;height: 24px;'></a>" +
        "<a href='" +
        whitelistData.cryptoslamLink +
        "' target='_blank' title='cryptoslam link'><img src='" +
        imgUrl +
        "/thunder.png' alt='' style='width: 24px;height: 24px;'></a>" +
        "<a href='" +
        whitelistData.twitterAccountLink +
        "' target='_blank' title='twitter account link'><img src='" +
        imgUrl +
        "/twitter-2.png' alt='' style='width: 24px;height: 24px;'></a>" +
        "<a href='" +
        whitelistData.discordLink +
        "' target='_blank' title='discord link'><img src='" +
        imgUrl +
        "/micky.png' alt='' style='width: 24px;height: 24px;'></a>" +
        "</div></div>" +
        "<div style='display:flex;justify-content:space-between;bottom: 0;position: absolute;left: 0;'>" +
        "<div style='position: relative;width: 100%; margin-top: 47px;'><div>" +
        "<div style='width:375px; padding:10px; background: rgba(0, 0, 0, 0.1);backdrop-filter: blur(24px);border-radius: 0px 0px 5px 5px; align-items: center;'>" +
        "<div style='display:flex; align-items:center;'><div style=' color:#fff;flex: 0 0 60%;max-width: 100%;'>" +
        "<h3 style='margin:0; font-weight: bold;font-size: 16px; text-align: left;'>" +
        whitelistData.headline +
        "</h3>" +
        "<p style='text-align: left;margin:0; overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1; -webkit-box-orient: vertical;'>" +
        whitelistData.description +
        "</p>" +
        "</div><div style='flex: 0 0 40%;max-width: 100%;text-align: right;'>" +
        "<a onclick='contentShowDiscord()' style='text-decoration: none;background: radial-gradient(405.56% 580.83% at 106.01% 346.3%, #1DA1F2 0%, #214290 100%);border: 1px solid rgba(255, 255, 255, 0.75);color: #fff;padding: 5px 16px;box-shadow: 0px 5px 8px rgb(0 0 0 / 25%);border-radius: 4px 0px; font-weight: 600;font-size: 14px;line-height: 1.5;text-align: center;text-transform: uppercase;color: #FFFFFF; display: flex;justify-content: center;align-items: center;' href='javascript:;'>" +
        whitelistData.buttonText +
        "<span id='rotate-Discord' style='margin-left: 5px;display: inline-block;width: 0;height: 0;vertical-align: middle;border-top: 6px solid;border-right: 6px solid transparent;border-left: 6px solid transparent; cursor: pointer;'></span></a>" +
        "</div></div><div id='content-boxDiscord' style='background: rgb(158 158 158);overflow: hidden;height: 0;position: absolute;top: 55px;left: 0; padding: 0 8px;'>" +
        "<div id='whitelistForm' style='margin-top:10px'>" +
        "<input style='background: #FFFFFF;border: 1px solid #FFFFFF;box-sizing: border-box;border-radius: 4px; width: 100%; margin-bottom: 12px;padding: 12px 12px;' type='email' name='txtEmail' id='txtEmail' placeholder='Enter email address'>" +
        "<input style='background: #FFFFFF;border: 1px solid #FFFFFF;box-sizing: border-box;border-radius: 4px; width: 100%;padding: 12px 12px;' type='text' name='txtAccountAddress' id='txtAccountAddress' placeholder='Account Address'>" +
        "<button style='background: radial-gradient(405.56% 580.83% at 106.01% 346.3%, #EEC31A 0%, #E47C25 100%);box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.25);border-radius: 4px 0px;color: #fff;padding: 6px 22px;margin-top: 12px; border: 0;' type='submit' onclick='saveWhiteListInfo()'>Submit</button>" +
        "</div></div></div></div></div></div>" +
        "<div style='position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: -1; overflow: hidden; border-radius: 5px;'>" +
        //"<div style='position: absolute; left: 0; top: 0; background-image: url(" + imgUrl + "/ninja.png);background-size:cover; background-position:center; background-repeat: no-repeat, background-size: 100%; height: 100%; width: 100%; background-position: center center; background-color:#020C21;'>" +
        "<div style='position: absolute; left: 0; top: 0; background-image: url(" +
        backgroundImage +
        ");background-size:cover; background-position:center; background-repeat: no-repeat, background-size: 100%; height: 100%; width: 100%; background-position: center center; background-color:#020C21;'>" +
        "</div></div></div>"
    );
}

function renderDNAuctionTile(dnAuctionData, index) {
    index = index + 1;
    var dnListData = dnAuctionData;
    var logo = '';
    if (dnListData.collectionLogo != null) {
        logo = dnListData.collectionLogo;
    }
    else {
        logo = imgUrl + '/droppingnowDefault.png';
    }

    var collectionName = '';
    if (dnListData.collectionList != null) {
        collectionName = dnListData.collectionList.name;
    }
    else {
        if (dnListData.tokens.length > 0) {
            collectionName = dnListData.tokens[0].collectionName;
        }
        else {
            collectionName = dnListData.dnCollectionName;
        }
    }

    var currentPrice = CalculateDNCurrentPrice(dnListData.startingPrice, dnListData.dnTimestamp);
    var currentPriceInUsd = parseFloat(localStorage.getItem("usdRate")) * currentPrice;

    return "<div style='max-height: 126px;overflow: hidden;filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.12));border-radius: 4px;width: 100%;float: left;max-width: 110px;'>" +
        "<img src='" + logo + "' alt='ads Image' style='object-fit: cover; width: 100%; height: 137px' />" +
        "</div><div style='padding: 0 0 0 12px;width: 100%;max-width: 210px;color: #fff;display: flex;flex-direction: column;justify-content: space-between;'>" +
        "<h4 style='font-size: 16px;font-style: normal;font-weight: 700;letter-spacing: 0px;text-align: left;margin: 0;display: flex;align-items: center;justify-content: space-between;margin-bottom: 4px;'>" +
        "<span style='font-weight: bold;font-size: 16px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;'>" + dnListData.description + "</span>" +
        "</h4><p style='font-size: 12px;font-style: normal;font-weight: 400;letter-spacing: 0px;text-align: left;margin: 0;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;color: #dee2e6;margin-bottom: 4px;'>" +
        "<span style='background:#E8BC00;border-radius: 2px;padding: 2px 6px;font-weight: 500;font-size: 10px;line-height: 12px;color: #2E2E2E;box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);margin-bottom: 3px;display: inline-block;'>" +
        collectionName + "</span></p>" +

        "<div style='display: flex;align-items: center;background: rgba(0, 0, 0, 0.5);border-radius: 6px 0px 0px 0px;width: 239px;padding: 5px 0px 5px 8px;margin-bottom: 4px;'>" +
        "<img src='" + imgUrl + "/etherIcon.svg' alt='icon' style='width: 16px; height: 27px;float:left' />" +
        "<div style='padding-left: 10px; text-align: left;' class='hasbuynowbutton'><p style='margin: 0; color: #ffffff; font-size: 18px;line-height: 20px;'>" +
        "<b><span id='dropping" + index + "_Eth'>" + currentPrice + "</span> ETH</b></p>" +
        "<p style='margin: 0; color: #dee2e6;font-size: 12px;'>~$<span id='dropping" + index + "_Dollar'>" + formatMoney(currentPriceInUsd.toFixed(2)) + "</span></p>" +
        "</div></div>" +
        "<a href='" + dnListData.buyNow + "' target='_blank' class='butttonHover' style='font-family:geometria, sans-serif; margin-top:1px; text-transform: uppercase;font-size: 14px;font-style: normal;font-weight: bold;letter-spacing: 0px;max-width: 120px;text-align: center;background: radial-gradient(405.56% 580.83% at 106.01% 346.3%,#1da1f2 0%,#214290 100%);border: 1px solid rgba(255, 255, 255, 0.75);box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.25);border-radius: 4px 0px;display: inline-block;padding: 4px 0px;text-decoration: none;color: #fff;'>" +
        "View Auction</a></div><div style='position: absolute;left: 0;top: 0;width: 100%;height: 100%;z-index: -1;overflow: hidden;border-radius: 5px;'>" +
        "<div style='position: absolute;left: 0;top: 0;background-image: url(" + logo + "); background-size: 100%; height:100%; width:100%; filter:blur(25px); background-position:36px 201%; z-index:-1; background-color:#020c21; transform:scale(1.5);'></div>" +
        //"</div><span><input type='hidden' id='dropping" + index + "_slStartingPrice' value=" + dnListData.startingPrice + " />" + 
        //"<input type='hidden' id='dropping" + index + "_slDNTimeStamp' value=" + dnListData.dnTimestamp + " /></span>";

        "<input type='hidden' id='dropping" + index + "_slStartingPrice' value=" + dnListData.startingPrice + " />" +
        "<input type='hidden' id='dropping" + index + "_slDNTimeStamp' value=" + dnListData.dnTimestamp + " /></div>";
}

function renderDNSoldTile() {
    return `<div style="max-height: 126px;overflow: hidden;filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.12));border-radius: 4px;width: 100%;float: left;max-width: 110px;">
    <img src="tileZeroNFT.png" alt="ads Image" style="width: 100%; object-fit: cover; height: 137px" /></div>
    <div style="padding: 0 0 0 12px;width: 100%;max-width: 210px;color: #fff;display: flex;flex-direction: column;justify-content: space-between;margin-bottom: 4px;">
    <h4 style="font-size: 16px;font-style: normal;font-weight: 700;letter-spacing: 0px;text-align: left;margin: 0;display: flex;align-items: center;justify-content: space-between;">
    <span style="font-weight: bold;font-size: 16px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">Meka 5114</span></h4>
    <p style="font-size: 12px;font-style: normal;font-weight: 400;letter-spacing: 0px;text-align: left;margin: 0;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;color: #dee2e6;margin-bottom: 4px;margin-top: 4px;">
    <span style="background: #E8BC00;border-radius: 2px;padding: 2px 6px;font-weight: 500;font-size: 10px;line-height: 12px;color: #2E2E2E;box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);margin-bottom: 3px;display: inline-block;">Rarity: 2,169 of 8,593</span>
    </p><div style="display: flex;align-items: center;background: rgba(0, 0, 0, 0.5);border-radius: 6px 0px 0px 0px;width: 240px;padding: 5px 0px 5px 8px;margin-bottom: 4px;">
    <img src="etherIcon.svg" alt="icon" style="width: 16px; height: 27px" />
    <div style="padding-left: 20px; text-align: left;"><p style="margin: 0; color: #ffffff; font-size: 18px;line-height: 20px;">
    <b><span id="dropping22_Eth">0.4482</span> ETH</b> <!-- <b id="dropping22_Dollar">1752.43</b> --></p><p style="margin: 0; color: #dee2e6;font-size: 12px;">~$<span id="dropping22_Dollar">2,099.10 </span></p>
    </div></div><a href="javascript:;" target="_blank" style="font-family: 'geometria', sans-serif;text-transform: uppercase;font-size: 14px;font-style: normal;font-weight: 400;letter-spacing: 0px;max-width: 120px;text-align: center;border: 1px solid rgba(255, 255, 255, 0.75);filter: drop-shadow(0px 5px 8px rgba(0, 0, 0, 0.25));box-shadow: 0px 5px 8px rgb(0 0 0 / 25%);border-radius: 4px 0px;display: inline-block;padding: 2px 0;text-decoration: none;
    color: #fff;">Learn More</a></div><!-- BG Blurr --><div style="position: absolute;left: 0;top: 0;width: 100%;height: 100%;z-index: -1;overflow: hidden;border-radius: 5px;">
    <div style="position: absolute;left: 0;top: 0;background-image: url('t-droping-2.png');background-size: 100%;height: 100%;width: 100%;filter: blur(40px);background-position: center center;z-index: -1;background-color: #020c21;transform: scale(1.5);">
    </div></div>`;
}

var currentsiteUrl = document.location.href;
var n = currentsiteUrl.lastIndexOf('/');
var collectionName = currentsiteUrl.substring(n + 1);

if (collectionName == null) {
    //console.log("No collection name found");
}
else {
    getCurrentETHRate();
    getPriceInUSD();
}

function CalculateDNCurrentPrice(startPrice, sDate) {
    const day_ms = 86400000;
    var date = new Date();
    var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
        date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

    var currentTime = now_utc;
    var startingDate = new Date(sDate);

    var startDate = Date.UTC(startingDate.getFullYear(), startingDate.getMonth(), startingDate.getDate(),
        startingDate.getHours(), startingDate.getMinutes(), startingDate.getSeconds());

    var timeDiff = currentTime - startDate;
    const day = Math.floor((timeDiff) / day_ms);
    const preDayPrice = Number(parseFloat(startPrice) * (Math.pow(parseFloat(0.75), day))).toFixed(5);
    const nextDayPrice = Number(parseFloat(startPrice) * (Math.pow(parseFloat(0.75), (day + 1)))).toFixed(5);
    const priceDiff = preDayPrice - nextDayPrice;
    var timeIntoDay = timeDiff % day_ms / day_ms;
    const currentPrice = (preDayPrice - (priceDiff) * timeIntoDay);
    return currentPrice.toFixed(5);
}

//Load tiles

window.addEventListener('load', function () {
    const fetchTilesCollection = fetch(apiUrl + 'Tile/RenderDNTilesCollection', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                CollectionUrl: "https://cryptoslam.io/" + collectionName,
                WebsiteId: 1
            }
        )
    });
    fetchTilesCollection.then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    }).then(json => {
        if (json.payload != null) {
            adds[5];
            var tilesData = json.payload.tiles;
            for (var i = 0; i < tilesData.length; i++) {

                if (tilesData[i].tileTypeId == 2 && tilesData[i].auctionType == 6) {
                    adds[i] = renderDNAuctionTile(tilesData[i], i);
                }

                //if (tilesData[i].tileTypeId == 1) {
                //    adds[i] = renderNFTTile();
                //}
                //else if (tilesData[i].tileTypeId == 2 && tilesData[i].auctionType == 6) {
                //    adds[i] = renderDNAuctionTile(tilesData[i], i);
                //}
                //else if (tilesData[i].tileTypeId == 2 && tilesData[i].auctionType == 7) {
                //    adds[i] = renderDNSoldTile();
                //}
                //else if (tilesData[i].tileTypeId == 3) {
                //    adds[i] = renderTwitterTile(tilesData[i]);
                //}
                //else if (tilesData[i].tileTypeId == 4) {
                //    adds[i] = renderCollectionTile();
                //}
                //else if (tilesData[i].tileTypeId == 5) {
                //    adds[i] = renderDiscordTile(tilesData[i]);
                //}
                //else if (tilesData[i].tileTypeId == 6) {
                //    adds[i] = renderWhitelistTile(tilesData[i]);
                //}
                //else {
                //    adds[i] = renderNFTTile();
                //}
            }
            renderCompleteHTML();
        }
    })
        .catch(error => {
            //console.error(`Could not get tiles collection: ${error}`);
        });
});

function renderCompleteHTML() {
    var dnLogo = "https://slamland-s3-bucket.s3.ca-central-1.amazonaws.com/files/dropppingNowBtn.svg";
    var dnWebsite = "https://www.droppingnow.io/";
    str1 =
        "<link rel='preconnect' href='https://fonts.googleapis.com'>" +
        "<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>" +
        "<link href='https://cdn.jsdelivr.net/npm/geometria-font@1.0.1/style.css' rel='stylesheet'>" +
        "<section id='parentSection' style='overflow-x:auto;overflow-y:hidden; flex-wrap:nowrap; padding-bottom:5px; font-family: geometria; display: flex; align-items: center;width: 100%; font-size: 12px;gap: 3px;'>";
    //"<div id='divSLSliderLeft' class='sl-div-leftbtn'></div>" +
    //"<div id='divSLSliderRight' class='sl-div-rightbtn'></div>" +
    //"<button id='btnScrollLeft' onclick='scrollTileLeft()' class='sl-scroll-leftbtn'><</button>" +
    //"<button id='btnScrollRight' onclick='scrollTileRight()' class='sl-scroll-rightbtn'>></button>";

    if (adds[0] != undefined) {
        str1 +=
            "<div id='first_sec' class='sl-item-tile' style='z-index: 9999; flex:0 0 auto; width: 100%; padding: 12px; width: 375px; height: 150px;display: flex;font-family: geometria; line-height: 1.5;    border: 1px solid rgba(255, 255, 255, 0.6);border-radius: 2px; position: relative;'>" +
            adds[0] +
            "<a href='" + dnWebsite + "' target='_blank' style='cursor:pointer;position:absolute;bottom: 13px; right:15px'><img src='" + dnLogo + "' /></a>" + "</div>";
    }
    if (adds[1] != undefined) {
        str1 +=
            "<div id='second_sec' class='sl-item-tile' style='z-index: 9999; flex:0 0 auto; width: 100%; padding: 12px; width: 375px; height: 150px;display: flex;font-family: geometria; line-height: 1.5;    border: 1px solid rgba(255, 255, 255, 0.6);border-radius: 2px; position: relative;'>" +
            adds[1] +
            "<a href='" + dnWebsite + "' target='_blank' style='cursor:pointer;position:absolute;bottom: 13px; right:15px'><img src='" + dnLogo + "' /></a>" + "</div>";
    }
    if (adds[2] != undefined) {
        str1 +=
            "<div id='third_sec' class='sl-item-tile' style='z-index: 9999; flex:0 0 auto; width: 100%; padding: 12px; width: 375px; height: 150px;display: flex;font-family: geometria; line-height: 1.5;    border: 1px solid rgba(255, 255, 255, 0.6);border-radius: 2px; position: relative;'>" +
            adds[2] +
            "<a href='" + dnWebsite + "' target='_blank' style='cursor:pointer;position:absolute;bottom: 13px; right:15px'><img src='" + dnLogo + "' /></a>" + "</div>";
    }
    if (adds[3] != undefined) {
        str1 +=
            "<div id='fourth_sec' class='sl-item-tile' style='z-index: 9999; flex:0 0 auto; width: 100%; padding: 12px; width: 375px; height: 150px;display: flex;font-family: geometria; line-height: 1.5;    border: 1px solid rgba(255, 255, 255, 0.6);border-radius: 2px; position: relative; ' >" +
            adds[3] +
            "<a href='" + dnWebsite + "' target='_blank' style='cursor:pointer;position:absolute;bottom: 13px; right:15px'><img src='" + dnLogo + "' /></a>" + "</div>";
    }
    if (adds[4] != undefined) {
        str1 +=
            "<div id='fifth_sec' class='sl-item-tile' style='z-index: 9999; flex:0 0 auto; width: 100%; padding: 12px; width: 375px; height: 150px;display: flex;font-family: geometria; line-height: 1.5;    border: 1px solid rgba(255, 255, 255, 0.6);border-radius: 2px; position: relative; ' >" +
            adds[4] +
            "<a href='" + dnWebsite + "' target='_blank' style='cursor:pointer;position:absolute;bottom: 13px; right:15px'><img src='" + dnLogo + "' /></a>" + "</div>";
    }

    ("</section>");

    str1 += `<style>
          .butttonHover, .discordButttonHover {
            transition: all 300ms ease-in;
            transition: all 300ms ease-in;
            -moz-transition: all 300ms ease-in; /* Firefox 4 */
            -webkit-transition: all 300ms ease-in; /* Safari and Chrome */
            -o-transition: all 300ms ease-in; /* Opera */
            -ms-transition: all 300ms ease-in; /* Explorer 10 */
          }
          .butttonHover:hover {
            background: #4169E1 !important;
          }
            .hasbuynowbutton {
            position: relative;
          }
          .hasbuynowbutton::after {
            position: relative;
            content: ".";
            display: none;
            font-size: 0;
            position: absolute;
            top: 16px;
            left: 11px;
            width: 0px;
            height: 0px;
            border-top: 3px solid;
            border-right: 3px solid transparent !important;
            border-left: 3px solid transparent !important;
          }
     .borednowbutton:after{
       content: ".";
        font-size: 0;
        position: absolute;
        top: 20px;
        left: 22px;
        width: 0;
        height: 0px;
        border-top: 4px solid;
        border-right: 4px solid transparent !important;
        border-left: 4px solid transparent !important;
        color: #fff;

      }
    .discordButttonHover:hover {
         background: #472b9d !important;
    }

    #parentSection .sl-item-tile:first-child {
        margin-left:12px;
        //margin-right:6px;
    }
    
    #parentSection .sl-item-tile {
        margin-left:6px;
        margin-right:6px;
        border-radius: 8px !important;
    }

    #parentSection .sl-item-tile:last-child {
        //margin-left:6px;
        margin-right:6px;
    }

    //Implement scroll bar css here

    //#parentSection::-webkit-scrollbar {
    //  display: none !important;
    //}

    #parentSection::-webkit-scrollbar {
      width: 2px !important;
      height: 0px !important;
    }

    #parentSection::-webkit-scrollbar-track {
      background: #f1f1f1 !important;
    }

    #parentSection::-webkit-scrollbar-thumb {
      background: #95999C !important;
    }

    #parentSection::-webkit-scrollbar-thumb:hover {
      background: #555 !important;
    }

    //#parentSection .sl-scroll-leftbtn {
    //    cursor: pointer;
    //    width: 24px;
    //    height: 24px;
    //    border: none;
    //    border-radius: 50%;
    //    position: absolute;
    //    left: 0px;
    //    font-size: 16px;
    //    color: #fff;
    //    background-color: #a6b0c3;
    //    font-weight:bold;
    //    opacity: 0.8;
    //    z-index: 99999;
    //    font-family: monospace;
    //    padding-bottom: 10px;
    //    display:none;
    //}
    //#parentSection .sl-scroll-rightbtn {
    //    cursor:pointer;
    //    width:24px;
    //    height:24px;
    //    border:none;
    //    border-radius:50%;
    //    position:absolute;
    //    //right:40%;
    //    right:0px;
    //    font-size: 16px;
    //    font-weight:bold;
    //    color: #fff;
    //    background-color: #a6b0c3;
    //    opacity: 0.8;
    //    z-index: 99999;
    //    font-family: monospace;
    //    padding-bottom: 10px;
    //}

    //#parentSection .sl-div-leftbtn {
    //    cursor: pointer;
    //    width: 50px;
    //    height: 175px;
    //    border: none;
    //    position: absolute;
    //    left: -42px;
    //    font-size: 16px;
    //    font-weight: bold;
    //    color: #fff;
    //    opacity: 0.8;
    //    z-index: 99998;
    //    //box-shadow: 2px 0 36px 60px #fff;
    //    background-image: linear-gradient(to left, lightgray, 0%,transparent 100%);
    //}
    
    //#parentSection .sl-div-rightbtn {
    //    cursor: pointer;
    //    width: 50px;
    //    height: 175px;
    //    border: none;
    //    position: absolute;
    //    right: -42px;
    //    font-size: 16px;
    //    font-weight: bold;
    //    color: #fff;
    //    opacity: 0.8;
    //    z-index: 99998;
    //    box-shadow: 2px 0 36px 60px #fff;
    //    background-image: linear-gradient(to left, lightgray, 0%,transparent 100%);
    //}
        </style>`;

    document.getElementById("#addsection").innerHTML = str1;
    manageScreenSizes();
}
function contentShowDiscord() {
    var x = document.getElementById("content-boxDiscord");
    var y = document.getElementById("rotate-Discord");
    if (x.style.overflow === "visible") {
        x.style.overflow = "hidden";
        x.style.height = "0";
        y.style.transform = "rotate(360deg)";
    } else {
        x.style.overflow = "visible";
        x.style.height = "161px";
        y.style.transform = "rotate(180deg)";
    }
}
function contentShow() {
    var x = document.getElementById("content-box");
    var y = document.getElementById("rotate");
    if (x.style.overflow == "hidden") {
        x.style.overflow = "visible";
        x.style.height = "auto";
        y.style.transform = "rotate(180deg)";
    } else {
        x.style.overflow = "hidden";
        x.style.height = "103px";
        y.style.transform = "rotate(0deg)";
    }
}
function manageScreenSizes() {

    var screenWidth = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
    );

    let screen1 = document.getElementById("first_sec");
    let screen2 = document.getElementById("second_sec");
    let screen3 = document.getElementById("third_sec");
    let screen4 = document.getElementById("fourth_sec");
    let screen5 = document.getElementById("fifth_sec");
    let slParentSection = document.getElementById("parentSection");

    if (screen1) document.getElementById("first_sec").style.display = "block";
    if (screen2) document.getElementById("second_sec").style.display = "block";
    if (screen3) document.getElementById("third_sec").style.display = "block";
    if (screen4) document.getElementById("fourth_sec").style.display = "block";
    if (screen5) document.getElementById("fifth_sec").style.display = "block";

    if (screenWidth <= 2000) {
        if (screen1) document.getElementById("first_sec").style.display = "block";
        if (screen2) document.getElementById("second_sec").style.display = "block";
        if (screen3) document.getElementById("third_sec").style.display = "block";
        if (screen4) document.getElementById("fourth_sec").style.display = "block";
        if (screen5) document.getElementById("fifth_sec").style.display = "block";
    }
    if (screenWidth <= 1500) {
        if (screen1) document.getElementById("first_sec").style.display = "block";
        if (screen2) document.getElementById("second_sec").style.display = "block";
        if (screen3) document.getElementById("third_sec").style.display = "block";
        if (screen4) document.getElementById("fourth_sec").style.display = "block";
        if (screen5) document.getElementById("fifth_sec").style.display = "block";
    }
    if (screenWidth <= 1134) {
        if (screen1) document.getElementById("first_sec").style.display = "block";
        if (screen2) document.getElementById("second_sec").style.display = "block";
        if (screen3) document.getElementById("third_sec").style.display = "block";
        if (screen4) document.getElementById("fourth_sec").style.display = "block";
        if (screen5) document.getElementById("fifth_sec").style.display = "block";
    }
    if (screenWidth <= 767) {
        if (screen1) document.getElementById("first_sec").style.display = "block";
        if (screen2) document.getElementById("second_sec").style.display = "block";
        if (screen3) document.getElementById("third_sec").style.display = "block";
        if (screen4) document.getElementById("fourth_sec").style.display = "block";
        if (screen5) document.getElementById("fifth_sec").style.display = "block";
    }

    if (slParentSection) document.getElementById("parentSection").style.height = "auto";
    //document.getElementById("parentSection").style.overflow = "visible";
}

window.addEventListener('DOMContentLoaded', function (event) {
    //manageScreenSizes();
    window.addEventListener('resize', function (event) {
        manageScreenSizes();
    });
});

window.setInterval(functionOne, 5000);
window.setInterval(functionTwo, 5000);
window.setInterval(functionThree, 5000);
window.setInterval(functionFour, 5000);
window.setInterval(functionFive, 5000);

function functionOne() {
    if (document.getElementById("dropping1_Eth") != null) {
        var stPrice = parseFloat(document.getElementById("dropping1_slStartingPrice").value);
        var dnTime = document.getElementById("dropping1_slDNTimeStamp").value;
        document.getElementById("dropping1_Eth").innerText = CalculateDNCurrentPrice(stPrice, dnTime);
    }
    if (document.getElementById("dropping1_Dollar") != null) {
        var priceUSD = (parseFloat(document.getElementById("dropping1_Eth").innerText) * parseFloat(localStorage.getItem("usdRate")).toFixed(13)).toFixed(2);
        document.getElementById("dropping1_Dollar").innerText = formatMoney(priceUSD);
    }
}
function functionTwo() {
    if (document.getElementById("dropping2_Eth") != null) {
        //document.getElementById("dropping2_Eth").innerText = (parseFloat(document.getElementById("dropping2_Eth").innerText) - 0.00001).toFixed(5);
        var stPrice = parseFloat(document.getElementById("dropping2_slStartingPrice").value);
        var dnTime = document.getElementById("dropping2_slDNTimeStamp").value;
        document.getElementById("dropping2_Eth").innerText = CalculateDNCurrentPrice(stPrice, dnTime);
    }
    if (document.getElementById("dropping2_Dollar") != null) {
        var priceUSD = (parseFloat(document.getElementById("dropping2_Eth").innerText) * parseFloat(localStorage.getItem("usdRate")).toFixed(13)).toFixed(2);
        document.getElementById("dropping2_Dollar").innerText = formatMoney(priceUSD);
    }
}
function functionThree() {
    if (document.getElementById("dropping3_Eth") != null) {
        //document.getElementById("dropping3_Eth").innerText = (parseFloat(document.getElementById("dropping3_Eth").innerText) - 0.00001).toFixed(5);
        var stPrice = parseFloat(document.getElementById("dropping3_slStartingPrice").value);
        var dnTime = document.getElementById("dropping3_slDNTimeStamp").value;
        document.getElementById("dropping3_Eth").innerText = CalculateDNCurrentPrice(stPrice, dnTime);
    }
    if (document.getElementById("dropping3_Dollar") != null) {
        var priceUSD = (parseFloat(document.getElementById("dropping3_Eth").innerText) * parseFloat(localStorage.getItem("usdRate")).toFixed(13)).toFixed(2);
        document.getElementById("dropping3_Dollar").innerText = formatMoney(priceUSD);
    }
}
function functionFour() {
    if (document.getElementById("dropping4_Eth") != null) {
        //document.getElementById("dropping4_Eth").innerText = (parseFloat(document.getElementById("dropping4_Eth").innerText) - 0.00001).toFixed(5);
        var stPrice = parseFloat(document.getElementById("dropping4_slStartingPrice").value);
        var dnTime = document.getElementById("dropping4_slDNTimeStamp").value;
        document.getElementById("dropping4_Eth").innerText = CalculateDNCurrentPrice(stPrice, dnTime);
    }
    if (document.getElementById("dropping4_Dollar") != null) {
        var priceUSD = (parseFloat(document.getElementById("dropping4_Eth").innerText) * parseFloat(localStorage.getItem("usdRate")).toFixed(13)).toFixed(2);
        document.getElementById("dropping4_Dollar").innerText = formatMoney(priceUSD);
    }
}
function functionFive() {
    if (document.getElementById("dropping5_Eth") != null) {
        //document.getElementById("dropping5_Eth").innerText = (parseFloat(document.getElementById("dropping5_Eth").innerText) - 0.00001).toFixed(5);
        var stPrice = parseFloat(document.getElementById("dropping5_slStartingPrice").value);
        var dnTime = document.getElementById("dropping5_slDNTimeStamp").value;
        document.getElementById("dropping5_Eth").innerText = CalculateDNCurrentPrice(stPrice, dnTime);
    }
    if (document.getElementById("dropping5_Dollar") != null) {
        var priceUSD = (parseFloat(document.getElementById("dropping5_Eth").innerText) * parseFloat(localStorage.getItem("usdRate")).toFixed(13)).toFixed(2);
        document.getElementById("dropping5_Dollar").innerText = formatMoney(priceUSD);;
    }
}

// Popup Open
function popupOpen() {
    document.getElementById("popup").style.display = "flex";
    document.getElementById("overlay").style.display = "block";
    document.getElementById("tweet-sec").style.display = "none";
}

// Popup Close
function popupClose() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    document.getElementById("tweet-sec").style.display = "block";
}

//function scrollTileRight() {
//    document.getElementById('btnScrollLeft').style.display = 'block';
//    document.getElementById('btnScrollRight').style.display = 'block';
//    document.getElementById('divSLSliderLeft').style.boxShadow = '2px 0 36px 60px #fff';

//    const conent = document.querySelector('#parentSection');
//    conent.scrollLeft += 100;
//    event.preventDefault();

//    var scrollWidth = conent.scrollWidth;
//    var width = document.getElementById('parentSection').offsetWidth;
//    var scrollLeft = conent.scrollLeft;
//    if (parseInt(scrollWidth - width) === parseInt(scrollLeft)) {
//        document.getElementById('btnScrollLeft').style.display = 'block';
//        document.getElementById('btnScrollRight').style.display = 'none';
//        document.getElementById('divSLSliderRight').style.boxShadow = 'none';
//    }
//}

//function scrollTileLeft() {
//    document.getElementById('btnScrollLeft').style.display = 'block';
//    document.getElementById('btnScrollRight').style.display = 'block';
//    document.getElementById('divSLSliderRight').style.boxShadow = '2px 0 36px 60px #fff';

//    const conent = document.querySelector('#parentSection');
//    conent.scrollLeft -= 100;
//    event.preventDefault();

//    var scrollWidth = conent.scrollWidth;
//    var width = document.getElementById('parentSection').offsetWidth;
//    var scrollLeft = conent.scrollLeft;

//    if (parseInt(scrollLeft) === 0) {
//        document.getElementById('btnScrollLeft').style.display = 'none';
//        document.getElementById('btnScrollRight').style.display = 'block';
//        document.getElementById('divSLSliderLeft').style.boxShadow = 'none';
//    }
//}