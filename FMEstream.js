//////////////////////////////////////////////////
//FMEstream.js概要
//FMEをコマンドラインで実行するためのlimechatスクリプト
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//Config
//FME設定ファイルのパス
UserSettingXMLFilePath = "C:\\FME.xml";

//FMECmd.exeファイルのパス
UserSettingFMEcmdPath ="C:\\Program Files (x86)\\Adobe\\Flash Media Live Encoder 3.2\\FMLECmd.exe";

//trueでデバッグ用のログ出力を有効にします
debugFlag = false;

//////////////////////////////////////////////////
//導入方法
//(1)Limechat2を実行
//
//(2)[設定(O)]-[スクリプトの設定(C)]-[スクリプトフォルダを開く(F)]を選択
//
//(3)開いたフォルダにこのファイルをコピー
//
//(4)以下の手順でFME設定ファイルを準備
//   ・FMEを起動
//   ・任意の放送用の設定を行う
//   ・[File]-[Save Profile]より、設定ファイルを C:\Users\＜ユーザー名＞\AppData\Roaming\LimeChat2\scripts\FME.xml に保存
//
//(5)スクリプトの設定より、FMEstream.jsの任意のサーバ枠を右クリックし、○を付ける
//   （IRCサーバと連携したりしないため、どのサーバ枠に○を付けてもかまいません。）
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//使い方
//コマンド:/startfme
//         FMEを使用したデータ送信を開始します。
//         Justinを使用している場合は、このコマンドを実行した時点で放送が開始されます。
//
//コマンド:/stopfme
//         FMEを使用したデータ送信を停止します。
//         Justinを使用している場合は、このコマンドを実行した時点で放送が停止します。
//
//コマンド:/guifme
//         FMEをグラフィカルユーザーインタフェースで実行します。
//         設定ファイルを作りなおす場合に使ってください。
//
//////////////////////////////////////////////////
//Update
//2013.05.25 とりあえず作成。
//
//2013.12.07 更新は以下の3点
//           ・XMLファイルを以下に保存していれば、//Config でパスを設定していなくても動作する様にした。
//             C:\Users\＜ユーザー名＞\AppData\Roaming\LimeChat2\scripts\FME.xml
//
//           ・FMEのインストールパスがデフォルトであれば、 //Config で設定しなくても動作するようにした。
//
//           ・/guifme コマンドの実装
//
//////////////////////////////////////////////////
FMEcmdPathx64 = "C:\\Program Files (x86)\\Adobe\\Flash Media Live Encoder 3.2\\FMLECmd.exe";
FMEcmdPathx86 = "C:\\Program Files\\Adobe\\Flash Media Live Encoder 3.2\\FMLECmd.exe";

ScriptDirectoryXMLFilePath = userScriptPath + "\\FME.xml";

function event::onLoad() {
   resCheckXMLFile = checkXMLFile();
   resCheckFMEFile = checkFMEFile();
   if(resCheckXMLFile == 0 && resCheckFMEFile == 0){
      print("FMEstream.js: [info]/startfme繧ｳ繝槭Φ繝峨〒謾ｾ騾√ｒ髢句ｧ九〒縺阪∪縺吶��");
   }else if(resCheckFMEFile == 1){
      print("FMEstream.js: [error]FME縺瑚ｦ九▽縺九ｊ縺ｾ縺帙ｓ縲�");
   }else if(resCheckXMLFile == 1){
      print("FMEstream.js: [error]XML繝輔ぃ繧､繝ｫ縺瑚ｦ九▽縺九ｊ縺ｾ縺帙ｓ縲�" + ScriptDirectoryXMLFilePath + "縺ｫFME縺ｮ險ｭ螳壹ヵ繧｡繧､繝ｫ繧剃ｿ晏ｭ倥＠縺ｦ縺上□縺輔＞縲�");
   }
}

