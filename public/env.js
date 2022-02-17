// connect to the socket
let socket = io();

socket.on('number', (msg) => {
  console.log('Random number: ' + msg);
})

function contentsCards(proj) {
  if (proj.projectID == 1) {
    proj.title = "SubLearn";
    proj.img = "assets/sublearn.png";
    proj.info = "Data driven android application to help learner drivers select safer suburbs to practice driving.";
  } else if (proj.projectID == 2) {
    proj.title = "Lockdown Explorer";
    proj.img = "assets/explorer.png";
    proj.info = "Mobile application that encourages social connectedness through activeness";
  } else if (proj.projectID == 3) {
    proj.title = "C4Net Analyses";
    proj.img = "assets/c4net.png";
    proj.info = "Performed visual analysis on Powercor and Jemena energy datasets.";
  }
}

function projectDisplay(project) {
  return `
  <a class="carousel-item black-text"">
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="${project.img ? project.img : "assets/no_image.png"}">
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${project.title}<i class="material-icons right">more_vert</i></span>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">${project.title}<i class="material-icons right">close</i></span>
        <p>${project.info}</p>
      </div>
    </div>
  </a>`;
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function createProject() {
  let img = document.querySelector("#project-img").files[0];;
  if (img) {
    debugger;
    getBase64(img).then(
      d => {
        const cp = $('#carousel-projects');
        const project = {
          "projectID": $("#project-id").val(),
          "title": $("#project-title").val(),
          "info": $("#project-description").val(),
          "img": d
        };
        var settings = {
          "url": "/projects",
          "method": "POST",
          "timeout": 0,
          "headers": {
            "Content-Type": "application/json"
          },
          "data": JSON.stringify(project)
        };

        $.ajax(settings).done(function (response) {
          contentsCards(project)
          $('#carousel-projects').append(projectDisplay(project))
          $("#project-id").val('');
          $("#project-title").val('');
          $("#project-description").val('');
          $("#project-img").val('');
          $(".modal").modal('close');
          console.log(response)
        })
      }
    )
  }
}


$(document).ready(function () {
  $("#main-nav").load("components/navbar.html", () => {
    $('.sidenav').sidenav();
  })

  const cp = $('#carousel-projects');

  $('.modal').modal();

  $("#submit-project").click((e) => {
    createProject();
  });

  $.get('/projects', (result) => {
    for (let items of result) {
      contentsCards(items)
      cp.append(projectDisplay(items))
    }
    cp.carousel();
  })

})
