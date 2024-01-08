// Mappage des textes d'icône aux fichiers d'image
let dataCity;
const iconMappings = {
    'clear-day': 'icons/clear-day.png',
    'cloudy': 'icons/cloudy.png',
    'fog': 'icons/fog.png',
    'hail': 'icons/hail.png',
    'partly-cloudy-day': 'icons/partly-cloudy-day.png',
    'partly-cloudy-night': 'icons/partly-cloudy-night.png',
    'rain': 'icons/rain.png',
    'rain-snow': 'icons/rain-snow.png',
    'rain-snow-showers-day': 'icons/rain-snow-showers-day.png',
    'rain-snow-showers-night': 'icons/rain-snow-showers-night.png',
    'showers-day': 'icons/showers-day.png',
    'clear-night': 'icons/clear-night.png',
    'sleet': 'icons/sleet.png',
    'snow': 'icons/snow.png',
    'snow-showers-day': 'icons/snow-showers-day.png',
    'snow-showers-night': 'icons/snow-showers-night.png',
    'thunder': 'icons/thunder.png',
    'thunder-rain': 'icons/thunder-rain.png',
    'thunder-showers-day': 'icons/thunder-showers-day.png',
    'thunder-showers-night': 'icons/thunder-showers-night.png',
    'wind': 'icons/wind.png',
};

const defaultVilles = [
  {address:"Paris",temp: "20",humidity:"5",windspeed:"50",icon:"clear-day",},
  {address:"Lille",temp: "20",humidity:"5",windspeed:"50",icon:"clear-day",},
  {address:"Lyon",temp: "20",humidity:"5",windspeed:"50",icon:"clear-day",},
  {address:"Strasbourg",temp: "20",humidity:"5",windspeed:"50",icon:"clear-day",},
  {address:"Nantes",temp: "20",humidity:"5",windspeed:"50",icon:"clear-day",},
  {address:"Marseille",temp: "20",humidity:"5",windspeed:"50",icon:"clear-day",},
]

async function obtenirVilleSelectionnee() {
    try {
        const response = await fetch('Paris.json');
        dataCity = await response.json();
        
        if (!dataCity) {
            console.error('Erreur : dataCity n\'a pas été correctement récupéré du fichier JSON.');
        } else {
            console.log('dataCity récupéré avec succès:', dataCity);
        }
        return dataCity;
    } catch (error) {
        console.error('Erreur lors du chargement du fichier JSON :', error);
        return null;
    }
}
  
  function obtenirHeuresPourJour(ville, date, dataCity) {
    // Formate la date pour correspondre au format "YYYY-MM-DD"
    const formattedDate = date;
  
    const dayData = dataCity.days.find(day => day.datetime === formattedDate);
  
    if (!dayData) {
      console.error(`Aucune donnée disponible pour la date spécifiée : ${date}`);
      return null;
    }
  
    return dayData.hours.map(hour => ({
      datetime: hour.datetime,
      temp: hour.temp,
      windspeed: hour.windspeed,
      humidity: hour.humidity,
      icon: hour.icon,
    }));
  }

  function obtenirJours(ville, dataCity) {
    const dataJours = dataCity.days;

    if (!dataJours) {
        console.error('Aucune donnée disponible');
        return null;
    }

    return dataJours.map(day => ({
        address: day.address,
        datetime: day.datetime,
        temp: day.temp,
        windspeed: day.windspeed,
        humidity: day.humidity,
        icon: day.icon,
    }));
}

