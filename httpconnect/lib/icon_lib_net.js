
add_package_load_path ("ext_json2", "lib/ext_json2.js");
require("ext_json2");

/////////////////////////


function hex(opt_code){
    return parseInt(opt_code, 16);
}

/////////////////////////
// ApplicationStart Call + Return
function ApplicationStartCall (applicationId, clientType, magic, clientInfo)
{
     opcode=76;
     this.OpCode=opcode.toString(16);
     this.applicationId = applicationId;
     this.clientType = clientType;
     this.magic = magic;
     this.clientInfo =   new ClientInfo();  
     this.clientInfo=clientInfo;

     // deserialize function
     this.deserialize = function(response){
        var jsonValue = (new Function( "return( " + response + " );" ))();
        var object={} //new object
        for (var prop in jsonValue){
            object[prop]=jsonValue[prop];
        }   
        this.opCode=object[0];
        this.applicationId = object[1];
        this.clientType = object[2];
        this.magic = object[3];
        this.clientInfo = object[4];
    }

   // serialize function
   this.serialize= function(){
     this.clientInfo=this.clientInfo.serialize();
     json= ext_json2.JSON.stringify(this);
     json=json.replace("OpCode", "0");
     json=json.replace("applicationId", "1");
     json=json.replace("clientType", "2");
     json=json.replace("magic", "3");
     json=json.replace("clientInfo", "4");
     return json;
   }
   
}



function ApplicationStartReturn (result)
{
     opcode=77;
	 this.OpCode=opcode.toString(16);
	 
	 this.result =  new ServerCallResult();
     this.result = result;

     // deserialize function
     this.deserialize = function(response){
        var jsonValue = (new Function( "return( " + response + " );" ))();
        var object={} //new object
        for (var prop in jsonValue){
            object[prop]=jsonValue[prop];
        }   
        
		if (this.OpCode != object[0])
		{
		 return false;
		}
		else
		{
         this.result =   new ServerCallResult();
         this.result.deserialize(ext_json2.JSON.stringify(object[1]));
		 return true;
		} 
    }

   // serialize function
   this.serialize= function(){
      return ext_json2.JSON.stringify(this);
   }
   
   this.test= function(){
       alert("Hello");
   }

}



/////////////////////////
// Auto Register User Call + Return

function AutoRegisterUserCall (userGroupId, username, password, trackingInfo)
{
     opcode=123;
     this.OpCode=opcode.toString(16);
	 
     this.userGroupId = userGroupId;
     this.username = username;
     this.password = password;
	 this.trackingInfo= new TrackingInfoDTO();
     this.trackingInfo=trackingInfo;

     // deserialize function
     this.deserialize = function(response){
        var jsonValue = (new Function( "return( " + response + " );" ))();
        var object={} //new object
        for (var prop in jsonValue){
            object[prop]=jsonValue[prop];
        } 
        
        this.opCode   = object[0];
        this.userGroupId = object[1];
        this.username = object[2];
        this.password = object[3];
        this.trackingInfo=object[4];
        
    }

   // serialize function
   this.serialize= function(){
     this.trackingInfo=this.trackingInfo.serialize();
     json= ext_json2.JSON.stringify(this);
     json=json.replace("OpCode", "0");
     json=json.replace("userGroupId", "1");
     json=json.replace("username", "2");
     json=json.replace("password", "3");
     json=json.replace("trackingInfo", "4");
     return json;
   }
   

}


function AutoRegisterUserReturn (result, username, password, userId)
{
     opcode=124;
     this.OpCode=opcode.toString(16);
	 
     this.username = username;
     this.password = password;
     this.userId = userId ;
     this.result =   new ServerCallResult();  
     this.result=result;


     // deserialize function
     this.deserialize = function(response){
        var jsonValue = (new Function( "return( " + response + " );" ))();
        var object={} //new object
        for (var prop in jsonValue){
            object[prop]=jsonValue[prop];
        } 

		if (this.OpCode != object[0])
		{
		 return false;
		}
		else
		{        
         this.result =   new ServerCallResult();
         this.result.deserialize(ext_json2.JSON.stringify(object[1]));

         this.username = object[2];
         this.password = object[3];
         this.userId   = object[4];
		 
		 return true;
		} 
    }

   // serialize function
   this.serialize= function(){
      return ext_json2.JSON.stringify(this);
   }
   
   this.test= function(){
       alert("Hello");
   }

}


