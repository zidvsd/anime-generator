export const sendMail = () => {
  const submit = document.getElementById("submit-email");
  submit.addEventListener("click", (event) => {
    event.preventDefault();
    getMessage();
  });
  const getMessage = () => {
    let parms = {
      email: document.getElementById("email").value,
      name: document.getElementById("name").value,
      message: document.getElementById("message").value,
      subject: document.getElementById("subject").value,
    };
    emailjs
      .send("service_krrexoq", "template_zle5p59", parms)
      .then(alert("Email Sent!"), console.log("SUCCESS"));
  };
};
