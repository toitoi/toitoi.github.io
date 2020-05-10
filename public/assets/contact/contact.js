/**
 * Contact form
 * @version 1.0.0
 */

$( document ).ready(function() {
    
});


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

    const mg = window.mailgun.client({
        username: 'api',
        key: 'e5641726cdecfe30e7f2972af7ef72f4-0afbfc6c-c2ac2862',
        public_key: 'pubkey-dcb09b1c95d74e3fc99903ecf3bb8da9'
      });
    //process remote data
    mg.messages.create('toitoi.github.io', {
        from: email,
        to: ["davinci.softwares@gmail.com"],
        subject: subject,
        text: "name=" + name + "&email=" + email+ "&phone=" + phone +"&subject=" + subject + "&message=" + message,
        html: ""
      })
      .then(msg => {
          console.log(msg)
          submitMSG('Message has been sent');
        }) // logs response data
      .catch(err => {
          console.log(err)
          submitMSG(data);
        }); // logs any error

    // $.ajax({
    //     type: "POST",
    //     url: "https://api.mailgun.net/v3/sandbox0ec74e800efd43a7b514927364f46d3e.mailgun.org/messages",
    //     data: "name=" + name + "&email=" + email+ "&phone=" + phone +"&subject=" + subject + "&message=" + message,
    //     success : function(data){
    //         if (data == "success"){
    //             submitMSG('Message has been sent');
    //         } else {
    //             submitMSG(data);
    //         }
    //     }
    // });
}

//submit message
function submitMSG(msg)
{
    $("#msgSubmit").removeClass().addClass('animated fadeIn h3 text-center col-md-6 col-md-offset-3').text(msg);
}