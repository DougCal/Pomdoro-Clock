$(document).ready(function () {
  
  var secs = '59';
  var bool = false;
  var breakOrSessBool = false;
  var intervalID;

  $('#sessMinus').click(function() {  //when the minus is clicked under session time, minus one on session time

    secs = '59';
    
    if ( $('#sessOrBreak').text() === 'Session')
      clearInterval(intervalID);    
    
    var sessTime = $('#sessNum h2').text();
    
    if(sessTime === '0')
      return;
    
    +sessTime--;
    
    $('#sessNum h2').text(sessTime);
    $('#timeClock').text(sessTime);
  });
  
  $('#sessPlus').click(function() {  //when the plus is clicked under session time, plus one on session time

    secs = '59';
    
    if ( $('#sessOrBreak').text() === 'Session')
      clearInterval(intervalID);
    
    var sessTime = $('#sessNum h2').text();
    
    +sessTime++;
    
    $('#sessNum h2').text(sessTime);
    $('#timeClock').text(sessTime);
  });
  
  $('#breakPlus').click(function() { //when the plus is clicked under break length, plus one on break length

    var breakTime = $('#breakNum h2').text();
    
    +breakTime++;
    
    $('#breakNum h2').text(breakTime);
  });
  
  $('#breakMinus').click(function() {  //when the minus is clicked under break length, minus one on break length

    var breakTime = $('#breakNum h2').text();
    
    +breakTime--;
    
    $('#breakNum h2').text(breakTime);
  });
  
  /* 
  A countdown that is implemented via recursion 
  */
  
  $('.time').on('click.time', function counting() { console.log('it worked');
    
    $('#timeClock').removeClass('time').off('click.time');
    if ( !$('#timeClock').hasClass('pauseInterval')) {
      $('#timeClock').addClass('pauseInterval').on('click.pauseInterval', function() { 
        clearInterval(intervalID);
        $('#timeClock').removeClass('pauseInterval').off('click.pauseInterval');
        $('#timeClock').addClass('time').on('click.time', counting);
      });
    }
                                             
    var sessNum = $('#timeClock').text()
    console.log(sessNum);
    if (sessNum === '0') {
      
      return;
      
    } else if (sessNum.split(':').length > 1) {
      
      var newTime = sessNum;
      sessNum = newTime.split(':')[0];
      secs = newTime.split(':')[1];
    }
    
    intervalID = setInterval(countDown, 1000);

    function countDown() {
    
      var time;
      
      if (sessNum === $('#sessNum h2').text() || bool) {  //if this is the first second, add secs as a string to sessNum + ':'
        
        +sessNum--;
        
        time = sessNum + ':' + secs;
        bool = false;

        return $('#timeClock').text(time);

      } else if ($('#timeClock').text() === '0:00') {
        
        if (!breakOrSessBool) {
          
          alert('Take a ' + $('#breakNum h2').text() + ' minute break!');
          breakOrSessBool = true;
          $('#timeClock').text($('#breakNum h2').text());
          $('#sessOrBreak').text('Break');
          
        } else {
          
          alert('Get back to work for ' + $('#sessNum h2').text() + ' minutes!');
          breakOrSessBool = false;
          $('#timeClock').text($('#sessNum h2').text());
          $('#sessOrBreak').text('Session');
        }
          
        clearInterval(intervalID);
        
        bool = true;
        
        secs = '59';
        
        counting();
        
      } else if (secs === 0) {
        
        +sessNum--;
        
        secs = '59';
        time = sessNum + ':' + secs;

        return $('#timeClock').text(time);  

      } else if (secs === 10 || secs.toString().length === 1) {  // when secs becomes 10 or a single digit, add ':0' + secs to sessNum into the var time
        
        +secs--;

        time = sessNum + ':0' + secs;

        return $('#timeClock').text(time);

      } else {

        +secs--;

        time = sessNum + ':' + secs;

        return $('#timeClock').text(time);

      }

    }

  });
});