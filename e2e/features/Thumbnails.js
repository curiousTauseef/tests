//TODO: Find out the reason why Thumbnails are not being called on the tests
var Thumbnails = function() {

    var ptor;


    this.Before(function (callback) {
        console.log('Thumbnails.js Before');
        browser.ignoreSynchronization = true;
        ptor = protractor.getInstance();
        callback();
    });



    this.When(/^they click in the Thumbnails tab$/, function (callback) {
        console.log("When they click in the Thumbnails tab - Thumbnails.js");
        //this.switchToViewerFrame();
        //ptor.sleep(3000).then(function() {
            ptor.findElement(protractor.By.linkText('Thumbnails')).then(
                function (thumb) {
                    thumb.click();
                    callback();
                },
                function () {
                    callback.fail("thumbnail tab not found");
                });
        //});
    });

    this.When(/^they click in the expand arrow in the Thumbnails tab$/, function (callback) {
        console.log('When they click in the expand arrow in the Thumbnails tab');
        this.expandThumbnailsTab(callback);
    });

    this.Then(/^a list of thumbnails is rendered to the user$/, function (callback) {
        console.log("Then a list of thumbnails is rendered to the user - Thumbnails.js");
        //this.switchToViewerFrame();
        //ptor.sleep(3000).then(function() {
            ptor.findElements(protractor.By.css('.wrap.loaded img'))
                .then(function(thumbsimg) {
                for(i = 0; i < 3; i++){ //checking only the three first thumbnails at the moment
                    thumbsimg[i].getAttribute('src')
                        .then(function(src) {
                            if(src.substring(src.length - 4, src.length) == '.jpg')
                                callback();
                            else
                                callback.fail("image is not a jpg");
                        },
                        function() {
                            callback.fail("img src not found");
                        });
                }
                });
        //});
    });

    this.Then(/^the list of thumbnails is expanded$/, function (callback) {
        var that = this;
        console.log('Then the list of thumbnails is expanded');
        ptor.findElement(protractor.By.css('.leftPanel')) //or .thumbsView?
            .then(function (el) {
                el.getCssValue('width')
                    .then(function(w){
                        var tlw = that.getThumbsListWidth();
                        console.log('thumbsListWidth ' + tlw);
                        if (w.replace('px','') > tlw.replace('px','')){
                            callback();
                        }
                        else{
                            callback.fail('thumbnails should be expanded');
                        }
                    });
            });
    });

    this.Given(/^the user is viewing the expanded thumbnails list$/, function (callback) {
        console.log('Given the user is viewing the expanded thumbnails list');
        this.expandThumbnailsTab(callback);

    });

    this.When(/^they click in the contract arrow$/, function (callback) {
        console.log('When they click in the contract arrow');
        this.contractLeftPanelArrow(callback);
    });

    this.Then(/^the list of thumbnails is contracted$/, function (callback) {
        console.log('Then the list of thumbnails is contracted');
        var that = this;
        ptor.findElement(protractor.By.css('.leftPanel')) //or .thumbsView?
            .then(function (el) {
                el.getCssValue('width')
                    .then(function(w){
                        var tlw = that.getThumbsListWidth();
                        console.log('thumbsListWidth ' + tlw);
                        if (w.replace('px','') < tlw.replace('px','')){
                            callback();
                        }
                        else{
                            callback.fail('thumbnails should be expanded');
                        }
                    });
            });
    });

    this.When(/^they click on a thumbnail$/, function (callback) {
        console.log('When they click on a thumbnail');
        ptor.findElements(protractor.By.css('.thumb'))
            .then(
                function(els){
                    els[2].click()
                        .then(function(){
                            callback();
                        });
                },
                function(){
                    callback.fail('loaded thumbnails not found.');
                }
        );
    });

    //this.Given(/^they are viewing a list of thumbnails$/, function (callback) {
    //    // Write code here that turns the phrase above into concrete actions
    //    callback.pending();
    //});
    //
    //this.When(/^they click on a thumbnail$/, function (callback) {
    //    // Write code here that turns the phrase above into concrete actions
    //    callback.pending();
    //});
    //
    //this.Then(/^the corresponding image is loaded in the main Viewer$/, function (callback) {
    //    // Write code here that turns the phrase above into concrete actions
    //    callback.pending();
    //});





};

module.exports = Thumbnails;