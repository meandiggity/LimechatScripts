//This script used UTF-8 String Code and LF Code.
////////////////////////////////////////////////////////////////////////////////////////////////////
//Config
////////////////////////////////////////////////////////////////////////////////////////////////////
sendChannel="#IRCchannel";
logPath = "C:\\BNO\\GundamOnline\\chat";
bouyomiTalkFriendMessage = true;
bouyomiTalkotherMessage = false;
displayPlayerName = false;
displayFriendName = true;
displaySystemMessage = false;
displayFriendMessage = true;
displayOtherMessage = false;
friendName = new Array("キャラ名","キャラ名");

////////////////////////////////////////////////////////////////////////////////////////////////////
//Command Usage
//     "/start" command start getting log file. 
//     "/stop" command stop getting log file.
//     "/reload" command reload log file list.
//
//Update
//2013.02.11 F鯖連邦に所属している、現時点で指揮ランク100位以内のプレイヤー名をフレンドリストに追加
//           ロード時にどのような設定になっているか、printする機能を追加
//
//2013.02.07 以下のバグを修正
//         ・1秒よりも短い間隔でメッセージが入力された場合、メッセージがスキップされる事がある。
//         ・2行に渡って表示されるメッセージが出力される場合、limechatにError(421)が発生する。
//
//           以下の機能を追加
//         ・フレンドメッセージの表示機能を追加
//           displayFriendMessage をtrueに設定し、friendNameにフレンド名を追加すると、その人のメッセージが表示されるようになります。
//           また、displayFriendNameをtrueにすると、メッセージと共にフレンド名が表示されます。
//
//         ・棒読みちゃん連携機能を追加
//           bouyomiTalkFriendMessageをtrueにすると、棒読みちゃんはフレンドメッセージを読み上げてくれます。
//
//2013.02.06 簡単なフィルター機能持たせました。設定を適当に変更して使用してください。
//           displayPlayerName    ：発言者の名前を表示するかどうか(true or false)
//           displaySystemMessage ：システムメッセージを表示するかどうか(true or false)
//           displayOtherMessage  ：その他(プレイヤーの発言)を表示するかどうか(true or false)
//
//2013.02.05 とりあえず作成
//
//Bugs
//         ・日が変わると読み込まなくなるかもしれない。
//           /reloadコマンドを実行するか、スクリプトをロードしなおせば、解消するはず。
////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////
//bouyomi Script
//copy by BouyomiLimeChat.js
//Copyright(c) 2006-2012 みちあき
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

////////////////////////////////////////////////////////////////////////////////////////////////////
//End of bouyomi Script


//Script Source
function event::onload(){
  oShell = new ActiveXObject("Wscript.Shell");
  oWmi   = GetObject("winmgmts:\\\\.\\root\\cimv2");

  if(displayPlayerName){
    print("プレイヤーネームの表示機能が有効になっています");
  }
  if(displaySystemMessage){
    print("システムメッセージの表示機能が有効になっています");
  }
  if(displayFriendMessage){
    print("フレンドメッセージの表示機能が有効になっています");
    print(friendName.length + "名フレンドが設定されています");
    log("以下のフレンドが設定されています\n" + friendName);
    if(displayFriendName){
      print("フレンドネームの表示機能が有効になっています");
    }
    if(bouyomiTalkFriendMessage){
      print("フレンドメッセージの棒読み連携機能が有効になっています");
    }
  }
  if(displayOtherMessage){
    print("その他メッセージの表示機能が有効になっています");
    if(bouyomiTalkotherMessage){
      print("その他メッセージの棒読み連携機能が有効になっています");
    }
  }

  reload();
}

function event::onUnLoad() {
  oShell = null;
  oWmi   = null;
  lastloadsize = null;
  fso   = null;
  dir = null;
  e = null;
  newestfile = null;
  logfilePath = null;
}

function reload(){
 lastloadsize = 0;
 var fso = new ActiveXObject('Scripting.FileSystemObject');
 var dir = fso.GetFolder(logPath);
 var e = new Enumerator(dir.Files);
 for(; !e.atEnd(); e.moveNext()){
     var newestfile=e.item().Name;
 }
 logfilePath = logPath + "\\" + newestfile;
 log(logfilePath + "を開きます");
 roopsend(logfilePath);

}

