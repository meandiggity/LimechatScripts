//////////////////////////////////////////////////
//FMEstream.js�T�v
//FME���R�}���h���C���Ŏ��s���邽�߂�limechat�X�N���v�g
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//Config
//FME�ݒ�t�@�C���̃p�X
StreamConfigXMLFilePath = "E:\\FME\\justin.tv.xml";

//FMECmd.exe�t�@�C���̃p�X
FMEcmdPath ="C:\\Program Files (x86)\\Adobe\\Flash Media Live Encoder 3.2\\FMLECmd.exe";

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
//   �E[File]-[Save Profile]���A�ݒ�t�@�C����C�ӂ̃t�H���_�ɕۑ�
//   �E���̃X�N���v�g��4�s�� StreamConfigXMLFilePath �ɐݒ�t�@�C���̃p�X������
//      ����: �f�B���N�g���̊K�w������ \�}�[�N ��2�����ċL�ڂ��Ă��������B
//
//(5)���̃X�N���v�g��7�s�� FMEcmdPath �ɐݒ肳��Ă���A
//   FMLECmd.exe�̃t�@�C���p�X�������������m�F����B
//
//   Windows XP�̏ꍇ��A32bitOS���g���Ă���ꍇ�́A�f�t�H���g�l�������Ȃ���������܂���B
//   ���̏ꍇ�́A�������t�@�C���p�X��ݒ肵�Ă��������B
//      ����: �f�B���N�g���̊K�w������ \�}�[�N ��2�����ċL�ڂ��Ă��������B
//
//(4)�X�N���v�g�̐ݒ���AFMEstream.js�̔C�ӂ̃T�[�o�g���E�N���b�N���A����t����
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
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//Update
//2013.05.25 �Ƃ肠�����쐬�B
//
//////////////////////////////////////////////////


function event::onLoad() {
   //設定ファイル、実行ファイルの存在チェック
   var fs = new ActiveXObject( "Scripting.FileSystemObject" );
   if( fs.FileExists(StreamConfigXMLFilePath) ){
      if(debugFlag){
         log("[info]StreamConfigXMLFilePathは存在します。");
      }
      if( fs.FileExists(FMEcmdPath) ){
         if(debugFlag){
            log("[info]FMEcmdPathは存在します。/startfmeコマンドで放送を開始できます。");
         }
         print("FMEstream.js: [info]/startfmeコマンドで放送を開始できます。");
      }else{
         if(debugFlag){
            log("[error]FMEcmdPathは存在しません。" + FMEcmdPath);
         }
            print("FMEstream.js: [error]FMEcmdPathは存在しません。" + FMEcmdPath);
      }
   }else{
      if(debugFlag){
         log("[error]StreamConfigXMLFilePathは存在しません。" + StreamConfigXMLFilePath);
      }
         print("FMEstream.js: [error]StreamConfigXMLFilePathは存在しません。" + StreamConfigXMLFilePath);
   }

}

function startFME(){
   runCommand = "\"" + FMEcmdPath + "\" /p \"" + StreamConfigXMLFilePath + "\"";
   if(debugFlag){
      log(runCommand);
   }
   var wsh = new ActiveXObject("WScript.Shell");
   wsh.run(runCommand, 7, false);
   print("FMEstream.js: [info]FMEのデータ送信を開始します");
}

function stopFME(){
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