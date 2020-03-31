function searchFunction() {
    let input = document.getElementById('myinput')
    let filter = input.value.toUpperCase();
    let allMovies = document.getElementById('allMovies')
    let oneMovie = allMovies.getElementsByTagName('a')

    for (let i = 0; i < oneMovie.length; i++) {
        let titleMovie = oneMovie[i].getElementsByClassName('title')[0]
        if (titleMovie.innerHTML.toUpperCase().indexOf(filter) > -1) {
            oneMovie[i].style.display = ""
        }
        else {
            oneMovie[i].style.display = 'none'
        }
    }
}