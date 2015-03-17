define('JSComposer/Instance/ObjectInstance', ['JSComposer/Utils', 'JSComposer/Instance', 'JSComposer/Entry'], function(Utils, Instance, Entry) {
    // TODO: Update for schema changes, including changes to
    // additionalProperties and properties.
    //
    // Optional properties are now defined as any defined
    // under "properties" but not listed in "required",
    // additionalProperties is now defined as either a
    // boolean (in which case any valid type shall suffice)
    // or a single schema (to which any additionalProperties
    // must conform).
    function ObjectInstance(context, parent, schema, value) {
        Instance.apply(this, arguments);
        // We need all these schema properties
        this.properties             = Utils.ldef(this.properties, {});
        this.additionalProperties   = Utils.ldef(this.additionalProperties, true);
        this.patternProperties      = Utils.ldef(this.patternProperties, {});
        this.required               = Utils.ldef(this.required, []);

        // Some internal properties
        this.supported              = Utils.getKeys(this.properties);
        this.patterns               = Utils.map(function(rxs) { return new RegExp(rxs); }, Utils.getKeys(this.patternProperties));
        this.property_map           = {
            'required':                 [],
            'optional':                 [],
            'pattern':                  [],
            'additional':               []
        };
        this.property_pam           = {};
        this.entries                = {
            'required':                 [],
            'optional':                 [],
            'pattern':                  [],
            'additional':               []
        };
        this.elements.sections      = {};
        this.section_count          = 0;

        // Figure out what our current value defines and what category they fall into
        value = Utils.ldef(value, {});

        this.property_map.required = this.required;
        for (var i = 0; i < this.property_map.required.length; ++i) {
            this.property_pam[this.property_map.required[i]] = 'required';
        }

        for (var k in this.properties) {
            if (this.property_pam.hasOwnProperty(k)) continue;
            this.property_map.optional.push(k);
            this.property_pam[k] = 'optional';
        }

        for (var k in value) {
            if (this.property_pam.hasOwnProperty(k)) continue;
            if (Utils.any(function(rx) { return e.exec(k) !== null; }, this.patterns)) {
                this.property_map.pattern.push(k);
                this.property_pam[k] = 'pattern';
            } else {
                this.property_map.additional.push(k);
                this.property_pam[k] = 'additional';
            }
        }

        // UI Components
        this.elements.body  = Utils.makeElement('div', {'className':'panel-body'});
        if (typeof this.title !== 'undefined') {
            this.elements.header = Utils.makeElement('h3', {'className':'panel-heading'});
            Utils.setText(this.elements.header, this.title);
        }
        Utils.applyClass(this.elements.ctr, 'object');

        // Rendering
        value = Utils.ldef(value, {});

        if (this.property_map.required.length > 0) {
            this.AddSection('required', this.property_map.required, value);
        }

        if (this.property_map.optional.length > 0) {
            this.AddSection('optional', this.property_map.optional, value);
        }

        if (this.patterns.length > 0) {
            this.AddSection('pattern', this.property_map.pattern, value);
        }

        if (this.additionalProperties !== false) {
            this.AddSection('additional', this.property_map.additional, value);
        }

        this.CompilePatterns();
    }

    ObjectInstance.prototype = new Instance();
    ObjectInstance.prototype.constructor = ObjectInstance;

    ObjectInstance.Default      = {};
    ObjectInstance.Descriptor   = {
        'type':         'object_type', // Insert maniacal laughter here
        'properties':   {
            'label':        {'type':'text', 'label':'Label'},
            'header':       {'type':'boolean', 'label':'Display Header'},
            'properties':   {
                'type':                     'object',
                'additionalProperties':     {},
                'label':                    'Properties'
            },
            'order':        {'type':'order','options':[],'label':'Instance Order'}
        }
    };
    ObjectInstance.PropertyOptions      = {
        'required':                 {'deletable':false, 'more':false, 'header':'Required'},
        'optional':                 {'deletable':true, 'more':true, 'header':'Optional'},
        'pattern':                  {'deletable':true, 'more':true, 'header':'Pattern'},
        'additional':               {'deletable':true, 'more':true, 'header':'Extra'}
    };

    ObjectInstance.prototype.GetKeySchema = function(type) {
        switch (type) {
            case 'required':
                return Schema.Ref('#/definitions/label');
                break;
            case 'optional':
                return {'enum':this.property_map.optional};
                break;
            case 'pattern':
            default:
                return {'type':'string'};
        }
    };

    ObjectInstance.prototype.AddSection = function(type, properties, value) {
        ++this.section_count;

        var options = ObjectInstance.PropertyOptions[type],
            ctr     = Utils.makeElement('div', {'className':'object-section panel panel-default'});
            header  = Utils.makeElement('div', {'className':'object-section panel-heading'}),
            footer  = Utils.makeElement('div', {'className':'object-section panel-footer text-right'}),
            title   = Utils.makeElement('h4', {'className':'objet-section panel-title'}),
            more    = undefined;

        Utils.applyClass(ctr, type);
        Utils.setText(title, options.header);

        if (options.more) {
            var $self = this;
            more = Utils.makeElement('button', {'type':'button', 'className':'create btn btn-default btn-xs'});
            Utils.setText(more, '+');
            Utils.attachEvent(more, 'click', function() {
                $self.OnAddEntry(type);
            });
            footer.appendChild(more);
        }

        header.appendChild(title);
        ctr.appendChild(header);
        ctr.appendChild(footer);
        this.elements.body.appendChild(ctr);

        this.elements.sections[type] = ctr;

        for (var k in properties) {
            if (type !== 'properties' && !value.hasOwnProperty(k)) continue;
            var s = this.GetKeySchema(type);
            s.title = typeof properties[k].title != 'undefined' ? properties[k].title : s.title;
            this.AddEntry(type, s, properties[k], k, value[k], ObjectInstance.PropertyOptions[type]);
        }
    }

    ObjectInstance.prototype.AddEntry = function(type, key_desc, value_desc, key, value) {
        var $self       = this,
            entry       = new Entry(this.context, this, key_desc, value_desc, key, value),
            val_field   = entry.GetValueInstance(),
            key_field   = entry.GetKeyInstance(),
            ctr         = Utils.makeElement('div', {'className':'panel-body form-group'});

        val_field.OnChange = Utils.appendFunction(val_field.OnChange, function() { $self.OnChange(type, 'value', entry); });
        key_field.OnChange = Utils.appendFunction(key_field.OnChange, function() { $self.OnChange(type, 'key', entry); });

        if (type === 'additionalProperties') {
            this.useAdditionalKey(key);
        }

        this.entries[type].push(entry);
        entry.Render(ctr);
        var section_node = this.elements.sections[type];
        section_node.insertBefore(ctr, section_node.lastChild);
    };

    ObjectInstance.prototype.OnAddEntry = function(type) {
        var properties  = this[type],
            options     = ObjectInstance.PropertyOptions[type],
            key_schema  = this.GetKeySchema(type),
            key         = undefined,
            val_schema  = undefined;

        if (type === 'additional') {
            if (typeof this.additionalProperties == 'boolean') {
                val_schema = {
                    'oneOf':        [
                        {'type':'string'},
                        {'type':'number'},
                        {'type':'object'}
                    ]
                };
                key = '';
            } else {
                val_schema = this.additionalProperties;
            }
        } else if (type === 'pattern') {
            var valid   = false,
                pattern = undefined;
            do {
                key = prompt("Enter a new property name.");

                if (key === null) {
                    key = undefined;
                    break;
                }

                pattern = this.patternScan(key);
                if (pattern) {
                    val_schema = this.patternProperties[pattern];
                    valid = true;
                }
            } while (valid = false);
        } else if (type === 'optional') {
            key = this.property_map.optional[0];
            val_schema = this.properties[key];
        }

        if (typeof key_schema !== 'undefined' &&
            typeof val_schema !== 'undefined') {
            this.AddEntry(type, key_schema, val_schema, key, undefined, options);
        }
    };

    ObjectInstance.prototype.patternScan = function(key) {
        if (typeof this.patternProperties === 'undefined') { return undefined; }

        for (var pattern in this.patternProperties) {
            if (key.match(this.compiledPatterns[k])) {
                return pattern;
            }
        }

        return false;
    }

    ObjectInstance.prototype.useAdditionalKey = function(key) {
        var index = this.additionalAvailable.indexOf(key);

        if (index < 0) throw "key_used_twice";

        this.additionalAvailable.splice(index, 1);
        this.additionalUsed.push(key);
        this.updateAdditionalOptions();
    }

    ObjectInstance.prototype.freeAdditionalKey = function(key) {
        var index = this.additionalUsed.indexOf(key);

        if (index < 0) throw "freeing_unused_key";

        this.additionalUsed.splice(index, 1);
        this.additionalAvailable.push(key);
        this.updateAdditionalOptions();
    }

    ObjectInstance.prototype.updateOptionalKeys = function() {
        var entries     = this.entries.optional,
            available   = this.additionalAvailable,
            options     = undefined,
            instance    = this;

        function get_options() {
            var o = {};
            for (var i = 0, l = available.length; i < l; ++i) {
                var key     = available[i],
                    title   = instance.additionalTitles[key];
                o[key] = title;
            }
            return o;
        }

        for (var i = 0, l = entries.length; i < l; ++i) {
            var entry   = entries[i],
                select  = entry.GetKeyInstance(),
                key     = select.GetValue(),
                title   = this.additionalTitles[key],
                tmp     = get_options();

            tmp[key] = title;
            select.SetOptions(tmp);
        }
    }

    ObjectInstance.prototype.CompilePatterns = function() {
        if (typeof this.patternProperties === 'undefined') { return undefined; }
        this.compiledPatterns = {};

        for (var pattern in this.patternProperties) {
            var rx = new RegExp(pattern);
            this.compiledPatterns[pattern] = rx;
        }
    }

    ObjectInstance.prototype.GetValue = function() {
        var o = {};

        for (var type in this.entries) {
            if (!this.entries.hasOwnProperty(type)) continue;
            var entries = this.entries[type];
            for (var i = 0, l = entries.length; i < l; ++i) {
                var k = entries[i].GetKey(),
                    v = entries[i].GetValue();

                o[k] = v;
            }
        }

        return o;
    };

    ObjectInstance.prototype.Render = function(target) {
        if (typeof this.title !== 'undefined') { this.elements.ctr.appendChild(this.elements.header); }
        this.elements.ctr.appendChild(this.elements.body);
        target.appendChild(this.elements.ctr);
    };

    ObjectInstance.prototype.FindEntry = function(key) {
        for (var k in this.entries) {
            if (!this.entries.hasOwnProperty(k)) continue;
            var entries = this.entries[k],
                l = entries.length,
                i = 0;

            for (i = 0; i < l; ++i) {
                if (entries[i].GetKey() === key) return entries[i];
            }
        }
        return undefined;
    };

    ObjectInstance.prototype.OnChange = function(type, source, entry) {
        if (type === 'optional' &&
            source === 'key') {
            var prev = entry.GetKeyInstance().prevValue,
                curr = entry.GetKeyInstance().currValue;
            //this.freeAdditionalKey(prev);
            //this.useAdditionalKey(curr);
            //this.updateAdditionalOptions();
            entry.SetValueSchema(this.properties[curr]);
        }
    }

    ObjectInstance.prototype.GetKeys = function() {
        var a = [],
            i = 0;
            l = this.entries.length;

        for (; i < l; ++i) {
            a.push(this.entries[i].GetKey());
        }

        return a;
    };

    Instance.RegisterInstance('object', ObjectInstance);

    return ObjectInstance;
});