function checkXMLFile(){
   //險ｭ螳壹ヵ繧｡繧､繝ｫ縲∝ｮ溯｡後ヵ繧｡繧､繝ｫ縺ｮ蟄伜惠繝√ぉ繝�繧ｯ
   var fs = new ActiveXObject( "Scripting.FileSystemObject" );
   if( fs.FileExists(UserSettingXMLFilePath) ){
      if(debugFlag){
         log("[info]UserSettingXMLFilePath縺ｯ蟄伜惠縺励∪縺吶��");
      }
      StreamConfigXMLFilePath = UserSettingXMLFilePath;
      return 0;
   }else if( fs.FileExists(ScriptDirectoryXMLFilePath) ){
      if(debugFlag){
         log("[info]ScriptDirectoryXMLFilePath縺ｯ蟄伜惠縺励∪縺吶��");
      }
      StreamConfigXMLFilePath = ScriptDirectoryXMLFilePath;
      return 0;
   }else{
      if(debugFlag){
         log("[error]XML繝輔ぃ繧､繝ｫ縺ｯ蟄伜惠縺励∪縺帙ｓ縲�");
      }
         return 1;
   }
}

function checkFMEFile(){
   //險ｭ螳壹ヵ繧｡繧､繝ｫ縲∝ｮ溯｡後ヵ繧｡繧､繝ｫ縺ｮ蟄伜惠繝√ぉ繝�繧ｯ
   var fs = new ActiveXObject( "Scripting.FileSystemObject" );
   if( fs.FileExists(FMEcmdPathx64) ){
      if(debugFlag){
         log("[info]FMEcmdPathx64縺ｯ蟄伜惠縺励∪縺吶��");
      }
      FMEcmdPath = FMEcmdPathx64;
      return 0;
   }else if( fs.FileExists(FMEcmdPathx86) ){
      if(debugFlag){
         log("[info]FMEcmdPathx86縺ｯ蟄伜惠縺励∪縺吶��");
      }
      FMEcmdPath = FMEcmdPathx86;
      return 0;
   }else if( fs.FileExists(UserSettingFMEcmdPath) ){
      if(debugFlag){
         log("[info]UserSettingFMEcmdPath縺ｯ蟄伜惠縺励∪縺吶��");
      }
      FMEcmdPath = UserSettingFMEcmdPath;
      return 0;
   }else{
      if(debugFlag){
         log("[error]FME縺瑚ｦ九▽縺九ｊ縺ｾ縺帙ｓ縲�" + FMEcmdPath);
      }
      return 1;
   }
}

function startFME(){
   resCheckXMLFile = checkXMLFile();
   resCheckFMEFile = checkFMEFile();
   if(resCheckFMEFile == 1){
      print("FMEstream.js: [error]FME縺瑚ｦ九▽縺九ｊ縺ｾ縺帙ｓ縲�");
      return 1;
   }else if(resCheckXMLFile == 1){
      print("FMEstream.js: [error]XML繝輔ぃ繧､繝ｫ縺瑚ｦ九▽縺九ｊ縺ｾ縺帙ｓ縲�" + ScriptDirectoryXMLFilePath + "縺ｫFME縺ｮ險ｭ螳壹ヵ繧｡繧､繝ｫ繧剃ｿ晏ｭ倥＠縺ｦ縺上□縺輔＞縲�");
      return 1;
   }

   runCommand = "\"" + FMEcmdPath + "\" /p \"" + StreamConfigXMLFilePath + "\"";
   if(debugFlag){
      log(runCommand);
   }
   var wsh = new ActiveXObject("WScript.Shell");
   wsh.run(runCommand, 7, false);
   print("FMEstream.js: [info]FME縺ｮ繝�繝ｼ繧ｿ騾∽ｿ｡繧帝幕蟋九＠縺ｾ縺�");
   return 0;
}

