function register() {
    var xhr = new XMLHttpRequest();
    var url = "/users/api/register";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json);
            alert(json.reason);
            window.location.href = "/users/login";
        } else {
            document.getElementById('error').innerHTML = "Invalid input";
        }
    };
    var username = document.getElementById('txtusername').value;
    var password = document.getElementById('txtpassword').value;
    var fullname = document.getElementById('txtfullname').value;
    var email = document.getElementById('txtemail').value;
    var address = document.getElementById('txtaddress').value;
    var phone = document.getElementById('txtphone').value;
    var role = document.getElementById('role').selectedIndex + 1;

    var data = JSON.stringify({
        "username": username,
        "password": password,
        "fullname": fullname,
        "email": email,
        "address": address,
        "phone": phone,
        "role": role
    });
    xhr.send(data);
}