/////////////////////////
// Authenticate User Call + Return
function AuthenticateUserCall (username, password, languageCode, userGroupId, otp, info, latitude, longitude, trackingInfo, authenticationSource)
{
     opcode=2;
     this.OpCode=opcode.toString(16);
	 
     this.username = username;
     this.password = password;
     this.languageCode = languageCode;
     this.userGroupId  = userGroupId;
     this.otp=otp;
     this.info=info;
     this.latitude=latitude;
     this.longitude=longitude;
     this.trackingInfo= new TrackingInfoDTO();
     this.trackingInfo=trackingInfo;
     this.authenticationSource=authenticationSource;


     // deserialize function
     this.deserialize = function(response){
        var jsonValue = (new Function( "return( " + response + " );" ))();
        var object={} //new object
        for (var prop in jsonValue){
            object[prop]=jsonValue[prop];
        } 
        
        this.opCode   = object[0];
        this.username = object[1];
        this.password = object[2];
        this.languageCode = object[3];
        this.userGroupId  = object[4];
        this.otp=object[5];
        this.info=object[6];
        this.latitude=object[7];
        this.longitude=object[8];
        this.trackingInfo=object[9];
        this.authenticationSource=object[10];   
    }

   // serialize function
   this.serialize= function()
   {	  
     this.trackingInfo=this.trackingInfo.serialize();
     json= ext_json2.JSON.stringify(this);
     json=json.replace("OpCode", "0");
     json=json.replace("username", "1");
     json=json.replace("password", "2");
     json=json.replace("languageCode", "3");
     json=json.replace("userGroupId", "4");
	 json=json.replace("otp", "5");
     json=json.replace("info", "6");
     json=json.replace("latitude", "7");
     json=json.replace("longitude", "8");
     json=json.replace("trackingInfo", "9");
     json=json.replace("authenticationSource", "10");
     
     return json;	  
   }
   

}


function AuthenticateReturn (result, userSessionId, validationToken, userId, sessionReconnected, isFirstLoginToday, isFirstLoginEver)
{
     opcode=3;
     this.OpCode=opcode.toString(16);
	 
     this.userSessionId = userSessionId;
     this.validationToken = validationToken;
     this.userId  = userId;
     this.sessionReconnected=sessionReconnected;
     this.isFirstLoginToday=isFirstLoginToday;
     this.isFirstLoginEver=isFirstLoginEver;
     this.result =   new ServerCallResult();  
     this.result=result;


     // deserialize function
     this.deserialize = function(response){
        var jsonValue = (new Function( "return( " + response + " );" ))();
        var object={} //new object
        for (var prop in jsonValue){
            object[prop]=jsonValue[prop];
        } 

		if (this.OpCode != object[0])
		{
		 return false;
		}
		else
		{        
         this.result =   new ServerCallResult();
         this.result.deserialize(ext_json2.JSON.stringify(object[1]))
         
		 this.userSessionId = object[2];
         this.validationToken = object[3];
         this.sessionReconnected = object[4];
         this.isFirstLoginToday  = object[5];
         this.isFirstLoginEver=object[6];
		 
		 return true;
		} 
        
    }

   // serialize function
   this.serialize= function(){
      return ext_json2.JSON.stringify(this);
   }
}


