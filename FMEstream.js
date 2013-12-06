//////////////////////////////////////////////////
//FMEstream.jsŠT—v
//FME‚ğƒRƒ}ƒ“ƒhƒ‰ƒCƒ“‚ÅÀs‚·‚é‚½‚ß‚ÌlimechatƒXƒNƒŠƒvƒg
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//Config
//FMEİ’èƒtƒ@ƒCƒ‹‚ÌƒpƒX
UserSettingXMLFilePath = "C:\\FME.xml";

//FMECmd.exeƒtƒ@ƒCƒ‹‚ÌƒpƒX
UserSettingFMEcmdPath ="C:\\Program Files (x86)\\Adobe\\Flash Media Live Encoder 3.2\\FMLECmd.exe";

//true‚ÅƒfƒoƒbƒO—p‚ÌƒƒOo—Í‚ğ—LŒø‚É‚µ‚Ü‚·
debugFlag = false;

//////////////////////////////////////////////////
//“±“ü•û–@
//(1)Limechat2‚ğÀs
//
//(2)[İ’è(O)]-[ƒXƒNƒŠƒvƒg‚Ìİ’è(C)]-[ƒXƒNƒŠƒvƒgƒtƒHƒ‹ƒ_‚ğŠJ‚­(F)]‚ğ‘I‘ğ
//
//(3)ŠJ‚¢‚½ƒtƒHƒ‹ƒ_‚É‚±‚Ìƒtƒ@ƒCƒ‹‚ğƒRƒs[
//
//(4)ˆÈ‰º‚Ìè‡‚ÅFMEİ’èƒtƒ@ƒCƒ‹‚ğ€”õ
//   EFME‚ğ‹N“®
//   E”CˆÓ‚Ì•ú‘——p‚Ìİ’è‚ğs‚¤
//   E[File]-[Save Profile]‚æ‚èAİ’èƒtƒ@ƒCƒ‹‚ğ C:\Users\ƒƒ†[ƒU[–¼„\AppData\Roaming\LimeChat2\scripts\FME.xml ‚É•Û‘¶
//
//(5)ƒXƒNƒŠƒvƒg‚Ìİ’è‚æ‚èAFMEstream.js‚Ì”CˆÓ‚ÌƒT[ƒo˜g‚ğ‰EƒNƒŠƒbƒN‚µA›‚ğ•t‚¯‚é
//   iIRCƒT[ƒo‚Æ˜AŒg‚µ‚½‚è‚µ‚È‚¢‚½‚ßA‚Ç‚ÌƒT[ƒo˜g‚É›‚ğ•t‚¯‚Ä‚à‚©‚Ü‚¢‚Ü‚¹‚ñBj
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//g‚¢•û
//ƒRƒ}ƒ“ƒh:/startfme
//         FME‚ğg—p‚µ‚½ƒf[ƒ^‘—M‚ğŠJn‚µ‚Ü‚·B
//         Justin‚ğg—p‚µ‚Ä‚¢‚éê‡‚ÍA‚±‚ÌƒRƒ}ƒ“ƒh‚ğÀs‚µ‚½“_‚Å•ú‘—‚ªŠJn‚³‚ê‚Ü‚·B
//
//ƒRƒ}ƒ“ƒh:/stopfme
//         FME‚ğg—p‚µ‚½ƒf[ƒ^‘—M‚ğ’â~‚µ‚Ü‚·B
//         Justin‚ğg—p‚µ‚Ä‚¢‚éê‡‚ÍA‚±‚ÌƒRƒ}ƒ“ƒh‚ğÀs‚µ‚½“_‚Å•ú‘—‚ª’â~‚µ‚Ü‚·B
//
//ƒRƒ}ƒ“ƒh:/guifme
//         FME‚ğƒOƒ‰ƒtƒBƒJƒ‹ƒ†[ƒU[ƒCƒ“ƒ^ƒtƒF[ƒX‚ÅÀs‚µ‚Ü‚·B
//         İ’èƒtƒ@ƒCƒ‹‚ğì‚è‚È‚¨‚·ê‡‚Ég‚Á‚Ä‚­‚¾‚³‚¢B
//
//////////////////////////////////////////////////
//Update
//2013.05.25 ‚Æ‚è‚ ‚¦‚¸ì¬B
//
//2013.12.07 XV‚ÍˆÈ‰º‚Ì3“_
//           EXMLƒtƒ@ƒCƒ‹‚ğˆÈ‰º‚É•Û‘¶‚µ‚Ä‚¢‚ê‚ÎA//Config ‚ÅƒpƒX‚ğİ’è‚µ‚Ä‚¢‚È‚­‚Ä‚à“®ì‚·‚é—l‚É‚µ‚½B
//             C:\Users\ƒƒ†[ƒU[–¼„\AppData\Roaming\LimeChat2\scripts\FME.xml
//
//           EFME‚ÌƒCƒ“ƒXƒg[ƒ‹ƒpƒX‚ªƒfƒtƒHƒ‹ƒg‚Å‚ ‚ê‚ÎA //Config ‚Åİ’è‚µ‚È‚­‚Ä‚à“®ì‚·‚é‚æ‚¤‚É‚µ‚½B
//
//           E/guifme ƒRƒ}ƒ“ƒh‚ÌÀ‘•
//
//////////////////////////////////////////////////
FMEcmdPathx64 = "C:\\Program Files (x86)\\Adobe\\Flash Media Live Encoder 3.2\\FMLECmd.exe";
FMEcmdPathx86 = "C:\\Program Files\\Adobe\\Flash Media Live Encoder 3.2\\FMLECmd.exe";

