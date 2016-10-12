var oBanner=document.getElementById('c-banner');
var aImg=oBanner.getElementsByTagName('img')[0];
var oBannerBtn=document.getElementById('c-banner-btn')
var aI=oBannerBtn.getElementsByTagName('i');
var aHref=oBanner.getElementsByTagName('a')[0];
var data = [
	        {"link":"http://open.163.com/","src":"img/banner1.jpg" },
	        {"link":"http://study.163.com/","src":"img/banner2.jpg"},
	        {"link":"http://www.icourse163.org/","src":"img/banner3.jpg"}
];
var num=0
var itime =''
var stime =''

//轮播图淡出效果，配合CSS动画实现。
	function carousel(){  
		itime = setInterval(function(){
			num++;
			//轮播图图片地址设置
			aImg.src=data[num%data.length].src;

			//轮播图圆点按钮设置
			for(var i=0;i<aI.length;i++){
				aI[i].style.background='#fff'
			}
			aI[num%aI.length].style.background='#333';

			//轮播图链接地址设置
			aHref.href=data[num%data.length].link;
			
			
		}, 5000)
	};
	carousel();
	aImg.onmouseover=function(){
		//鼠标移动图片上马上切换透明度为1
		this.className='paused';
		//同时取消动画
		clearInterval(itime);
	};
	aImg.onmouseout=function(){
		//先取消定时器，防止多次来回鼠标移动产生图片动画时间上的误差
		clearInterval(itime);
		clearTimeout(stime);
		//设置单次动画防止鼠标移出图片时先淡入一次动画效果
		this.className='run';
		carousel();
		//恢复原来的动画效果
		stime=setTimeout(function(){
			aImg.className='';	
		}
		,5000)
	};

	// 点击小圆点切换图片
	for(var i=0;i<aI.length;i++){
		//设置索引值
		aI[i].index=i
		aI[i].onclick=function(){
			num=this.index;
			aImg.src=data[num%data.length].src;
			aHref.href=data[num%data.length].link;
			//点击时先把所以的原点变为白色，在设置选中目标的颜色
			for(var j=0;j<aI.length;j++){
				aI[j].style.background='#fff'
			};		
			this.style.background='#333'		
		}
	}



// ***************************************************************************************************
var oDesign=document.getElementById('c-ml-design');
var oLanguage=document.getElementById('c-ml-language');
//用ajax获取课程列表	
function get(parameter,element){
	ajax('get','http://study.163.com/webDev/couresByCategory.htm',parameter,function(adata){
			var adata=JSON.parse(adata);
					for(var i=0;i<adata.list.length;i++){
						var oTeam1=document.createElement('div');
						var oTeam2=document.createElement('div');
						oTeam1.className='c-ml-list';
						oTeam2.className='c-list-main';
						element.appendChild(oTeam1);
						element.appendChild(oTeam2);
						var oImg1=document.createElement('img');
						var oImg2=document.createElement('img');
						var oP1=document.createElement('p');
						var oP2=document.createElement('p');
						var oP3=document.createElement('p');
						var oP4=document.createElement('p');
						var oP5=document.createElement('p');
						var oP6=document.createElement('p');
						var oP7=document.createElement('p');
						var oH3=document.createElement('h3');
						oImg1.src=adata.list[i].middlePhotoUrl;
						oImg2.src=adata.list[i].middlePhotoUrl;
						oP1.className='c-list-name';
						oP2.className='c-list-provider';
						oP3.className='c-list-learnerCount';
						oP4.className='c-list-price';
						oP5.className='c-main-learnerCount'
						oP6.className='c-main-provider'
						oP7.className='c-main-description'
						if(!adata.list[i].categoryName){
							adata.list[i].categoryName='无';
						};
						if(adata.list[i].price == 0){
							oP4.innerHTML='免费';
						}else{
							oP4.innerHTML='&yen'+adata.list[i].price;
						}
						oP1.innerHTML=adata.list[i].name;
						oP2.innerHTML=adata.list[i].provider;
						oP3.innerHTML=adata.list[i].learnerCount;
						oP5.innerHTML=adata.list[i].learnerCount+'人在学';
						oP6.innerHTML='发布者：'+adata.list[i].provider+'<br />'+'分类：'+adata.list[i].categoryName;
						oP7.innerHTML=adata.list[i].description;
						oH3.innerHTML=adata.list[i].name;
						oTeam1.appendChild(oImg1);
						oTeam1.appendChild(oP1);
						oTeam1.appendChild(oP2);
						oTeam1.appendChild(oP3);
						oTeam1.appendChild(oP4);
						oTeam1.appendChild(oTeam2);
						oTeam2.appendChild(oImg2);
						oTeam2.appendChild(oH3);
						oTeam2.appendChild(oP5);
						oTeam2.appendChild(oP6);
						oTeam2.appendChild(oP7);
					}
					var oList = document.getElementsByClassName('c-ml-list');
					var oListMain = document.getElementsByClassName('c-list-main');
					var oName=document.getElementsByClassName('c-list-name');	
						//察看课程详细信息浮层效果
						var aTime;
						for(var i=0;i<oList.length;i++){
							oList[i].index=i;
							oListMain[i].index=i;
							oName[i].index=i;

							//鼠标滑过时改变阴影，字体颜色
							oList[i].onmouseover=function(){
								var aNum=this.index;
								oList[aNum].style.boxShadow='5px 5px 10px #e6e6e6';
								oName[aNum].style.color='#39a030';

								//鼠标悬浮1秒显示课程详细信息
								aTime=setTimeout(function(){
										oListMain[aNum].style.display='block'
								},1000)
								
							}
							//鼠标离开时清除定时，设置阴影，还原字体颜色
							oList[i].onmouseout=function(){
								clearTimeout(aTime);
								oList[this.index].style.boxShadow='1px 1px 1px #e6e6e6';
								oName[this.index].style.color='#333';
							}
							//鼠标留在详细课表时，不消失
							oListMain[i].onmouseover=function(){	
								this.style.display='block';
							}
							//鼠标离开详细课标时消失，普通课表出现
							oListMain[i].onmouseout=function(){
								oList[this.index].style.display='block';
								this.style.display='none';
							}
						}
					
	})
};
//获取产品设计课程
get('pageNo=1&psize=20&type=10',oDesign);
//获取编程语言课程
get('pageNo=1&psize=20&type=20',oLanguage);




