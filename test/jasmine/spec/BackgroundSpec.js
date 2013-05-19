var chrome = {
    extension:{
        onRequest:{addListener:function(){}},
        getURL:function(){}
    },
    pageAction:{
        onClicked:{addListener:function(){}},
        show:function(obj){ return true ;}
    },
    tabs:{
        onSelectionChanged:{addListener:function(){}},
        sendRequest:function(a,b,c){ return true },
        create:function(){ return true; }
    }
};
describe("Background page", function() {

	describe("When getting a request from a content script, ", function() {
        var href = "http://mysite.com"

        it("should not set the coolrss.href value when action is not showIcon", function() {

            expect( (function(){
                coolrss.onRequest({action:'notshowIcon',href:href},{tab:{id:0}},function(){});
                return coolrss.href;
            })()).not.toEqual( href );

        });

		it("should set the coolrss.href value", function() {

			expect( (function(){
                coolrss.onRequest({action:'showIcon',href:href},{tab:{id:0}},function(){});
                return coolrss.href;
            })() ).toEqual( href );

        });

	});

    describe("When getting a request from the page icon, ", function() {

        it("should not create a tab if there coolrss.href is not set ", function() {

            expect( (function(){
                coolrss.href = '';
                return coolrss.onPageAction({id:0});
            })()).toBeFalsy();

        });

        it("should create a tab if there coolrss.href is set", function() {

            expect( (function(){
                coolrss.href = 'i have a value';
                return coolrss.onPageAction({id:0});
            })() ).toBeTruthy();

        });

    });


    describe("When a tab gets focus, ", function() {

        it("should set the coolrss.href if it exists", function() {

            expect( (function(){
                coolrss.href = '';
                return coolrss.onPageAction({id:0});
            })()).toBeFalsy();

        });

        it("should not set the coolrss.href if it doesn't exists", function() {

            expect( (function(){
                coolrss.href = 'i have a value';
                return coolrss.onPageAction({id:0});
            })() ).toBeTruthy();

        });

    });



    describe("When getting a setting value, ", function() {

        it("getting a value from a key should return the correct fallback value", function() {

            expect( coolrss.getSetting("i_dont_exist_no_fallback") ).toBeNull();
            expect( coolrss.getSetting("TESTVALUE") ).toBe('ABC');

        });

        it("getting the THEME value should return the value of the current theme, not the name", function() {

            expect( coolrss.getSetting("THEME").substring(0,10) ).toBe('background');

        });
    });

    describe("When getting a local store value, ", function() {

        it("getting a value from a key should return the correct fallback value", function() {

            expect( coolrss.getLocalStore("i_dont_exist_no_fallback")).toBeNull();
            expect( coolrss.getLocalStore("TESTVALUE") ).toBe('ABC');

        });

        it("getting the THEME value should return the the name", function() {

            expect( coolrss.getLocalStore("THEME").substring(0,10) ).not.toBe('background');

        });
    });

});