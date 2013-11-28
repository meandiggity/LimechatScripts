/////////////////////////////////////////////////////////////////
//Config
/////////////////////////////////////////////////////////////////
//DodontofServer.rb‚Ü‚Å‚ÌURL
cgi = "http://moelive.com/html/DodontoF/DodontoFServer.rb";

//ƒy[ƒW‚Ì“Ç‚İ‚İŠÔŠu(ms)
intervalTime=2000;

//ƒ`ƒƒƒbƒg‚ğæ“¾‚·‚é”ÍˆÍ(s)
//all‚Í”ñ„§Bƒy[ƒW“Ç‚İ‚İŠÔŠu(ms)‚Æ“¯‚¶‚É‚·‚é‚Æ—Ç‚¢B
pagesec=2;

//true‚ÅƒfƒoƒbƒO—p‚ÌƒƒOo—Í‚ğ—LŒø‚É‚µ‚Ü‚·
debugFlag = false;

//–¢À‘•€–Ú
//–_“Ç‚İ‚¿‚á‚ñ‚É“Ç‚İã‚°‚³‚¹‚é‚©‚Ç‚¤‚©B(true:“Ç‚Ş, false:“Ç‚Ü‚È‚¢)
talkOn = true;

/////////////////////////////////////////////////////////////////
//ŠT—v
/////////////////////////////////////////////////////////////////
//–{ƒXƒNƒŠƒvƒg‚ÍA‚Ç‚Ç‚ñ‚Æ‚Ó‚Ìƒ`ƒƒƒbƒg‚ğALimechat2‚É“]‘—‚·‚é‚½‚ß‚ÌƒXƒNƒŠƒvƒg‚Å‚·
//Limechat2‚Ì[İ’è]¨[ƒXƒNƒŠƒvƒg‚Ìİ’è]‚æ‚è“±“ü‚µ‚Ä—˜—p‚µ‚Ä‚­‚¾‚³‚¢B
//
//g‚¢•ûB
//(1)ƒ†[ƒU[İ’è‚©‚çADodontofServer.rb‚Ü‚Å‚ÌURL‚ğ‹Lq
//(2)Limechat2‚ÌƒXƒNƒŠƒvƒg‹@”\‚ÉA–{ƒXƒNƒŠƒvƒg‚ğ“±“ü‚³‚¹‚éB
//(3)u/startdodontof ƒ‹[ƒ€”Ô†:ƒpƒXƒ[ƒhv ‚Ì‘®‚ÅƒRƒ}ƒ“ƒh‚ğ“ü—Í
//    ƒ‹[ƒ€‚ÉƒpƒXƒ[ƒh‚ªİ’è‚³‚ê‚Ä‚¢‚È‚¢ê‡‚ÍAu/getmessage ƒ‹[ƒ€”Ô† ƒpƒXƒ[ƒhv
//(4)’â~‚·‚é‚Íu/stopdodontof ƒ‹[ƒ€”Ô†v‚ğÀs‚µ‚Ä‚­‚¾‚³‚¢B
//
//
//
/////////////////////////////////////////////////////////////////
//Update
//2012.?.? ‚Æ‚è‚ ‚¦‚¸ì¬B
//
//2013.06.22 URL‚Ìƒ`ƒFƒbƒN‹@”\‚ğ’Ç‰ÁB
//           URL‚Ì––”ö‚ªDodontoFServer.rb‚Å‚È‚¢ê‡‚ÉƒGƒ‰[ƒƒbƒZ[ƒW‚ğ“f‚­‚æ‚¤‚É‚µ‚½B
//
//2013.07.14 ƒ_ƒCƒX‚Ì“ÁêƒƒbƒZ[ƒW‚ğ®Œ`‚·‚é‚æ‚¤‚É‚µ‚½B
//           ‰üs‚ğŠÜ‚ŞƒƒbƒZ[ƒW‚ğæ“¾‚µ‚½Û‚ÉƒGƒ‰[‚ª‚Å‚é•s‹ï‡‚ğC³B
/////////////////////////////////////////////////////////////////

timer = new Array(10000);
array = new Array(100);

//ç‰¹æ®Šãƒ¡ãƒƒã‚»ãƒ¼ã‚¸ã®æ­£è¦è¡¨ç¾
diceRegExp = new RegExp("^###CutInCommand:rollVisualDice###[\\w\\W]+chatMessage[\\W\\w]+\\\\n([\\W\\w]+)\"\,\"randResults","i");