// ***************************************************************************************************
 //左侧内容区tab切换
 var tabNav=document.getElementById('c-ml-nav');
 var aTab1=tabNav.getElementsByTagName('li')[0];
 var aTab2=tabNav.getElementsByTagName('li')[1];
 var aType=10;
 var pageType=document.getElementById('design-pages');
 aTab1.onclick=function(){
 	//改变tab按钮颜色和字体颜色
 	aTab1.style.backgroundColor='#39a030';
 	aTab1.style.color='#fff';
 	aTab2.style.backgroundColor='#fff';
 	aTab2.style.color='#666';
 	//隐藏编程语言内容，显示产品设计内容
 	oDesign.style.display='block';
 	oLanguage.style.display='none';
 	//隐藏编程语言页码控件，显示产品设计页码控件
 	oDesignPages.style.display='block';
 	oLanguagePages.style.display='none';
 	//每次点击产品设计内容都从第一页开始
 	oDesign.innerHTML='';
 	get('pageNo=1&psize=20&type=10',oDesign);
 	aType=10;
 	//切换成产品设计课程的页码按钮
 	pageType=document.getElementById('design-pages');
 	//点击重置产品设计课程页码从第一页开始
 	oDesignPages.innerHTML='';
 	getPages('pageNo=1&psize=20&type=10',oDesignPages,oDesign);
 	oDesignPages.style.marginLeft=0;
 	oPagesUp.style.background='gray';
	oPagesUp.style.cursor='default';
 }
 aTab2.onclick=function(){	
 	//改变tab按钮颜色和字体颜色
 	aTab2.style.backgroundColor='#39a030';
 	aTab2.style.color='#fff';
 	aTab1.style.backgroundColor='#fff';
 	aTab1.style.color='#666';
 	//隐藏产品设计内容，显示编程语言内容
 	oDesign.style.display='none';
 	oLanguage.style.display='block';
 	//隐藏产品设计按钮控件，显示编程语言按钮控件
 	oDesignPages.style.display='none';
 	oLanguagePages.style.display='block';
 	//每次点击编程语言页码内容都从第一页开始
 	oLanguage.innerHTML='';
 	get('pageNo=1&psize=20&type=20',oLanguage);
 	aType=20;
 	//点击切换成编程语言课程的页码按钮
 	pageType=document.getElementById('language-pages');
 	//点击重置编程语言页码课程从第一页开始
 	oLanguagePages.innerHTML='';
 	getPages('pageNo=1&psize=20&type=20',oLanguagePages,oLanguage);
 	oLanguagePages.style.marginLeft=0;
 	oPagesUp.style.background='gray';
	oPagesUp.style.cursor='default';
 }





