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
        this.bindEvents();
        FastClick.attach(document.body);
        preloader = new $.materialPreloader({
            position: 'top',
            height: '7px',
            col_1: '#f5f5f5',
            col_2: '#1bbc9b',
            col_3: '#f5f5f5',
            col_4: '#1bbc9b',
            fadeIn: 500,
            fadeOut: 500
        });


        $('#deviceready').center();
        $('#login-form-div').center();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        //app.receivedEvent('deviceready');

        $('#deviceready').addClass('hidder');
        growishApi.load({
            appKey: '1234567890',
            url: 'https://nozzedev.growish.com/apiproxy/v1/'
        });

        console.log('API LOADED');

        if(growishApi.isUser()) {
            growishApi.getUser({
                id: growishApi.getUid(),
                callback: function(data) {
                    preloader.off();
                    growishApi.getList({
                        id: data.list[0],
                        callback: function(data) {
                            console.log(data);
                            switchPage('status', data);
                        }
                    });
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
    button.removeClass('swing');
    button.prop("disabled", true);
    preloader.on();
    growishApi.formLogin({
        formName: 'login-form',
        callback: function(listId) {
            growishApi.getList({
                id: listId,
                callback: function(data) {
                    preloader.off();
                    switchPage('status', data);
                }
            });
        },
        errorCallback: function() {
            preloader.off();
            button.prop("disabled", false);
            button.addClass('swing');
        }
    });
});

function switchPage(page, data) {
    if(page === 'status') {
        $("#status-screen").css('height',$(window).height())
        $('#list_credit').html(priceFormat(data.amount));
        $('#owners-names').html(data.brideName + ' e ' + data.groomName + '!' );

        $('#login-form-div').addClass('hidder');
        $('#status-screen').removeClass('hidder');
    }
    else if(page === 'login') {
        $('#login-form-div').removeClass('hidder');
        $('#status-screen').addClass('hidder');
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