/**
 * Created by shi.pengyan on 2017-04-21.
 */
// from jquery source
let toString = Object.prototype.toString;
let hasOwn = Object.prototype.hasOwnProperty;
//let push = Array.prototype.push;
//let slice = Array.prototype.slice;
//let trim = String.prototype.trim;
//let indexOf = Array.prototype.indexOf;

// [[Class]] -> type pairs
let class2type = {};

// Populate the class2type map
'Boolean Number String Function Array Date RegExp Object'.split(' ').forEach(function (name) {
  class2type['[object ' + name + ']'] = name.toLowerCase();
});

function type(obj) {
  return obj == null ? String(obj) : class2type[toString.call(obj)] || 'object';
}

function isPlainObject(obj) {
  if (!obj || type(obj) !== 'object') {
    return false;
  }

  // Not own constructor property must be Object
  if (obj.constructor && !hasOwn.call(obj, 'constructor') && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
    return false;
  }

  // Own properties are enumerated firstly, so to speed up,
  // if last one is own, then all properties are own.

  var key;
  for (key in obj) {
  }

  return key === undefined || hasOwn.call(obj, key);
}

function extend() {
  /* eslint-disable one-var */
  let options, name, src, copy, copyIsArray, clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false;

  // Handle a deep copy situation
  if (typeof target === 'boolean') {
    deep = target;
    target = arguments[1] || {};
    // skip the boolean and the target
    i = 2;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if (typeof target !== 'object' && type(target) !== 'function') {
    target = {};
  }

  // extend jQuery itself if only one argument is passed
  if (length === i) {
    target = this;
    --i;
  }

  for (; i < length; i++) {
    // Only deal with non-null/undefined values
    if ((options = arguments[i]) != null) {
      // Extend the base object
      for (name in options) {
        src = target[name];
        copy = options[name];

        // Prevent never-ending loop
        if (target === copy) {
          continue;
        }

        // Recurse if we're merging plain objects or arrays
        if (deep && copy && (isPlainObject(copy) || (copyIsArray = type(copy) === 'array'))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && type(src) === 'array' ? src : [];

          } else {
            clone = src && isPlainObject(src) ? src : {};
          }

          // Never move original objects, clone them
          target[name] = extend(deep, clone, copy);

          // Don't bring in undefined values
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }

  // Return the modified object
  return target;
};


module.exports = extend;
