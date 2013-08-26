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
