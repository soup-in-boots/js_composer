define('JSComposer/Form', ['JSComposer/Utils', 'JSComposer/Instance', 'tv4'], function(Utils, Instance, tv4) {
    function Form(schema, value) {
        var self = this;
        this.schema = schema;
        this.formNumber = ++Form.count;
        this.formID = 'js_composer_form_' + this.formNumber.toString();
        this.elements = {
            'form':         Utils.makeElement('form', {'name': this.formID, 'id': this.formID, 'method':'POST', 'className':'panel'}),
            'body':         Utils.makeElement('div', {'className':'panel-body'}),
            'footer':       Utils.makeElement('div', {'className':'panel-footer'}),
            'submit':       Utils.makeElement('div', {'className':'submit btn btn-default'})
        };
        Utils.setText(this.elements.submit, "Submit");
        Utils.attachEvent(this.elements.submit, 'click', function (e) { return self.OnSubmit(e); });
        this.field = Instance.CreateInstance(this, null, schema, value);
    }

    Form.count = 0;

    Form.prototype.Render = function (target) {
        this.field.Render(this.elements.body);
        this.elements.footer.appendChild(this.elements.submit);
        this.elements.form.appendChild(this.elements.body);
        this.elements.form.appendChild(this.elements.footer);
        target.appendChild(this.elements.form);
    }

    Form.prototype.GetObject = function() {
        var object = this.field.GetValue();
        return JSON.stringify(object);
    }

    Form.prototype.OnSubmit = function() {
        var value       = this.GetObject(),
            field       = Utils.makeElement('input', {'type':'hidden','name':'json','value':value});

        this.elements.form.appendChild(field);
        this.elements.form.submit();
    }

    return Form;
});