//æŒ‡å®šURLã®é©æ€§ãƒã‚§ãƒƒã‚¯
if("DodontoFServer.rb" != cgi.substring(cgi.length-"DodontoFServer.rb".length)){
   print("[ERROR]CGIURLã«DodontoFServer.rbã¸ã®URLãŒæŒ‡å®šã•ã‚Œã¦ã„ã¾ã›ã‚“ã€‚" + cgi);
   if(debugFlag){
      log("[ERROR]CGIURLã«DodontoFServer.rbã¸ã®URLãŒæŒ‡å®šã•ã‚Œã¦ã„ã¾ã›ã‚“ã€‚" + cgi);
   }
}

function sleep(T){
   var d1 = new Date().getTime();
   var d2 = new Date().getTime();
   while( d2 < d1+1000*T ){    //Tç§’å¾…ã¤
      d2=new Date().getTime();
   }
   d1=null;
   d2=null;
   return;
} 

function getmessage(roomparams,selectedChannel){
   url=cgi + "?webif=chat&room=" + roomparams[0] + "&password=" + roomparams[1] + "&sec=" + pagesec;
   if(debugFlag){
      log("[info]ãƒ¡ãƒƒã‚»ãƒ¼ã‚¸å–å¾—CGIã«æ¥ç¶šã—ã¾ã™:"+url);
   }
   if(selectedChannel.active){
      var req = new ActiveXObject("Microsoft.XMLHTTP");
      if (req) {
         req.onreadystatechange = function() {
            if (req.readyState == 4) {
               if(debugFlag){
                  log("[info]GET OK: " + req.responseText.length);
               }
               if(req.responseText.length!=0){
                  var data = eval("("+req.responseText+")");
                  if(debugFlag){
                     log("[info]ãƒ¡ãƒƒã‚»ãƒ¼ã‚¸ã®æ•°:" +data.chatMessageDataLog.length);
                  }
                  for(var messages=0;messages<data.chatMessageDataLog.length;messages++){
                     var uuid = data.chatMessageDataLog[messages][0];
                     var username=data.chatMessageDataLog[messages][1].senderName;
                     var message=data.chatMessageDataLog[messages][1].message;
                     var channel=data.chatMessageDataLog[messages][1].channel;
                     
                     //ç‰¹æ®Šãƒ¡ãƒƒã‚»ãƒ¼ã‚¸ã®åˆ¤å®š
                     //ãƒ€ã‚¤ã‚¹ã®å ´åˆ
                     if(message.match(diceRegExp)){
                        message = RegExp.$1;
                        if(debugFlag){
                           log("[info]ãƒ€ã‚¤ã‚¹ãƒ­ãƒ¼ãƒ«ãƒ¡ãƒƒã‚»ãƒ¼ã‚¸ã‚’å–å¾—ã—ã¾ã—ãŸã€‚ãƒ¡ãƒƒã‚»ãƒ¼ã‚¸ã‚’æ•´å½¢ã—ã¾ã™ã€‚" + username + ":" + message);
                        }
                     }else{
                         if(debugFlag){
                           log("[info]é€šå¸¸ãƒ¡ãƒƒã‚»ãƒ¼ã‚¸ã‚’å–å¾—ã—ã¾ã—ãŸã€‚" + username + ":" + message);
                        }
                     }

                     var sendflg=1;
                     
                     //æŠ•ç¨¿æ¸ˆã¿ã‹ãƒã‚§ãƒƒã‚¯
                     if(debugFlag){
                        log("[info]" +uuid + "ã®ç™ºè¨€ã‚’æŠ•ç¨¿æ¸ˆã¿ã‹ãƒã‚§ãƒƒã‚¯ã—ã¾ã™ã€‚ " + username + ":" + message);
                     }
                     for(i=0;i<=array.length;i++){
                        if(array[i]==uuid){
                           sendflg=0;
                           if(debugFlag){
                              log("[info]æŠ•ç¨¿æ¸ˆã¿ã§ã—ãŸã€‚ " + username + ":" + +message);
                           }
                        }
                     }
                     
                     //ãƒ«ãƒ¼ãƒ ç•ªå·ã‚’ãƒã‚§ãƒƒã‚¯
                     if(debugFlag){
                        log("[info]" +uuid + "ã®ç™ºè¨€ã®ãƒ«ãƒ¼ãƒ ç•ªå·ã‚’ãƒã‚§ãƒƒã‚¯ã—ã¾ã™ã€‚ " + username + ":" + message);
                     }
                     if(channel!=0){
                        sendflg=0;
                        if(debugFlag){
                           log("[info]mainã‚¿ãƒ–ã®ç™ºè¨€ã§ãªã„ãŸã‚ã‚¹ã‚­ãƒƒãƒ—ã—ã¾ã™ã€‚" + username + ":" + message);
                        }
                     }
                     
                     
                     if(sendflg==1){
                        if(debugFlag){
                           log("[info]æŠ•ç¨¿ã—ã¦ã„ã¾ã›ã‚“ã§ã—ãŸ");
                        }
                        array.unshift(uuid);
                        if(array[9]!=null){
                           array.pop();
                        }
                        username=username.replace(/\t/i,"");
                        message=message.replace(/\n/i,"\t");
                        if(debugFlag){
                           log("[info] sendmessage:" +username+ ":" +message);
                        }
                        
                        //ãƒ¡ãƒƒã‚»ãƒ¼ã‚¸é€ä¿¡ã¯ã˜ã‚
                        var sendMessage=message;
                        while(sendMessage.match(/^([^\n\r]*)[\n\r]([\w\W]*)$/)){
                           log(RegExp.$2);
                           sendMessage = RegExp.$2;
                           send(selectedChannel.name, "(" +username+ ")" + RegExp.$1);

                           //æ£’èª­ã¿ã¡ã‚ƒã‚“ã‚¹ã‚¯ãƒªãƒ—ãƒˆç”¨
                           if(talkOn){
                              addTalkTask(username +" "+ RegExp.$1);
                           }
                        }
                        send(selectedChannel.name, "(" +username+ ")" +sendMessage);
                        //æ£’èª­ã¿ã¡ã‚ƒã‚“ã‚¹ã‚¯ãƒªãƒ—ãƒˆç”¨
                        if(talkOn){
                           addTalkTask(username +" "+ sendMessage);
                        }

                        sendMessage=null;
                        //ãƒ¡ãƒƒã‚»ãƒ¼ã‚¸é€ä¿¡çµ‚ã‚ã‚Š

                        if(!appActive){
                           showBalloon("æ–°ã—ã„ãƒ¡ãƒƒã‚»ãƒ¼ã‚¸ã‚’å—ä¿¡ã—ã¾ã—ãŸ", username+ "ã•ã‚“ã®ç™ºè¨€\n" +message);
                        }
                     }
                     uuid=null;
                     username=null;
                     message=null;
                     channel=null;
                     sendflg=null;
                  }
                  data=null;
               }
            }
         }
         req.open('GET', url, true);
         req.setRequestHeader('Pragma', 'no-cache');
         req.setRequestHeader('Cache-Control', 'no-cache');
         req.setRequestHeader('If-Modified-Since', 'Thu, 01 Jun 1970 00:00:00 GMT');
         req.send('');
      }
   }else{
      selectedChanne.print("[info]å¯¾è±¡ã®ãƒãƒ£ãƒ³ãƒãƒ«ã«å…¥å®¤ã—ã¦ã„ã¾ã›ã‚“ã€‚ã‚¿ã‚¤ãƒãƒ¼ã‚’åœæ­¢ã—ã¾ã™");
      if(debugFlag){
         if(debugFlag){
            log("ã‚¿ã‚¤ãƒãƒ¼ãƒãƒ³ãƒ‰ãƒ©:"+ timer[roomparams[0]]);
         }
      }
      clearInterval(timer[roomparams[0]]);
      return 0;
   }
}



