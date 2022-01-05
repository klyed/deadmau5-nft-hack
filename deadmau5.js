const axios = require('axios');

const mau5NFTLink = "https://ipfs.io/ipfs/Qmau4zYiJqzE42xnXzozz4waYfzg544yvAh8DvQegQNdki/";

const checkSoldLink = "https://www.head5.io/api/metadata/";

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

let foundHeads = [];
let findCount = 0;
let findtries = 0;
let NFTINDEX = 0

if(process.argv.slice(2)){
  let numberIndex = process.argv.slice(2);
  let wut = parseInt(numberIndex[0]);
  let nerNum = pad(wut, 5);
  console.log(nerNum)
  NFTINDEX = nerNum;
}

let NFTINDEXBUDDY = 0;

let altway = false;



let secOne = 0;
let secTwo = 0;
let secThree = 0;
let secFour = 0;

function iterateNFT(){
  NFTINDEX = parseInt(NFTINDEX);
  NFTINDEX++
  NFTINDEX = pad(NFTINDEX, 5);
  return NFTINDEX;
}



var testURL = async(newURL) => {
    try{
      let response = await axios({
          method: 'get',
          url: `${newURL}`,
          json: true
      });
      return response;
    } catch(err){
        return err;
    }
}


async function isSold(uid){
  if(!uid) return;
  let link = `${checkSoldLink}/uid`;
  let soldinfo = await testURL(link).then(function(r){
   return r;
  }).catch(function(err){
    console.log(err);
  });
  if(soldinfo.data.image == "https://head5.io/images/placeholder.png"){
    return false;
  } else {
    console.log(`Looks like ${NFTINDEX} is sold?`)
  }
}

setInterval(function(){
  isSold(NFTINDEX);
},15000);


let getpersec = 0;
let oldfindtries = 0;
setInterval(function(){
  getpersec = findtries - oldfindtries;
  oldfindtries = findtries;
  return getpersec;
},1000);


var funcount = 44;
function iterateUID(){
   async function findEm(){
    for(var i = 0; i < funcount; i++){

      let link = `${mau5NFTLink}${NFTINDEX}_23-40-${NFTINDEXBUDDY}-41`;
      findtries++;
      process.stdout.write(`Checking: ${link} - found ${findCount} / ${findtries} trys - ${getpersec} reqs/sec`)
      process.stdout.cursorTo(0);
       var response = await testURL(link).then(function(r){
        return r;
      }).catch(function(err){
        console.log(err);
      });
            NFTINDEXBUDDY++
    if(response){
      if(response.status){
        console.log(response.status)
        if(response.status == "200"){
          console.log(`FOUND A HEAD!`)
          findCount++;
          console.log(response.config.url);
          foundHeads.push(newURL);
          secOne = 0;
          secTwo = 0;
          secThree = 0;
          secFour = 0;
          iterateNFT();
        }
      }
    }
    if(i == 45){
      NFTINDEXBUDDY = 0
      iterateNFT();
      i = 0;
    }
      //iterateSEC();
      //return anwsers;
    }
  }
  findEm();
}




function iterateSEC(){
if(secOne >= 0 && secOne < 54){
  secOne++;
} else if(secOne == 54){
  secOne = 0;
  if(secTwo >= 0 && secTwo < 43){
    secTwo++;
  } else if(secTwo == 43){
    secTwo = 0;
    if(secThree >= 0 && secThree < 45){
      secThree++;
    } else if(secThree == 45){
      secThree = 0;
      if(secFour >= 0 && secFour < 44){
        secFour++;
      } else if(secFour == 44){
        secFour = 0;
      }
    }
  }
}
if(secOne == 54 && secTwo == 43 && secThree == 45 && secFour == 44 ){
  console.log(`Didin't find ${NFTINDEX} link!`);
}

let format = `_${secFour}-${secThree}-${secTwo}-${secOne}`;
findtries++;
return format;
}




var funcount = 9999999999999999999;
function makeLinks(){
   async function findEm(){
    for(var i = 0; i < funcount; i++){
      let newURL = String(mau5NFTLink + pad(NFTINDEX, 5) + iterateSEC()+".jpg");
      process.stdout.write(`Checking: ${newURL} - found ${findCount} / ${findtries} trys - ${getpersec} reqs/sec`)
      process.stdout.cursorTo(0);
       var response = await testURL(newURL).then(function(r){
        return r;
      }).catch(function(err){
        console.log(err);
      });
    if(response){
      if(response.status){
        console.log(response.status)
        if(response.status == "200"){
          console.log(`FOUND A HEAD!`)
          findCount++;
          console.log(response.config.url);
          foundHeads.push(newURL);
          secOne = 0;
          secTwo = 0;
          secThree = 0;
          secFour = 0;
          iterateNFT();
        }
      }
    }
      //iterateSEC();
      //return anwsers;
    }
  }
  findEm();
}

if(process.argv.slice(3)){
  if(process.argv.slice(3) == "true"){
    iterateUID();
  } else {
    makeLinks()
  }
}

//Ctrl+c AKA SIGINT
process.on('SIGINT', async function() {
  console.log(foundHeads)
  process.exit();
});
