/**
 * data structrue basic
 */


/**
 * check the arr is an Array, return a bool value
 *
 * @param {any} [arr] [target]
 * @return {boolean} [result]
 */
function isArray(arr) {
    // under chrome, 'function' == typeof /a/ is true
    return '[object Array]' === Object.prototype.toString.call(arr);
}


/**
 * check the fn is a Function, return a bool value
 *
 * @param {any} [fn] [target]
 * @return {boolean} [result]
 */
function isFunction(fn) {
    // under chrome, 'function' == typeof /a/ is true
    return '[object Function]' === Object.prototype.toString.call(fn);
}


/**
 * 判断一个对象是不是字面量对象，即判断这个对象是不是由{}或者new Object类似方式创建
 *
 * 事实上来说，在Javascript语言中，任何判断都一定会有漏洞，因此本方法只针对一些最常用的情况进行了判断
 *
 * @returns {Boolean} 检查结果
 */
function isPlain(obj) {
	var hasOwnProperty = Object.prototype.hasOwnProperty, key;

	if (!obj ||
		// typically, use toString for checking
		Object.prototype.toString.call(obj) !== '[object Object]' ||

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
    if (obj.constructor &&
    	!hasOwnProperty.call(obj, 'constructor') &&
    	!hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
    	return false;
    }

    //判断有继承的情况
    //如果有一项是继承过来的，那么一定不是字面量Object
    //OwnProperty会首先被遍历，为了加速遍历过程，直接看最后一项
    for (key in obj) {};
    return key === undefined || hasOwnProperty.call(obj, key);
}


/**
 * 对一个object进行深度拷贝
 *
 * 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
 * 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
 *
 * @param  {Object} source 需要进行拷贝的对象
 * @return {Object} 拷贝后的新对象
 */
function cloneObject(source) {
    var result = source, i, len;
    if (!source
        || source instanceof Number
        || source instanceof String
        || source instanceof Boolean
        ) {
        return result;
    } else if (isArray(source)) {
        result = [];
        var resultLen = 0;
        for (i = 0, len = source.length; i < len; i ++) {
            result[resultLen ++] = cloneObject(source[i]);
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

// test
var srcObj = {
    a: 1,
    b: {
        b1: ['hello', 'hi'],
        b2: 'Javascript'
    }
};

var aObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = 'Hello';

console.log(aObj.a);        // 2
console.log(aObj.b.b1[0]);  // Hello

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // hello


/**
 * 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
 *
 * @param  {Array} source 需要过滤相同项的数组
 * @return {Array}        过滤后的新数组
 */
function uniqArray(source) {
    var len = source.length,
    result = source.slice(0),
    i, datum;

    // 从后往前双重循环比较
    // 如果两个元素相同，删除后一个
    while (--len > 0) {
        datum = result[len];
        i = len;
        while (i --) {
            if (datum === result[i]) {
                result.splice(len, 1);
                break;
            }
        }
    }
    return result;
}

// hash
function uniqArray1(arr) {
    var obj = {};
    var result = [];
    for (var i = 0, len = arr.length; i < len; i ++) {

        var key = arr[i];
        if (!obj[key]) {
            result.push(key);
            obj[key] = true;
        }
    }

    return result;
}

// hash + es5
function uniqArray2(arr) {
    var obj = {};
    for (var i = 0, len = arr.length; i < len; i ++) {
        obj[arr[i]] = true;
    }
    return Object.keys(obj);
}

//test
var a = [1,3,5,7,5,3];
var b = uniqArray(a);
console.log(b);             // [1,3,5,7]

var al = 10000;
var a = [];

while(al --) {
    a.push(al % 2);
}

console.time('uniqArray');
console.log(uniqArray(a).length);       // 2
console.timeEnd('uniqArray');           // 3ms

console.time('uniqArray1');
console.log(uniqArray1(a).length);      // 2
console.timeEnd('uniqArray1');          // 0ms

console.time('uniqArray2');
console.log(uniqArray2(a).length);      // 2
console.timeEnd('uniqArray2');          // 0ms



// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {

    function isEmpty(c) {
        return /\s/.test(c);
    }

    for (var i = 0, l = str.length; i < l; i ++) {
        if (!isEmpty(str.charAt(i))) {
            break;
        }
    }

    for (var j = str.length; j > 0; j --) {
        if (!isEmpty(str.charAt(j - 1))) {
            break;
        }
    }

    if (i > j) {
        return '';
    }

    return str.substring(i, j);
}

// test
console.log(simpleTrim('  \t trimed    '));             // 'trimed'

/**
 * real trim function
 *
 * @param {string} [source] [target]
 * @return {string} 
 */
function trim(str) {
    var trimer = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g");

    return String(str).replace(trimer, '');
}

// test
var str = '  hi  ';
console.log(trim(str));     // 'hi'



/**
 * 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
 *
 * @param {number} [index] [the element's index]
 * @param {item} [item] [the array's element]
 */
function each(arr, fn) {
    for (var i = 0, len = arr.length; i < len; i ++) {
        fn(arr[i], i);
    }
}


// test
var arr = ['java', 'c', 'php'];
function output(item) {
    console.log(item);
}
each(arr, output);          // java, c, php

function output2(item, index) {
    console.log(index + ': ' + item);
}
each(arr, output2);         //0: java, 1: c, 2: php



/**
 * 获取一个对象里面第一层元素的数量，返回一个整数
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
 *
 * @param  {Object} obj
 * @return {number} 元素长度
 */
var getObjectLength = (function() {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({
            toString: null
        }).propertyIsEnumerable('toString'),
        dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function(obj) {
        if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
            throw new TypeError('getObjectLength called on non-object');
        }

        var result = [], prop, i;
        for (prop in obj) {
            if (hasOwnProperty.call(obj, prop)) {
                result.push(prop);
            }
        }

        if (hasDontEnumBug) {
            for (i = 0; i < dontEnumsLength; i ++) {
                if (hasOwnProperty.call(obj, dontEnums[i])) {
                    result.push(dontEnums[i]);
                }
            }
        }

        return result.length;
    }
}());

// test
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj));          // 3


