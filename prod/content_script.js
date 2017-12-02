var url = document.URL
var SEARCHME = "jira.logicmonitor.com/browse/";
var indexOfString = url.indexOf(SEARCHME);
    if (indexOfString > 0) {
         // get the ticket number
         var ticketNumber = url.substring(indexOfString+ SEARCHME.length)
         var issueid = $("a#key-val").attr("rel")
         
         $.get("https://jira.logicmonitor.com/rest/dev-status/1.0/issue/summary?issueId="+issueid+"&_=" + new Date().getTime(), 
          function(data, status) {
              
              var pr= data.summary.pullrequest.overall;

              var total = pr.count
              var stateString = pr.state
              var stateCount = pr.stateCount

              // when the pull request is open and state count > 0
              if (stateString == "OPEN" && stateCount > 0) {

                $("div.toolbar-split.toolbar-split-left").append("<div><label style='color:red;font-size:200%'>you have some pullrequests not merged</label></div>")
              }
              
          });

    }
    else {
      console.log("not our ticket url - " + url)
    }  

