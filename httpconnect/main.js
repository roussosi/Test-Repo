//////////////////////////////////////////////////////////////////////////////////
// Load Packages
//////////////////////////////////////////////////////////////////////////////////
add_package_load_path ("icon_lib_base64", "lib/icon_lib_base64.js");
require("icon_lib_base64");

add_package_load_path ("icon_lib_http", "lib/icon_lib_http.js");
require("icon_lib_http");

add_package_load_path ("icon_lib_net", "lib/icon_lib_net.js");
require("icon_lib_net");

////////////////////////
appli_symbol = "httpconnect";

game_board = new container({ visible_p:true });

game_board.create = function() 
{

 /////If components of "game_board" object have been created, this function will return/////
 ///// after this line of code to prevent re-creation of components/////
    if (this.components.length > 0) return;

    /////Components of "game_board" object are defined in here/////
    this.components = 
    [
        this.bg = new gbox ({
            width: 1920,
            height: 1080,
            translate: [0, 0, 0],
            color: [195, 195, 195, 255]
        }),
        
        this.message = new gtextbox ({
            width: 1500,
            height: 900,
            translate: [0, 0, 1],
            color: [255, 255 ,255 ,255],
            font_size: 35,
            align: LEFT 
        })        
    ];
}


game_board.appear = function() {
    this.create();
    this.set_data();
};

game_board.disappear = function() {
    this.visible_p = false;
    this.free();
};

game_board.set_data = function() 
{
 this.timer = {};

 setf_text(this.message, "Starting ... ");
};


game_board.free = function() {
    setf_text(this.message, "");
};



function print_to_screen(status, header, body, uielement) 
{		 
  if (status == 200)
  {
   try
   {  
    setf_text(uielement, uielement.text + "\n\n" + icon_lib_base64.decodeBase64(body));  	
   }	
   catch(err)
   {
    setf_text(uielement, uielement.text + "\n\n" + "Error in print_to_screen! description: " + err.message );
   } 
 
  }
  else
  {
   setf_text(uielement, uielement.text + "\n\n" + "Error! Status = " + status);  				  
  }
};

function do_not_print_to_screen(status, header, body, uielement) 
{

}
 
var iconlib = new icon_lib_http.ICON_lib_net();

