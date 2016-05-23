/*eslint-env jasmine */

'use strict';

var angular = require('angular');
var Api = require('./../service/Api');

describe('Api', function() {
    
    beforeEach(function() {
        var ngModule = angular.module('mockModule', []);

        require('./../ApiServiceProvider')(ngModule);
    });
    
    beforeEach(angular.mock.module('mockModule'));
    
    var streamApiService;
    
    beforeEach(function() {
        angular.mock.inject(function(_streamApiService_) {
            streamApiService = _streamApiService_;
        });
    });
    
    it('should return an object of type Api', function() {
        var api = streamApiService.getInstance({url:'https://foo'});
        expect(api).toEqual(jasmine.any(Api));
    });
    
    it('should throw exception when passed not an object', function() {
        expect(function(){streamApiService.getInstance('foo');})
            .toThrow(new Error('Please provide valid configuration object.'));
    });
    
    it('should throw exception when not passed argument', function() {
        expect(function(){streamApiService.getInstance();})
            .toThrow(new Error('Please provide valid configuration object.'));
    });
    
    it('should throw exception when passed argument hasn\'t url property', function() {
        expect(function(){streamApiService.getInstance({nourl: 'foo'});})
            .toThrow(new Error('\'config\' should have \'url\' property of type \'string\''));
    });
    
    it('should throw exception when url type is not string', function() {
        expect(function(){streamApiService.getInstance({url: 1});})
            .toThrow(new Error('\'config\' should have \'url\' property of type \'string\''));
    });
    
    it('should throw exception when passing config.url without valid scheme', function() {
        expect(function(){streamApiService.getInstance({url: 'foo'});})
            .toThrow(new Error('You must provide valid scheme with \'url\''));
    });
    
    it('should set it\'s config.url correctly when passed correct url and not passed version', function() {
        var api = streamApiService.getInstance({url: 'https://foo'});
        expect(api.config.url)
            .toBe('https://foo/attask/api');
    });
    
    it('should set it\'s config.url  when passed valid url and version unsupported', function() {
        var api = streamApiService.getInstance({url: 'https://foo', version: 'unsupported'});
        expect(api.config.url)
            .toBe('https://foo/attask/api-unsupported');
    });
    
    it('should set it\'s config.url  when passed valid url and version internal', function() {
        var api = streamApiService.getInstance({url: 'https://foo', version: 'internal'});
        expect(api.config.url)
            .toBe('https://foo/attask/api-internal');
    });
    
    it('should set it\'s config.url  when passed valid url and version number', function() {
        var api = streamApiService.getInstance({url: 'https://foo', version: '5.0'});
        expect(api.config.url)
            .toBe('https://foo/attask/api/v5.0');
    });
});