//var Utils           = require('Utils');
//
if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.Form = (function() {
    function Form(schema, value) {
        var self = this;
        this.schema = schema;
        this.formNumber = ++Form.count;
        this.formID = 'js_composer_form_' + this.formNumber.toString();
        this.elements = {
            'form':         JSComposer.Utils.makeElement('form', {'name': this.formID, 'id': this.formID, 'method':'POST'}),
            'body':         JSComposer.Utils.makeElement('div', {'className':'form body'}),
            'footer':       JSComposer.Utils.makeElement('div', {'className':'form footer'}),
            'submit':       JSComposer.Utils.makeElement('div', {'className':'submit button'})
        };
        JSComposer.Utils.setText(this.elements.submit, "Submit");
        JSComposer.Utils.attachEvent(this.elements.submit, 'click', function (e) { return self.OnSubmit(e); });
        this.field = JSComposer.Instance.CreateInstance(this, null, schema, value);
        console.log(this.field);
    }

    Form.count = 0;

    Form.prototype.Render = function (target) {
        this.elements.footer.appendChild(this.elements.submit);
        this.elements.form.appendChild(this.elements.body);
        this.elements.form.appendChild(this.elements.footer);
        this.field.Render(this.elements.body);
        target.appendChild(this.elements.form);
    }

    Form.prototype.GetObject = function() {
        var object = this.field.GetValue();
        console.log("Validating: ", tv4.validate(object, this.schema), '::', tv4.error);
        return JSON.stringify(object);
    }

    Form.prototype.OnSubmit = function() {
        var value       = this.GetObject(),
            field       = JSComposer.Utils.makeElement('input', {'type':'hidden','name':'json','value':value});

        this.elements.form.appendChild(field);
        this.elements.form.submit();
    }

    return Form;
}());
