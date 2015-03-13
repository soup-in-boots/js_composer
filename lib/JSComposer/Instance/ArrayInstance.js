define('JSComposer/Instance/ArrayInstance', ['JSComposer/Utils', 'JSComposer/Schema', 'JSComposer/Instance'], function(Utils, Schema, Instance){
    function ArrayInstance(context, parent, schema, value) {
        Instance.apply(this, arguments);
        value = value || [];

        this.fields             = [];
        this.allow_null         = Utils.ldef(this.allow_null, false);
        this.items              = Utils.ldef(this.items, Schema.Ref('#', 'http://json-schema.org/schema'));
        this.minItems           = Utils.ldef(this.minItems, 0);

        this.elements.footer    = Utils.makeElement('div', {'className':'array footer'});
        this.elements.body      = Utils.makeElement('div', {'className':'array body'});
        this.elements.ctr.appendChild(this.elements.body);
        this.elements.ctr.appendChild(this.elements.footer);

        var $self = this;
        more = Utils.makeElement('div', {'className':'create button'});
        Utils.setText(more, '+');
        Utils.attachEvent(more, 'click', function() {
            console.log('Adding entry');
            $self.AddEntry();
        });
        this.elements.footer.appendChild(more);

        for (var i = 0; i < value.length; ++i) {
            this.AddEntry(value[i]);
        }
    }

    ArrayInstance.prototype = new Instance();
    ArrayInstance.prototype.constructor = ArrayInstance;

    ArrayInstance.prototype.AddEntry = function(value) {
        var d       = Utils.makeElement("div", {"className":"array entry node"}),
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

    Instance.RegisterInstance('array', ArrayInstance);

    return ArrayInstance;
});