function event::onSendingCommand(command, param, context){
   if(command == "STARTDODONTOF"){//ãƒ¡ãƒƒã‚»ãƒ¼ã‚¸ã®å–å¾—é–‹å§‹ã‚³ãƒãƒ³ãƒ‰
      context.handled = true;
      if(param != ""){
      params = param.split(":");
         if(selectedChannel.active){
            selectedChannel.print("[info]ã©ã©ã‚“ã¨ãµãƒ­ã‚°ã®å–å¾—ã‚’é–‹å§‹ã—ã¾ã™: ãƒ«ãƒ¼ãƒ ç•ªå·" +params[0]+", ãƒ‘ã‚¹ãƒ¯ãƒ¼ãƒ‰"+params[1]);
            selectedChannel.print("[info]æ¬¡ã®ãƒãƒ£ãƒ³ãƒãƒ«ã«å‡ºåŠ›ã—ã¾ã™:" +selectedChannel.name);
            selectedChannel.print("[info]/stopdodontofã‚³ãƒãƒ³ãƒ‰ã‚’å®Ÿè¡Œã—ã¦ãã ã•ã„ã€‚");
            selectedChannel.print("[info]usage:/stopdodontof roomidã€‚");
            timer[params[0]] = setInterval(function(){getmessage(params,selectedChannel);},intervalTime); 
            if(debugFlag){
               log("ã‚¿ã‚¤ãƒãƒ¼ãƒãƒ³ãƒ‰ãƒ©:"+ timer[params[0]]);
            }
         }else{
            print("[ERROR] å…¥å®¤ã—ã¦ã„ã‚‹ãƒãƒ£ãƒ³ãƒãƒ«ã‚’é¸æŠã—ã¦ãã ã•ã„");
         }
      }else{
         print("[ERROR] usage:/startdodontof RoomID:RoomPassword");
      }
   }
   if(command == "STOPDODONTOF"){//ãƒ¡ãƒƒã‚»ãƒ¼ã‚¸ã®ã‚¹ãƒˆãƒƒãƒ—ã‚³ãƒãƒ³ãƒ‰
      context.handled = true;
      if(param != ""){
         print("[info]ã‚¿ã‚¤ãƒãƒ¼ã‚’åœæ­¢ã—ã¾ã™");
         if(debugFlag){
            log("ã‚¿ã‚¤ãƒãƒ¼ãƒãƒ³ãƒ‰ãƒ©:"+ timer[params[0]]);
         }
         clearInterval(timer[param]);
      }else{
         log("[ERROR] usage:/stopdodontof roomid");
         print("[ERROR] usage:/stopdodontof roomid");
      }
   }
}