/////////////////////////
// User Profile Call + Return
function UserProfileCall (userSessionId, validationToken, userId)
{
     opcode=41;
     this.OpCode=opcode.toString(16);
	 
     this.userSessionId = userSessionId;
     this.validationToken = validationToken;
     this.userId = userId;

     // deserialize function
     this.deserialize = function(response){
        var jsonValue = (new Function( "return( " + response + " );" ))();
        var object={} //new object
        for (var prop in jsonValue){
            object[prop]=jsonValue[prop];
        } 
        
        this.OpCode   = object[0];
        this.userSessionId = object[1];
        this.validationToken = object[2];
        this.userId = object[3];
    }

   // serialize function
   this.serialize= function()
   {	  
     json= ext_json2.JSON.stringify(this);
     json=json.replace("OpCode", "0");
     json=json.replace("userSessionId", "1");
     json=json.replace("validationToken", "2");
     json=json.replace("userId", "3");
     
     return json;	  
   }
   

}

function UserDTO (userId, username, nationalityIsoCode, status, ingameAvatar, communityAvatarLargeHash, communityAvatarMiniHash, picUrl, birthday, gender, profileUrl, loginName, customUserProfileFieldList, preferedLanguageCode, bot, guest )
{
     this.userId = userId;
     this.username = username;
     this.nationalityIsoCode = nationalityIsoCode;
	 this.status = status;
     this.ingameAvatar = ingameAvatar;
     this.communityAvatarLargeHash = communityAvatarLargeHash;
     this.communityAvatarMiniHash = communityAvatarMiniHash;
     this.picUrl = picUrl;
     this.birthday = birthday;
     this.gender = gender;
     this.profileUrl = profileUrl;
     this.loginName = loginName;
     this.customUserProfileFieldList = customUserProfileFieldList;
     this.preferedLanguageCode = preferedLanguageCode;
     this.bot = bot;
     this.guest = guest;
     

     // deserialize function
     this.deserialize = function(response){
        var jsonValue = (new Function( "return( " + response + " );" ))();
        var object={} //new object
        for (var prop in jsonValue){
            object[prop]=jsonValue[prop];
        }   
        this.userId = object[1];
        this.username = object[2];
        this.nationalityIsoCode = object[3];
		this.status = object[4];
        this.ingameAvatar = object[5];
        this.communityAvatarLargeHash = object[6];
        this.communityAvatarMiniHash = object[7];
        this.picUrl = object[8];
        this.birthday = object[9];
        this.gender = object[10];
        this.profileUrl = object[11];
        this.loginName = object[12];
        this.customUserProfileFieldList = object[13];
        this.preferedLanguageCode = object[14];
        this.bot = object[15];
        this.guest = object[16];
        

    }

   // serialize function
   this.serialize= function(){
     json= ext_json2.JSON.stringify(this);
     json=json.replace("userId", "1");
     json=json.replace("username", "2");
     json=json.replace("nationalityIsoCode", "3");
     json=json.replace("status", "4");
     json=json.replace("ingameAvatar", "5");
     json=json.replace("communityAvatarLargeHash", "6");
     json=json.replace("communityAvatarMiniHash", "7");
     json=json.replace("picUrl", "8");
     json=json.replace("birthday", "9");
     json=json.replace("gender", "10");
     json=json.replace("profileUrl", "11");
     json=json.replace("loginName", "12");
     json=json.replace("customUserProfileFieldList", "13");
     json=json.replace("preferedLanguageCode", "14");
     json=json.replace("bot", "15");
     json=json.replace("guest", "16");
     
	 return json;
   }
   
}

function UserProfileReturn (result, profile)
{
     opcode=42;
     this.OpCode=opcode.toString(16);
	 
     this.result =   new ServerCallResult();  
     this.result=result;
     this.profile =   new UserDTO();  
     this.profile=profile;


     // deserialize function
     this.deserialize = function(response){
        var jsonValue = (new Function( "return( " + response + " );" ))();
        var object={} //new object
        for (var prop in jsonValue){
            object[prop]=jsonValue[prop];
        } 

		if (this.OpCode != object[0])
		{
		 return false;
		}
		else
		{        
         this.result =   new ServerCallResult();
         this.result.deserialize(ext_json2.JSON.stringify(object[1]))
         
         this.profile =   new UserDTO();
         this.profile.deserialize(ext_json2.JSON.stringify(object[2]))
		 
		 return true;
		} 
        
    }

   // serialize function
   this.serialize= function(){
      return ext_json2.JSON.stringify(this);
   }
}


