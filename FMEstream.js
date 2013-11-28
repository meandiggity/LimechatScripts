//////////////////////////////////////////////////
//FMEstream.js概要
//FMEをコマンドラインで実行するためのlimechatスクリプト
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//Config
//FME設定ファイルのパス
StreamConfigXMLFilePath = "E:\\FME\\justin.tv.xml";

//FMECmd.exeファイルのパス
FMEcmdPath ="C:\\Program Files (x86)\\Adobe\\Flash Media Live Encoder 3.2\\FMLECmd.exe";

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
//   ・[File]-[Save Profile]より、設定ファイルを任意のフォルダに保存
//   ・このスクリプトの4行目 StreamConfigXMLFilePath に設定ファイルのパスを書く
//      注意: ディレクトリの階層を示す \マーク は2つ続けて記載してください。
//
//(5)このスクリプトの7行目 FMEcmdPath に設定されている、
//   FMLECmd.exeのファイルパスが正しい事を確認する。
//
//   Windows XPの場合や、32bitOSを使っている場合は、デフォルト値正しくないかもしれません。
//   その場合は、正しいファイルパスを設定してください。
//      注意: ディレクトリの階層を示す \マーク は2つ続けて記載してください。
//
//(4)スクリプトの設定より、FMEstream.jsの任意のサーバ枠を右クリックし、○を付ける
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
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//Update
//2013.05.25 とりあえず作成。
//
//////////////////////////////////////////////////


function event::onLoad() {
   //險ｭ螳壹ヵ繧｡繧､繝ｫ縲∝ｮ溯｡後ヵ繧｡繧､繝ｫ縺ｮ蟄伜惠繝√ぉ繝�繧ｯ
   var fs = new ActiveXObject( "Scripting.FileSystemObject" );
   if( fs.FileExists(StreamConfigXMLFilePath) ){
      if(debugFlag){
         log("[info]StreamConfigXMLFilePath縺ｯ蟄伜惠縺励∪縺吶��");
      }
      if( fs.FileExists(FMEcmdPath) ){
         if(debugFlag){
            log("[info]FMEcmdPath縺ｯ蟄伜惠縺励∪縺吶��/startfme繧ｳ繝槭Φ繝峨〒謾ｾ騾√ｒ髢句ｧ九〒縺阪∪縺吶��");
         }
         print("FMEstream.js: [info]/startfme繧ｳ繝槭Φ繝峨〒謾ｾ騾√ｒ髢句ｧ九〒縺阪∪縺吶��");
      }else{
         if(debugFlag){
            log("[error]FMEcmdPath縺ｯ蟄伜惠縺励∪縺帙ｓ縲�" + FMEcmdPath);
         }
            print("FMEstream.js: [error]FMEcmdPath縺ｯ蟄伜惠縺励∪縺帙ｓ縲�" + FMEcmdPath);
      }
   }else{
      if(debugFlag){
         log("[error]StreamConfigXMLFilePath縺ｯ蟄伜惠縺励∪縺帙ｓ縲�" + StreamConfigXMLFilePath);
      }
         print("FMEstream.js: [error]StreamConfigXMLFilePath縺ｯ蟄伜惠縺励∪縺帙ｓ縲�" + StreamConfigXMLFilePath);
   }

}

function startFME(){
   runCommand = "\"" + FMEcmdPath + "\" /p \"" + StreamConfigXMLFilePath + "\"";
   if(debugFlag){
      log(runCommand);
   }
   var wsh = new ActiveXObject("WScript.Shell");
   wsh.run(runCommand, 7, false);
   print("FMEstream.js: [info]FME縺ｮ繝�繝ｼ繧ｿ騾∽ｿ｡繧帝幕蟋九＠縺ｾ縺�");
}

function stopFME(){
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
}

function event::onSendingCommand(command, param, context){
   if (command == "STARTFME"){
      if(debugFlag){
         log("[info]InputCommand:/startfme");
      }
      context.handled = true
      startFME();
   }else if (command == "STOPFME"){
      if(debugFlag){
         log("[info]InputCommand:/stopfme");
      }
      context.handled = true
      stopFME();
   }

}