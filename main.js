const fetch = require("node-fetch");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const urls = require("./url.json");

let proServers = [
    'official.mxslobby.com:19801',
    'official.mxslobby.com:19802',
    'official.mxslobby.com:19803',
    'official.mxslobby.com:19804',
    'official.mxslobby.com:19805',
    'official.mxslobby.com:19806',
    'official.mxslobby.com:19807',
    'official.mxslobby.com:19808',
    'official.mxslobby.com:19809'    
]

let amServers = [
    'bombshelter.mxsimulator.com:19801',
    'bombshelter.mxsimulator.com:19802',
    'bombshelter.mxsimulator.com:19803',
    'bombshelter.mxsimulator.com:19804',
    'bombshelter.mxsimulator.com:19805',
    'bombshelter.mxsimulator.com:19806',
    'bombshelter.mxsimulator.com:19807',
    'bombshelter.mxsimulator.com:19808',
    'bombshelter.mxsimulator.com:19809'    
]

let pro250Signups = []
let pro450Signups = []

async function getSignups(url){
    let bikeClass = '';
    let browser = await puppeteer.launch({headless: false});
    let page = await browser.newPage();
    await page.setViewport({width: 1920, height: 1080})
    await page.setDefaultNavigationTimeout(120000);
    await page.goto(url);
    await page.waitForNetworkIdle();
    await page.click("#nav-entry-list-tab");
    await page.select("#DataTables_Table_1_length > label > select","100")
    if(urls.coast === "West"){
        bikeClass = "2"
    } else {
        bikeClass = "3"
    }
    await page.select("#entryListClassSelector","2")

    let signups250Pro = await page.evaluate(() =>{
        let nameArray = []
        let uidArray = []
        let entries = ''
        entries = document.getElementById("DataTables_Table_2_info").innerHTML
        let start = entries.indexOf("to") + 3; // add 3 to skip the word "to"
        let end = entries.indexOf("of");
        let substring = parseInt(entries.substring(start, end));

        
        for(let i =0;i<substring;i++){
            //name - #entrylist31547 > td:nth-child(3)
            //uid - #entrylist31547 > td:nth-child(4)
            nameArray[i] = document.querySelector(`#entrylist31547 > td:nth-child(${i+3})`)

        }
        //console.log(substring);
        
        return {entries, nameArray, uidArray};
    })
    //console.log(signups250Pro.entries)
    let entryString = signups250Pro.entries;
    let start = entryString.indexOf("to") + 3; // add 3 to skip the word "to"
    let end = entryString.indexOf("of");
    let substring = parseInt(entryString.substring(start, end));
    console.log(substring);

    //await browser.close();
}

getSignups(urls.proUrl);

async function getQualifying(){
    for(let i = 0; i<proServers.length;i++){
        console.log(proServers[i]);
        console.log(amServers[i]);
    }

    for(let i = 0; i<proServers.length;i++){
        let browser = await puppeteer.launch({headless: true});
        let page = await browser.newPage();
        await page.setViewport({width: 1920, height: 1080})
        await page.setDefaultNavigationTimeout(120000);
        await page.goto(url);
        await page.waitForNetworkIdle();


    }
}

//getQualifying();