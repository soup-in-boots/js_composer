define('JSComposer/Instance/ArrayInstance', ['JSComposer/Utils', 'JSComposer/Schema', 'JSComposer/Instance'], function(Utils, Schema, Instance){
    function ArrayInstance(context, parent, schema, value) {
        Instance.apply(this, arguments);
        value = value || [];

        this.fields             = [];
        this.allow_null         = Utils.ldef(this.allow_null, false);
        this.items              = Utils.ldef(this.items, {"oneOf":[
                {'type':'array'},
                {'type':'boolean'},
                {'type':'integer'},
                {'type':'null'},
                {'type':'number'},
                {'type':'object'},
                {'type':'string'}
            ]});
        this.minItems           = Utils.ldef(this.minItems, 0);
        this.title              = Utils.ldef(this.title, 'An Array');

        this.elements.header    = Utils.makeElement('div', {'className':'array panel-heading'});
        this.elements.footer    = Utils.makeElement('div', {'className':'array panel-footer text-right'});
        this.elements.body      = Utils.makeElement('div', {'className':'array panel-body'});
        this.elements.title     = Utils.makeElement('h4', {'className':'array panel-title'});

        Utils.setText(this.elements.title, this.title);
        Utils.applyClass(this.elements.ctr, 'array');

        this.elements.header.appendChild(this.elements.title);
        this.elements.ctr.appendChild(this.elements.header);
        this.elements.ctr.appendChild(this.elements.body);
        this.elements.ctr.appendChild(this.elements.footer);

        var $self = this;
        more = Utils.makeElement('div', {'className':'create btn btn-success'});
        Utils.setText(more, 'Add');
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
        var ctr         = Utils.makeElement('div', {'className':'array entry panel panel-default panel-body'}),
            value_wrap  = Utils.makeElement('div', {'style':{'overflow':'hidden','paddingRight':'15px'}}),
            field       = this.CreateInstance(this.items, value),
            btn         = Utils.makeElement('button', {'type':'button', 'className': 'delete btn btn-danger pull-right'});

        Utils.setText(btn, 'Delete');
        this.fields.push(field);
        ctr.appendChild(btn);
        ctr.appendChild(value_wrap);
        field.Render(value_wrap);
        this.elements.body.appendChild(ctr);
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
