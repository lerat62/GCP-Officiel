# Gestion du manuel GCP

## Mise en ligne
1. Vérifiez les fiches dans l’aperçu et remplacez les deux emplacements photo si les fichiers sont disponibles.
2. Cliquez sur **Publier** dans Lovable, puis confirmez la publication. L’adresse publique sera indiquée dans cette fenêtre.
3. Après chaque modification, publiez à nouveau pour mettre à jour le site public. Aucun compte utilisateur n’est nécessaire pour consulter le manuel.

## Les deux photos et leurs crédits
Seuls deux emplacements sont prévus : la bannière d’accueil et l’illustration de la page À propos. Aucune photo n’a été fournie à ce stade ; les emplacements sont donc explicitement en attente.

Envoyez dans le chat Lovable les deux fichiers, en précisant pour chacun son emplacement, le nom ou pseudo de l’auteur et, si souhaité, le lien de son profil. Demandez ensuite de remplacer les emplacements et leurs crédits. N’envoyez que des photos dont vous avez l’autorisation d’utilisation.

Pour une modification technique, les valeurs se trouvent dans `src/data/config.ts` :
- `photos.home` : photo d’accueil.
- `photos.about` : photo de présentation.
- Pour chacune : `url` (URL de l’image hébergée), `author`, `profileUrl` (facultatif), `alt` (description accessible).
- Les crédits sont affichés distinctement sous chaque image. Un auteur absent reste « Auteur à renseigner ».
- Utilisez les médias hébergés par Lovable Assets. Les images d’aperçu social suivent automatiquement l’image de la page si son URL est absolue HTTPS.

## Logo, liens et édition
Dans `src/data/config.ts`, modifiez `logoUrl` pour remplacer l’emblème provisoire, `links` pour ajouter les adresses réelles Discord/TikTok/autres, `version` et `updatedAt` pour l’édition. Sans adresse fournie, aucun lien externe n’est inventé.

## Contenus
Les 13 fiches et les 6 catégories sont regroupées dans `src/data/manual.json`, indépendamment de l’interface. Chaque fiche possède un identifiant, une catégorie, un titre, une description, des sections, un type d’affichage et, si nécessaire, un encadré de règle. La recherche utilise automatiquement tous les titres et contenus de ce fichier.

Les rubriques Formations et spécialisations, Communications radio et Médical restent « À compléter » tant que leurs contenus validés ne sont pas fournis. Les procédures fournies demeurent classées sous Protocoles et procédures. Les cases de dotation sont une aide de consultation temporaire, sans enregistrement de données personnelles.

N’ajoutez aucun contenu de compte rendu, rapport final ou débriefing. Ne complétez pas les grades, quantités, conditions de décoration, procédures ou renseignements par des suppositions. Le site est communautaire et limité à la simulation Arma Reforger.