/////////////////////////
// GetFeedItemsCall + Return
function GetFeedItemsCall (userSessionId, validationToken, itemIds, shortContent)
{
     opcode=4708;
     this.OpCode=opcode.toString(16);
	 
     this.userSessionId = userSessionId;
     this.validationToken = validationToken;
     this.itemIds = itemIds;
	 this.shortContent = shortContent;


     // deserialize function
     this.deserialize = function(response){
        var jsonValue = (new Function( "return( " + response + " );" ))();
        var object={} //new object
        for (var prop in jsonValue){
            object[prop]=jsonValue[prop];
        } 
        
        this.OpCode   = object[0];
        this.userSessionId = object[1];
        this.validationToken = object[2];
        this.itemIds = object[3];
		this.shortContent = object[4];
    }

   // serialize function
   this.serialize= function()
   {	  
     json= ext_json2.JSON.stringify(this);
     json=json.replace("OpCode", "0");
     json=json.replace("userSessionId", "1");
     json=json.replace("validationToken", "2");
     json=json.replace("itemIds", "3");
     json=json.replace("shortContent", "4");
	 json=json.replace("[", "{");
	 json=json.replace("]", "}");
	 
     return json;	  
   }
   

}


/////////////////////////
// ListGenericFeedItemsCall + Return
function ListGenericFeedItemsCall (userSessionId, validationToken, feedId, rangeFrom, rangeTo, shortContent)
{
     opcode=4704;
     this.OpCode=opcode.toString(16);
	 
     this.userSessionId = userSessionId;
     this.validationToken = validationToken;
     this.itemIds = itemIds;
	 this.shortContent = shortContent;
	 this.shortContent = shortContent;
	 this.shortContent = shortContent;
	 this.shortContent = shortContent;
	 


     // deserialize function
     this.deserialize = function(response){
        var jsonValue = (new Function( "return( " + response + " );" ))();
        var object={} //new object
        for (var prop in jsonValue){
            object[prop]=jsonValue[prop];
        } 
        
        this.OpCode   = object[0];
        this.userSessionId = object[1];
        this.validationToken = object[2];
        this.itemIds = object[3];
		this.shortContent = object[4];
    }

   // serialize function
   this.serialize= function()
   {	  
     json= ext_json2.JSON.stringify(this);
     json=json.replace("OpCode", "0");
     json=json.replace("userSessionId", "1");
     json=json.replace("validationToken", "2");
     json=json.replace("itemIds", "3");
     json=json.replace("shortContent", "4");
	 json=json.replace("[", "{");
	 json=json.replace("]", "}");
	 
     return json;	  
   }
   

}


/////////////////////////
// Tools and DTOs

function parseResult(str)
{
 var magic_end = "CuR3$M4";
 var new_cID_str = "NEW_CONNECTION_ID:";
  
 var tmp_start_of_cID = 0;
 var tmp_end_of_cID = 0;
 var connectionID = "";
 
 tmp_start_of_cID = str.indexOf(new_cID_str);
   
 if (tmp_start_of_cID > -1)
 {
  tmp_end_of_cID = str.indexOf("|{");
	
  if (tmp_end_of_cID > -1)
  {
   connectionID = str.substring(tmp_start_of_cID + 18,tmp_end_of_cID); // (18, 50)
   str = str.substring(tmp_end_of_cID+1);
  } 
 }
	
 var tmp_end_of_ret = str.indexOf(magic_end);
 if (tmp_end_of_ret > -1)
 {
   str = str.substring(0,tmp_end_of_ret);	 
 } 
 
 var tmp_ret = new Array();
 tmp_ret[0] = connectionID;
 tmp_ret[1] = str;
 
 return tmp_ret;
}

