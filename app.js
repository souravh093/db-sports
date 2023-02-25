const getPlayerValue = (search) => {
  const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${search}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data.player))
    .catch((err) => console.log(err));
};

const displayData = (players) => {
  const playerContainer = document.getElementById("playerContainer");
  playerContainer.innerHTML = "";
  players.forEach((element) => {
    const player = document.createElement("div");
    player.innerHTML = `
            <div class="card w-full bg-base-100 shadow-xl">
                <figure><img src="${
                  element.strThumb
                    ? element.strThumb
                    : "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
                }" /></figure>
                <div class="card-body">
                  <h2 class="card-title">${element.strPlayer}</h2>
                  <h2 class="card-title">${element.strNationality}</h2>
                  <p>More information then click details button</p>
                  <div class="card-actions justify-start">
                    <label onclick="showDetails2(${
                      element.idPlayer
                    })" class="btn btn-primary text-gray-50" for="my-modal-3">Details</label>
                  </div>
                </div>
              </div>
        
        `;
    playerContainer.appendChild(player);
  });
};

const showDetails = (Details) => {
  const url = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${Details}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => playerDetails(data.players[0]))
    .catch((err) => console.log(err));
};

const showDetails2 = async (details2) => {
  const url = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${details2}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    playerDetails(data.players[0]);
  } catch (error) {
    console.log(error);
  }
};

const playerDetails = (data) => {
  const detailsContainer = document.getElementById("detailsContainer");
  detailsContainer.innerHTML = `
    <h1>${data.strPlayer}</h1>
    <img src="${
      data.strThumb
        ? data.strThumb
        : "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
    }">
  `;
};

document.getElementById("searchBtn").addEventListener("click", () => {
  const playerInput = document.getElementById("inputField").value;
  playerInput.value = "";
  getPlayerValue(playerInput);
});


