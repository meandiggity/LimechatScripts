///////////////////////////////////////////////////
//Config
//チェックする放送一覧
array = new Array("channelName","channelName");

//trueでスクリプトロード時に放送の有無をチェックします
checkEventOnLoad = true;

//trueで繰り返し放送の有無をチェックします
checkRoop = true

//チェック間隔(秒)
roopTime = 60;

//trueでデバッグ用のログ出力を有効にします
debugFlag = false;

//trueでループ実行時の放送していないチャンネルのメッセージ出力を有効にします
roopCheckOutputNotStreamMessage = false;
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//導入方法
//(1)Limechat2を実行
//(2)[設定(O)]-[スクリプトの設定(C)]-[スクリプトフォルダを開く(F)]を選択
//(3)開いたフォルダにこのファイルをコピー
//(4)スクリプトの設定より、JustinStatusCheckerの任意のサーバ枠を右クリックし、○を付ける
//   （IRCサーバと連携したりしないため、どのサーバ枠に○を付けてもかまいません。）
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//Update
//2013.05.14 とりあえず作成。
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
      log("[info]" + channelName + " 縺ｮ謾ｾ騾√�ｮ譛臥┌繧偵メ繧ｧ繝�繧ｯ縺励∪縺吶�Ｆxecute:checkJustinStream()");
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
               // 蜿門ｾ励＠縺櫟SON繝�繝ｼ繧ｿ縺ｫ繝√Ε繝ｳ繝阪Ν諠�蝣ｱ縺後≠繧句�ｴ蜷�
               if(xmlHttpRequest.responseText.length!=2){
                  var data = eval( '(' + xmlHttpRequest.responseText + ')' );
                  if(debugFlag){
                     log("[output]live  :" + data[0].channel.login + " (URL:" + data[0].channel.channel_url + ")");
                  }
                  print("live  :" + data[0].channel.login + " (URL:" + data[0].channel.channel_url + ")");
               }else if(notStreamMessage){
                  if(debugFlag){
                     log("[output]" + channelName + "縺ｯ謾ｾ騾√＠縺ｦ縺�縺ｾ縺帙ｓ");
                  }
                  print(channelName + "縺ｯ謾ｾ騾√＠縺ｦ縺�縺ｾ縺帙ｓ");
               }
           }
       }
   }

   var requestUrl = 'http://api.justin.tv/api/stream/list.json?channel=' + channelName;
   if(debugFlag){
      log("[info]繝√ぉ繝�繧ｯAPI縺ｫ繧｢繧ｯ繧ｻ繧ｹ縺励∪縺吶��:" + requestUrl);
   }

   xmlHttpRequest.open( 'GET', requestUrl );
   xmlHttpRequest.send( null );
}

function checkAll(){
   if(debugFlag){
      log("[info]縺吶∋縺ｦ縺ｮ繝√Ε繝ｳ繝阪Ν繧偵メ繧ｧ繝�繧ｯ縺励∪縺吶�Ｆxecute:checkAll()");
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
         log("[info]" + roopTime + "遘呈ｯ弱↓繝√ぉ繝�繧ｯ縺励∪縺�");
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
         log("[info]/checkall繧ｳ繝槭Φ繝峨′螳溯｡後＆繧後∪縺励◆");
      }
      context.handled = true
      checkAll();
   }else if  (command == "CHECK"){
      if(debugFlag){
         log("[info]/check繧ｳ繝槭Φ繝峨′螳溯｡後＆繧後∪縺励◆縲ょｼ墓焚:" + param);
      }
      context.handled = true
      checkJustinStream(param,true);
   }
}