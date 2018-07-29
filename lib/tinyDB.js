const _ = require('../vendor/underscore');
var data = require('./db.js');
let farmHouse = {
  "id": 9,
  "merchant": 9,
  "user": 2,
  "logo": "https://v2assets.zopim.io/4YYfzh6b7WjTBg4UkHc8J7XKmos7gNV8-banner?1486175605983",
  "name": "Farmhouse Juice",
  "expirationDate": "2018-08-1",
  "cardViewCard": "https://user-images.githubusercontent.com/32171360/42126950-c8b06bba-7cc2-11e8-86da-6156eff56c2b.png",
  "listViewCard": "https://user-images.githubusercontent.com/32171360/42127006-e5762c5c-7cc3-11e8-89bc-5c6d31802df4.png",
  "walletViewCard": "https://user-images.githubusercontent.com/32171360/42126998-dc329c20-7cc3-11e8-9c46-04fd0962f665.png",
  "reward": "One free juice of your choice!",
  "currentPunches": 1,
  "maxPunches": 8,
  "location": " 129 Wulumuqi Nan Lu",
  "finePrint": "only valid until the end of the month"
}


const TinyDB = {};


// INIT
let init = function (userId) {
  wx.clearStorageSync();
  wx.setStorageSync('data', data)
}

// GET functions
let getUserByID = function(userId) {
  var users = wx.getStorageSync('data').users;
  let item = users.find( elem => elem.id === userId );
  if (!item) {
      console.warn("cant find user for", userId, " in ", users)
  }
  return item;
}


let getPunchcardsForUser = function(userId) {
  var data = wx.getStorageSync('data');
  var items =  data.punchcards.filter( elem => elem.user === userId )
  if (!items) {
    console.warn("cant find punchcards for", userId, " in ", punchcards)
  }
  return items;
}

let getPunchcardByID = function(punchcardID) {
  var data = wx.getStorageSync('data');

  if(punchcardID == undefined) {
    return data.punchcards.splice(1,data.punchcards.length)
  }
  var punchcard = data.punchcards.find(elem => elem.id === punchcardID);
  return punchcard;   
}

let getPunchCardsForUserAndMerchant = function (userId, merchantId) {
  var punchcards = wx.getStorageSync('data').punchcards;
  var items = punchcards.filter(elem => elem.user === userId)
  var commonitem = items.find(elem => elem.merchant === parseInt(merchantId))
  if (commonitem == undefined) {
    console.warn("cant find common punchcards for user ", userId, " and merchant ", merchantId)
  }
  return commonitem;
}

// SET functions
let incrementPunchCard = function(punchcardID, data) {
  var data = wx.getStorageSync('data');
  var item = data.punchcards.find(elem => elem.id === punchcardID);
  item.currentPunches += 1;
  wx.setStorageSync('data', data)

  return data;
}

let makeNewPunchCard = function () {
  var data = wx.getStorageSync('data');
  data.punchcards.push(farmHouse);
  wx.setStorageSync('data', data)

  return farmHouse;
}

let resetPunchCard = function (punchCardID) {
  var data = wx.getStorageSync('data');
  var punchcard = data.punchcards.find(elem => elem.id === punchCardID);
  punchcard.currentPunches = 0;
  wx.setStorageSync('data', data);

  return punchcard;
}


// Set up module
TinyDB.getPunchcardByID = getPunchcardByID;
TinyDB.getPunchcardsForUser = getPunchcardsForUser;
TinyDB.getPunchCardsForUserAndMerchant = getPunchCardsForUserAndMerchant;
TinyDB.getUserByID = getUserByID;
TinyDB.incrementPunchCard = incrementPunchCard;
TinyDB.makeNewPunchCard = makeNewPunchCard;
TinyDB.resetPunchCard = resetPunchCard;
TinyDB.init = init;

// Export
module.exports = TinyDB;