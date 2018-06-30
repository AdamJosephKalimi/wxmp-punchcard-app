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
  var punchcards = wx.getStorageSync('data').punchcards;
  var items =  punchcards.filter( elem => punchcard.user === userId )
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
TinyDB.getUserByID = getUserByID;
TinyDB.incrementPunchCard = incrementPunchCard;
TinyDB.init = init;

// Export
module.exports = TinyDB;