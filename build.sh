#!/bin/bash

VERSION="0.0.1"
SRC_DIR="lib"
DEST="js_composer_${VERSION}.js"
FIELD_ORDER="OfInstance StaticInstance StringInstance PasswordInstance NumberInstance IntegerInstance SelectInstance BooleanInstance OrderInstance ObjectInstance ArrayInstance TypeDescInstance"
FIELDS=""
for field in $FIELD_ORDER
do
    FIELDS="${FIELDS} Instance/${field}.js"
done
FILES="tv4.min.js Utils.js Schema.js Instance.js Entry.js ${FIELDS} Form.js"

echo '' > ${DEST}

for file in $FILES
do
    cat `echo $SRC_DIR/${file}` >> ${DEST}
done
