
// ==UserScript==
// @name         fl-internal
// @namespace    http://tampermonkey.net/
// @run-at document-idle
// @version      0.1
// @description  try to take over the world!
// @author       You
// @require     http://libs.baidu.com/jquery/2.0.0/jquery.min.js
// @require     https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js
// @require     https://cdn.staticfile.org/jquery/1.12.4/jquery.min.js
// @match        https://freshlime.atlassian.net/browse/*
// @icon         https://www.google.com/s2/favicons?domain=atlassian.net
// @grant        none
// ==/UserScript==
(function() {
    // your code here
    var url = window.location
    var SEARCHME = "browse";
    var indexOfString = url.pathname.indexOf(SEARCHME);
    console.log("current url " + url)
    if (indexOfString > 0) {

        // https://freshlime.atlassian.net/rest/api/2/issue/FLC-4118?fields=summary&_r=1627372951843
        var ticketNum = url.pathname.substr(url.pathname.lastIndexOf("/") + 1)
        console.log("ticknum" + ticketNum)
        $.get("https://freshlime.atlassian.net/rest/api/2/issue/" +ticketNum+"?fields=summary&_r=" + new Date().getTime(),
            function(data, status) {

                var l= data.id
                console.log("final req" + l)
                $.get("https://freshlime.atlassian.net/rest/api/2/issue/" + l, function (data, status) {
                    var t = data.fields.issuetype.name

                    // when the pull request is open and state count > 0
                    if (t == "Story"  || t == "Bug") {
                        $("#jira-issue-header").append("<div><label style='color:red;font-size:200%'>❇️❇️❇️❇️❇️ You can create branchs here</label></div>")
                    } else {
                        $("#jira-issue-header").append("<div><label style='color:red;font-size:200%'>🚫🚫🚫🚫🚫 NOT create branchs here</label></div>")
                    }
                })
            });
    } else {
        console.log("not a cared url")
    }
}
)()
