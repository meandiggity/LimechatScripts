///////////////////////////////////////////////////
//Config
//ƒ`ƒFƒbƒN‚·‚é•ú‘—ˆê——
array = new Array("mean_diggity","forcezoo","milk_ruku","faitan0703","tomato_tmt","du_zhong_tea");

//true‚ÅƒXƒNƒŠƒvƒgƒ[ƒh‚É•ú‘—‚Ì—L–³‚ğƒ`ƒFƒbƒN‚µ‚Ü‚·
checkEventOnLoad = true;

//true‚ÅŒJ‚è•Ô‚µ•ú‘—‚Ì—L–³‚ğƒ`ƒFƒbƒN‚µ‚Ü‚·
checkRoop = true

//ƒ`ƒFƒbƒNŠÔŠu(•b)
roopTime = 60;

//true‚ÅƒfƒoƒbƒO—p‚ÌƒƒOo—Í‚ğ—LŒø‚É‚µ‚Ü‚·
debugFlag = false;

//true‚Åƒ‹[ƒvÀs‚Ì•ú‘—‚µ‚Ä‚¢‚È‚¢ƒ`ƒƒƒ“ƒlƒ‹‚ÌƒƒbƒZ[ƒWo—Í‚ğ—LŒø‚É‚µ‚Ü‚·
roopCheckOutputNotStreamMessage = false;
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//“±“ü•û–@
//(1)Limechat2‚ğÀs
//(2)[İ’è(O)]-[ƒXƒNƒŠƒvƒg‚Ìİ’è(C)]-[ƒXƒNƒŠƒvƒgƒtƒHƒ‹ƒ_‚ğŠJ‚­(F)]‚ğ‘I‘ğ
//(3)ŠJ‚¢‚½ƒtƒHƒ‹ƒ_‚É‚±‚Ìƒtƒ@ƒCƒ‹‚ğƒRƒs[
//(4)ƒXƒNƒŠƒvƒg‚Ìİ’è‚æ‚èAJustinStatusChecker‚Ì”CˆÓ‚ÌƒT[ƒo˜g‚ğ‰EƒNƒŠƒbƒN‚µA›‚ğ•t‚¯‚é
//   iIRCƒT[ƒo‚Æ˜AŒg‚µ‚½‚è‚µ‚È‚¢‚½‚ßA‚Ç‚ÌƒT[ƒo˜g‚É›‚ğ•t‚¯‚Ä‚à‚©‚Ü‚¢‚Ü‚¹‚ñBj
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//Update
//2013.05.14 ‚Æ‚è‚ ‚¦‚¸ì¬B
//
//////////////////////////////////////////////////

function checkAllJustinStream(array){
   for(i=0; i<=array.length-1; i++){
      var channelName=array[i];
      checkJustinStream(channelName,roopCheckOutputNotStreamMessage);
   }
}

function checkJustinStream(channelName,notStreamMessage){
   if(debugFlag){
      log("[info]" + channelName + " ã®æ”¾é€ã®æœ‰ç„¡ã‚’ãƒã‚§ãƒƒã‚¯ã—ã¾ã™ã€‚execute:checkJustinStream()");
   }
   var xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");

   xmlHttpRequest.onreadystatechange = function()
   {
       var READYSTATE_COMPLETED = 4;
       var HTTP_STATUS_OK = 200;

       if( xmlHttpRequest.readyState == READYSTATE_COMPLETED
        && xmlHttpRequest.status == HTTP_STATUS_OK )
       {
           if( xmlHttpRequest.getResponseHeader( 'Content-Type' ) == 'application/json' )
           {
               // å–å¾—ã—ãŸJSONãƒ‡ãƒ¼ã‚¿ã«ãƒãƒ£ãƒ³ãƒãƒ«æƒ…å ±ãŒã‚ã‚‹å ´åˆ
               if(xmlHttpRequest.responseText.length!=2){
                  var data = eval( '(' + xmlHttpRequest.responseText + ')' );
                  if(debugFlag){
                     log("[output]live  :" + data[0].channel.login + " (URL:" + data[0].channel.channel_url + ")");
                  }
                  print("live  :" + data[0].channel.login + " (URL:" + data[0].channel.channel_url + ")");
               }else if(notStreamMessage){
                  if(debugFlag){
                     log("[output]" + channelName + "ã¯æ”¾é€ã—ã¦ã„ã¾ã›ã‚“");
                  }
                  print(channelName + "ã¯æ”¾é€ã—ã¦ã„ã¾ã›ã‚“");
               }
           }
       }
   }

   var requestUrl = 'http://api.justin.tv/api/stream/list.json?channel=' + channelName;
   if(debugFlag){
      log("[info]ãƒã‚§ãƒƒã‚¯APIã«ã‚¢ã‚¯ã‚»ã‚¹ã—ã¾ã™ã€‚:" + requestUrl);
   }

   xmlHttpRequest.open( 'GET', requestUrl );
   xmlHttpRequest.send( null );
}

function checkAll(){
   if(debugFlag){
      log("[info]ã™ã¹ã¦ã®ãƒãƒ£ãƒ³ãƒãƒ«ã‚’ãƒã‚§ãƒƒã‚¯ã—ã¾ã™ã€‚execute:checkAll()");
   }
   checkAllJustinStream(array);
}

function setTimer(func,interval)
{
    var now = new Date().getTime();
    var next = (Math.floor(now / interval) +1) * interval;
    setTimeout(function(){func();setTimer(func,interval)}, next - now);    
}

function event::onLoad(prefix, channel, text) {
   if(checkEventOnLoad){
      checkAll();
   }

   if(checkRoop){
      if(debugFlag){
         log("[info]" + roopTime + "ç§’æ¯ã«ãƒã‚§ãƒƒã‚¯ã—ã¾ã™");
      }
      setTimer(checkAll,roopTime * 1000);
   }
}

function event::onJoin(prefix, channel) {
checkJustinStream(channel,roopCheckOutputNotStreamMessage);
}

function event::onSendingCommand(command, param, context){
   if (command == "CHECKALL"){
      if(debugFlag){
         log("[info]/checkallã‚³ãƒãƒ³ãƒ‰ãŒå®Ÿè¡Œã•ã‚Œã¾ã—ãŸ");
      }
      context.handled = true
      checkAll();
   }else if  (command == "CHECK"){
      if(debugFlag){
         log("[info]/checkã‚³ãƒãƒ³ãƒ‰ãŒå®Ÿè¡Œã•ã‚Œã¾ã—ãŸã€‚å¼•æ•°:" + param);
      }
      context.handled = true
      checkJustinStream(param,true);
   }
}