const _ = require('../vendor/underscore');
var data = require('./db.js');

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
  return userPunchCards;
}

let getPunchcardByID = function(punchcardID) {
  var data = wx.getStorageSync('data');
  var punchcard = data.punchcards.find(elem => elem.id === punchcardID);
    return punchcard;   
}

let getPunchCardsForUserAndMerchant = function (userId, merchantID) {
  var punchcards = wx.getStorageSync('data').punchcards;
  var items = punchcards.filter(elem => elem.user === userId)
  var commonitems = items.filter(elem => elem.merchant === merchantID)
  if (!commonitems) {
    console.warn("cant find common punchcards for user ", userId, " and merchant ", merchantID)
  }
  return commonitems;
}

// SET functions
let incrementPunchCard = function(punchcardID, data) {
  var data = wx.getStorageSync('data');
  var item = data.punchcards.find(elem => elem.id === punchcardID);
  item.currentPunches += 1;
  wx.setStorageSync('data', data)

  return data;
}


// Set up module
TinyDB.getPunchcardByID = getPunchcardByID;
TinyDB.getPunchcardsForUser = getPunchcardsForUser;
TinyDB.getPunchCardsForUserAndMerchant = getPunchCardsForUserAndMerchant;
TinyDB.getUserByID = getUserByID;
TinyDB.incrementPunchCard = incrementPunchCard;
TinyDB.init = init;

// Export
module.exports = TinyDB;