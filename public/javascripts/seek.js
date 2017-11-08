function ok(){
    var keyword = document.getElementById("keyword").value;
    var form1 = document.getElementById('form1');
    form1.setAttribute("method","post");
    form1.setAttribute("action","title/seek?keyword="+keyword);

}