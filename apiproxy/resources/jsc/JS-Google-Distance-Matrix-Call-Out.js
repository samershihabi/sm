//to check if the request contain an origin(coordination) if not use ip coordinates. after check that the "considerIp": "true".
if(context.getVariable("ab.request.queryparam.origin")!==""&&context.getVariable("ab.request.queryparam.origin")!==null){
  var origin=context.getVariable("ab.request.queryparam.origin");
}else{
  var origin=context.getVariable("ab.ip.coordinations");
}
var radius_qp=Number(context.getVariable("ab.request.queryparam.radius"));
var destinations_obj=JSON.parse(context.getVariable("response.content"));
var destinations_res_obj={};
var res_start_index=0;
var num_of_requests=0;
var res_end_index=0;
var destance_obj_with_google_response=[];
request_obj = new Request();
destinations_geolocation_array=[];
start_index=0;
end_index=24;
destinations_query_param_temp="";
destinations_obj.map(function(location){
    destinations_geolocation_array.push(location.geographic_location.latitude+","+location.geographic_location.longitude);
});
//take the first 100 elements
try{
    print(JSON.stringify(destinations_geolocation_array));
    destinations_geolocation_array.map(function(element){
        var queryparam=function(index_value,destination_var){
            var query_sub_string="";
            if(destination_var === null || destination_var === ""){
                query_sub_string=index_value;
            }else{
                query_sub_string=destination_var+"|"+index_value;
            }
            return query_sub_string;
        };
        var setTimeout=function sleep(callback,milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds){
                    callback();
                    break;
                }
            }
        };
        var google_geo_location_request=function (address,num_of_request) {
            try {
                var index=Math.floor(Math.random() * 10) + 1;
                var google_destance_matrix_api_key=context.getVariable("private.ab.google_distance_matrix_apikey_"+index);
                 print(index,google_destance_matrix_api_key);
                request_obj.url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+origin+"&destinations="+address+"&key="+google_destance_matrix_api_key;
                var google_response = httpClient.send(request_obj);
                google_response=JSON.parse(google_response.getResponse().content);
                print(JSON.stringify(google_response));
                if(google_response.status==="OK"){
                        num_of_request=0;
                        return google_response;
                }else{
                        if(num_of_request<20) {
                            num_of_request=num_of_request+1;
                            google_geo_location_request(address, num_of_request);
                        }else{
                            //error handiling fuction
                            print("over than 20 requests");
                            return false;
                        }
                }
            }catch(e){
                print("try and catch error",JSON.stringify(e));
                //error handiling function
            }
        };

        if(start_index<=end_index){

            destinations_query_param_temp=queryparam(element,destinations_query_param_temp);

            if(start_index===end_index || start_index === (destinations_geolocation_array.length-1)){
                //do google request
                var google_response=google_geo_location_request(destinations_query_param_temp,0);
                res_start_index=num_of_requests*25;
                res_end_index=res_start_index+25;
                if((destinations_geolocation_array.length)<(res_end_index)){
                    var def=res_end_index-(destinations_geolocation_array.length);
                    res_end_index=res_end_index-def;
                }
                var destinations_object=JSON.parse(context.getVariable("response.content"));
                var google_response_index=0;
                for(res_start_index;res_start_index<res_end_index;res_start_index++){
                  destinations_object[res_start_index].distance=google_response.rows[0].elements[google_response_index].distance;
                  destinations_object[res_start_index].duration=google_response.rows[0].elements[google_response_index].duration;
                     if(radius_qp && radius_qp !==0 && radius_qp !== null){
                           if(radius_qp >= destinations_object[res_start_index].distance.value ){
                              destance_obj_with_google_response.push(destinations_object[res_start_index]);
                           }
                       }else{
                           destance_obj_with_google_response.push(destinations_object[res_start_index]);
                       }

                  google_response_index=google_response_index+1;
                }
                num_of_requests=num_of_requests+1;
            }
        }else{
            destinations_query_param_temp="";
            end_index=end_index+25;
            destinations_query_param_temp=queryparam(element,destinations_query_param_temp);
        }

        start_index=start_index+1;
    });
    context.setVariable("response.content",JSON.stringify(destance_obj_with_google_response));

}catch(e){
    print(JSON.stringify(e));
    context.setVariable("ab.js.error",true);
}
