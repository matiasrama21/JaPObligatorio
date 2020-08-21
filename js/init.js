const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function signOut()
{
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function onLoad() {
  gapi.load('auth2', function() {
    gapi.auth2.init();
  });
  var auth2 = gapi.auth2.getAuthInstance();
  if(auth2.isSignedIn.get())
    document.getElementById("navbarDropdownMenuLink-4").innerHTML = `<i class="fas fa-user navLink" style="color: white;"></i> ${auth2.currentUser.get().getBasicProfile().getGivenName()}`;
  else if(localStorage.getItem("usuario"))
    document.getElementById("navbarDropdownMenuLink-4").innerHTML = `<i class="fas fa-user navLink" style="color: white;"></i> ${localStorage.getItem("usuario")}`;
}

function logout()
{
  localStorage.usuario = "";
  localStorage.pass = "";
  var auth2 = gapi.auth2.getAuthInstance();
  if(auth2.isSignedIn.get())
    signOut();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e)
{
});