function ServerCallResult (gameInstanceId, message, resultCode)
{
     this.gameInstanceId = gameInstanceId;
     this.message = message;
     this.resultCode = resultCode;

     // deserialize function
     this.deserialize = function(response){
        var jsonValue = (new Function( "return( " + response + " );" ))();
        var object={} //new object
        for (var prop in jsonValue){
            object[prop]=jsonValue[prop];
        }   
        this.gameInstanceId = object[1];
        this.message = object[2];
        this.resultCode = object[3];
    }

   // serialize function
   this.serialize= function(){
      return ext_json2.JSON.stringify(this);
   }
   
   this.SINGLE_PLAYER_GAME_PLAYED_IN_TOURNAMENT = function(){
       return 1043; 
   }
    
  this.USER_HAS_ALREADY_BEEN_REFERENCED = function(){
       return 6000; 
   }
   
  this.USER_HAS_STARTED_THIS_QUIZ = function(){
       return 5002; 
   }
   
  this.USER_HAS_ANSWERED_THIS_QUESTION = function(){
       return 5001; 
   }
   
   this.ANSWER_WAS_GIVEN_WITH_NO_TEXT = function(){
       return 5000; 
   }
   
   this.INSUFFICIENT_USER_LEVEL = function(){
       return 3001; 
   }
   
   this.NOT_ENOUGH_STAMINA = function(){
       return 3000; 
   }   
   
   this.NOT_ENOUGH_STAMINA = function(){
       return 2003; 
   }   
   
   this.COUPON_COULD_NOT_BE_ASSIGNED_TO_USER = function(){
       return 2002; 
   }   
   
   this.STORE_FOR_COUPON_NOT_FOUND = function(){
       return 2001; 
   }   
   
   this.INTERNAL_TRANSACTION_IN_WRONG_STATUS = function(){
       return 1031; 
   }   
   
   this.COULD_NOT_FIND_UNIT_TYPE = function(){
       return 1031; 
   }  
   
   
   this.COULD_NOT_FIND_LANGUAGE = function(){
       return 1029; 
   }   

this.COULD_NOT_LIST_USER_VIRTUAL_ITEMS = function(){ 
 	 return 1028; 
 };
 
this.COULD_NOT_FIND_PRODUCT = function(){
 	 return 1027; 
 };
 
this.COULD_NOT_FIND_PURCHASE_WITH_EXTERNAL_INFO = function(){
 	 return 1026; 
 };
 
this.COULD_NOT_FIND_PAYMENT_METHOD_COUNTRY_SPECIFIC_PROPERTIES = function(){
 	 return 1025; 
 };
 
this.COULD_NOT_FIND_PURCHASE = function(){
 	 return 1024; 
 };
 
this.PAYMENT_METHOD_NOT_FOUND = function(){
 	 return 1023; 
 };
 
this.USER_USERNAME_INVALID = function(){
 	 return 1022; 
 };
 
this.USER_EMAIL_WRONG_FORMAT = function(){
 	 return 1021; 
 };
 
this.USER_EMAIL_ALREADY_USED = function(){
 	 return 1020; 
 };
 
this.NEW_USER_PASSWORD_NOT_SET = function(){
 	 return 1019; 
 };

this.NEW_USER_USERNAME_NOT_SET=function(){
 	 return 1018; 
 };
 
this. NEW_USER_AVATAR_NOT_SET =function(){
 	 return 1017; 
 };
this. CAN_NOT_REGISTER_USER_IN_USERSERVER =function(){ 
 	 return 1016; 
 };
this. USER_BIRTHDATE_NOT_CORRECT = function(){
 	 return 1015; 
 };
this. USER_USERNAME_ALREADY_USED = function(){
 	 return 1014; 
 };
this. CAN_NOT_FIND_TOURNAMENT = function(){
 	 return 1013; 
 };
this. USER_ALREADY_REGISTERED = function(){
 	 return 1012; 
 };
this. USER_USERGROUP_NOT_ALLOWED = function(){
 	 return 1011; 
 };
this. TOURNAMENT_INVITATION_REQUIRED = function(){
 	 return 1010; 
 };
this. TOURNAMENT_REGISTRATION_DATE_PASSED = function(){
 	 return 1009; 
 };
this. MULTIPLAYER_MESSAGE_DELIVERY_FAILURE = function(){
 	 return 14; 
 };
this. RESOURCE_FETCHING_ERROR = function(){
 	 return 13; 
 };
this. APPLE_STORE_RECEIPT_VERIFICATION_FAILED = function(){
 	 return 12; 
 };
this. VITEM_PURCHASE_NOT_ENOUGH_BALANCE = function(){
 	 return 11; 
 };
this. AUTO_GENERATED_USENAME = function(){
 	 return 10; 
 };
this. GAME_ALREADY_ABORTED = function(){
 	 return 9; 
 };
this. SLOT_NOT_AVAILABLE = function(){
 	 return 8; 
 };
this. NOT_ENOUGH_BALANCE_TO_JOIN = function(){
 	 return 7; 
 };
this. CONNECTION_ERROR_USER_SESSION_IN_USE = function(){ 
 	 return 6; 
 };
this. NOT_ENOUGH_CHALLENGED_BALANCE = function(){
 	 return 5; 
 };
this. NOT_ENOUGH_INITIATOR_BALANCE = function(){
 	 return 4; 
 };
this. OPPONENT_BUSY = function(){
 	 return 3; 
 };
this. AUTHENTICATION_RECONNECTED = function(){ 
 	 return 2; 
 };
this. ERROR = function(){
 	 return 1; 
 };
this. OK = function(){
 	 return 0; 
 };

   
}

