/////////////////////////////////////////////////////////////////
//Config
/////////////////////////////////////////////////////////////////
//DodontofServer.rbまでのURL
cgi = "http://moelive.com/html/DodontoF/DodontoFServer.rb";

//ページの読み込み間隔(ms)
intervalTime=2000;

//チャットを取得する範囲(s)
//allは非推奨。ページ読み込み間隔(ms)と同じにすると良い。
pagesec=2;

//trueでデバッグ用のログ出力を有効にします
debugFlag = false;

//未実装項目
//棒読みちゃんに読み上げさせるかどうか。(true:読む, false:読まない)
talkOn = true;

/////////////////////////////////////////////////////////////////
//概要
/////////////////////////////////////////////////////////////////
//本スクリプトは、どどんとふのチャットを、Limechat2に転送するためのスクリプトです
//Limechat2の[設定]→[スクリプトの設定]より導入して利用してください。
//
//使い方。
//(1)ユーザー設定から、DodontofServer.rbまでのURLを記述
//(2)Limechat2のスクリプト機能に、本スクリプトを導入させる。
//(3)「/startdodontof ルーム番号:パスワード」 の書式でコマンドを入力
//    ルームにパスワードが設定されていない場合は、「/getmessage ルーム番号 パスワード」
//(4)停止する時は「/stopdodontof ルーム番号」を実行してください。
//
//
//
/////////////////////////////////////////////////////////////////
//Update
//2012.?.? とりあえず作成。
//
//2013.06.22 URLのチェック機能を追加。
//           URLの末尾がDodontoFServer.rbでない場合にエラーメッセージを吐くようにした。
//
//2013.07.14 ダイスの特殊メッセージを整形するようにした。
//           改行を含むメッセージを取得した際にエラーがでる不具合を修正。
/////////////////////////////////////////////////////////////////

timer = new Array(10000);
array = new Array(100);

//迚ｹ谿翫Γ繝�繧ｻ繝ｼ繧ｸ縺ｮ豁｣隕剰｡ｨ迴ｾ
diceRegExp = new RegExp("^###CutInCommand:rollVisualDice###[\\w\\W]+chatMessage[\\W\\w]+\\\\n([\\W\\w]+)\"\,\"randResults","i");

//謖�螳啅RL縺ｮ驕ｩ諤ｧ繝√ぉ繝�繧ｯ
if("DodontoFServer.rb" != cgi.substring(cgi.length-"DodontoFServer.rb".length)){
   print("[ERROR]CGIURL縺ｫDodontoFServer.rb縺ｸ縺ｮURL縺梧欠螳壹＆繧後※縺�縺ｾ縺帙ｓ縲�" + cgi);
   if(debugFlag){
      log("[ERROR]CGIURL縺ｫDodontoFServer.rb縺ｸ縺ｮURL縺梧欠螳壹＆繧後※縺�縺ｾ縺帙ｓ縲�" + cgi);
   }
}

function sleep(T){
   var d1 = new Date().getTime();
   var d2 = new Date().getTime();
   while( d2 < d1+1000*T ){    //T遘貞ｾ�縺､
      d2=new Date().getTime();
   }
   d1=null;
   d2=null;
   return;
} 

