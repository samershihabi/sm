 var response_content=JSON.parse(context.getVariable("response.content"));
 print(context.getVariable("ab.request.queryparam.origin"));
 print(context.getVariable("ab.request.queryparam.radius"));
 var response_array=[];
 var response_counter=response_content.length-1;
 var hasMore=false;
 var request_limit=context.getVariable("ab.request.queryparam.limit");
 var request_offset=context.getVariable("ab.request.queryparam.offset")-1;

try{


 if(response_counter<request_limit){request_limit=response_counter+1;}
 if((request_limit !== null && request_limit !== "") && (request_offset !== null && request_limit !== "")){

     for(request_offset;request_limit>response_array.length;request_offset++){
      response_array.push(response_content[request_offset+1]);
     }
     if(request_offset<response_counter){hasMore=true;}
 }else{
    response_array=response_content;
 }

 response_obj={
            "metadata": {
                "type": context.getVariable("proxy.pathsuffix"),
                "hasMore": hasMore,
                "limit": request_limit,
                "offset": context.getVariable("ab.request.queryparam.offset"),
                "count": response_content.length
            },
            "data": response_array
        };
     context.setVariable("response.content",JSON.stringify(response_obj));
}catch(e){
    context.setVariable("ab.js.error",true);
}
