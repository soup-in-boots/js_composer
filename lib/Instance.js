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
        function add_constructor(uri, cons) {
            if (current.constructors.hasOwnProperty(uri)) return;
            current.constructors[uri] = cons;
            current.cons_order.push(uri);
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
                            } else {
                                console.log('[JSComposer.Instance.ResolveSchema]', 'invaid type merger', current, '::', schema);
                                throw "invalid_type_merger";
                            }
                            if (typeof schema[key] === 'string') {
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

        if (typeof current.type === 'object' &&
            current.type.length === 1) {
            current.type = current.type[0];
        }
        if (typeof current.type === 'string') {
            add_constructor(current.type, Instance.Objects[current.type]);
        } else if (typeof current.oneOf !== 'undefined') {
            var cons = Instance.Objects['oneOf'];
            add_constructor('oneOf', cons);
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
            console.log("Found Constructor: ", uri, " :: ", cons, " :: ", schema.cons_order, " :: ", schema);
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
