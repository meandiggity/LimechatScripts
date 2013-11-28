//////////////////////////////////////////////////
//FMEstream.jsŠT—v
//FME‚ğƒRƒ}ƒ“ƒhƒ‰ƒCƒ“‚ÅÀs‚·‚é‚½‚ß‚ÌlimechatƒXƒNƒŠƒvƒg
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//Config
//FMEİ’èƒtƒ@ƒCƒ‹‚ÌƒpƒX
StreamConfigXMLFilePath = "E:\\FME\\justin.tv.xml";

//FMECmd.exeƒtƒ@ƒCƒ‹‚ÌƒpƒX
FMEcmdPath ="C:\\Program Files (x86)\\Adobe\\Flash Media Live Encoder 3.2\\FMLECmd.exe";

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
//   E[File]-[Save Profile]‚æ‚èAİ’èƒtƒ@ƒCƒ‹‚ğ”CˆÓ‚ÌƒtƒHƒ‹ƒ_‚É•Û‘¶
//   E‚±‚ÌƒXƒNƒŠƒvƒg‚Ì4s–Ú StreamConfigXMLFilePath ‚Éİ’èƒtƒ@ƒCƒ‹‚ÌƒpƒX‚ğ‘‚­
//      ’ˆÓ: ƒfƒBƒŒƒNƒgƒŠ‚ÌŠK‘w‚ğ¦‚· \ƒ}[ƒN ‚Í2‚Â‘±‚¯‚Ä‹LÚ‚µ‚Ä‚­‚¾‚³‚¢B
//
//(5)‚±‚ÌƒXƒNƒŠƒvƒg‚Ì7s–Ú FMEcmdPath ‚Éİ’è‚³‚ê‚Ä‚¢‚éA
//   FMLECmd.exe‚Ìƒtƒ@ƒCƒ‹ƒpƒX‚ª³‚µ‚¢–‚ğŠm”F‚·‚éB
//
//   Windows XP‚Ìê‡‚âA32bitOS‚ğg‚Á‚Ä‚¢‚éê‡‚ÍAƒfƒtƒHƒ‹ƒg’l³‚µ‚­‚È‚¢‚©‚à‚µ‚ê‚Ü‚¹‚ñB
//   ‚»‚Ìê‡‚ÍA³‚µ‚¢ƒtƒ@ƒCƒ‹ƒpƒX‚ğİ’è‚µ‚Ä‚­‚¾‚³‚¢B
//      ’ˆÓ: ƒfƒBƒŒƒNƒgƒŠ‚ÌŠK‘w‚ğ¦‚· \ƒ}[ƒN ‚Í2‚Â‘±‚¯‚Ä‹LÚ‚µ‚Ä‚­‚¾‚³‚¢B
//
//(4)ƒXƒNƒŠƒvƒg‚Ìİ’è‚æ‚èAFMEstream.js‚Ì”CˆÓ‚ÌƒT[ƒo˜g‚ğ‰EƒNƒŠƒbƒN‚µA›‚ğ•t‚¯‚é
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
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//Update
//2013.05.25 ‚Æ‚è‚ ‚¦‚¸ì¬B
//
//////////////////////////////////////////////////


function event::onLoad() {
   //è¨­å®šãƒ•ã‚¡ã‚¤ãƒ«ã€å®Ÿè¡Œãƒ•ã‚¡ã‚¤ãƒ«ã®å­˜åœ¨ãƒã‚§ãƒƒã‚¯
   var fs = new ActiveXObject( "Scripting.FileSystemObject" );
   if( fs.FileExists(StreamConfigXMLFilePath) ){
      if(debugFlag){
         log("[info]StreamConfigXMLFilePathã¯å­˜åœ¨ã—ã¾ã™ã€‚");
      }
      if( fs.FileExists(FMEcmdPath) ){
         if(debugFlag){
            log("[info]FMEcmdPathã¯å­˜åœ¨ã—ã¾ã™ã€‚/startfmeã‚³ãƒãƒ³ãƒ‰ã§æ”¾é€ã‚’é–‹å§‹ã§ãã¾ã™ã€‚");
         }
         print("FMEstream.js: [info]/startfmeã‚³ãƒãƒ³ãƒ‰ã§æ”¾é€ã‚’é–‹å§‹ã§ãã¾ã™ã€‚");
      }else{
         if(debugFlag){
            log("[error]FMEcmdPathã¯å­˜åœ¨ã—ã¾ã›ã‚“ã€‚" + FMEcmdPath);
         }
            print("FMEstream.js: [error]FMEcmdPathã¯å­˜åœ¨ã—ã¾ã›ã‚“ã€‚" + FMEcmdPath);
      }
   }else{
      if(debugFlag){
         log("[error]StreamConfigXMLFilePathã¯å­˜åœ¨ã—ã¾ã›ã‚“ã€‚" + StreamConfigXMLFilePath);
      }
         print("FMEstream.js: [error]StreamConfigXMLFilePathã¯å­˜åœ¨ã—ã¾ã›ã‚“ã€‚" + StreamConfigXMLFilePath);
   }

}

function startFME(){
   runCommand = "\"" + FMEcmdPath + "\" /p \"" + StreamConfigXMLFilePath + "\"";
   if(debugFlag){
      log(runCommand);
   }
   var wsh = new ActiveXObject("WScript.Shell");
   wsh.run(runCommand, 7, false);
   print("FMEstream.js: [info]FMEã®ãƒ‡ãƒ¼ã‚¿é€ä¿¡ã‚’é–‹å§‹ã—ã¾ã™");
}

function stopFME(){
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