ScriptDirectoryXMLFilePath = userScriptPath + "\\FME.xml";

function event::onLoad() {
   resCheckXMLFile = checkXMLFile();
   resCheckFMEFile = checkFMEFile();
   if(resCheckXMLFile == 0 && resCheckFMEFile == 0){
      print("FMEstream.js: [info]/startfmeã‚³ãƒãƒ³ãƒ‰ã§æ”¾é€ã‚’é–‹å§‹ã§ãã¾ã™ã€‚");
   }else if(resCheckFMEFile == 1){
      print("FMEstream.js: [error]FMEãŒè¦‹ã¤ã‹ã‚Šã¾ã›ã‚“ã€‚");
   }else if(resCheckXMLFile == 1){
      print("FMEstream.js: [error]XMLãƒ•ã‚¡ã‚¤ãƒ«ãŒè¦‹ã¤ã‹ã‚Šã¾ã›ã‚“ã€‚" + ScriptDirectoryXMLFilePath + "ã«FMEã®è¨­å®šãƒ•ã‚¡ã‚¤ãƒ«ã‚’ä¿å­˜ã—ã¦ãã ã•ã„ã€‚");
   }
}

function checkXMLFile(){
   //è¨­å®šãƒ•ã‚¡ã‚¤ãƒ«ã€å®Ÿè¡Œãƒ•ã‚¡ã‚¤ãƒ«ã®å­˜åœ¨ãƒã‚§ãƒƒã‚¯
   var fs = new ActiveXObject( "Scripting.FileSystemObject" );
   if( fs.FileExists(UserSettingXMLFilePath) ){
      if(debugFlag){
         log("[info]UserSettingXMLFilePathã¯å­˜åœ¨ã—ã¾ã™ã€‚");
      }
      StreamConfigXMLFilePath = UserSettingXMLFilePath;
      return 0;
   }else if( fs.FileExists(ScriptDirectoryXMLFilePath) ){
      if(debugFlag){
         log("[info]ScriptDirectoryXMLFilePathã¯å­˜åœ¨ã—ã¾ã™ã€‚");
      }
      StreamConfigXMLFilePath = ScriptDirectoryXMLFilePath;
      return 0;
   }else{
      if(debugFlag){
         log("[error]XMLãƒ•ã‚¡ã‚¤ãƒ«ã¯å­˜åœ¨ã—ã¾ã›ã‚“ã€‚");
      }
         return 1;
   }
}

function checkFMEFile(){
   //è¨­å®šãƒ•ã‚¡ã‚¤ãƒ«ã€å®Ÿè¡Œãƒ•ã‚¡ã‚¤ãƒ«ã®å­˜åœ¨ãƒã‚§ãƒƒã‚¯
   var fs = new ActiveXObject( "Scripting.FileSystemObject" );
   if( fs.FileExists(FMEcmdPathx64) ){
      if(debugFlag){
         log("[info]FMEcmdPathx64ã¯å­˜åœ¨ã—ã¾ã™ã€‚");
      }
      FMEcmdPath = FMEcmdPathx64;
      return 0;
   }else if( fs.FileExists(FMEcmdPathx86) ){
      if(debugFlag){
         log("[info]FMEcmdPathx86ã¯å­˜åœ¨ã—ã¾ã™ã€‚");
      }
      FMEcmdPath = FMEcmdPathx86;
      return 0;
   }else if( fs.FileExists(UserSettingFMEcmdPath) ){
      if(debugFlag){
         log("[info]UserSettingFMEcmdPathã¯å­˜åœ¨ã—ã¾ã™ã€‚");
      }
      FMEcmdPath = UserSettingFMEcmdPath;
      return 0;
   }else{
      if(debugFlag){
         log("[error]FMEãŒè¦‹ã¤ã‹ã‚Šã¾ã›ã‚“ã€‚" + FMEcmdPath);
      }
      return 1;
   }
}

