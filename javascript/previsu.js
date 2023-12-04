document.getElementById('imagen').addEventListener('change', function () {
    var input = this;

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var preview = document.getElementById('previsualizacion');
            preview.innerHTML = '<img src="' + e.target.result + '" alt="Previsualización">';
        };

        reader.readAsDataURL(input.files[0]);
    }
});
