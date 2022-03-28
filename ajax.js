"use strict";

var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
var records = []; // элемент массива - {name:'Иванов',score:'100'};
var updatePassword;
var stringName='TOMASHEVA_BEATIT';

/*function addString() {
  console.log("Сейчас добавим строку");
  $.ajax({
    url: ajaxHandlerScript,
    type: "POST",
    dataType: "json",
    data: { f: "INSERT", n: stringName, v: JSON.stringify({ name:'first player', score:100 }) },
    cache: false,
    success: stringWasAdded,
    error: errorHandler,
  });
}
function stringWasAdded() {
  console.log("Строка была добавлена");
}

addString();*/

function showRecords() {
    var str='';
    for ( var i=0; i<records.length; i++ ) {
        var record=records[i];
        str+="<b>"+`${i+1}) `+escapeHTML(record.name)+":</b> "
            +record.score+"<br />";
    }
    var recordsTable = document.querySelector('#records>div');
    recordsTable.innerHTML=str;
      console.log(recordsTable.innerHTML);
  anim5();
}

function escapeHTML(text) {
    if ( !text )
        return text;
    text=text.toString()
        .split("&").join("&amp;")
        .split("<").join("&lt;")
        .split(">").join("&gt;")
        .split('"').join("&quot;")
        .split("'").join("&#039;");
    return text;
}

// получает строку с сервера и потом показывает
function refreshRecords() {
    $.ajax( {
            url : ajaxHandlerScript,
            type : 'POST', dataType:'json',
            data : { f : 'READ', n : stringName },
            cache : false,
            success : readReady,
            error : errorHandler
        }
    );
}

function readReady(callresult) { 
    if ( callresult.error!=undefined )
        alert(callresult.error);
    else {
        records=[];
        if ( callresult.result!="" ) { 
            records=JSON.parse(callresult.result);
            if ( !Array.isArray(records) )
                records=[];
        }
        showRecords();
    }
}

// получает строку с сервера, добавляет новое, сохраняет на сервере
function sendRecord() {
    updatePassword=Math.random();
    $.ajax( {
            url : ajaxHandlerScript,
            type : 'POST', dataType:'json',
            data : { f : 'LOCKGET', n : stringName,
                p : updatePassword },
            cache : false,
            success : lockGetReady,
            error : errorHandler
        }
    );
}

function lockGetReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
    else {
        records=[];
        if ( callresult.result!="" ) { 
            records=JSON.parse(callresult.result);
            if ( !Array.isArray(records) )
                records=[];
        }
        var playerName;
      if (playerNameField) {
        playerName = playerNameField.value;
      } else playerName = 'Unknown player';
      console.log(playerName);
        var record=scoreEl.innerHTML;
        if (+ records[records.length-1].score < +record||records.length==0) {
          records.push( { name:playerName, score:record } );
        };
        records.sort(compareScore);
        if ( records.length>10 )
            records.splice(records.length-1,1);

        $.ajax( {
                url : ajaxHandlerScript,
                type : 'POST', dataType:'json',
                data : { f : 'UPDATE', n : stringName,
                    v : JSON.stringify(records), p : updatePassword },
                cache : false,
                success : updateReady,
                error : errorHandler
            }
        );
    }
}

// строка вместе с новым сохранены на сервере
function updateReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
}

function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
}

function compareScore(a,b) {
return b.score-a.score;
}








