// Confirmation de chergement le l'index si bonne config du serveur
console.log('index.js is loaded');

// * router - START -
// ******************

const router = async () => {

  // #1 .Définition des routes du projets dans un tableau
  const routes = [{

    // quand l'utilisateur se trouvera à la racine du site, la fonction d'affichage console sera éxécutée (idem pour les autres chemins...)
    path: '/',
    view: () => console.log('Viewing Index page')
  }, {
    path: '/posts',
    view: () => console.log('Viewing Posts')
  }, {
    path: '/settings',
    view: () => console.log('Viewing Settings')
  }];

  // #2 .Test de chaque route
  const potentialMatches = routes.map(route => {
    // Nous allons retourner un nouvel objet pour chaque route (grâce à 'map' qui les a sortis du tableau dorigine) contenant...
    return {
      // ... le clé 'route:' contient l'objet complet
      route: route,
      // et la clé 'isMatch' contiendra un bouléen 'true' si le chemin actuel est le même que la clé 'path:' de l'objet d'origine ou 'false' si le chemin actuel est différent. 
      isMatch: location.pathname === route.path
    };
  });

  // *** 'match' va contenir l'objet de 'potentialMatches' qui aura la clé 'isMatch:' à 'true' grâce à 'find'
  let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

  // si il n'y a pas de correspondance entre nos routes définies et le chemin actuel, alors, chargeons la première route du tableau, soit, '/' et fixons le 'isMatch' à 'true'
  if (!match) {
    match={
      route: routes[0],
      isMatch: true
    };
  }

  // *** 'view' est une clé particulière car elle contient une call back, et peut dons être appelée comme suit :
  // (c'est cette call back qui par la suite appelera une classe ou une page particulière de notre application)
  console.log(match.route.view());

};

// * router - END -
// ****************

// 'popstate' est un évenement éxécuté quand l'historique change (action de navigation)
// donc permet une navigation classique dans l'historique car relance le router avec le nouvel historique apparaissant dans l'url.
window.addEventListener('popstate', router);

// *** #3 .Exécution du routeur quand le DOM est chargé !!!!!!! ***
document.addEventListener('DOMContentLoaded', () => {

  document.body.addEventListener('click', (e) => {

    // annulation du comportement par défaut de nos liens internes pour ne pas recharger quand une nouvelle page est appelée.
    // puis la fonction navigateTo() fixe l'historique et éxécute le routeur
    if(e.target.matches('[data-link]')) {
      e.preventDefault();
      // pushState (obj pouvant contenir des données maxi 2mb, null car désuet, url enregistrée dans l'hitorique du nav)
      history.pushState(null, null, e.target.href);
      router();
    }
  });

  // Le routeur est éxécutéé aussi ici en cas de modification direct de l'url
  router();

});