function openlog(){
 var fso = new ActiveXObject('Scripting.FileSystemObject');
  var obj = fso.OpenTextFile(logfilePath,1,false,-2);
  var text = obj.ReadAll();
  obj.close();
  return text;
}

function sendFiltering(line){
  if(displaySystemMessage){
    if(line.match(/^\[[\d]{2}:[\d]{2}.[\d]{2}\] system[：]/) ||
       line.match(/^\[[\d]{2}:[\d]{2}.[\d]{2}\] [\d]{2}'[\d]{2}[：]/)){

      if(!displayPlayerName){
        line=line.split("：");
        log("SystemMessage return "+ line[1]);
        return line[1];
      }else{
        line=line.split("] ");
        log("SystemMessage return "+ line[1]);
        return line[1];
      }

    }
  }else{
    if(line.match(/^\[[\d]{2}:[\d]{2}.[\d]{2}\] system[：]/) ||
       line.match(/^\[[\d]{2}:[\d]{2}.[\d]{2}\] [\d]{2}'[\d]{2}[：]/)){
      log("SystemMessage return null");
      return null;
    }
  }
  if(displayFriendMessage){
    for(i=0; i<= friendName.length; i++){
      var re = new RegExp("\[[0-9]{2}:[0-9]{2}.[0-9]{2}\] " + friendName[i] + "[：]");
      if(line.match(re) && friendName[i]!=null){
      log("[info]フレンドの" + friendName[i] + "のメッセージを表示します");

        if(!displayFriendName){
          line=line.split("：");
          log("FriendMessage return "+ line[1]);
          if(bouyomiTalkFriendMessage){
            addTalkTask(line[1]);
          }
          return line[1];
        }else if(displayFriendName){
          line=line.split("] ");
          log("FriendMessage return "+ line[1]);
          if(bouyomiTalkFriendMessage){
            addTalkTask(line[1]);
          }
          return line[1];
        }

      }
    }
  }
  if(displayOtherMessage){
    if(!displayPlayerName){
      line=line.split("：");
        log("otherMessage return "+ line[1]);
        if(bouyomiTalkotherMessage){
          addTalkTask(line[1]);
        }
      return line[1];
    }else{
      line=line.split("] ");
        log("otherMessage return "+ line[1]);
        if(bouyomiTalkotherMessage){
          addTalkTask(line[1]);
        }
      return line[1];
    }

  }else{
    if(line.match(/^\[[\d]{2}:[\d]{2}.[\d]{2}\]/)){
      log("return null");
      return null;
    }
  }
  log("return " + line);
  return line;
}

function sendNewestMessage(text){
  var lines = text.split(/[\r\n]+/);
  var sendflag=0;
  if(lines.length!=0){
    for(var i = lastloadsize; i < lines.length; i++){
       var line = lines[i];
       var sendvalue = line;
       if(lastloadsize!=0){
         sendvalue = sendFiltering(sendvalue);
         if(sendvalue!=null && line.match(/^\[[\d]{2}:[\d]{2}.[\d]{2}\]/)){
           send(sendChannel,sendvalue);
           sendflag = 1;
         }else if(sendvalue!=null && sendflag==1){
           send(sendChannel,sendvalue);
           sendflag = 1;
         }else{
           sendflag = 0;
         }
       }
     }
       if(lastloadsize==0){
         log("初回ロードか、ファイルに何も書かれていません");
       }

  }else{
   log("[info]ログファイルに何も書かれていませんでした。");
  }
  lastloadsize =lines.length;
}

function roopsend(logfilePath){
 var text = openlog();
 sendNewestMessage(text);
}

function event::onSendingCommand(command, text, context)
{
    switch (command){
    case 'START':
        context.handled = true;
        timehandle=setInterval(roopsend,1000);
        log("ログの取得を開始しました");
        print("ログの取得を開始しました");
        break;
    case 'STOP':
        context.handled = true;
        clearInterval(timehandle);
        log("ログの取得を停止しました");
        print("ログの取得を停止しました");
        break;
    case 'RELOAD':
        context.handled = true;
        reload();
        log("ログファイルをリロードしました。");
        break;
    }
}


//EOF