function afficherMain(selectedVille, date, dataCity,) {

    const aujourdHui = date;
    
    const dayData = dataCity.days.find(day => day.datetime === aujourdHui);

    if (!dayData) {
        console.error(`Aucune donnée disponible pour la date spécifiée : ${aujourdHui}`);
        return null;
    }
      
    const selectedInfo = document.getElementById('info');
    const infoElement = document.createElement('div');
    infoElement.classList.add('info');
    infoElement.innerHTML = `
    <div class="selected-city">
          ${selectedVille.address}
    </div>
    <div class="temperature">${dayData.temp} °C</div>
    <div class="weather-icon">
        <img src="${iconMappings[dayData.icon]}" width="150px" height="150px" alt="Weather Icon">
    </div>
    <div class="windspeed">
        <img src="icons/windspeed.png" width="50px" height="50px">
          ${dayData.windspeed} km/h
    </div>
    <div class ="humidity">
        <img src="icons/humidity.png" width="45px" height="45px">
          ${dayData.humidity} %
    </div>
    `;
    selectedInfo.innerHTML = ''; // Efface le contenu précédent
    selectedInfo.appendChild(infoElement);
}

  // Fonction pour récupérer et afficher les données pour aujourd'hui, demain, 7 jours ou 15 jours
 async function afficherDonnees(type) {
    var villeSelectionnee = await obtenirVilleSelectionnee(); // Remplacez par votre logique pour obtenir la ville
  
    switch (type) {
      case 'aujourdHui':
        var dateAujourdHui = obtenirDates().aujourdHui;
        var donneesAujourdHui = obtenirHeuresPourJour(villeSelectionnee, dateAujourdHui, dataCity);
        afficherHeures(donneesAujourdHui, 'weatherDay');
        afficherMain(villeSelectionnee, dateAujourdHui, dataCity);
        break; 
      case 'demain':
        var dateDemain = obtenirDates().demain;
        var donneesDemain = obtenirHeuresPourJour(villeSelectionnee, dateDemain, dataCity);
        afficherHeures(donneesDemain, 'weatherDay');
        afficherMain(villeSelectionnee, dateDemain, dataCity);
       break;
      case '7jours':
        var donnees7Jours = obtenirJours(villeSelectionnee, dataCity);
        var donneesSur7Jours = donnees7Jours.slice(0, 7);
        afficherJours(donneesSur7Jours, 'weatherDay');
        break;
      case '15jours':
        var donnees15Jours = obtenirJours(villeSelectionnee, dataCity);
        afficherJours(donnees15Jours, 'weatherDay');
        break;
      default:
        console.error('Type de données non valide');
    }
  }


  // Fonction pour afficher les données des heures
  function afficherHeures(donnees, containerId) {
    const weatherContainer = document.getElementById(containerId);
    weatherContainer.innerHTML = '';
  
    donnees.forEach(donnee => {
      const hourElement = creerElementHeure(donnee);
      weatherContainer.appendChild(hourElement);
    });
  }
  
  // Fonction pour afficher les données des jours
  function afficherJours(donnees, containerId) {
    const weatherContainer = document.getElementById(containerId);
    weatherContainer.innerHTML = '';
  
    donnees.forEach(donnee => {
      const dayElement = creerElementJour(donnee);
      weatherContainer.appendChild(dayElement);
    });
  }
  
  // Fonction pour créer un élément HTML représentant une heure
  function creerElementHeure(donnee) {
    const hourElement = document.createElement('div');
    hourElement.classList.add('hour-element');
  
    hourElement.innerHTML = `
      <div class="generic-div">${donnee.datetime}</div>
      <div class="generic-div">
        <img src="${iconMappings[donnee.icon]}" alt="Weather Icon">
      </div>
      <div class="generic-div">${donnee.temp} °C</div>
      
        <div class="generic-div">
          <img src="icons/windspeed.png" width="15px" height="15px">
            ${donnee.windspeed} km/h
        </div>
        <div class="generic-div">
          <img src="icons/humidity.png" width="15px" height="15px">
            ${donnee.humidity} %
        
      </div>
    `;
    return hourElement;
  }
  
  // Fonction pour créer un élément HTML représentant un jour
  function creerElementJour(donnee) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('generic-day');
  
    dayElement.innerHTML = `
      <div class="generic-div">
        <div class="half-container">${donnee.datetime}</div>
        <div class="half-container">${donnee.address}</div>
      </div>
      <div class="generic-div">
        <img src="${iconMappings[donnee.icon]}" alt="Weather Icon">
      </div>
      <div class="generic-div">${donnee.temp} °C</div>
      <div class="generic-div">
        <div class="half-container">${donnee.windspeed} km/h</div>
        <div class="half-container">${donnee.humidity} %</div>
      </div>
    `;
  
    return dayElement;
  }
  
function obtenirDates() {
    const aujourdHui = new Date();
    const demain = new Date();
    demain.setDate(demain.getDate() + 1);

    const formaterDate = date => {
        const annee = date.getFullYear();
        const mois = (date.getMonth() + 1).toString().padStart(2, '0');
        const jour = date.getDate().toString().padStart(2, '0');
        return `${annee}-${mois}-${jour}`;
    };

    const dateAujourdhuiFormat = formaterDate(aujourdHui);
    const dateDemainFormat = formaterDate(demain);

    return {
        aujourdHui: dateAujourdhuiFormat,
        demain: dateDemainFormat,
    };
}

function afficherDonneesParDefaut() {



}
  // Ajout des gestionnaires d'événements aux boutons
  document.getElementById('boutonAujourdHui').addEventListener('click', function() {
    afficherDonnees('aujourdHui');
    console.log('Affichage données aujourdhui');
  });
  document.getElementById('boutonDemain').addEventListener('click', function() {
    afficherDonnees('demain');
    console.log('Affichage données Demain');
  });
  document.getElementById('bouton7Jours').addEventListener('click', function() {
    afficherDonnees('7jours');
    console.log('Affichage données 7 jours');
  });
  document.getElementById('bouton15Jours').addEventListener('click', function() {
    afficherDonnees('15jours');
    console.log('Affichage données 15 jours');
  });