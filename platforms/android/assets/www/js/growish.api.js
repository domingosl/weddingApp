// jQuery REST Client - v0.0.7 - https://github.com/jpillora/jquery.rest
// Jaime Pillora <dev@jpillora.com> - MIT Copyright 2013
!function(a,b,c,d){"use strict";var e,f,g,h,i,j,k,l,m,n,o,p;k=function(a){throw"ERROR: jquery.rest: "+a},m=function(a){var b;for(b="";a-->0;)b+="  ";return b},j=function(b){return a.btoa||k("You need a polyfill for 'btoa' to use basic auth."),a.btoa(b)},n=function(b){return a.JSON||k("You need a polyfill for 'JSON' to use stringify."),a.JSON.stringify(b)},l=function(a,b){var d;return d=function(){},d.prototype=a,c.extend(!0,new d,b)},o=function(a){return a&&c.isPlainObject(a)?(c.each(a,function(a){return h[a]===d?k("Unknown option: '"+a+"'"):void 0}),null):!1},p=function(a,b){return"string"!==c.type(b)?k("'"+a+"' must be a string"):void 0},i=function(){return alert('"delete()" has been deprecated. Please use "destroy()" or "del()" instead.')},h={url:"",cache:0,request:function(a,b){return c.ajax(b)},cachableMethods:["GET"],methodOverride:!1,stringifyData:!1,stripTrailingSlash:!1,password:null,username:null,verbs:{create:"POST",read:"GET",update:"PUT",destroy:"DELETE"},ajax:{dataType:"json"}},e=function(){function a(a){this.parent=a,this.c={}}return a.prototype.valid=function(a){var b;return b=(new Date).getTime()-a.getTime(),b<=1e3*this.parent.opts.cache},a.prototype.key=function(a){var b,d=this;return b="",c.each(a,function(a,e){return b+=a+"="+(c.isPlainObject(e)?"{"+d.key(e)+"}":e)+"|"}),b},a.prototype.get=function(a){var b;return(b=this.c[a])?this.valid(b.created)?b.data:void 0:void 0},a.prototype.put=function(a,b){return this.c[a]={created:new Date,data:b}},a.prototype.clear=function(a){var b=this;return a?c.each(this.c,function(c){return c.match(a)?delete b.c[c]:void 0}):this.c={}},a}(),g=function(){function a(a,b,d,e){this.name=a,this.method=b,null==d&&(d={}),this.parent=e,p("name",this.name),p("method",this.method),o(d),this.parent[this.name]&&k("Cannot add Verb: '"+a+"' already exists"),this.method=b.toUpperCase(),d.url||(d.url=""),this.opts=l(this.parent.opts,d),this.root=this.parent.root,this.custom=!h.verbs[this.name],this.call=c.proxy(this.call,this),this.call.instance=this}return a.prototype.call=function(){var a,b,c;return c=this.parent.extractUrlData(this.method,arguments),b=c.url,a=c.data,this.custom&&(b+=this.opts.url||this.name),this.parent.ajax.call(this,this.method,b,a)},a.prototype.show=function(a){return console.log(m(a)+this.name+": "+this.method)},a}(),f=function(){function a(b,c,d){null==c&&(c={}),o(c),d&&d instanceof a?(this.name=b,p("name",this.name),this.constructChild(d,c)):(this.url=b||"",p("url",this.url),this.constructRoot(c))}return a.prototype.constructRoot=function(a){return this.opts=l(h,a),this.root=this,this.numParents=0,this.urlNoId=this.url,this.cache=new e(this),this.parent=null,this.name=this.opts.name||"ROOT"},a.prototype.constructChild=function(b,d){return this.parent=b,p("name",this.name),this.parent instanceof a||this.error("Invalid parent"),this.parent[this.name]&&this.error("'"+name+"' already exists"),d.url||(d.url=""),this.opts=l(this.parent.opts,d),this.root=this.parent.root,this.numParents=this.parent.numParents+1,this.urlNoId=this.parent.url+(""+(this.opts.url||this.name)+"/"),this.url=this.urlNoId+(":ID_"+this.numParents+"/"),c.each(this.opts.verbs,c.proxy(this.addVerb,this)),this.destroy?(this.del=this.destroy,this["delete"]=i):void 0},a.prototype.error=function(a){return k("Cannot add Resource: "+a)},a.prototype.add=function(b,c){return this[b]=new a(b,c,this)},a.prototype.addVerb=function(a,b,c){return this[a]=new g(a,b,c,this).call},a.prototype.show=function(b){return null==b&&(b=0),b>25&&k("Plugin Bug! Recursion Fail"),this.name&&console.log(m(b)+this.name+": "+this.url),c.each(this,function(a,d){return"function"===c.type(d)&&d.instance instanceof g&&"del"!==a?d.instance.show(b+1):void 0}),c.each(this,function(c,d){return"parent"!==c&&"root"!==c&&d instanceof a?d.show(b+1):void 0}),null},a.prototype.toString=function(){return this.name},a.prototype.extractUrlData=function(a,b){var d,e,f,g,h,i,j,l,m,n,o,p,q,r,s,t;for(j=[],g=null,n=null,q=0,s=b.length;s>q;q++)d=b[q],o=c.type(d),"string"===o||"number"===o?j.push(d):"object"===o&&null===g?g=d:"object"===o&&null===n?n=d:k("Invalid argument: "+d+" ("+o+")."+" Must be strings or ints (IDs) followed by one optional object and one optional query params object.");for(m=j.length,e="create"!==a,f="update"!==a&&"delete"!==a,p=null,e&&m===this.numParents&&(p=this.url),f&&m===this.numParents-1&&(p=this.urlNoId),null===p&&(f&&(l=this.numParents-1),e&&(l=(l?l+" or ":"")+this.numParents),k("Invalid number of ID arguments, required "+l+", provided "+m)),h=r=0,t=j.length;t>r;h=++r)i=j[h],p=p.replace(new RegExp("/:ID_"+(h+1)+"/"),"/"+i+"/");return n&&(p+="?"+c.param(n)),{url:p,data:g}},a.prototype.ajax=function(a,b,d){var e,f,g,h,i,l,m=this;return a||k("method missing"),b||k("url missing"),g={},this.opts.username&&this.opts.password&&(f=j(this.opts.username+":"+this.opts.password),g.Authorization="Basic "+f),d&&this.opts.stringifyData&&(d=n(d),g["Content-Type"]="application/json"),this.opts.methodOverride&&"GET"!==a&&"HEAD"!==a&&"POST"!==a&&(g["X-HTTP-Method-Override"]=a,a="POST"),this.opts.stripTrailingSlash&&(b=b.replace(/\/$/,"")),e={url:b,type:a,headers:g},d&&(e.data=d),e=c.extend(!0,{},this.opts.ajax,e),l=this.opts.cache&&c.inArray(a,this.opts.cachableMethods)>=0,l&&(h=this.root.cache.key(e),i=this.root.cache.get(h))?i:(i=this.opts.request(this.parent,e),l&&i.done(function(){return m.root.cache.put(h,i)}),i)},a}(),f.defaults=h,c.RestClient=f}(window,document,jQuery);