function stopFME(){
   resCheckXMLFile = checkXMLFile();
   resCheckFMEFile = checkFMEFile();
   if(resCheckFMEFile == 1){
      print("FMEstream.js: [error]FME縺瑚ｦ九▽縺九ｊ縺ｾ縺帙ｓ縲�");
      return 1;
   }else if(resCheckXMLFile == 1){
      print("FMEstream.js: [error]XML繝輔ぃ繧､繝ｫ縺瑚ｦ九▽縺九ｊ縺ｾ縺帙ｓ縲�" + ScriptDirectoryXMLFilePath + "縺ｫFME縺ｮ險ｭ螳壹ヵ繧｡繧､繝ｫ繧剃ｿ晏ｭ倥＠縺ｦ縺上□縺輔＞縲�");
      return 1;
   }

   if(debugFlag){
      log("XMLfilePath:" + StreamConfigXMLFilePath);
   }
   //Unicode蠖｢蠑上→縺励※繝輔ぃ繧､繝ｫ繧帝幕縺�
   var fso = new ActiveXObject('Scripting.FileSystemObject');
   var obj = fso.OpenTextFile(StreamConfigXMLFilePath,1,false,-1);
   var text = obj.ReadAll();
   obj.close();
   if(debugFlag){
      log(text);
   }

   var xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
   xmlDoc.loadXML(text);
   var urlValue = xmlDoc.documentElement.selectNodes("/flashmedialiveencoder_profile/output/rtmp/url");
   var streamValue = xmlDoc.documentElement.selectNodes("/flashmedialiveencoder_profile/output/rtmp/stream");
   if(debugFlag){
      log(urlValue[0].text + "+" + streamValue[0].text);
   }

   runCommand = "\"" + FMEcmdPath + "\" /s \"" + urlValue[0].text + "+" + streamValue[0].text + "\"";
   if(debugFlag){
      log(runCommand);
   }
   var wsh = new ActiveXObject("WScript.Shell");
   wsh.run(runCommand, 7, false);
   print("FMEstream.js: [info]FME縺ｮ繝�繝ｼ繧ｿ騾∽ｿ｡繧貞●豁｢縺励∪縺�");
   return 0;
}

function guiFME(){
   resCheckFMEFile = checkFMEFile();
   if(resCheckFMEFile == 1){
      print("FMEstream.js: [error]FME縺瑚ｦ九▽縺九ｊ縺ｾ縺帙ｓ縲�");
      return 1;
   }

   runCommand = "\"" + FMEcmdPath + "\" /g";
   if(debugFlag){
      log(runCommand);
   }
   var wsh = new ActiveXObject("WScript.Shell");
   if(debugFlag){
      log("FME縺ｮGUI繧帝幕縺阪∪縺吶��");
   }
   print("FME縺ｮGUI繧帝幕縺阪∪縺吶��[File]-[Save Profile]繧医ｊFME縺ｮ險ｭ螳壽ュ蝣ｱ繧剃ｿ晏ｭ倥〒縺阪∪縺吶��" + ScriptDirectoryXMLFilePath + "縺ｫFME縺ｮ險ｭ螳壹ヵ繧｡繧､繝ｫ繧剃ｿ晏ｭ倥＠縺ｦ縺上□縺輔＞縲�");
   return wsh.run(runCommand, 1, true);
}



function event::onSendingCommand(command, param, context){
   if (command == "STARTFME"){
      if(debugFlag){
         log("[info]InputCommand:/startfme");
      }
      context.handled = true
      res = startFME();
      if(debugFlag){
         log("[info]EndCommand:/startfme ReturnCode:" + res);
      }
      if(res==1){
         print("[error]EndCommand:/startfme ReturnCode:" + res);
      }
   }else if (command == "STOPFME"){
      if(debugFlag){
         log("[info]InputCommand:/stopfme");
      }
      context.handled = true
      res = stopFME();
      if(debugFlag){
         log("[info]EndCommand:/stopfme ReturnCode:" + res);
      }
      if(res==1){
         print("[error]EndCommand:/stopfme ReturnCode:" + res);
      }
   }else if (command == "GUIFME"){
      if(debugFlag){
         log("[info]InputCommand:/guifme");
      }
      context.handled = true
      res = guiFME();
      if(debugFlag){
         log("[info]EndCommand:/guifme ReturnCode:" + res);
      }
      if(res==1){
         print("[error]EndCommand:/guifme ReturnCode:" + res);
      }
   }

}