game_board.test = function() 
{
 //generic try / catch for all errors
 try
 {
  setf_text(this.message, "game_board.test()");

  var url = "http://sherlock.gt.local/Game_Server_Web/client/l2?m=";
  var magic_end = "CuR3$M4";
  var new_cID_str = "NEW_CONNECTION_ID:";
   
  var connectionID = "";  
  var tmp_url = "";
 
  var applicationId = "29870EFD-190E-44BF-C9B5-D01C7A3F7E5C";  //Alpha iphone
  var clientType = "3";  //iphone
  var magic = "c669febb430946444e5552cf56b6ca0e47bff0ec"; // magic key to allow applications to connect  
  var clientInfo = new icon_lib_net.ClientInfo();;  //A ClientInfoDTO containing optional information about the client. 
  

  //try / catch for network errors
  try 
  {
   ////////////////////////////////
   // 1. Get Connection ID with App Start Call
   ////////////////////////////////	
   var appstartObj = new icon_lib_net.ApplicationStartCall (applicationId, clientType, magic, clientInfo);
  
   var serialized_appstartObj = appstartObj.serialize();
  
   //lets make a call to application start call 
   //tmp_url = url + icon_lib_base64.encodeBase64(serialized_appstartObj);
   tmp_url = url + icon_lib_base64.encodeBase64(connectionID + "|" + serialized_appstartObj + magic_end);
  
   setf_text(this.message, this.message.text + "\n\n" + "Step 1: Getting a connection ID.. ");
   //setf_text(this.message, this.message.text + "\n" + "tmp_url = '"+tmp_url+"'");
  
   var tmp_url_status = "";
   var tmp_url_header = "";
   var tmp_url_body = "";  
  
   iconlib.getUrl(tmp_url, do_not_print_to_screen, game_board.message); 
  
   tmp_url_status = iconlib.return_url_status();
   tmp_url_header = iconlib.return_url_header();
   tmp_url_body  = iconlib.return_url_body();
  
   if (tmp_url_status != 200)
   {  
	throw "Error in ApplicationStartCall! Status = " + tmp_url_status;
   }
	
   var tmp_ret = icon_lib_base64.decodeBase64(tmp_url_body);
     
   var ret_array = icon_lib_net.parseResult(tmp_ret);
   
   if (ret_array[0] != "")
   {
    connectionID = ret_array[0];
   }
   
   tmp_ret = ret_array[1];
   
   //setf_text(this.message, this.message.text + "\n" + "   tmp_ret = '"+tmp_ret+"'"); 
   setf_text(this.message, this.message.text + " .... "+connectionID);  
   
   ////////////////////////////////
   // 2. App Start Call
   ////////////////////////////////
   
   tmp_url = url + icon_lib_base64.encodeBase64(connectionID + "|" + serialized_appstartObj + magic_end);
   
   setf_text(this.message, this.message.text + "\n" + "Step 2: Making an Application Start Call");
      
   iconlib.getUrl(tmp_url, do_not_print_to_screen, game_board.message); 
  
   tmp_url_status = iconlib.return_url_status();
   tmp_url_header = iconlib.return_url_header();
   tmp_url_body  = iconlib.return_url_body();
   
   if (tmp_url_status != 200)
   {  
	throw "Error in ApplicationStartCall! Status = " + tmp_url_status;
   }
	 
   tmp_ret = icon_lib_base64.decodeBase64(tmp_url_body);

   ret_array = icon_lib_net.parseResult(tmp_ret);
   if (ret_array[0] != "")
   {
    connectionID = ret_array[0];
	//setf_text(this.message, this.message.text + "\n" + "  NEW connectionID = '"+connectionID+"'");  
   }
   tmp_ret = ret_array[1];
   
   setf_text(this.message, this.message.text + " ... Done!");  
	
   //setf_text(this.message, this.message.text + "\n" + "  tmp_ret = '"+tmp_ret+"'");  

   
   ////////////////////////////////
   // 3. Auto Register User Call
   ////////////////////////////////

   setf_text(this.message, this.message.text + "\n" + "Step 3: Auto Register User Call");
   var userGroupId = "A4B2D33A-A6F6-46CB-84FB-3F8C819C8652";
   var username = "irtest";
   var password = "test";
   var userID = "";
   var trackingOBj= new icon_lib_net.TrackingInfoDTO (); // (downloadChannelId, referrerUrl, hostUrl)
	
   var autoregisterObj = new icon_lib_net.AutoRegisterUserCall (userGroupId, username, password, trackingOBj);
  
   tmp_url = url + icon_lib_base64.encodeBase64(connectionID + "|" + autoregisterObj.serialize() + magic_end);	
	
   iconlib.getUrl(tmp_url, do_not_print_to_screen, game_board.message); 
  
   tmp_url_status = iconlib.return_url_status();
   tmp_url_header = iconlib.return_url_header();
   tmp_url_body  = iconlib.return_url_body();
	
   if (tmp_url_status != 200)
   {  
	throw "Error in AutoRegisterUserCall! Status = " + tmp_url_status;
   }

   tmp_ret = icon_lib_base64.decodeBase64(tmp_url_body);

   ret_array = icon_lib_net.parseResult(tmp_ret);
   if (ret_array[0] != "")
   {
    connectionID = ret_array[0];
    setf_text(this.message, this.message.text + "\n" + " Error: NEW connectionID = '"+connectionID+"'");  
   }
   tmp_ret = ret_array[1];
   //setf_text(this.message, this.message.text + "\n" + "  tmp_ret = '"+tmp_ret+"'");  

   var retObj = new icon_lib_net.AutoRegisterUserReturn();
   if (retObj.deserialize(tmp_ret) == false)
   {
    setf_text(this.message, this.message.text + "\n" + "ERROR in AutoRegisterUserReturn.deserialize ");  
   }
   else
   {
	setf_text(this.message, this.message.text + " ... Done!");     
    username = retObj.username;
    password = retObj.password ;
    userID = retObj.userId;   
    setf_text(this.message, this.message.text + "\n" + "  {username, pass, ID} = {" + username + "," + password + "," + userID +"}");
   }


   
   ////////////////////////////////
   // 4. Authenticate User Call 
   ////////////////////////////////
   var userSessionId = "";
   var validationToken = "";
	
   var languageCode = "el";
   var otp = "";
   var info = "";
   var latitude = "";
   var longitude = "";
   var authenticationSource = "";
   
   setf_text(this.message, this.message.text + "\n" + "Step 4: Authenticate User Call");
	
   var authUserObj = new icon_lib_net.AuthenticateUserCall (username, password, languageCode, userGroupId, otp, info, latitude, longitude, trackingOBj, authenticationSource);  
   var athserial = authUserObj.serialize();
   	
   tmp_url = url + icon_lib_base64.encodeBase64(connectionID + "|" + athserial + magic_end);
   
//   setf_text(this.message, this.message.text + "\n" + "athserial = '" + athserial + "'");  
//   setf_text(this.message, this.message.text + "\n" + "tmp_url = " + tmp_url);  
   
   iconlib.getUrl(tmp_url, do_not_print_to_screen, game_board.message); 
  
   tmp_url_status = iconlib.return_url_status();
   tmp_url_header = iconlib.return_url_header();
   tmp_url_body  = iconlib.return_url_body();
	
   if (tmp_url_status != 200)
   {  
	throw "Error in AuthenticateUserCall! Status = " + tmp_url_status;
   }

   tmp_ret = icon_lib_base64.decodeBase64(tmp_url_body);

   ret_array = icon_lib_net.parseResult(tmp_ret);
   if (ret_array[0] != "")
   {
    connectionID = ret_array[0];
    setf_text(this.message, this.message.text + "\n" + "  Error: NEW connectionID = '"+connectionID+"'");  
   }
   tmp_ret = ret_array[1];
   //setf_text(this.message, this.message.text + "\n" + "  tmp_ret = '"+tmp_ret+"'");  

   var retObj = new icon_lib_net.AuthenticateReturn();
   if (retObj.deserialize(tmp_ret) == false)
   {
    setf_text(this.message, this.message.text + "\n" + "ERROR in AuthenticateReturn.deserialize ");  
   }
   else
   {
    userSessionId = retObj.userSessionId;
	validationToken = retObj.validationToken;
	
	setf_text(this.message, this.message.text + " ... Done!");  
    //setf_text(this.message, this.message.text + "\n" + "  {userSessionId, validationToken} = {" + userSessionId + "," + validationToken +"}");
   }

   
   ////////////////////////////////
   // 5. User Profile Call 
   ////////////////////////////////
   
   setf_text(this.message, this.message.text + "\n" + "Step 5: User Profile Call ");
	
   var UserProfileCallObj = new icon_lib_net.UserProfileCall (userSessionId, validationToken, userID);
  
   var upcserial = UserProfileCallObj.serialize();
 
   tmp_url = url + icon_lib_base64.encodeBase64(connectionID + "|" + upcserial + magic_end);
   
//   setf_text(this.message, this.message.text + "\n" + "upcserial = '" + upcserial + "'");   
//   setf_text(this.message, this.message.text + "\n" + "tmp_url = " + tmp_url);  
   
   iconlib.getUrl(tmp_url, do_not_print_to_screen, game_board.message); 
  
   tmp_url_status = iconlib.return_url_status();
   tmp_url_header = iconlib.return_url_header();
   tmp_url_body  = iconlib.return_url_body();
	
   if (tmp_url_status != 200)
   {  
	throw "Error in UserProfileCall! Status = " + tmp_url_status;
   }

   tmp_ret = icon_lib_base64.decodeBase64(tmp_url_body);

   ret_array = icon_lib_net.parseResult(tmp_ret);
   if (ret_array[0] != "")
   {
    connectionID = ret_array[0];
    setf_text(this.message, this.message.text + "\n" + "  Error: NEW connectionID = '"+connectionID+"'");  
   }
   tmp_ret = ret_array[1];
   //setf_text(this.message, this.message.text + "\n" + "  tmp_ret = '"+tmp_ret+"'");  

   var retObj = new icon_lib_net.UserProfileReturn();
   if (retObj.deserialize(tmp_ret) == false)
   {
    setf_text(this.message, this.message.text + "\n" + "ERROR in UserProfileReturn.deserialize ");  
   }
   else
   {
	
	setf_text(this.message, this.message.text + " ... Done!");  
    setf_text(this.message, this.message.text + "\n" + "  {username, nationalityIsoCode, status, bot, guest} = {" + retObj.profile.username + "," + retObj.profile.nationalityIsoCode + "," + retObj.profile.status + "," + retObj.profile.bot + "," + retObj.profile.guest +"}");
   }


   
  }
  catch(err)
  {
   //Catch connection Errors
   setf_text(this.message, this.message.text + "\n\n" + "Net Error description: " + err.message );
  } 
 


   
   ////////////////////////////////
   // 6. Get Feed Items Call 
   ////////////////////////////////
   
   
   var itemIds = new Array();
   itemIds[0] = "25F6EA97-6774-418C-A073-0E8CC0FDB212";
   //itemIds[1] = "ar2";
   var shortContent = "t";
   
   setf_text(this.message, this.message.text + "\n" + "Step 6: Get Feed Items Call ");
	
   var getFitemsObj = new icon_lib_net.GetFeedItemsCall (userSessionId, validationToken, itemIds, shortContent);
  
   var fobjserial = getFitemsObj.serialize();
 
   tmp_url = url + icon_lib_base64.encodeBase64(connectionID + "|" + fobjserial + magic_end);
   
   setf_text(this.message, this.message.text + "\n" + "fobjserial = '" + fobjserial + "'");   
//   setf_text(this.message, this.message.text + "\n" + "tmp_url = " + tmp_url);  

     
  iconlib.getUrl(tmp_url, print_to_screen, game_board.message); 

 /*  
   tmp_url_status = iconlib.return_url_status();
   tmp_url_header = iconlib.return_url_header();
   tmp_url_body  = iconlib.return_url_body();
	
   if (tmp_url_status != 200)
   {  
	throw "Error in GetFeedItemsCall! Status = " + tmp_url_status;
   }

 
   tmp_ret = icon_lib_base64.decodeBase64(tmp_url_body);

   ret_array = icon_lib_net.parseResult(tmp_ret);
   if (ret_array[0] != "")
   {
    connectionID = ret_array[0];
    setf_text(this.message, this.message.text + "\n" + "  Error: NEW connectionID = '"+connectionID+"'");  
   }
   tmp_ret = ret_array[1];
   setf_text(this.message, this.message.text + "\n" + "  tmp_ret = '"+tmp_ret+"'");   
*/   
   

   ////////////////////////////////
   // Test utf 8
   ////////////////////////////////
/*
   setf_text(this.message, "Test Ελληνικά.. ΑΆασξακλσξ ξκασδφη ξκασδηφ ξκασδη φξκ" );
	
   tmp_url = "http://www.bookenemy.com/neo/index.php?pID=18";
   
   iconlib.getUrl(tmp_url, do_not_print_to_screen, game_board.message); 
   
   tmp_url_status = iconlib.return_url_status();
   tmp_url_header = iconlib.return_url_header();
   tmp_url_body  = iconlib.return_url_body();
	
   if (tmp_url_status != 200)
   {  
	throw "Error in UserProfileCall! Status = " + tmp_url_status; 
   }
   
   setf_text(this.message, this.message.text + "\n\n" + tmp_url_body.substring() );
*/   
////////////////////////////////////////////////////   
////////////////////////////////////////////////////   
////////////////////////////////////////////////////   
  
    
 }
 catch(err)
 {
  setf_text(this.message, this.message.text + "\n\n" + "Error description: " + err.message );
 } 

};


 


var sobj = stage ({
    "symbol": appli_symbol + "_main",
    "in": [
    {
        "from": ["default"],
        "hook": function(obj){
            game_board.appear();
			
			game_board.test();
			
            complete_on_stage(obj);
        }
    },
    ],
    
    "out": [{
        "to": ["default"],
        "hook": function(obj){
            complete_off_stage(obj);
        }
    }
    ],
    
    "bg_image": [ ],
    
    "components": [
                   game_board
                  ],
    
    "key_hook": function (up_down, key) {
    
        if (up_down != KEY_PRESS)
            return false;
    
        switch (key) {
            case TXK_RETURN:
                exit_appli(0);
                return true;
        }
        return true;
    },         
});

ready_appli();