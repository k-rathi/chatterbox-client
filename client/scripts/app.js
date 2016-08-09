// YOUR CODE HERE:
$(document).ready(function() {
  userName = window.location.href.split('=')[1];
  $("#btnSubmit").click(function() {
    console.log(this);
    app.send({ 'username': userName, 'text': $('#message').val(), 'roomname': app.roomName});
    $('#message').html('');
    return false;
  });
  $('select').change(function (){
    app.roomName = $('select option:selected').text();
    app.clearMessages();
    console.log(app.currentData);
    app.newest = 1;
    app.display(app.currentData);
  });
  $('#chats').on('click', '.username', function() { 
      app.addFriend($(this).text());
  });
});
      
var app = {
  friendList: [],
  currentData: 'x',
  server: 'https://api.parse.com/1/classes/messages',
  date: new Date(),
  rooms: [],
  roomName : 'lobby',
  init: function() {
    setInterval(this.fetch, 1000);
    // this.handleSubmit();
  },
  // handleSubmit: function() {
  //   $('#send').click(function() {
  //       console.log(this);
  //       app.send({'username': window.username, 'text': $('#message').html()});
  //       $('#message').html('');
  //       return false;
  //     });
  // },
  newest: 1,
  display: function(chats) {
    for (var i = chats.results.length - 1; i >= 0; i--) {
      if (new Date(chats.results[i].createdAt) > new Date(this.newest)) {
        if(this.roomName === chats.results[i].roomname) {
          this.addMessage(chats.results[i]);
        }
      }
    }
    this.newest = chats.results[0].createdAt;
  },
  send: function(message) {
    console.log(message);
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
        app.currentData = data;
        app.display(data);
        for(var i = 0; i < data.results.length; i++) {

          if(app.rooms.indexOf(data.results[i].roomname) === -1) {
            app.rooms.push(data.results[i].roomname);
            console.log(data.results[i]);
          $('select').append('<option>' + data.results[i].roomname + '</option>');
          }
        }
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
    var usr = '';
    for (var i = 0; i < message.username.length; i++) {
      if (message.username[i] !== ' ') {
        usr += message.username[i];
      }
    }
    $('#chats').prepend('<div class="chat ' + app.roomName  + ' ' + this.removeSpaces(message.username) +'"><span class = username>' +  window.escapeHtml(message.username) + '</span> <span class = message>' + window.escapeHtml(message.text) + '</span><span>' + window.escapeHtml(message.roomname) + '</span></div>');
  },
  addRoom: function(room) {
    return $('#roomSelect').append(`<div class=room> ${room} </div>`);
  },
  addFriend: function(friend) {
    if(this.friendList.indexOf(friend) === -1) {
      this.friendList.push(friend);
      $('.' + this.removeSpaces(friend)).addClass('friend');
    } else {
      app.friendList.splice(app.friendList.indexOf(friend), 1);
      $('.' + this.removeSpaces(friend)).removeClass('friend');
    }
    return this.friendList;
  },
  removeSpaces: function(str) {
    var usr = '';
    for (var i = 0; i < str.length; i++) {
      if (str[i] !== ' ') {
        usr += str[i];
      }
    }
    return usr;
  }
};

app.init();



























//Proper Escaping for User Input








 var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

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
var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};
