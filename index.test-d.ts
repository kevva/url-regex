import {expectType} from 'tsd';
import urlRegex = require('.');

expectType<RegExp>(urlRegex());
expectType<RegExp>(urlRegex({exact: true}));
expectType<RegExp>(urlRegex({strict: false}));
