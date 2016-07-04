// 判断一个变量的数据类型的方法，一般可以用typeof（）方法；
// var a="aaa";
// var b=123;
// var c= [1,2,3];
// var d = new Date();
// var e=function(){}
// var f=null;
// alert(typeof a)   ------------> string
// alert(typeof b)   ------------> number
// alert(typeof c)   ------------> object
// alert(typeof d)   ------------> object
// alert(typeof e)   ------------> function
// alert(typeof f)   ------------> object;

// 其中typeof返回的类型都是字符串形式，需注意，例如：
// alert(typeof a == "string") -------------> true
// alert(typeof a == String) ---------------> false
// 另外typeof 可以判断function的类型；在判断除Object类型的对象时比较方便；

// 判断已知对象类型的方法： instanceof
// alert(c instanceof Array) ---------------> true
// alert(d instanceof Date) ---------------> true
// alert(e instanceof Function) ------------> true
// alert(e instanceof function) ------------> false
// 注意：instanceof 后面一定要是对象类型，并且大小写不能错，该方法适合一些条件选择或分支。
//  如：a instanceof b?alert("true"):alert("false")  //注意b值是你想要判断的那种数据类型，不是一个字符串，比如Array（
// 注意：三元运算符:（？：）如名字表示的三元运算符需要三个操作数。语法是 条件 ? 结果1 : 结果2;. 这里你把条件写在问号(?)的前面后面跟着用冒号(:)分隔的结果1和结果2。满足条件时结果1否则结果2。）

// 根据对象的constructor判断： constructor
// alert(c.constructor === Array) ----------> true
// alert(d.constructor === Date) -----------> true
// alert(e.constructor === Function) -------> true
// 在W3C定义中的定义：constructor 属性返回对创建此对象的数组函数的引用
// 就是返回对象相对应的构造函数，然后与给出的参数进行判断；从定义上来说跟instanceof不太一致，但效果都是一样的

// 通用但很繁琐的方法： prototype
// alert(Object.prototype.toString.call(a) === 
// alert(Object.prototype.toString.call(b) === ‘[object Number]’) -------> true;
// alert(Object.prototype.toString.call(c) === ‘[object Array]’) -------> true;
// alert(Object.prototype.toString.call(d) === ‘[object Date]’) -------> true;
// alert(Object.prototype.toString.call(e) === ‘[object Function]’) -------> true;
// alert(Object.prototype.toString.call(f) === ‘[object Null]’) -------> true;
// 大小写不能写错，比较麻烦，但胜在通用。
// 通常情况下用typeof 判断就可以了，遇到预知Object类型的情况可以选用instanceof或constructor方法。

// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    // your implement
    var a = (Object.prototype.toString.call(arr) === '[object Array]');
    return a;
}
// Array.isArray(a);直接调用Array.isArray()方法就可以判断一个数据是否为数组
// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    // your implement
    var a = fn instanceof Function;
    return a;
}

function initEvent() {
    var a = Array (1,2)
    var b = isArray(a);
    var c = isFunction(isArray);
    console.log(b);
    console.log(c+"isArray");
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    // your implement
}

// 测试用例：
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"

initEvent();
