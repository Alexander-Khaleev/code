(function () {
  function showTree(data) {
    this.data = data;
    var objects = data.data;
    for (i=0; i < objects.length; i++) {
      var block = document.getElementById("block");
      // Выстраивание корневых элементов
      if (objects[i].itemParentId == 0) {
        var item = objects[i].itemId;
        var element = "<div id='item" +item + "' class='item'>" + "<i class='fa fa-folder' aria-hidden='true'></i> " + objects[i].itemName + "</div>";
        block.innerHTML += element;
      }
      // Выстраивание вложенных элементов
      for (j=0; j < objects.length; j++) {
        if (objects[j].itemParentId == objects[i].itemId) {
          var newElement = "<div style='display:none; margin-left:25px' id='item" + objects[j].itemId + "'class='item'>" + "<i class='fa fa-folder' aria-hidden='true'></i> "  + objects[j].itemName + "</div>";
          document.getElementById("item" + objects[i].itemId).innerHTML += newElement;
          var elChild = document.getElementById("item" + objects[i].itemId).firstElementChild;
          var elChildClass = elChild.getAttribute('class');
          // Ставим стрелку элементам, имеющим детей
          if (elChildClass !== 'fa fa-angle-right') {
            var newI = document.createElement('i');
            newI.classList.add('fa');
            newI.classList.add('fa-angle-right');
            newI.setAttribute("aria-hidden", "true");
            document.getElementById("item" + objects[i].itemId).insertBefore(newI, elChild);
            document.getElementById("item" + objects[i].itemId).setAttribute("children", "true");
          }
        }
      }
    }
    // Навешиваем события
    var itemClass = document.getElementsByClassName('item');
    for (i=0; i < itemClass.length; i++) {
      itemClass[i].addEventListener('click', function(event) {
        event.stopPropagation();
        var attr = this.getAttribute('children');
        if (attr == 'visible') {
          this.style.color='black';
          this.setAttribute('children','true');
          var childNodes = this.childNodes;
          for(j=0; j < childNodes.length; j++) {
            if (childNodes[j].nodeName == 'I' && childNodes[j].getAttribute('class') == 'fa fa-angle-down') {
              childNodes[j].setAttribute('class','fa fa-angle-right');
            }
            if (childNodes[j].nodeName == 'DIV') {
              childNodes[j].style.display='none';
            }
          }
        }
        if (attr == 'true') {
          this.style.color='#CD950C';
          this.setAttribute('children','visible');
          var childNodes = this.childNodes;
          for(j=0; j < childNodes.length; j++) {
            if (childNodes[j].nodeName == 'I' && childNodes[j].getAttribute('class') == 'fa fa-angle-right') {
              childNodes[j].setAttribute('class','fa fa-angle-down');
            }
            if (childNodes[j].nodeName == 'DIV') {
              childNodes[j].style.display='block';
            }
          }
        }
      });
    }
  }
  // Отправляем запрос на получения данных
  var request = new XMLHttpRequest();
  function reqReadyStateChange() {
    if (request.readyState == 4) {
      var status = request.status;
      if (status == 200) {
        var data = JSON.parse(request.responseText);
        showTree(data)
      }
    }
  }
  request.open("GET", "data.json");
  request.onreadystatechange = reqReadyStateChange;
  request.send();
})();


