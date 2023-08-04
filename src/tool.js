function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

function isObject(val) {
  return val !== null && typeof val === 'object';
}

function isArray(val) {
  return toString.call(val) === '[object Array]';
}

function isUndefined(val) {
  return typeof val === 'undefined';
}

function isString(val) {
  return typeof val === 'string';
}

function isNumber(val) {
  return typeof val === 'number';
}


// ------------------------------分割线------------------------------
export function isNullOrUndefined(item) {
	return item === null || item === undefined
}

export function isEmptyString(str) {
	return Object.prototype.toString.call(str) === '[object String]' &&  str.trim() === ''
}

export function isEmptyArray(arr) {
	return Array.isArray(arr) && !arr?.length
}

export function isEmptyObject(obj) {
	return Object.keys(obj).length === 0
}

export function isEmpty(item) {
	return isEmptyString(item) || isEmptyObject(item) || isEmptyArray(item) || isNullOrUndefined(item)
}


// ------------------------------分割线------------------------------

function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

function isDate(val) {
  return toString.call(val) === '[object Date]';
}

function isFile(val) {
  return toString.call(val) === '[object File]';
}

function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

export default {
	isAbsoluteURL,
	isArray,
	isArrayBuffer,
	isBlob,
	isBuffer,
	isDate,
	isFile,
	isFormData,
	isNumber,
	isObject,
	isPlainObject,
	isString,
	isUndefined,
	isNullOrUndefined,
	isEmptyString,
	isEmptyArray,
	isEmptyObject,
	isEmpty
}