// ***************************************************************************************************
//翻页效果
var cmlPages=document.getElementById('c-ml-pages');
var oPagesDown=cmlPages.getElementsByClassName('pagesdown')[0];
var oPagesUp=cmlPages.getElementsByClassName('pagesup')[0];
var oDesignPages=document.getElementById('design-pages');
var oLanguagePages=document.getElementById('language-pages');
var lastPage;
function getStyle(obj,attr){return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr]};
var oleft;
oPagesDown.onclick=function(){
	down(pageType)
}
oPagesUp.onclick=function(){
	up(pageType)
}
//判断翻页是否到头
function down(element){
	oleft=parseInt(getStyle(element,'marginLeft'));
	//判断翻页是否到最前面，禁止再往前面翻页
	if(oleft>(8-lastPage)*28){
		element.style.marginLeft=oleft-28+'px';
	}
	lnvalid(element);
}
function up(element){
	oleft=parseInt(getStyle(element,'marginLeft'));
	//判断翻页是否到最末尾，禁止再往后面翻页
	if(oleft<0){
		element.style.marginLeft=oleft+28+'px';
	}
	lnvalid(element);
}	
//翻页到头或到尾改变翻页键颜色
function lnvalid(element){
	oleft=parseInt(getStyle(element,'marginLeft'));
	if(oleft==0){
		oPagesUp.style.background='gray';
		oPagesUp.style.cursor='default';
	}else if(oleft==(8-lastPage)*28){
		oPagesDown.style.background='gray';
		oPagesDown.style.cursor='default'
	}else {
		oPagesUp.style.background='#9dd8b1';
		oPagesUp.style.cursor='pointer';
		oPagesDown.style.background='#9dd8b1';
		oPagesDown.style.cursor='pointer'
	}
}





// ***************************************************************************************************
//页数控制函数
function getPages(parameter,element,element1){
	ajax('get','http://study.163.com/webDev/couresByCategory.htm',parameter,function(pagesNum){
		var pagesNum=JSON.parse(pagesNum);
		for(var i=1;i<=pagesNum.totalPage;i++){
			//获取多少页数
			var oLi=document.createElement('li')
			oLi.innerHTML=i;
			oLi.index=i;
			lastPage=pagesNum.totalPage
			element.appendChild(oLi);
		}
		var numPage=element.getElementsByTagName('li')
		var pageNoNum;
		var aParameter;
		numPage[0].style.color='#39a030';
		for(var i=0;i<numPage.length;i++){
			numPage[i].onclick=function(){
				pageNoNum=this.index;
				//根据页数改变内容地址
				aParameter='pageNo='+pageNoNum+'&psize=20&type='+aType;
				//点击改变页码颜色
				for(var j=0;j<numPage.length;j++){
				numPage[j].style.color='#666';
				}
			this.style.color='#39a030';
			element1.innerHTML=''
			//获取不同页数的内容地址
			get(aParameter,element1);
			}
		}
	})
}
//创建产品设计类页码
getPages('pageNo=1&psize=20&type=10',oDesignPages,oDesign);
//创建编程语言类页码
getPages('pageNo=1&psize=20&type=20',oLanguagePages,oLanguage);





// ***************************************************************************************************
//点击“机构介绍”中的整块图片区域，调用浮层播放介绍视频
var ovideo=document.getElementById('c-video');
var playVideo=document.getElementById('c-mr-video').getElementsByTagName('img')[0];
var closeVideo=ovideo.getElementsByClassName('close')[0];
var wyVideo=document.getElementById('wyvideo')
var oMask=document.getElementById('mask')
playVideo.onclick=function(){
	//点击图片显示视频播放界面
	ovideo.style.display='block';
	//视频从头开始播放
	wyVideo.load();
	//视频自动播放
	wyVideo.autoplay='autoplay';
	oMask.style.display='block';
}
closeVideo.onclick=function(){
	//点击X关闭视频播放界面
	ovideo.style.display='none';
	//暂停播放视频
	wyVideo.pause();
	oMask.style.display='none';
}



// ***************************************************************************************************
//热门推荐设置
var oRanking=document.getElementById('allranking');
function getranking(){
	ajax('get','http://study.163.com/webDev/hotcouresByCategory.htm','',function(rank){
		var rank=JSON.parse(rank);
		for(i=0;i<20;i++){
			var aRank=document.createElement('div');
			var aImgBox=document.createElement('div')
			var aImg=document.createElement('img');
			var aP=document.createElement('p');
			var aSpan=document.createElement('span');
			aRank.className='ranking';
			aImgBox.className='Imgbox';
			aImg.src=rank[i].smallPhotoUrl;
			aP.innerHTML=rank[i].name;
			aSpan.innerHTML=rank[i].learnerCount
			oRanking.appendChild(aRank);
			aRank.appendChild(aImgBox)
			aImgBox.appendChild(aImg);
			aRank.appendChild(aP);
			aRank.appendChild(aSpan);
		}
	})
}
getranking();
var ranktime;
//每5秒滚动更新一门课程
function rollRanking(){
	ranktime=setInterval(function(){
		oTop=parseInt(getStyle(oRanking,'marginTop'));
		//判断是否超出20门课程，超过了回到第一门课程
		if(oTop>-700){
			oRanking.style.marginTop=oTop-71+'px';
		}else {
			oRanking.style.marginTop=0;
		}
	},5000)
}
rollRanking();
//鼠标移入，停止滚动更新课程
oRanking.onmouseover=function(){
	clearInterval(ranktime);
}
//鼠标移出，继续滚动更新课程
oRanking.onmouseout=function(){
	rollRanking();
}



