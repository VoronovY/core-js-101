/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  const result = {};
  result.width = width;
  result.height = height;
  result.getArea = function area() {
    return this.width * this.height;
  };
  return result;
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const obj = JSON.parse(json);
  Object.setPrototypeOf(obj, proto);
  return obj;
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

// class CssSelectorBuilder {
//   constructor(selector = '') {
//     this.selector = selector;
//     this.elName = '';
//     this.idName = '';
//     this.className = '';
//     this.attrName = '';
//     this.pseudoClassname = '';
//     this.pseudoElementName = '';
//     this.errors = {
//       selectorDublicate: 'Element, id and pseudo-element
// should not occur more then one time inside the selector',
//       wrongOrder: 'Selector parts should be arranged in the following order: element,
// id, class, attribute, pseudo-class, pseudo-element',
//     };
//   }

//   trhowErr(type) {
//     const errorText = this.errors[type];
//     throw new Error(errorText || 'Unexpected Error');
//   }

//   dublicateErr() {
//     this.trhowErr('selectorDublicate');
//   }

//   orderErr() {
//     this.trhowErr('wrongOrder');
//   }

//   element(value) {
//     // if (this.elName) this.dublicateErr();
//     this.elName = value;
//     return this;
//   }

//   id(value) {
//     if (this.idName) this.dublicateErr();
//     this.idName = `#${value}`;
//     return this;
//   }

//   class(value) {
//     this.className = `${this.className ? this.className : ''}.${value}`;
//     return this;
//   }

//   attr(value) {
//     this.attrName = `[${value}]`;
//     return this;
//   }

//   pseudoClass(value) {
//     if (this.pseudoElementName) this.dublicateErr();
//     this.pseudoClassname = `${this.pseudoClassname ? this.pseudoClassname : ''}:${value}`;
//     return this;
//   }

//   pseudoElement(value) {
//     this.pseudoElementName = `${this.pseudoElementName ? this.pseudoElementName : ''}::${value}`;
//     return this;
//   }

//   addToCombine(value) {
//     if (!this.combinedStrings) this.combinedStrings = [];
//     this.combinedStrings.push(value);
//   }

//   getFromCombaine() {
//     const string = this.makeString();
//     if (string) return string;
//     return (this.combinedStrings && this.combinedStrings.length)
//  ? this.combinedStrings.pop() : '';
//   }

//   combine(selector1, combinator, selector2) {
//     this.prop = '';
//     const second = (typeof selector1 === 'object') ? selector1.getFromCombaine() : selector1;
//     const first = (typeof selector2 === 'object') ? selector2.getFromCombaine() : selector2;
//     return new CssSelectorBuilder(`${first} ${combinator} ${second}`);
//   }

//   takeSelectorName(value) {
//     this.prop = '';
//     return value || '';
//   }

//   reset() {
//     this.elName = '';
//     this.idName = '';
//     this.className = '';
//     this.attrName = '';
//     this.pseudoClassname = '';
//     this.pseudoElementName = '';
//   }

//   makeString() {
//     const element = this.takeSelectorName(this.elName);
//     const id = this.takeSelectorName(this.idName);
//     const className = this.takeSelectorName(this.className);
//     const attr = this.takeSelectorName(this.attrName);
//     const pseudoCl = this.takeSelectorName(this.pseudoClassname);
//     const pseudoEl = this.takeSelectorName(this.pseudoElementName);
//     const result = element + id + className + attr + pseudoCl + pseudoEl;
//     this.reset();
//     return result;
//   }

//   stringify() {
//     const result = (this.combinedStrings && this.combinedStrings.length)
//       ? this.combinedStrings.pop() : this.makeString();
//     return result;
//   }
// }

const cssSelectorBuilder = {
  element(/* value */) {
    throw new Error('Not implemented');
  },

  id(/* value */) {
    throw new Error('Not implemented');
  },

  class(/* value */) {
    throw new Error('Not implemented');
  },

  attr(/* value */) {
    throw new Error('Not implemented');
  },

  pseudoClass(/* value */) {
    throw new Error('Not implemented');
  },

  pseudoElement(/* value */) {
    throw new Error('Not implemented');
  },

  combine(/* selector1, combinator, selector2 */) {
    throw new Error('Not implemented');
  },
};


module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
