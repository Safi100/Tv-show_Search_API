var search_result_container = document.querySelector(".search_result")
const search_input = document.querySelector(".search")

search_input.addEventListener('input', ()=>{
    console.log(search_input.value)
    fetch(`https://api.tvmaze.com/search/shows?q=${search_input.value}`)
    .then(response => response.json())
    .then(result =>{
        search_result_container.innerHTML="" // For new filter after call api
        console.log(result)
        const movies = result;
        movies.forEach(movie => {
            let date=movie.show.premiered
            let premiered=""
            for(let i=0;i<4;i++){ premiered+=date[i] }
            const title = (movie.show.summary=="") ? "This movie has no title" :  movie.show.summary
            const img = (movie.show.image==null) ?  "images/no_img.webp" : movie.show.image.original
            const display_movie = `
                <img class="img_result" src="${img}" alt="${movie.show.name} img">
                <h3 class="name_result">${movie.show.name}   (${premiered})</h3>
            `
            const movie_div = document.createElement('div')
            movie_div.classList.add("movie_result")
            movie_div.innerHTML = display_movie
            search_result_container.appendChild(movie_div)

            movie_div.addEventListener('click',()=>{
                search_input.value=""
                search_result_container.innerHTML=""
                const displayMovieInfo=`
                <div class="movie_img"><img class="img" src="${img}" alt="${movie.show.name}"></div>
                <div class="movie_info">
                    <h2 class="movie_name">${movie.show.name}</h2>
                    <div class="movie_title">${title}</div>
                    <p class="movie_genres"><b>Genres</b> : ${movie.show.genres.join(" | ")}</p>
                    <p class="movie_premiered"><b>premiered</b> :  ${movie.show.premiered}</p>
                </div>
                `
                document.querySelector('.movie_container').innerHTML = displayMovieInfo
                console.log(movie)
            })
        });
    })
    .catch(err => console.log(err))
})