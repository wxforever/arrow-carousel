	;(function(){function Carousel(obj){

		var _default={
				element:undefined,
				position:{
					top:'0',
					left:'0',
					width:'0'
				}
				};

			for (var i in obj) {
		    _default[i] = obj[i] || _default[i];
		  }
		  this.init(_default);
	}

	Carousel.prototype={
		init:function(obj){
			_this=this;
			//字符串转dom
			function parseDom(arg) {
					 var objE = document.createElement("div");
					 objE.innerHTML = arg;
					 return objE.childNodes;
				};
			if(obj.element){
				 
				var parent=document.querySelector(obj.element);
				parent.style.position='abosolute';
				parent.style.whiteSpace='nowrap';
				parent.style.overflow='hidden';
				parent.style.top=obj.position.top;
				parent.style.left=obj.position.left;
				parent.style.width=obj.position.width;
				//添加作用方向按钮
				var moveleft='<div class="moveleft" style="position:absolute;left:0;top:0;width:1rem;height:2rem;background-image:url(left.png);background-size:cover;"></div>';
				var moveright='<div class="moveright" style="position:absolute;right:0;top:0;width:1rem;height:2rem;-webkit-transform:rotate(180deg);background-image:url(left.png);background-size:cover"></div>';
				var leftdom=parseDom(moveleft);
				var rightdom=parseDom(moveright);
				leftdom[0].style.top=rightdom[0].style.top=parseInt(getComputedStyle(parent,null).height)/2-20+'px';
				parent.appendChild(leftdom[0]);
				parent.appendChild(rightdom[0]);

				
				var showCount=obj.showCount;//显示的个数

				
			    var remove=[];//需要移除的节点先存入数组，直接删除会影响遍历forEach的使用计数

				Array.prototype.forEach.call(parent.childNodes,function(element){
					
					
					if(element.nodeType==3){
						remove.push(element);
					}else{
						//子元素内联块
                      
						 if(element!=document.querySelector('.moveleft')&&element!=document.querySelector('.moveright')){
						 	
						 	element.style.display="inline-block";
							element.style.width=100/showCount+'%';
							element.style.cssText+='-webkit-transition:-webkit-transform 0.5s ease-in-out;';
						 }
						
					}

				});
				//移除文字节点
			   remove.forEach(function(element){
                   parent.removeChild(element);
			   });
				var childLength=parent.childNodes.length-2;//需要滚动的子元素个数
				var count=0;//点击计数
				document.querySelector('.moveleft').addEventListener('touchstart',function(event){
				 	
                    if(count+1==1){//不能继续向右移动
						return;
					}
                     count++;
					Array.prototype.forEach.call(this.parentNode.childNodes,function(element){
					 
                      if(element!=document.querySelector('.moveleft')&&element!=document.querySelector('.moveright')){
                    
                      	 element.style.cssText+='-webkit-transform:translate('+parseInt(getComputedStyle(element,null).width)*count+'px,0);';
                      
                      }
                     
					})
					 event.preventDefault();
				},false);
				document.querySelector('.moveright').addEventListener('touchstart',function(event){
					if(count-1<-(childLength-showCount)){//不能继续向左移动
				 		return;
				 	}
                    count--;
					Array.prototype.forEach.call(this.parentNode.childNodes,function(element){
                      if(element!=document.querySelector('.moveleft')&&element!=document.querySelector('.moveright')){
                      	 element.style.cssText+=';-webkit-transform:translate('+parseInt(getComputedStyle(element,null).width)*count+'px,0);';
                      }
					})
					 event.preventDefault(); 
				},false);


			}

		}
	}
	window.Carousel=Carousel;
})();