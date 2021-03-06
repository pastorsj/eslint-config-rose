/**
 * Copyright 2016 Rose-Hulman Institute of Technology. All rights reserved.
 */
import test from 'ava';
import isPlainObj from 'is-plain-obj';
import tempWrite from 'temp-write';
import eslint from 'eslint';
import conf from '../';

/**
 * Runs the Eslint engine
 * @param {String} str - The string to be linted
 * @param {String} conf - A configuration for the eslint engine
 * @returns {String} The message associated with whether the string was free of lint errors
 */
function runEslint(str, conf) {
    const linter = new eslint.CLIEngine({
        useEslintrc: false,
        configFile: tempWrite.sync(JSON.stringify(conf))
    });

    return linter.executeOnText(str).results[0].messages;
}

test(t => {
    t.true(isPlainObj(conf));
    t.true(isPlainObj(conf.rules));

    const errors = runEslint(`'use strict'\nvar foo = function () {};\nfoo();\n`, conf);
    t.is(errors[0].ruleId, 'semi');
    t.is(errors[1].ruleId, 'space-before-function-paren');
});
