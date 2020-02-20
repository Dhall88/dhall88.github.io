let portfolio=document.getElementById("portfolio");
let greeting=document.getElementById("greeting");
let contact=document.getElementById("contact");
let about=document.getElementById("about")


  // greeting.style.display="none"
portfolio.style.display = "none"
contact.style.display = "none"
about.style.display = "none"


const showPortfolio = () => {
  greeting.style.display="none"
  portfolio.style.display = "block"
  contact.style.display = "none"
  about.style.display = "none"
  console.log('in port');
}

const showContact = () => {
  greeting.style.display="none"
  portfolio.style.display = "none"
  contact.style.display = "block"
  about.style.display = "none"
  console.log('in contact');
}

const showAbout = () => {
  greeting.style.display="none"
  portfolio.style.display = "none"
  contact.style.display = "none"
  about.style.display = "block"
  console.log('in about');
}

const showHome = () => {
  greeting.style.display="block"
  portfolio.style.display = "none"
  contact.style.display = "none"
  about.style.display = "none"
  console.log('in home');
}