function getmessage(roomparams,selectedChannel){
   url=cgi + "?webif=chat&room=" + roomparams[0] + "&password=" + roomparams[1] + "&sec=" + pagesec;
   if(debugFlag){
      log("[info]繝｡繝�繧ｻ繝ｼ繧ｸ蜿門ｾ佑GI縺ｫ謗･邯壹＠縺ｾ縺�:"+url);
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
                     log("[info]繝｡繝�繧ｻ繝ｼ繧ｸ縺ｮ謨ｰ:" +data.chatMessageDataLog.length);
                  }
                  for(var messages=0;messages<data.chatMessageDataLog.length;messages++){
                     var uuid = data.chatMessageDataLog[messages][0];
                     var username=data.chatMessageDataLog[messages][1].senderName;
                     var message=data.chatMessageDataLog[messages][1].message;
                     var channel=data.chatMessageDataLog[messages][1].channel;
                     
                     //迚ｹ谿翫Γ繝�繧ｻ繝ｼ繧ｸ縺ｮ蛻､螳�
                     //繝�繧､繧ｹ縺ｮ蝣ｴ蜷�
                     if(message.match(diceRegExp)){
                        message = RegExp.$1;
                        if(debugFlag){
                           log("[info]繝�繧､繧ｹ繝ｭ繝ｼ繝ｫ繝｡繝�繧ｻ繝ｼ繧ｸ繧貞叙蠕励＠縺ｾ縺励◆縲ゅΓ繝�繧ｻ繝ｼ繧ｸ繧呈紛蠖｢縺励∪縺吶��" + username + ":" + message);
                        }
                     }else{
                         if(debugFlag){
                           log("[info]騾壼ｸｸ繝｡繝�繧ｻ繝ｼ繧ｸ繧貞叙蠕励＠縺ｾ縺励◆縲�" + username + ":" + message);
                        }
                     }

                     var sendflg=1;
                     
                     //謚慕ｨｿ貂医∩縺九メ繧ｧ繝�繧ｯ
                     if(debugFlag){
                        log("[info]" +uuid + "縺ｮ逋ｺ險�繧呈兜遞ｿ貂医∩縺九メ繧ｧ繝�繧ｯ縺励∪縺吶�� " + username + ":" + message);
                     }
                     for(i=0;i<=array.length;i++){
                        if(array[i]==uuid){
                           sendflg=0;
                           if(debugFlag){
                              log("[info]謚慕ｨｿ貂医∩縺ｧ縺励◆縲� " + username + ":" + +message);
                           }
                        }
                     }
                     
                     //繝ｫ繝ｼ繝�逡ｪ蜿ｷ繧偵メ繧ｧ繝�繧ｯ
                     if(debugFlag){
                        log("[info]" +uuid + "縺ｮ逋ｺ險�縺ｮ繝ｫ繝ｼ繝�逡ｪ蜿ｷ繧偵メ繧ｧ繝�繧ｯ縺励∪縺吶�� " + username + ":" + message);
                     }
                     if(channel!=0){
                        sendflg=0;
                        if(debugFlag){
                           log("[info]main繧ｿ繝悶�ｮ逋ｺ險�縺ｧ縺ｪ縺�縺溘ａ繧ｹ繧ｭ繝�繝励＠縺ｾ縺吶��" + username + ":" + message);
                        }
                     }
                     
                     
                     if(sendflg==1){
                        if(debugFlag){
                           log("[info]謚慕ｨｿ縺励※縺�縺ｾ縺帙ｓ縺ｧ縺励◆");
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
                        
                        //繝｡繝�繧ｻ繝ｼ繧ｸ騾∽ｿ｡縺ｯ縺倥ａ
                        var sendMessage=message;
                        while(sendMessage.match(/^([^\n\r]*)[\n\r]([\w\W]*)$/)){
                           log(RegExp.$2);
                           sendMessage = RegExp.$2;
                           send(selectedChannel.name, "(" +username+ ")" + RegExp.$1);

                           //譽定ｪｭ縺ｿ縺｡繧�繧薙せ繧ｯ繝ｪ繝励ヨ逕ｨ
                           if(talkOn){
                              addTalkTask(username +" "+ RegExp.$1);
                           }
                        }
                        send(selectedChannel.name, "(" +username+ ")" +sendMessage);
                        //譽定ｪｭ縺ｿ縺｡繧�繧薙せ繧ｯ繝ｪ繝励ヨ逕ｨ
                        if(talkOn){
                           addTalkTask(username +" "+ sendMessage);
                        }

                        sendMessage=null;
                        //繝｡繝�繧ｻ繝ｼ繧ｸ騾∽ｿ｡邨ゅｏ繧�

                        if(!appActive){
                           showBalloon("譁ｰ縺励＞繝｡繝�繧ｻ繝ｼ繧ｸ繧貞女菫｡縺励∪縺励◆", username+ "縺輔ｓ縺ｮ逋ｺ險�\n" +message);
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
      selectedChanne.print("[info]蟇ｾ雎｡縺ｮ繝√Ε繝ｳ繝阪Ν縺ｫ蜈･螳､縺励※縺�縺ｾ縺帙ｓ縲ゅち繧､繝槭�ｼ繧貞●豁｢縺励∪縺�");
      if(debugFlag){
         if(debugFlag){
            log("繧ｿ繧､繝槭�ｼ繝上Φ繝峨Λ:"+ timer[roomparams[0]]);
         }
      }
      clearInterval(timer[roomparams[0]]);
      return 0;
   }
}



function event::onSendingCommand(command, param, context){
   if(command == "STARTDODONTOF"){//繝｡繝�繧ｻ繝ｼ繧ｸ縺ｮ蜿門ｾ鈴幕蟋九さ繝槭Φ繝�
      context.handled = true;
      if(param != ""){
      params = param.split(":");
         if(selectedChannel.active){
            selectedChannel.print("[info]縺ｩ縺ｩ繧薙→縺ｵ繝ｭ繧ｰ縺ｮ蜿門ｾ励ｒ髢句ｧ九＠縺ｾ縺�: 繝ｫ繝ｼ繝�逡ｪ蜿ｷ" +params[0]+", 繝代せ繝ｯ繝ｼ繝�"+params[1]);
            selectedChannel.print("[info]谺｡縺ｮ繝√Ε繝ｳ繝阪Ν縺ｫ蜃ｺ蜉帙＠縺ｾ縺�:" +selectedChannel.name);
            selectedChannel.print("[info]/stopdodontof繧ｳ繝槭Φ繝峨ｒ螳溯｡後＠縺ｦ縺上□縺輔＞縲�");
            selectedChannel.print("[info]usage:/stopdodontof roomid縲�");
            timer[params[0]] = setInterval(function(){getmessage(params,selectedChannel);},intervalTime); 
            if(debugFlag){
               log("繧ｿ繧､繝槭�ｼ繝上Φ繝峨Λ:"+ timer[params[0]]);
            }
         }else{
            print("[ERROR] 蜈･螳､縺励※縺�繧九メ繝｣繝ｳ繝阪Ν繧帝∈謚槭＠縺ｦ縺上□縺輔＞");
         }
      }else{
         print("[ERROR] usage:/startdodontof RoomID:RoomPassword");
      }
   }
   if(command == "STOPDODONTOF"){//繝｡繝�繧ｻ繝ｼ繧ｸ縺ｮ繧ｹ繝医ャ繝励さ繝槭Φ繝�
      context.handled = true;
      if(param != ""){
         print("[info]繧ｿ繧､繝槭�ｼ繧貞●豁｢縺励∪縺�");
         if(debugFlag){
            log("繧ｿ繧､繝槭�ｼ繝上Φ繝峨Λ:"+ timer[params[0]]);
         }
         clearInterval(timer[param]);
      }else{
         log("[ERROR] usage:/stopdodontof roomid");
         print("[ERROR] usage:/stopdodontof roomid");
      }
   }
}





//譽定ｪｭ縺ｿ縺｡繧�繧薙せ繧ｯ繝ｪ繝励ヨ繧医ｊ謚懃ｲ�
//縺薙�ｮ驛ｨ蛻�縺ｯ譽定ｪｭ縺ｿ縺｡繧�繧捺悽螳ｶ縺ｮ繧ｹ繧ｯ繝ｪ繝励ヨ縺九ｉ繧ｳ繝斐�壹＠縺溘ｂ縺ｮ縺ｧ縺吶��
//縺昴�ｮ縺溘ａ縲√％縺薙ｈ繧贋ｸ九�ｮ驛ｨ蛻�縺ｯ邱ｨ髮�縺励↑縺�縺ｧ縺上□縺輔＞縲�
////////////////////////////////////////////////////////////////////////////////////////////////////
//笆�險ｭ螳�

//逋ｺ險�閠�縺ｮ蜷榊燕繧定ｪｭ縺ｿ荳翫£繧九°縺ｩ縺�縺�(true:隱ｭ繧�, false:隱ｭ縺ｾ縺ｪ縺�)
var bNick = true;

//蜈･蜃ｺ諠�蝣ｱ繧定ｪｭ縺ｿ荳翫£繧九°縺ｩ縺�縺�(true:隱ｭ繧�, false:隱ｭ縺ｾ縺ｪ縺�)
var bInOut = false;

////////////////////////////////////////////////////////////////////////////////////////////////////

var sRemoteTalkCmd = null;
var oShell;
var oWmi;

function addTalkTask(text) {
	if(sRemoteTalkCmd == null) {
		findRemoteTalk();
		if(sRemoteTalkCmd == null) {
			log("RemoteTalk縺瑚ｦ九▽縺九ｉ縺ｪ縺�縺ｮ縺ｧ繧ｹ繧ｭ繝�繝�-" + text);
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
		
		log("譽定ｪｭ縺ｿ縺｡繧�繧捺､懷�ｺ:" + path);
	}
}


function event::onLoad() {
	oShell = new ActiveXObject("Wscript.Shell");
	oWmi   = GetObject("winmgmts:\\\\.\\root\\cimv2");
	
	//addTalkTask("繝ｩ繧､繝�繝√Ε繝�繝医→縺ｮ騾｣謳ｺ繧帝幕蟋九＠縺ｾ縺励◆");
}

function event::onUnLoad() {
	oShell = null;
	oWmi   = null;
	
	//addTalkTask("繝ｩ繧､繝�繝√Ε繝�繝医→縺ｮ騾｣謳ｺ繧堤ｵゆｺ�縺励∪縺励◆");
}
//////////////////////////////////////////////////////////////////