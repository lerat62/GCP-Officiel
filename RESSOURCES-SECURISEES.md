# Protection de la rubrique Ressources

La catégorie `protocoles` (Ressources dans la navigation) est protégée côté serveur.
Les cinq fiches de cette catégorie ont été déplacées dans `src/data/protocoles.server.json` et ne sont plus incluses dans le jeu de données public envoyé au navigateur.

## Variables d'environnement Vercel

Dans **Vercel → Project → Settings → Environment Variables**, ajouter :

- `RESOURCES_PASSWORD` : le mot de passe communiqué par le GCP.
- `RESOURCES_SESSION_SECRET` : une longue clé aléatoire secrète (au moins 32 octets, idéalement 64 caractères hexadécimaux).

Ne pas préfixer ces variables par `VITE_` et ne pas les enregistrer dans Git.
Après leur ajout, redéployer le site.

## Fonctionnement

- L'accès est demandé à l'ouverture de Ressources et lors de l'ouverture directe d'une fiche protégée.
- Le serveur vérifie le mot de passe et délivre un cookie `HttpOnly`, `SameSite=Lax`, sécurisé en production.
- La session expire après 12 heures.
- Modifier `RESOURCES_PASSWORD` ou `RESOURCES_SESSION_SECRET` invalide les sessions existantes.
- Les réponses protégées sont configurées en `Cache-Control: no-store`.

La protection est un accès partagé par mot de passe, pas un système de comptes individuels.