// ********************** //

function ClientInfo ( distributionChannelId, supportsGameResume, supportsMessageAcknowledgment)
{
     this.distributionChannelId = distributionChannelId;
     this.supportsGameResume = supportsGameResume;
     this.supportsMessageAcknowledgment = supportsMessageAcknowledgment;

     // deserialize function
     this.deserialize = function(response){
        var jsonValue = (new Function( "return( " + response + " );" ))();
        var object={} //new object
        for (var prop in jsonValue){
            object[prop]=jsonValue[prop];
        }   
        this.distributionChannelId = object[0];
        this.supportsGameResume = object[1];
        this.supportsMessageAcknowledgment = object[2];
    }

   // serialize function
   this.serialize= function(){
       json=ext_json2.JSON.stringify(this);
       json=json.replace("distributionChannelId", "0");
       json=json.replace("supportsGameResume", "1");
       json=json.replace("supportsMessageAcknowledgment", "2");
      return json;
   }
   
}

// ********************** //


function TrackingInfoDTO (downloadChannelId, referrerUrl, hostUrl)
{
     this.downloadChannelId = downloadChannelId;
     this.referrerUrl = referrerUrl;
     this.hostUrl = hostUrl;

     // deserialize function
     this.deserialize = function(response){
        var jsonValue = (new Function( "return( " + response + " );" ))();
        var object={} //new object
        for (var prop in jsonValue){
            object[prop]=jsonValue[prop];
        }   
        this.downloadChannelId = object[1];
        this.referrerUrl = object[2];
        this.hostUrl = object[3];

    }

   // serialize function
   this.serialize= function(){
     json= ext_json2.JSON.stringify(this);
     json=json.replace("downloadChannelId", "1");
     json=json.replace("referrerUrl", "2");
     json=json.replace("hostUrl", "3");
     return json;
   }
   
}


// ********************** //


function concatObject(obj) {
  str='';
  for(prop in obj)
  {
    str+=prop + " value :"+ obj[prop]+"\n";
  }
  return(str);
}


   
//////////////////////////
// Needed for panasonic
provide ("icon_lib_net");