//æ£’èª­ã¿ã¡ã‚ƒã‚“ã‚¹ã‚¯ãƒªãƒ—ãƒˆã‚ˆã‚ŠæŠœç²‹
//ã“ã®éƒ¨åˆ†ã¯æ£’èª­ã¿ã¡ã‚ƒã‚“æœ¬å®¶ã®ã‚¹ã‚¯ãƒªãƒ—ãƒˆã‹ã‚‰ã‚³ãƒ”ãƒšã—ãŸã‚‚ã®ã§ã™ã€‚
//ãã®ãŸã‚ã€ã“ã“ã‚ˆã‚Šä¸‹ã®éƒ¨åˆ†ã¯ç·¨é›†ã—ãªã„ã§ãã ã•ã„ã€‚
////////////////////////////////////////////////////////////////////////////////////////////////////
//â– è¨­å®š

//ç™ºè¨€è€…ã®åå‰ã‚’èª­ã¿ä¸Šã’ã‚‹ã‹ã©ã†ã‹(true:èª­ã‚€, false:èª­ã¾ãªã„)
var bNick = true;

//å…¥å‡ºæƒ…å ±ã‚’èª­ã¿ä¸Šã’ã‚‹ã‹ã©ã†ã‹(true:èª­ã‚€, false:èª­ã¾ãªã„)
var bInOut = false;

////////////////////////////////////////////////////////////////////////////////////////////////////

var sRemoteTalkCmd = null;
var oShell;
var oWmi;

function addTalkTask(text) {
	if(sRemoteTalkCmd == null) {
		findRemoteTalk();
		if(sRemoteTalkCmd == null) {
			log("RemoteTalkãŒè¦‹ã¤ã‹ã‚‰ãªã„ã®ã§ã‚¹ã‚­ãƒƒãƒ—-" + text);
			return;
		}
	}
	
	oShell.Run(sRemoteTalkCmd + " \"" + text.replace("\"", " ") + "\"", 0, false);
}

function findRemoteTalk() {
	var proc = oWmi.ExecQuery("Select * from Win32_Process Where Name like 'BouyomiChan.exe'");
	var e    = new Enumerator(proc);
	for(; !e.atEnd(); e.moveNext()) {
		var item = e.item();
		
		var path = item.ExecutablePath.replace("\\BouyomiChan.exe", "");
		sRemoteTalkCmd = "\"" + path + "\\RemoteTalk\\RemoteTalk.exe\" /T";
		
		log("æ£’èª­ã¿ã¡ã‚ƒã‚“æ¤œå‡º:" + path);
	}
}


function event::onLoad() {
	oShell = new ActiveXObject("Wscript.Shell");
	oWmi   = GetObject("winmgmts:\\\\.\\root\\cimv2");
	
	//addTalkTask("ãƒ©ã‚¤ãƒ ãƒãƒ£ãƒƒãƒˆã¨ã®é€£æºã‚’é–‹å§‹ã—ã¾ã—ãŸ");
}

function event::onUnLoad() {
	oShell = null;
	oWmi   = null;
	
	//addTalkTask("ãƒ©ã‚¤ãƒ ãƒãƒ£ãƒƒãƒˆã¨ã®é€£æºã‚’çµ‚äº†ã—ã¾ã—ãŸ");
}
//////////////////////////////////////////////////////////////////