// ***************************************************************************************************
//设置本地cookie，
function setCookie(key,value,day){
	var oDate=new Date();
	oDate.setDate(oDate.getDate()+day);
	document.cookie=key+'='+value+';expires='+oDate.toGMTString();
};
//单个读取cookie里面的值
function getCookie(key){
	var arr1=document.cookie.split('; ');
	for(var i=0;i<arr1.length;i++){
		var arr2=arr1[i].split('=');
		if(arr2[0]===key){
			return decodeURI(arr2[1]);
		}
	}
};
var oMsg=document.getElementById('msg');
var oMsgTip=oMsg.getElementsByClassName('msg-tip')[0];
function msg(){
	var oMsg=document.getElementById('msg');
	var oMsgTip=oMsg.getElementsByClassName('msg-tip')[0];
	if (getCookie('username')=='wy') {
		oMsg.style.display='none'
	}else{
		oMsgTip.onclick=function(){
			setCookie('username','wy');
			oMsg.style.display='none';
			
		}
	}
};
msg();



// ***************************************************************************************************
//登录弹窗
var oLogin=document.getElementById('login');
var LoginClose=oLogin.getElementsByClassName('close')[0];
var LoginBtn=oLogin.getElementsByClassName('login-btn')[0];
var LoginUser=oLogin.getElementsByTagName('input')[0];
var LoginPass=oLogin.getElementsByTagName('input')[1];
var oHmain=document.getElementById('h-main');
var HBtn=oHmain.getElementsByClassName('h-btn')[0];
var oCancel=oHmain.getElementsByClassName('cancel')[0];

//帐号密码输入框失去焦点时，改变其样式，去除提示信息
LoginUser.onfocus=function(){
	LoginUser.style.background='#fff';
	LoginUser.style.textIndent='10px';
	LoginUser.setAttribute('placeholder','');
}
LoginPass.onfocus=function(){
	LoginPass.style.background='#fff';
	LoginPass.style.textIndent='10px';
	LoginPass.setAttribute('placeholder','');
}
////帐号密码输入框失去焦点时，改变其样式，
LoginUser.onblur=function(){
	//判断是否输入帐号，如果没有则恢复提示信息
	if(LoginUser.value==''){
		LoginUser.style.background='#fafafa';
		LoginUser.setAttribute('placeholder','帐号');
	}
}
LoginPass.onblur=function(){
	//判断是否输入密码，如果没有则恢复提示信息
	if(LoginPass.value==''){
		LoginPass.style.background='#fafafa';
		LoginPass.setAttribute('placeholder','密码');
	}
}
//点击X图标关闭登录弹窗,并清除帐号密码。
LoginClose.onclick=function(){
	oLogin.style.display='none';
	LoginUser.value='';
	LoginPass.value='';
	oMask.style.display='none';
}

//验证登录信息
LoginBtn.onclick=function(){

	var Username=hex_md5(LoginUser.value);
	var Password=hex_md5(LoginPass.value);
	ajax('get','http://study.163.com/webDev/login.htm','userName='+Username+'&password='+Password,function(a){
		if(a==='1'){
			oMask.style.display='none';
			oLogin.style.display='none';
			setCookie('loginSuc','1',7);
			ajax('get','http://study.163.com/webDev/attention.htm','',function(b){
				if(b==='1'){
					setCookie('followSuc','1',7);
					HBtn.value='已关注';
					HBtn.disabled = true;
					HBtn.className='follow-btn'
					oCancel.style.display='block';
				}
			})
		}else {
			alert('帐号密码错误，请重新输入！~')
		}
	})
}
//判断是否已经登录
function signin(){
	if(!getCookie('loginSuc')){
		HBtn.onclick=function(){
			oLogin.style.display='block';
			//点击登入清空已经输入的账户和密码
			LoginUser.value='';
			LoginPass.value='';
			LoginUser.setAttribute('placeholder','帐号');
			LoginPass.setAttribute('placeholder','密码');
			LoginUser.style.background='#fafafa';
			LoginPass.style.background='#fafafa';
			oMask.style.display='block';
		}
	}else {
		HBtn.value='已关注';
		HBtn.disabled = true;
		HBtn.className='follow-btn'
		oCancel.style.display='block';
	}
}
signin()
//取消按钮设置 清除Cookie  还原样式
oCancel.onclick=function(){
	
	setCookie('loginSuc','',-1);
	setCookie('followSuc','',-1);
	HBtn.value='关注';
	HBtn.disabled = false;
	HBtn.className='h-btn';
	this.style.display='none';
	
}
