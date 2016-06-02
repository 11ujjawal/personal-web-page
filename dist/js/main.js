
$('#me #close').on('click', function() {
    var hash = window.location.hash;
    if (hash === '#default') {
        this.setAttribute('href', '../../index.html');
    }
});