function startFME(){
   resCheckXMLFile = checkXMLFile();
   resCheckFMEFile = checkFMEFile();
   if(resCheckFMEFile == 1){
      print("FMEstream.js: [error]FMEãŒè¦‹ã¤ã‹ã‚Šã¾ã›ã‚“ã€‚");
      return 1;
   }else if(resCheckXMLFile == 1){
      print("FMEstream.js: [error]XMLãƒ•ã‚¡ã‚¤ãƒ«ãŒè¦‹ã¤ã‹ã‚Šã¾ã›ã‚“ã€‚" + ScriptDirectoryXMLFilePath + "ã«FMEã®è¨­å®šãƒ•ã‚¡ã‚¤ãƒ«ã‚’ä¿å­˜ã—ã¦ãã ã•ã„ã€‚");
      return 1;
   }

   runCommand = "\"" + FMEcmdPath + "\" /p \"" + StreamConfigXMLFilePath + "\"";
   if(debugFlag){
      log(runCommand);
   }
   var wsh = new ActiveXObject("WScript.Shell");
   wsh.run(runCommand, 7, false);
   print("FMEstream.js: [info]FMEã®ãƒ‡ãƒ¼ã‚¿é€ä¿¡ã‚’é–‹å§‹ã—ã¾ã™");
   return 0;
}

function stopFME(){
   resCheckXMLFile = checkXMLFile();
   resCheckFMEFile = checkFMEFile();
   if(resCheckFMEFile == 1){
      print("FMEstream.js: [error]FMEãŒè¦‹ã¤ã‹ã‚Šã¾ã›ã‚“ã€‚");
      return 1;
   }else if(resCheckXMLFile == 1){
      print("FMEstream.js: [error]XMLãƒ•ã‚¡ã‚¤ãƒ«ãŒè¦‹ã¤ã‹ã‚Šã¾ã›ã‚“ã€‚" + ScriptDirectoryXMLFilePath + "ã«FMEã®è¨­å®šãƒ•ã‚¡ã‚¤ãƒ«ã‚’ä¿å­˜ã—ã¦ãã ã•ã„ã€‚");
      return 1;
   }

   if(debugFlag){
      log("XMLfilePath:" + StreamConfigXMLFilePath);
   }
   //Unicodeå½¢å¼ã¨ã—ã¦ãƒ•ã‚¡ã‚¤ãƒ«ã‚’é–‹ã
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
   print("FMEstream.js: [info]FMEã®ãƒ‡ãƒ¼ã‚¿é€ä¿¡ã‚’åœæ­¢ã—ã¾ã™");
   return 0;
}

function guiFME(){
   resCheckFMEFile = checkFMEFile();
   if(resCheckFMEFile == 1){
      print("FMEstream.js: [error]FMEãŒè¦‹ã¤ã‹ã‚Šã¾ã›ã‚“ã€‚");
      return 1;
   }

   runCommand = "\"" + FMEcmdPath + "\" /g";
   if(debugFlag){
      log(runCommand);
   }
   var wsh = new ActiveXObject("WScript.Shell");
   if(debugFlag){
      log("FMEã®GUIã‚’é–‹ãã¾ã™ã€‚");
   }
   print("FMEã®GUIã‚’é–‹ãã¾ã™ã€‚[File]-[Save Profile]ã‚ˆã‚ŠFMEã®è¨­å®šæƒ…å ±ã‚’ä¿å­˜ã§ãã¾ã™ã€‚" + ScriptDirectoryXMLFilePath + "ã«FMEã®è¨­å®šãƒ•ã‚¡ã‚¤ãƒ«ã‚’ä¿å­˜ã—ã¦ãã ã•ã„ã€‚");
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