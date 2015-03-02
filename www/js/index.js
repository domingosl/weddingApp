/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        alert(1);
        this.bindEvents();
        alert(2);
        FastClick.attach(document.body);
        alert(3);
        $('#deviceready').center();
        alert(4);
        $('#login-form-div').center();
        alert(5);
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        //app.receivedEvent('deviceready');


        $('#deviceready').hide();

        $(".button-collapse").sideNav();

        $('#content-div').height($(window).height() - 85 + 'px');

        $('#deviceready').addClass('hidder');
        growishApi.load({
            appKey: '1234567890',
            url: 'https://dev.listanozzeonline.com/apiproxy/v1/'
        });

        console.log('API LOADED');

        if(growishApi.isUser()) {
            growishApi.getUser({
                id: growishApi.getUid(),
                callback: function(data) {
                    //preloader.off();
                    console.log(data.email);
                    growishApi.getList({
                        id: data.list[0],
                        callback: function(data) {
                            console.log(data);
                            switchPage('status', data);
                        }
                    });
                },
                errorCallback: function(data) {
                    console.log('can\'t download user');
                    growishApi.logout();
                    switchPage('login');
                    return true;
                }
            });
        } else {
            switchPage('login');
        }


    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

$('#login-form-btn').click(function() {
    var button = $(this);
    button.prop("disabled", true);
    preloader.on();
    growishApi.formLogin({
        formName: 'login-form',
        callback: function(listId) {
            growishApi.getList({
                id: listId,
                callback: function(data) {
                    preloader.off();
                    button.prop("disabled", false);
                    switchPage('status', data);
                }
            });
        },
        errorCallback: function() {
            preloader.off();
            button.prop("disabled", false);
            button.prop("disabled", false);
            button.addClass('swing');
        }
    });
});

function switchPage(page, data) {
    if(page === 'status') {
        $('#login-form-div').hide(100, function() {
            $('#main-div').show();
        });

    }
    else if(page === 'login') {
        $('#main-div').hide(100, function() {
            $('#login-form-div').show();
        });
    }
}


$('.nav-wrapper a').click(function() {
    var link = $(this).attr('href');

    switch(link)
    {
        case '#logout':
            $(".button-collapse").sideNav('hide');
            switchPage('login');
            growishApi.logout();
            break;
    }

});

var preloader = {
    on: function() {
        $('.loader-background').fadeIn(100);
    },
    off: function() {
        $('.loader-background').fadeOut(100);
    }
}

$.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
        $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
        $(window).scrollLeft()) + "px");
    return this;
}

function priceFormat(price, notDecimals) {
    price = price / 100;
    var value = {
        integer: Math.floor(price),
        decimal: function() {
            var val = Math.round(100*(price - Math.floor(price)));
            if(val === 0)
                return '00';
            else {
                if(val < 10)
                    return '0' + val;
                return val;
            }

        }
    }
    if((notDecimals != undefined && notDecimals === false) || notDecimals === undefined )
        return '<span class="integer-number-part">' + value.integer + '</span>.<span class="decimal-number-part">' + value.decimal() + '</span> &#8364;';
    else if(notDecimals != undefined && notDecimals === true )
        return '<span class="integer-number-part">' + value.integer + '</span> &#8364;';
}