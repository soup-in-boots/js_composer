JScomposer
===========

Generate HTML forms for generating strongly-type JSON objects! Use JSON-Schema (http://json-schema.org) to define the structure of your objects, then tell JSComposer to build a form using one of your object schemas. It's even easier than it sounds.

Why JSComposer?
===========
JSComposer is built using pure JavaScript. Its only dependency is tv4, which it uses for form validation and schema management. It uses the AMD/Require.JS module structure (with each module corresponding to an object).

JSComposer uses CSS classes and HTML frameworks defined by Bootstrap to arrange the forms it generates, making it very simple to style (just include a copy of bootstrap.css for a nice, basic look).

JSComposer can handle the JSON Schema attributes "anyOf", "allOf", and "oneOf" with ease by "resolving" all referenced schema at the time of instantiation. This means you can easily reuse existing schema definitions with slight modifications, such as changing a title, or increasing the minimum value for an integer.

JSComposer also resolves references across one or more schemas. Additional schemas can be loaded explicitly using `JSComposer.Schema.LoadSchema`, or implicitly by using a `$ref` schema to refer to a new schema URI.

More importantly, JSComposer is *extensible*. If you're not satisfied with the built-in handling of a particular schema or otherwise require customization, it's as simple as extending the base JSComposer.Instance class with your own functionality and registering it for a URI (or several). A good example of this would be a "date" field:

```javascript
JSComposer = require('JSComposer');
// Alternatively...
Instance = require('JSComposer/Instance');
// Or even
SelectInstance = require('JSComposer/Instance/SelectInstance');

var my_schema = {
    "id": "http://mysite.com/myschema#",
    "definitions": {
        // ...
        "date": {"type":"string","format":"[0-9]{4}/[0-9]{2}/[0-9]{2}"}     // There are better regexes, but at least I'm using ISO
    }
};

function MyDate(context, parent, type_desc, value) {
    Instance.apply(this, arguments);        // Chain the constructor; it does things for you, like giving you a container to render into

    // The default instance for 'enum' is a select box, so lets make a bunch of those because this is an example.
    // Be as fancy as you want, otherwise.
    this.year_selector  = Instance.CreateInstance({'enum':['1980', '1981', '1982', ...]});
    this.month_selector = Instance.CreateInstance({'enum':['01','02','03', ...]});
    this.day_selector   = Instance.CreateInstance({'enum':['01','02','03', ...]});
}

MyDate.prototype = new JSComposer.Instance();
MyDate.prototype.constructor = MyDate;

MyDate.prototype.Render = function(target) {
    this.elements.ctr.appendChild(this.year_selector);
    this.elements.ctr.appendChild(this.year_selector);
    this.elements.ctr.appendChild(this.year_selector);
    target.appendChild(this.elements.ctr);
}

MyDate.prototype.GetValue = function() {
    var a = [this.year_selector, this.month_selector, this.day_selector];
    return a.join('/');
}

// Register the new object constructor
JSComposer.Instance.RegisterInstance("http://mysite.com/myschema#/definitions/date", MyDate);

// Now any time JSComposer.Instance.CreateInstance({"$ref":"http://mysite.com/myschema#/definitions/date"})
// is invoked, your object will be used!
```

You only have to worry about exporting two functions: `Render(target)` and `GetValue()`, so go wild! (in the case of Render, you can use the default `Instance` function assuming all of your additional elements are added to `this.elements.ctr` ahead of time)

Usage
===========
EXTREMELY Basic Usage:
```javascript
    require('JSComposer', function(JSComposer) {
        var d       = document.getElementById('jsc_form'),
            form    = new JSComposer.Form({'type':'string'}, "Look! A Form!");

        form.Render(d);
    });
```

Of course, you can be as complicated or as simple as you like. Consider this basic schema defining a user for your... I don't know... pet owners forum? Just look already.
```javascript
    require('JSComposer', function(JSComposer) {
        var d       = document.getElementById('jsc_form'),
            schema  = {
                "type":             "object",
                "title":            "User",
                "properties":       {
                    "id":               {"type":"string"},
                    "password":         {"type":"string"},
                    "email_updates":    {"type":"boolean"},
                    "favorite_pets":    {
                        "enum":             [
                            "Cats",
                            "Dogs",
                            "Horses",
                            "Rabbits",
                            "Guinea Pigs",
                            "Mice",
                            "Rocks"             // Fine, Ricky. Rocks can be pets. Whatever.
                        ]
                    }
                },
                "required":             [
                    "id",
                    "password",
                    "email_updates"
                ]
            },
            form    = new JSComposer.Form(schema, {});

        form.Render(d);
    });
```

Of course, these kinds of JSON Schema would be a pain to write on every page you needed them, so if your collection of schemas is getting large enough that you want to put it in its own schema file, you can easily refer to it! Simply create a reference to the schema definition (see the $ref property in JSON schema) and JSComposer will automatically load the schema for you! Hooray!
```javascript
    require('JSComposer', function(JSComposer) {
        var d       = document.getElementById('jsc_form'),
            form    = new JSComposer.Form(JSComposer.Schema.Ref('#/definitions/pet_owner', 'http://petownerparadiso.info/schema#'), {});

            // {"$ref":"http://petownerparadiso.info/schema#/definitions/pet_owner"} works just as well

        form.Render(d);
    });
```

Hell, you could use JSComposer to *build your schema*:
```javascript
    require('JSComposer', function(JSComposer) {
        var d       = document.getElementById('jsc_form'),
            form    = new JSComposer.Form(JSComposer.Schema.Ref('#', 'http://json-schema.org/schema#'), {});

        form.Render(d);
    });
```

Uh-oh
=========
Ricky's insisting plants can be pets now. Ricky's a jerk. I don't even know how he got administrator access to the database. Regardless, it's getting to be a pain to update my schema definition every time he adds another pet type to the database. I wish there was some way to make this easier.

*Oh, wait!* There *is* a way! Instead of storing my *enumeration* of pet types directly in my schema, I can refer to another URL on my site that will query the database and produce a valid schema!
```javascript
    {
        ...
                    "favorite_pets":    {"$ref":"http://petownerparadiso.info/api/pet_types/schema#"}
        ...
    }
```

And the return value from `http://petownerparadiso.info/api/pet_types/schema#` is:
```javascript
{
    "enum":     [
        "Cats",
        "Dogs",
        "Horses",
        "Rabbits",
        "Guinea Pigs",
        "Mice",
        "Rocks",
        "Plants",
        "Snowmen"
    ]
}
```

SERIOUSLY RICKY? Okay, there's NO way snowmen are pets. Quit messing around with my site!
