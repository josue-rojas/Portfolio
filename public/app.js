//home
//-------------------------------------------------------------------------

//change github image used on home
function gitImage(id, mouseOver=true){
  var gitHub = document.getElementById(""+id)
  if(mouseOver) gitHub.setAttribute("src","images/github_logo_hover.png")
  else gitHub = gitHub.setAttribute("src","images/github_logo.png")
}

function filterHome(id,total){
  if(id != -1){ $("#cont"+id).hide(1000,function(){
    $("#cont"+id).show(1000)})
  for(i = 0; i < total; i++){
    if(i != id) $("#cont"+i).hide(1000)
  }
}
else{
  for(i = 0; i < total; i++) {
    $("#cont"+i).hide(-1);
  }
  for(i = 0; i < total; i++) {
    $("#cont"+i).show(1000);
  }
}
}

//post
//-------------------------------------------------------------------------
//
function submitComment(id){
  var email = document.getElementById("email");
  var name = document.getElementById("name");
  var comment = document.getElementById("comment");
  var alertMess = "Missing";
  var missCount = 0;
  if(email.value && name.value && comment.value){
    $.ajax({
      type:"POST",
      url:"/submitComment",
      processData:false,
      contentType:'application/json',
      data:JSON.stringify({"emailD":email.value,"nameD":name.value,"commentD":comment.value,"postID":id})
    })

    //refresh the comment here to reflect the thingy
    email.value = "";
    name.value = "";
    comment.value = "";
    refreshB(id);
    return
  }
  //figure out a better way using array [101]=email !name comment
  //then going backwards insert last 1 then 'and' and so on
  //or not
  //also change the missing ones red
  if(!email.value){
    alertMess+= " email";
    missCount++;
  }
  if (!name.value) {
    if (missCount > 0) alertMess+=", name";
    else{
      alertMess+=" name";
      missCount++;
    }
  }
  if (!comment.value) {
    if(missCount > 0) alertMess+=", and comment"
    else alertMess+= " comment";
  }
  alert(alertMess);
}

function refreshB(id){
  var out=""
  $.ajax({
    type:"GET",
    url:"/blog/"+id+"/comments",
    success:function(r){
      if(r){
        for(i = 0; i < r.length; i++){
          out += '<div class="jumbotron singleComment"><h2>'+r[i].name+'</h2><p>'+r[i].comment+'</p></div>'
        }
        document.getElementById("comments").innerHTML = out;
      }
    }
  })
}

function deletePost(id){
  $.ajax({
    type:"POST",
    url:'/delete/'+id,
    success:function(r){
      var url = window.location.href.split("/")
      window.location = 'http://' + url[url.length-3] + "/blog"
    }
  })
}
//newpost
//-------------------------------------------------------------------------
function submitPost(){
  var title = document.getElementById("title");
  var body = document.getElementById("body");
  var name = document.getElementById("name")
  //console.log(body.value.match(/\n/g)||[]);
  if(name.value && body.value && title.value){
    $('#form').hide();
    $('#preview').show();
    var preview = document.getElementById("previewPlace");
    var body = '<h2>' + title.value + '</h2>' + '<p>' + proccesPHTML(body.value) + '</p>';
    preview.innerHTML = body;
  }
  else{
    alert("missing things"); //edit this later with color change thus edit resetPost too
  }
}

function resetPost(){
  document.getElementById("name").value = ""
  document.getElementById("title").value = ""
  document.getElementById("body").value = ""
}

function edit(){
  $('#form').show();
  $('#preview').hide();
}

function comfirmPost(){
  var title = document.getElementById("title").value;
  var body = document.getElementById("body").value;
  var summary = body.split(/\r?\n/g)[0];
  var data = {"title":title,"body":body,"summary":summary}
  $.ajax({
    type:"POST",
    url:'/newpost',
    processData: false,
    datatype:'json',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success:function(res){
      var url = window.location.href.split("/")
      window.location = 'http://' + url[url.length-2] + "/blog" //theoretically should always be the second to last
    }
  })

}

//everywhere
//-------------------------------------------------------------------------
function proccesPHTML(par){
  var all = par.split(/\r?\n/g)
  var done = "<p>"+ all[0] + '</p>'
  for(i = 1; i < all.length; i++){
    done+= '<p>' + all[i] + '</p>';
  }
  return done;
}
