/////////////////////////////////////////////////////////////////
//Config
/////////////////////////////////////////////////////////////////
//DodontofServer.rb�܂ł�URL
cgi = "http://moelive.com/html/DodontoF/DodontoFServer.rb";

//�y�[�W�̓ǂݍ��݊Ԋu(ms)
intervalTime=2000;

//�`���b�g���擾����͈�(s)
//all�͔񐄏��B�y�[�W�ǂݍ��݊Ԋu(ms)�Ɠ����ɂ���Ɨǂ��B
pagesec=2;

//true�Ńf�o�b�O�p�̃��O�o�͂�L���ɂ��܂�
debugFlag = false;

//����������
//�_�ǂ݂����ɓǂݏグ�����邩�ǂ����B(true:�ǂ�, false:�ǂ܂Ȃ�)
talkOn = true;

/////////////////////////////////////////////////////////////////
//�T�v
/////////////////////////////////////////////////////////////////
//�{�X�N���v�g�́A�ǂǂ�Ƃӂ̃`���b�g���ALimechat2�ɓ]�����邽�߂̃X�N���v�g�ł�
//Limechat2��[�ݒ�]��[�X�N���v�g�̐ݒ�]��蓱�����ė��p���Ă��������B
//
//�g�����B
//(1)���[�U�[�ݒ肩��ADodontofServer.rb�܂ł�URL���L�q
//(2)Limechat2�̃X�N���v�g�@�\�ɁA�{�X�N���v�g�𓱓�������B
//(3)�u/startdodontof ���[���ԍ�:�p�X���[�h�v �̏����ŃR�}���h�����
//    ���[���Ƀp�X���[�h���ݒ肳��Ă��Ȃ��ꍇ�́A�u/getmessage ���[���ԍ� �p�X���[�h�v
//(4)��~���鎞�́u/stopdodontof ���[���ԍ��v�����s���Ă��������B
//
//
//
/////////////////////////////////////////////////////////////////
//Update
//2012.?.? �Ƃ肠�����쐬�B
//
//2013.06.22 URL�̃`�F�b�N�@�\��ǉ��B
//           URL�̖�����DodontoFServer.rb�łȂ��ꍇ�ɃG���[���b�Z�[�W��f���悤�ɂ����B
//
//2013.07.14 �_�C�X�̓��ꃁ�b�Z�[�W�𐮌`����悤�ɂ����B
//           ���s���܂ރ��b�Z�[�W���擾�����ۂɃG���[���ł�s����C���B
/////////////////////////////////////////////////////////////////

timer = new Array(10000);
array = new Array(100);

//特殊メッセージの正規表現
diceRegExp = new RegExp("^###CutInCommand:rollVisualDice###[\\w\\W]+chatMessage[\\W\\w]+\\\\n([\\W\\w]+)\"\,\"randResults","i");

//指定URLの適性チェック
if("DodontoFServer.rb" != cgi.substring(cgi.length-"DodontoFServer.rb".length)){
   print("[ERROR]CGIURLにDodontoFServer.rbへのURLが指定されていません。" + cgi);
   if(debugFlag){
      log("[ERROR]CGIURLにDodontoFServer.rbへのURLが指定されていません。" + cgi);
   }
}

function sleep(T){
   var d1 = new Date().getTime();
   var d2 = new Date().getTime();
   while( d2 < d1+1000*T ){    //T秒待つ
      d2=new Date().getTime();
   }
   d1=null;
   d2=null;
   return;
} 

