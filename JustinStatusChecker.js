///////////////////////////////////////////////////
//Config
//�`�F�b�N��������ꗗ
array = new Array("mean_diggity","forcezoo","milk_ruku","faitan0703","tomato_tmt","du_zhong_tea");

//true�ŃX�N���v�g���[�h���ɕ����̗L�����`�F�b�N���܂�
checkEventOnLoad = true;

//true�ŌJ��Ԃ������̗L�����`�F�b�N���܂�
checkRoop = true

//�`�F�b�N�Ԋu(�b)
roopTime = 60;

//true�Ńf�o�b�O�p�̃��O�o�͂�L���ɂ��܂�
debugFlag = false;

//true�Ń��[�v���s���̕������Ă��Ȃ��`�����l���̃��b�Z�[�W�o�͂�L���ɂ��܂�
roopCheckOutputNotStreamMessage = false;
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//�������@
//(1)Limechat2�����s
//(2)[�ݒ�(O)]-[�X�N���v�g�̐ݒ�(C)]-[�X�N���v�g�t�H���_���J��(F)]��I��
//(3)�J�����t�H���_�ɂ��̃t�@�C�����R�s�[
//(4)�X�N���v�g�̐ݒ���AJustinStatusChecker�̔C�ӂ̃T�[�o�g���E�N���b�N���A����t����
//   �iIRC�T�[�o�ƘA�g�����肵�Ȃ����߁A�ǂ̃T�[�o�g�Ɂ���t���Ă����܂��܂���B�j
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//Update
//2013.05.14 �Ƃ肠�����쐬�B
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
      log("[info]" + channelName + " の放送の有無をチェックします。execute:checkJustinStream()");
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
               // 取得したJSONデータにチャンネル情報がある場合
               if(xmlHttpRequest.responseText.length!=2){
                  var data = eval( '(' + xmlHttpRequest.responseText + ')' );
                  if(debugFlag){
                     log("[output]live  :" + data[0].channel.login + " (URL:" + data[0].channel.channel_url + ")");
                  }
                  print("live  :" + data[0].channel.login + " (URL:" + data[0].channel.channel_url + ")");
               }else if(notStreamMessage){
                  if(debugFlag){
                     log("[output]" + channelName + "は放送していません");
                  }
                  print(channelName + "は放送していません");
               }
           }
       }
   }

   var requestUrl = 'http://api.justin.tv/api/stream/list.json?channel=' + channelName;
   if(debugFlag){
      log("[info]チェックAPIにアクセスします。:" + requestUrl);
   }

   xmlHttpRequest.open( 'GET', requestUrl );
   xmlHttpRequest.send( null );
}

function checkAll(){
   if(debugFlag){
      log("[info]すべてのチャンネルをチェックします。execute:checkAll()");
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
         log("[info]" + roopTime + "秒毎にチェックします");
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
         log("[info]/checkallコマンドが実行されました");
      }
      context.handled = true
      checkAll();
   }else if  (command == "CHECK"){
      if(debugFlag){
         log("[info]/checkコマンドが実行されました。引数:" + param);
      }
      context.handled = true
      checkJustinStream(param,true);
   }
}