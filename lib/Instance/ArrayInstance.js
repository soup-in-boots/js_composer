if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.ArrayInstance = (function(){
    function ArrayInstance(context, parent, schema, value) {
        JSComposer.Instance.apply(this, arguments);
        value = value || [];

        this.fields             = [];
        this.allow_null         = JSComposer.Utils.ldef(this.allow_null, false);
        this.items              = JSComposer.Utils.ldef(this.items, JSComposer.Schema.Ref('#', 'http://json-schema.org/schema'));
        this.minItems           = JSComposer.Utils.ldef(this.minItems, 0);

        this.elements.footer    = JSComposer.Utils.makeElement('div', {'className':'array footer'});
        this.elements.body      = JSComposer.Utils.makeElement('div', {'className':'array body'});
        this.elements.ctr.appendChild(this.elements.body);
        this.elements.ctr.appendChild(this.elements.footer);

        var $self = this;
        more = JSComposer.Utils.makeElement('div', {'className':'create button'});
        JSComposer.Utils.setText(more, '+');
        JSComposer.Utils.attachEvent(more, 'click', function() {
            console.log('Adding entry');
            $self.AddEntry();
        });
        this.elements.footer.appendChild(more);

        for (var i = 0; i < value.length; ++i) {
            this.AddEntry(value[i]);
        }
    }

    ArrayInstance.prototype = new JSComposer.Instance();
    ArrayInstance.prototype.constructor = ArrayInstance;

    ArrayInstance.prototype.AddEntry = function(value) {
        var d       = JSComposer.Utils.makeElement("div", {"className":"array entry node"}),
            field   = this.CreateInstance(this.items, value);

        this.fields.push(field);
        field.Render(d);
        this.elements.body.appendChild(d);
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
