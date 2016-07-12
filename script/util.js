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
initEvent();


// 了解值类型和引用类型的区别，了解各种对象的读取、遍历方式，并在util.js中实现以下方法：
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function isPlain(obj){
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            key;
        if ( !obj ||
             //一般的情况，直接用toString判断
             Object.prototype.toString.call(obj) !== "[object Object]" ||
             //IE下，window/document/document.body/HTMLElement/HTMLCollection/NodeList等DOM对象上一个语句为true
             //isPrototypeOf挂在Object.prototype上的，因此所有的字面量都应该会有这个属性
             //对于在window上挂了isPrototypeOf属性的情况，直接忽略不考虑
             !('isPrototypeOf' in obj)
           ) {
            return false;
        }
    
        //判断new fun()自定义对象的情况
        //constructor不是继承自原型链的
        //并且原型中有isPrototypeOf方法才是Object
        if ( obj.constructor &&
            !hasOwnProperty.call(obj, "constructor") &&
            !hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf") ) {
            return false;
        }
        //判断有继承的情况
        //如果有一项是继承过来的，那么一定不是字面量Object
        //OwnProperty会首先被遍历，为了加速遍历过程，直接看最后一项
        for ( key in obj ) {}
        return key === undefined || hasOwnProperty.call( obj, key );
    }

function cloneObject(source) {
    // your implement
    var result = source, i, len;	//等价于var result = source;var i ; var len;
    if (!source
        || source instanceof Number
        || source instanceof String
        || source instanceof Boolean) {
        return result;
    } else if (isArray(source)) {
        result = [];
        // var resultLen = 0;	对于数组使用concat和slice方法只能实现第一维的拷贝
        for (i = 0, len = source.length; i < len; i++) {
            // result[i] = cloneObject(source[i]);	去掉了递归还是完成了拷贝
            result[i] = source[i];
        }
    } else if (isPlain(source)) {
        result = {};
        for (i in source) {
            if (source.hasOwnProperty(i)) {
                result[i] = cloneObject(source[i]);
            }
        }
    }
    return result;
}

// 测试用例：
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi",[1]],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);	// 2
console.log(abObj.b.b1[0]);		// "Hello"
console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"
console.log(tarObj.b.b1[2]);  



// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(source) {
    // your implement
     var len = source.length,
        result = source.slice(0),
        i, datum;


    // 从后往前双重循环比较
    // 如果两个元素相同，删除后一个
    while (--len > 0) {
        datum = result[len];
        i = len;
        while (i--) {
            if (datum === result[i]) {
                result.splice(len, 1);
                break;
            }
        }
    }

    return result;
}

// 使用示例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]

// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    // your implement
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    // your implement    
    var i,j;    
     function isEmpty(c){
        var pattern = /\s/;
        return pattern.test(c);
    };
    for( i = 0,l = str.length;i < l;i++){
        if(!isEmpty(str.charAt(i))){
             j = i;
            break;
        }
    }
    for (; j < str.length; j++) {
        if(isEmpty(str.charAt(j))){
            break;
        }
    }
    if(i > j){
        return '';
    }
    console.log(i,j);
    return str.substring(i,j);
}

// 使用示例
var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    // your implement
}

// 其中fn函数可以接受两个参数：item和index

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item)
}
each(arr, output);  // java, c, php, html

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {}

// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3


// 判断是否为邮箱地址
function isEmail(emailStr) {
    // your implement
     var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    return reg.test(str);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
    var reg=/^([0-9]|[\-])+$/g ;
        if(str.length != 18){
        return false;
        }
        else{
        return reg.exec(str);
        }
}