/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function(c){"function"===typeof define&&define.amd?define(["jquery"],c):"object"===typeof exports?c(require("jquery")):c(jQuery)})(function(c){function p(a){a=e.json?JSON.stringify(a):String(a);return e.raw?a:encodeURIComponent(a)}function n(a,g){var b;if(e.raw)b=a;else a:{var d=a;0===d.indexOf('"')&&(d=d.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{d=decodeURIComponent(d.replace(l," "));b=e.json?JSON.parse(d):d;break a}catch(h){}b=void 0}return c.isFunction(g)?g(b):b}var l=/\+/g,e=
    c.cookie=function(a,g,b){if(1<arguments.length&&!c.isFunction(g)){b=c.extend({},e.defaults,b);if("number"===typeof b.expires){var d=b.expires,h=b.expires=new Date;h.setTime(+h+864E5*d)}return document.cookie=[e.raw?a:encodeURIComponent(a),"=",p(g),b.expires?"; expires="+b.expires.toUTCString():"",b.path?"; path="+b.path:"",b.domain?"; domain="+b.domain:"",b.secure?"; secure":""].join("")}for(var d=a?void 0:{},h=document.cookie?document.cookie.split("; "):[],m=0,l=h.length;m<l;m++){var f=h[m].split("="),
        k;k=f.shift();k=e.raw?k:decodeURIComponent(k);f=f.join("=");if(a&&a===k){d=n(f,g);break}a||void 0===(f=n(f))||(d[k]=f)}return d};e.defaults={};c.removeCookie=function(a,e){if(void 0===c.cookie(a))return!1;c.cookie(a,"",c.extend({},e,{expires:-1}));return!c.cookie(a)}});


$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


//GROWISH API HANDLER
var growishApi = (function () {

    //GLOBAL VARS
    var client;
    var request;
    var token = $.cookie('api-token');
    var uid = $.cookie('api-id');
    var appKey;
    var errorClassContainer = [];
    var errorCallback;
    var actualForm;
    var listId;
    var productId;

    return {

        uploadImage: function(options) {

            var data = new FormData();

            errorCallback = options.errorCallback;

            $.each(options.file, function(key, value)
            {
                data.append(key, value);
            });

            actualForm = options.formName;
            this.errorCleaner();

            var url = growishApi.getClient().url + 'list/' + options.lId + '/product/' + options.pId + '/image/';

            if(options.formData !== undefined)
            {
                $.each(options.formData, function(key, value)
                {
                    data.append(key, value);
                });

                url = growishApi.getClient().url + 'list/' + options.lId + '/product/';
            }


            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                headers: { 'X-App-Key': appKey, 'X-Auth-Token': token },
                cache: false,
                dataType: 'json',
                processData: false,
                contentType: false,
                success: function(data, textStatus, jqXHR)
                {
                    if(typeof data.error === 'undefined')
                    {
                        options.callback(data.data);
                        return true;
                    }
                    else
                    {
                        options.errorCallback();
                    }
                },
                headers: growishApi.getClient().opts.ajax.headers,
                error: growishApi.getClient().opts.ajax.error,
                xhr: function() {
                    var myXhr = $.ajaxSettings.xhr();
                    if(myXhr.upload){
                        myXhr.upload.addEventListener('progress',options.progressHandling, false);
                    }
                    return myXhr;
                },
            });


        },

        activateList: function(options) {

            errorCallback = options.errorCallback;
            actualForm = options.formName;

            rawData = this.formToJson(options.formName);

            var data = {
                type: rawData.type,
                slug: rawData.slug,
                cellphone: rawData.cellphone,
                state: 300
            };

            client.list.update(listId, data).done(function() {
                options.callback();
            });
        },

        saveProductImage: function(options) {

            opt = {
                lId: options.listId,
                pId: options.productId,
                file: options.file,
                formName: options.formName,
                progressHandling: options.progressHandling,
                callback: options.callback,
                errorCallback: options.errorCallback
            };

            this.uploadImage(opt);
        },

        load: function(apiOptions) {

            appKey = apiOptions.appKey;

            $.cookie({
                path: '/'
            });

            var ajaxOptions = {
                ajax: {
                    error:
                        function(jqXHR, textStatus, errorThrown) {

                            if (typeof errorCallback !== "undefined") {
                                if(errorCallback())
                                    return true;
                            }

                            var body = $.parseJSON(jqXHR.responseText);

                            switch (jqXHR.status) {

                                case 401:
                                    sweetAlert("Sessione scaduta", body.message, "error");
                                    swal({
                                        title: "Sessione scaduta",
                                        type: "error",
                                    }, function(){
                                        growishApi.logout();
                                        switchPage('login');
                                    });
                                    break;
                                case 403:
                                    swal("Opss...", body.message)
                                    break;
                                case (400):
                                    $.each( body.message, function( gKey, gValue ) {
                                        $.each( gValue, function( key, value ) {
                                            if(actualForm != '') {
                                                $('form[name="' + actualForm + '"] .form-error[data-field="' + gKey + '"]').text(value);
                                                errorClassContainer.push(gKey);
                                            }
                                        });
                                    });
                                    break;
                                default:
                                    console.log('???');
                            }

                        },
                    headers: { 'X-App-Key': appKey, 'X-Auth-Token': token }
                }
            }

            client = new $.RestClient(apiOptions.url, ajaxOptions);

            client.add('status');
            client.add('auth');
            client.add('user');
            client.add('card_contribution');
            client.add('withdrawal_contribution');
            client.add('wallet');
            client.add('withdrawal');
            client.add('fee');
            client.add('list');
            client.add('statement');
            client.add('beneficiary');
            client.list.add('product');
            client.list.product.add('image');

        },

        getUser: function(options) {
            errorCallback = options.errorCallback;
            client.user.read(options.id).done(function(data) {
                options.callback(data.data);
            });
        },

        errorCleaner: function() {
            if(typeof errorClassContainer !== 'undefined'){
                $.each( errorClassContainer, function( x,y ) {
                    $('.form-error[data-field="' + y + '"]').text('');
                });
                errorClassContainer.length = 0;
            }
        },

        formToJson: function(formName) {
            return $("form[name='" + formName + "']").serializeObject();
        },

        getAppKey: function() {
            return appKey;
        },

        getToken: function() {
            return token;
        },

        getUid: function() {
            return uid;
        },

        headerUpdate: function() {
            client["opts"]["ajax"]["headers"]["X-Auth-Token"] = token;
            return true;
        },

        logout: function(c) {
            $.removeCookie('api-token', { path: '/' });
            $.removeCookie('api-id', { path: '/' });
            console.log('Logging out!');
            if(token !== '') {
                errorCallback = c();
                client.auth.destroy().done( function(data)
                {
                    c();
                });
            } else
                return false;
        },

        login: function(email, password, c, eC) {
            this.errorCleaner();
            errorCallback = eC;
            client.auth.create({email:email,password:password})
                .done( function(data)
                {
                    $.cookie('api-token', data.data.token, { path: '/'});
                    $.cookie('api-id', data.data.id, { path: '/'});
                    token = data.data.token;
                    uid = data.data.id;
                    growishApi.headerUpdate();
                    c(data.data.list[0]);
                });
        },

        formLogin: function(options) {
            data = this.formToJson(options.formName);
            actualForm = options.formName;
            this.login(data.email, data.password, options.callback, options.errorCallback);
        },

        createList: function(options) {
            var data = this.formToJson(options.formName);

            tmp = data.wedding_date_submit.split('/');
            data_formated_wedding = tmp[2] + '-' + tmp[1] + '-' + tmp[0];

            list = {
                brideName: data.bride_name,
                groomName: data.groom_name,
                weddingDate: data_formated_wedding,
                province: data.province
            };

            client.list.create(list).done( function(response)
            {
                options.callback(response.data.id);
            });
        },

        deleteProduct: function(options) {
            client.list.product.destroy(options.listId, options.productId).done(function() {
                options.callback();
            });
        },

        getProduct: function(options) {
            client.list.product.read(options.listId, options.productId).done(function(data) {
                productId = data.data.id;
                options.callback(data.data);
            });
        },

        _withdrawalProccess: function(data) {
            client.withdrawal.create(data.request).done(function(result) {
                data.callback(result);
            });
        },

        createWithdrawal: function(options) {
            var data = this.formToJson(options.formName);
            actualForm = options.formName;
            errorCallback = options.errorCallback;
            this.errorCleaner();

            data.amount = data.amount * 100;

            if(data.beneficiaryId === undefined || data.beneficiaryId == '') {
                client.beneficiary.create(data).done(function(result) {
                    growishApi._withdrawalProccess({
                        request: {
                            walletId: options.walletId,
                            beneficiaryId: result.data.id,
                            amount: data.amount
                        },
                        callback: options.callback
                    });
                });
            } else {
                growishApi._withdrawalProccess({
                    request: {
                        walletId: options.walletId,
                        beneficiaryId: data.beneficiaryId,
                        amount: data.amount
                    },
                    callback: options.callback
                });
            }




        },

        createProduct: function(options) {

            var data = this.formToJson(options.formName);
            var adderMode = options.adderMode;

            if(data.goalAmount !== undefined)
                data.goalAmount = data.goalAmount * 100;
            if(data.quoteAmount !== undefined)
                data.quoteAmount = data.quoteAmount * 100;

            actualForm = options.formName;
            this.errorCleaner();

            if(options.file === undefined || options.file == '') {
                errorCallback = options.errorCallback;

                if(adderMode !== undefined && adderMode === true)
                    client.list.product.create(listId, data).done(function(data) {
                        options.callback(data.data);
                    });
                else
                    client.list.product.update(options.listId, options.productId, data).done(function(data) {
                        options.callback(data);
                    });

            } else {
                if(adderMode !== undefined && adderMode === true)
                    growishApi.uploadImage({
                        formName: options.formName,
                        formData: data,
                        file: options.file,
                        lId: listId,
                        progressHandling: options.progressHandling,
                        callback: options.callback,
                        errorCallback: options.errorCallback
                    });
                else
                    client.list.product.update(options.listId, options.productId, data).done(function(data) {
                        growishApi.saveProductImage(options);
                    });

            }
        },

        createCardContribution: function(options) {
            client.card_contribution.create(options.request).done(function(data){
                options.callback(data.data);
            });
        },

        createWithdrawalContribution: function(options) {
            client.withdrawal_contribution.create(options.request).done(function(data){
                options.callback(data.data);
            });
        },

        getBeneficiaries: function(options) {
            client.beneficiary.read().done(function(data) {

                var uniqueBeneficiary = [];
                var output = [];
                $.each(data.data, function(i, v) {
                    if($.inArray(v.bankAccountIBAN, uniqueBeneficiary) == -1)
                    {
                        uniqueBeneficiary.push(v.bankAccountIBAN);
                        output.push(v);
                    }

                });

                options.callback(output);
            });
        },

        getFee: function(options) {
           client.fee.create(options.request).done(function(data){
               options.callback(data.data);
           });
        },

        getStatement: function(options) {

            client.statement.read(options.listId).done(function(data) {
                options.callback(data.data);
            });

        },

        formRegistration: function(options) {
            this.errorCleaner();
            errorCallback = options.errorCallback;
            var data = this.formToJson(options.formName);
            actualForm = options.formName;

            tmp = data.birthday_submit.split('/');
            data_formated_birthday = tmp[2] + '-' + tmp[1] + '-' + tmp[0];

            if(data.can_be_contacted == 'undefined')
                return false;

            user = {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                birthday: data_formated_birthday,
                canBeContacted: 1
            };

            client.user.create(user).done(function(response) {
                $.cookie('api-token', response.data.token);
                $.cookie('api-id', response.data.id);
                token = response.data.token;
                uid = response.data.id;
                growishApi.headerUpdate();
                return data;
            });

        },

        isUser: function() {
            if(token != undefined && uid.length != undefined) {
                console.log('TOKEN:' + token);
                console.log('UID:' + uid);
                return true;
            } else
                return false;
        },

        createUserList: function(options) {
            this.errorCleaner();
            errorCallback = options.errorCallback;
            var data = this.formToJson(options.formName);
            actualForm = options.formName;

            tmp = data.birthday_submit.split('/');
            data_formated_birthday = tmp[2] + '-' + tmp[1] + '-' + tmp[0];
            tmp = data.wedding_date_submit.split('/');
            data_formated_wedding = tmp[2] + '-' + tmp[1] + '-' + tmp[0];

            if(data.can_be_contacted == 'undefined')
                return false;

            user = {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                birthday: data_formated_birthday,
                canBeContacted: 1
            };

            client.user.create(user).done( function(response)
            {
                $.cookie('api-token', response.data.token);
                $.cookie('api-id', response.data.id);
                token = response.data.token;
                uid = response.data.id;

                list = {
                    brideName: data.bride_name,
                    groomName: data.groom_name,
                    weddingDate: data_formated_wedding,
                    province: data.province
                };

                growishApi.headerUpdate();

                client.list.create(list).done( function(response)
                {
                    options.callback(response.data.id)
                });

            });
        },

        getList: function(options) {
            client.list.read(options.id).done(function(data) {
                listId = data.data.id;
                options.callback(data.data);
            });
        },

        getClient: function() {
            return client;
        },

        getListId: function() {
            return listId;
        },

        getProductId: function() {
            return productId;
        },

        parseData: function( form ) {
            return JSON.stringify($('#' + form).serializeArray());
        }

    }
}());