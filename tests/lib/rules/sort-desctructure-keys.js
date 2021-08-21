/**
 * @fileoverview Tests for sort-param-keys rule.
 * @author IRoninCoder
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/sort-destructure-keys"),
    { RuleTester } = require("../../../lib/rule-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("sort-destructure-keys", rule, {
    valid: [

        // default (asc)
        { code: "var fn = ({_, a, b}) => { return 'hello world'; } // default (asc)", options: [], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({a, b, c}) => { return 'hello world'; }", options: [], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({a, b, b_}) => { return 'hello world'; }", options: [], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({C, b_, c}) => { return 'hello world'; }", options: [], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({$, A, _, a}) => { return 'hello world'; }", options: [], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({Z, À, è}) => { return 'hello world'; }", options: [], parserOptions: { ecmaVersion: 6 } },

        // ignore non-simple computed properties.
        { code: "var fn = ({a, [a + b]: b, c}) => { return 'hello world'; } // ignore non-simple", options: [], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({[f()]: a, b}) => { return 'hello world'; }", options: [], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({c, [b++]: b, a}) => { return 'hello world'; }", options: ["desc"], parserOptions: { ecmaVersion: 6 } },

        // ignore properties separated by spread properties
        { code: "var fn = ({a, ...z, b}) => { return 'hello world'; } // ignore properties", options: [], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({b, ...z, a}) => { return 'hello world'; }", options: [], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({...a, b, ...c, d}) => { return 'hello world'; }", options: [], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({...a, b, ...d, ...c, e, z}) => { return 'hello world'; }", options: [], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({b, ...c, ...d, e}) => { return 'hello world'; }", options: [], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({a, ...z}) => { return 'hello world'; }", options: [], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({...z, a}) => { return 'hello world'; }", options: ["desc"], parserOptions: { ecmaVersion: 6 } },

        // not ignore properties not separated by spread properties
        { code: "var fn = ({...z, a, b}) => { return 'hello world'; } // not ignore properties", options: [], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({...z, ...c, a, b}) => { return 'hello world'; }", options: [], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({a, b, ...z}) => { return 'hello world'; }", options: [], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({...z, ...x, a, ...c, ...d, f, e}) => { return 'hello world'; }", options: ["desc"], parserOptions: { ecmaVersion: 6 } },

        // works when spread occurs in a function parameter
        { code: "function fn(...args) { return [...args].length; }) => { return 'hello world'; }", options: [], parserOptions: { ecmaVersion: 6 } },
        { code: "function g() {}; function f(...args) { return g(...args); }) => { return 'hello world'; }", options: [], parserOptions: { ecmaVersion: 6 } },

        // ignore object literals (can be handled by sort-keys rule instead).
        { code: "let {a, b} = {} // ignore object literals", options: [], parserOptions: { ecmaVersion: 6 } },

        // nested
        { code: "var fn = ({a, b:{x, y}, c}) => { return 'hello world'; } // nested", options: [], parserOptions: { ecmaVersion: 6 } },

        // asc
        { code: "var fn = ({_, a, b}) => { return 'hello world'; } // asc", options: ["asc"], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({a, b, c}) => { return 'hello world'; }", options: ["asc"], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({a, b, b_}) => { return 'hello world'; }", options: ["asc"], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({C, b_, c}) => { return 'hello world'; }", options: ["asc"], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({$, A, _, a}) => { return 'hello world'; }", options: ["asc"], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({Z, À, è}) => { return 'hello world'; }", options: ["asc"], parserOptions: { ecmaVersion: 6 } },

        // asc, minKeys should ignore unsorted keys when number of keys is less than minKeys
        { code: "var fn = ({a, c, b}) => { return 'hello world'; } // asc, minKeys", options: ["asc", { minKeys: 4 }], parserOptions: { ecmaVersion: 6 } },

        // asc, insensitive
        { code: "var fn = ({_, a, b}) => { return 'hello world'; } // asc, insensitive", options: ["asc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({a, b, c}) => { return 'hello world'; }", options: ["asc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({a, b, b_}) => { return 'hello world'; }", options: ["asc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({b_, C, c}) => { return 'hello world'; }", options: ["asc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({b_, c, C}) => { return 'hello world'; }", options: ["asc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({$, _, A, a}) => { return 'hello world'; }", options: ["asc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },

        // asc, insensitive, minKeys should ignore unsorted keys when number of keys is less than minKeys
        { code: "var fn = ({$, A, _, a}) => { return 'hello world'; } // asc, insensitive, minKeys", options: ["asc", { caseSensitive: false, minKeys: 5 }], parserOptions: { ecmaVersion: 6 } },

        // asc, natural
        { code: "var fn = ({_, a, b}) => { return 'hello world'; } // asc, natural", options: ["asc", { natural: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({a, b, c}) => { return 'hello world'; }", options: ["asc", { natural: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({a, b, b_}) => { return 'hello world'; }", options: ["asc", { natural: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({C, b_, c}) => { return 'hello world'; }", options: ["asc", { natural: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({$, _, A, a}) => { return 'hello world'; }", options: ["asc", { natural: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({Z, À, è}) => { return 'hello world'; }", options: ["asc", { natural: true }], parserOptions: { ecmaVersion: 6 } },

        // asc, natural, minKeys should ignore unsorted keys when number of keys is less than minKeys
        { code: "var fn = ({b_, a, b}) => { return 'hello world'; } // asc, natural, minKeys", options: ["asc", { natural: true, minKeys: 4 }], parserOptions: { ecmaVersion: 6 } },

        // asc, natural, insensitive
        { code: "var fn = ({_, a, b}) => { return 'hello world'; } // asc, natural, insensitive", options: ["asc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({a, b, c}) => { return 'hello world'; }", options: ["asc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({a, b, b_}) => { return 'hello world'; }", options: ["asc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({b_, C, c}) => { return 'hello world'; }", options: ["asc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({b_, c, C}) => { return 'hello world'; }", options: ["asc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({$, _, A, a}) => { return 'hello world'; }", options: ["asc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({Z, À, è}) => { return 'hello world'; }", options: ["asc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },

        // asc, natural, insensitive, minKeys should ignore unsorted keys when number of keys is less than minKeys
        { code: "var fn = ({a, _, b}) => { return 'hello world'; } // asc, natural, insensitive, minKeys", options: ["asc", { natural: true, caseSensitive: false, minKeys: 4 }], parserOptions: { ecmaVersion: 6 } },

        // desc
        { code: "var fn = ({b, a, _}) => { return 'hello world'; } //desc", options: ["desc"], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({c, b, a}) => { return 'hello world'; }", options: ["desc"], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({b_, b, a}) => { return 'hello world'; }", options: ["desc"], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({c, b_, C}) => { return 'hello world'; }", options: ["desc"], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({a, _, A, $}) => { return 'hello world'; }", options: ["desc"], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({è, À, Z}) => { return 'hello world'; }", options: ["desc"], parserOptions: { ecmaVersion: 6 } },

        // desc, minKeys should ignore unsorted keys when number of keys is less than minKeys
        { code: "var fn = ({a, c, b}) => { return 'hello world'; }", options: ["desc", { minKeys: 4 }], parserOptions: { ecmaVersion: 6 } },

        // desc, insensitive
        { code: "var fn = ({b, a, _}) => { return 'hello world'; } //desc, insensitive", options: ["desc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({c, b, a}) => { return 'hello world'; }", options: ["desc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({b_, b, a}) => { return 'hello world'; }", options: ["desc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({c, C, b_}) => { return 'hello world'; }", options: ["desc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({C, c, b_}) => { return 'hello world'; }", options: ["desc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({a, A, _, $}) => { return 'hello world'; }", options: ["desc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({è, À, Z}) => { return 'hello world'; }", options: ["desc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },

        // desc, insensitive, minKeys should ignore unsorted keys when number of keys is less than minKeys
        { code: "var fn = ({$, _, A, a}) => { return 'hello world'; } //desc, insensitive, minKeys", options: ["desc", { caseSensitive: false, minKeys: 5 }], parserOptions: { ecmaVersion: 6 } },

        // desc, natural
        { code: "var fn = ({b, a, _}) => { return 'hello world'; } // desc, natural", options: ["desc", { natural: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({c, b, a}) => { return 'hello world'; }", options: ["desc", { natural: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({b_, b, a}) => { return 'hello world'; }", options: ["desc", { natural: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({c, b_, C}) => { return 'hello world'; }", options: ["desc", { natural: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({a, A, _, $}) => { return 'hello world'; }", options: ["desc", { natural: true }], parserOptions: { ecmaVersion: 6 } },

        // desc, natural, minKeys should ignore unsorted keys when number of keys is less than minKeys
        { code: "var fn = ({b_, a, b}) => { return 'hello world'; } //desc, natural, minKeys", options: ["desc", { natural: true, minKeys: 4 }], parserOptions: { ecmaVersion: 6 } },

        // desc, natural, insensitive
        { code: "var fn = ({b, a, _}) => { return 'hello world'; } // desc, natural, insensitive", options: ["desc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({c, b, a}) => { return 'hello world'; }", options: ["desc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({b_, b, a}) => { return 'hello world'; }", options: ["desc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({c, C, b_}) => { return 'hello world'; }", options: ["desc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({C, c, b_}) => { return 'hello world'; }", options: ["desc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var fn = ({a, A, _, $}) => { return 'hello world'; }", options: ["desc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },

        // desc, natural, insensitive, minKeys should ignore unsorted keys when number of keys is less than minKeys
        { code: "var fn = ({a, _, b}) => { return 'hello world'; } //desc, natural, insensitive, minKeys", options: ["desc", { natural: true, caseSensitive: false, minKeys: 4 }], parserOptions: { ecmaVersion: 6 } }
    ],
    invalid: [

        /*
         * TODO: finish fixing the invalids
         * TODO: then finish the logic
         *  default (asc)
         */
        {
            code: "var fn = ({a:1, '':2} // default",
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "asc",
                        thisName: "",
                        prevName: "a"
                    }
                }
            ]
        },
        {
            code: "var fn = ({a:1, [``]:2} // default",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "asc",
                        thisName: "",
                        prevName: "a"
                    }
                }
            ]
        },
        {
            code: "var fn = ({a:1, _:2, b:3} // default",
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "asc",
                        thisName: "_",
                        prevName: "a"
                    }
                }
            ]
        },
        {
            code: "var fn = ({a:1, c:2, b:3}",
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "asc",
                        thisName: "b",
                        prevName: "c"
                    }
                }
            ]
        },
        {
            code: "var fn = ({b_:1, a:2, b:3}",
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "asc",
                        thisName: "a",
                        prevName: "b_"
                    }
                }
            ]
        },
        {
            code: "var fn = ({b_:1, c:2, C:3}",
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "asc",
                        thisName: "C",
                        prevName: "c"
                    }
                }
            ]
        },
        {
            code: "var fn = ({$:1, _:2, A:3, a:4}",
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "asc",
                        thisName: "A",
                        prevName: "_"
                    }
                }
            ]
        },
        {
            code: "var fn = ({1:1, 2:4, A:3, '11':2}",
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "asc",
                        thisName: "11",
                        prevName: "A"
                    }
                }
            ]
        },
        {
            code: "var fn = ({'#':1, À:3, 'Z':2, è:4}",
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "asc",
                        thisName: "Z",
                        prevName: "À"
                    }
                }
            ]
        },
        {
            code: "var fn = ({ null: 1, [/(?<zero>0)/]: 2 }",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "asc",
                        thisName: "/(?<zero>0)/",
                        prevName: "null"
                    }
                }
            ]
        },

        // not ignore properties not separated by spread properties
        {
            code: "var fn = ({...z, c:1, b:1}",
            options: [],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "asc",
                        thisName: "b",
                        prevName: "c"
                    }
                }
            ]
        },
        {
            code: "var fn = ({...z, ...c, d:4, b:1, ...y, ...f, e:2, a:1}",
            options: [],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "asc",
                        thisName: "b",
                        prevName: "d"
                    }
                },
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "asc",
                        thisName: "a",
                        prevName: "e"
                    }
                }
            ]
        },
        {
            code: "var fn = ({c:1, b:1, ...a}",
            options: [],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "asc",
                        thisName: "b",
                        prevName: "c"
                    }
                }
            ]
        },
        {
            code: "var fn = ({...z, ...a, c:1, b:1}",
            options: [],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "asc",
                        thisName: "b",
                        prevName: "c"
                    }
                }
            ]
        },
        {
            code: "var fn = ({...z, b:1, a:1, ...d, ...c}",
            options: [],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "asc",
                        thisName: "a",
                        prevName: "b"
                    }
                }
            ]
        },
        {
            code: "var fn = ({...z, a:2, b:0, ...x, ...c}",
            options: ["desc"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "desc",
                        thisName: "b",
                        prevName: "a"
                    }
                }
            ]
        },
        {
            code: "var fn = ({...z, a:2, b:0, ...x}",
            options: ["desc"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "desc",
                        thisName: "b",
                        prevName: "a"
                    }
                }
            ]
        },
        {
            code: "var fn = ({...z, '':1, a:2}",
            options: ["desc"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "desc",
                        thisName: "a",
                        prevName: ""
                    }
                }
            ]
        },

        // ignore non-simple computed properties, but their position shouldn't affect other comparisons.
        {
            code: "var fn = ({a:1, [b+c]:2, '':3}",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "asc",
                        thisName: "",
                        prevName: "a"
                    }
                }
            ]
        },
        {
            code: "var fn = ({'':1, [b+c]:2, a:3}",
            options: ["desc"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "desc",
                        thisName: "a",
                        prevName: ""
                    }
                }
            ]
        },
        {
            code: "var fn = ({b:1, [f()]:2, '':3, a:4}",
            options: ["desc"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "desc",
                        thisName: "a",
                        prevName: ""
                    }
                }
            ]
        },

        // not ignore simple computed properties.
        {
            code: "var fn = ({a:1, b:3, [a]: -1, c:2}",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "asc",
                        thisName: "a",
                        prevName: "b"
                    }
                }
            ]
        },

        // nested
        {
            code: "var fn = ({a:1, c:{y:1, x:1}, b:1}",
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "asc",
                        thisName: "x",
                        prevName: "y"
                    }
                },
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "asc",
                        thisName: "b",
                        prevName: "c"
                    }
                }
            ]
        },

        // asc
        {
            code: "var fn = ({a:1, _:2, b:3} // asc",
            options: ["asc"],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "asc",
                        thisName: "_",
                        prevName: "a"
                    }
                }
            ]
        },
        {
            code: "var fn = ({a:1, c:2, b:3}",
            options: ["asc"],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "asc",
                        thisName: "b",
                        prevName: "c"
                    }
                }
            ]
        },
        {
            code: "var fn = ({b_:1, a:2, b:3}",
            options: ["asc"],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "asc",
                        thisName: "a",
                        prevName: "b_"
                    }
                }
            ]
        },
        {
            code: "var fn = ({b_:1, c:2, C:3}",
            options: ["asc"],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "asc",
                        thisName: "C",
                        prevName: "c"
                    }
                }
            ]
        },
        {
            code: "var fn = ({$:1, _:2, A:3, a:4}",
            options: ["asc"],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "asc",
                        thisName: "A",
                        prevName: "_"
                    }
                }
            ]
        },
        {
            code: "var fn = ({1:1, 2:4, A:3, '11':2}",
            options: ["asc"],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "asc",
                        thisName: "11",
                        prevName: "A"
                    }
                }
            ]
        },
        {
            code: "var fn = ({'#':1, À:3, 'Z':2, è:4}",
            options: ["asc"],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "asc",
                        thisName: "Z",
                        prevName: "À"
                    }
                }
            ]
        },

        // asc, minKeys should error when number of keys is greater than or equal to minKeys
        {
            code: "var fn = ({a:1, _:2, b:3}",
            options: ["asc", { minKeys: 3 }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "asc",
                        thisName: "_",
                        prevName: "a"
                    }
                }
            ]
        },

        // asc, insensitive
        {
            code: "var fn = ({a:1, _:2, b:3} // asc, insensitive",
            options: ["asc", { caseSensitive: false }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "insensitive ",
                        order: "asc",
                        thisName: "_",
                        prevName: "a"
                    }
                }
            ]
        },
        {
            code: "var fn = ({a:1, c:2, b:3}",
            options: ["asc", { caseSensitive: false }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "insensitive ",
                        order: "asc",
                        thisName: "b",
                        prevName: "c"
                    }
                }
            ]
        },
        {
            code: "var fn = ({b_:1, a:2, b:3}",
            options: ["asc", { caseSensitive: false }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "insensitive ",
                        order: "asc",
                        thisName: "a",
                        prevName: "b_"
                    }
                }
            ]
        },
        {
            code: "var fn = ({$:1, A:3, _:2, a:4}",
            options: ["asc", { caseSensitive: false }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "insensitive ",
                        order: "asc",
                        thisName: "_",
                        prevName: "A"
                    }
                }
            ]
        },
        {
            code: "var fn = ({1:1, 2:4, A:3, '11':2}",
            options: ["asc", { caseSensitive: false }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "insensitive ",
                        order: "asc",
                        thisName: "11",
                        prevName: "A"
                    }
                }
            ]
        },
        {
            code: "var fn = ({'#':1, À:3, 'Z':2, è:4}",
            options: ["asc", { caseSensitive: false }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "insensitive ",
                        order: "asc",
                        thisName: "Z",
                        prevName: "À"
                    }
                }
            ]
        },

        // asc, insensitive, minKeys should error when number of keys is greater than or equal to minKeys
        {
            code: "var fn = ({a:1, _:2, b:3}",
            options: ["asc", { caseSensitive: false, minKeys: 3 }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "insensitive ",
                        order: "asc",
                        thisName: "_",
                        prevName: "a"
                    }
                }
            ]
        },

        // asc, natural
        {
            code: "var fn = ({a:1, _:2, b:3} // asc, natural",
            options: ["asc", { natural: true }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "",
                        order: "asc",
                        thisName: "_",
                        prevName: "a"
                    }
                }
            ]
        },
        {
            code: "var fn = ({a:1, c:2, b:3}",
            options: ["asc", { natural: true }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "",
                        order: "asc",
                        thisName: "b",
                        prevName: "c"
                    }
                }
            ]
        },
        {
            code: "var fn = ({b_:1, a:2, b:3}",
            options: ["asc", { natural: true }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "",
                        order: "asc",
                        thisName: "a",
                        prevName: "b_"
                    }
                }
            ]
        },
        {
            code: "var fn = ({b_:1, c:2, C:3}",
            options: ["asc", { natural: true }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "",
                        order: "asc",
                        thisName: "C",
                        prevName: "c"
                    }
                }
            ]
        },
        {
            code: "var fn = ({$:1, A:3, _:2, a:4}",
            options: ["asc", { natural: true }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "",
                        order: "asc",
                        thisName: "_",
                        prevName: "A"
                    }
                }
            ]
        },
        {
            code: "var fn = ({1:1, 2:4, A:3, '11':2}",
            options: ["asc", { natural: true }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "",
                        order: "asc",
                        thisName: "11",
                        prevName: "A"
                    }
                }
            ]
        },
        {
            code: "var fn = ({'#':1, À:3, 'Z':2, è:4}",
            options: ["asc", { natural: true }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "",
                        order: "asc",
                        thisName: "Z",
                        prevName: "À"
                    }
                }
            ]
        },

        // asc, natural, minKeys should error when number of keys is greater than or equal to minKeys
        {
            code: "var fn = ({a:1, _:2, b:3}",
            options: ["asc", { natural: true, minKeys: 2 }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "",
                        order: "asc",
                        thisName: "_",
                        prevName: "a"
                    }
                }
            ]
        },

        // asc, natural, insensitive
        {
            code: "var fn = ({a:1, _:2, b:3} // asc, natural, insensitive",
            options: ["asc", { natural: true, caseSensitive: false }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "insensitive ",
                        order: "asc",
                        thisName: "_",
                        prevName: "a"
                    }
                }
            ]
        },
        {
            code: "var fn = ({a:1, c:2, b:3}",
            options: ["asc", { natural: true, caseSensitive: false }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "insensitive ",
                        order: "asc",
                        thisName: "b",
                        prevName: "c"
                    }
                }
            ]
        },
        {
            code: "var fn = ({b_:1, a:2, b:3}",
            options: ["asc", { natural: true, caseSensitive: false }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "insensitive ",
                        order: "asc",
                        thisName: "a",
                        prevName: "b_"
                    }
                }
            ]
        },
        {
            code: "var fn = ({$:1, A:3, _:2, a:4}",
            options: ["asc", { natural: true, caseSensitive: false }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "insensitive ",
                        order: "asc",
                        thisName: "_",
                        prevName: "A"
                    }
                }
            ]
        },
        {
            code: "var fn = ({1:1, '11':2, 2:4, A:3}",
            options: ["asc", { natural: true, caseSensitive: false }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "insensitive ",
                        order: "asc",
                        thisName: "2",
                        prevName: "11"
                    }
                }
            ]
        },
        {
            code: "var fn = ({'#':1, À:3, 'Z':2, è:4}",
            options: ["asc", { natural: true, caseSensitive: false }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "insensitive ",
                        order: "asc",
                        thisName: "Z",
                        prevName: "À"
                    }
                }
            ]
        },

        // asc, natural, insensitive, minKeys should error when number of keys is greater than or equal to minKeys
        {
            code: "var fn = ({a:1, _:2, b:3}",
            options: ["asc", { natural: true, caseSensitive: false, minKeys: 3 }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "insensitive ",
                        order: "asc",
                        thisName: "_",
                        prevName: "a"
                    }
                }
            ]
        },

        // desc
        {
            code: "var fn = ({'':1, a:'2'} // desc",
            options: ["desc"],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "desc",
                        thisName: "a",
                        prevName: ""
                    }
                }
            ]
        },
        {
            code: "var fn = ({[``]:1, a:'2'} // desc",
            options: ["desc"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "desc",
                        thisName: "a",
                        prevName: ""
                    }
                }
            ]
        },
        {
            code: "var fn = ({a:1, _:2, b:3} // desc",
            options: ["desc"],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "desc",
                        thisName: "b",
                        prevName: "_"
                    }
                }
            ]
        },
        {
            code: "var fn = ({a:1, c:2, b:3}",
            options: ["desc"],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "desc",
                        thisName: "c",
                        prevName: "a"
                    }
                }
            ]
        },
        {
            code: "var fn = ({b_:1, a:2, b:3}",
            options: ["desc"],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "desc",
                        thisName: "b",
                        prevName: "a"
                    }
                }
            ]
        },
        {
            code: "var fn = ({b_:1, c:2, C:3}",
            options: ["desc"],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "desc",
                        thisName: "c",
                        prevName: "b_"
                    }
                }
            ]
        },
        {
            code: "var fn = ({$:1, _:2, A:3, a:4}",
            options: ["desc"],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "desc",
                        thisName: "_",
                        prevName: "$"
                    }
                },
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "desc",
                        thisName: "a",
                        prevName: "A"
                    }
                }
            ]
        },
        {
            code: "var fn = ({1:1, 2:4, A:3, '11':2}",
            options: ["desc"],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "desc",
                        thisName: "2",
                        prevName: "1"
                    }
                },
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "desc",
                        thisName: "A",
                        prevName: "2"
                    }
                }
            ]
        },
        {
            code: "var fn = ({'#':1, À:3, 'Z':2, è:4}",
            options: ["desc"],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "desc",
                        thisName: "À",
                        prevName: "#"
                    }
                },
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "desc",
                        thisName: "è",
                        prevName: "Z"
                    }
                }
            ]
        },

        // desc, minKeys should error when number of keys is greater than or equal to minKeys
        {
            code: "var fn = ({a:1, _:2, b:3}",
            options: ["desc", { minKeys: 3 }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "",
                        order: "desc",
                        thisName: "b",
                        prevName: "_"
                    }
                }
            ]
        },

        // desc, insensitive
        {
            code: "var fn = ({a:1, _:2, b:3} // desc, insensitive",
            options: ["desc", { caseSensitive: false }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "insensitive ",
                        order: "desc",
                        thisName: "b",
                        prevName: "_"
                    }
                }
            ]
        },
        {
            code: "var fn = ({a:1, c:2, b:3}",
            options: ["desc", { caseSensitive: false }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "insensitive ",
                        order: "desc",
                        thisName: "c",
                        prevName: "a"
                    }
                }
            ]
        },
        {
            code: "var fn = ({b_:1, a:2, b:3}",
            options: ["desc", { caseSensitive: false }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "insensitive ",
                        order: "desc",
                        thisName: "b",
                        prevName: "a"
                    }
                }
            ]
        },
        {
            code: "var fn = ({b_:1, c:2, C:3}",
            options: ["desc", { caseSensitive: false }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "insensitive ",
                        order: "desc",
                        thisName: "c",
                        prevName: "b_"
                    }
                }
            ]
        },
        {
            code: "var fn = ({$:1, _:2, A:3, a:4}",
            options: ["desc", { caseSensitive: false }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "insensitive ",
                        order: "desc",
                        thisName: "_",
                        prevName: "$"
                    }
                },
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "insensitive ",
                        order: "desc",
                        thisName: "A",
                        prevName: "_"
                    }
                }
            ]
        },
        {
            code: "var fn = ({1:1, 2:4, A:3, '11':2}",
            options: ["desc", { caseSensitive: false }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "insensitive ",
                        order: "desc",
                        thisName: "2",
                        prevName: "1"
                    }
                },
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "insensitive ",
                        order: "desc",
                        thisName: "A",
                        prevName: "2"
                    }
                }
            ]
        },
        {
            code: "var fn = ({'#':1, À:3, 'Z':2, è:4}",
            options: ["desc", { caseSensitive: false }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "insensitive ",
                        order: "desc",
                        thisName: "À",
                        prevName: "#"
                    }
                },
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "insensitive ",
                        order: "desc",
                        thisName: "è",
                        prevName: "Z"
                    }
                }
            ]
        },

        // desc, insensitive should error when number of keys is greater than or equal to minKeys
        {
            code: "var fn = ({a:1, _:2, b:3}",
            options: ["desc", { caseSensitive: false, minKeys: 2 }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "",
                        insensitive: "insensitive ",
                        order: "desc",
                        thisName: "b",
                        prevName: "_"
                    }
                }
            ]
        },

        // desc, natural
        {
            code: "var fn = ({a:1, _:2, b:3} // desc, natural",
            options: ["desc", { natural: true }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "",
                        order: "desc",
                        thisName: "b",
                        prevName: "_"
                    }
                }
            ]
        },
        {
            code: "var fn = ({a:1, c:2, b:3}",
            options: ["desc", { natural: true }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "",
                        order: "desc",
                        thisName: "c",
                        prevName: "a"
                    }
                }
            ]
        },
        {
            code: "var fn = ({b_:1, a:2, b:3}",
            options: ["desc", { natural: true }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "",
                        order: "desc",
                        thisName: "b",
                        prevName: "a"
                    }
                }
            ]
        },
        {
            code: "var fn = ({b_:1, c:2, C:3}",
            options: ["desc", { natural: true }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "",
                        order: "desc",
                        thisName: "c",
                        prevName: "b_"
                    }
                }
            ]
        },
        {
            code: "var fn = ({$:1, _:2, A:3, a:4}",
            options: ["desc", { natural: true }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "",
                        order: "desc",
                        thisName: "_",
                        prevName: "$"
                    }
                },
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "",
                        order: "desc",
                        thisName: "A",
                        prevName: "_"
                    }
                },
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "",
                        order: "desc",
                        thisName: "a",
                        prevName: "A"
                    }
                }
            ]
        },
        {
            code: "var fn = ({1:1, 2:4, A:3, '11':2}",
            options: ["desc", { natural: true }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "",
                        order: "desc",
                        thisName: "2",
                        prevName: "1"
                    }
                },
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "",
                        order: "desc",
                        thisName: "A",
                        prevName: "2"
                    }
                }
            ]
        },
        {
            code: "var fn = ({'#':1, À:3, 'Z':2, è:4}",
            options: ["desc", { natural: true }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "",
                        order: "desc",
                        thisName: "À",
                        prevName: "#"
                    }
                },
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "",
                        order: "desc",
                        thisName: "è",
                        prevName: "Z"
                    }
                }
            ]
        },

        // desc, natural should error when number of keys is greater than or equal to minKeys
        {
            code: "var fn = ({a:1, _:2, b:3}",
            options: ["desc", { natural: true, minKeys: 3 }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "",
                        order: "desc",
                        thisName: "b",
                        prevName: "_"
                    }
                }
            ]
        },

        // desc, natural, insensitive
        {
            code: "var fn = ({a:1, _:2, b:3} // desc, natural, insensitive",
            options: ["desc", { natural: true, caseSensitive: false }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "insensitive ",
                        order: "desc",
                        thisName: "b",
                        prevName: "_"
                    }
                }
            ]
        },
        {
            code: "var fn = ({a:1, c:2, b:3}",
            options: ["desc", { natural: true, caseSensitive: false }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "insensitive ",
                        order: "desc",
                        thisName: "c",
                        prevName: "a"
                    }
                }
            ]
        },
        {
            code: "var fn = ({b_:1, a:2, b:3}",
            options: ["desc", { natural: true, caseSensitive: false }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "insensitive ",
                        order: "desc",
                        thisName: "b",
                        prevName: "a"
                    }
                }
            ]
        },
        {
            code: "var fn = ({b_:1, c:2, C:3}",
            options: ["desc", { natural: true, caseSensitive: false }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "insensitive ",
                        order: "desc",
                        thisName: "c",
                        prevName: "b_"
                    }
                }
            ]
        },
        {
            code: "var fn = ({$:1, _:2, A:3, a:4}",
            options: ["desc", { natural: true, caseSensitive: false }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "insensitive ",
                        order: "desc",
                        thisName: "_",
                        prevName: "$"
                    }
                },
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "insensitive ",
                        order: "desc",
                        thisName: "A",
                        prevName: "_"
                    }
                }
            ]
        },
        {
            code: "var fn = ({1:1, 2:4, '11':2, A:3}",
            options: ["desc", { natural: true, caseSensitive: false }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "insensitive ",
                        order: "desc",
                        thisName: "2",
                        prevName: "1"
                    }
                },
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "insensitive ",
                        order: "desc",
                        thisName: "11",
                        prevName: "2"
                    }
                },
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "insensitive ",
                        order: "desc",
                        thisName: "A",
                        prevName: "11"
                    }
                }
            ]
        },
        {
            code: "var fn = ({'#':1, À:3, 'Z':2, è:4}",
            options: ["desc", { natural: true, caseSensitive: false }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "insensitive ",
                        order: "desc",
                        thisName: "À",
                        prevName: "#"
                    }
                },
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "insensitive ",
                        order: "desc",
                        thisName: "è",
                        prevName: "Z"
                    }
                }
            ]
        },

        // desc, natural, insensitive should error when number of keys is greater than or equal to minKeys
        {
            code: "var fn = ({a:1, _:2, b:3}",
            options: ["desc", { natural: true, caseSensitive: false, minKeys: 2 }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "insensitive ",
                        order: "desc",
                        thisName: "b",
                        prevName: "_"
                    }
                }
            ]
        },

        // asc, insenstitive, functionParams should validate when out of order
        {
            code: 'var First = ({ one, two, three }) => { return "hello world"; };',
            options: ["asc", { caseSensitive: false, functionParams: true }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "insensitive ",
                        order: "asc",
                        thisName: "three",
                        prevName: "two"
                    }
                }
            ]
        },

        // asc, senstitive, functionParams should validate when out of order
        {
            code: 'var First = ({ One, two, Three }) => { return "hello world"; };',
            options: ["asc", { caseSensitive: true, functionParams: true }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "sensitive ",
                        order: "asc",
                        thisName: "Three",
                        prevName: "two"
                    }
                }
            ]
        },

        // desc, insenstitive, functionParams should validate when out of order
        {
            code: 'var First = ({ one, two, three }) => { return "hello world"; };',
            options: ["desc", { caseSensitive: false, functionParams: true }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "insensitive ",
                        order: "asc",
                        thisName: "three",
                        prevName: "two"
                    }
                }
            ]
        },

        // desc, senstitive, functionParams should validate when out of order
        {
            code: 'var First = ({ One, two, Three }) => { return "hello world"; };',
            options: ["desc", { caseSensitive: true, functionParams: true }],
            errors: [
                {
                    messageId: "sortKeys",
                    data: {
                        natural: "natural ",
                        insensitive: "sensitive ",
                        order: "desc",
                        thisName: "two",
                        prevName: "One"
                    }
                }
            ]
        }

        /*
         * //TODO: IRONINCODER finish this piece
         *  full
         *  {
         *      code: [
         *          'function First ({ one, two, three }) {',
         *          '  return <div />;',
         *          '};'
         *      ].join('\n'),
         *      parser: parsers.BABEL_ESLINT,
         *      errors: [
         *          {
         *              message: ERROR_MESSAGE,
         *              line: 1,
         *              column: 29
         *          }
         *      ]
         *  },
         *  {
         *      code: [
         *          'function First ({ One, Txo, two }) {',
         *          '  return <div />;',
         *          '};'
         *      ].join('\n'),
         *      parser: parsers.BABEL_ESLINT,
         *      options: [
         *          {
         *              ignoreCase: true
         *          }
         *      ],
         *      errors: [
         *          {
         *              message: ERROR_MESSAGE,
         *              line: 1,
         *              column: 29
         *          }
         *      ]
         *  }
         */
    ]
});
