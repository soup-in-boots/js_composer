if (window.JSComposer === undefined) { window.JSComposer = {}; }

JSComposer.Field = (function() {
    // Constructor
    function Field(type_desc, value) {
        this.elements = {
            ctr:        JSComposer.Utils.makeElement("div", {"className":"node"})
        };
        this.type_desc = JSComposer.Utils.ldef(type_desc, {'type':'null'});
    }

    // Static Properties
    Field.Objects = {
        'null':     Field
    };

    Field.ObjectKeys = ['null'];

    // Static Methods
    Field.RegisterField = function(type, constructor) {
        if (Field.Objects[type] !== undefined) throw "Object already defined: " + type;
        Field.Objects[type] = constructor;
        Field.ObjectKeys.push(type);
    };

    Field.CreateObject = function(type_desc, value) {
        console.log("Field.CreateObject: ", type_desc, value);
        if (type_desc === undefined ||
            type_desc.type === undefined) {
            return undefined;
        }
        var type = type_desc.type;
        if (Field.Objects[type] !== undefined) {
            console.log('Creating object:', type);
            return new (Field.Objects[type])(type_desc, value);
        }
        return undefined;
    };

    // Instance Methods
    Field.prototype.Render = function (target) {
        target.appendChild(this.elements.ctr);
    };

    Field.prototype.GetValue = function () {
        return null;
    };

    Field.prototype.Destroy = function() {
        var parent_node = this.elements.ctr.parentElement;
        parent_node.removeChild(this.elements.ctr);
    };

    Field.prototype.OnChange = function() {
    };

    return Field;
}());
