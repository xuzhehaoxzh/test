function ajax(method,URL,data,success){
	var xhr = new XMLHttpRequest();
	if(method=='get' && data){
		URL+='?'+data;
	}
	xhr.open(method, URL, true);
	if(method=='get'){
		xhr.send()
	}else{
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(data);
	} 
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4){
			if(xhr.status == 200) {
			success && success(xhr.responseText)
			}else {
			alert('出错了,Err：' + xhr.status);
			}
		}
	};
};	
