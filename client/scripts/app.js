// YOUR CODE HERE:

var app = {
  friendList: [],
  server: 'https://api.parse.com/1/classes/messages',
  sending: false,
  init: function() {
    $('.username').click(function() {app.addFriend($(this).text())});
    this.handleSubmit();
  },
  handleSubmit: function(text) {
    $('#send').submit(function() {
      if(!app.sending) {
        app.sending = true;
        app.send(text);
        app.sending = false}
      });
  },
  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log('chatterbox: Message sent');
      },
      error: function(data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  fetch: function() {
    $.ajax({
      url: app.server,
      type: 'GET',
      contentType: 'application/json',
      success: function(data) {
        console.log(data);
      },
      error: function(data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  clearMessages: function() {
    $('#chats').html('');
  },
  addMessage: function(message) {
    $('#chats').append(`<div class=chat><span class = username>${message.username}</span> <span class = message>: ${message.text} </span></div>`)
  },
  addRoom: function(room) {
    return $('#roomSelect').append(`<div class=room> ${room} </div>`);
  },
  addFriend: function(friend) {
    if(this.friendList.indexOf(friend) === -1) 
      this.friendList.push(friend);
    return this.friendList;
  },
};






























//Proper Escaping for User Input









// var escapeString = function(str) {
//   escapeCharacters = ['<', '>', '\\', '\/', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '{', '}', '[', ']', '|', '~', '`', '?'];
//   for (var i = 0; i < escapeCharacters.length; i++);
//   var result = str.replace(`/${escapeCharacters[i]}/g`, `${escapeCharacters[i]}`);
//   console.dir(JSON.stringify(str));
//   console.dir(JSON.stringify(result));
//   return result;
// }

// var app = {};

// app.server = 'https://api.parse.com/1/classes/messages';

// app.init = function() {
//  friendList = [];
//  this.fetch();
//  this.handleSubmit();
//  this.clickHandler();

// };
// app.clickHandler = function(){
//  $('.username').on('click', function(event) {
//  window.app.addFriend($(this).text());
//  });
// };
// app.handleSubmit = function() {
//  $(".submit").submit(function(){
//    console.log($('#message').val());
//         app.send($('#message').val());
//     });
// }

// app.chatDisplay = function(data) {
//  for(var i = 0; i < data.length; i++) {
//    app.addMessage(data[i]);
//  }
// }

// app.send = function(message) {
//   $.ajax({
//     // This is the url you should use to communicate with the parse API server.
//     url: app.server,
//     type: 'POST',
//     data: JSON.stringify(message),
//     contentType: 'application/json',
//     success: function(data) {
//       console.log('chatterbox: Message sent');
//     },
//     error: function(data) {
//       // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//       console.error('chatterbox: Failed to send message', data);
//     }
//   });
// };
// app.fetch = function() {
//  $.ajax({
//     // This is the url you should use to communicate with the parse API server.
//     url: this.server,
//     type: 'GET',
//     contentType: 'jsonp',
//     success: function(data) {
//      console.log(data);
//      app.chatDisplay(data);
//     },
//     error: function(data) {
//       // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//       console.error('chatterbox: Failed to pull data', data);
//     }
//   });
// }
// app.clearMessages = function() {
//  $('#chats').html('');
// }
// app.addMessage = function(message) {
//  $('#chats').append(`<div class=chat><span class = username>${message.username}</span> <span class = message>: ${message.text} </span></div>`);
// }

// app.addRoom = function(roomName) {
//  $('#roomSelect').append(`<div class=room> ${roomName} </div>`);
// }

// app.addFriend = function(friend) {
//  friendList.push(friend);
// }
//Display Messages





//Post Messages






//











// $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//   url: 'https://api.parse.com/1/classes/messages',
//   type: 'POST',
//   data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log('chatterbox: Message sent');
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message', data);
//   }
// });


//PARSE POSTING API :
// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };
