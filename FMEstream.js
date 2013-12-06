//////////////////////////////////////////////////
//FMEstream.js�T�v
//FME���R�}���h���C���Ŏ��s���邽�߂�limechat�X�N���v�g
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//Config
//FME�ݒ�t�@�C���̃p�X
UserSettingXMLFilePath = "C:\\FME.xml";

//FMECmd.exe�t�@�C���̃p�X
UserSettingFMEcmdPath ="C:\\Program Files (x86)\\Adobe\\Flash Media Live Encoder 3.2\\FMLECmd.exe";

//true�Ńf�o�b�O�p�̃��O�o�͂�L���ɂ��܂�
debugFlag = false;

//////////////////////////////////////////////////
//�������@
//(1)Limechat2�����s
//
//(2)[�ݒ�(O)]-[�X�N���v�g�̐ݒ�(C)]-[�X�N���v�g�t�H���_���J��(F)]��I��
//
//(3)�J�����t�H���_�ɂ��̃t�@�C�����R�s�[
//
//(4)�ȉ��̎菇��FME�ݒ�t�@�C��������
//   �EFME���N��
//   �E�C�ӂ̕����p�̐ݒ���s��
//   �E[File]-[Save Profile]���A�ݒ�t�@�C���� C:\Users\�����[�U�[����\AppData\Roaming\LimeChat2\scripts\FME.xml �ɕۑ�
//
//(5)�X�N���v�g�̐ݒ���AFMEstream.js�̔C�ӂ̃T�[�o�g���E�N���b�N���A����t����
//   �iIRC�T�[�o�ƘA�g�����肵�Ȃ����߁A�ǂ̃T�[�o�g�Ɂ���t���Ă����܂��܂���B�j
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//�g����
//�R�}���h:/startfme
//         FME���g�p�����f�[�^���M���J�n���܂��B
//         Justin���g�p���Ă���ꍇ�́A���̃R�}���h�����s�������_�ŕ������J�n����܂��B
//
//�R�}���h:/stopfme
//         FME���g�p�����f�[�^���M���~���܂��B
//         Justin���g�p���Ă���ꍇ�́A���̃R�}���h�����s�������_�ŕ�������~���܂��B
//
//�R�}���h:/guifme
//         FME���O���t�B�J�����[�U�[�C���^�t�F�[�X�Ŏ��s���܂��B
//         �ݒ�t�@�C�������Ȃ����ꍇ�Ɏg���Ă��������B
//
//////////////////////////////////////////////////
//Update
//2013.05.25 �Ƃ肠�����쐬�B
//
//2013.12.07 �X�V�͈ȉ���3�_
//           �EXML�t�@�C�����ȉ��ɕۑ����Ă���΁A//Config �Ńp�X��ݒ肵�Ă��Ȃ��Ă����삷��l�ɂ����B
//             C:\Users\�����[�U�[����\AppData\Roaming\LimeChat2\scripts\FME.xml
//
//           �EFME�̃C���X�g�[���p�X���f�t�H���g�ł���΁A //Config �Őݒ肵�Ȃ��Ă����삷��悤�ɂ����B
//
//           �E/guifme �R�}���h�̎���
//
//////////////////////////////////////////////////
FMEcmdPathx64 = "C:\\Program Files (x86)\\Adobe\\Flash Media Live Encoder 3.2\\FMLECmd.exe";
FMEcmdPathx86 = "C:\\Program Files\\Adobe\\Flash Media Live Encoder 3.2\\FMLECmd.exe";

ScriptDirectoryXMLFilePath = userScriptPath + "\\FME.xml";

function event::onLoad() {
   resCheckXMLFile = checkXMLFile();
   resCheckFMEFile = checkFMEFile();
   if(resCheckXMLFile == 0 && resCheckFMEFile == 0){
      print("FMEstream.js: [info]/startfmeコマンドで放送を開始できます。");
   }else if(resCheckFMEFile == 1){
      print("FMEstream.js: [error]FMEが見つかりません。");
   }else if(resCheckXMLFile == 1){
      print("FMEstream.js: [error]XMLファイルが見つかりません。" + ScriptDirectoryXMLFilePath + "にFMEの設定ファイルを保存してください。");
   }
}