function getmessage(roomparams,selectedChannel){
   url=cgi + "?webif=chat&room=" + roomparams[0] + "&password=" + roomparams[1] + "&sec=" + pagesec;
   if(debugFlag){
      log("[info]メッセージ取得CGIに接続します:"+url);
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
                     log("[info]メッセージの数:" +data.chatMessageDataLog.length);
                  }
                  for(var messages=0;messages<data.chatMessageDataLog.length;messages++){
                     var uuid = data.chatMessageDataLog[messages][0];
                     var username=data.chatMessageDataLog[messages][1].senderName;
                     var message=data.chatMessageDataLog[messages][1].message;
                     var channel=data.chatMessageDataLog[messages][1].channel;
                     
                     //特殊メッセージの判定
                     //ダイスの場合
                     if(message.match(diceRegExp)){
                        message = RegExp.$1;
                        if(debugFlag){
                           log("[info]ダイスロールメッセージを取得しました。メッセージを整形します。" + username + ":" + message);
                        }
                     }else{
                         if(debugFlag){
                           log("[info]通常メッセージを取得しました。" + username + ":" + message);
                        }
                     }

                     var sendflg=1;
                     
                     //投稿済みかチェック
                     if(debugFlag){
                        log("[info]" +uuid + "の発言を投稿済みかチェックします。 " + username + ":" + message);
                     }
                     for(i=0;i<=array.length;i++){
                        if(array[i]==uuid){
                           sendflg=0;
                           if(debugFlag){
                              log("[info]投稿済みでした。 " + username + ":" + +message);
                           }
                        }
                     }
                     
                     //ルーム番号をチェック
                     if(debugFlag){
                        log("[info]" +uuid + "の発言のルーム番号をチェックします。 " + username + ":" + message);
                     }
                     if(channel!=0){
                        sendflg=0;
                        if(debugFlag){
                           log("[info]mainタブの発言でないためスキップします。" + username + ":" + message);
                        }
                     }
                     
                     
                     if(sendflg==1){
                        if(debugFlag){
                           log("[info]投稿していませんでした");
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
                        
                        //メッセージ送信はじめ
                        var sendMessage=message;
                        while(sendMessage.match(/^([^\n\r]*)[\n\r]([\w\W]*)$/)){
                           log(RegExp.$2);
                           sendMessage = RegExp.$2;
                           send(selectedChannel.name, "(" +username+ ")" + RegExp.$1);

                           //棒読みちゃんスクリプト用
                           if(talkOn){
                              addTalkTask(username +" "+ RegExp.$1);
                           }
                        }
                        send(selectedChannel.name, "(" +username+ ")" +sendMessage);
                        //棒読みちゃんスクリプト用
                        if(talkOn){
                           addTalkTask(username +" "+ sendMessage);
                        }

                        sendMessage=null;
                        //メッセージ送信終わり

                        if(!appActive){
                           showBalloon("新しいメッセージを受信しました", username+ "さんの発言\n" +message);
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
      selectedChanne.print("[info]対象のチャンネルに入室していません。タイマーを停止します");
      if(debugFlag){
         if(debugFlag){
            log("タイマーハンドラ:"+ timer[roomparams[0]]);
         }
      }
      clearInterval(timer[roomparams[0]]);
      return 0;
   }
}



function event::onSendingCommand(command, param, context){
   if(command == "STARTDODONTOF"){//メッセージの取得開始コマンド
      context.handled = true;
      if(param != ""){
      params = param.split(":");
         if(selectedChannel.active){
            selectedChannel.print("[info]どどんとふログの取得を開始します: ルーム番号" +params[0]+", パスワード"+params[1]);
            selectedChannel.print("[info]次のチャンネルに出力します:" +selectedChannel.name);
            selectedChannel.print("[info]/stopdodontofコマンドを実行してください。");
            selectedChannel.print("[info]usage:/stopdodontof roomid。");
            timer[params[0]] = setInterval(function(){getmessage(params,selectedChannel);},intervalTime); 
            if(debugFlag){
               log("タイマーハンドラ:"+ timer[params[0]]);
            }
         }else{
            print("[ERROR] 入室しているチャンネルを選択してください");
         }
      }else{
         print("[ERROR] usage:/startdodontof RoomID:RoomPassword");
      }
   }
   if(command == "STOPDODONTOF"){//メッセージのストップコマンド
      context.handled = true;
      if(param != ""){
         print("[info]タイマーを停止します");
         if(debugFlag){
            log("タイマーハンドラ:"+ timer[params[0]]);
         }
         clearInterval(timer[param]);
      }else{
         log("[ERROR] usage:/stopdodontof roomid");
         print("[ERROR] usage:/stopdodontof roomid");
      }
   }
}





//棒読みちゃんスクリプトより抜粋
//この部分は棒読みちゃん本家のスクリプトからコピペしたものです。
//そのため、ここより下の部分は編集しないでください。
////////////////////////////////////////////////////////////////////////////////////////////////////
//■設定

//発言者の名前を読み上げるかどうか(true:読む, false:読まない)
var bNick = true;

//入出情報を読み上げるかどうか(true:読む, false:読まない)
var bInOut = false;

////////////////////////////////////////////////////////////////////////////////////////////////////

var sRemoteTalkCmd = null;
var oShell;
var oWmi;

function addTalkTask(text) {
	if(sRemoteTalkCmd == null) {
		findRemoteTalk();
		if(sRemoteTalkCmd == null) {
			log("RemoteTalkが見つからないのでスキップ-" + text);
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
		
		log("棒読みちゃん検出:" + path);
	}
}


function event::onLoad() {
	oShell = new ActiveXObject("Wscript.Shell");
	oWmi   = GetObject("winmgmts:\\\\.\\root\\cimv2");
	
	//addTalkTask("ライムチャットとの連携を開始しました");
}

function event::onUnLoad() {
	oShell = null;
	oWmi   = null;
	
	//addTalkTask("ライムチャットとの連携を終了しました");
}
//////////////////////////////////////////////////////////////////