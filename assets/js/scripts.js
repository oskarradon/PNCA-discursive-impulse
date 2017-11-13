$(function(){

  // This function allows the hamburger menu to toggle the nav on mobile view widths

  // Currrently does not check on window resize event, change this!!

  if (window.innerWidth <= 800) {
    $('.header__menu-icon').click(() => {
      $('.nav').slideToggle('slow');
    });
  }

  // This function bumps the footer over if a scrollbar is showing so the footer is always in the same place on every page

  function checkScrollBars() {
      var b = $('body');
      var normalw = 0;
      var scrollw = 0;
      if (!($("body").height() > $(window).height())) {
        $('footer').css({right:'62.12px'});
      }
  }

  checkScrollBars();


  // This function will allow the "Load more" button on the index to fetch more posts using the Ghost public API. Code is from: https://www.ghostforbeginners.com/load-posts-dynamically-using-ghosts-api/ (comments are the authors)


  //This is set to 2 since the posts already loaded should be page 1
    nextPage = 1;
    //Set this to match the pagination used in your blog
    pagination = 2;

    //on button click
    $('#load-posts').click(function() {
        $.ajax({
            //go grab the pagination number of posts on the next page and include the tags
            url: ghost.url.api("posts") + '&include=tags&limit=' + pagination + '&page=' + nextPage,
            type: 'get'
        }).done(function(data) {
            //for each post returned
            $.each(data.posts, function(i, post) {
                //Take the author of the post, and now go get that data to fill in
                $.ajax({
                    url: ghost.url.api("users") + '&filter=id:' + post.author,
                    type: 'get'
                }).done(function(data) {
                    $.each(data.users, function(i, users) {
                        //Now that we have the author and post data, send that to the insertPost function
                        insertPost(post, users);

                        //testing
                        console.log (post);
                        console.log(users);
                    });
                });
            });
        }).done(function(data) {
            //If you are on the last post, hide the load more button
            if (nextPage == data.meta.pagination.total) {
                $('#load-posts').hide();
            }
        }).fail(function(err) {
            console.log(err);
        });
    })

    function insertPost(postData, authorData) {
      console.log('here');
        //start the inserting of the html
        var postInfo =
          '<article class="post">\
              <section class="post__header">\
                <a href="' + postData.url + '"> \
                  <h2 class="post-title">' + postData.title + '</h2> \
                </a> \
              </section>';
        //if no author image, dont include it
        if (postData.feature_image != null) {
            postInfo +=
              '<a href="' + postData.url + '"> \
                <div class="post__img" \
                style="background-image:url(' + postData.feature_image + ');" \
                title="Image associated with the post entitled' + postData.title + '"></div> \
              </a>'
        } else {
          postInfo +=
            '<a href="' + postData.url + '">\
            <img src="/assets/images/placeholder-img.png" alt="There is no featured image for this post"></a>'
        }

        postInfo += '</article>'


        //Append the html to the content of the blog
        $('.feed').append(postInfo);
        //incriment next page so it will get the next page of posts if hit again.
        nextPage += 1;
    }

});
