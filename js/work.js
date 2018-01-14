var work = {
	carousel: function (){
		var oImg = document.getElementById("img");
		var oLeft = document.getElementById("left");
		var oRight = document.getElementById("right");
		var oBox = document.getElementById("box");
		var oUl = document.getElementById("bottom");
		var aLi = oUl.getElementsByTagName("li");
		var oLimg = document.getElementById("limg");
		var aImg = oLimg.getElementsByTagName("img");
		var aDiv = oLimg.getElementsByTagName("div");
		var i = 0;
		var num = aLi.length;
		var oSwitch = true;
		var oM = true;
		var oLin = 0;
		var t1 = null;
		var t2 = null;
		var oLl;
		var oS = 0;
		var oC = 0;
		function stop(){
			clearInterval(t1);
			clearTimeout(t2);
			i = Math.floor(i/600)*600;
			if(i <= -2400){
				i = 0;
			}
			oImg.style.left = i + "px";
			change();
		}
		function againMove(){
			clearInterval(t1);
			t1 = setInterval(move,15);
		}
		function change(){
			for(j=0;j<num;j++){
				aLi[j].style.background = "#333";
			}
			oLin = Math.floor(-i/600);
			if(oLin == num){
				oLin = 0;
			}
			aLi[oLin].style.background = "orange";
			aLi[oLin].style.opacity = 1;
		}
		oLeft.onmouseover = function(){
			this.style.opacity = 1;
			stop();
		}
		oLeft.onmouseout = function(){
			this.style.opacity = 0.5;
		}
		oRight.onmouseover = function(){
			this.style.opacity = 1;
			stop();
		}
		oRight.onmouseout = function(){
			this.style.opacity = 0.5;
		}
		oImg.onmouseover = function(){
			stop();
		};
		oImg.onmouseout = function(){
			oM = true;
			againMove();
		};
		for(j=0;j<num;j++){
			aLi[j].index = j;
			aLi[j].onmouseover = function(){
				aImg[this.index].style.display = "block";
				aDiv[this.index].style.display = "block";
			}
			aLi[j].onmouseout = function(){
				aImg[this.index].style.display = "none";
				aDiv[this.index].style.display = "none";
			}
			aLi[j].onclick = function(){
					move();
					oLl = this.index*600;
					oS = -i-oLl;
					aImg[this.index].style.display = "none";
					aDiv[this.index].style.display = "none";
			} 
		}
		move();
		function move(){
			clearInterval(t1);
			t1 = setInterval(move,15);
			if(oLl!=null){
					clearTimeout(t2);
					i = i + oS/600*15;
					oC++;
					if(oC == 40){
						oLl = null;
						oC = 0;
						clearInterval(t1);
						t2 = setTimeout(function(){
							clearInterval(t1);
							t1 = setInterval(move,15);
						},3000);
					}
			}
			else{
				if(oSwitch){
					i = i - 15;
				}
				else{
					i = i + 15;
				}
				if(i%600 === 0){
					clearInterval(t1);
					oSwitch = true;
					if(oM){
						t2 = setTimeout(function(){
						clearInterval(t1);
						t1 = setInterval(move,15);
						},1500);
					}
				}
				if(i <= -2400){
					i = 0;
				}
				if(i>0){
					i = -2400;
				}
			}
			oImg.style.left = i + "px";
			change();
		}
		oLeft.onclick = function(){
			this.style.opacity = 1;
			clearInterval(t1);
			oM = false;
			t1 = setInterval(move,15);
		}
		oRight.onclick = function(){
			this.style.opacity = 1;
			clearInterval(t1);
			oSwitch = false;
			oM = false;
			t1 = setInterval(move,15);
		}		
	},
	form: function(){
		function getDateStr(dat) {
		  var y = dat.getFullYear();
		  var m = dat.getMonth() + 1;
		  m = m < 10 ? '0' + m : m;
		  var d = dat.getDate();
		  d = d < 10 ? '0' + d : d;
		  return y + '-' + m + '-' + d;
		}
		function randomBuildData(seed) {
		  var returnData = {};
		  var dat = new Date("2016-01-01");
		  var datStr = ''
		  for (var i = 1; i < 92; i++) {
		    datStr = getDateStr(dat);
		    returnData[datStr] = Math.ceil(Math.random() * seed);
		    dat.setDate(dat.getDate() + 1);
		  }
		  return returnData;
		}

		var aqiSourceData = {
		  "北京": randomBuildData(500),
		  "上海": randomBuildData(300),
		  "广州": randomBuildData(200),
		  "深圳": randomBuildData(100),
		  "成都": randomBuildData(300),
		  "西安": randomBuildData(500),
		  "福州": randomBuildData(100),
		  "厦门": randomBuildData(100),
		  "沈阳": randomBuildData(500)
		};

		// 用于渲染图表的数据
		var chartData = {};

		// 记录当前页面的表单选项
		var pageState = {
		  nowSelectCity: -1,
		  nowGraTime: "日"
		}
		//获取样式
		function getStyle(obj){
		  if(obj.currentStyle){
		    return obj.currentStyle;
		  }
		  else{
		    return getComputedStyle(obj,null);
		  }
		}
		/**
		 * 渲染图表
		 */
		function renderChart() {
		  var aDiv = "";
		  var aqiChartWrap = document.getElementsByClassName("aqi-chart-wrap")[0];
		  var city = pageState.nowSelectCity;
		  var leng = Object.keys(chartData[pageState.nowGraTime][city]).length;
		  var oW = Math.floor((parseInt(getStyle(aqiChartWrap).width)-40)/parseInt(leng)) + "px";
		  var oL = 20;
		  for(attr in chartData[pageState.nowGraTime][city]){
		    var title = "";
		    if(pageState.nowGraTime == "日"){
		      title = attr + ":" + chartData[pageState.nowGraTime][city][attr];
		    }
		    if(pageState.nowGraTime == "周"){
		      title = "第" + attr + "周" + ":" + chartData[pageState.nowGraTime][city][attr];
		    }
		    if(pageState.nowGraTime == "月"){
		      title = "第" + attr + "月" + ":" + chartData[pageState.nowGraTime][city][attr];
		    }
		    var height = chartData[pageState.nowGraTime][city][attr] + "px";
		    var color = "#" + Math.floor(Math.random()*16).toString(16)+ Math.floor(Math.random()*16).toString(16)+ 
		    Math.floor(Math.random()*16).toString(16)+ Math.floor(Math.random()*16).toString(16)+ Math.floor(Math.random()*16).toString(16)
		    + Math.floor(Math.random()*16).toString(16);
		    var oStyle = "height:" + height + ";" +  "width:" + oW + ";" +  "background-color:" + color + ";" + "left:" + oL;
		    aDiv += "<div title=" + title + " " + "style = " + oStyle + "></div>"
		    oL = parseInt(oL) + parseInt(oW) + "px";
		  }
		  aqiChartWrap.innerHTML = aDiv;
		}

		/**
		 * 日、周、月的radio事件点击时的处理函数
		 */
		function graTimeChange(_time) {
		  // 确定是否选项发生了变化 
		  if(_time !== pageState.nowGraTime){
		    pageState.nowGraTime = _time;
		  }
		  // 设置对应数据
		  var oCity = document.getElementById("city-select");
		  pageState.nowSelectCity = oCity.value;
		  // 调用图表渲染函数
		  renderChart();
		}

		/**
		 * select发生变化时的处理函数
		 */
		function citySelectChange(_city) {
		  // 确定是否选项发生了变化 

		  // 设置对应数据
		   pageState.nowSelectCity = _city;
		  // 调用图表渲染函数
		  renderChart();
		}

		/**
		 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
		 */
		function initGraTimeForm() {
		  var formTime = document.getElementById("form-gra-time");
		  var aInput = formTime.getElementsByTagName("input");
		  //alert(aInput[0].parentNode.innerHTML)
		  for(i = 0; i<aInput.length;i++){
		    aInput[i].onclick = function(){
		      var time = this.parentNode.innerHTML.match(/(.*?)</)[1];
		      graTimeChange(time);
		    }
		  }
		}

		/**
		 * 初始化城市Select下拉选择框中的选项
		 */
		function initCitySelector() {
		  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
		  var oCity = document.getElementById("city-select");
		  var aCity = "";
		  for(attr in aqiSourceData){
		    aCity += "<option>" + attr + "</option>";
		  }
		  oCity.innerHTML = aCity;
		  pageState.nowSelectCity = oCity.value;
		  // 给select设置事件，当选项发生变化时调用函数citySelectChange
		  oCity.onchange = function(){
		   citySelectChange(this.value);
		 }
		}

		/**
		 * 初始化图表需要的数据格式
		 */
		function initAqiChartData() {
		  // 将原始的源数据处理成图表需要的数据格式
		  // 处理好的数据存到 chartData 中
		  chartData["周"] = {};
		  chartData["月"] = {};
		  chartData["日"] = aqiSourceData;
		  for(attr in aqiSourceData){
		    var j = 1;
		    var num1 = 0;
		    var num2 = 0;
		    var week = "01";
		    var n = 1;
		    chartData["周"][attr] = {};
		    chartData["月"][attr] = {};
		    for( i in aqiSourceData[attr]){
		      if(i.slice(5,7) == week){
		        if(j%7 != 0){
		          num1 += Number(aqiSourceData[attr][i]);
		          num2 += Number(aqiSourceData[attr][i]);
		          j ++;
		        }
		        else{
		          num1 += Number(aqiSourceData[attr][i]);
		          chartData["周"][attr][n] = Math.round(num1/7);
		          j ++;
		          num1 = 0;
		          num2 += Number(aqiSourceData[attr][i]);
		          n++;
		          // if(week == "03"){
		          //    chartData["月"][attr][week] = Math.round(num2/(j-1));
		          //    alert(j)
		          // }
		        }
		      }
		      else{
		          chartData["周"][attr][n]  = Math.round(num1/((j-1)%7));
		          chartData["月"][attr][week] = Math.round(num2/(j-1));
		          num1 = Number(aqiSourceData[attr][i]);
		          num2 = Number(aqiSourceData[attr][i]);
		          week = "0" + (Number(week) + 1);
		          //if(i.slice(5,10) != "03-01" ){
		            n++;
		          //}
		          j = 2;
		      }
		    } 
		    chartData["月"][attr]["03"] = Math.round(num2/(j-1));
		  }
		}

		/**
		 * 初始化函数
		 */
		function init() {
		  initGraTimeForm()
		  initCitySelector();
		  initAqiChartData();
		  renderChart()
		}
		init();
	},
	input:function(){
		//建立对象
		var Create = function(input,output,button){
			if(button){
				this.oBt = document.getElementsByTagName(button)[0];
				this.likingBox = document.getElementById(output);
				this.liking = document.getElementById(input);
				var _this = this;
				this.oBt.onclick = function(e){
					_this.initData(e,_this.liking,_this.likingBox,true);
				}
			}
			else{
				this.oIn= document.getElementsByClassName(input)[0];
				this.tagBox = document.getElementById(output);
				var _this = this;
				this.oIn.onkeyup = function(e){
					_this.initData(e,this,_this.tagBox);
				}
			}
			this.aData = {};
		}
		//处理数据方法
		Create.prototype.initData = function(e,v,tB,t){
				var e = e || event;
				var k = e.keyCode;
				var vA = v.value;
				if(vA != "" && k == 13 || (k == 32&&vA.charAt(vA.length-1)==" ")/*处理汉字连续输入*/ || k == 188||t){
					vA = vA.trim().split(/[^\u4E00-\u9FA5a-zA-Z\d]+/);
					if(vA[0] != ""){
						for(attr in vA){
							if(Object.keys(this.aData).length == 10){
								delete this.aData[Object.keys(this.aData)[0]];
								this.aData[vA[attr]] ="abc";
							}
							else{
								this.aData[vA[attr]] = "abc";
							}
						}
						this.render(tB);
					}
					v.value = "";
				}
			}
		//渲染页面方法
		Create.prototype.render = function(t){
				var aT = "";
				for( var attr in this.aData){
					aT += "<div title=" + attr +">" + attr + "</div>";
				}
				t.innerHTML = aT;
				this.add(t.getElementsByTagName("div"));
			}
		//添加鼠标事件方法
		Create.prototype.add = function (a){
				for(var i = 0; i<a.length;i++){
					a[i].onmouseover = function(){
						this.style.background = "#a3e797";
						this.innerHTML = "删除：" + this.innerHTML;
					}
					a[i].onmouseout = function(){
						this.style.background = "#0080ff";
						this.innerHTML = this.title;
					}
					a[i].onclick = function(){
						this.parentNode.removeChild(this);
					}
				}
			}
		var tag = new Create("tag","tag-box");
		var hobby = new Create("liking","liking-box","button");
	},
	saolei:function(){
		var oMine_disc = document.getElementById("mine-disc");
		var oDisc = document.getElementById("disc");
		var oTime = document.getElementById("time");
		var oTimeC = oTime.getElementsByTagName("div")[0];
		var oBt = document.getElementById("ob");
		var time = 0;
		var timer = null;
		var oB = true;
		var oMineNum = document.getElementById("mine-num");
		var oMine = {};
		var oMinel = {};
		var aDisc = [];
		var oLose = document.getElementById("flase");
		var oWin = {};
		var aImg = ["image/0.jpg","image/1.jpg","image/2.jpg","image/3.jpg","image/4.jpg","image/5.jpg","image/6.jpg","image/7.jpg","image/8.jpg"];
		var oMineHtml = "";
		//阻止右键事件
		document.oncontextmenu = function(){
			return false;
		}
		disc();
		//绘制雷盘
		function disc(){
			oMine_disc.innerHTML = "";
			oMineHtml = "";
			aDisc = [];
			oWin = {};
			time = 0;
			oTimeC.innerHTML = time;
			var count = 0;
			for(var i=0; i<9;i++){
				for(var j=0;j<9;j++){
						oMineHtml += "<div></div>";
				}
			}
			oMine_disc.innerHTML = oMineHtml;
			var aDiv = oMine_disc.getElementsByTagName("div");
			var dleng = aDiv.length;
			var his = 0;
			for(;count<10;){
				var now = Math.floor(Math.random()*81);
				if(!aDiv[now].disc){
					aDisc.push(now);
					aDiv[now].disc = "true";
					count++;
				}
			}
			play(dleng,aDiv);
			onClick(aDiv,dleng);
		} 
		function play(dleng,aDiv){
			for(var i=0;i<dleng;i++){
				aDiv[i].downNum = 1;
				aDiv[i].index = i;
				aDiv[i].mineNum = 0;
				aDiv[i].onmouseover = function(){
					this.style.opacity = "0.7";
				}
				aDiv[i].onmouseout = function(){
					this.style.opacity = "1";
				}
				aDiv[i].onmousedown = function(e){
					e = e||window.event;
					if(e.button == 2){
						if(this.downNum%3 == 1){
							this.style.backgroundImage = "url(image/flag.jpg)";
							this.onmouseover = null;
						}else if(this.downNum%3 == 2){
							this.style.backgroundImage = "url(image/flag2.jpg)";
						}else if(this.downNum%3 == 0){
							this.style.backgroundImage = "url(image/bg.jpg)";
							this.onmouseover = function(){
							this.style.opacity = "0.7";
							}
						}
						this.downNum++;
					}else if(e.button == 0){
						if(oB){
							oB = false;
							timer = setInterval(function(){
								time++;
								oTimeC.innerHTML = time;
							},1000)
						}
						if(aDisc.indexOf(this.index)!= -1){/*不兼容Ie*/
							for(var j=0;j<aDisc.length;j++){
								aDiv[aDisc[j]].style.backgroundImage = "url(image/bomb.jpg)";
							}
							clearInterval(timer);
							oLose.style.display = "block";
							oLose.innerHTML = "<h1>你输了！</h1>";
							oBt.style.display = "block";
							oBt.onclick = function(){
								oLose.style.display = "none";
								oBt.style.display = "none";
								disc();
								oBt.onclick = null;
								oB = true;
							}
						}
						else{
							if(this.mineNum!=0){
								this.style.backgroundImage = "url(" + aImg[this.mineNum]+ ")";
								this.onmousedown = null;
								this.onmouseover = null;
								oWin[this.index] = "abc";
							}
							else{
								this.style.backgroundImage = "url(image/0.jpg)";
								oWin[this.index] = "abc";
								onRender(aDiv,this.index);
							}
						}
						if(Object.keys(oWin).length == 71){
							clearInterval(timer);
							oLose.style.display = "block";
							oLose.innerHTML = "<h1>YOU WIN！</h1>";
							oBt.style.display = "block";
							oBt.onclick = function(){
								oLose.style.display = "none";
								oBt.style.display = "none";
								disc();
								oBt.onclick = null;
								oB = true;
							}
						}
					}
				}
			}
		}
		//添加点击事件
		function onClick(c,l){
			for(var index = 0;index<l;index++){
				for(var i = -1; i<2;i++){
					for(var j = -1; j<2 ; j++){
						var tindex = index+i*9+j;
						if(!!c[tindex]&&index/9+i>=0&&index/9+i<9&&index%9+j>=0&&index%9+j<9){
							if(aDisc.indexOf(tindex)!=-1&&aDisc.indexOf(index) == -1){
								c[index].mineNum++;
							}
						}
					}
				}
			}
		}
		//点击空白扩散函数
		function onRender(c,index){
			oMinel[index] = "abc";
			for(var i = -1; i<2;i++){
				for(var j = -1; j<2 ; j++){
					var tindex = index+i*9+j;
					if(!!c[tindex]&&index/9+i>=0&&index/9+i<9&&index%9+j>=0&&index%9+j<9){
						c[tindex].style.backgroundImage = "url(" + aImg[c[tindex].mineNum]+ ")";
						c[tindex].onmousedown = null;
						c[tindex].onmouseover = null;
						oWin[tindex] = "abc";
						if(c[tindex].mineNum == 0&&!(tindex in oMinel)){
							onRender(c,tindex);
						}
					}
				}
			}
		}
	}
}