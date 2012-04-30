///////////////////////////////////////////////////////////////
// library for network connections
///////////////////////////////////////////////////////////////

function ICON_lib_net(method, sync)
{
 //Define Library parameters
 
 //attribute containing the body of the http_request in  getUrl(...)
 this.url_status = "";
 this.url_header = "";
 this.url_body = "";
 
 if ( (!method) || (method == undefined) || (method == null) || (method == "") )
 {
  this.method = "GET";
 }
 else
 {
  this.method = method;
 }
 
 if ( (!sync) || (sync == undefined) || (sync == null) || (sync == "") )
 {
  this.sync = true;
 }
 else
 {
  this.sync = sync;
 }
 
 
 //Define Library Methods
 this.getUrl=function (url, onloadf, uielement)
 { 
  tmp_url_status = "";
  tmp_url_header = "";
  tmp_url_body = "";  

  http_request ({
      "url" : url,
      "method" : this.method,
      "onload" : function (status, header, body) 
                 {		 
				   tmp_url_status = status;
				   tmp_url_header = header;
				   tmp_url_body = body;  
				   onloadf (status, header, body, uielement);				   
                 },
      "sync" : this.sync,
      "redirect" : true
	  
	  });
	  
  this.url_status = tmp_url_status;  
  this.url_header = tmp_url_header;  
  this.url_body = tmp_url_body;    
 };

 this.return_url_status=function ()
 { 
  return  this.url_status; 
 }

 this.return_url_header=function ()
 { 
  return  this.url_header; 
 }

 this.return_url_body=function ()
 { 
  return  this.url_body; 
 } 
};



//////////////////////////
// Needed for panasonic
provide ("icon_lib_http");