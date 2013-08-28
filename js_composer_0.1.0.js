
!function(a){"use strict";function b(a,c){if(a===c)return!0;if("object"==typeof a&&"object"==typeof c){if(Array.isArray(a)!==Array.isArray(c))return!1;if(Array.isArray(a)){if(a.length!==c.length)return!1;for(var d=0;d<a.length;d++)if(!b(a[d],c[d]))return!1}else{var e;for(e in a)if(void 0===c[e]&&void 0!==a[e])return!1;for(e in c)if(void 0===a[e]&&void 0!==c[e])return!1;for(e in a)if(!b(a[e],c[e]))return!1}return!0}return!1}function c(a){var b=String(a).replace(/^\s+|\s+$/g,"").match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);return b?{href:b[0]||"",protocol:b[1]||"",authority:b[2]||"",host:b[3]||"",hostname:b[4]||"",port:b[5]||"",pathname:b[6]||"",search:b[7]||"",hash:b[8]||""}:null}function d(a,b){function d(a){var b=[];return a.replace(/^(\.\.?(\/|$))+/,"").replace(/\/(\.(\/|$))+/g,"/").replace(/\/\.\.$/,"/../").replace(/\/?[^\/]*/g,function(a){"/.."===a?b.pop():b.push(a)}),b.join("").replace(/^\//,"/"===a.charAt(0)?"/":"")}return b=c(b||""),a=c(a||""),b&&a?(b.protocol||a.protocol)+(b.protocol||b.authority?b.authority:a.authority)+d(b.protocol||b.authority||"/"===b.pathname.charAt(0)?b.pathname:b.pathname?(a.authority&&!a.pathname?"/":"")+a.pathname.slice(0,a.pathname.lastIndexOf("/")+1)+b.pathname:a.pathname)+(b.protocol||b.authority||b.pathname?b.search:b.search||a.search)+b.hash:null}function e(a){return a.split("#")[0]}function f(a,b){if(void 0===b?b=a.id:"string"==typeof a.id&&(b=d(b,a.id),a.id=b),"object"==typeof a)if(Array.isArray(a))for(var c=0;c<a.length;c++)f(a[c],b);else if("string"==typeof a.$ref)a.$ref=d(b,a.$ref);else for(var e in a)"enum"!==e&&f(a[e],b)}function g(a,b,c,d,e){if(void 0===a)throw new Error("No code supplied for error: "+b);this.code=a,this.message=b,this.dataPath=c||"",this.schemaPath=d||"",this.subErrors=e||null}function h(a,b){if(b.substring(0,a.length)===a){var c=b.substring(a.length);if(b.length>0&&"/"===b.charAt(a.length-1)||"#"===c.charAt(0)||"?"===c.charAt(0))return!0}return!1}function i(a){var b=new j,c=a||"en",g={addFormat:function(){b.addFormat.apply(b,arguments)},language:function(a){return a?(m[a]||(a=a.split("-")[0]),m[a]?(c=a,a):!1):c},addLanguage:function(a,b){var c;for(c in k)b[c]&&!b[k[c]]&&(b[k[c]]=b[c]);var d=a.split("-")[0];if(m[d]){m[a]=Object.create(m[d]);for(c in b)"undefined"==typeof m[d][c]&&(m[d][c]=b[c]),m[a][c]=b[c]}else m[a]=b,m[d]=b;return this},freshApi:function(a){var b=i();return a&&b.language(a),b},validate:function(a,d,e){var f=new j(b,!1,m[c],e);"string"==typeof d&&(d={$ref:d}),f.addSchema("",d);var g=f.validateAll(a,d);return this.error=g,this.missing=f.missing,this.valid=null===g,this.valid},validateResult:function(){var a={};return this.validate.apply(a,arguments),a},validateMultiple:function(a,d,e){var f=new j(b,!0,m[c],e);"string"==typeof d&&(d={$ref:d}),f.addSchema("",d),f.validateAll(a,d);var g={};return g.errors=f.errors,g.missing=f.missing,g.valid=0===g.errors.length,g},addSchema:function(){return b.addSchema.apply(b,arguments)},getSchema:function(){return b.getSchema.apply(b,arguments)},getSchemaMap:function(){return b.getSchemaMap.apply(b,arguments)},getSchemaUris:function(){return b.getSchemaUris.apply(b,arguments)},getMissingUris:function(){return b.getMissingUris.apply(b,arguments)},dropSchemas:function(){b.dropSchemas.apply(b,arguments)},reset:function(){b.reset(),this.error=null,this.missing=[],this.valid=!0},missing:[],error:null,valid:!0,normSchema:f,resolveUrl:d,getDocumentUri:e,errorCodes:k};return g}Object.keys||(Object.keys=function(){var a=Object.prototype.hasOwnProperty,b=!{toString:null}.propertyIsEnumerable("toString"),c=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],d=c.length;return function(e){if("object"!=typeof e&&"function"!=typeof e||null===e)throw new TypeError("Object.keys called on non-object");var f=[];for(var g in e)a.call(e,g)&&f.push(g);if(b)for(var h=0;d>h;h++)a.call(e,c[h])&&f.push(c[h]);return f}}()),Object.create||(Object.create=function(){function a(){}return function(b){if(1!==arguments.length)throw new Error("Object.create implementation only accepts one parameter.");return a.prototype=b,new a}}()),Array.isArray||(Array.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)}),Array.prototype.indexOf||(Array.prototype.indexOf=function(a){if(null===this)throw new TypeError;var b=Object(this),c=b.length>>>0;if(0===c)return-1;var d=0;if(arguments.length>1&&(d=Number(arguments[1]),d!==d?d=0:0!==d&&1/0!==d&&d!==-1/0&&(d=(d>0||-1)*Math.floor(Math.abs(d)))),d>=c)return-1;for(var e=d>=0?d:Math.max(c-Math.abs(d),0);c>e;e++)if(e in b&&b[e]===a)return e;return-1}),Object.isFrozen||(Object.isFrozen=function(a){for(var b="tv4_test_frozen_key";a.hasOwnProperty(b);)b+=Math.random();try{return a[b]=!0,delete a[b],!1}catch(c){return!0}});var j=function(a,b,c,d){this.missing=[],this.missingMap={},this.formatValidators=a?Object.create(a.formatValidators):{},this.schemas=a?Object.create(a.schemas):{},this.collectMultiple=b,this.errors=[],this.handleError=b?this.collectError:this.returnError,d&&(this.checkRecursive=!0,this.scanned=[],this.scannedFrozen=[],this.scannedFrozenSchemas=[],this.key="tv4_validation_id"),this.errorMessages=c};j.prototype.createError=function(a,b,c,d,e){var f=this.errorMessages[a]||l[a];if("string"!=typeof f)return new g(a,"Unknown error code "+a+": "+JSON.stringify(b),c,d,e);var h=f.replace(/\{([^{}]*)\}/g,function(a,c){var d=b[c];return"string"==typeof d||"number"==typeof d?d:a});return new g(a,h,c,d,e)},j.prototype.returnError=function(a){return a},j.prototype.collectError=function(a){return a&&this.errors.push(a),null},j.prototype.prefixErrors=function(a,b,c){for(var d=a;d<this.errors.length;d++)this.errors[d]=this.errors[d].prefixWith(b,c);return this},j.prototype.addFormat=function(a,b){if("object"==typeof a){for(var c in a)this.addFormat(c,a[c]);return this}this.formatValidators[a]=b},j.prototype.getSchema=function(a){var b;if(void 0!==this.schemas[a])return b=this.schemas[a];var c=a,d="";if(-1!==a.indexOf("#")&&(d=a.substring(a.indexOf("#")+1),c=a.substring(0,a.indexOf("#"))),"object"==typeof this.schemas[c]){b=this.schemas[c];var e=decodeURIComponent(d);if(""===e)return b;if("/"!==e.charAt(0))return void 0;for(var f=e.split("/").slice(1),g=0;g<f.length;g++){var h=f[g].replace("~1","/").replace("~0","~");if(void 0===b[h]){b=void 0;break}b=b[h]}if(void 0!==b)return b}void 0===this.missing[c]&&(this.missing.push(c),this.missing[c]=c,this.missingMap[c]=c)},j.prototype.searchSchemas=function(a,b){if("string"==typeof a.id&&h(b,a.id)&&void 0===this.schemas[a.id]&&(this.schemas[a.id]=a),"object"==typeof a)for(var c in a)if("enum"!==c)if("object"==typeof a[c])this.searchSchemas(a[c],b);else if("$ref"===c){var d=e(a[c]);d&&void 0===this.schemas[d]&&void 0===this.missingMap[d]&&(this.missingMap[d]=d)}},j.prototype.addSchema=function(a,b){if("undefined"==typeof b){if("object"!=typeof a||"string"!=typeof a.id)return;b=a,a=b.id}(a=e(a)+"#")&&(a=e(a)),this.schemas[a]=b,delete this.missingMap[a],f(b,a),this.searchSchemas(b,a)},j.prototype.getSchemaMap=function(){var a={};for(var b in this.schemas)a[b]=this.schemas[b];return a},j.prototype.getSchemaUris=function(a){var b=[];for(var c in this.schemas)(!a||a.test(c))&&b.push(c);return b},j.prototype.getMissingUris=function(a){var b=[];for(var c in this.missingMap)(!a||a.test(c))&&b.push(c);return b},j.prototype.dropSchemas=function(){this.schemas={},this.reset()},j.prototype.reset=function(){this.missing=[],this.missingMap={},this.errors=[]},j.prototype.validateAll=function(a,b,c,d){var e;if(void 0!==b.$ref&&(b=this.getSchema(b.$ref),!b))return null;if(this.checkRecursive&&"object"==typeof a){if(e=!this.scanned.length,a[this.key]&&-1!==a[this.key].indexOf(b))return null;var f;if(Object.isFrozen(a)&&(f=this.scannedFrozen.indexOf(a),-1!==f&&-1!==this.scannedFrozenSchemas[f].indexOf(b)))return null;if(this.scanned.push(a),Object.isFrozen(a))-1===f&&(f=this.scannedFrozen.length,this.scannedFrozen.push(a),this.scannedFrozenSchemas.push([])),this.scannedFrozenSchemas[f].push(b);else{if(!a[this.key])try{Object.defineProperty(a,this.key,{value:[],configurable:!0})}catch(g){a[this.key]=[]}a[this.key].push(b)}}var h=this.errors.length,i=this.validateBasic(a,b)||this.validateNumeric(a,b)||this.validateString(a,b)||this.validateArray(a,b)||this.validateObject(a,b)||this.validateCombinations(a,b)||this.validateFormat(a,b)||null;if(e){for(;this.scanned.length;){var j=this.scanned.pop();delete j[this.key]}this.scannedFrozen=[],this.scannedFrozenSchemas=[]}if(i||h!==this.errors.length)for(;c&&c.length||d&&d.length;){var k=c&&c.length?""+c.pop():null,l=d&&d.length?""+d.pop():null;i&&(i=i.prefixWith(k,l)),this.prefixErrors(h,k,l)}return this.handleError(i)},j.prototype.validateFormat=function(a,b){if("string"!=typeof b.format||!this.formatValidators[b.format])return null;var c=this.formatValidators[b.format].call(null,a,b);return"string"==typeof c||"number"==typeof c?this.createError(k.FORMAT_CUSTOM,{message:c}).prefixWith(null,"format"):c&&"object"==typeof c?this.createError(k.FORMAT_CUSTOM,{message:c.message||"?"},c.dataPath||null,c.schemaPath||"/format"):null},j.prototype.validateBasic=function(a,b){var c;return(c=this.validateType(a,b))?c.prefixWith(null,"type"):(c=this.validateEnum(a,b))?c.prefixWith(null,"type"):null},j.prototype.validateType=function(a,b){if(void 0===b.type)return null;var c=typeof a;null===a?c="null":Array.isArray(a)&&(c="array");var d=b.type;"object"!=typeof d&&(d=[d]);for(var e=0;e<d.length;e++){var f=d[e];if(f===c||"integer"===f&&"number"===c&&0===a%1)return null}return this.createError(k.INVALID_TYPE,{type:c,expected:d.join("/")})},j.prototype.validateEnum=function(a,c){if(void 0===c["enum"])return null;for(var d=0;d<c["enum"].length;d++){var e=c["enum"][d];if(b(a,e))return null}return this.createError(k.ENUM_MISMATCH,{value:"undefined"!=typeof JSON?JSON.stringify(a):a})},j.prototype.validateNumeric=function(a,b){return this.validateMultipleOf(a,b)||this.validateMinMax(a,b)||null},j.prototype.validateMultipleOf=function(a,b){var c=b.multipleOf||b.divisibleBy;return void 0===c?null:"number"==typeof a&&0!==a%c?this.createError(k.NUMBER_MULTIPLE_OF,{value:a,multipleOf:c}):null},j.prototype.validateMinMax=function(a,b){if("number"!=typeof a)return null;if(void 0!==b.minimum){if(a<b.minimum)return this.createError(k.NUMBER_MINIMUM,{value:a,minimum:b.minimum}).prefixWith(null,"minimum");if(b.exclusiveMinimum&&a===b.minimum)return this.createError(k.NUMBER_MINIMUM_EXCLUSIVE,{value:a,minimum:b.minimum}).prefixWith(null,"exclusiveMinimum")}if(void 0!==b.maximum){if(a>b.maximum)return this.createError(k.NUMBER_MAXIMUM,{value:a,maximum:b.maximum}).prefixWith(null,"maximum");if(b.exclusiveMaximum&&a===b.maximum)return this.createError(k.NUMBER_MAXIMUM_EXCLUSIVE,{value:a,maximum:b.maximum}).prefixWith(null,"exclusiveMaximum")}return null},j.prototype.validateString=function(a,b){return this.validateStringLength(a,b)||this.validateStringPattern(a,b)||null},j.prototype.validateStringLength=function(a,b){return"string"!=typeof a?null:void 0!==b.minLength&&a.length<b.minLength?this.createError(k.STRING_LENGTH_SHORT,{length:a.length,minimum:b.minLength}).prefixWith(null,"minLength"):void 0!==b.maxLength&&a.length>b.maxLength?this.createError(k.STRING_LENGTH_LONG,{length:a.length,maximum:b.maxLength}).prefixWith(null,"maxLength"):null},j.prototype.validateStringPattern=function(a,b){if("string"!=typeof a||void 0===b.pattern)return null;var c=new RegExp(b.pattern);return c.test(a)?null:this.createError(k.STRING_PATTERN,{pattern:b.pattern}).prefixWith(null,"pattern")},j.prototype.validateArray=function(a,b){return Array.isArray(a)?this.validateArrayLength(a,b)||this.validateArrayUniqueItems(a,b)||this.validateArrayItems(a,b)||null:null},j.prototype.validateArrayLength=function(a,b){var c;return void 0!==b.minItems&&a.length<b.minItems&&(c=this.createError(k.ARRAY_LENGTH_SHORT,{length:a.length,minimum:b.minItems}).prefixWith(null,"minItems"),this.handleError(c))?c:void 0!==b.maxItems&&a.length>b.maxItems&&(c=this.createError(k.ARRAY_LENGTH_LONG,{length:a.length,maximum:b.maxItems}).prefixWith(null,"maxItems"),this.handleError(c))?c:null},j.prototype.validateArrayUniqueItems=function(a,c){if(c.uniqueItems)for(var d=0;d<a.length;d++)for(var e=d+1;e<a.length;e++)if(b(a[d],a[e])){var f=this.createError(k.ARRAY_UNIQUE,{match1:d,match2:e}).prefixWith(null,"uniqueItems");if(this.handleError(f))return f}return null},j.prototype.validateArrayItems=function(a,b){if(void 0===b.items)return null;var c,d;if(Array.isArray(b.items)){for(d=0;d<a.length;d++)if(d<b.items.length){if(c=this.validateAll(a[d],b.items[d],[d],["items",d]))return c}else if(void 0!==b.additionalItems)if("boolean"==typeof b.additionalItems){if(!b.additionalItems&&(c=this.createError(k.ARRAY_ADDITIONAL_ITEMS,{}).prefixWith(""+d,"additionalItems"),this.handleError(c)))return c}else if(c=this.validateAll(a[d],b.additionalItems,[d],["additionalItems"]))return c}else for(d=0;d<a.length;d++)if(c=this.validateAll(a[d],b.items,[d],["items"]))return c;return null},j.prototype.validateObject=function(a,b){return"object"!=typeof a||null===a||Array.isArray(a)?null:this.validateObjectMinMaxProperties(a,b)||this.validateObjectRequiredProperties(a,b)||this.validateObjectProperties(a,b)||this.validateObjectDependencies(a,b)||null},j.prototype.validateObjectMinMaxProperties=function(a,b){var c,d=Object.keys(a);return void 0!==b.minProperties&&d.length<b.minProperties&&(c=this.createError(k.OBJECT_PROPERTIES_MINIMUM,{propertyCount:d.length,minimum:b.minProperties}).prefixWith(null,"minProperties"),this.handleError(c))?c:void 0!==b.maxProperties&&d.length>b.maxProperties&&(c=this.createError(k.OBJECT_PROPERTIES_MAXIMUM,{propertyCount:d.length,maximum:b.maxProperties}).prefixWith(null,"maxProperties"),this.handleError(c))?c:null},j.prototype.validateObjectRequiredProperties=function(a,b){if(void 0!==b.required)for(var c=0;c<b.required.length;c++){var d=b.required[c];if(void 0===a[d]){var e=this.createError(k.OBJECT_REQUIRED,{key:d}).prefixWith(null,""+c).prefixWith(null,"required");if(this.handleError(e))return e}}return null},j.prototype.validateObjectProperties=function(a,b){var c;for(var d in a){var e=!1;if(void 0!==b.properties&&void 0!==b.properties[d]&&(e=!0,c=this.validateAll(a[d],b.properties[d],[d],["properties",d])))return c;if(void 0!==b.patternProperties)for(var f in b.patternProperties){var g=new RegExp(f);if(g.test(d)&&(e=!0,c=this.validateAll(a[d],b.patternProperties[f],[d],["patternProperties",f])))return c}if(!e&&void 0!==b.additionalProperties)if("boolean"==typeof b.additionalProperties){if(!b.additionalProperties&&(c=this.createError(k.OBJECT_ADDITIONAL_PROPERTIES,{}).prefixWith(d,"additionalProperties"),this.handleError(c)))return c}else if(c=this.validateAll(a[d],b.additionalProperties,[d],["additionalProperties"]))return c}return null},j.prototype.validateObjectDependencies=function(a,b){var c;if(void 0!==b.dependencies)for(var d in b.dependencies)if(void 0!==a[d]){var e=b.dependencies[d];if("string"==typeof e){if(void 0===a[e]&&(c=this.createError(k.OBJECT_DEPENDENCY_KEY,{key:d,missing:e}).prefixWith(null,d).prefixWith(null,"dependencies"),this.handleError(c)))return c}else if(Array.isArray(e))for(var f=0;f<e.length;f++){var g=e[f];if(void 0===a[g]&&(c=this.createError(k.OBJECT_DEPENDENCY_KEY,{key:d,missing:g}).prefixWith(null,""+f).prefixWith(null,d).prefixWith(null,"dependencies"),this.handleError(c)))return c}else if(c=this.validateAll(a,e,[],["dependencies",d]))return c}return null},j.prototype.validateCombinations=function(a,b){return this.validateAllOf(a,b)||this.validateAnyOf(a,b)||this.validateOneOf(a,b)||this.validateNot(a,b)||null},j.prototype.validateAllOf=function(a,b){if(void 0===b.allOf)return null;for(var c,d=0;d<b.allOf.length;d++){var e=b.allOf[d];if(c=this.validateAll(a,e,[],["allOf",d]))return c}return null},j.prototype.validateAnyOf=function(a,b){if(void 0===b.anyOf)return null;for(var c=[],d=this.errors.length,e=0;e<b.anyOf.length;e++){var f=b.anyOf[e],g=this.errors.length,h=this.validateAll(a,f,[],["anyOf",e]);if(null===h&&g===this.errors.length)return this.errors=this.errors.slice(0,d),null;h&&c.push(h.prefixWith(null,""+e).prefixWith(null,"anyOf"))}return c=c.concat(this.errors.slice(d)),this.errors=this.errors.slice(0,d),this.createError(k.ANY_OF_MISSING,{},"","/anyOf",c)},j.prototype.validateOneOf=function(a,b){if(void 0===b.oneOf)return null;for(var c=null,d=[],e=this.errors.length,f=0;f<b.oneOf.length;f++){var g=b.oneOf[f],h=this.errors.length,i=this.validateAll(a,g,[],["oneOf",f]);if(null===i&&h===this.errors.length){if(null!==c)return this.errors=this.errors.slice(0,e),this.createError(k.ONE_OF_MULTIPLE,{index1:c,index2:f},"","/oneOf");c=f}else i&&d.push(i.prefixWith(null,""+f).prefixWith(null,"oneOf"))}return null===c?(d=d.concat(this.errors.slice(e)),this.errors=this.errors.slice(0,e),this.createError(k.ONE_OF_MISSING,{},"","/oneOf",d)):(this.errors=this.errors.slice(0,e),null)},j.prototype.validateNot=function(a,b){if(void 0===b.not)return null;var c=this.errors.length,d=this.validateAll(a,b.not),e=this.errors.slice(c);return this.errors=this.errors.slice(0,c),null===d&&0===e.length?this.createError(k.NOT_PASSED,{},"","/not"):null};var k={INVALID_TYPE:0,ENUM_MISMATCH:1,ANY_OF_MISSING:10,ONE_OF_MISSING:11,ONE_OF_MULTIPLE:12,NOT_PASSED:13,NUMBER_MULTIPLE_OF:100,NUMBER_MINIMUM:101,NUMBER_MINIMUM_EXCLUSIVE:102,NUMBER_MAXIMUM:103,NUMBER_MAXIMUM_EXCLUSIVE:104,STRING_LENGTH_SHORT:200,STRING_LENGTH_LONG:201,STRING_PATTERN:202,OBJECT_PROPERTIES_MINIMUM:300,OBJECT_PROPERTIES_MAXIMUM:301,OBJECT_REQUIRED:302,OBJECT_ADDITIONAL_PROPERTIES:303,OBJECT_DEPENDENCY_KEY:304,ARRAY_LENGTH_SHORT:400,ARRAY_LENGTH_LONG:401,ARRAY_UNIQUE:402,ARRAY_ADDITIONAL_ITEMS:403,FORMAT_CUSTOM:500},l={INVALID_TYPE:"invalid type: {type} (expected {expected})",ENUM_MISMATCH:"No enum match for: {value}",ANY_OF_MISSING:'Data does not match any schemas from "anyOf"',ONE_OF_MISSING:'Data does not match any schemas from "oneOf"',ONE_OF_MULTIPLE:'Data is valid against more than one schema from "oneOf": indices {index1} and {index2}',NOT_PASSED:'Data matches schema from "not"',NUMBER_MULTIPLE_OF:"Value {value} is not a multiple of {multipleOf}",NUMBER_MINIMUM:"Value {value} is less than minimum {minimum}",NUMBER_MINIMUM_EXCLUSIVE:"Value {value} is equal to exclusive minimum {minimum}",NUMBER_MAXIMUM:"Value {value} is greater than maximum {maximum}",NUMBER_MAXIMUM_EXCLUSIVE:"Value {value} is equal to exclusive maximum {maximum}",STRING_LENGTH_SHORT:"String is too short ({length} chars), minimum {minimum}",STRING_LENGTH_LONG:"String is too long ({length} chars), maximum {maximum}",STRING_PATTERN:"String does not match pattern: {pattern}",OBJECT_PROPERTIES_MINIMUM:"Too few properties defined ({propertyCount}), minimum {minimum}",OBJECT_PROPERTIES_MAXIMUM:"Too many properties defined ({propertyCount}), maximum {maximum}",OBJECT_REQUIRED:"Missing required property: {key}",OBJECT_ADDITIONAL_PROPERTIES:"Additional properties not allowed",OBJECT_DEPENDENCY_KEY:"Dependency failed - key must exist: {missing} (due to key: {key})",ARRAY_LENGTH_SHORT:"Array is too short ({length}), minimum {minimum}",ARRAY_LENGTH_LONG:"Array is too long ({length}), maximum {maximum}",ARRAY_UNIQUE:"Array items are not unique (indices {match1} and {match2})",ARRAY_ADDITIONAL_ITEMS:"Additional items not allowed",FORMAT_CUSTOM:"Format validation failed ({message})"};g.prototype={prefixWith:function(a,b){if(null!==a&&(a=a.replace("~","~0").replace("/","~1"),this.dataPath="/"+a+this.dataPath),null!==b&&(b=b.replace("~","~0").replace("/","~1"),this.schemaPath="/"+b+this.schemaPath),null!==this.subErrors)for(var c=0;c<this.subErrors.length;c++)this.subErrors[c].prefixWith(a,b);return this}};var m={};a.tv4=i(),a.tv4.addLanguage("en-gb",l)}("undefined"!=typeof module&&module.exports?exports:this);
/*
//@ sourceMappingURL=tv4.min.js.map
*/
if (window.JSComposer === undefined) { window.JSComposer = {}; }
JSComposer.Utils = (function() {
    var exports = {};

    function ldef() {
        var l = arguments.length;
        for (var i = 0; i < l; ++i) {
            if (arguments[i] !== undefined) return arguments[i];
        }
        return undefined;
    }

    function makeElement(type, properties) {
        var e = document.createElement(type);
        applyNestedProperties(e, properties);
        return e;
    }

    function makeSelect(options, allow_null, properties) {
        properties = ldef(properties, {});
        allow_null = ldef(allow_null, true);
        var s = makeElement('select', properties);
        setSelectOptions(s, allow_null, options);

        return s;
    }

    function setSelectOptions(s, allow_null, options) {
        var curr        = s.getElementsByTagName('option'),
            create      = undefined,
            has         = undefined,
            del         = undefined,
            i           = 0,
            l           = curr.length;

        if (l == 0 && allow_null) {
            s.add(makeElement('option', {'text':'Select one...','value':null}));
        }

        if (typeof options === "object" &&
            options.length !== undefined) {
            create = function() {
                for (var i = 0, l = options.length; i < l; ++i) {
                    var key = options[i],
                        o   = makeElement('option', {'text':key,'value':key});
                    s.add(o);
                }
            };
            has = function(key) { return options.indexOf(key) >= 0; };
            del = function(key) { var index = options.indexOf(key); options.splice(index, 1); };
        } else {
            create = function() {
                for (var key in options) {
                    if (!options.hasOwnProperty(key)) { continue; }
                    var o = makeElement('option', {'text':options[key],'value':key});
                    s.add(o);
                }
            };
            has = function(key) { return options.hasOwnProperty(key); };
            del = function(key) { delete options[key]; };
        }

        for (i = 0; i < curr.length; ++i) {
            var key = curr[i].value;
            if (allow_null && key === null) { continue; }
            if (has(key)) {
                del(key);
            } else {
                s.removeChild(curr[i]);
                i--;
            }
        }

        create();
    }

    function setSelectValue(s, value) {
        var i = 0,
            l = s.length;
        for (i = 0; i < l; ++i) {
            if (s.options[i].value === value) {
                s.selectedIndex = i;
                break;
            }
        }
    }

    function getSelectValue(s, value) {
        var i = s.selectedIndex;
        return i === -1 ? undefined : s.options[i].value;
    }

    function applyNestedProperties(o, properties) {
        properties = ldef(properties, {});
        for (var k in properties) {
            if (typeof properties[k] == 'object' &&
                properties[k] !== null &&
                properties[k].length === undefined) {
                applyNestedProperties(o[k], properties[k]);
            } else {
                o[k] = properties[k];
            }
        }

        return o;
    }

    function applyClass(o, c) {
        if (o.classes === undefined) { o.classes = o.className.split(/\s+/); }
        o.classes.push(c);
        o.className = o.classes.join(' ');
    }

    function removeClass(o, c) {
        var i;
        while (i = o.classes.indexOf(c) >= 0) {
            o.classes.splice(i, 1);
        }
        o.className = o.classes.join(' ');
    }

    function getKeys(o) {
        var a = [];
        for (var k in o) {
            a.push(k);
        }
        return a;
    }

    function getTitles(o) {
        var keys = getKeys(o),
            res = {};

        for (var i = 0, l = keys.length; i < l; ++i) {
            var key = keys[i],
                desc = o[key],
                title = desc.title;
            res[key] = (typeof title === 'undefined') ? key : title;
        }

        return res;
    }

    function setTextContent(o, text) { o.textContent = text; }
    function setInnerText(o, text) { o.innerText = text; }
    function getTextContent(o) { return o.textContent; }
    function getInnerText(o) { return o.innerText; }
    function addEventListener(o,e,f) { o.addEventListener(e,f,false); }
    function addEventAttach(o,e,f) { o.attachEvent('on' + e, f); }

    var setText = function(o, text) {
        if (o.textContent !== undefined) {
            exports.setText = setTextContent;
        } else if(o.innerText !== undefined) {
            exports.setText = setInnerText;
        } else {
            throw {'error':'badarg', 'offender': o};
        }
        exports.setText(o, text);
    };

    var getText = function(o) {
        if (o.textContent !== undefined) {
            exports.getText = getTextContent;
        } else if(o.innerText !== undefined) {
            exports.getText = getInnerText;
        } else {
            throw {'error':'badarg', 'offender': o};
        }
        exports.getText(o);
    };

    var attachEvent = function(o, e, f) {
        if (o.attachEvent !== undefined) {
            exports.attachEvent = addEventAttach;
        } else if (o.addEventListener !== undefined) {
            exports.attachEvent = addEventListener;
        } else {
            throw {'error':'badarg','offender':o};
        }
        exports.attachEvent(o, e, f);
    };

    function appendFunction(of, nf) {
        return function() {
            if (typeof of === 'function') {
                of.apply(this, arguments);
            }

            nf.apply(this, arguments);
        }
    }

    function clone(v) {
        var ret = undefined;
        switch(typeof v) {
            case 'object':
                if (v === null) return v;
                if (typeof v.length !== 'undefined') {
                    ret = [];
                    for (var i = 0, l = v.length; i < l; ++i) {
                        ret.push(clone(v[i]));
                    }
                } else {
                    ret = {};
                    for (var k in v) {
                        ret[k] = clone(v[k]);
                    }
                }
                break;
            default:
                ret = v;

        }
        return ret;
    }

    exports = {
        makeElement:        makeElement,
        makeSelect:         makeSelect,
        setSelectOptions:   setSelectOptions,
        setSelectValue:     setSelectValue,
        getSelectValue:     getSelectValue,
        applyClass:         applyClass,
        removeClass:        removeClass,
        ldef:               ldef,
        setText:            setText,
        getText:            getText,
        attachEvent:        attachEvent,
        getKeys:            getKeys,
        getTitles:          getTitles,
        appendFunction:     appendFunction,
        clone:              clone
    };
    return exports;
}());
(function() {
    if (typeof window.JSComposer === 'undefined') { window.JSComposer = {}; }
    var schema = {
        "$schema":"http://json-schema.org/draft-04/schema#",
        "id":"http://jscomposer.net/schema/jscomposer#",
        "definitions":{
            'label':{'type':'string'}
        }
    };

    tv4.addSchema(schema.id, schema);

    function URI(fragment, uri) {
        uri = JSComposer.Utils.ldef(uri, schema.id);
        uri = uri.replace(/#/, fragment);
        return uri
    }
    function Ref(fragment, uri) {
        uri = URI(fragment, uri);
        if (tv4.getSchema(uri) === undefined) {
            console.log('[JSComposer.Schema.Ref]', 'Invalid URI/Fragment: ', uri, '::', fragment);
            throw 'invalid_uri';
        }
        return {'$ref':uri};
    }

    function LoadRawSchema(uri, schema) {
        tv4.addSchema(uri, schema);
    }

    function LoadSchema(uri) {
        // 1. Handle already loaded case
        if (uri.match(/#$/) === null) {
            uri = uri + "#";
        }
        if (tv4.getSchema(uri) !== undefined) { return; }

        var http    = new XMLHttpRequest();
        console.log("Fetching URI: ", uri);
        http.open("GET", uri, false);
        http.send(null);

        LoadRawSchema(uri, JSON.parse(http.responseText));
    };

    function FetchSchema(uri) {
        return tv4.getSchema(uri);
    }

    JSComposer.Schema = {
        Fetch: FetchSchema,
        Load: LoadSchema,
        LoadRaw: LoadRawSchema,
        Ref: Ref,
        URI: URI
    };
}());
if (window.JSComposer === undefined) { window.JSComposer = {}; }

JSComposer.Instance = (function() {
    // Constructor
    function Instance(context, parent, type_desc, value) {
        this.context = context;
        this.parent = parent;
        this.elements = {
            ctr:        JSComposer.Utils.makeElement("div", {"className":"node"})
        };
        schema = JSComposer.Utils.ldef(type_desc, {'type':'null'});

        for (var k in schema) {
            if (!schema.hasOwnProperty(k)) continue;

            this[k] = schema[k];
        }
    }

    Instance.Objects = {};
    Instance.Schema = {};

    // Resolve Schema: incorporate references and valid
    // types from multiple layers into a single schema,
    // identifying potential constructors along the way
    Instance.ResolveSchema = function(schema, current, type_merge) {
        if (typeof current === 'undefined') {
            current = {};
            // Create non-enumerable constructors property
            // for tracking discovered constructors
            Object.defineProperty(current, 'constructors', {
                configurable: true,
                enumerable: false,
                value: {}
            });
            Object.defineProperty(current, 'cons_order', {
                configurable: true,
                enumerable: false,
                value: []
            });
        }

        // Enclosed function for repeated operation
        function add_constructor(uri, cons, front) {
            front = JSComposer.Utils.ldef(front, false);
            if (current.constructors.hasOwnProperty(uri)) return;
            current.constructors[uri] = cons;
            if (front) {
                current.cons_order.unshift(uri);
            } else {
                current.cons_order.push(uri);
            }
        }

        // Incorporate identified constructors from
        // lower levels
        if (typeof schema.constructors !== 'undefined') {
            for (var k in schema.constructors) {
                if (!schema.constructors.hasOwnProperty) continue;
                add_constructor(k, schema.constructors[k]);
            }
        }

        type_merge = JSComposer.Utils.ldef(type_merge, true);

        // Parse keys in this schema and incorporate into current
        // TODO: break up this logic just a wee bit (mmm, s'ghetti)
        for (var key in schema) {
            switch (key) {
                case "$ref":
                    var uri     = schema[key],
                        schema2 = JSComposer.Schema.Fetch(uri),
                        cons    = Instance.Objects[uri];

                    console.log("Dereferenced URI:", uri, "::", schema2, "::", cons);
                    if (cons !== undefined) add_constructor(uri, cons);
                    Instance.ResolveSchema(schema2, current);
                    break;
                case "enum":
                    add_constructor('enum', JSComposer.Instance.Objects['enum']);
                    current[key] = JSComposer.Utils.clone(schema[key]);
                    break;
                case "oneOf":
                    if (typeof current.oneOf === 'undefined') { current.oneOf = []; }
                    if (schema[key].length === 1) {
                        var resolved = Instance.ResolveSchema(schema[key][0]);
                        current.oneOf.push(resolved);
                        Instance.ResolveSchema(schema[key][0], current);
                    } else {
                        for (var i = 0, l = schema[key].length; i < l; ++i) {
                            current.oneOf.push(Instance.ResolveSchema(schema[key][i]));
                        }
                        var cons = Instance.Objects['oneOf'];
                        add_constructor('oneOf', cons, true);
                    }
                    break;
                case "allOf":
                case "anyOf":
                    if (typeof current[key] === 'undefined') { current[key] = []; }
                    var type_merge = key === 'allOf' ? false : true;
                    for (var i = 0, l = schema[key].length; i < l; ++i) {
                        var resolved = Instance.ResolveSchema(schema[key][i], undefined, type_merge);
                        current[key].push(resolved);
                        Instance.ResolveSchema(resolved, current);
                    }
                    break;
                case "properties":
                case "additionalProperties":
                case "patternProperties":
                    if (typeof current[key] === 'undefined') { current[key] = {}; }
                    for (var k in schema[key]) {
                        current[key][k] = Instance.ResolveSchema(schema[key][k]);
                    }
                    break;
                case "type":
                    switch (typeof current[key]) {
                        case 'undefined':
                            current[key] = typeof schema[key] === 'string' ? schema[key] : JSComposer.Utils.clone(schema[key]);
                            break;
                        case 'string':
                            if (type_merge) {
                                current[key] = [current[key]];
                            } else if (current[key] !== schema[key]) {
                                console.log('[JSComposer.Instance.ResolveSchema]', 'invaid type merger', current, '::', schema);
                                throw "invalid_type_merger";
                            }

                            if (schema[key] === current[key]) {
                                // No need to do anything; types are the same
                            } else if (typeof schema[key] === 'string') {
                                if (current[key].indexOf(schema[key]) < 0) current[key].push(schema[key]);
                            } else {
                                for (var i = 0, l = schema[key].length; i < l; ++i) {
                                    if (current[key].indexOf(schema[key][i]) < 0) current[key].push(schema[key][i]);
                                }
                            }
                            break;
                        case 'object':
                        default:
                            if (type_merge) {
                                for (var i = 0, l = schema[key].length; i < l; ++i) {
                                    if (current[key].indexOf(schema[key][i]) < 0) current[key].push(schema[key][i]);
                                }
                            } else {
                                console.log('[JSComposer.Instance.ResolveSchema]', 'invaid type merger (2)', current, '::', schema);
                                throw "invalid_type_merger";
                            }
                            break;
                    }
                    break;
                default:
                    if (typeof current[key] === 'undefined') {
                        current[key] = schema[key];
                    }
                    break;
            }
        }

        if (typeof current.oneOf !== 'undefined') {
            var anyOf = typeof current.anyOf === 'undefined' ? [] : current.anyOf,
                allOf = typeof current.allOf === 'undefined' ? [] : current.allOf,
                of = anyOf.concat(allOf);

            for (var i = 0, l = current.oneOf.length; i < l; ++i) {
                for (var index = 0, length = of.length; index < length; ++index) {
                    console.log("PRE-TITLE:", current.oneOf[i].title, of[index].title);
                    current.oneOf[i] = Instance.ResolveSchema(of[index], current.oneOf[i], false);
                    console.log("POST-TITLE:", current.oneOf[i].title, of[index].title);
                }
            }
        }

        if (typeof current.type === 'object' &&
            current.type.length === 1) {
            current.type = current.type[0];
        }
        if (typeof current.type === 'string') {
            add_constructor(current.type, Instance.Objects[current.type]);
        } else if (typeof current.type === 'undefined') {
            var uri     = JSComposer.Schema.URI("#/definitions/label"),
                cons    = Instance.Objects[uri];
            add_constructor(uri, cons);
        } else {
            console.log("[JSComposer.Instance.ResolveSchema]","Multitype Field",current.type);
            throw "disallowed_multitype_field";
        }

        return current;
    };

    Instance.RegisterInstance = function(type, constructor) {
        if (Instance.Objects[type] !== undefined) throw "Object already defined: " + type;
        Instance.Objects[type] = constructor;
    };

    Instance.prototype.CreateInstance = function (schema, value) {
        return Instance.CreateInstance(this.context, this, schema, value);
    }

    Instance.CreateInstance = function(context, parent, schema, value) {
        var key = undefined;
        // 1. Check to make sure we got a schema
        if (schema === undefined || typeof schema !== "object") {
            throw("invalid schema");
        }

        schema = Instance.ResolveSchema(schema);
        if (schema.cons_order.length > 0) {
            var uri = schema.cons_order[0],
                cons = schema.constructors[uri];
            //console.log("Found Constructor: ", uri, " :: ", cons, " :: ", schema.cons_order, " :: ", schema);
            return new cons(context, parent, schema, value);
        }

        return Instance.CreateInstance(context, parent, JSComposer.Schema.Ref('#/definitions/label'), value);
    };

    // Instance Methods
    Instance.prototype.Render = function (target) {
        target.appendChild(this.elements.ctr);
    };

    Instance.prototype.GetValue = function () {
        return null;
    };

    Instance.prototype.Destroy = function() {
        var parent_node = this.elements.ctr.parentElement;
        parent_node.removeChild(this.elements.ctr);
    };

    Instance.prototype.OnChange = function() {
    };

    Instance.RegisterInstance('null', Instance);

    return Instance;
}());
if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.Entry = (function() {
    function Entry(context, parent, key_desc, val_desc, key, value) {
        var s = this;
        this.context = context;
        this.parent = parent;
        this.elements = {
            'key':      JSComposer.Utils.makeElement('div', {'className':'key field'}),
            'value':    JSComposer.Utils.makeElement('div', {'className':'value field'})
        };
        this.schema = {
            'key':      key_desc,
            'value':    val_desc
        };
        //console.log("[Entry] Invoking instance: ", key, " :: ", key_desc);
        console.log("[Entry] Invoking instance: ", key, " :: ", key_desc);
        console.log("[Entry] Invoking instance: ", value, " :: ", val_desc);
        this.fields = {
            'key':      JSComposer.Instance.CreateInstance(context, parent, key_desc, key),
            'value':    JSComposer.Instance.CreateInstance(context, parent, val_desc, value)
        }

        this.fields.key.OnChange = JSComposer.Utils.appendFunction(this.fields.key.OnChange, function() { s.OnKeyChange(); });
        this.fields.value.OnChange = JSComposer.Utils.appendFunction(this.fields.value.OnChange, function() { s.OnValueChange(); });
    }

    Entry.prototype.GetKey = function() {
        return this.fields.key.GetValue();
    }

    Entry.prototype.GetKeyInstance = function() {
        return this.fields.key;
    }

    Entry.prototype.GetValue = function() {
        return this.fields.value.GetValue();
    }

    Entry.prototype.GetValueInstance = function() {
        return this.fields.value;
    }

    Entry.prototype.SetValueSchema = function(schema, value) {
        if (schema === this.schema.value) {
            return;
        }

        this.fields.value.Destroy()
        var instance = JSComposer.Instance.CreateInstance(this.context, this.parent, schema, value);
        instance.Render(this.elements.value);
        this.fields.value = instance;
        this.schema.value = schema;
    }

    Entry.prototype.OnKeyChange = function() {
    }

    Entry.prototype.OnValueChange = function() {
    }

    Entry.prototype.Render = function(target) {
        this.fields.key.Render(this.elements.key);
        this.fields.value.Render(this.elements.value);
        target.appendChild(this.elements.key);
        target.appendChild(this.elements.value);
    }

    return Entry;
}());
(function() {
    if (typeof window.JSComposer === 'undefined') window.JSComposer = {};

    function OneOfInstance(context, parent, schema, value) {
        JSComposer.Instance.apply(this, arguments);

        this.options = this.GetOptions();
        var $self = this,
            type = undefined,
            option = undefined;

        if (typeof value !== 'undefined') {
            for (var i = 0, l = this.oneOf.length; i < l; ++i) {
                if (tv4.validate(value, this.oneOf[i])) {
                    type = this.oneOf[i];
                    option = i;
                    break;
                }
            }
        }

        if (typeof type === 'undefined') {
            type = this.oneOf[0];
            option = 0;
        }

        JSComposer.Utils.applyClass(this.elements.ctr, 'entry');
        this.entry = new JSComposer.Entry(this.context, this, {'enum':this.options}, type, option.toString(), value);
        this.entry.OnKeyChange = JSComposer.Utils.appendFunction(this.entry.OnKeyChange, function() { $self.OnKeyChange(); });
    }

    OneOfInstance.prototype = new JSComposer.Instance();
    OneOfInstance.prototype.constructor = OneOfInstance;
    Object.defineProperty(OneOfInstance.prototype, 'super', JSComposer.Instance);

    OneOfInstance.prototype.Render = function(target) {
        this.entry.Render(this.elements.ctr);
        JSComposer.Instance.prototype.Render.call(this, target);
    };

    OneOfInstance.prototype.OnKeyChange = function() {
        var key = this.entry.GetKey(),
            schema = this.oneOf[key];

        this.entry.SetValueSchema(schema, this.entry.GetValue());
    }

    OneOfInstance.prototype.GetOptions = function() {
        var options = {},
            l = this.oneOf.length,
            i = 0;

        for (; i < l; ++i) {
            var s = this.oneOf[i];
            console.log("Got Schema: ", this.oneOf[i]);
            options[i] = JSComposer.Utils.ldef(s.title, s.id, s.type, i);
        }

        console.log("Got Options: ", options);

        return options;
    }

    JSComposer.OneOfInstance = OneOfInstance;
    JSComposer.Instance.RegisterInstance('oneOf',  OneOfInstance);
}());
//var Instance   = require('Instance'),
//    JSComposer.Utils   = require('JSComposer.Utils');
//
if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.StaticInstance = (function() {
    function StaticInstance(context, parent, schema, value) {
        JSComposer.Instance.apply(this, arguments);

        var text_content = JSComposer.Utils.ldef(this.title, value, '');
        JSComposer.Utils.setText(this.elements.ctr, text_content);

        this.value = value;
    };

    StaticInstance.prototype = new JSComposer.Instance();
    StaticInstance.prototype.constructor = StaticInstance;

    StaticInstance.prototype.GetValue = function() {
        return this.value;
    }

    JSComposer.Instance.RegisterInstance(JSComposer.Schema.URI('#/definitions/label'), StaticInstance);

    return StaticInstance;
}());
if (window.JSComposer === undefined) window.JSComposer = {};

JSComposer.StringInstance = (function(){
    function StringInstance(context, parent, schema, value) {
        var s = this;
        schema = JSComposer.Utils.ldef(schema, {});
        JSComposer.Instance.apply(this, arguments);
        this.is_big = JSComposer.Utils.ldef(schema.big, false);
        if (this.is_big) {
            this.elements.text  = JSComposer.Utils.makeElement('textarea', {});
            JSComposer.Utils.applyClass(this.elements.ctr, "big");
        } else {
            this.elements.text = JSComposer.Utils.makeElement('input', {'type':'text'});
        }
        this.elements.text.value = JSComposer.Utils.ldef(value, '');
        JSComposer.Utils.attachEvent(this.elements.text, 'change', function() { s.OnChange(); });
    }

    StringInstance.prototype = new JSComposer.Instance();
    StringInstance.prototype.constructor = StringInstance;

    StringInstance.prototype.Render = function(target) {
        this.elements.ctr.appendChild(this.elements.text);
        target.appendChild(this.elements.ctr);
    }

    StringInstance.prototype.GetValue = function() {
        return this.elements.text.value;
    }

    JSComposer.Instance.RegisterInstance('string', StringInstance);

    return StringInstance;
}());
if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.PasswordInstance = (function() {
    function PasswordInstance(schema, value) {
        JSComposer.StringInstance.apply(this, arguments);

        this.elements.text.type = "password";
        this.elements.text.value = "";
    }

    PasswordInstance.prototype = new JSComposer.StringInstance();
    PasswordInstance.prototype.constructor = PasswordInstance;

    JSComposer.Instance.RegisterInstance('password', PasswordInstance);
}());
if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.NumberInstance = (function() {
    function NumberInstance(context, parent, schema, value) {
        JSComposer.Instance.apply(this, arguments);
        this.elements.input = JSComposer.Utils.makeElement('input');
        var $self = this;
        value = JSComposer.Utils.ldef(value, 0.0);
        this.key_regex = new RegExp('[^0-9\.\-]');
        this.minimum_distance = this.exclusiveMinimum === true ? 0.000001 : 0;
        this.maximum_distance = this.exclusiveMaximum === true ? 0.000001 : 0;
        JSComposer.Utils.attachEvent(this.elements.input, 'keypress', function() { return $self.OnKeyDown.apply($self, arguments); });
        JSComposer.Utils.attachEvent(this.elements.input, 'change', function() { return $self.OnChange.apply($self, arguments); });

        this.SetValue(value);
    }

    NumberInstance.prototype = new JSComposer.Instance();
    NumberInstance.prototype.constructor = NumberInstance;

    NumberInstance.prototype.Render = function(target) {
        this.elements.ctr.appendChild(this.elements.input);
        target.appendChild(this.elements.ctr);
    };

    NumberInstance.prototype.GetValue = function() {
        return parseFloat(this.elements.input.value);
    };

    NumberInstance.prototype.OnKeyDown = function(e) {
        console.log("Keypress detected:",this,'::',this.key_regex,'::',e);
        return OnKeyDown(e, this.key_regex);
    }

    NumberInstance.prototype.OnChange = function() {
        this.SetValue(this.elements.input.value);
    }

    NumberInstance.prototype.SetValue = function(value) {
        console.log("Forming Value: ", value);
        if (typeof this.minimum !== undefined &&
            value < this.minimum + this.minimum_distance) {
            value = this.minimum + this.minimum_distance;
        }

        if (typeof this.maximum !== undefined &&
            value > this.maximum - this.minimum_distance) {
            value = this.maximum - this.maximum_distance;
        }
        console.log("Value Formed: ", value);

        this.elements.input.value = value;
    }

    function OnKeyDown(e, rx) {
        var v = String.fromCharCode(e.keyCode);
        var r = true;

        if (v.match(rx)) {
            console.log("MATCH");
            e.cancelBubble = true;
            if (e.preventDefault) e.preventDefault();
            r = false;
        }

        return r;
    };

    JSComposer.Instance.RegisterInstance('number', NumberInstance);

    return NumberInstance;
}());
if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.IntegerInstance = (function() {

    function IntegerInstance(context, parent, schema, value) {
        value = JSComposer.Utils.ldef(value, schema.default, 0);
        JSComposer.NumberInstance.apply(this, arguments);

        this.key_regex = new RegExp('[^0-9\-]');
        this.minimum_distance = this.exclusiveMinum === true ? 1 : 0;
        this.maximum_distance = this.exclusiveMaxum === true ? 1 : 0;
        this.elements.input.value = value;

        this.SetValue(value);
    }

    IntegerInstance.prototype = new JSComposer.NumberInstance();
    IntegerInstance.prototype.constructor = IntegerInstance;

    IntegerInstance.prototype.GetValue = function() {
        return parseInt(this.elements.input.value);
    };

    JSComposer.Instance.RegisterInstance('integer', IntegerInstance);

    return IntegerInstance;
}());
if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.SelectInstance = (function() {
    function SelectInstance(context, parent, schema, value) {
        JSComposer.Instance.apply(this, arguments);
        var $self = this;
        // Convert list options into object options

        if (typeof this['enum'] === 'object' &&
            typeof this['enum'].length !== 'undefined') {
            var o = {};
            for (var i = 0, l = this['enum'].length; i < l; ++i) {
                o[this['enum'][i]] = this['enum'][i];
            }
            this['enum'] = o;
        } else if (typeof this['enum'] === 'undefined') {
            this['enum'] = {};
        }

        this.allow_null = this['enum'].hasOwnProperty('null');
        this.elements.select = JSComposer.Utils.makeSelect(this['enum'], this.allow_null);
        JSComposer.Utils.attachEvent(this.elements.select, 'change', function() { $self.OnChange(); });
        JSComposer.Utils.setSelectValue(this.elements.select, value);

        this.currValue = JSComposer.Utils.getSelectValue(this.elements.select);
        this.prevValue = undefined;
    }

    SelectInstance.prototype = new JSComposer.Instance();
    SelectInstance.prototype.constructor = SelectInstance;

    SelectInstance.prototype.GetValue = function() {
        return JSComposer.Utils.getSelectValue(this.elements.select);
    };

    SelectInstance.prototype.Render = function(target) {
        this.elements.ctr.appendChild(this.elements.select);
        target.appendChild(this.elements.ctr);
    }

    SelectInstance.prototype.SetOptions = function(options) {
        JSComposer.Utils.setSelectOptions(this.elements.select, this.allow_null, options);
    }

    SelectInstance.prototype.OnChange = function() {
        this.prevValue = this.currValue;
        this.currValue = JSComposer.Utils.getSelectValue(this.elements.select);
    }

    JSComposer.Instance.RegisterInstance('enum', SelectInstance);

    return SelectInstance;
}());
if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.BooleanInstance = (function() {
    function BooleanInstance(context, parent, schema, value) {
        schema.enum = {"true":"True","false":"False"};
        value = value === true ? "true" : "false";
        JSComposer.SelectInstance.call(this, context, parent, schema, value);
    }

    BooleanInstance.prototype = new JSComposer.SelectInstance();
    BooleanInstance.prototype.constructor = BooleanInstance;

    BooleanInstance.prototype.GetValue = function() {
        var v = JSComposer.SelectInstance.prototype.GetValue.call(this);
        return v === "true" ? true : false;
    }

    JSComposer.Instance.RegisterInstance('boolean', BooleanInstance);
    return BooleanInstance;
}());
if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.OrderInstance = (function(){
    function OrderInstance(schema, value) {
        schema.allow_null = false;
        console.log("ALLOW_NULL IS FALSE");
        JSComposer.SelectInstance.call(this, schema, value);

        var s = this;

        this.elements.select.multiple = true;
        this.elements.up_button = JSComposer.Utils.makeElement('div', {'className':'order button up'});
        JSComposer.Utils.attachEvent(this.elements.up_button, 'click', function() { s.OnUpClick(); });
        this.elements.down_button = JSComposer.Utils.makeElement('div', {'className':'order button down'});
        JSComposer.Utils.attachEvent(this.elements.down_button, 'click', function() { s.OnDownClick(); });
        JSComposer.Utils.applyClass(this.elements.ctr, 'big');
        JSComposer.Utils.applyClass(this.elements.select, 'multi');
        JSComposer.Utils.applyClass(this.elements.select, 'order');
        this.selected = this.elements.select.selectedIndex;
    }

    OrderInstance.prototype = new JSComposer.SelectInstance();
    OrderInstance.prototype.constructor = OrderInstance;

    OrderInstance.prototype.Render = function(target) {
        JSComposer.SelectInstance.prototype.Render.call(this, target);

        this.elements.ctr.appendChild(this.elements.up_button);
        this.elements.ctr.appendChild(this.elements.down_button);
    };

    OrderInstance.prototype.OnSelect = function() {
        var index = this.elements.select.selectedIndex;

        if (this.selected === -1) {
            this.selected = index;
        } else {
            this.elements.select.options[this.selected].selected = false;
        }
        this.selected = this.elements.select.selectedIndex;
    };

    OrderInstance.prototype.OnUpClick = function() {
        var s = this.elements.select,
            o = s.options.item(s.selectedIndex),
            t = s.options.item(s.selectedIndex - 1);

        if (t === null) return undefined;

        s.removeChild(o);
        s.insertBefore(o, t);
        o.selected = true;

        this.selected = s.selectedIndex;
        console.log("SELECTED: ", s.options);
    }

    OrderInstance.prototype.OnDownClick = function() {
        if (this.selected < 0) { return undefined; }
        var s = this.elements.select,
            o = s.options.item(s.selectedIndex),
            t = s.options.item(s.selectedIndex + 1);

        if (t === null) return undefined;

        s.removeChild(t);
        s.insertBefore(t, o);
        o.selected = true;

        this.selected = s.selectedIndex;
        console.log("SELECTED: ", s.options);
    }

    OrderInstance.prototype.GetValue = function() {
        var a = [],
            s = this.elements.select,
            i = 0,
            l = s.options.length;

        for (; i < l; ++i) {
            a.push(s.options[i].value);
        }

        return a;
    }

    JSComposer.Instance.RegisterInstance('order', OrderInstance);
    return OrderInstance;
}());
if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.ObjectInstance = (function(){
    function ObjectInstance(context, parent, schema, value) {
        JSComposer.Instance.apply(this, arguments);
        this.additionalAvailable = this.additionalProperties ? JSComposer.Utils.getKeys(this.additionalProperties) : [];
        this.additionalUsed = [];

        this.entries    = {
            properties: [],
            additionalProperties: [],
            patternProperties: []
        };
        this.elements.sections = {};
        this.section_count = 0;

        this.elements.body  = JSComposer.Utils.makeElement('div', {'className':'object body'});
        if (typeof this.title !== 'undefined') {
            this.elements.header = JSComposer.Utils.makeElement('h3', {'className':'object header'});
            JSComposer.Utils.setText(this.elements.header, this.title);
        }

        JSComposer.Utils.applyClass(this.elements.ctr, 'object');

        value = JSComposer.Utils.ldef(value, {});

        if (typeof this.properties !== 'undefined')
            this.AddSection('properties', this.properties, value);

        if (typeof this.additionalProperties != 'undefined')
            this.AddSection('additionalProperties', this.additionalProperties, value);

        if (typeof this.patternProperties != 'undefined')
            this.AddSection('patternProperties', this.patternProperties, value);

        this.CompilePatterns();
    }

    ObjectInstance.prototype = new JSComposer.Instance();
    ObjectInstance.prototype.constructor = ObjectInstance;

    ObjectInstance.Default      = {};
    ObjectInstance.Descriptor   = {
        'type':         'object_type', // Insert maniacal laughter here
        'properties':   {
            'label':        {'type':'text', 'label':'Label'},
            'header':       {'type':'boolean', 'label':'Display Header'},
            'properties':   {
                'type':                     'object',
                'additionalProperties':     {},
                'label':                    'Properties'
            },
            'order':        {'type':'order','options':[],'label':'Instance Order'}
        }
    };
    ObjectInstance.PropertyOptions      = {
        'properties':               {'deletable':false,'more':false, 'header':'Required'},
        'additionalProperties':     {'deletable':true, 'more':true, 'header':'Optional'},
        'patternProperties':        {'deletable':true, 'more':true, 'header':'Extra'}
    };

    ObjectInstance.prototype.GetKeySchema = function(type) {
        switch (type) {
            case 'properties':
                return {'oneOf':[JSComposer.Schema.Ref('#/definitions/label')]};
            case 'additionalProperties':
                if (this.additionalTitles === undefined) {
                    this.additionalTitles = JSComposer.Utils.getTitles(this.additionalProperties);
                }
                var available = {};
                for (var i = 0, l = this.additionalAvailable.length; i < l; ++i) {
                    var key     = this.additionalAvailable[i],
                        title   = this.additionalTitles[key];

                    available[key] = title;
                }
                return {'enum':available};
            case 'patternProperties':
                return {'type':'string'};
            default:
                return {};
        }
    };

    ObjectInstance.prototype.AddSection = function(type, properties, value) {
        ++this.section_count;

        var options = ObjectInstance.PropertyOptions[type],
            ctr     = JSComposer.Utils.makeElement('div', {'className':'object section'});
            header  = JSComposer.Utils.makeElement('h4', {'className':'object section header'}),
            content = JSComposer.Utils.makeElement('div', {'className':'object section content'}),
            footer  = JSComposer.Utils.makeElement('div', {'className':'object section footer'}),
            more    = undefined;

        JSComposer.Utils.setText(header, options.header);
        JSComposer.Utils.applyClass(ctr, type);

        if (options.more) {
            var $self = this;
            more = JSComposer.Utils.makeElement('div', {'className':'create button'});
            JSComposer.Utils.attachEvent(more, 'click', function() {
                $self.OnAddEntry(type);
            });
            footer.appendChild(more);
        }

        ctr.appendChild(header);
        ctr.appendChild(content);
        if (type !== 'properties') ctr.appendChild(footer);
        this.elements.body.appendChild(ctr);

        this.elements.sections[type] = content;

        for (var k in properties) {
            if (type !== 'properties' && !value.hasOwnProperty(k)) continue;
            var s = this.GetKeySchema(type);
            s.title = typeof properties[k].title != undefined ? properties[k].title : s.title;
            this.AddEntry(type, s, properties[k], k, value[k], ObjectInstance.PropertyOptions[type]);
        }
    }

    ObjectInstance.prototype.AddEntry = function(type, key_desc, value_desc, key, value) {
        var self        = this,
            entry       = new JSComposer.Entry(this.context, this, key_desc, value_desc, key, value),
            val_field   = entry.GetValueInstance(),
            key_field   = entry.GetKeyInstance(),
            ctr         = JSComposer.Utils.makeElement('div', {'className':'entry'});

        val_field.OnChange = JSComposer.Utils.appendFunction(val_field.OnChange, function() { self.OnChange(type, 'value', entry); });
        key_field.OnChange = JSComposer.Utils.appendFunction(key_field.OnChange, function() { self.OnChange(type, 'key', entry); });

        if (type === 'additionalProperties') {
            this.useAdditionalKey(key);
        }

        this.entries[type].push(entry);
        entry.Render(ctr);
        this.elements.sections[type].appendChild(ctr);
    };

    ObjectInstance.prototype.OnAddEntry = function(type) {
        var properties  = this[type],
            options     = ObjectInstance.PropertyOptions[type],
            key_schema  = this.GetKeySchema(type),
            key         = undefined,
            val_schema  = undefined;

        if (type === 'additionalProperties' &&
            this.additionalAvailable.length > 0) {
            key = this.additionalAvailable[0];
            val_schema = this.additionalProperties[key];
        } else if (type === 'patternProperties') {
            var valid   = false,
                pattern = undefined;
            do {
                key = prompt("Enter a new property name.");

                if (key === null) {
                    key = undefined;
                    break;
                }

                pattern = this.patternScan(key);
                if (pattern) {
                    val_schema = this.patternProperties[pattern];
                    valid = true;
                }
            } while (valid = false);
        }

        if (typeof key !== 'undefined' &&
            typeof val_schema !== 'undefined') {
            this.AddEntry(type, key_schema, val_schema, key, undefined, options);
        }
    };

    ObjectInstance.prototype.patternScan = function(key) {
        if (typeof this.patternProperties === 'undefined') { return undefined; }

        for (var pattern in this.patternProperties) {
            if (key.match(this.compiledPatterns[k])) {
                return pattern;
            }
        }

        return false;
    }

    ObjectInstance.prototype.useAdditionalKey = function(key) {
        var index = this.additionalAvailable.indexOf(key);

        if (index < 0) throw "key_used_twice";

        this.additionalAvailable.splice(index, 1);
        this.additionalUsed.push(key);
        this.updateAdditionalOptions();
    }

    ObjectInstance.prototype.freeAdditionalKey = function(key) {
        var index = this.additionalUsed.indexOf(key);

        if (index < 0) throw "freeing_unused_key";

        this.additionalUsed.splice(index, 1);
        this.additionalAvailable.push(key);
        this.updateAdditionalOptions();
    }

    ObjectInstance.prototype.updateAdditionalOptions = function() {
        var entries     = this.entries.additionalProperties,
            available   = this.additionalAvailable,
            options     = undefined,
            instance    = this;

        function get_options() {
            var o = {};
            for (var i = 0, l = available.length; i < l; ++i) {
                var key     = available[i],
                    title   = instance.additionalTitles[key];
                o[key] = title;
            }
            return o;
        }

        for (var i = 0, l = entries.length; i < l; ++i) {
            var entry   = entries[i],
                select  = entry.GetKeyInstance(),
                key     = select.GetValue(),
                title   = this.additionalTitles[key],
                tmp     = get_options();

            tmp[key] = title;
            console.log("Options for ", key, '::', tmp);
            select.SetOptions(tmp);
        }
    }

    ObjectInstance.prototype.CompilePatterns = function() {
        if (typeof this.patternProperties === 'undefined') { return undefined; }
        this.compiledPatterns = {};

        for (var pattern in this.patternProperties) {
            var rx = new RegExp(pattern);
            this.compiledPatterns[pattern] = rx;
        }
    }

    ObjectInstance.prototype.GetValue = function() {
        var o = {};

        for (var type in this.entries) {
            if (!this.entries.hasOwnProperty(type)) continue;
            var entries = this.entries[type];
            for (var i = 0, l = entries.length; i < l; ++i) {
                var k = entries[i].GetKey(),
                    v = entries[i].GetValue();

                o[k] = v;
            }
        }

        return o;
    };

    ObjectInstance.prototype.Render = function(target) {
        if (typeof this.title !== 'undefined') { this.elements.ctr.appendChild(this.elements.header); }
        this.elements.ctr.appendChild(this.elements.body);
        target.appendChild(this.elements.ctr);
    };

    ObjectInstance.prototype.FindEntry = function(key) {
        for (var k in this.entries) {
            if (!this.entries.hasOwnProperty(k)) continue;
            var entries = this.entries[k],
                l = entries.length,
                i = 0;

            console.log("Checking ", k, " entries:", entries);
            for (i = 0; i < l; ++i) {
                if (entries[i].GetKey() === key) return entries[i];
            }
        }
        return undefined;
    };

    ObjectInstance.prototype.OnChange = function(type, source, entry) {
        if (type === 'additionalProperties' &&
            source === 'key') {
            var prev = entry.GetKeyInstance().prevValue,
                curr = entry.GetKeyInstance().currValue;
            this.freeAdditionalKey(prev);
            this.useAdditionalKey(curr);
            this.updateAdditionalOptions();
            entry.SetValueSchema(this.additionalPropertys[curr]);
        }
    }

    ObjectInstance.prototype.GetKeys = function() {
        var a = [],
            i = 0;
            l = this.entries.length;

        for (; i < l; ++i) {
            a.push(this.entries[i].GetKey());
        }

        return a;
    };

    JSComposer.Instance.RegisterInstance('object', ObjectInstance);

    return ObjectInstance;
}());
if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.ArrayInstance = (function(){
    function ArrayInstance(schema, value) {
        JSComposer.Instance.apply(this, arguments);
        value = value || [];

        this.fields = [];
        this.allow_null = JSComposer.Utils.ldef(this.allow_null, false);

        for (var i = 0; i < value.length; ++i) {
            this.AddEntry(value[i]);
        }
    }

    ArrayInstance.prototype = new JSComposer.Instance();
    ArrayInstance.prototype.constructor = ArrayInstance;

    ArrayInstance.prototype.AddEntry = function(value) {
        var d       = JSComposer.Utils.makeElement("div", {"className":"list entry node"}),
            field   = JSComposer.Instance.CreateInstance(this.items, value);

        this.fields.push(field);
        field.Render(d);
        this.elements.ctr.appendChild(d);
    };

    ArrayInstance.prototype.GetValue = function() {
        var a = [],
            l = this.fields.length;

        // Return null on empty if requested
        if (this.allow_null && l == 0) return null;

        // Add all field values to array, in order
        for (var i = 0; i < l; ++i) {
            a.push(this.fields[i].GetValue());
        }

        return a;
    };

    JSComposer.Instance.RegisterInstance('array', ArrayInstance);

    return ArrayInstance;
}());
if (window.JSComposer === undefined) { window.JSComposer = {}; }

JSComposer.TypeDescInstance = (function(){
    function TypeDescInstance(schema, value) {
        value = JSComposer.Utils.ldef(value, {'type':'null'});
        JSComposer.Instance.apply(this, arguments);
        // In constructor to ensure all types are loaded
        TypeDescInstance.Initialize();

        var self = this;
        this.elements.key = JSComposer.Utils.makeElement('div', {'className':'key field'});
        this.elements.value = JSComposer.Utils.makeElement('div', {'className':'value field'});
        this.elements.key_node = JSComposer.Utils.makeElement('div', {'className':'node'});
        this.elements.select = JSComposer.Utils.makeSelect(TypeDescInstance.Keys, false);
        JSComposer.Utils.applyClass(this.elements.ctr, 'entry');

        this.elements.ctr.appendChild(this.elements.key);
        this.elements.key_node.appendChild(this.elements.select);
        this.elements.key.appendChild(this.elements.key_node);
        this.elements.ctr.appendChild(this.elements.value);
        JSComposer.Utils.setSelectValue(this.elements.select, value.type);

        JSComposer.Utils.attachEvent(this.elements.select, 'change', function() { self.OnTypeChange.apply(self, []); });

        this.OnTypeChange(value);
    };

    TypeDescInstance.Initialize = function() {
        // Only do this once
        if (TypeDescInstance.Initialized) { return undefined; }
        TypeDescInstance.Initialized = true;

        var l = JSComposer.Instance.ObjectKeys.length;

        for (var i = 0; i < l; ++i) {
            var key     = JSComposer.Instance.ObjectKeys[i],
                object  = JSComposer.Instance.Objects[key],
                desc    = JSComposer.Utils.ldef(object.Descriptor, {'type':'object', 'fields':{}, 'order':[]});

            TypeDescInstance.Keys.push(key);
            TypeDescInstance.Options[key] = desc;
        }
    };
    TypeDescInstance.Initialized = false;
    TypeDescInstance.Options = {};
    TypeDescInstance.Keys = [];

    TypeDescInstance.prototype = new JSComposer.Instance();
    TypeDescInstance.prototype.constructor = TypeDescInstance;

    TypeDescInstance.prototype.GetValue = function() {
        var type = JSComposer.Utils.getSelectValue(this.elements.select),
            val  = this.value.GetValue();

        val.type = type;

        return val;
    }

    TypeDescInstance.prototype.OnTypeChange = function(value) {
        // Get current value and potential desc
        var type = JSComposer.Utils.getSelectValue(this.elements.select),
            desc = TypeDescInstance.Options[type];

        console.log("TypeDescInstance.OnTypeChange :: Setting Type: ", type, desc);

        // Don't change anything if the type hasn't changed
        if (this.currType === type) { return undefined;}

        // Destroy value if currently set
        if (this.value !== undefined) { this.value.Destroy(); }

        // Create value, render it, and update our state
        this.currType = type;
        this.value = JSComposer.Instance.CreateInstance(desc, value);
        this.value.Render(this.elements.value);
    }

    JSComposer.Instance.RegisterInstance('schema', TypeDescInstance);

    return TypeDescInstance;
}());
//var Utils           = require('Utils');
//
if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.Form = (function() {
    function Form(schema, value) {
        var self = this;
        this.schema = schema;
        this.formNumber = ++Form.count;
        this.formID = 'js_composer_form_' + this.formNumber.toString();
        this.elements = {
            'form':         JSComposer.Utils.makeElement('form', {'name': this.formID, 'id': this.formID, 'method':'POST'}),
            'body':         JSComposer.Utils.makeElement('div', {'className':'form body'}),
            'footer':       JSComposer.Utils.makeElement('div', {'className':'form footer'}),
            'submit':       JSComposer.Utils.makeElement('div', {'className':'submit button'})
        };
        JSComposer.Utils.setText(this.elements.submit, "Submit");
        JSComposer.Utils.attachEvent(this.elements.submit, 'click', function (e) { return self.OnSubmit(e); });
        this.field = JSComposer.Instance.CreateInstance(this, null, schema, value);
        console.log(this.field);
    }

    Form.count = 0;

    Form.prototype.Render = function (target) {
        this.elements.footer.appendChild(this.elements.submit);
        this.elements.form.appendChild(this.elements.body);
        this.elements.form.appendChild(this.elements.footer);
        this.field.Render(this.elements.body);
        target.appendChild(this.elements.form);
    }

    Form.prototype.GetObject = function() {
        var object = this.field.GetValue();
        console.log("Validating: ", tv4.validate(object, this.schema), '::', tv4.error);
        return JSON.stringify(object);
    }

    Form.prototype.OnSubmit = function() {
        var value       = this.GetObject(),
            field       = JSComposer.Utils.makeElement('input', {'type':'hidden','name':'json','value':value});

        this.elements.form.appendChild(field);
        this.elements.form.submit();
    }

    return Form;
}());
