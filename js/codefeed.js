
    function getxml_content($url) {
      var feed = new google.feeds.Feed($url);
	  feed.setNumEntries(30);
	  feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
      feed.load(function(result) {
        if (!result.error) {
			//console.log(result);
			$("#feed").html("");
			var $contentfeed="<ul><li class='decs-news'><h2>"+result.feed.title+"</h2><i>"+result.feed.description+"</i></li>";
		for (var i = 0; i < result.feed.entries.length; i++) {
	            var entry = result.feed.entries[i];
	            $contentfeed+="<li><span id='item-title'><a href='"+entry.link+"' target='_blank'><h1>"+(i+1)+". "+entry.title+"</h1></a></span>";
				(entry.mediaGroups)?($contentfeed+="<span id='img'><img src='"+entry.mediaGroups[0].contents[0].url+"' alt='img rss' /></span>"):null;
				
				$("#temp").html(entry.content);
				
				var img="";
				($("#temp").find("img").length>0)?(img=$("#temp").find("img")[0].src):(img="");
				if(img=="" || img.length<0){
					(entry.xmlNode.getElementsByTagName("enclosure").length>0)?(img=entry.xmlNode.getElementsByTagName("enclosure")[0].attributes[0].value):(img="");
				}
				(img.length>0)?($contentfeed+="<span id='img'><img src='"+img+"' alt='img rss' /></span>"):(null);
				$contentfeed+="<div id='item-content'><p>"+xoaTagHtml(entry.content,200)+"</p></div></li>";
         }

		$contentfeed+="</ul>";
		$("#temp").html("");
		$("#feed").append($contentfeed);
			
        }
      });
    }
    

    function xoaTagHtml(strx,chop){ 
	if(strx.indexOf("<")!=-1)
	{
		var s = strx.split("<"); 
		for(var i=0;i<s.length;i++){ 
			if(s[i].indexOf(">")!=-1){ 
				s[i] = s[i].substring(s[i].indexOf(">")+1,s[i].length); 
			} 
		} 
		strx =  s.join(""); 
	}
	chop = (chop < strx.length-1) ? chop : strx.length-2; 
	while(strx.charAt(chop-1)!=' ' && strx.indexOf(' ',chop)!=-1) chop++; 
	strx = strx.substring(0,chop-1);

	return strx+'...'; 
}


google.load("feeds", "1");
	$().ready(function(){

		loadpageview();
		$("#pagenew").on("click","li.menu-item-show-hide",function(){
			//console.log($(this).children().attr('href'));
			var container = $("#feed");
			$url=$(this).children().attr('href');//$(this).attr("href");
			getxml_content($url);
			return false;
			
		});

		$("#feed").on("click","a",function(){
			var $url=$(this).attr("href");
			navigator.app.loadUrl($url, { openExternal:true });
			return false;
		});

		$("#pagenew").on("click","li#showmenu-top",function(){
			var $check=$(".menu-item-show-hide").css("display");
			if($check=="none"){
				$(".menu-item-show-hide").css({"display":'block'});
			}else{
				$(".menu-item-show-hide").css({"display":'none'});
			}
			//alert($check);
			return false;
			
		});

		
	});
	
	function loadpageview(){
		$("#pagenew").html("");
				
		$.get('https://9cca2754e2a397df3e62f39bfccad5ade154fc49.googledrive.com/host/0B6XCpb6gYskpOGl2cHRlM3I4NGc',
		function(data){
			//console.log(data);
				var stringpageview="<ul><li id='showmenu-top'><img src='img/menu-icon-top.png'/>Menu</li>";
				for(i=0;i<data.danhsach.items.length;i++){
					stringpageview+="<li class='menu-item-show-hide'><a href='"+data.danhsach.items[i].url+
					"' title='link page view'><span>"+data.danhsach.items[i].title+"</span></a></li>";
					//console.log(data.danhsach.items);
				}
				stringpageview+="</ul>";
				$("#pagenew").html(stringpageview);
				getxml_content(data.danhsach.items[0].url);
		}).fail(function() {
	    //alert( "error" );
	    $("#pagenew").html("<div id='content-box-error'><button onclick='loadlai();'>Tải lại</button>"+
	    	"<h1><span id='error-load'>Bạn hãy kiểm tra xem đã kết nối internet chưa!</span></h1></div>");
	    return false;
	  });
		
	}//end load page view

	function loadlai(){
		window.location.href='';
		//alert("đã load lại");
	}