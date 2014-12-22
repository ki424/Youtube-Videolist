$(document).ready(function() {
    $(".menu-list").hide();
    $(".under").hide();

    $.getJSON("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=UUQvTDmHza8erxZqDkjQ4bQQ&key=AIzaSyDm4ef2FPkjWE2iFFWS7bNFNk6UWd4pNFM", function(data) {
        for (var i = 0; i < data.items.length; i++) {
            $(".video-list").append('<li class="video-item"><a href="https://www.youtube.com/watch?v=' + data.items[i].snippet.resourceId.videoId + '"><div class="video-img"><img class="logo" src="' + data.items[i].snippet.thumbnails.default.url + '"></div><span class="descr">' + data.items[i].snippet.title + '</span></a></li>');
        }

        $("body").delegate('.video-item', 'click', function() {
            var descr = $(this).text();

            $.getJSON("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=UUQvTDmHza8erxZqDkjQ4bQQ&key=AIzaSyDm4ef2FPkjWE2iFFWS7bNFNk6UWd4pNFM", function(data) {
                for (var i = 0; i < data.items.length; i++) {
                    if (descr == data.items[i].snippet.title) {
                        //$(".reveal").append('<div class="flex-video"><iframe width="420" height="315" src="//www.youtube.com/embed/' + data.items[i].snippet.resourceId.videoId + '" frameborder="0" allowfullscreen></iframe></div>')
                    }
                }
            });
        });

        $("#add").click(function() {


            $(".video-list").empty();
            channel = $('#channel').val();
            //https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=rocketbeanstv&key=AIzaSyDm4ef2FPkjWE2iFFWS7bNFNk6UWd4pNFM
            $.getJSON("https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=" + channel + "&key=AIzaSyDm4ef2FPkjWE2iFFWS7bNFNk6UWd4pNFM", function(data) {

                if (data.items.length <= 0) {
                    alert("Error!");
                    for (var i = 0; i < localStorage.length; i++) {
                        alert(localStorage.key(i));
                        alert(localStorage[localStorage.key(i)]);
                    }
                } else {

                    id = data.items[0].contentDetails.relatedPlaylists.uploads;
                    localStorage[channel] = id;

                    $.getJSON("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=" + id + "&key=AIzaSyDm4ef2FPkjWE2iFFWS7bNFNk6UWd4pNFM", function(data) {
                        for (var i = 0; i < data.items.length; i++) {

                            $(".video-list").append('<li class="video-item"><div class="video-img"><img class="logo" src="' + data.items[i].snippet.thumbnails.default.url + '"></div><span class="descr">' + data.items[i].snippet.title + '</span></li>');
                        }
                    });
                }
            });
        });

        $('.menu').click(function() {
            $(".under").slideUp();
            $('.menu-list').slideToggle();
        });

        $('.add-menu').click(function() {
            $('#adding').slideToggle();
            $('#deleting').slideUp();
        });

        $('.delete-menu').click(function() {
            $('#deleting').slideToggle();
            $('#adding').slideUp();
        });


    });
});