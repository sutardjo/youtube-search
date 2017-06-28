// var YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

// // --------- State Modifications ---------//

// function getDataFromApi(searchTerm, callback) {
//   var query = {
//     part: 'snippet',
//     key: 'AIzaSyBZImbnAI_RYNaCPOEhK0GZFhUVxH5nExI',
//     q: searchTerm,
//   }
//   $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
// }




// // --------- Render Functions --------- //

// // var RESULT_HTML_TEMPLATE = (
// //   '<div>' +
// //     '<h2>' +
// //     '<a class="js-result-name" href="" target="_blank"></a> by <a class="js-user-name" href="" target="_blank"></a></h2>' +
// //     '<p>Number of watchers: <span class="js-watchers-count"></span></p>' + 
// //     '<p>Number of open issues: <span class="js-issues-count"></span></p>' +
// //   '</div>'
// // );

// var RESULT_HTML_TEMPLATE = (
//         '<div>' +
//         '<img src="' + thumbnailURL + '" height="360" width="480">' +
//       '</div>'
//   );

// function renderResult(result) {
//   var template = $(RESULT_HTML_TEMPLATE);
//   template.find(".js-result-name").text(result.name).attr("href", result.html_url);
//   template.find(".js-user-name").text(result.owner.login).attr("href", result.owner.html_url);
//   template.find(".js-watchers-count").text(result.watchers_count);
//   template.find(".js-issues-count").text(result.open_issues);
//   return template;
// }

// function displayYouTubeSearchData(data) {
//   var results = data.items.map(function(item, index) {
//     return renderResult(item);
//   });
//   $('.js-search-results').html(results);
// }

// ---------- Data Modifications --------- //

function searchYoutube(query) {
  var youtubeSearchURL = 'https://www.googleapis.com/youtube/v3/search';
  $.getJSON (youtubeSearchURL, {
      key: 'AIzaSyBZImbnAI_RYNaCPOEhK0GZFhUVxH5nExI',
      part: 'snippet',
      q: query
  }, function(data) {
    extractThumbnailURL(data);
  })
}

function extractThumbnailURL(data) {
  var numberOfItems = data.items.length;
  console.log("Items returned: " + numberOfItems);
  var thumbnailURLS = [];
  var videoIds = [];
  for (var i = 0; i < numberOfItems; i++) {
     thumbnailURLS.push(data.items[i].snippet.thumbnails.high.url);
     videoIds.push(data.items[i].id.videoId);
  }
  console.log(thumbnailURLS);
  console.log(videoIds);
  renderResults(thumbnailURLS, videoIds);
}


// ---------- Render --------- //

// Template for results
function renderResults(thumbnailURLS, videoIds) {
  for (var i = 0; i < thumbnailURLS.length; i++) {
      $('.js-search-results').append(
        '<div>' +
        '<a href="https://www.youtube.com/watch?v=' + videoIds[i] + '">' + 
        '<img src="' + thumbnailURLS[i] + '" height="360" width="480">' +
        '</a>' +
        '</div>'
    )
  }
}

// ---------- Event Listeners --------- //

function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    var queryTarget = $(event.currentTarget).find('.js-query');
    var query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    // getDataFromApi(query, displayYouTubeSearchData);
    console.log(query + '!');
    searchYoutube(query);
  });
}

$(watchSubmit);
