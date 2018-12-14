var mod_pagespeed_ZHsCqIKt30 = "(function(t){\"use strict\";function i(t,i){var s,n=0,e=t.length;for(n;e>n&&(s=i(t[n],n),s!==!1);n++);}function s(t){return\"[object Array]\"===Object.prototype.toString.apply(t)}function n(t){return\"function\"==typeof t}function e(t){this.options=t,!t.deferSetup&&this.setup()}function o(t,i){this.query=t,this.isUnconditional=i,this.handlers=[],this.mql=h(t);var s=this;this.listener=function(t){s.mql=t,s.assess()},this.mql.addListener(this.listener)}function r(){if(!h)throw Error(\"matchMedia not present, legacy browsers require a polyfill\");this.queries={},this.browserIsIncapable=!h(\"only all\").matches}var h=t.matchMedia;e.prototype={setup:function(){this.options.setup&&this.options.setup(),this.initialised=!0},on:function(){!this.initialised&&this.setup(),this.options.match&&this.options.match()},off:function(){this.options.unmatch&&this.options.unmatch()},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(t){return this.options===t||this.options.match===t}},o.prototype={addHandler:function(t){var i=new e(t);this.handlers.push(i),this.matches()&&i.on()},removeHandler:function(t){var s=this.handlers;i(s,function(i,n){return i.equals(t)?(i.destroy(),!s.splice(n,1)):void 0})},matches:function(){return this.mql.matches||this.isUnconditional},clear:function(){i(this.handlers,function(t){t.destroy()}),this.mql.removeListener(this.listener),this.handlers.length=0},assess:function(){var t=this.matches()?\"on\":\"off\";i(this.handlers,function(i){i[t]()})}},r.prototype={register:function(t,e,r){var h=this.queries,a=r&&this.browserIsIncapable;return h[t]||(h[t]=new o(t,a)),n(e)&&(e={match:e}),s(e)||(e=[e]),i(e,function(i){h[t].addHandler(i)}),this},unregister:function(t,i){var s=this.queries[t];return s&&(i?s.removeHandler(i):(s.clear(),delete this.queries[t])),this}},t.enquire=t.enquire||new r})(this);";
var mod_pagespeed_EcblZZujcS = "(function($,Drupal,undefined){Drupal.behaviors.energyAdminUsersOnline={attach:function(context,settings){if($('#block-user-online').length){$('#block-user-online h4').click(function(){$(this).parent().toggleClass('opened');});}}};})(jQuery,Drupal,undefined);;;(function($){function energyEventTracking(){var extensions='7z|aac|arc|arj|asf|asx|avi|bin|csv|doc|exe|flv|gif|gz|gzip|hqx|jar|jpe?g|js|mp(2|3|4|e?g)|mov(ie)?|msi|msp|pdf|phps|png|ppt|qtm?|ra(m|r)?|sea|sit|tar|tgz|torrent|txt|wav|wma|wmv|wpd|xls|xml|z|zip';$(document.body).click(function(event){$(event.target).closest(\"a,area\").each(function(){var isInternal=new RegExp(\"^(https?):\\/\\/\"+window.location.host,\"i\");var isDownload=new RegExp(\"\\\\.(\"+extensions+\")$\",\"i\");var accts=Drupal.settings.drupal_ga_accounts;var alphabet='abcdefghijklmnopqrstuvwxyz';if(isInternal.test(this.href)){if(isDownload.test(this.href)){var extension=isDownload.exec(this.href);for(var i=0;i<accts.length;i++){var inlabel=\"\";if(i>0)inlabel=alphabet.charAt(i)+\".\";var acct=inlabel+\"_setAccount\";var track=inlabel+\"_trackEvent\";_gaq.push([acct,accts[i]],[track,\"Downloads\",extension[1].toUpperCase(),this.href.replace(isInternal,'')]);}}}else{if($(this).is(\"a[href^=mailto:],area[href^=mailto:]\")){for(var i=0;i<accts.length;i++){var inlabel=\"\";if(i>0)inlabel=alphabet.charAt(i)+\".\";var acct=inlabel+\"_setAccount\";var track=inlabel+\"_trackEvent\";_gaq.push([acct,accts[i]],[track,\"Mails\",\"Click\",this.href.substring(7)]);}}}});});}Drupal.behaviors.energyEventTracking={attach:energyEventTracking};})(jQuery);;;(function($){function energyRelatedDownloadTracking(){$(document.body).click(function(event){$(event.target).closest(\"#block-apachesolr-search-download-more-downloads a,area\").each(function(){var isInternal=new RegExp(\"^(https?):\\/\\/\"+window.location.host,\"i\");var isDownload=new RegExp(\"/downloads/\",\"i\");var accts=Drupal.settings.drupal_ga_accounts;var alphabet='abcdefghijklmnopqrstuvwxyz';if(isInternal.test(this.href)){if(isDownload.test(this.href)){for(var i=0;i<accts.length;i++){var inlabel=\"\";if(i>0)inlabel=alphabet.charAt(i)+\".\";var acct=inlabel+\"_setAccount\";var track=inlabel+\"_trackEvent\";_gaq.push([acct,accts[i]],[track,\"Related\",\"Downloads\",this.href.replace(isInternal,'')]);}}}});});}Drupal.behaviors.energyRelatedDownloadTracking={attach:energyRelatedDownloadTracking};})(jQuery);(function($){function energyRelatedArticleTracking(){$(document.body).click(function(event){$(event.target).closest(\"#block-apachesolr-search-article-related-articles a,area\").each(function(){var isInternal=new RegExp(\"^(https?):\\/\\/\"+window.location.host,\"i\");var isArticle=new RegExp(\"/articles/\",\"i\");var accts=Drupal.settings.drupal_ga_accounts;var alphabet='abcdefghijklmnopqrstuvwxyz';if(isInternal.test(this.href)){if(isArticle.test(this.href)){for(var i=0;i<accts.length;i++){var inlabel=\"\";if(i>0)inlabel=alphabet.charAt(i)+\".\";var acct=inlabel+\"_setAccount\";var track=inlabel+\"_trackEvent\";_gaq.push([acct,accts[i]],[track,\"Related\",\"Articles\",this.href.replace(isInternal,'')]);}}}});});}Drupal.behaviors.energyRelatedArticleTracking={attach:energyRelatedArticleTracking};})(jQuery);;;(function($){function energyBreadcrumbTracking(){$(document.body).click(function(event){$(event.target).closest(\".breadcrumb a,area\").each(function(){var isInternal=new RegExp(\"^(https?):\\/\\/\"+window.location.host,\"i\");var accts=Drupal.settings.drupal_ga_accounts;var alphabet='abcdefghijklmnopqrstuvwxyz';if(isInternal.test(this.href)){var pageTitle=Drupal.settings.energyCore.pageTitle;for(var i=0;i<accts.length;i++){var inlabel=\"\";if(i>0)inlabel=alphabet.charAt(i)+\".\";var acct=inlabel+\"_setAccount\";var track=inlabel+\"_trackEvent\";_gaq.push([acct,accts[i]],[track,\"Breadcrumb\",pageTitle,this.href.replace(isInternal,'')]);}}});});}Drupal.behaviors.energyBreadcrumbTracking={attach:energyBreadcrumbTracking};})(jQuery);;;(function($){function energyContextCallOutTracking(){var accts=Drupal.settings.drupal_ga_accounts;var alphabet='abcdefghijklmnopqrstuvwxyz';var isInternal=new RegExp(\"^(https?):\\/\\/\"+window.location.host,\"i\");$('.field-name-field-article-callout-text a').click(function(){for(var i=0;i<accts.length;i++){var inlabel=\"\";if(i>0)inlabel=alphabet.charAt(i)+\".\";var acct=inlabel+\"_setAccount\";var track=inlabel+\"_trackEvent\";var link_path=this.href.replace(isInternal,'');var page_path=document.URL.replace(isInternal,'');_gaq.push([acct,accts[i]],[track,\"CallOut\",link_path,page_path]);}});}Drupal.behaviors.energyContextCallOutTracking={attach:energyContextCallOutTracking};})(jQuery);;;";