function checkXMLFile(){
   //設定ファイル、実行ファイルの存在チェック
   var fs = new ActiveXObject( "Scripting.FileSystemObject" );
   if( fs.FileExists(UserSettingXMLFilePath) ){
      if(debugFlag){
         log("[info]UserSettingXMLFilePathは存在します。");
      }
      StreamConfigXMLFilePath = UserSettingXMLFilePath;
      return 0;
   }else if( fs.FileExists(ScriptDirectoryXMLFilePath) ){
      if(debugFlag){
         log("[info]ScriptDirectoryXMLFilePathは存在します。");
      }
      StreamConfigXMLFilePath = ScriptDirectoryXMLFilePath;
      return 0;
   }else{
      if(debugFlag){
         log("[error]XMLファイルは存在しません。");
      }
         return 1;
   }
}

function checkFMEFile(){
   //設定ファイル、実行ファイルの存在チェック
   var fs = new ActiveXObject( "Scripting.FileSystemObject" );
   if( fs.FileExists(FMEcmdPathx64) ){
      if(debugFlag){
         log("[info]FMEcmdPathx64は存在します。");
      }
      FMEcmdPath = FMEcmdPathx64;
      return 0;
   }else if( fs.FileExists(FMEcmdPathx86) ){
      if(debugFlag){
         log("[info]FMEcmdPathx86は存在します。");
      }
      FMEcmdPath = FMEcmdPathx86;
      return 0;
   }else if( fs.FileExists(UserSettingFMEcmdPath) ){
      if(debugFlag){
         log("[info]UserSettingFMEcmdPathは存在します。");
      }
      FMEcmdPath = UserSettingFMEcmdPath;
      return 0;
   }else{
      if(debugFlag){
         log("[error]FMEが見つかりません。" + FMEcmdPath);
      }
      return 1;
   }
}

function startFME(){
   resCheckXMLFile = checkXMLFile();
   resCheckFMEFile = checkFMEFile();
   if(resCheckFMEFile == 1){
      print("FMEstream.js: [error]FMEが見つかりません。");
      return 1;
   }else if(resCheckXMLFile == 1){
      print("FMEstream.js: [error]XMLファイルが見つかりません。" + ScriptDirectoryXMLFilePath + "にFMEの設定ファイルを保存してください。");
      return 1;
   }

   runCommand = "\"" + FMEcmdPath + "\" /p \"" + StreamConfigXMLFilePath + "\"";
   if(debugFlag){
      log(runCommand);
   }
   var wsh = new ActiveXObject("WScript.Shell");
   wsh.run(runCommand, 7, false);
   print("FMEstream.js: [info]FMEのデータ送信を開始します");
   return 0;
}

function stopFME(){
   resCheckXMLFile = checkXMLFile();
   resCheckFMEFile = checkFMEFile();
   if(resCheckFMEFile == 1){
      print("FMEstream.js: [error]FMEが見つかりません。");
      return 1;
   }else if(resCheckXMLFile == 1){
      print("FMEstream.js: [error]XMLファイルが見つかりません。" + ScriptDirectoryXMLFilePath + "にFMEの設定ファイルを保存してください。");
      return 1;
   }

   if(debugFlag){
      log("XMLfilePath:" + StreamConfigXMLFilePath);
   }
   //Unicode形式としてファイルを開く
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
   print("FMEstream.js: [info]FMEのデータ送信を停止します");
   return 0;
}

function guiFME(){
   resCheckFMEFile = checkFMEFile();
   if(resCheckFMEFile == 1){
      print("FMEstream.js: [error]FMEが見つかりません。");
      return 1;
   }

   runCommand = "\"" + FMEcmdPath + "\" /g";
   if(debugFlag){
      log(runCommand);
   }
   var wsh = new ActiveXObject("WScript.Shell");
   if(debugFlag){
      log("FMEのGUIを開きます。");
   }
   print("FMEのGUIを開きます。[File]-[Save Profile]よりFMEの設定情報を保存できます。" + ScriptDirectoryXMLFilePath + "にFMEの設定ファイルを保存してください。");
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