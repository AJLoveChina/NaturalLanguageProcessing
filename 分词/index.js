/*jslint browser : true*/
/*global $, jQuery*/
/*jslint plusplus : true*/
(function () {
	"use strict";
	var yy = {};
	function FMM(str) {
		var result = [],		//最终要输出的结果句子
			index,
			j,
			cut,
			oInfo1 = yy.aj('info1');
		str = yy.oVal.value;	//用户输入的句子
		for (index = 0; index < str.length; index += j) {
			for (j = 5; j >= 1; j--) {
				cut = str.substr(index, j);//cut 是截取字符串
				if (yy.oSource.indexOf(cut) !== -1) {	   //cut 是一个词
					result.push(cut);
					break;
				}
				if (j === 1) {						//当前处理的 一个字，它都没有匹配
					result.push(cut);
					break;
				}
			}
		}
		oInfo1.innerHTML = "结果:" + result.join('/');
	}
	function BMM(str) {						// str用户输入的句子
		var result = [],					// 最终要输出的结果句子
			index,
			j,	//默认一个词语的最大长度是5个字，所以最多截取5个字在语料库中搜索。				
			cut;							//cut 是截取字符串
		yy.show(str);
		for (index = str.length; index >= 0; index -= j) {
			for (j = 5; j >= 1; j--) {
				cut = str.substring(index - j, index);
				if (yy.oSource.indexOf(cut) !== -1) {	// cut是一个词
					result.unshift(cut);
					yy.show(cut + "is a word!");
					break;
				}
				if (j === 1) {	//当前处理的 一个字，它都没有匹配
					yy.show(cut + "is a word!");
					result.unshift(cut);
					break;
				}
			}
		}
		yy.aj('info2').innerHTML = "结果:" + result.join('/');
	}
	function Least(str) {
		var begin = 0,
			end = 1,
			i,
			chain = '',
			cut,
			prop = {},
			len = str.length;
		//yy.sortArr每个元素是一条链的信息  0=>词数,1=>分词
		yy.sortArr = [];
		yy.aj('info3').innerHTML = "";
		function loop(begin, end, chain) {
			for (; begin + end <= str.length; end++) {
				cut = str.substr(begin, end);
				if (yy.oSource.indexOf(cut) !== -1) {  //如果是词，可以begin++
					chain = chain + ',' + cut;
					begin += end;
					end = 1;
					if (begin + end > str.length) {
						yy.show(begin + '--' + end + '' + chain);
						prop = {};
						prop.num = chain.replace(/^,*/, '').split(',').length;
						prop.str = chain.replace(/^,*/, '');
						yy.sortArr.push(prop);
					} else {
						loop(begin,end,chain);
					}
				}
				//不管是不是词，都要end++,再统计
				end++;
				if (begin + end <= yy.oVal.value.length) {
					loop(begin,end,chain);
				}
			}
		}
		loop(begin, end, chain);
		//统计结束,开始排序
		yy.sortArr.sort(function (a, b) {
			return a.num - b.num;
		});
		for (i=0; i < yy.sortArr.length; i++) {
			yy.aj('info3').innerHTML += yy.sortArr[i].str + ':' + yy.sortArr[i].num + '个词<br>';
		}
	}
	function start() {
		var oBtn1 = yy.aj('btn1'),
			oBtn2 = yy.aj('btn2'),
			oBtn3 = yy.aj('btn3');
		yy.oVal = yy.aj('val');
		yy.oVal.value = "他是研究生物的";
		yy.oSource = yy.aj('txt').innerHTML;
		yy.length = yy.oVal.length;
		oBtn1.onclick = function () {
			FMM(yy.oVal.value);
		};
		oBtn2.onclick = function () {
			BMM(yy.oVal.value);
		};

		oBtn3.onclick = function () {
			new Least(yy.oVal.value);
		};
	}
	yy.aj = function (id) {
		return document.getElementById(id);
	};
	yy.show = function (val) {
		console.log(val);
	};
	start();
}());