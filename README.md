JScomposer
===========

Generate HTML forms for generating strongly-type JSON objects! Use JSON-Schema (http://json-schema.org) to define the structure of your objects, then tell JSComposer to build a form using one of your object schemas. It's even easier than it sounds.

For instance, consider this basic schema, defining a user for your... I don't know... pet owners forum? Just look already.
```javascript
{
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
}
```

EXTREMELY Basic Usage:
```javascript
    require('JSComposer', function(JSComposer) {
        var d       = document.getElementById('jsc_form'),
            form    = new JSComposer.Form({'type':'string'}, "Look! A Form!");

        form.Render(d);
    });
```

Or to render our "pet owners forum" user form:
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
            form    = new JSComposer.Form(schema, "Look! A Form!");

        form.Render(d);
    });
```

And if your JSON Schema is getting large enough that you want to put it in its own schema file, you can easily refer to it! Simply create a reference to the schema definition (see the $ref property in JSON schema) and JSComposer will automatically load the schema for you! Hooray!
```javascript
    require('JSComposer', function(JSComposer) {
        var d       = document.getElementById('jsc_form'),
            form    = new JSComposer.Form(JSComposer.Schema.Ref('#/definitions/pet_owner', 'http://petownerparadiso.info/schema#'), {});

        form.Render(d);
    });
```

Hell, you can use JSComposer to *build a schema*:
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
