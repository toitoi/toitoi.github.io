/**
 * Contact form
 * @version 1.0.0
 */

//check the form validation
$("#contactForm").validator().on('submit', function (event) {

    if($('#form-submit').hasClass('disabled') == false) {
        event.preventDefault();
        submitForm();
    }
});

//fetch all the values from form
function submitForm(){
    // Initiate Variables With Form Content
    var name    = $("#inputName").val();
    var phone   = $("#inputPhone").val();
    var email   = $("#inputEmail").val();
    var subject = $("#inputSubject").val();
    var message = $("#inputMessage").val();

    $.ajax({
        type: "POST",
        url: "https://api.mailgun.net/v3/sandbox0ec74e800efd43a7b514927364f46d3e.mailgun.org/messages",
        data: "name=" + name + "&email=" + email+ "&phone=" + phone +"&subject=" + subject + "&message=" + message,
        success : function(data){
            if (data == "success"){
                submitMSG('Message has been sent');
            } else {
                submitMSG(data);
            }
        }
    });
}

//submit message
function submitMSG(msg)
{
    $("#msgSubmit").removeClass().addClass('animated fadeIn h3 text-center col-md-6 col-md-offset-3').text(msg);
}