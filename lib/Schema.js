(function() {
    if (typeof window.JSComposer === 'undefined') { window.JSComposer = {}; }
    var schema = {
        "$schema":"http://json-schema.org/draft-04/schema#",
        "id":"http://jscomposer.net/schema/jscomposer#",
        "definitions":{
            'label':{'type':'string'}
        }
    };

    tv4.addSchema(schema.id, schema);

    function URI(fragment, uri) {
        uri = JSComposer.Utils.ldef(uri, schema.id);
        uri = uri.replace(/#/, fragment);
        return uri
    }
    function Ref(fragment, uri) {
        uri = URI(fragment, uri);
        if (tv4.getSchema(uri) === undefined) {
            console.log('[JSComposer.Schema.Ref]', 'Invalid URI/Fragment: ', uri, '::', fragment);
            throw 'invalid_uri';
        }
        return {'$ref':uri};
    }

    function LoadSchema(uri) {
        // 1. Handle already loaded case
        if (uri.match(/#$/) === null) {
            uri = uri + "#";
        }
        if (tv4.getSchema(uri) !== undefined) { return; }

        var http    = new XMLHttpRequest();
        console.log("Fetching URI: ", uri);
        http.open("GET", uri, false);
        http.send(null);


        tv4.addSchema(uri, JSON.parse(http.responseText));
    };

    function FetchSchema(uri) {
        return tv4.getSchema(uri);
    }

    JSComposer.Schema = {
        Fetch: FetchSchema,
        Load: LoadSchema,
        Ref: Ref,
        URI: URI
    };
}());
