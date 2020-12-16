

 //const dbFire = firebase.firestore();
loadNews();
function loadNews(){
    $(".grid-news-loads").html("");
    $(".grid-mp-news-main").html("");
    window.lm.start("news");
    let counterNews = 0;
    dbFire.collection("news").orderBy('date', 'desc').get().then(function(querySnapshot) {
        let newsSize = querySnapshot.size;
        querySnapshot.forEach(function(doc) {
            var storage = firebase.storage();
            //var gsReference = storage.refFromURL(news.picture.path);
            const publishText = {
                'ru': 'Дата публикации: ',
                'en': 'Public date: ',
                'tj': 'Санаи нашр: ',
            };
            let news = doc.data();
            
            console.debug(news);
            if(news['title_' + currentLocale].length > 0){
                counterNews++;
                const date = news['date'].toDate();
                const dateStr = publishText[currentLocale] + date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear();
    
                const newsData = `<article class="list-group">
                <a href="news-article.html"> <div class="card-img-wrapper"> <img src="`+ news.picture +`" alt="Sample photo"></div>
                    <div class="card-news-title"> <em>`+ dateStr +`</em> <span>`+ news['title_'+ currentLocale] +`</span> </div>
                </a>
                </article>`;
                $(".grid-news-loads").append(newsData);
                if(counterNews <= 6){
                    $(".grid-mp-news-main").append(newsData);
                }
            }
            newsSize--;
            if(newsSize < 1){
                window.lm.finish("news");
            }
        });
    });
}

