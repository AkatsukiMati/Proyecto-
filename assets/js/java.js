$(document).ready(function() {
    $("#myForm").on("submit", function(event) {
        event.preventDefault();
        
     
        $("#errorMessages").empty();

     
        let errors = [];
        

        let username = $("#username").val().trim();
        if (username === "") {
            errors.push("El nombre de usuario es obligatorio.");
        }

        
        let email = $("#email").val().trim();
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "") {
            errors.push("El correo electrónico es obligatorio.");
        } else if (!emailRegex.test(email)) {
            errors.push("El correo electrónico no es válido.");
        }

        
        let password = $("#password").val().trim();
        if (password === "") {
            errors.push("La contraseña es obligatoria.");
        }

    
        if (errors.length > 0) {
            errors.forEach(function(error) {
                $("#errorMessages").append("<p>" + error + "</p>");
            });
        } else {
           
            alert("Formulario enviado correctamente");
           
        }
    });
});
