define('JSComposer/Form', ['JSComposer/Utils', 'JSComposer/Instance', 'tv4', 'EventEmitter'], function(Utils, Instance, tv4, EventEmitter) {
    function Form(schema, value, noForm) {
        EventEmitter.call(this);
        var self = this;
        this.schema = schema;
        this.formNumber = ++Form.count;
        this.formID = 'js_composer_form_' + this.formNumber.toString();
        this.elements = {
            'ctr':         Utils.makeElement('div', {}),
        };

        if (this.elements.submit) {
            Utils.setText(this.elements.submit, "Submit");
            Utils.attachEvent(this.elements.submit, 'click', function (e) { return self.OnSubmit(e); });
        }

        this.field = Instance.CreateInstance(this, null, schema, value);
        this.field.on('change', this.emit.bind(this, 'change'));
    }

    Form.prototype = new EventEmitter();
    Form.prototype.constructor = Form;

    Form.count = 0;

    Form.prototype.Render = function (target) {
        this.field.Render(this.elements.ctr);
        target.appendChild(this.elements.ctr);
    }

    Form.prototype.GetObject = function() {
        var object = this.field.GetValue();
        return JSON.stringify(object);
    }

    Form.prototype.GetValue = function() {
        return this.field.GetValue();
    }

    Form.prototype.OnSubmit = function() {
        var value       = this.GetObject(),
            field       = Utils.makeElement('input', {'type':'hidden','name':'json','value':value});

        this.elements.form.appendChild(field);
        this.elements.form.submit();
    }

    return Form;
});
