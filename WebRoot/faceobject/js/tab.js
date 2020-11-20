var that;
class Tab {
    constructor(id) {
       //获取外层最大的元素
       that = this;
       this.main = document.querySelector("#tab");
     
       this.add = this.main.querySelector(".tabadd");
       
      
       //li 的 父元素
       this.ul = this.main.querySelector(".firstnav ul:first-child");
       
       //section 的父元素
       this.fsection = this.main.querySelector(".tabscon");
       this.init();
    }
    
    
    init(){
    	this.updateNode();
    	this.add.onclick = this.addTab;
    	for(var i=0;i<this.lis.length;i++){
    		this.lis[i].onclick  = function(){
    			this.lis[i].index = i;
    			this.lis[i].onclick = this.toggleTab;
    			this.remove[i].onclick = this.removeTab;
    			this.spans[i].ondblclick = this.editTab;
    		}
    	}
    }
    
    //获取所有的小 li 和 section
    updateNode(){
    	  this.lis = this.main.querySelectorAll("li");
          this.sections = this.main.querySelectorAll("section");
          //所有的删除按钮
          this.remove = this.main.querySelectorAll(".icon-guanbi");
          
          this.spans = this.main.querySelectorAll(".firstnav li span:first-child");
          
    }
    
    //1.切换功能
    toggleTab(){
    	that.clearClass();
    	this.className = 'liactive';
    	that.sections[this.index].className = 'conactive';
    	
    }
    
    clearClass(){
    	for(var i=0;i<this.lis.length;i++){
    		this.lis[i].className = "";
    		this.sections[i].className = "";
    	}
    }
    //2.添加功能
    addTab(){
    	that.clearClass();
    	//创建 li元素和 section元素
    	var ran = new Random();
    	var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
    	var section ='<section class="conactive">云测试'+ran+'</section>';
    	//把这两个元素追加到对应的父元素里面
    	that.ul.insertAdjacentHTML("beforeEnd",li);
    	that.fsection.insertAdjacentHTML("beforeEnd",section);
    	
    	
    	that.init();
    }
    
    //3.删除功能
    removeTab(e){
    	e.stopPropagation();//阻止冒泡 防止触发 父节点 li的切换事件
    	var index = this.parentNode.index;
    	console.log(index);
    	that.lis[index].remove();
    	that.sections[index].remove();
    	
    	that.init();
    	//若果选中的不是当前选中的
    	if(documnet.querySelector(".liactive")) return;
    	
    	
    	//当我们删除了选中状态的这个li的时候，让它前面的的按钮处于选中状态
    	index--;
    	
    	//手动调用我们的点击事件  不需要手机触发  --这个相当于 前面如果出现 索引 是 -1的情况 是 false 后面的方法就不会执行了
    	that.lis[index] && that.lis[index].click();
    }
    
    //4.修改功能
    editTab(){
    	var str = this.innerHTML;
    	
	    //双击禁止选中文字 ----固定的写法
    	window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    	
    	this.innerHTML = '<input type="text"/>';
    	
    	var  input = this.children[0];
    	input.value = str;
    	input.select();//文本框里面的文字处于选定状态
    	
    	//当我们离开文本框就把文本框里面的值 传给span
    	input.onblur = function(){
    		this.parentNode.innerHTML = this.value;
    	}
    	
    	
    	input.onkeyup = function(e){
    		if(e.keyCode === 13){
    			//手动调用表单失去焦点事件  
    			this.blur();
    		}
    	}
    	
    
    }

}
new Tab('#tab');