const span =  document.querySelector(".take-top")
window.onscroll = function (){
    let up =  document.getElementById("take-top")
    if(this.scrollY > 500){
      up.classList.add("show")
     }else{
      up.classList.remove("show")


     }
}
