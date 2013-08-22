if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.ListField = (function(){
    function ListField(type_desc, value) {
        JSComposer.Field.apply(this, arguments);
        value = value || [];

        this.fields = [];
        this.type_desc.allow_null = JSComposer.Utils.ldef(this.type_desc.allow_null, false);

        for (var i = 0; i < value.length; ++i) {
            this.AddEntry(value[i]);
        }
    }

    ListField.prototype = new JSComposer.Field();
    ListField.prototype.constructor = ListField;

    ListField.prototype.AddEntry = function(value) {
        var d       = JSComposer.Utils.makeElement("div", {"className":"list entry node"}),
            field   = JSComposer.Field.CreateObject(this.type_desc.field, value);

        this.fields.push(field);
        field.Render(d);
        this.elements.ctr.appendChild(d);
    };

    ListField.prototype.GetValue = function() {
        var a = [],
            l = this.fields.length;

        // Return null on empty if requested
        if (this.type_desc.allow_null && l == 0) return null;

        // Add all field values to array, in order
        for (var i = 0; i < l; ++i) {
            a.push(this.fields[i].GetValue());
        }

        return a;
    };

    JSComposer.Field.RegisterField('list', ListField);

    return ListField;
}());
